import { useState } from 'react';
import { postServer } from '../../main/server';
import icon from '../../../assets/icon.svg';

// ipcRenderer.on('message', (event, message) => {
//   console.log("ipcRenderer On");
//   console.log(message); // Output: 'Hello, world!'
// });

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

export default function Hello() {
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

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          // href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button" onClick={handleClick}>
            <span role="img" aria-label="books">
              📚
              {test && test![0].name}ddd
              {/* <img src={icon} /> */}
            </span>
          </button>
          {/* <img width="200" alt="icon1" src={`data:image/jpeg;base64,${test && test![0].img_data}`}/> */}
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
}
