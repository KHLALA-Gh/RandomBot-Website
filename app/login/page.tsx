"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/dashboard");
  } else {
    signIn("discord");
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <div>
          <div className="flex justify-center w-full">
            <Image
              className=""
              src={"/img/rnd.png"}
              alt=""
              width={128}
              height={128}
            />
          </div>
          <h1 className="text-center mt-7">Redirecting to discord auth...</h1>
          <div className="w-[212px] h-[212px] bg-main rad rounded-full absolute top-[50%] blur-[150px] blur-effect z-[-1]"></div>
        </div>
      </div>
    </>
  );
}
