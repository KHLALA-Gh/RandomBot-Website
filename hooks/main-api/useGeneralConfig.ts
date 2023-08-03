import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGeneralConfig() {
  return useQuery({
    queryKey: ["general_config"],
    queryFn: async () => {
      const { data } = await axios.get("/api/configs");
      return data;
    },
  });
}
