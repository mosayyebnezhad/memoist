"use client"
import { useAuth } from "@/app/Hook/authHook";
import { GetingData } from "@/types/types";
import { UserContext } from "@/wrappers/contexts";
import { Button, Card, Input } from "@nextui-org/react";
import { InfoCircle, Refresh, Restart } from "iconoir-react";
import Link from "next/link";
import { redirect, useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
const LoginPage = () => {
    const { user, setUser } = useContext(UserContext)


    // if (user?.token) {
    //     redirect("/")
    // }


    const routes = useParams()





    type IPage = "login" | "register"

    const [thisPage, setThispage] = useState<IPage>("login")


    // detect the page and switch to corruct page 

    useEffect(() => {
        if (routes.something == "register") {
            setThispage("register")
        }
    }, [thisPage])





    const router = useRouter()















    interface IError {
        email?: string;
        password?: string;
        firstname?: string;
        lastname?: string;
        server?: string
    }




    const [errorList, setError] = useState<IError>({})
    const [Loading, setLoading] = useState<boolean>(false)

    const email = useRef<any>(null)
    const password = useRef<any>(null)
    const firstname = useRef<any>(null)
    const lastname = useRef<any>(null)



    const handleclick = () => {
        let Email = "";
        let Password = "";
        let FirstName = "";
        let LastName = "";



        if (email.current) {
            Email = email.current.value

        }

        if (password.current) {
            Password = password.current.value

        }
        if (thisPage == "register") {


            if (firstname.current) {
                FirstName = firstname.current.value

            }
            if (lastname.current) {
                LastName = lastname.current.value

            }


        }


        let error = false






        if (thisPage == "register") {

            if (!FirstName) {
                setError({ firstname: "نام را وارد کنید" })
                error = true
            }

            if (!LastName) {
                setError({ lastname: "نام خانوادگی را وارد کنید" })
                error = true
            }
        }



        if (!Password) {
            setError({ password: "رمز عبور را وارد کنید" })
            error = true
        }
        if (!Email) {
            setError({ email: "ایمیل را وارد کنید" })
            error = true

        } else {
            const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!EmailRegex.test(Email)) {
                setError({ email: "ایمیل را صحیح وارد کنید" })
                error = true
            }
        }



        if (!error) {
            setError({})




            if (thisPage == "login") {

                setLoading(true)


                const auth = useAuth({
                    side: "login",
                    email: Email,
                    password: Password,

                })



                auth.then(s => {
                    const LoginDataForSaving: GetingData = s?.data.data

                    localStorage.setItem("user", JSON.stringify(LoginDataForSaving))

                    setUser(LoginDataForSaving)




                    toast.success("ورود انجام شد")
                    // redirect("/")
                    router.push("../../../")





                }).catch(s => {
                    setError({ server: s.response.data.message })
                    toast.error(s.response.data.message)
                })
                    .finally(() => {
                        setLoading(false)

                    })






            }

            if (thisPage == "register") {


                setLoading(true)


                const auth = useAuth({
                    side: "register",
                    email: Email,
                    password: Password,
                    firstName: FirstName,
                    lastName: LastName
                })


                auth.then(s => {
                    // console.log(s?.data.data)
                    toast.success("ثبت نام انجام شد")
                    router.push("/auth/login")
                }).catch(s => {
                    setError({ server: s.response.data.message })
                    toast.error(s.response.data.message)
                })
                    .finally(() => {
                        setLoading(false)
                    })



            }
        }


    }


    return (
        <div className="container mx-auto mt-24">

            <div className="w-full h-max flex justify-center items-center">
                <Card className="w-96 pt-5">
                    <h1 className="text-2xl text-center font-bold">

                        {thisPage == "login" ? "ورود به سامانه" : "ثبت نام در سامانه"}
                    </h1>
                    <form className="rtl w-80 mx-auto flex justify-center flex-wrap gap-y-5 my-5" >
                        <Input ref={email} type="email" label="ایمیل" />


                        {thisPage === "register" &&
                            <>
                                <Input ref={firstname} type="text" label="نام" />
                                <Input ref={lastname} type="text" label="نام خانوادگی" />
                            </>
                        }
                        <Input ref={password} type="password" label="رمز عبور" />


                        <Button disabled={Loading} onClick={handleclick} className="w-10/12"
                            variant={Loading ? "solid" : "bordered"}>
                            {!Loading ?
                                "ورود"
                                :
                                <Refresh className="animate-spin" />
                            }
                        </Button>
                    </form>


                    <div className="flex text-sm justify-center rtl gap-3 pb-5">


                        {thisPage === "login" ?


                            <>
                                <p>حساب کاربری ندارید؟</p>
                                <Link href={"./register"} className="font-bold">
                                    ثبت نام
                                </Link>
                            </>
                            :


                            <>
                                <p>حساب کاربری دارید؟</p>
                                <Link href={"./login"} className="font-bold">
                                    ورود
                                </Link>
                            </>

                        }
                    </div>


                    {errorList.email &&

                        <div className="w-80 mx-auto items-center flex justify-start rtl gap-3 pb-5">
                            <InfoCircle color="red" />
                            <p className="text-red-400">{errorList.email}</p>
                        </div>
                    }

                    {errorList.password &&

                        <div className="w-80 mx-auto items-center flex justify-start rtl gap-3 pb-5">
                            <InfoCircle color="red" />
                            <p className="text-red-400">{errorList.password}</p>
                        </div>
                    }
                    {errorList.firstname &&

                        <div className="w-80 mx-auto items-center flex justify-start rtl gap-3 pb-5">
                            <InfoCircle color="red" />
                            <p className="text-red-400">{errorList.firstname}</p>
                        </div>
                    }

                    {errorList.lastname &&

                        <div className="w-80 mx-auto items-center flex justify-start rtl gap-3 pb-5">
                            <InfoCircle color="red" />
                            <p className="text-red-400">{errorList.lastname}</p>
                        </div>
                    }

                    {errorList.server &&

                        <div className="w-80 mx-auto items-center flex justify-start rtl gap-3 pb-5">
                            <InfoCircle color="red" />
                            <p className="text-red-400">{errorList.server}</p>
                        </div>
                    }



                </Card>
            </div>

        </div>


    )
}

export default LoginPage;