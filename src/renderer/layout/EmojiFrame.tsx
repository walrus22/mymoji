
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Card, CardMedia, Typography, CardActionArea  } from '@mui/material';
import { Box } from '@mui/system';
// import { postServer } from './../../main/server';



export const EmojiMainCard = (emoji:EmojiMain, navigate : any, style?:object) => {
  // console.log(emoji);
  function handleClick() {
    navigate(`/detail/${emoji.platform}/${emoji.id}`, { state: { emoji } });
  }

  console.log(style);

  return (
    <Card  sx={{ maxWidth: 345, minHeight: '10px'}} style={style}>
      <CardActionArea onClick={handleClick}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={`${window.envVars.API_URL}/image/${emoji.platform}/${emoji.id}/0/${emoji.type_main}`}
          />
          <Box id='name-box'>
            {emoji.name}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export const EmojiElementCard = (emoji:EmojiElement) => {
  // console.log(emoji);
  // const location = useLocation();
  // const { emojiMain } = location.state;

  // action : 추가
  // 별표 달기

  return (
    <Card sx={{ maxWidth: 150 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={`${window.envVars.API_URL}/image/${emoji.platform}/${emoji.emoji_id}/${emoji.id}/${emoji.type}`}
        />
      </CardActionArea>
    </Card>
  );
};

export const EmojiDetail = (emoji:EmojiMain) => {
  return (
    <Card id='testcard' sx={{ display: 'flex', height:'120px', padding: '10px', borderRadius:'0px'}}>
        <CardMedia
          id='test'
          // sx={{  }}
          component="img"
          image={`${window.envVars.API_URL}/image/${emoji.platform}/${emoji.id}/0/${emoji.type_main}`}
          />
        <Box id='testbox'>
          <Typography sx={{fontSize:'20px', fontWeight:'800'}}>{emoji.name}</Typography>
          <Typography sx={{fontSize:'13px'}}>{emoji.description}</Typography>
        </Box>
    </Card>
  )
}


