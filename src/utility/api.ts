import axios from "axios";


export function fetchBaseApi(){
    const api= 'https://adventureland2-de6qaz57hq-uc.a.run.app';
    return api;
}

 const api=axios.create({
    baseURL:fetchBaseApi()
})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api;