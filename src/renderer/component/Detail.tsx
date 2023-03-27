import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postServer } from '../../server';
import { EmojiElementCard, EmojiDetail } from '../layout/EmojiFrame';
import { useNavigate, useLocation } from 'react-router-dom';
import { findEqualEmoji, findEqualElement } from 'common';

export default function Detail() {
  const [data, setData] = useState<EmojiElement[] | null>(null);
  const {platform, id} = useParams();
  const [favElement, setFavElement] = useState<FavoriteElements | []>([]);
  const [isEmojiFav, setIsEmojiFav] = useState(false);
  // const [favEmoji, setFavEmoji] = useState<FavoriteEmojis | []>([]);

  // const navigate = useNavigate();
  const location = useLocation();
  const emoji : EmojiMain = location.state.emoji; // 이전 페이지에서 클릭한 이모지 정보 가져옴
  console.log(emoji);

  useEffect(() => {
    postServer('/api/detail', {platform: platform, emoji_id: id})
    .then((res) => {
      setData(res)
    })
    window.electron.ipcRenderer.send('favorite-list')
    return window.electron.ipcRenderer.home('favorite-list', (res) => {
      // console.log(res);
      setFavElement(res[1])
      if(findEqualEmoji(emoji, res[0])) {
        // console.log("dd");
        setIsEmojiFav(true)
      }
    });
  }, [])

  {/* {data?.map((element, index) => (
  <EmojiElementCard key={`${element.id}`} element={element} isFav={true} />
 ))} */}

  return (
    <div id='main-container'>
      <EmojiDetail emoji={emoji} isFav={isEmojiFav}/>
      <div id='emoji-container' >
        {data?.map((element, index) => {
          if(findEqualElement(element, favElement)) {
            return <EmojiElementCard key={`${element.id}`} element={element} isFav={true} />
          } else {
            return <EmojiElementCard key={`${element.id}`} element={element} isFav={false} />
          }
        })}
      </div>
    </div>
  );
}
