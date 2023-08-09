import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useServerCommandConfig(serverId: string, commandName: string) {
  return useQuery({
    queryKey: ["commandConfig", commandName],
    queryFn: async () => {
      return (
        await axios.get(`/api/configs/commands/${serverId}/${commandName}`)
      ).data;
    },
  });
}
