import { ThemeSwitch } from "@/component/theme-switch";
import Logo from "./logo";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";

const Navbar = () => {
    return (
        <>
            <div className="container mx-auto mt-6">
                <nav className="flex justify-between ">
                    <Logo />
                    <div className="flex items-center justify-center gap-4">
                        <Button color="primary">
                            <Link href={"/login"}>
                                ورود
                            </Link>
                        </Button>
                        <ThemeSwitch />
                    </div>
                </nav>
            </div>

            <Divider className="my-7" />
        </>
    )
}

export default Navbar;