import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export function useRoles(guildId: string) {
  return useQuery({
    queryKey: ["role", guildId],
    queryFn: async () => {
      const res = await axios.get(`/api/guilds/${guildId}/roles`);
      return res.data as Role[];
    },
  });
}
