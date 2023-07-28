"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  signOut({ redirect: false });
  router.push("/");
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div>
          <Image src={"/img/rnd.png"} alt="" width={128} height={128} />
        </div>
      </div>
    </>
  );
}
