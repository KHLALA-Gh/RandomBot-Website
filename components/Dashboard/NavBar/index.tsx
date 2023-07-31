"use client";
import Image from "next/image";
import Commands from "./options/commands";
import Quiz from "./options/quiz";
import "./style.css";
interface DashBoardNavBarProps {
  data?: Server & { guild?: Guild };
  isLoading: boolean;
  config?: Config;
}

export default function DashboardNavBar({
  isLoading,
  data,
  config,
}: DashBoardNavBarProps) {
  return (
    <>
      <div className="h-screen w-[350px] bg-[#35373C] rounded-r-md pt-7 ps-5 pr-5 relative pb-7  flex flex-col">
        <div>
          <div className="flex justify-center">
            <div
              className={
                "flex justify-center rounded-full h-[128px] w-[128px] " +
                (isLoading ? "loading" : "")
              }
            >
              <Image
                src={
                  `https://cdn.discordapp.com/icons/${data?.serverId}/` +
                    data?.guild?.icon +
                    ".jpg" || ""
                }
                className={"rounded-full"}
                alt=""
                width={128}
                height={128}
              />
            </div>
          </div>
          <h1
            className={
              "text-center mt-5 " +
              (isLoading ? "loading w-36 center-x h-4" : "")
            }
          >
            {data?.name}
          </h1>
        </div>
        <div className="rounded-md border-2 mt-7 border-main p-5 flex-grow overflow-y-scroll op">
          <div className="">
            <Commands commands={config?.commands} />
            <Quiz quiz={Object.keys(config?.quiz || {})} />
          </div>
        </div>
      </div>
    </>
  );
}
