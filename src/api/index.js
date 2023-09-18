import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.rawg.io/api/',
    credentials: true,
    headers: {
        'content-type': 'application/json'
    },
    params: {
        'key': import.meta.env.VITE_API_TOKEN
    }
})

export default api