import { ThemeSwitch } from "@/component/theme-switch";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import MainModal from "./components/model";

export default function Home() {
  return (
    <div>
      <Button variant="flat" color="primary">
        آیا این دکمه صحت فونت دارد؟
      </Button>

        <MainModal/>
      <ThemeSwitch/>
    </div>
  );
}
