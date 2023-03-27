import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Card, CardMedia, Typography, CardActionArea, ToggleButton, Button  } from '@mui/material';
import { Box } from '@mui/system';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { Fragment } from 'react';
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';


export const EmojiMainCard = ({emoji, style, navigate, cssId, isFav} :
  {emoji:EmojiMain, navigate : any, style?:object, cssId?:string, isFav:boolean}) => {

  function handleClick() {
    navigate(`/detail/${emoji.platform}/${emoji.id}`, { state: { emoji } });
  }



  return (
    <Card sx={{ maxWidth: 345, minHeight: '10px'}} style={style} id={cssId}>
      <CardActionArea onClick={handleClick}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={`${window.envVars.API_URL}/image/${emoji.platform}/${emoji.id}/0/${emoji.type_main}`}
          />
          {isFav && <StarIcon id='kkk' style={{position:'absolute', top:'0', right:'0', color: 'yellow', stroke:'black', strokeWidth:'1.5px'}}/> }
          <Box id='name-box'>
            {emoji.name}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};


const MENU_ID = 'blahblah';

export const EmojiElementCard = ({element, isFav, onContextMenu }:{element:EmojiElement, isFav:boolean}) => {
  // console.log(emoji);
  // const location = useLocation();
  // const { emojiMain } = location.state;

  // action : 추가
  // 별표 달기

  

  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  function handleClick() {
    window.electron.ipcRenderer.sendMessage('copy-clipboard', element);
  }

  return (
    <Card sx={{ overflow:'unset'}} onContextMenu={onContextMenu} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={`${window.envVars.API_URL}/image/${element.platform}/${element.emoji_id}/${element.id}/${element.type}`}
        />
        {isFav && <StarIcon id='kkk' style={{position:'absolute', top:'0', right:'0', color: 'yellow', stroke:'black', strokeWidth:'1.5px'}}/> }
      </CardActionArea>
    </Card>
  );
};




export const EmojiDetail = ({emoji, isFav}:{emoji:EmojiMain, isFav:boolean}) => {
  const [isEmojiFav, setIsEmojiFav] = useState(isFav);

  console.log(isFav);

  useEffect(() => {
    setIsEmojiFav(isFav)
  }, [isFav])

  function handleClick() {
    console.log(isEmojiFav);
    if(isEmojiFav) {
      setIsEmojiFav(false)
      window.electron.ipcRenderer.sendMessage('favorite-emoji-remove', emoji)
    } else {
      setIsEmojiFav(true)
      window.electron.ipcRenderer.sendMessage('favorite-emoji-add', emoji)
    }
    console.log("done");
  }

  return (
    <Card sx={{ display: 'flex', height: '120px', padding: '10px', borderRadius:'0px', overflow:'unset'}}>
        <CardMedia
          sx={{height:'120px', width: '120px', border:'1px black solid'}}
          component="img"
          image={`${window.envVars.API_URL}/image/${emoji.platform}/${emoji.id}/0/${emoji.type_main}`}
          />
        <Box id='testbox'>
          <Typography sx={{fontSize:'20px', fontWeight:'800'}}>{emoji.name}</Typography>
          <Typography sx={{fontSize:'13px'}}>{emoji.description}</Typography>
          <Button value="check" onClick={handleClick} style={{border:'0px', width:'40px', minWidth:'40px'}}>
            {isEmojiFav? <StarIcon id='kkk' style={{color: 'yellow', stroke:'black', strokeWidth:'1px'}}/>
            : <StarIcon style={{color: 'white', stroke:'black', strokeWidth:'1px'}}/>}
          </Button>
        </Box>
    </Card>
  )
}


