import QuizName from "@/components/Dashboard/quiz/Name";
import { connectDB } from "@/lib/connectDB";
import mongoose from "mongoose";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | null };
}) {
  if (!mongoose.connection?.db) {
    await connectDB();
  }
  //@ts-ignore
  let configs: GeneralConfig = await mongoose.connection.db
    .collection("Config")
    ?.findOne({ version: require("@/package.json").randombotV });
  return (
    <>
      <div className="flex flex-col gap-5 p-5">
        {configs?.quiz?.map((e, i) => {
          return (
            <Link
              key={i}
              href={`/dashboard/server/quiz/${e.key}?id=${searchParams?.id}`}
            >
              {" "}
              <QuizName name={e.name} />{" "}
            </Link>
          );
        })}
      </div>
    </>
  );
}
