import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useServer(serverId: string) {
  const [server, setServer] = useState<Server & { guild?: Guild }>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>();
  const router = useRouter();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async (serverId: string) => {
      try {
        setIsLoading(true);
        const response = await axios.get<
          any,
          AxiosResponse<Server & { guild?: Guild }, any>
        >(`/api/servers/${serverId}`);
        if (isMounted) {
          setServer(response.data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          if (err instanceof AxiosError) {
            if (err.response?.status === 303) {
              router.push(err.response.data);
            }
          }
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchData(serverId);
  }, [serverId]);
  return { server, isLoading, error };
}
