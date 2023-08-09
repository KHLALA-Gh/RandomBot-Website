"use client";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
export default function ServerOption() {
  const searchParams = useSearchParams();
  return (
    <>
      <Link href={`/dashboard/server?id=${searchParams.get("id")}`}>
        <div className="relative">
          <div className="flex hover:bg-[#ffffff56] justify-center md:justify-between md:p-3 rounded-md cursor-pointer md:pt-0 md:pb-0 pt-3 pb-3">
            <div className="flex gap-5 items-center md:justify-start justify-center">
              <FontAwesomeIcon
                icon={faDashboard}
                className={`md:w-[20px] text-main text-center md:text-[16px] text-[30px]`}
              />
              <h1 className="text-main md:block hidden">Server</h1>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
