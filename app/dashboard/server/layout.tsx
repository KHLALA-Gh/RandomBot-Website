"use client";
import DashboardNavBar from "@/components/Dashboard/NavBar";
import Session from "@/components/Session";
import { useGeneralConfig } from "@/hooks/main-api/useGeneralConfig";
import { useSearchParams } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainBtn from "@/components/utils/main-btn";
import { AxiosError } from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useAllGuildInfo } from "@/hooks/discord-api/useAllGuildInfo";
import { useRouter } from "next/navigation";
import DashBoardNavBarMobile from "@/components/Dashboard/NavBar/mobile";
const client = new QueryClient();

export interface DashBoardData {
  data: AllGuildInfo;
  isLoading?: boolean;
  error?: AxiosError;
  update: Dispatch<SetStateAction<AllGuildInfo | undefined>>;
  fetch: () => void;
  isFetching: boolean;
}

export const DashboardContext = createContext<DashBoardData | null>(null);

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useSearchParams();
  const router = useRouter();
  const {
    data: config,
    error: configError,
    isLoading: configLoading,
  } = useGeneralConfig();
  const {
    data,
    error: guildError,
    isLoading,
    refetch,
    isFetching,
  } = useAllGuildInfo(params.get("id") as string);
  const [guild, setGuild] = useState(data);
  useEffect(() => {
    setGuild(data);
  }, [data]);
  useEffect(() => {
    if (guildError instanceof AxiosError) {
      if (guildError.response?.status === 302) {
        router.push(guildError.response.data);
      }
    }
  }, [guildError]);
  return (
    <>
      <html>
        <body>
          <Session>
            <QueryClientProvider client={client}>
              {!(configError || guildError) && (
                <>
                  <div className="flex h-screen relative overflow-hidden">
                    <DashboardNavBar
                      config={config}
                      data={{ ...guild } as Guild}
                      isLoading={configLoading || isLoading}
                    />
                    <DashBoardNavBarMobile
                      config={config}
                      data={{ ...guild } as Guild}
                      isLoading={configLoading || isLoading}
                    />
                    <div className="flex-grow lg:ps-20 lg:pr-20 pt-10 overflow-y-scroll h-full">
                      <DashboardContext.Provider
                        value={{
                          data: guild as AllGuildInfo,
                          isLoading,
                          error: guildError as AxiosError,
                          update: setGuild,
                          fetch: refetch,
                          isFetching,
                        }}
                      >
                        {children}
                      </DashboardContext.Provider>
                    </div>
                  </div>
                </>
              )}
              {(guildError || configError) &&
                ((
                  <>
                    <div className="h-screen w-full flex justify-center items-center">
                      <div className="relative">
                        <h1 className="text-center">
                          An error occurred cannot load the server dashboard
                          <br />
                          {
                            (
                              (guildError as AxiosError)?.response?.data as {
                                message: string;
                              }
                            )?.message
                          }
                        </h1>
                        <div
                          className="center-x"
                          onClick={() => window.location.reload()}
                        >
                          <MainBtn className="bg-red-600 mt-5">refresh</MainBtn>
                        </div>
                      </div>
                    </div>
                  </>
                ) as any)}
            </QueryClientProvider>
          </Session>
        </body>
      </html>
    </>
  );
}
