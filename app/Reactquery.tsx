"use client"

import { ReactNode } from "react"
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


interface Iprop {
    children: ReactNode
}

const Reactquery = (prop: Iprop) => {


    const queryClient = new QueryClient()



    return (
        <>
            <QueryClientProvider client={queryClient}>
                {prop.children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    )
}


export default Reactquery