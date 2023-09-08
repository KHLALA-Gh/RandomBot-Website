import {
  faEllipsisV,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import DeleteGame from "../DeleteGame";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { DashBoardData, DashboardContext } from "@/app/dashboard/server/layout";
import "./style.css";
interface Game {
  creator: {
    name: string;
    img: string;
    id: string;
  };
  maxPlayers: number;
  playersLength: number;
  amount: number;
  category: string;
  difficulty: string;
  status: "started" | "ended" | "waiting";
  hostId: string;
  onClick: (ctrlMode?: boolean) => any;
  selected: boolean;
}

export default function Game({
  creator,
  maxPlayers,
  playersLength,
  amount,
  category,
  difficulty,
  status,
  hostId,
  onClick,
  selected,
}: Game) {
  const { data, update } = useContext(DashboardContext) as DashBoardData;
  const params = useSearchParams();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationKey: ["delete game"],
    mutationFn: async () => {
      return (
        await axios.delete(`/api/servers/${params.get("id")}/games/${hostId}`)
      ).data;
    },
  });
  const [showOp, setShowOp] = useState<boolean>();
  const [showDl, setShowDl] = useState<boolean>();
  const [isShifted, setIsShifted] = useState<boolean>(false);
  const [isS, setIsS] = useState<boolean>(false);
  const [holdMode, setHoldMode] = useState<boolean>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const sHandlerDown = (e: any) => {
    setIsS(e.shiftKey);
  };
  const sHandlerUp = (e: any) => {
    setIsS(false);
  };
  useEffect(() => {
    if (isSuccess) {
      setShowDl(false);
      update({
        ...data,
        games: data.games.filter((g) => g.hostId !== hostId),
      });
    }
  }, [isSuccess]);

  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  return (
    <>
      <div
        ref={ref}
        onMouseDown={(e) => {
          if (e.shiftKey) {
            mutate();
          }
          setHoldMode(false);
          const id = setTimeout(() => {
            setHoldMode(true);
          }, 300);
          setTimeoutId(id);
          console.log("down");
        }}
        onMouseUp={(e) => {
          setIsShifted(false);
          console.log("up");
          console.log(holdMode);
          onClick(holdMode);
        }}
        className={
          "p-3 flex w-full rounded-md hover:bg-[#fff5] cursor-pointer select-none " +
          (isS || selected ? "!bg-red-600" : "")
        }
        onKeyDown={sHandlerDown}
        onKeyUp={sHandlerUp}
        tabIndex={0}
        onMouseEnter={(e) => {
          ref.current.focus();
        }}
        onMouseLeave={() => {
          ref.current.blur();
          setIsS(false);
          setShowOp(false);
        }}
      >
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 items-center w-full">
          <div className="flex gap-3 items-center justify-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: isLoading
                  ? "#dc2626"
                  : status === "started" && !isLoading
                  ? "#14FF00"
                  : status === "ended"
                  ? "#dc2626"
                  : "#edff00",
              }}
            ></div>
            <h1 className="text-xl status">
              {!isLoading && status}
              {isLoading && "Deleting "}
              {isLoading && <FontAwesomeIcon icon={faSpinner} spinPulse />}
            </h1>
          </div>
          <div className="flex gap-3 items-center justify-center">
            <Image
              alt="user img"
              className="border-white border-2 rounded-full"
              src={creator.img}
              width={32}
              height={32}
            />

            <h1>{creator.name}</h1>
          </div>
          <h1 className="text-center lg:block hidden">
            {playersLength} / {maxPlayers}
          </h1>
          <h1 className="text-center text-sm xl:block hidden">
            {category}/{amount}/{difficulty}
          </h1>
        </div>
        <div
          className="flex justify-center items-center relative w-6"
          onClick={() => {
            setShowOp(!showOp);
          }}
        >
          {!isShifted && <FontAwesomeIcon icon={faEllipsisV} />}
          <div
            className={
              "rounded-md bg-arr absolute top-10 sm:left-[-90px] left-[-120px] w-36 z-10 " +
              (showOp ? "block" : "hidden")
            }
          >
            <h1 className="text-center p-2 text-sleep">Manage</h1>
            <h1
              className={"text-center p-2 rounded-b-md bg-red-600"}
              onClick={() => setShowDl(true)}
            >
              Delete <FontAwesomeIcon icon={faTrash} className="ms-2" />
            </h1>
          </div>
        </div>
      </div>
      {showDl && (
        <DeleteGame
          isError={isError}
          error={
            error instanceof AxiosError
              ? `[${error.response?.status}] ${error.response?.statusText}`
              : "An unexpected error occurred"
          }
          onDelete={mutate}
          isLoading={isLoading}
          onCancel={() => setShowDl(false)}
        />
      )}
    </>
  );
}
