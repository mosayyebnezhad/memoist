import axios from "axios";

const api = axios.create({
    baseURL: "https://todo-list-9m98.onrender.com/api/v1",
    headers: {
        "Authorization": "Bearer YOUR_API_TOKEN"
    }
})


export default api