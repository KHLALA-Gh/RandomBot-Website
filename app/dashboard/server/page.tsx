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
  const { mutate, isLoading: isDeleted } = useMutation({
    mutationKey: ["deleteAll", data?.id],
    mutationFn: async () => {
      return await axios.delete(`/api/servers/${data?.id}/games`);
    },
  });
  const [ctrlMode, setCtrlMode] = useState<boolean>();
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [showDl, setShowDl] = useState<boolean>();
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
          selectedGames.indexOf(g.hostId) === -1;
        }) as QzGame[],
      });
      setSelectedGames([]);
      setShowDl(false);
    }
  }, [isSuccess]);
  return (
    <>
      <div
        className="p-5 h-screen"
        onClick={() => {
          if (!ctrlMode) {
            setSelectedGames([]);
          }
        }}
      >
        <div className="flex gap-5 items-center">
          {data && (
            <Image
              className="rounded-full"
              alt="server img"
              src={`https://cdn.discordapp.com/icons/${data?.id}/${data?.icon}.png`}
              width={128}
              height={128}
            />
          )}
          {!data && (
            <div className="w-[128px] h-[128px] loading rounded-full"></div>
          )}
          <h1 className="text-[40px]">{data?.name}</h1>
          <p>{games?.length} Games</p>

          <MainBtn
            className={
              "text-white " + (isFetching ? "!bg-[#1b5920]" : "!bg-[#0bc119]")
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
        </div>
        <div>
          <button
            disabled={isDeleted}
            className="ps-5 pr-5 pt-2 pb-2 bg-red-600 text-white rounded-md mt-10"
            onClick={() => {
              mutate();
              setTimeout(() => {
                fetch();
              }, 1500);
            }}
          >
            Delete All
          </button>
        </div>

        <div className="grid coll grid-cols-4 mt-16 relative mb-7">
          <h1 className="text-main text-center text-xl">Status</h1>
          <h1 className="text-main text-center text-xl">Creator</h1>
          <h1 className="text-main text-center text-xl">PLayers</h1>
          <h1 className="text-main text-center text-xl">C/A/D</h1>
        </div>
        <div>
          {games?.map((game, i) => {
            const cr = data.members
              .map((member) => {
                if (member.user?.id === game.hostUserId) {
                  return {
                    id: member.user.id,
                    name: member.user.username,
                    img: `https://cdn.discordapp.com/avatars/${member?.user?.id}/${member?.user?.avatar}.png`,
                  };
                }
              })
              .filter((g) => g)[0];
            return (
              <Game
                onClick={() => {
                  if (ctrlMode) {
                    if (selectedGames.indexOf(game.hostId) !== -1) {
                      setSelectedGames(
                        selectedGames.filter((id) => id !== game.hostId)
                      );
                    } else {
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
    </>
  );
}
