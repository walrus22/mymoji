import { List, AutoSizer } from 'react-virtualized';
import { EmojiMainCard } from '../layout/EmojiFrame';
import { useState, useEffect } from 'react';
import { postServer } from '../../main/server';
import { useNavigate } from 'react-router-dom';

const ITEMS_COUNT = 100
const minColumnWidth = 100
const SCROLLBAR_WIDTH = 8
let itemsPerRow = 1
let rowCount = 1
let fr = 1
let itemWidth = 1

// function rowRenderer({index, key, style, myVar }) {
function rowRenderer({index, key, style, data, nav }) {
  if (!data || data.length <= index) {
    return null;
  }

  const items = [];
  const fromIndex = index * itemsPerRow;
  const toIndex = Math.min(fromIndex + itemsPerRow, ITEMS_COUNT);
  // console.log(data);
  // console.log(myVar );

  // console.log("index:"+index);
  // console.log("rowCount:"+rowCount);
  // console.log("fromIndex:"+fromIndex);
  // console.log("toIndex:"+toIndex);
  // console.log((toIndex - fromIndex) % itemsPerRow);

  if ((toIndex - fromIndex) % itemsPerRow == 0) {
    for (let i = fromIndex; i < toIndex; i++) {
      items.push(
        <div className='Item' key={i}>
          {EmojiMainCard(data[i], nav)}
        </div>
      )
    }
  } else {
    for (let i = fromIndex; i < fromIndex + itemsPerRow; i++) {
      if (i < toIndex) {
        items.push(
          <div className='Item' key={i}>
            {EmojiMainCard(data[i], nav)}
          </div>
        )
      } else {
        items.push(
          <div className='Item' key={i}/>
        )
      }
    }
    // console.log(items);
  }

  return (
    <div className='Row' key={key} style={style}>
      {items}
    </div>
  )
}

export default function Search() {
  const [data, setData] = useState<EmojiMain[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    postServer('/api/search/main', { page: 0, item_num: ITEMS_COUNT })
    .then((res) => {
      // console.log(res);
      setData(res)
    })
  }, [])

  return(
      <AutoSizer>
      {({ height, width }) => {
        itemsPerRow = Math.floor((width-SCROLLBAR_WIDTH) / minColumnWidth)
        fr = ((width-SCROLLBAR_WIDTH)/itemsPerRow) // before deduct margin : 118 (after 118-8px=110)
        itemWidth = Math.max(minColumnWidth, fr)
        rowCount = Math.ceil(ITEMS_COUNT / itemsPerRow);

        // console.log("height:"+height);
        // console.log("width:"+width);
        // console.log("itemsPerRow:"+itemsPerRow);
        // console.log("fr:"+fr);
        // console.log("itemWidth:"+itemWidth);
        // console.log("rowCount:"+rowCount);

        //https://plnkr.co/edit/zjCwNeRZ7XtmFp1PDBsc?preview
        return (
          <List
            className='List'
            width={width}
            height={height-30} //footer
            rowCount={rowCount}
            rowHeight={itemWidth}
            rowRenderer={rowProps => rowRenderer({...rowProps, data: data, nav:navigate})}
            // rowRenderer={rowRenderer}
          />
        )
      }}
    </AutoSizer>
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
