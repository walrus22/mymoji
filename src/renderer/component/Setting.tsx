import { useState, useEffect } from 'react';
import { forwardRef, useRef, useImperativeHandle } from "react"
import { useOutletContext } from "react-router-dom";

import { List } from 'react-virtualized';
import { Grid, AutoSizer, Collection } from 'react-virtualized';
import { EmojiMainCard } from '../layout/EmojiFrame';
import { emojiMainTest } from '../../testData';
import { Masonry } from "masonic";
import { Scrollbars } from 'react-custom-scrollbars-2';


// const Setting =  forwardRef((props, ref) => {
const Setting = () => {

  return (
    <div id='settingtest'>
      hi
    </div>
  );
}

export default Setting
