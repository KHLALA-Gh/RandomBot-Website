"use client";
import Command from "@/components/Dashboard/NavBar/command";
import Save from "@/components/Dashboard/Save";
import { useServerCommands } from "@/hooks/main-api/useServerCommands";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const searchParams = useSearchParams();
  const { data, isLoading, error } = useServerCommands(
    searchParams.get("id") as string
  );
  const [commands, setCommands] = useState(data);
  const [isChanged, setIsChanged] = useState<boolean>();
  const mutation = useMutation({
    mutationKey: ["commands", searchParams.get("id")],
    mutationFn: async () => {
      return await axios.post("/configs/commands/" + searchParams.get("id"), {
        commands,
      });
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
    mutation.mutate();
  };
  useEffect(() => {
    if (!isLoading) {
      setCommands(data);
      console.log(commands);
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
          <Save save={save} reset={reset} show={isChanged as boolean} />
        </>
      </div>
    </>
  );
}
