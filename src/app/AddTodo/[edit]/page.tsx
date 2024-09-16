"use client"

import api from "@/api/api";
import { UserContext } from "@/wrappers/contexts";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { redirect, RedirectType, useParams, useRouter, useSearchParams } from "next/navigation";

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
    const params = useSearchParams()

    const param = useParams()



    const router = useRouter()
    interface IOldData {
        title?: string,
        description?: string,

    }

    const [Olddata, setOldData] = useState<IOldData>({})

    useEffect(() => {
        const Data: IOldData = {
            description: params.get("desc") || "Dummy Data",
            title: params.get("title") || "Dummy Data"
        }



        setOldData(Data)


    }, [])


    const handleClick = () => {
        const INP = String(inputref.current.value)
        const TXT = String(textArea.current.value)


        const Upload = async () => {
            setLoading(true)
            let x = false
            const Data: IDataForPost = {
                title: INP,
                description: TXT
            }

            await api.put(`todo/${param.edit}`, Data, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            })
                .then(s => {
                    toast.success("عملیات با موفقیت انجام شد")
                    // inputref.current.value = ""
                    // textArea.current.value = ""
                    x = true

                })
                .catch(s => {

                    toast.error(s.response.data.message)
                })

                .finally(() => {
                    setLoading(false)
                    if (x) {
                        router.push("../../../../")
                    }
                })
        }


        if (TXT.length > 0 && INP.length > 0) {

            Upload()
        } else {
            toast.error("اطلاعاتی وارد نشده است")
        }


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

                    {Olddata.title
                        &&

                        <Input
                            ref={inputref}
                            type="text" label="عنوان"
                            // value={}
                            // value={Olddata.title}
                            defaultValue={Olddata.title}

                        />

                    }
                    {Olddata.description
                        ?
                        <Textarea
                            ref={textArea}
                            label="توضیحات"
                            placeholder="توضیحات مربوطه"
                            className="mt-3"
                            defaultValue={Olddata.description}
                        />

                        :
                        <div className="w-full animate-pulse h-36 bg-gray-600 rounded-lg">

                        </div>
                    }
                    {!loading ?

                        <Button onClick={handleClick} className="mt-6" variant="shadow" color="secondary">
                            ویرایش
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