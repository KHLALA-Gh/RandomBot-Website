import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useServerCommands(guildId: string) {
  return useQuery({
    queryKey: ["commands", guildId],
    queryFn: async () => {
      const commandsConfigs = (await axios.get("/api/configs/" + guildId)).data
        .commands as CommandConfig[];
      return commandsConfigs.map((e) => {
        return {
          name: e.name,
          enable: e.enable,
        } satisfies Command;
      });
    },
  });
}
