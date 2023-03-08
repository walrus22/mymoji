import { useState } from 'react';
import { postServer } from '../../main/server';
import icon from '../../../assets/icon.svg';

interface emoji {
  creation_date: string,
  description : string,
  id : number,
  name : string,
  path_main: string,
  platform: string,
  popularity: number,
  type_main: string,
  img_data: string,
}

window.electron.ipcRenderer.on('favorite-list', (arg) => {
  console.log(arg);
});

let i = 1;

export default function Home() {
  const [test, setTest] = useState<emoji[] | null>(null);

  // let test: emoji[];
  let tt: string;
  let kk = "hhh"
  let img_data;

  async function handleClick() {
    console.log("testFunc start");

    const url = "http://mymoji.iptime.org:20000/api/search/main"
    const idata = {
        page: 1,
        item_num: 20
    }
    const response = await postServer(url, idata);
    await setTest(response)
    await console.log(test)
    // img_data = test![0].img_data
  }

  function handleClick2() {
    // window.electron.ipcRenderer.send('ipc-test');
    let ret = {["test" + i] : "ttt" + i}
    i += 1
    window.electron.ipcRenderer.sendMessage('favorite-add', ret);
  }

  function handleClick3() {
    // window.electron.ipcRenderer.send('ipc-test');
    let ret = ["test" + (i-1)]
    i -= 1
    window.electron.ipcRenderer.sendMessage('favorite-delete', ret);
  }

  return (
    <div>
      <div className="Hello">
          <button type="button" onClick={handleClick}>
            <span role="img" aria-label="books">
              📚
              {test && test![0].name}ddd
            </span>
          </button>
          <button type="button" onClick={handleClick2}>
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            add
          </button>
          <button type="button" onClick={handleClick3}>
            <span role="img" aria-label="folded hands">
            </span>
            delete
          </button>
      </div>
    </div>
  );
}
