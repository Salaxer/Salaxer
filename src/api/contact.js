import axios from 'axios';
import URL_BACKEND from '../config';
import { appCheck } from "./firebaseConfig"; // Importa Firebase
import { getToken } from "firebase/app-check";

const sendMessage = async (email, message, name) =>{
  let resolve, error;
  const token = await getToken(appCheck);
  await axios.post(`${URL_BACKEND}/contact`,{
    email: "salaxerd@gmail.com",
    message,
    name,
  }, {
    headers: { 
      "Content-Type": "application/json",
      Accept: 'application/json', 
      withCredentials: true,
      "X-Firebase-AppCheck": token.token,
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