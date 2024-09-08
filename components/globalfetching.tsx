"use client"

import { useIsFetching } from "@tanstack/react-query";

const GlobalLoading = () => {

    const isfetching = useIsFetching()

    return isfetching ? <span>loading</span> : null
}


export default GlobalLoading;   