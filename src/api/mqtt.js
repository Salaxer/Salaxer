import axios from "axios"
import URL_BACKEND from '../config';
import { appCheck } from "./firebaseConfig"; // Importa Firebase
import { getToken } from "firebase/app-check";

const getPassword = async ({ password }) =>{
    const token = await getToken(appCheck);
    let resolve, error;
    await axios.post(`${URL_BACKEND}/MQTT`,{
      password,
    }, {
      headers: { 
        "Content-Type": "application/json",
        Accept: 'application/json', 
        withCredentials: true,
        "X-Firebase-AppCheck": token.token,
      }
    }).then((res)=>{
      resolve = res.data;
    }).catch((e) =>{
      console.error(e);
      error = e;
    })
    console.log(resolve);
    
    return {resolve, error};
}

export { getPassword }