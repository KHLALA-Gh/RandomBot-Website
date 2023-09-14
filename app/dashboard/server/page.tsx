"use client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { DashBoardData, DashboardContext } from "./layout";
import Game from "@/components/Dashboard/Games/Game";
import MainBtn from "@/components/utils/main-btn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import DeleteGames from "@/components/Dashboard/Games/DeleteGames";
interface Props {
  searchParams: {
    id: string;
  };
}

export default function Page({ searchParams }: Props) {
  const { data, isLoading, error, update, fetch, isFetching } = useContext(
    DashboardContext
  ) as DashBoardData;
  const [games, setGames] = useState<QzGame[]>();
  useEffect(() => {
    if (isLoading === false && data) {
      setGames(data.games);
    }
  }, [data]);
  const {
    mutate,
    isLoading: isLoadingDeleteAll,
    error: deleteAllError,
    isError: deleteAllIsError,
    isSuccess: isSuccessDeleteAll,
  } = useMutation({
    mutationKey: ["deleteAll", data?.id],
    mutationFn: async () => {
      return await axios.delete(`/api/servers/${data?.id}/games`);
    },
  });
  const [ctrlMode, setCtrlMode] = useState<boolean>();
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [showDl, setShowDl] = useState<boolean>();
  const [showDlAll, setDlAll] = useState<boolean>();
  const {
    mutate: mutateDelete,
    isError,
    error: deleteError,
    isLoading: isLoadingDelete,
    isSuccess,
  } = useMutation({
    mutationKey: ["delete games", data?.id],
    mutationFn: async () => {
      return (
        await axios.post(`/api/servers/${data?.id}/games/delete`, {
          games: selectedGames,
        })
      ).data;
    },
  });
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      setCtrlMode(e.ctrlKey);
      if (e.key === "Escape") {
        setSelectedGames([]);
        return;
      }
    });
    document.addEventListener("keyup", (e) => {
      setCtrlMode(false);
    });
  }, []);
  useEffect(() => {
    if (isSuccess) {
      update({
        ...data,
        games: games?.filter((g) => {
          return selectedGames.indexOf(g.hostId) === -1;
        }) as QzGame[],
      });
      setSelectedGames([]);
      setShowDl(false);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccessDeleteAll) {
      setDlAll(false);
      update({
        ...data,
        games: [],
      });
    }
  }, [isSuccessDeleteAll]);
  return (
    <>
      <div
        className="sm:p-5 p-2 mb-16"
        onClick={() => {
          if (!ctrlMode) {
            setSelectedGames([]);
          }
        }}
      >
        <div className="flex gap-5 items-center lg:flex-nowrap flex-wrap">
          {data && (
            <Image
              className="rounded-full md:w-32 md:h-32 w-16 h-16"
              alt="server img"
              src={`https://cdn.discordapp.com/icons/${data?.id}/${data?.icon}.png`}
              width={128}
              height={128}
            />
          )}
          {!data && (
            <div className="w-[128px] h-[128px] loading rounded-full"></div>
          )}
          <h1 className="lg:text-[40px] md:text-[30px]">
            {data?.name?.slice(0, 12)}
            {data?.name.length > 12 ? "..." : ""}
          </h1>
          <p>{games?.length} Games</p>

          <MainBtn
            className={
              "text-white sm:text-[16px] text-sm sm:ps-5 sm:pr-5 ps-3 pr-3 " +
              (isFetching ? "!bg-[#1b5920]" : "!bg-[#0bc119]")
            }
            disabled={isFetching}
            onClick={fetch}
          >
            Refresh
            <FontAwesomeIcon
              icon={faArrowsRotate}
              className={"ms-2 " + (isFetching ? "rotate-anim" : "")}
            />
          </MainBtn>
          <button
            disabled={games?.length === 0}
            className={
              "ps-5 pr-5 pt-2 pb-2 text-white rounded-md " +
              (games?.length !== 0 ? "bg-red-600" : "bg-red-900")
            }
            onClick={() => {
              if (games?.length) {
                setDlAll(true);
              }
            }}
          >
            Delete All
          </button>
        </div>

        <div className="grid coll lg:grid-cols-3 grid-cols-2 xl:grid-cols-4 mt-16 relative mb-7">
          <h1 className="text-main text-center text-[16px] sm:text-xl">
            Status
          </h1>
          <h1 className="text-main text-center text-[16px] sm:text-xl">
            Creator
          </h1>
          <h1 className="text-main text-center text-[16px] sm:text-xl hidden lg:!block">
            PLayers
          </h1>
          <h1 className="text-main text-center text-[16px] sm:text-xll hidden xl:!block">
            C/A/D
          </h1>
        </div>
        <div>
          {games?.map((game, i) => {
            const cr = data.members
              .map((member) => {
                if (member.user?.id === game.hostUserId) {
                  return {
                    id: member.user.id,
                    name: member.user.username,
                    img: member?.user?.avatar
                      ? `https://cdn.discordapp.com/avatars/${member?.user?.id}/${member?.user?.avatar}.png`
                      : "",
                  };
                }
              })
              .filter((g) => g)[0];
            return (
              <Game
                onClick={(c) => {
                  if (ctrlMode || c) {
                    setCtrlMode(true);
                    if (selectedGames.indexOf(game.hostId) !== -1) {
                      console.log("remove");

                      setSelectedGames(
                        selectedGames.filter((id) => id !== game.hostId)
                      );
                    } else {
                      console.log("set");
                      setSelectedGames([...selectedGames, game.hostId]);
                    }
                  } else {
                  }
                }}
                key={i}
                creator={cr as any}
                playersLength={game.players.length}
                maxPlayers={game.maxPlayers}
                amount={game.amount}
                difficulty={game.difficulty || "Random"}
                category={game.category}
                status={
                  game.end ? "ended" : game.started ? "started" : "waiting"
                }
                hostId={game.hostId}
                selected={selectedGames.indexOf(game.hostId) !== -1}
              />
            );
          })}
          {games?.length === 0 && (
            <div className="flex justify-center items-center mt-16">
              <h1 className="text-2xl text-center">No Game In This Server</h1>
            </div>
          )}
        </div>
      </div>
      <div
        className={
          "sticky bottom-5 bg-arr p-5 rounded-md w-full duration-100 " +
          (selectedGames.length ? "scale-[1]" : "scale-[0]")
        }
      >
        <h1 className="text-xl">Selected games : {selectedGames.length}</h1>
        <button
          onClick={() => setShowDl(true)}
          className="ps-5 pr-5 pt-2 pb-2 bg-red-600 text-white rounded-md mt-3"
        >
          Delete
        </button>
        <button
          onClick={() => {
            setSelectedGames([]);
            setCtrlMode(false);
          }}
          className="bg-gray-500 ps-5 pr-5 pt-2 pb-2 rounded-md ms-3 text-white"
        >
          Cancel
        </button>
      </div>
      {showDl && (
        <DeleteGames
          isLoading={isLoadingDelete}
          onDelete={mutateDelete}
          onCancel={() => {
            setShowDl(false);
          }}
          error={
            deleteError instanceof AxiosError
              ? `[${deleteError.response?.status}] ${deleteError.response?.statusText}`
              : "An unexpected error occurred"
          }
          isError={isError}
          gamesLength={selectedGames.length}
        />
      )}
      {showDlAll && (
        <DeleteGames
          isLoading={isLoadingDeleteAll}
          onDelete={mutate}
          onCancel={() => {
            setDlAll(false);
          }}
          error={
            deleteAllError instanceof AxiosError
              ? `[${deleteAllError.response?.status}] ${deleteAllError.response?.statusText}`
              : "An unexpected error occurred"
          }
          isError={deleteAllIsError}
          gamesLength={games?.length as number}
        />
      )}
    </>
  );
}
