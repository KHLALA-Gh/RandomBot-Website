import NavBar from "@/components/Navbar";
import Invite from "@/components/utils/invite-url";
import MainBtn from "@/components/utils/main-btn";
import SecondaryButton from "@/components/utils/secondary-button";
import "@/public/css/global.css";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="h-screen relative">
        <NavBar />

        <div className="cont h-[calc(100vh-128px)]">
          <div className="grid h-full w-full items-center justify-cenetr grid-cols-1 md:grid-cols-2">
            <div className="relative md:text-left text-center">
              <h1 className=" font-bold lg:text-[64px] sm:text-[56px] text-[48px]">
                RandomBot
              </h1>
              <p className="mt-5 text-sleep font-bold">
                Engage your Discord server with on-demand quizzes by typing
                /create_quizgame. Test your knowledge, learn, have fun and make
                communication enjoyable.
              </p>
              <div className="w-[212px] h-[212px] bg-main rad rounded-full absolute top-[50%] blur-[150px] blur-effect z-[-1]"></div>

              <div className="mt-5">
                <Invite>
                  <MainBtn className="mt-5">Invite</MainBtn>
                </Invite>
                <Link href="/dashboard">
                  <SecondaryButton className="ms-7">Dashboard</SecondaryButton>
                </Link>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                width={450}
                height={350}
                alt="randoms"
                src="/img/randoms.png"
                className="w-[auto] h-[auto]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
