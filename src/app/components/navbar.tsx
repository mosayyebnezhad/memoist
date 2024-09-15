"use client"

import { ThemeSwitch } from "@/component/theme-switch";
import Logo from "./logo";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/wrappers/contexts";
import { LogOut, PlusCircle } from "iconoir-react";
import { Spinner } from "@nextui-org/spinner";
import ModalAccept from "./model";
import { GetingData } from "@/types/types";
import { useParams } from "next/navigation";

const Navbar = () => {


    const { user } = useContext(UserContext)

    const [data, setData] = useState<GetingData | undefined>(undefined)


    useEffect(() => {

        setData(user)

    }, [user])

    return (
        <>
            <div className="container mx-auto mt-6">
                <nav className="flex justify-between ">
                    <Link href={"../../../../../"}>
                        <Logo />
                    </Link>
                    <div className="flex items-center justify-center gap-4">
                        {
                            data &&
                            <Button variant="shadow" color="primary">
                                <Link className="flex w-full gap-2" href={"../../../../AddTodo"}>
                                    افزودن
                                    <PlusCircle />
                                </Link>
                            </Button>



                        }



                        <Button color="default">
                            {data ?



                                <Link href={"/profile"}>
                                    {data.user.firstName}
                                </Link>

                                :
                                <Link href={"/auth/login"}>
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