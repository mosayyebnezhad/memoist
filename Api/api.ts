import axios from "axios";

const api = axios.create({
    baseURL: "https://todo-list-9m98.onrender.com/api/v1/",
    headers: {
        Accept: "*/*",
        Authorization:"Bearer oaF2JiTIhfN`oyQpx@i_~!TpJ95eUBk^4svNONrp)^DB#BqJX%7hbKQ88Rrb{r^A"
    }
})

export default api