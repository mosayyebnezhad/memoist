import api from "@/api/api"
import { UserContext } from "@/wrappers/contexts"
import { Button, Spinner } from "@nextui-org/react"
import { CheckCircle, CheckCircleSolid } from "iconoir-react"
import { useContext, useState } from "react"
import toast from "react-hot-toast"



interface IProp {
    id: number,
    Providestatus: boolean
}


const TodoBtn = (prop: IProp) => {

    const { id, Providestatus } = prop



    const { user } = useContext(UserContext)
    const [loadingStatus, setLoadingStatus] = useState<boolean>(false)




    const [status, SetState] = useState(Providestatus)

    const HandelSendDoitStatus = (e: boolean, id: number) => {
        setLoadingStatus(true)



        const SendData = {
            status: e
        }
        api.put(`todo/${id}`, SendData, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        })
            .then(s => {
                toast.success(s.data.message)
                SetState(!status)
            })
            .catch(s => {
                toast.error(s.response.data.message)
            })
            .finally(() => {
                setLoadingStatus(false)

            })



    }


    return (
        <Button size="md" variant={status ? "solid" : "bordered"} color={status ? "secondary" : "default"} className="mr-2 flex justify-center items-center">

            {loadingStatus ?

                <Spinner size="sm" color="success" />

                :

                <>
                    {status ?
                        <div className="text-sm flex items-center gap-2"
                            onClick={() => HandelSendDoitStatus(false, id)} >
                            <CheckCircle />
                            <p>انجام شده</p>
                        </div>
                        :
                        <div className="text-sm flex items-center gap-2"
                            onClick={() => HandelSendDoitStatus(true, id)} >
                            <CheckCircleSolid />
                            <p>انجام نشده</p>
                        </div>
                    }

                </>
            }





        </Button>
    )
}

export default TodoBtn