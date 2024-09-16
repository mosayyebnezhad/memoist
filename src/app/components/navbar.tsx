"use client"

import { ThemeSwitch } from "@/component/theme-switch";
import Logo from "./logo";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/wrappers/contexts";
import { LogOut, Menu, PlusCircle, Xmark } from "iconoir-react";
import { Spinner } from "@nextui-org/spinner";
import ModalAccept from "./model";
import { GetingData } from "@/types/types";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";

const Navbar = () => {


    const { user } = useContext(UserContext)

    const { theme } = useTheme()

    const [data, setData] = useState<GetingData | undefined>(undefined)


    useEffect(() => {

        setData(user)

    }, [user])


    const [menu, setmenu] = useState<"-100" | "100">("100")



    return (
        <>
            <div className="container mx-auto mt-6 relative overflow-hidden">
                <nav className="flex justify-between items-center w-11/12 mx-auto ">
                    <Link href={"../../../../../"}>
                        <Logo />
                    </Link>



                    <div className="flex gap-4 items-center">
                        <Button color="default" className="md:hidden visible">
                            {data ?



                                <Link href={"/profile"}>
                                    {data.user.firstName}  {data.user.lastName}
                                </Link>

                                :
                                <Link href={"/auth/login"}>
                                    ورود
                                </Link>
                            }

                        </Button>


                        <Menu className="cursor-pointer md:hidden visible" onClick={() => {
                            setmenu("-100")
                        }} />
                    </div>





                    <div className=" items-center justify-center gap-4  hidden md:flex ">



                        {
                            data &&
                            <Button variant="shadow" color="primary">
                                <Link className="flex w-full h-full items-center gap-2" href={"../../../../AddTodo"}>
                                    افزودن
                                    <PlusCircle />
                                </Link>
                            </Button>



                        }

                    

                        <Button color="default">
                            {data ?



                                <Link className="flex w-full h-full items-center" href={"/profile"}>
                                    {data.user.firstName} {data.user.lastName}
                                </Link>

                                :
                                <Link className="flex w-full h-full items-center" href={"/auth/login"}>
                                    ورود
                                </Link>
                            }

                        </Button>
                        {data &&
                            <ModalAccept
                                title="اطمینان دارید؟"
                                description={"آیا از خروج اطمینان دارید؟"}
                            >


                                خروج
                                <LogOut />



                            </ModalAccept>

                        }
                        <ThemeSwitch />
                    </div>
                </nav>
            </div>
            <div className={`flex items-center justify-center gap-4 absolute flex-col ${theme == "light" ? "bg-slate-400" : "bg-gray-800"} h-dvh top-0 w-full transition-all right-0
                        ${menu === "100" ? "translate-x-full" : "translate-x-0"}
                        z-50`}>
                <Xmark className="cursor-pointer md:hidden visible" onClick={() => {
                    setmenu("100")
                }} />

                {
                    data &&
                    <Button variant="shadow" color="primary">
                        <Link className="flex w-full gap-2" href={"../../../../AddTodo"}>
                            افزودن
                            <PlusCircle />
                        </Link>
                    </Button>



                }




                {data &&
                    <ModalAccept
                        title="اطمینان دارید؟"
                        description={"آیا از خروج اطمینان دارید؟"}
                    >


                        خروج
                        <LogOut />



                    </ModalAccept>

                }
                <ThemeSwitch />
            </div>


            <Divider className="my-7" />
        </>
    )



}

export default Navbar;




const LoadingBTN = () => {
    return (
        <Button variant="faded" color="default">
            <Spinner size="sm" color="current" />
        </Button>
    )
}