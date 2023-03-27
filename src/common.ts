// userFavoriteEmojis = userFavoriteEmojis.filter((item) => !(item.id === obj.id && item.platform === obj.platform))
export function isEqualEmoji(obj1:EmojiMain, obj2:EmojiMain) {
  if(obj1.platform == obj2.platform && obj1.id == obj2.id) {
    return true;
  }
  return false;
}

export function findEqualEmoji(obj:EmojiMain, arr:EmojiMain[]) {
  for(let i=0; i < arr.length; i++) {
    if(obj.platform == arr[i].platform && obj.id == arr[i].id) {
      return true;
    }
  }
  return false;
}

export function findEqualElement(obj:EmojiElement, arr:EmojiElement[]) {
  for(let i=0; i < arr.length; i++) {
    if(obj.platform == arr[i].platform && obj.emoji_id == arr[i].emoji_id && obj.id == arr[i].id ) {
      return true;
    }
  }
  return false;
}
