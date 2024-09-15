"use client";

import { ReactNode } from "react";

interface Iprop {
    children: ReactNode
}
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

export function ReactQuery(prop: Iprop) {


    return (
        <>
            <QueryClientProvider client={queryClient}>
                {prop.children}
            </QueryClientProvider>
        </>
    );
}
