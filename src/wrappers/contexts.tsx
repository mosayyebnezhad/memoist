
"use client"
import { createContext, ReactNode, useState } from "react"
import { Toaster } from "react-hot-toast"

interface Iprop {
    children: ReactNode
}

interface CreatingContext {

}

export const UserContext = createContext({})

const Context1 = (prop: Iprop) => {

    const [user, setUser] = useState()



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