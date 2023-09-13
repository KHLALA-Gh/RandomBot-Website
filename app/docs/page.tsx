"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const url = searchParams.get("url");
    if (!url) {
      router.push("https://github.com/RandomX12/RandomBot/wiki/1.-Get-Started");
    } else {
      router.push(`https://github.com/RandomX12/RandomBot/wiki/${url}`);
    }
  }, []);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div>
          <Image
            className="center-x"
            alt="RandomBot"
            src="/img/rnd.png"
            width={128}
            height={128}
          />
          <h1 className="mt-5 text-center">Redirecting to RandomBot Docs...</h1>
          <div className="w-[212px] h-[212px] bg-main rad rounded-full absolute top-[50%] blur-[150px] blur-effect z-[-1]"></div>
        </div>
      </div>
    </>
  );
}
