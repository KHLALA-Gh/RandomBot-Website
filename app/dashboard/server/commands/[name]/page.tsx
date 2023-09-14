"use client";
import ArrayData from "@/components/Dashboard/Array";
import Add from "@/components/Dashboard/Array/Add";
import Save from "@/components/Dashboard/Save";
import Command from "@/components/Dashboard/command";
import LoadingCommand from "@/components/Dashboard/command/loading";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { DashBoardData, DashboardContext } from "../../layout";
import { PermissionFlagsBits } from "@/lib/Config";
import MainBtn from "@/components/utils/main-btn";

export default function Page(props: {
  searchParams: { id: string };
  params: { name: string };
}) {
  const { data, error, isLoading, update } = useContext(
    DashboardContext
  ) as DashBoardData;
  const [currentCommand, setCurrentCommand] = useState<CommandConfig>();
  const [changed, setChanged] = useState<boolean>();
  const [command, setCommand] = useState<CommandConfig>();
  const [showRoles, setShowRoles] = useState<boolean>();
  const [showPermissions, setPermissions] = useState<boolean>();
  const [showBannedUsers, setBannedUsers] = useState<boolean>();
  const [commandError, setCommandError] = useState<string>();
  const {
    data: postData,
    mutate,
    isLoading: postLoading,
  } = useMutation({
    mutationKey: ["commandConfig", props.params.name],
    mutationFn: async () => {
      const c: any = command;
      delete c.name;
      delete c._id;
      return (
        await axios.post(
          `/api/configs/commands/${props.searchParams.id}/${props.params.name}`,
          {
            command: c,
          }
        )
      ).data;
    },
  });
  const compare = () => {
    if (!command || !currentCommand) return;

    if (command.enable !== currentCommand.enable) return setChanged(true);
    if (
      command.bannedUsers.length !== currentCommand.bannedUsers.length ||
      command.rolesId.length !== currentCommand.rolesId.length ||
      command.permissions.length !== currentCommand.permissions.length
    )
      return setChanged(true);

    for (let i = 0; i < command.bannedUsers.length; i++) {
      let isEqual = false;
      for (let j = 0; j < currentCommand.bannedUsers.length; j++) {
        if (command.bannedUsers[i] === currentCommand.bannedUsers[j]) {
          isEqual = true;
          break;
        }
      }
      if (!isEqual) return setChanged(true);
    }

    for (let i = 0; i < command.rolesId.length; i++) {
      let isEqual = false;
      for (let j = 0; j < currentCommand.rolesId.length; j++) {
        if (command.rolesId[i] === currentCommand.rolesId[j]) {
          isEqual = true;
          break;
        }
      }
      if (!isEqual) return setChanged(true);
    }
    for (let i = 0; i < command.permissions.length; i++) {
      let isEqual = false;
      for (let j = 0; j < currentCommand.permissions.length; j++) {
        if (command.permissions[i] === currentCommand.permissions[j]) {
          isEqual = true;
          break;
        }
      }
      if (!isEqual) return setChanged(true);
    }

    setChanged(false);
  };
  const updateEnable = () => {
    setCommand({
      ...(command as CommandConfig),
      enable: !command?.enable,
    });
  };
  const reset = () => {
    setCommand(currentCommand);
  };
  const save = () => {
    mutate();
  };
  const closeAll = () => {
    setShowRoles(false);
    setPermissions(false);
    setBannedUsers(false);
  };
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        if (!data?.commands?.filter((c) => c.name === props.params.name)[0]) {
          setCommandError(`command /${props?.params?.name} is not found`);
          return;
        }
        const command = data.commands.filter(
          (c) => c.name === props.params.name
        )[0];
        for (let i = 0; i < command.rolesId.length; i++) {
          let valid = false;
          for (let j = 0; j < data.roles.length; j++) {
            if (command.rolesId[i] === data.roles[j].id) valid = true;
          }
          if (!valid) {
            command.rolesId.splice(i, 1);
          }
        }
        setCommand(command);
        setCurrentCommand(command);
      }, 100);
    }
  }, [data]);
  useEffect(() => {
    compare();
  }, [command]);
  useEffect(() => {
    if (postData) {
      setCommand(postData);
      setCurrentCommand(postData);
    }
  }, [postData]);
  return (
    <>
      {commandError && (
        <>
          <div className="h-screen relative">
            <div className="center-y relative">
              <h1 className="text-center">{commandError}</h1>
              <button className="bg-red-600 center-x text-black ps-5 pr-5 pt-2 pb-2 rounded-md mt-3">
                <Link
                  href={`/dashboard/server/commands?id=${props?.searchParams?.id}`}
                  className=""
                >
                  refresh
                </Link>
              </button>
            </div>
          </div>
        </>
      )}
      {!commandError && (
        <>
          <div className="p-3 h-full relative">
            <h1 className="lg:text-[36px] md:text-[30px] text-2xl ms-5 mb-5 text-main">
              <Link
                href={`/dashboard/server/commands?id=${props.searchParams.id}`}
              >
                Commands
              </Link>{" "}
              {">"}{" "}
              <Link
                className={isLoading ? "w-[50px] h-[40px] loading" : ""}
                href={`/dashboard/server/commands/${props.params.name}?id=${props.searchParams.id}`}
              >
                {props?.params?.name}
              </Link>
            </h1>
            {isLoading && <LoadingCommand />}
            {!isLoading && (
              <>
                <Command
                  name={`${currentCommand?.name || ""}`}
                  enable={command?.enable as boolean}
                  update={updateEnable}
                />
                <div className="mt-16 md:ps-14 md:pr-14">
                  <div className="flex flex-col gap-5">
                    <ArrayData
                      name={"permissions"}
                      onClickAdd={() => setPermissions(true)}
                    />
                    <ArrayData
                      name={"Roles"}
                      onClickAdd={() => setShowRoles(true)}
                    />
                    <ArrayData
                      name={"Banned Users"}
                      onClickAdd={() => setBannedUsers(true)}
                    />
                  </div>
                </div>
              </>
            )}
            <Save
              show={changed as boolean}
              reset={reset}
              save={save}
              isLoading={postLoading}
            />
          </div>
          {showPermissions && (
            <Add
              title="Permissions"
              description={
                "choose the required permissions for the command " +
                props.params.name
              }
              data={PermissionFlagsBits as any}
              type="permissions"
              init={command?.permissions as any}
              onClickElement={(permission) => {
                if (command?.permissions.indexOf(permission as any) === -1) {
                  setCommand({
                    ...command,
                    permissions: [...command.permissions, permission] as any,
                  });
                } else {
                  if (!command) return;
                  setCommand({
                    ...command,
                    permissions: command.permissions.filter(
                      (p) => p !== permission
                    ),
                  });
                }
              }}
              onCancel={() => {
                if (!command) return;
                setCommand({
                  ...command,
                  permissions: currentCommand?.permissions as any,
                });
                closeAll();
              }}
              onClickOk={() => closeAll()}
            />
          )}
          {showRoles && (
            <Add
              title="Roles"
              description={`Add a role to ${command?.name} command`}
              data={data.roles as Role[]}
              type="roles"
              init={command?.rolesId as string[]}
              onClickElement={(id) => {
                if (command?.rolesId?.indexOf(id) === -1) {
                  setCommand({
                    ...command,
                    rolesId: [...command.rolesId, id],
                  });
                } else {
                  if (!command) return;
                  setCommand({
                    ...command,
                    rolesId: command.rolesId.filter((roleId) => roleId !== id),
                  });
                }
              }}
              onCancel={() => {
                if (!command) return;
                setCommand({
                  ...command,
                  rolesId: currentCommand?.rolesId as string[],
                });
                closeAll();
              }}
              onClickOk={closeAll}
            />
          )}
          {showBannedUsers && (
            <Add
              title="Members"
              description={`select members that you want to ban them from using /${props.params.name}`}
              data={data.members as Member[]}
              onCancel={() => {
                if (command) {
                  setCommand({
                    ...command,
                    bannedUsers: currentCommand?.bannedUsers as string[],
                  });
                }
                closeAll();
              }}
              onClickOk={closeAll}
              onClickElement={(id) => {
                if (command) {
                  if (command.bannedUsers.indexOf(id) !== -1) {
                    setCommand({
                      ...command,
                      bannedUsers: command.bannedUsers.filter(
                        (memberId) => memberId !== id
                      ),
                    });
                  } else {
                    setCommand({
                      ...command,
                      bannedUsers: [...command.bannedUsers, id],
                    });
                  }
                }
              }}
              init={command?.bannedUsers as string[]}
              type="members"
            />
          )}
          {(showPermissions || showRoles || showBannedUsers) && (
            <div className="full-page-shadow" onClick={closeAll}></div>
          )}
        </>
      )}
    </>
  );
}
