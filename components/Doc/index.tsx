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
        <Image src={img} alt="img" width={0} height={250} className="w-full" />
      </div>
      <h1 className="text-2xl mt-5">{title}</h1>
    </div>
  );
}
