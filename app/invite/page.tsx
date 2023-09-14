"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  useEffect(() => {
    router.push(
      `https://discord.com/oauth2/authorize?client_id=1035666318613037217&permissions=268436632&scope=bot${Object.keys(
        searchParams
      ).map((e) => `&${e}=${searchParams[e]}`)}`
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
