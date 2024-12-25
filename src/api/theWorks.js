import axios from "axios"
import URL_BACKEND from '../config';
import { appCheck } from "./firebaseConfig"; // Importa Firebase
import { getToken } from "firebase/app-check";

const getAllWorks = async() =>{
    const token = await getToken(appCheck);
    
    let data= [];
    try {
        const result = await axios.get(`${URL_BACKEND}/works/`, {
            headers: {
                "Content-Type": "application/json",
                "X-Firebase-AppCheck": token.token,
            }
        })
        return { data: result.data, error: ""};
    } catch (error) {
    }
    return { error: "", data}
}

export { getAllWorks }