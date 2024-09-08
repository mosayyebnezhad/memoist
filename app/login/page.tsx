"use client"
import api from "@/Api/api";
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import { InfoCircleSolid } from "iconoir-react";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Context } from "../context";
import { IUser } from "@/types/types";
import toast from "react-hot-toast";
import { redirect, useRouter, useSearchParams } from "next/navigation";


interface Inputs {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

const Login = () => {
  const params = useSearchParams().get("active")
  console.log(params)

  const { user } = useContext(Context)

  if (user) {
    redirect("./")
  }

  if (!(params == "login" || params == "sign-up")) {
    redirect("./")
  }

  const [selected, setSelected] = useState(params);

  return (
    <>
      <h1 className="text-4xl font-bold">
        Login Page
      </h1>
      <div className="flex flex-col w-full mt-12">
        <Card className="max-w-full md:w-[340px] w-screen h-auto">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={(key: any) => setSelected(key)}
            >
              <Tab key="login" title="ورود">
                <LoginSection />
              </Tab>
              <Tab key="sign-up" title="ثبت نام">
                <RegisterSection />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
export default Login;

const LoginSection = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const router = useRouter()


  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<any>(false)

  const { setUser } = useContext(Context)

  const onSubmit: SubmitHandler<Inputs> = async (Data) => {
    setLoading(true)

    await api.post("auth/login", Data)

      .catch((s) => {

        const response = s.response.data;

        if (response.status) {
          const data = response.data

          const user: IUser = {
            email: data.user.email,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            id: data.user.id,
            token: data.token,
          }
          setUser(user)
          localStorage.setItem("user", JSON.stringify(user))
          toast.success("ورود شما با موفقیت انجام شد.")
          redirect("./")
        } else {
          setError(response.message)
          // console.log()
        }





      })
      .finally(() => {
        setLoading(false)
      })

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input className="text-right flex justify-end " {...register("email", { required: true })} isRequired label="ایمیل" placeholder="ایمیل خود را وارد کنید" type="email" />
      <Input {...register("password", { required: true })} isRequired label="رمز عبور" placeholder="رمز عبور خود را وارد کنید" type="password" />

      <div className="flex gap-2 justify-end">
        <Button disabled={loading} type="submit" fullWidth color={loading ? "default" : "primary"}>
          {loading ? "..." : "ورود"}
        </Button>
      </div>

      {errors.email && <p className="text-sm font-medium justify-end text-red-500 flex gap-2 items-end">
        <span>{`ایمیل ضروری است`}</span>
        <InfoCircleSolid width={16} color="#ef4444" />
      </p>}

      {errors.password && <p className="text-sm justify-end font-medium text-red-500 flex gap-2 items-end">
        <span>{`رمز عبور  ضروری است`}</span>
        <InfoCircleSolid width={16} color="#ef4444" />
      </p>}


      {error && <p className="text-sm  justify-end font-medium text-red-400 flex gap-2 items-end">
        <span >{`${error}`}</span>
        <InfoCircleSolid width={16} color="#ff7c7c" />
      </p>}
    </form>
  )
}

const RegisterSection = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const router = useRouter()
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<any>(false)

  const { setUser } = useContext(Context)

  const onSubmit: SubmitHandler<Inputs> = async (Data) => {
    setLoading(true)

    await api.post("user", Data)
      .then((s) => {
        console.log(s)
        toast.success("حساب شما با موفقیت ایجاد شد")


        const pyload = {
          email: Data.email,
          password: Data.password
        }
        console.log(pyload)
        const login = async () => {
          await api.post("auth/login", pyload)
            .catch(s => {
              const data = s.response.data;
              if (data.status) {
                //login
                setUser(Data)
                localStorage.setItem("user", JSON.stringify(Data))
                toast.success("ورود انجام شد")
                /// redirect here to index ./

              } else {
                toast.error("ورود ناموفق")

              }

            })
        }

        login()

      })
      .catch((s) => {
        console.log("chatched")
        setError(s.response.data.message)
      })
      .finally(() => {
        redirect("./")
        setLoading(false)

      })

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 h-auto">
      <Input {...register("email", { required: true })} isRequired label="ایمیل" placeholder="Enter your email" type="email" />
      <Input {...register("firstName", { required: true })} isRequired label="نام" placeholder="Enter your name" type="text" />
      <Input {...register("lastName", { required: true })} isRequired label="نام خانوادگی" placeholder="Enter your name" type="text" />
      <Input {...register("password", { required: true })} isRequired label="رمز عبور" placeholder="Enter your password" type="password" />


      <div className="flex gap-2 justify-end">
        <Button disabled={loading} type="submit" fullWidth color={loading ? "default" : "primary"}>
          {loading ? "..." : "ثبت نام"}
        </Button>
      </div>

      {errors.firstName && <p className="text-sm font-medium text-red-500 flex gap-2 items-end">
        <InfoCircleSolid width={16} color="#ef4444" />
        <span>{`نام ضروری است`}</span>
      </p>}
      {errors.lastName && <p className="text-sm font-medium text-red-500 flex gap-2 items-end">
        <InfoCircleSolid width={16} color="#ef4444" />
        <span>{`نام خانوادگی ضروری است`}</span>
      </p>}

      {errors.email && <p className="text-sm font-medium text-red-500 flex gap-2 items-end">
        <InfoCircleSolid width={16} color="#ef4444" />
        <span>{`ایمیل ضروری است`}</span>
      </p>}

      {errors.password && <p className="text-sm font-medium text-red-500 flex gap-2 items-end">
        <InfoCircleSolid width={16} color="#ef4444" />
        <span>{`رمز عبور ضروری است`}</span>
      </p>}

      {error && <p className="text-sm  justify-end font-medium text-red-400 flex gap-2 items-end">
        <span >{`${error}`}</span>
        <InfoCircleSolid width={16} color="#ff7c7c" />
      </p>}
    </form>
  )
}






