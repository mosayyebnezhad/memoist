"use client"
import { Button, Card, Input } from "@nextui-org/react";
import { InfoCircle } from "iconoir-react";
import Link from "next/link";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
const LoginPage = () => {

    const email = useRef<any>(null)
    const password = useRef<any>(null)


    interface IError {
        email?: string;
        password?: string;
    }

    const [error, setError] = useState<IError>({})


    const handleclick = () => {
        let Email = "";
        let Password = "";
        if (email.current) {
            Email = email.current.value

        }

        if (password.current) {
            Password = password.current.value

        }


        let error = false
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


            toast.success("ما ارسال کردیم")

            //here to send login request and 
            // 1- recive errors and add that into error state for view it
            // 2- recive success and ...
        }


    }


    return (
        <div className="container mx-auto mt-24">

            <div className="w-full h-max flex justify-center items-center">
                <Card className="w-96 pt-5">
                    <h1 className="text-2xl text-center font-bold">ورود به سامانه</h1>
                    <form className="rtl w-80 mx-auto flex justify-center flex-wrap gap-y-5 my-5" >
                        <Input ref={email} type="email" label="ایمیل" />
                        <Input ref={password} type="password" label="رمز عبور" />
                        <Button onClick={handleclick} className="w-10/12" variant="bordered">
                            ورود
                        </Button>
                    </form>


                    <div className="flex text-sm justify-center rtl gap-3 pb-5">
                        <p>حساب کاربری ندارید؟</p>
                        <Link href={"./register"} className="font-bold">
                            ثبت نام
                        </Link>
                    </div>


                    {error.email &&

                        <div className="w-80 mx-auto items-center flex justify-start rtl gap-3 pb-5">
                            <InfoCircle color="red" />
                            <p className="text-red-400">{error.email}</p>
                        </div>
                    }
                    {error.password &&

                        <div className="w-80 mx-auto items-center flex justify-start rtl gap-3 pb-5">
                            <InfoCircle color="red" />
                            <p className="text-red-400">{error.password}</p>
                        </div>
                    }



                </Card>
            </div>

        </div>


    )
}

export default LoginPage;