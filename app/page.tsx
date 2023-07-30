import Doc from "@/components/Doc";
import NavBar from "@/components/Navbar";
import Feature from "@/components/feature";
import Invite from "@/components/utils/invite-url";
import MainBtn from "@/components/utils/main-btn";
import SecondaryButton from "@/components/utils/secondary-button";
import "@/public/css/global.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/";
import Image from "next/image";
import Link from "next/link";
const Page = () => {
  return (
    <>
      <div className="relative">
        <NavBar />

        <div className="cont">
          <div className="grid w-full items-center justify-cenetr grid-cols-1 lg:grid-cols-2 h-[calc(100vh-128px)]">
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
              buttonLink="https://github.com/RandomX12/RandomBot"
            />
          </div>
          <div className="mt-32">
            <h1 className="text-center text-[48px] text-main">Docs</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10 mt-10 p-7">
              <Doc
                redirect="/docs#configs"
                title="How to configure RandomBot"
                img="/img/config.svg"
              />
              <Doc
                redirect="/docs#create_quizgame"
                title="How to create a quiz game"
                img="/img/cr_game.svg"
              />
              <Doc
                redirect="/docs#cr_rnd"
                title="How to make your own RandomBot"
                img="/img/src.svg"
              />
            </div>
            <div className="flex justify-center mt-24 mb-24">
              <Link href="/docs">
                <SecondaryButton>Go To Docs</SecondaryButton>
              </Link>
            </div>
          </div>
        </div>
        <div className="h-[400px] w-full bg-main mt-16 flex justify-center items-center">
          <div>
            <h1 className="sm:text-[48px] text-[32px] text-black text-center">
              Make your Discord server more fun
            </h1>
            <div className="overflow-hidden">
              <Invite>
                <MainBtn className="!bg-black !text-main translate-x-[-50%] ms-[50%] mt-10">
                  Invite
                </MainBtn>
              </Invite>
            </div>
          </div>
        </div>
        <footer className="bg-black">
          <div className="md:flex block justify-between md:p-16 p-5">
            <div className="md:translate-x-[0%] md:ms-[0%] ms-[50%] translate-x-[-50%]">
              <Image
                width={393}
                height={43}
                alt="logo"
                src="/img/RandomX.svg"
              />
            </div>
            <Link
              className="md:translate-x-[0%] md:ms-[0%] ms-[50%] translate-x-[-50%]"
              href="https://github.com/RandomX12/RandomBot"
            >
              <div className="">
                <Image
                  width={64}
                  height={64}
                  alt="github repo"
                  src="/img/github.svg"
                  className="md:translate-x-[0%] md:ms-[0%] ms-[50%] translate-x-[-50%] md:mt-0 mt-7"
                />
              </div>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Page;
