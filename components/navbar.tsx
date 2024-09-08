"use client"
import Image from "next/image"
import { ThemeSwitch } from "./theme-switch"
import { useTheme } from "next-themes"
import { Button } from "@nextui-org/button"
import Link from "next/link"
import { useContext } from "react"
import { Context } from "@/app/context"

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const { user } = useContext(Context)
  return (
    <div className="w-10/12 mx-auto  mt-6 flex justify-between items-center">

      <Image className="" width={128} height={48} src={theme === "light" ? "/logo.svg" : "logodark.svg"} alt="" />

      <div className="flex justify-center items-center gap-2">
        <ThemeSwitch />
        <Button>
          <Link href={user ? "./profile" : "./login?active=login"}>
            {user?.firstName || "login"}
          </Link>
        </Button>
      </div>

    </div>
  )
}
