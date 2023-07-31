import axios from "axios";
import { useEffect, useState } from "react";

export function useConfig(guildId: string) {
  const [config, setConfig] = useState<Config>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/configs/${guildId}`);
        console.log(data);
        if (isMounted) {
          setConfig(data);
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
  }, [guildId]);
  return { config, isLoading, error };
}
