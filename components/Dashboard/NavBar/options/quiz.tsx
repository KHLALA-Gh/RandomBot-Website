import { faChevronDown, faGamepad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

interface QuizProps {
  quiz: QuizGeneralConfig<QuizGeneralConfigType>[];
}

export default function Quiz({ quiz }: QuizProps) {
  const [open, setOpen] = useState<boolean>(false);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  return (
    <>
      <div className="relative">
        <div className="flex hover:bg-[#ffffff56] justify-center md:justify-between md:p-3 rounded-md cursor-pointer pt-3 pb-3">
          <Link href={`/dashboard/server/quiz?id=${searchParams.get("id")}`}>
            <div className="flex gap-5 items-center md:justify-start justify-center">
              <FontAwesomeIcon
                icon={faGamepad}
                className={`md:w-[20px] text-main md:text-[16px] text-[30px]`}
              />
              <h1 className="text-main md:block hidden">Quiz</h1>
            </div>
          </Link>
          <div
            className="text-main md:block hidden"
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`duration-300 ${open ? "rotate-180" : ""}`}
            />
          </div>
        </div>
        <div
          className={
            "w-[90%] center-x relative duration-300 overflow-hidden md:block hidden"
          }
        >
          {quiz?.map((e, i) => {
            return (
              <div
                key={i}
                className={"center-x mt-1 mb-1 " + (!open ? "hidden" : "")}
              >
                <Link
                  href={`/dashboard/server/quiz/${e.key}?id=${searchParams.get(
                    "id"
                  )}`}
                >
                  <p
                    className={
                      "text-center text-sleep text-sm " +
                      (pathName.split("/").reverse()[0] === e.key
                        ? "text-white"
                        : "")
                    }
                  >
                    {e.name}
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
