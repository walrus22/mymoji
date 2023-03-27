import { List, AutoSizer } from 'react-virtualized';
import { EmojiMainCard } from '../layout/EmojiFrame';
import { useState, useEffect } from 'react';
import { postServer } from '../../server';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, FormikHelpers } from 'formik';
// import { isEqualEmoji } from '../../util'
import { isEqualEmoji } from '../../common';

const ITEMS_COUNT = 100
const minColumnWidth = 100
const SCROLLBAR_WIDTH = 8
let itemsPerRow = 1
let rowCount = 1
let fr = 1
let itemWidth = 1


export default function Search() {
  const [data, setData] = useState<EmojiMain[]>([]);
  const [favList, setFavList] = useState<EmojiMain[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    window.electron.ipcRenderer.send('favorite-list')
    const removeEventListener = window.electron.ipcRenderer.on('favorite-list', (res) => {
      setFavList(res[0]);
    });



    postServer('/api/search/main', { page: 0, item_num: ITEMS_COUNT })
    .then((res) => {
      // res = res.filter((item:EmojiMain) => !(item.id === favList.id && item.platform === favList.platform))
      setData(res)
    })


    return () => {
      // isInFavList()
      removeEventListener()
    }
  }, [])

  const handleResize = (({ height, width }) => {
    // console.log("Hi");
    itemsPerRow = Math.floor((width-SCROLLBAR_WIDTH) / minColumnWidth)
    fr = ((width-SCROLLBAR_WIDTH)/itemsPerRow)
    itemWidth = Math.max(minColumnWidth, fr)
    rowCount = Math.ceil(ITEMS_COUNT / itemsPerRow);
  });


  // function isInFavList() {
  //   for (let i = 0; i < data.length; i++) {
  //     for (let j = 0; j < favList.length; j++) {
  //       if(isEqualEmoji(data[i],favList[j])) {
  //         data[i].isFav = true
  //         break;
  //       }
  //     }
  //     data[i].isFav = false
  //   }
  // }

  function isInFavList(emoji : EmojiMain) {
    for (let i = 0; i < favList.length; i++) {
      if(isEqualEmoji(emoji,favList[i])) {
        return true;
      }
    }
    return false;
  }

  function rowRenderer({index, key, style, nav }) {
    if (!data || !favList || data.length <= index) {
      console.log("something wrong");
      return null;
    } else{
      console.log("hi");
    }

    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, ITEMS_COUNT);

    if ((toIndex - fromIndex) % itemsPerRow == 0) {
      for (let i = fromIndex; i < toIndex; i++) {
        // item에 이미지가 아닌 텍스트나 빈칸 넣으면 스무스하게 변환됨
        // 이미지 갯수가 적을수록 스무스하게 변함. 어떻게 해야하지?

        // items.push(
        //   <EmojiMainCard key={`${data[i].platform}-${data[i].id}`} navigate={nav} emoji={data[i]} cssId={'virtualized-item'} />
        // )

        // favList에 있는지 확인
        if(isInFavList(data[i])){
          // data[i].isFav=true
          items.push(
            <EmojiMainCard key={`${data[i].platform}-${data[i].id}`} navigate={nav} emoji={data[i]} isFav={true} cssId={'virtualized-item'} />
          )
        } else {
          items.push(
            <EmojiMainCard key={`${data[i].platform}-${data[i].id}`} navigate={nav} emoji={data[i]} isFav={false} cssId={'virtualized-item'} />
          )
        }
      }
    } else {
      for (let i = fromIndex; i < fromIndex + itemsPerRow; i++) {
        if (i < toIndex) {
          if(isInFavList(data[i])){
            // data[i].isFav=true
            items.push(
              <EmojiMainCard key={`${data[i].platform}-${data[i].id}`} navigate={nav} emoji={data[i]} isFav={true} cssId={'virtualized-item'} />
            )
          } else {
            items.push(
              <EmojiMainCard key={`${data[i].platform}-${data[i].id}`} navigate={nav} emoji={data[i]} isFav={false} cssId={'virtualized-item'} />
            )
          }
        } else {
          items.push(
            <div id='virtualized-item' key={i}/>
          )
        }
      }
    }

    return (
      <div className='Row' key={key} style={style}>
        {items}
      </div>
    )
  }
  interface searchValues {
    firstName: string;
    lastName: string;
  }

  console.log(data);
  console.log(favList);

  return(
      // <AutoSizer>

      <div style={{height:'100%'}}>
        <div id="search-form">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
            }}
            onSubmit={(
              values: searchValues,
              { setSubmitting }: FormikHelpers<searchValues>
            ) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
          >
            <Form>
              <label htmlFor="firstName">First Name</label>
              <Field id="firstName" name="firstName" placeholder="John" />

              <label htmlFor="lastName">Last Name</label>
              <Field id="lastName" name="lastName" placeholder="Doe" />

              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
        <AutoSizer onResize={handleResize} id='search-autosizer'>
        {({ height, width }) => {
          return (
            <List
              id='search-list'
              className='List'
              width={width}
              height={height-120} //footer
              rowCount={rowCount}
              rowHeight={itemWidth}
              rowRenderer={rowProps => rowRenderer({...rowProps, nav:navigate})}
            />
          )
        }}
      </AutoSizer>
      </div>
  )
}



  // <Fragment>
  //   {/* <button onClick={handleClick}>test</button> */}
  //   <form action="submit">
  //     <input type="text" />
  //     <button >dd</button>
  //   </form>
  //   <div id='emoji-container' >
  //     {data?.map((emoji, index) => (
  //       EmojiMainCard(emoji, navigate)
  //     ))}
  //   </div>
  // </Fragment>

// function handleClick2() {
//   // window.electron.ipcRenderer.send('ipc-test');
//   let ret =  {
//     "emoji_id": 86920,
//     "id": i,
//     "path": "test",
//     "platform": "dc",
//     "type": "png"
//   }
//   i += 1
//   window.electron.ipcRenderer.sendMessage('favorite-add', ret);
// }

// function handleClick3() {
//   // window.electron.ipcRenderer.send('ipc-test');
//   i -= 1
//   let ret = {
//     "emoji_id": 86920,
//     "id": i,
//     "path": "test",
//     "platform": "dc",
//     "type": "png"
//   }
// }
