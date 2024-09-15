"use client"

import api from "@/api/api";
import CardPage from "@/component/CardPage";
import { Todo } from "@/types/types";
import { UserContext } from "@/wrappers/contexts";
import { Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";

import { Fragment, useContext, useEffect } from "react";
import { withAuth } from "./HOC/AuthHOC";


const Home = () => {
  const { user } = useContext(UserContext)

  const router = useRouter()


  useEffect(() => {
    if (!user) {

      router.push("../auth/login")

    }
  }, [user])


  const fetchfunch = () => {
    const response = api.get("todo", {
      headers: {
        Authorization: `Bearer ${user?.token}`
      },
      params: {
        page: 1,
        pageSize: 10
      }
    })

    return response
  }



  const { data, isLoading, error, isPending, refetch } = useQuery({
    queryKey: ['todolist'],
    queryFn: fetchfunch
  })


  // console.log(isLoading)
  // console.log(isPending)

  const OutD: Todo[] = data?.data.data

  return (
    <div className="container justify-center mx-auto flex flex-wrap gap-5">


      {isPending &&

        <>
          <div className="w-80 h-80 bg-gray-500 animate-pulse rounded-lg">

          </div>
          <div className="w-80 h-80 bg-gray-500 animate-pulse rounded-lg">

          </div>
        </>
      }


      {OutD &&


        <>

          {OutD.length > 0 ?
            <>
              {OutD.map((item, index) => {
                return (
                  <Fragment key={index}>



                    <CardPage id={item.id} title={item.title} description={item.description} refech={
                      () => {
                        refetch()
                      }
                    } />

                  </Fragment>


                )
              })}
            </>

            :
            <p className="text-center text-gray-400">!داده ای دریافت نشد</p>
          }

        </>



      }




    </div>
  );
}




// export default withAuth(Home)
export default Home
