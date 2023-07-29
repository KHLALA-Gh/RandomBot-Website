import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useGuild(guildId: string) {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    router.push("/login");
  }
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
          (e) => e.id === guildId
        )[0];
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
    fetchData();
  }, []);
  return { data, isLoading, error };
}
