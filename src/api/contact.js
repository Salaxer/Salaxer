import axios from 'axios';
import URL_BACKEND from '../config';

const sendMessage = async (email, message, name) =>{
  let resolve, error;
  await axios.post(`${URL_BACKEND}/contact`,{
    email: "salaxerd@gmail.com",
    message,
    name,
  }, {
    headers: { 
      Accept: 'application/json', 
      withCredentials: true
    }
  }).then((res)=>{
    resolve = res;
  }).catch((e) =>{
    console.error(e);
    error = e;
  })
  return {resolve, error};
}

export { sendMessage }