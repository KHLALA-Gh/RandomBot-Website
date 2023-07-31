import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getGuildByUser, getServer } from "@/lib/Servers";
import { AxiosError } from "axios";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "401 : unauthorized" },
        { status: 401 }
      );
    }
    const url = new URL(req.url);
    const guildId = url.pathname.split("/").reverse()[0];
    const guild = await getGuildByUser(
      session.user?.accessToken as string,
      guildId
    );
    if (!guild) {
      return NextResponse.json({ message: "guild not found" }, { status: 404 });
    }
    const server = await getServer(guildId);
    if (!server) {
      return NextResponse.json(url.origin + "/invite?guild_id=" + guildId, {
        status: 303,
      });
    }
    if (!guild.owner) {
      return NextResponse.json({ message: "403 : forbidden" }, { status: 403 });
    }
    const resBody: Server & { guild?: Guild } = server;
    resBody.guild = guild;
    return NextResponse.json(server, { status: 200 });
  } catch (err: any) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        { message: `${err.code} : ${err.message}` },
        { status: +(err.code || 500) }
      );
    }
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
