import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useGuild(guildId: string) {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ["guild", guildId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/guilds/${guildId}`, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      if (data.icon) {
        data.icon = `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.jpg`;
      }
      return data as Guild;
    },
  });
}
