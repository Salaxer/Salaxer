import axios from "axios"
import URL_BACKEND from '../config';

const getPassword = async ({ password }) =>{
    let resolve, error;
    await axios.post(`${URL_BACKEND}/MQTT`,{
      password,
    }, {
      headers: { 
        Accept: 'application/json', 
        withCredentials: true
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