import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

interface CommandsProps {
  commands?: string[];
}

export default function Commands({ commands }: CommandsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  return (
    <>
      <div className="relative">
        <div className="flex hover:bg-[#ffffff56] justify-between p-3 rounded-md cursor-pointer">
          <Link
            href={`${
              location.origin
            }/dashboard/server/commands?id=${searchParams.get("id")}`}
          >
            <div className="flex gap-5">
              <h1 className="text-main w-[20px]">/</h1>
              <h1 className="text-main">Commands</h1>
            </div>
          </Link>
          <div className="text-main" onClick={() => setOpen(!open)}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`duration-300 ${open ? "rotate-180" : ""}`}
            />
          </div>
        </div>
        <div
          className={"w-[90%] center-x relative duration-300 overflow-hidden"}
        >
          {commands?.map((e, i) => {
            return (
              <div
                key={i}
                className={"center-x mt-1 mb-1 " + (!open ? "hidden" : "")}
              >
                <Link
                  href={`${
                    location.origin
                  }/dashboard/server/commands/${e}?id=${searchParams.get(
                    "id"
                  )}`}
                >
                  <p
                    className={
                      "text-center text-sleep text-sm " +
                      (pathName.split("/").reverse()[0] === e
                        ? "text-white"
                        : "")
                    }
                  >
                    {e}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
