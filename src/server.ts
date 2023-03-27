/* eslint import/prefer-default-export: off */
import axios from 'axios';

export function postServer(url: string, inputData: object) {
  url = window.envVars.API_URL + url

  return axios.post(url, inputData)
  .then(res => {
    // console.log(res.data);
    return res.data
  })
  .catch(err => {
    console.log(err);
    // return err
  })
}
