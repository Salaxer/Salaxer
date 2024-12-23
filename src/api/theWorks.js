import axios from "axios"
import URL_BACKEND from '../config';

const getAllWorks = async() =>{
    console.log(`${URL_BACKEND}/works`);
    let data= [];
    try {
        const result = await axios.get(`${URL_BACKEND}/works/`)
        return { data: result.data, error: ""};
    } catch (error) {
    }
    return { error: "", data}
}

export { getAllWorks }