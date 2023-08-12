import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useQuizConfig(guildId: string, configName: string) {
  return useQuery({
    queryKey: ["quiz config", guildId, configName],
    queryFn: async () => {
      return (await axios.get(`/api/configs/quiz/${guildId}/${configName}`))
        .data;
    },
  });
}
