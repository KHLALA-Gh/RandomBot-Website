"use client";
import DashboardNavBar from "@/components/Dashboard/NavBar";
import Session from "@/components/Session";
import { useGuild } from "@/hooks/discord-api/useGuild";
import { useGeneralConfig } from "@/hooks/main-api/useGeneralConfig";
import { useSearchParams } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainBtn from "@/components/utils/main-btn";
const client = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useSearchParams();
  const {
    data: guild,
    error: guildError,
    isLoading: guildLoading,
  } = useGuild(params.get("id") as string);
  const {
    data: config,
    error: configError,
    isLoading: configLoading,
  } = useGeneralConfig();
  return (
    <>
      <html>
        <body>
          <Session>
            <QueryClientProvider client={client}>
              {!(guildError || configError) && (
                <>
                  <div className="flex h-screen">
                    <DashboardNavBar
                      config={config}
                      data={guild as Guild}
                      isLoading={configLoading && guildLoading}
                    />
                    <div className="flex-grow lg:ps-20 lg:pr-20 pt-10 overflow-y-scroll">
                      {children}
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
                        </h1>
                        <div
                          className="center-x"
                          onClick={() => window.location.reload()}
                        >
                          <MainBtn className="bg-red-600">refresh</MainBtn>
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
