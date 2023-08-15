"use client";
import { useContext, useEffect, useState } from "react";
import { DashBoardData, DashboardContext } from "../../layout";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Save from "@/components/Dashboard/Save";

export default function Page() {
  const { data, error, isLoading, update } = useContext(
    DashboardContext
  ) as DashBoardData;
  const {
    data: postData,
    isLoading: postLoading,
    mutate,
  } = useMutation({
    mutationKey: ["post gameStart", data?.id],
    mutationFn: async () => {
      return (
        await axios.post(`/api/configs/quiz/${data?.id}/gameStart`, {
          config,
        })
      ).data as number;
    },
  });
  const [currentConfig, setCurrentConfig] = useState<number>();
  const [config, setConfig] = useState<number>();
  const [isChanged, setIsChanged] = useState<boolean>();
  const compare = () => {
    if (config !== currentConfig) return setIsChanged(true);
    setIsChanged(false);
  };
  useEffect(() => {
    if (isLoading === false) {
      setTimeout(() => {
        let startType = data.quiz.gameStart;
        if (!(startType >= 0 && startType <= 3)) startType = 0;
        setConfig(startType);
        setCurrentConfig(startType);
      }, 50);
    }
  }, [data]);
  useEffect(() => {
    if (typeof postData !== "number") return;
    if (postLoading === false) {
      update({
        ...data,
        quiz: {
          ...data.quiz,
          gameStart: postData,
        },
      });
      setIsChanged(false);
    }
  }, [postData]);
  useEffect(() => {
    compare();
  }, [config]);
  return (
    <>
      <div className="p-5">
        {isLoading === false && (
          <>
            <div className="p-5 bg-arr flex lg:justify-between items-center lg:flex-row flex-col rounded-md relative">
              <h1>Game start</h1>
              <select
                className="bg-black p-3 lg:mt-0 mt-3 md:text-[16px] sm:text-sm text-[10px] sm:w-auto w-full"
                onChange={(e) => setConfig(+e.target.value || 0)}
              >
                <option value="0" selected={config === 0}>
                  Automatically start when the game is full
                </option>
                <option value="1" selected={config === 1}>
                  Start When Everyone is ready
                </option>
                <option value="2" selected={config === 2}>
                  Start When Everyone is ready and the game is full.
                </option>
                <option value="3" selected={config === 3}>
                  Wait for the moderator to start the game
                </option>
              </select>
            </div>
          </>
        )}
        <div className="pt-7 border-t-2 border-t-white mt-5">
          <h1 className="text-2xl">Game Start</h1>
          <p className="mt-3 text-sm">Choose when quiz game should start</p>
        </div>
      </div>
      <Save
        save={mutate}
        reset={() => setConfig(currentConfig)}
        isLoading={postLoading}
        show={isChanged as boolean}
      />
    </>
  );
}
