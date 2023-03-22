/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { app } from 'electron';
import fs from 'fs';

export function resolveHtmlPath(htmlFileName: string) {

  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function isEqaulObj(object1:object, object2:object) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}


function parseDataFile(filePath:string, defaults:{}) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch(error) {
    return defaults;
  }
}

interface userData {
  favEmojis : FavoriteEmojis,
  favElements : FavoriteElements
}
type userDataKey = "favEmojis" | "favElements";
type userDataVal = FavoriteEmojis | FavoriteElements;

// console.log(app.getPath('userData')); // C:\Users\ksshome\AppData\Roaming\Electron
export class UserConfig {
  path : string;
  data : userData;

  constructor(par : {configName:string, defaults:userData}) {
    this.path = path.join(app.getPath('userData'), par.configName + '.json');
    this.data = parseDataFile(this.path, par.defaults);
  }

  // get(key: userDataKey) {
  //   return this.data[key];
  // }

  getEmojis() {
    return this.data["favEmojis"];
  }

  getElements() {
    return this.data["favElements"];
  }

  set(key : userDataKey, val : any) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

