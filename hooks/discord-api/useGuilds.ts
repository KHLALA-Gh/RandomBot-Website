import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Params {
  owner?: boolean;
}

export function useGuilds({ owner }: Params) {
  const [data, setData] = useState<Guild[]>();
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let { data } = await axios.get(
          `https://discord.com/api/v9/users/@me/guilds`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          }
        );
        if (owner) {
          data = (data as Guild[]).filter((e) => e.owner);
        }
        if (isMounted) {
          setData(data);
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
  return { data, error, isLoading };
}
