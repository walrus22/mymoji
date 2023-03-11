import { useState, useEffect } from 'react';
import { postServer } from '../../main/server';
import { EmojiMainCard } from '../layout/EmojiFrame';
import { EmojiElementCard } from '../layout/EmojiFrame';
import { useNavigate } from 'react-router-dom';
// favorite emoji
// favorite EmojiElement

import log from 'electron-log';

// log.transports.file.level = 'info';
// log.transports.console.format = '[{level}] {file}:{line} {message}';
// log.info('This is a log message');

export default function Home() {
  const [emoji, setEmoji] = useState<FavoriteEmojis | null>(null);
  const [element, setElement] = useState<FavoriteElements | null>(null);

  const navigate = useNavigate();


  useEffect(() => {
    window.electron.ipcRenderer.send('favorite-list')
    return window.electron.ipcRenderer.home('favorite-list', (res) => {
      setEmoji(res[0])
      setElement(res[1])
      // console.log(res);
    });
  }, [])

  return (
    <div id='main-container'>
      <div id='favorite-container'>
        {emoji?.map((item, index) => (
            EmojiMainCard(item, navigate, {backgroundColor:'blue', height:'40px', width:'100px'})
          ))}
      </div>
      <div id='emoji-container'>
        {element?.map((item, index) => (
          EmojiElementCard(item)
        ))}
      </div>
    </div>
  );
}
