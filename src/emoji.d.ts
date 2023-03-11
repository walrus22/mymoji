declare global {
  // eslint-disable-next-line no-unused-vars
  interface EmojiMain {
    creation_date: string,
    description : string,
    id : number,
    name : string,
    path_main: string,
    platform: string,
    popularity: number,
    type_main: string,
  }

  interface EmojiElement {
    id : number,
    platform: string,
    emoji_id: number,
    path: string,
    type: string,
    command? : string
  }

  interface EmojiID {
    platform: string,
    id : number
  }

  // platform-id list
  type FavoriteEmojis = Array<EmojiMain>
  type FavoriteElements = Array<EmojiElement>

}

export {};
