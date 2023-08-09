import Image from "next/image";
import { DashBoardNavBarProps } from ".";
import ServerOption from "./options/server";
import Commands from "./options/commands";
import Quiz from "./options/quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function DashBoardNavBarMobile({
  isLoading,
  data,
  config,
}: DashBoardNavBarProps) {
  return (
    <>
      <div className="md:hidden flex justify-center h-screen w-[75px] bg-[#35373C] rounded-r-md pt-7 ps-3 pr-3 relative pb-7 flex-col">
        <div>
          <div className="border-b-2 border-b-main pb-7">
            <div
              className={
                "rounded-full w-[48px] h-[48px] overflow-hidden" +
                (isLoading ? " loading" : "")
              }
            >
              {!isLoading && (
                <Image
                  width={48}
                  height={48}
                  alt="image"
                  src={`https://cdn.discordapp.com/icons/${data?.id}/${data?.icon}.png`}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-10 flex-grow">
          <ServerOption />
          <Commands />
          <Quiz quiz={[]} />
        </div>
        <Link href={"/dashboard"}>
          <div className="bg-red-600 rounded-md text-white p-2 mt-5 cursor-pointer relative">
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="mr-5 center-x"
            />
          </div>
        </Link>
      </div>
    </>
  );
}
