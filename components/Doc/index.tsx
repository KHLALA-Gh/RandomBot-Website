"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DocProps {
  img: string;
  title: string;
  redirect: string;
}

export default function Doc({ img, title, redirect }: DocProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(redirect)}
      className="bg-[#35373C] relative rounded-md p-7 hover:scale-105 hover:drop-shadow-main duration-300 cursor-pointer"
    >
      <div className="w-full relative">
        <Image
          className="center-x"
          src={img}
          alt="img"
          width={256}
          height={256}
        />
      </div>
      <h1 className="text-2xl mt-5">{title}</h1>
    </div>
  );
}
