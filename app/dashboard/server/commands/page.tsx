"use client";
import Command from "@/components/Dashboard/command";
import LoadingCommand from "@/components/Dashboard/command/loading";
import Save from "@/components/Dashboard/Save";
import { useServerCommands } from "@/hooks/main-api/useServerCommands";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Page() {
  const searchParams = useSearchParams();
  const { data, isLoading, error, refetch } = useServerCommands(
    searchParams.get("id") as string
  );
  const [loading, setLoading] = useState(isLoading);
  const [commands, setCommands] = useState(data);
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
      for (let i = 0; i < (data?.length as number); i++) {
        for (let j = 0; j < (commands?.length as number); j++) {
          if (
            commands[j].name === data[j].name &&
            commands[j].enable !== data[j].enable
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
    setCommands(data);
  };
  const save = () => {
    setLoading(true);
    mutation.mutate();
    setTimeout(refetch, 1000);
  };
  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
      setCommands(data);
    }
  }, [data]);
  useEffect(() => {
    compare();
  }, [commands]);
  return (
    <>
      <div>
        <>
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
          {isLoading && (
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
