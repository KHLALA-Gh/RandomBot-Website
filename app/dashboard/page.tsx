"use client";

import DiscordServer from "@/components/Discord_Server";
import NavBar from "@/components/Navbar";
import MainBtn from "@/components/utils/main-btn";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [guilds, setGuilds] =
    useState<Omit<Guilds, "permissions" | "owner">[]>();
  const [error, setError] = useState<string>();
  if (!session) {
    router.push("/login");
  }
  const getUserData = async () => {
    const { data } = await axios.get(
      `https://discord.com/api/v9/users/@me/guilds`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    const guilds: Omit<Guilds, "permissions" | "owner">[] = data.filter(
      (e: Guilds) => {
        if (e.owner) {
          return true;
        }
      }
    );
    return guilds;
  };
  useEffect(() => {
    getUserData()
      .then((d) => {
        setGuilds(d);
        setError("");
      })
      .catch(() => {
        setError("unable to fetch data");
        setGuilds([]);
      });
  }, []);
  return (
    <>
      <NavBar />
      <div className="cont">
        <h1 className="text-center text-main text-[36px] mt-32">
          Your Servers
        </h1>
        <div className="servers grid sm:grid-cols-2 xl:grid-cols-3 grid-cols-1 mt-20 gap-7 justify-center p-5">
          {guilds?.map((e) => {
            return (
              <>
                <DiscordServer
                  name={e?.name}
                  img={
                    e.icon
                      ? `https://cdn.discordapp.com/icons/${e?.id}/${e?.icon}.jpg`
                      : undefined
                  }
                  id={e?.id}
                />
              </>
            );
          })}
        </div>
        {error && (
          <div className="flex justify-center">
            <h1 className="text-center text-2xl text-red-600">{error}</h1>
          </div>
        )}
        {guilds?.length === 0 && (
          <div className="flex justify-center">
            <h1 className="text-center text-2xl">
              You dont have any discord server :(
            </h1>
          </div>
        )}
        <div className="mt-16">
          <Link href={"/logout"}>
            <MainBtn className="bg-red-600 ms-7">Logout</MainBtn>
          </Link>
        </div>
      </div>
    </>
  );
}
