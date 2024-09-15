import axios from "axios";

const api = axios.create({
    baseURL: "https://arashcode-todo.vercel.app/api/v1",
    headers: {
        "Authorization": "Bearer YOUR_API_TOKEN"
    }
})


export default api