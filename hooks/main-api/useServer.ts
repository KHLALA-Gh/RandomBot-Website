import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useServer(serverId: string) {
  return useQuery({
    queryKey: ["server", serverId],
    queryFn: async () => {
      return (await axios.get(`/api/servers/${serverId}`)).data;
    },
  });
}
