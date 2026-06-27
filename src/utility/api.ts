import axios from "axios";



 export  const fetchBaseApi= 'https://adventureland2-de6qaz57hq-uc.a.run.app';
   
 const api=axios.create({
    baseURL:fetchBaseApi
})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api;