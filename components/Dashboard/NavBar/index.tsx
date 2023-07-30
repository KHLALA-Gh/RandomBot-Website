import Image from "next/image";
import Commands from "./options/commands";

interface DashBoardNavBarProps {
  data: Guild | undefined;
  isLoading: boolean;
}

export default function DashboardNavBar({
  isLoading,
  data,
}: DashBoardNavBarProps) {
  return (
    <>
      <div className="h-screen w-[350px] bg-[#35373C] rounded-r-md pt-7 ps-5 pr-5">
        <div>
          <div className="flex justify-center">
            <div
              className={
                "flex justify-center rounded-full h-[128px] w-[128px] " +
                (isLoading ? "loading" : "")
              }
            >
              <Image
                src={data?.icon || ""}
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
        <div className="rounded-md border-2  border-main"></div>
      </div>
    </>
  );
}
