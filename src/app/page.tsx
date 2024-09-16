"use client"

import api from "@/api/api";
import CardPage from "@/component/CardPage";
import { Todo } from "@/types/types";
import { UserContext } from "@/wrappers/contexts";
import { Pagination, Skeleton, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";

import { Fragment, useContext, useEffect, useState } from "react";
import { withAuth } from "./HOC/AuthHOC";
import toast from "react-hot-toast";


const Home = () => {
  const { user, setUser } = useContext(UserContext)
  const [feth, canifetch] = useState(false)
  const [haveUser, isHaveuser] = useState(false)
  const router = useRouter()
  const [currontPage, setcurront] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)


  const [page, setPage] = useState<number>(1)
  useEffect(() => {
    if (user) {
      if (!(user.token)) {
        toast.error("کاربر احراز هویت نشده است")
        router.push("../auth/login")

      } else {
        isHaveuser(true)
      }
    } else {
      toast.error("کاربر احراز هویت نشده است")
      router.push("../auth/login")
    }

  }, [user])


  let token: string;


  if (haveUser && user) {

    token = user.token

  }



  const checking = () => {
    const response = api.get("auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        page: 1,
        pageSize: 10
      }
    })
    console.log("chcking is work")
    return response
  }
  const preAuth = useQuery({
    queryKey: ['check'],
    queryFn: checking,
    enabled: haveUser
  })

  const Err: any = preAuth.error

  useEffect(() => {
    console.log()

    if (Err?.response.data.message) {
      toast.error(Err?.response.data.message)
      localStorage.removeItem("user")
      setUser(undefined)
      router.push("../../../../auth/login")
    }


    if (preAuth.data) {
      canifetch(true)
    }
  }, [preAuth.isFetched])



  const fetchfunch = (e: number) => {
    const response = api.get("todo", {
      headers: {
        Authorization: `Bearer ${user?.token}`
      },
      params: {
        page: e,
        pageSize: 2
      }
    })

    return response
  }
  const { data, isLoading, error, isFetching, refetch, isFetched } = useQuery({
    queryKey: ['todolist', page],
    queryFn: () => fetchfunch(page),
    enabled: feth
  })




  useEffect(() => {
    let total = data?.data.pagination.totalPage;
    let current = data?.data.pagination.currentPage;


    setTotal(total)
    setcurront(current)


  }, [isFetching])




  const OutD: Todo[] = data?.data.data


  return (
    <div className="container justify-center mx-auto flex flex-wrap gap-5 h-auto">


      {isFetching &&

        <>
          <div className="w-80 h-80 bg-gray-500 animate-pulse rounded-lg">

          </div>
          <div className="w-80 h-80 bg-gray-500 animate-pulse rounded-lg">

          </div>
        </>
      }


      {(OutD && !isFetching) &&


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


      <div className="w-full mt-8 mb-24 flex justify-center">

        {total ?
          <Pagination total={total} initialPage={currontPage} onChange={(e) => {
            setPage(e)
          }} />
          :
          <>
            {isFetched
              ?
              <>
              </>
              :
              <Spinner />
            }
          </>
        }



      </div>

    </div>
  );
}




// export default withAuth(Home)
export default Home
