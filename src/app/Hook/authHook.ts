import api from "@/api/api"
import { GetingData, IUser } from '../../types/types';
import { useContext } from "react";
import { UserContext } from "@/wrappers/contexts";



type Side = "login" | "register";

interface IProp extends IUser {

    side: Side

}




export const useAuth = async (prop: IProp) => {
    // /auth/login

    const LoginData: IUser = {
        email: prop.email,
        password: prop.password
    }
    const RegisterData: IUser = {
        firstName: prop.firstName,
        lastName: prop.lastName,
        email: prop.email,
        password: prop.password
    }


    const Side: Side = prop.side;

    let Data;

    if (Side === "register") {
        Data = await api.post("/user", RegisterData)
    } else if (Side === "login") {
        Data = await api.post("/auth/login", LoginData)
    }




    return Data



}


export const useLogout = () => {

    const { setUser } = useContext(UserContext)

    localStorage.removeItem("user")
    setUser({})





}




export const useChecking = ({ Data }: { Data: GetingData }): boolean => {


    



    return false

}

// export Redirect = () => { }