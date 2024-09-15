
import { DeleteNode } from "@/app/components/delete";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, ScrollShadow } from "@nextui-org/react";
import { Bin, EditPencil } from "iconoir-react";
import Link from "next/link";



interface IProp {
    title: string,
    description: string
    id: any
    refech: () => void
}




const CardPage = (prop: IProp) => {


    const { description, title, id } = prop


    const Data = {
        title: title,
        description: description,
        id: id

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


                    {/* <Link href={"../../../../AddTodo/delete/" + id}>
                            <Bin />
                        </Link> */}


                    <DeleteNode id={id} refech={prop.refech} />

                    <Button variant="bordered" color="warning" className="mr-2">
                        <Link href={`../../../../AddTodo/${id}?title=${title}&desc=${description}`}



                        >
                            <EditPencil />
                        </Link>
                    </Button>
                </div>
            </div>
        </Card>
    )
}
export default CardPage