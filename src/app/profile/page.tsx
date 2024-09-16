"use client"
import api from "@/api/api"
import { UserContext } from "@/wrappers/contexts"
import { Button, Input, Spinner } from "@nextui-org/react"
import { redirect } from "next/navigation"
import { useContext, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

const Profile = () => {

    const { user } = useContext(UserContext)


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


    interface LOADINGDATA {
        name: boolean,
        family: boolean,
        pass: boolean
    }

    const [loadingBTN, setloadingBTN] = useState<LOADINGDATA>({
        family: false,
        name: false,
        pass: false
    })


    type Itemtype = "name" | "family" | "pass"


    const handleClick = (item: Itemtype) => {
        toast.error("این بخش در حال تکمیل است")

        let DataCripe = {
            firstName: name.current.value,
            lastName: family.current.value,
            password: pass.current.value,

        }





        if (item == "name") {

            setloadingBTN({
                family: false,
                name: true,
                pass: false
            })
        }
        if (item == "family") {

            setloadingBTN({
                family: true,
                name: false,
                pass: false
            })
        }
        if (item == "pass") {



            setloadingBTN({
                family: false,
                name: false,
                pass: true
            })
        }


        console.log(DataCripe)

        // api.put("user", DataCripe, {
        //     headers: {
        //         Authorization: `Bearer ${user?.token}`
        //     }
        // })
        //     .then(s => console.log(s))
        //     .catch(s => console.log(s))
        //     .finally(() => {
        //         setloadingBTN({
        //             family: false,
        //             name: false,
        //             pass: false
        //         })
        //     })




        console.log(DataCripe)
    }






    return (
        <div className="container mx-auto" >

            <div className="w-10/12 rtl mx-auto mb-64">



                <h1 className="font-bold text-3xl ">پروفایل کاربری</h1>

                {user ?
                    <>
                        <Input type="text" size="lg" ref={name} defaultValue={user?.user.firstName} className="mt-6 mb-6" />


                        {loadingBTN.name ?
                            <Button>
                                <Spinner />
                            </Button>
                            :
                            <Button variant="solid" color="primary"
                                onClick={() => handleClick("name")}
                            >
                                تغییر نام
                            </Button>
                        }



                        <Input ref={family} type="text" size="lg" defaultValue={user?.user.lastName} className="mt-6 mb-6" />
                        <Button variant="solid" color="primary"
                            onClick={() => handleClick("family")}>
                            تغییر نام خانوادگی
                        </Button>
                        <Input ref={pass} type="text" size="lg"  className="mt-6 mb-6" />
                        <Button variant="solid" color="primary"
                            onClick={() => handleClick("pass")}>
                            رمز عبور
                        </Button>
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