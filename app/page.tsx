"use client"
import { Button } from "@nextui-org/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
export default function Home() {


  const fetchingData = async () => {
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");

    return response.data;
  }



  const { data, isError, isLoading, isPending } = useQuery({
    queryKey: ['dog'], queryFn: fetchingData,

  })



  console.log(data)

  return (
    <>
      <Button color="primary"
        onClick={() => {
          toast.success("Coding !")
        }}>
        click
      </Button>

      {isLoading ? <div>Loading...</div>
        :
        <Image width={360} height={360} src={data.message} alt={"image"} />
        // <div> {data.message}</div>
      }




    </>
  );
}
