import axios from "axios"
const URL = "https://localhost:7091/v1/";

const api = () => { 
    return axios.create({
        baseURL: URL,
    });
}

export default api; 