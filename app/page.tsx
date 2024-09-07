"use client"
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";
export default function Home() {
  return (
    <>
      <Button color="primary"
        onClick={() => {
        toast.success("Coding !")
      




        }}>
        click
      </Button>

      
    </>
  );
}
