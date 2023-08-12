import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getGuildByUser, getServer } from "@/lib/Servers";
import { getGuildMembers, getGuildRoles } from "@/lib/discordApiUtils";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { message: "401 : unauthorized" },
        { status: 401 }
      );
    const url = new URL(req.url);
    const id = url.pathname.split("/").reverse()[1];
    const guild = await getGuildByUser(session.user?.accessToken as string, id);
    if (!guild) {
      return NextResponse.json(
        { message: `404 : guild not found` },
        { status: 404 }
      );
    }
    if (!guild.owner)
      return NextResponse.json(
        { message: "401 : not allowed to access this information" },
        { status: 401 }
      );
    const server = await getServer(id);
    if (!server)
      return NextResponse.json(`${url.origin}/invite?id=${guild.id}`, {
        status: 302,
      });
    const roles = await getGuildRoles(id);
    const members = await getGuildMembers(id);
    const allGuildInfo: AllGuildInfo = {
      ...guild,
      roles,
      members,
      commands: server?.config.commands as CommandConfig[],
      quiz: server.config.quiz,
    };
    return NextResponse.json(allGuildInfo, { status: 200 });
  } catch (err: any) {
    if (err instanceof AxiosError)
      return NextResponse.json(
        {
          message: `${err.response?.status || 500} : ${
            err.response?.statusText || "server error"
          }`,
        },
        { status: err.response?.status || 500 }
      );
    return NextResponse.json(
      { message: "500 : server error" },
      { status: 500 }
    );
  }
}
