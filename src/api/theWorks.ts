import axios from "axios"

interface Work{
    title: string,
    image: string,
    description: string
    ulr: string
    imagePrev: Array<string>
}
interface getAll{
    data: Array<Work>;
    error: any;
}

const URL_BACKEND =  "http://localhost:3002/works";

const getAllWorks = async(): Promise<getAll>=>{
    let data= [];
    try {
        const result = await axios.get(URL_BACKEND)
        return { data: result.data, error: ""};
    } catch (error) {
    }
    return { error: "", data}
}

export { getAllWorks }