import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useServerCommands(guildId: string) {
  return useQuery({
    queryKey: ["commands", guildId],
    queryFn: async () => {
      return (await axios.get("/api/configs/" + guildId)).data
        .commands as Command[];
    },
  });
}
