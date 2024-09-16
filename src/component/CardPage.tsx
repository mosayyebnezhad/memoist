
import api from "@/api/api";
import { DeleteNode } from "@/app/components/delete";
import TodoBtn from "@/app/components/TodoButton";
import { UserContext } from "@/wrappers/contexts";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, ScrollShadow } from "@nextui-org/react";
import { Bin, CheckCircle, CheckCircleSolid, EditPencil, Eye } from "iconoir-react";
import Link from "next/link";
import { useContext, useState } from "react";
import toast from "react-hot-toast";



interface IProp {
    title: string,
    description: string
    id: any
    status: boolean
    refech: () => void
}




const CardPage = (prop: IProp) => {

    const { user } = useContext(UserContext)
    const { description, title, id, status } = prop


    const Data = {
        title: title,
        description: description,
        id: id,
        status: status

    }


  



    return (
        <Card className="w-80 h-80  rtl ">
            <div className="w-10/12 mx-auto py-2">
                <div className="h-12 w-full flex justify-start items-center font-bold">



                    {Data.title}
                </div>
                <Divider />
                <div className="font-thin  text-sm mt-2 mb-3">

                </div>

                <ScrollShadow className="w-full h-[180px]" style={{ height: "180px" }}>
                    <p>
                        {Data.description}
                    </p>
                </ScrollShadow>
                <Divider className="mt-2" />
                <div className="mt-2 h-12 flex justify-center items-center">

                    <DeleteNode id={id} refech={prop.refech} />
                    <TodoBtn Providestatus={Data.status} id={Data.id} />

                    <Button size="sm" variant="bordered" color="warning" className="mr-2">
                        <Link className="w-full h-full flex justify-center items-center" href={`../../../../AddTodo/${id}?title=${title}&desc=${description}`}                        >
                            <EditPencil />
                        </Link>
                    </Button>
                </div>

            </div>
        </Card>
    )
}
export default CardPage