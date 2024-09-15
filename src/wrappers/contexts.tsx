
"use client"
import api from "@/api/api"
import { GetingData } from "@/types/types"
import { useQuery } from "@tanstack/react-query"
import { createContext, ReactNode, useState } from "react"
import { Toaster } from "react-hot-toast"



interface CreatingContext {
    user?: GetingData | undefined
    setUser?: any
}
export const UserContext = createContext<CreatingContext>({})

interface Iprop {
    children: ReactNode
}
const Context1 = (prop: Iprop) => {

    let userRealoadble;

    try {
        const user: GetingData = JSON.parse(`${localStorage.getItem("user")}`)


        userRealoadble = user
    } catch {
        userRealoadble = undefined
    }
    const [user, setUser] = useState<GetingData | undefined>(userRealoadble)



    const Provide = {
        user,
        setUser,
        // other methods...
    }
    return (

        <UserContext.Provider value={Provide}>

            {prop.children}
            <Toaster
                reverseOrder={false}
            />
        </UserContext.Provider>

    )
}

export default Context1