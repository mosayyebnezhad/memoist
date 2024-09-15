"use client"
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner } from "@nextui-org/react";
import api from "@/api/api";
import { UserContext } from "@/wrappers/contexts";
import { IUser } from "@/types/types";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";



interface IProp {
    children: ReactNode,
    description: String,
    title: string,
}

export default function ModalAccept(prop: IProp) {

    const router = useRouter()


    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [loading, setLoading] = useState<boolean>(false)

    const { user, setUser } = useContext(UserContext)

    const [redierecstate, setRedirect] = useState<string | null>()


    // useEffect(() => {

    //     redirect(`${redierecstate}`)

    // }, [redierecstate])




    const handlelogout = () => {

        const lCS = localStorage.getItem("user");
        if (!lCS) {
            onClose()

            return null
        }
        const token = JSON.parse(lCS).token
        console.log(token)

        const run = async () => {
            setLoading(true)
            let canout = false;
            await api.delete("auth/logout",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                })
                .then(s => {
                    localStorage.removeItem("user")
                    setUser(undefined)
                    console.log(s)
                    setRedirect("")
                    router.push("../../../../auth/login")

                }).catch(s => {
                    console.log(s)
                    toast.error("خطا")

                }).finally(() => {
                    setLoading(false)
                 
                })
        }
        run()






        onClose()
    }


    return (
        <>
            <Button onPress={onOpen} variant="faded" color="danger">
                {prop.children}
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 rtl w-11/12 mx-auto">
                                {prop.title}
                            </ModalHeader>
                            <ModalBody>
                                <p className=" text-right">
                                    {prop.description}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                {loading ?

                                    <>
                                        <Button>
                                            <Spinner />
                                        </Button>
                                    </>


                                    :
                                    <>
                                        <Button color="primary" variant="light" onPress={onClose}>
                                            خیر
                                        </Button>
                                        <Button color="danger" variant="faded" onPress={handlelogout}>
                                            بلی
                                        </Button>
                                    </>

                                }

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
