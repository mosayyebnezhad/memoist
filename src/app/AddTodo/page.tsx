"use client"

import api from "@/api/api";
import { UserContext } from "@/wrappers/contexts";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";


interface IDataForPost {
    title: string,
    description: string
}

const AddTodo = () => {

    const inputref = useRef<any>("");
    const textArea = useRef<any>("");
    const { user } = useContext(UserContext)

    const [loading, setLoading] = useState(true)

    const handleClick = () => {
        const INP = inputref.current.value
        const TXT = textArea.current.value



        const Upload = async () => {
            setLoading(true)

            const Data: IDataForPost = {
                title: INP,
                description: TXT
            }

            await api.post("todo", Data, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            })
                .then(s => {
                    toast.success("عملیات با موفقیت انجام شد")
                    // inputref.current.value = ""
                    // textArea.current.value = ""
                })
                .catch(s => {

                    toast.error(s.response.data.message)
                })

                .finally(() => {
                    setLoading(false)
                })
        }
        Upload()

    }

    useEffect(() => {

        if (user) {
            if ((user.token).length > 0) {

                setLoading(false)
            }
        }

    }, [user])

    return (
        <>

            <div className="container mx-auto">
                <div className="rtl ">
                    <Input
                        ref={inputref}
                        type="text" label="عنوان" />

                    <Textarea
                        ref={textArea}
                        label="توضیحات"
                        placeholder="توضیحات مربوطه"
                        className="mt-3"

                    />

                    {!loading ?

                        <Button onClick={handleClick} className="mt-6" variant="shadow" color="primary">
                            اضافه کردن
                        </Button>
                        :
                        <Button disabled className="mt-6" variant="flat" color="default">
                            <Spinner size="sm" />
                        </Button>
                    }
                </div>
            </div>

        </>
    )
}

export default AddTodo;