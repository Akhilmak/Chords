import axios from "axios";

// export const baseUrl = "http://localhost:8080"; //use this when deploying inn localmachine

export const baseUrl = "https://music-m5on.onrender.com";

const api=axios.create({
    baseURL:baseUrl,
    headers:{
        "Content-Type":"application/json"
    }
})

export default api;