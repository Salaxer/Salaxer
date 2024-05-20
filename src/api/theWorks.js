import axios from "axios"

const URL_BACKEND =  process.env.URL_BACKEND || "http://localhost:3002/works";

const getAllWorks = async() =>{
    let data= [];
    try {
        const result = await axios.get(URL_BACKEND)
        console.log(result);
        return { data: result.data, error: ""};
    } catch (error) {
    }
    return { error: "", data}
}

export { getAllWorks }