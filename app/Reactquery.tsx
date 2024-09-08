"use client"

import { ReactNode } from "react"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import GlobalLoading from "@/components/globalfetching"


interface Iprop {
    children: ReactNode
}

const Reactquery = (prop: Iprop) => {


    const queryClient = new QueryClient()



    return (
        <>
            <QueryClientProvider client={queryClient}>
                <GlobalLoading />
                {prop.children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    )
}


export default Reactquery