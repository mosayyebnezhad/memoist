import { Fragment, useContext } from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { Bin } from "iconoir-react";
import api from "@/api/api";
import toast from "react-hot-toast";
import { UserContext } from "@/wrappers/contexts";

interface Iprop {
    id: number

    refech: () => void
}
export const DeleteNode = (prop: Iprop) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { user } = useContext(UserContext)

    const removeHandler = () => {
        const Run = async () => {
            await api.delete(`todo/${prop.id}`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            })
                .then(s => {
                    toast.success("عملیات با موفقیت انجام شد")
                    // inputref.current.value = ""
                    // textArea.current.value = ""
                    prop.refech()

                })
                .catch(s => {

                    toast.error(s.response.data.message)
                })

                .finally(() => {
                    // setLoading(false)
                    onClose()
                })
        }

        Run()
    }

    return (
        <Fragment>

            <Button  onPress={onOpen} variant="bordered" color="danger">

                <Bin />

            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent >
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">آیا از حذف این آیتم اطمینان دارید؟</ModalHeader>

                            <ModalFooter>
                                <Button color="primary" variant="bordered" onPress={onClose}>
                                    خیر
                                </Button>
                                <Button color="danger" variant="flat" onPress={removeHandler}>
                                    بلی
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </Fragment>
    )
}