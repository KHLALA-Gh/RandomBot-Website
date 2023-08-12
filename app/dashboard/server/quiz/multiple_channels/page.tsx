"use client";
import Input from "@/components/Dashboard/quiz/input";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { DashBoardData, DashboardContext } from "../../layout";
import LoadingCommand from "@/components/Dashboard/command/loading";
import QuizConfigSwitch from "@/components/Dashboard/quiz/Switch";
import ArrayData from "@/components/Dashboard/Array";
import Add from "@/components/Dashboard/Array/Add";
import Save from "@/components/Dashboard/Save";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import QuizEnable from "@/components/Dashboard/quiz/Enable";
export default function Page() {
  const { data, isLoading, error } = useContext(
    DashboardContext
  ) as DashBoardData;
  const {
    mutate,
    data: postData,
    isLoading: postLoading,
  } = useMutation({
    mutationKey: ["post multiple_channels", data?.id],
    mutationFn: async () => {
      return (
        await axios.post(`/api/configs/quiz/${data?.id}/multiple_channels`, {
          config,
        })
      ).data as MultipleChannels;
    },
  });
  const [currentConfig, setCurrentConfig] = useState<MultipleChannels>();
  const [config, setConfig] = useState<MultipleChannels>();
  const [openViewChannels, setOpenViewChannels] = useState<boolean>();
  const [isChanged, setIsChanged] = useState<boolean>();
  const update = () => {
    if (!config) return;
    setConfig({
      ...config,
      enable: !config.enable,
    });
  };
  const onChangeCatId = (e: ChangeEvent<HTMLInputElement>) => {
    if (!config) return;
    setConfig({
      ...config,
      category_id: e.target.value,
    });
  };
  const onChangeCatName = (e: ChangeEvent<HTMLInputElement>) => {
    if (!config) return;
    setConfig({
      ...config,
      category_name: e.target.value,
    });
  };
  const updatePrivateEnable = () => {
    if (!config) return;
    setConfig({
      ...config,
      private: {
        ...config.private,
        enable: !config.private.enable,
      },
    });
  };
  const compare = () => {
    if (!config || !currentConfig) return;
    if (JSON.stringify(config) !== JSON.stringify(currentConfig))
      return setIsChanged(true);
    setIsChanged(false);
  };
  useEffect(() => {
    setTimeout(() => {
      if (isLoading === false) {
        const viewCh = data.quiz.multiple_channels.private.viewChannel
          .map((id) => {
            let valid = false;
            data.roles.map((role) => {
              if (role.id === id) {
                valid = true;
              }
            });
            if (!valid) return;
            return id;
          })
          .filter((id) => id) as string[];
        setCurrentConfig({
          ...data.quiz.multiple_channels,
          private: {
            ...data.quiz.multiple_channels.private,
            viewChannel: viewCh,
          },
        });
        setConfig({
          ...data.quiz.multiple_channels,
          private: {
            ...data.quiz.multiple_channels.private,
            viewChannel: viewCh,
          },
        });
      }
    }, 50);
  }, [data]);
  useEffect(() => {
    compare();
  }, [config]);
  useEffect(() => {
    if (postLoading === false) {
      setCurrentConfig(postData);
      setConfig(postData);
    }
  }, [postData]);
  return (
    <>
      <div className="p-5 border-b-2 border-b-white">
        {isLoading && <LoadingCommand />}
        {!isLoading && (
          <QuizEnable
            enable={config?.enable as boolean}
            name="multiple channels"
            update={update}
          />
        )}
        <h1 className="text-2xl">Multiple Channels</h1>
        <p className="text-sm mt-3">
          Enabling this option will make the bot create a new channel for every
          game in the category that you have selected.
        </p>
      </div>
      <div className="p-5 relative">
        {!config?.enable && (
          <div className="w-full h-full absolute top-0 left-0 bg-[#0000007b] cursor-no-drop z-[9997]"></div>
        )}
        <div className="mt-5 flex flex-col gap-3">
          <Input
            value={(config?.category_id as string) || ""}
            name="Category Id"
            onChange={onChangeCatId}
            placeholder="id"
          />
          <Input
            value={(config?.category_name as string) || ""}
            name="Category Name"
            onChange={onChangeCatName}
            placeholder="name"
          />
          <div>
            <QuizConfigSwitch
              name="private"
              enable={config?.private.enable as boolean}
              onChange={updatePrivateEnable}
            />
            <div
              className={
                "p-5 duration-300 " +
                (config?.private.enable ? "scale-100" : "scale-0")
              }
            >
              <ArrayData
                name="view channel"
                onClickAdd={() => setOpenViewChannels(true)}
              />
            </div>
          </div>
        </div>
      </div>
      {openViewChannels && (
        <>
          <Add
            type="roles"
            data={data?.roles}
            init={{ ...config?.private }.viewChannel as string[]}
            title="Roles"
            description="Add roles with authorization to view the game channel"
            onClickElement={(id) => {
              if (!config) return;
              setConfig({
                ...config,
                private: {
                  ...config.private,
                  viewChannel:
                    config.private.viewChannel.indexOf(id) !== -1
                      ? config.private.viewChannel.filter((str) => str !== id)
                      : [...config.private.viewChannel, id],
                },
              });
            }}
            onCancel={() => {
              if (!config || !currentConfig) return;
              setConfig({
                ...config,
                private: {
                  ...config.private,
                  viewChannel: currentConfig.private.viewChannel,
                },
              });
              setOpenViewChannels(false);
            }}
            onClickOk={() => setOpenViewChannels(false)}
          />
          <div className="full-page-shadow"></div>
        </>
      )}
      <Save
        show={isChanged as boolean}
        reset={() => setConfig(currentConfig)}
        save={mutate}
        isLoading={postLoading}
      />
    </>
  );
}
