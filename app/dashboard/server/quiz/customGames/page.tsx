"use client";
import { useContext, useEffect, useState } from "react";
import { DashBoardData, DashboardContext } from "../../layout";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import LoadingCommand from "@/components/Dashboard/command/loading";
import QuizEnable from "@/components/Dashboard/quiz/Enable";
import Save from "@/components/Dashboard/Save";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Page() {
  const router = useRouter();
  const { data, isLoading, error, update } = useContext(
    DashboardContext
  ) as DashBoardData;
  const {
    data: postData,
    isLoading: postLoading,
    mutate,
  } = useMutation({
    mutationKey: ["post customeGames", data?.id],
    mutationFn: async () => {
      return (
        await axios.post(`/api/configs/quiz/${data?.id}/customGames`, {
          config,
        })
      ).data as boolean;
    },
  });
  const [currentConfig, setCurrentConfig] = useState<boolean>();
  const [config, setConfig] = useState<boolean>();
  const [isChanged, setIsChanged] = useState<boolean>();
  const compare = () => {
    if (currentConfig !== config) return setIsChanged(true);
    setIsChanged(false);
  };
  useEffect(() => {
    setTimeout(() => {
      if (isLoading === false) {
        setCurrentConfig(data?.quiz?.customGames);
        setConfig(data?.quiz?.customGames);
      }
    }, 50);
  }, [data]);
  useEffect(() => {
    if (!data) return;
    if (postLoading === false) {
      update({
        ...data,
        quiz: {
          ...data?.quiz,
          customGames: postData,
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
        <div className="pb-7 border-b-2 border-b-white">
          {isLoading && <LoadingCommand />}
          {isLoading === false && (
            <QuizEnable
              name="Custom games"
              enable={config as boolean}
              update={() => setConfig(!config)}
            />
          )}
        </div>
        <div className="mt-5">
          <h1 className="text-2xl">Custom Games</h1>
          <p className="ps-2 mt-3">
            Custom games are like the normal games but they are not affected by
            the{" "}
            <span
              className="text-main cursor-pointer"
              onClick={() =>
                router.push(
                  `/dashboard/server/quiz/multiple_channels?id=${data?.id}`
                )
              }
            >
              multiple channels
            </span>{" "}
            configuration
          </p>
          <h1 className="mt-5 text-2xl">How to create one ?</h1>
          <p className="mt-3">
            Go to your discord server, create a new channel and name it like
            this :{" "}
            <span className="bg-[#2f2f2f] text-[#b9b9b9] p-1 rounded-md">
              (category name)-(questions amount)-(max players)
            </span>
          </p>
          <p>
            exemple : <br />
            if you want to create a custom game with category : Video Games ,
            amount : 10 , max players : 15 <br />
            the name of the channel should be like this :
          </p>
          <Image
            className="mt-2"
            src={"/img/custom_gm.png"}
            alt="custom game exemple"
            width={300}
            height={300}
          />
        </div>
      </div>
      <Save
        reset={() => setConfig(currentConfig)}
        save={mutate}
        isLoading={postLoading}
        show={isChanged as boolean}
      />
    </>
  );
}
