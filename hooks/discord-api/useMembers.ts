import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useMembers(guildId: string) {
  return useQuery({
    queryKey: ["members", guildId],
    queryFn: async () => {
      return (await axios.get(`/api/guilds/${guildId}/members`))
        .data as Member[];
    },
  });
}
