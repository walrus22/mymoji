import { useState, useEffect } from 'react';
import { postServer } from '../../server';
import { EmojiMainCard } from '../layout/EmojiFrame';
import { EmojiElementCard } from '../layout/EmojiFrame';
import { useNavigate } from 'react-router-dom';
// favorite emoji
// favorite EmojiElement

import 'react-contexify/ReactContexify.css';
import { useContextMenu, Menu, Item, Separator } from "react-contexify"
const MENU_ID = "testcontext"

export default function Home() {
  const [emoji, setEmoji] = useState<FavoriteEmojis | null>(null);
  const [element, setElement] = useState<FavoriteElements | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.electron.ipcRenderer.send('favorite-list')
    return window.electron.ipcRenderer.home('favorite-list', (res) => {
      setEmoji(res[0])
      setElement(res[1])
      console.log(res);
    });
  }, [])

  const { show } = useContextMenu({
    id: MENU_ID,
  });
  function displayMenu(e, item) {
    show({event: e, props: { key: "value", data : item }});
    console.log(item);
  }

  function handleItemClick({ id, props, triggerEvent }) {
    // I use the id attribute defined on the `Item` to identify which one is it
    // this feel natural to my brain

    console.log(props);
    console.log(triggerEvent);

    switch (id) {
      case "test":
        window.electron.ipcRenderer.sendMessage('copy-clipboard', props.data);
        break;
      case "share":
        // logic to share
        break;
      case "email":
        //logic to send email
        break;
      case "sponsor":
        //logic to open sponsor page
        break;
    }
  }

  const items=['a','b','c']

  return (
    <div id='main-container'>
      <div id='favorite-container'>
        {emoji?.map((item, index) => (
          <EmojiMainCard key={`${item.platform}-${item.id}`} isFav={false} navigate={navigate} emoji={item}/>
        ))}
      </div>
      <div id='emoji-container'>
        {element?.map((item, index) => (
          <EmojiElementCard key={`${item.platform}-${item.id}`} element={item} isFav={false} onContextMenu={(e) => displayMenu(e, item)} />
        ))}
      </div>

      <Menu id={MENU_ID}>
        <Item id="test" onClick={handleItemClick}>
          Remove row
        </Item>
        <Separator />
        <Item id="share" onClick={handleItemClick}>
          Sharess
        </Item>
      </Menu>
    </div>
  );
}
