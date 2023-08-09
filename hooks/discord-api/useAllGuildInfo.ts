import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAllGuildInfo(guildId: string) {
  return useQuery({
    refetchInterval: false,
    retry: false,
    queryKey: ["all_guild", guildId],
    queryFn: async () => {
      const res = await axios.get(`/api/guilds/${guildId}/get_all`, {
        validateStatus: (status) => {
          return status >= 200 && status <= 299;
        },
      });
      return res.data as AllGuildInfo;
    },
  });
}
