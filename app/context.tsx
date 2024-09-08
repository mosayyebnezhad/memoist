"use client"

import { IUser } from "@/types/types"
import { createContext, ReactNode, useState } from "react"
interface ICreatContext {
    user?: IUser | undefined,
    setUser?: any
}

export const Context = createContext<ICreatContext>({})


interface Iprop {
    children: ReactNode
}
const Contextprovider = (prop: Iprop) => {

    const userRealoadble = JSON.parse(`${localStorage.getItem("user")}`)
    console.log(userRealoadble)
    const [user, setUser] = useState<IUser | undefined>(userRealoadble)


    const Provide = {
        user,
        setUser
    }
    return (
        <>
            <Context.Provider value={Provide}>
                {prop.children}
            </Context.Provider>
        </>
    )
}

export default Contextprovider