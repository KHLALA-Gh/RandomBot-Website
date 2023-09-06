import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getGuild } from "@/lib/discordApiUtils";
import { deleteAllGames, getServerGames } from "@/lib/randomBotExpressServer";
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "401 : Unauthorized" },
        { status: 401 }
      );
    }
    const url = new URL(req.url);
    const serverId = url.pathname.split("/").at(-2);
    const guild = await getGuild(serverId as string);
    if (guild.owner_id !== session.user.id)
      return NextResponse.json(
        { message: `401 : Unauthorized` },
        { status: 401 }
      );
    const games = await getServerGames(
      serverId as string,
      session.user.accessToken as string
    );
    return NextResponse.json(games, { status: 200 });
  } catch (err: any) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        {
          message: `${err.response?.status || "500"} : ${
            err.response?.statusText || "server error"
          }`,
        },
        { status: err.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { message: "500 : server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "401 : Unauthorized" },
        { status: 401 }
      );
    }
    const url = new URL(req.url);
    const serverId = url.pathname.split("/").at(-2);
    const guild = await getGuild(serverId as string);
    if (guild.owner_id !== session.user.id)
      return NextResponse.json(
        { message: `401 : Unauthorized` },
        { status: 401 }
      );
    const res = await deleteAllGames(
      serverId as string,
      session.user.accessToken as string
    );
    return NextResponse.json(res, { status: 200 });
  } catch (err: any) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        {
          message: `${err.response?.status || "500"} : ${
            err.response?.statusText || "server error"
          }`,
        },
        { status: err.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { message: "500 : server error" },
      { status: 500 }
    );
  }
}
