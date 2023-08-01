"use client";
import Image from "next/image";
import MainBtn from "@/components/utils/main-btn";
import Link from "next/link";
import { useState } from "react";
export default function NotFount() {
  const [imgLink, setImgLink] = useState("/img/rnd_bored.png");
  return (
    <div className="w-full flex h-screen justify-center items-center">
      <div className="">
        <div className="flex justify-center">
          <Image
            width={128}
            height={128}
            src={imgLink}
            alt=""
            className="m-0"
            onMouseOver={() => {
              setImgLink("/img/rnd_rock.png");
            }}
            onMouseOut={() => {
              setImgLink("/img/rnd_bored.png");
            }}
          />
        </div>
        <h1 className="mt-5 text-center">Page Not Found 404</h1>
        <Link href={"/"}>
          <MainBtn className="mt-5">Return to home</MainBtn>
        </Link>
      </div>
    </div>
  );
}
