import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postServer } from '../../main/server';
import { EmojiElementCard, EmojiDetail } from '../layout/EmojiFrame';
import { useNavigate, useLocation } from 'react-router-dom';


export default function Detail() {
  const [data, setData] = useState<EmojiElement[] | null>(null);
  const {platform, id} = useParams();
  // const navigate = useNavigate();
  const location = useLocation();
  const emoji : EmojiMain = location.state.emoji; // 이전 페이지에서 클릭한 이모지 정보 가져옴
  console.log(emoji);

  useEffect(() => {
    postServer('/api/detail', {platform: platform, emoji_id: id})
    .then((res) => {
      setData(res)
      // console.log(res);
    })
  }, [])

  return (
    <div id='main-container'>
      {EmojiDetail(emoji)}
      <div id='emoji-container' >
        {data?.map((emoji, index) => (
          EmojiElementCard(emoji)
        ))}
      </div>
    </div>
  );
}
