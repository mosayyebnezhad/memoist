import api from "@/api/api"




interface ILogin {
    email: string,
    password: string
}
export const useLogin = async (prop: ILogin) => {
    // /auth/login

    const Data: ILogin = {
        email: prop.email,
        password: prop.password
    }


    await api.post("/auth/login", Data)







}