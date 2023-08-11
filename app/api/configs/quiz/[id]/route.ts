import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getGuildByUser, getServer } from "@/lib/Servers";
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { message: "401 : unauthorized" },
        { status: 401 }
      );
    const url = new URL(req.url);
    const id = url.pathname.split("/").reverse()[0];
    const guild = await getGuildByUser(session.user.accessToken as string, id);
    if (!guild)
      return NextResponse.json(
        { message: `404 : guild not found` },
        { status: 404 }
      );
    if (!guild.owner)
      return NextResponse.json({
        message: `401 : not allowed to access this information`,
      });
    const server = await getServer(id);
    if (!server)
      return NextResponse.json(
        {
          message: `302 : bot is not in this server invite it from here ${url.origin}/invite?guild_id=${guild.id}`,
        },
        { status: 302 }
      );
    return NextResponse.json(server.config.quiz, { status: 200 });
  } catch (err: any) {
    if (err instanceof AxiosError)
      return NextResponse.json(
        {
          message: `${err.response?.status || 500} : ${
            err.response?.statusText || "server error"
          }`,
        },
        {
          status: err.response?.status || 500,
        }
      );
  }
}
