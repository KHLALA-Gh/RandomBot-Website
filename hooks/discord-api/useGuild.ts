import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useGuild(guildId: string) {
  const { data: session } = useSession({ required: true });
  const router = useRouter();
  const [data, setData] = useState<Guild>();
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://discord.com/api/v9/users/@me/guilds`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );
        const server: Guild = (data as Guild[]).filter(
          (e) => e.id === guildId && e.owner
        )[0];
        if (!server) {
          setError(`Discord Server Not Found`);
          setIsLoading(false);
          return;
        }
        server.icon = `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.jpg`;
        if (isMounted) {
          setData(server);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    if (session) {
      fetchData();
    }
  }, [session]);
  return { data, isLoading, error };
}
