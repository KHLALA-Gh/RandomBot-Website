"use client";
import Command from "@/components/Dashboard/command";
import LoadingCommand from "@/components/Dashboard/command/loading";
import Save from "@/components/Dashboard/Save";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { DashboardContext } from "../layout";
export default function Page() {
  const searchParams = useSearchParams();
  const { data, isLoading, error, update, fetch } = useContext(
    DashboardContext
  ) as {
    data: AllGuildInfo;
    isLoading: boolean;
    error?: AxiosError;
    update: any;
    fetch: () => any;
  };
  const [currentCommands, setCurrentCommands] = useState<Command[]>();
  const [loading, setLoading] = useState(isLoading);
  const [commands, setCommands] = useState<Command[]>();
  const [isChanged, setIsChanged] = useState<boolean>();
  const mutation = useMutation({
    mutationKey: ["commands", searchParams.get("id")],
    mutationFn: async () => {
      return await axios.post(
        "/api/configs/commands/" + searchParams.get("id"),
        {
          commands,
        }
      );
    },
  });
  const compare = () => {
    if (data && commands) {
      for (let i = 0; i < (currentCommands?.length as number); i++) {
        for (let j = 0; j < (commands?.length as number); j++) {
          if (
            commands[j].name === (currentCommands as Command[])[j]?.name &&
            commands[j].enable !== (currentCommands as Command[])[j]?.enable
          ) {
            setIsChanged(true);
            return;
          }
        }
      }
      setIsChanged(false);
    }
  };
  const reset = () => {
    setCommands(currentCommands);
  };
  const save = () => {
    setLoading(true);
    mutation.mutate();
  };
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        const commands: Command[] = data?.commands?.map((c) => {
          return {
            name: c.name,
            enable: c.enable,
          };
        });
        setCurrentCommands([...commands]);
        setCommands([...commands]);
        setLoading(false);
      }, 500);
    }
  }, [data]);
  useEffect(() => {
    compare();
  }, [commands]);
  useEffect(() => {
    if (mutation.data) {
      update({
        ...data,
        commands: mutation.data?.data,
      });
    }
  }, [mutation.data]);
  useEffect(() => {
    setLoading(true);
    setCurrentCommands([]);
    setCommands([]);
    fetch();
  }, []);
  return (
    <>
      <div className="lg:p-0 p-5">
        <>
          <Link
            href={`/dashboard/server/commands?id=${searchParams.get("id")}`}
          >
            <h1 className="text-[40px] mb-16 text-main ms-0">Commands</h1>
          </Link>
          {commands?.map((e, i) => {
            return (
              <Command
                key={i}
                enable={e.enable}
                name={e.name}
                update={(enable) => {
                  setCommands((c) => {
                    const newCommands = c?.map((command) => {
                      if (command.name === e.name) {
                        return {
                          name: e.name,
                          enable: enable,
                        };
                      }
                      return command;
                    });
                    return [...(newCommands as Command[])];
                  });
                }}
              />
            );
          })}
          {loading && (
            <>
              <LoadingCommand />
              <LoadingCommand />
              <LoadingCommand />
              <LoadingCommand />
              <LoadingCommand />
            </>
          )}
          <Save
            isLoading={loading}
            save={save}
            reset={reset}
            show={isChanged as boolean}
          />
        </>
      </div>
    </>
  );
}
