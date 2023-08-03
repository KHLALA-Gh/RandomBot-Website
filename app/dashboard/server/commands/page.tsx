"use client";
import Command from "@/components/Dashboard/NavBar/command";
import { useServerCommands } from "@/hooks/main-api/useServerCommands";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const { data, isLoading, error } = useServerCommands(
    searchParams.get("id") as string
  );
  const [commands, setData] = useState(data);
  useEffect(() => {
    if (!isLoading) {
      setData(data);
      console.log(commands);
    }
  }, [data]);
  useEffect(() => {
    console.log(commands);
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
                  setData((c) => {
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
        </>
      </div>
    </>
  );
}
