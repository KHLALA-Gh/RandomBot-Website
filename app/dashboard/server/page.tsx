"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import MainBtn from "@/components/utils/main-btn";
import { useGuild } from "@/hooks/discord-api/useGuild";
import "@/public/css/global.css";
import Image from "next/image";
import DashboardNavBar from "@/components/Dashboard/NavBar";
interface Props {
  searchParams: {
    id: string;
  };
}

export default function Page({ searchParams }: Props) {
  const { data, error: err, isLoading } = useGuild(searchParams.id);

  return (
    <>
      {!err && (
        <>
          <DashboardNavBar data={data} isLoading={isLoading} />
        </>
      )}
      {err && (
        <>
          <div className="w-full h-screen flex justify-center items-center">
            <div>
              <h1 className="text-2xl text-red-600">
                An errror occurred : {err}
              </h1>
              <Link href="/dashboard">
                <MainBtn className="bg-red-600 translate-x-[-50%] ms-[50%] mt-5">
                  Dashboard
                </MainBtn>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
