import NavBar from "@/components/Navbar";
import Feature from "@/components/feature";
import Invite from "@/components/utils/invite-url";
import MainBtn from "@/components/utils/main-btn";
import SecondaryButton from "@/components/utils/secondary-button";
import "@/public/css/global.css";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <div className="sm:h-screen relative">
        <NavBar />

        <div className="cont h-[calc(100vh-128px)]">
          <div className="grid h-full w-full items-center justify-cenetr grid-cols-1 lg:grid-cols-2">
            <div className="relative lg:text-left text-center sm:mb-0 mb-16">
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
                  <SecondaryButton className="md:inline-block hidden md:ms-7 ms-0 lg:mt-0 mt-5">
                    Dashboard
                  </SecondaryButton>
                </Link>
              </div>
            </div>
            <div className="hidden justify-center md:justify-end lg:flex">
              <Image
                width={450}
                height={350}
                alt="randoms"
                src="/img/randoms.png"
                className="w-[auto] h-[auto]"
              />
            </div>
          </div>
          <div className="mt-10">
            <Feature
              title="Create Games"
              description="With the simple command
              /create_quizgame, You can easily create a game  , invite your friends and play quiz game together "
              img="/img/cr_game.svg"
              direction="right"
            />
            <Feature
              title="More Than 10 categories"
              description="RandomBot offers an array of over 10 categories to choose from for your quiz, or you can keep it exciting by setting it to random"
              direction="left"
              img="/img/cat.svg"
            />
            <Feature
              title="Difficulties"
              description="choose the diificulty that you want easy , medium or hard"
              direction="right"
              img="/img/diff.svg"
            />
            <Feature
              title="Configurable"
              description="Random Bot offers remarkable configurability! You can enable/disable commands, set roles, and easily customize the quiz game. Take full control and adapt the bot's behavior to your preferences effortlessly."
              direction="left"
              img="/img/config.svg"
            />
            <Feature
              title="Open source"
              description="Random Bot is open-source, giving you the freedom to view the code, report issues, and request changes."
              direction="right"
              img="/img/src.svg"
              buttonType="Secondary"
              buttonContent="Repo"
              buttonLink=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
