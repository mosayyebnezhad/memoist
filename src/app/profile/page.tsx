"use client"
import api from "@/api/api"
import { GetingData } from "@/types/types"
import { UserContext } from "@/wrappers/contexts"
import { Button, Card, Input, Spinner } from "@nextui-org/react"
import { InfoCircleSolid } from "iconoir-react"
import { redirect } from "next/navigation"
import { useContext, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

const Profile = () => {

    const { user, setUser } = useContext(UserContext)


    useEffect(() => {

        if (user) {
            if (!(user.token)) {
                redirect("../../../auth/login")

            }
        } else {
            redirect("../../../auth/login")

        }
    }, [user])



    const name = useRef<any>()
    const family = useRef<any>()
    const pass = useRef<any>()



    const [loadingBTN, setloadingBTN] = useState<boolean>(false)


    type Itemtype = "name" | "family" | "pass"


    const handleClick = (item: Itemtype) => {


        let DataCripe: any = {}
        let loadingData = {
            family: false,
            name: false,
            pass: false
        }




        if (item == "name") {
            DataCripe.firstName = name.current.value

            loadingData.name = true
        }
        if (item == "family") {
            DataCripe.lastName = family.current.value
            loadingData.family = true

        }
        if (item == "pass") {
            DataCripe.password = pass.current.value
            loadingData.pass = true


        }

        setloadingBTN(true)
        console.log(DataCripe)

        api.put("user", DataCripe, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        })
            .then(s => {
                //notif
                toast.success(s.data.message)
                let token;
                if (user) {
                    token = user.token


                    //getFullData

                    const FullData = {
                        token: token,
                        firstName: s.data.data.firstName,
                        lastName: s.data.data.lastName,
                        email: s.data.data.email,
                        id: s.data.data.id
                    }

                    console.log(FullData)
                    console.log(s)
                    //state

                    const stateData: GetingData = {
                        token: FullData.token,
                        user: {
                            email: FullData.email,
                            firstName: FullData.firstName,
                            lastName: FullData.lastName,
                            id: FullData.id
                        }
                    }

                    setUser(stateData)

                    //localstorage


                    localStorage.setItem("user", JSON.stringify(stateData))

                } else {
                    toast.error("کاربر یافت نشد")
                }
            })
            .catch(s => console.log(s))
            .finally(() => {
                setloadingBTN(false)
            })




        console.log(DataCripe)
    }






    return (
        <div className="container mx-auto" >

            <div className="w-10/12 rtl mx-auto mb-64">



                <h1 className="font-bold text-3xl ">پروفایل کاربری</h1>
                <Card className="my-6 opacity-70">
                    <p className="text-sm text-red-600 w-11/12 mx-auto  mb-5 mt-5 flex gap-2">
                        <InfoCircleSolid color="red" />
                        این اپ برای تست است، بنابراین امنیت در آن به طور کامل مد نظر قرار نگرفته است.

                    </p>
                </Card>

                {user ?
                    <>
                        <Input type="text" size="lg" ref={name} defaultValue={user?.user.firstName} className="mt-6 mb-6" />


                        {loadingBTN ?
                            <Button>
                                <Spinner size="sm" />
                            </Button>
                            :
                            <Button variant="solid" color="primary"
                                onClick={() => handleClick("name")}
                            >
                                تغییر نام
                            </Button>
                        }



                        <Input ref={family} type="text" size="lg" defaultValue={user?.user.lastName} className="mt-6 mb-6" />




                        {loadingBTN ?
                            <Button>
                                <Spinner size="sm" />
                            </Button>
                            :
                            <Button variant="solid" color="primary"
                                onClick={() => handleClick("family")}>
                                تغییر نام خانوادگی
                            </Button>
                        }



                        <Input ref={pass} type="text" size="lg" className="mt-6 mb-6" />
                        {loadingBTN ?
                            <Button>
                                <Spinner size="sm" />
                            </Button>
                            :
                            <Button variant="solid" color="primary"
                                onClick={() => handleClick("pass")}>
                                رمز عبور
                            </Button>
                        }


                    </>
                    :
                    <>

                        <Input type="text" size="lg" className="mt-6 mb-6" />
                        <Button variant="solid" color="primary">
                            تغییر نام
                        </Button>

                        <Input type="text" size="lg" className="mt-6 mb-6" />
                        <Button variant="solid" color="primary">
                            تغییر نام خانوادگی
                        </Button>

                        <Input type="text" size="lg" className="mt-6 mb-6" />
                        <Button variant="solid" color="primary">
                            رمز عبور
                        </Button>
                    </>
                }

            </div>
        </div>
    )
}

export default Profile