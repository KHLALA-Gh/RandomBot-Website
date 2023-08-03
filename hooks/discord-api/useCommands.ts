import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCommands() {
  return useQuery({
    queryKey: ["commands"],
    queryFn: async () => {
      const { data } = await axios.get("/api/configs");
      return data as CommandInfo[];
    },
  });
}
