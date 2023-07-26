"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "@/public/css/global.css";
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push(
      "https://discord.com/api/oauth2/authorize?client_id=1035666318613037217&permissions=8&scope=bot"
    );
  });
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div>
        <div className="flex justify-center">
          <Image src="/img/rnd.png" alt="RandomBot" width={128} height={128} />
        </div>
        <h1 className="mt-10">Redirecting To RandomBot Invite Link...</h1>
        <div className="w-[212px] h-[212px] bg-main rad rounded-full absolute top-[50%] blur-[150px] blur-effect z-[-1]"></div>
      </div>
    </div>
  );
}
