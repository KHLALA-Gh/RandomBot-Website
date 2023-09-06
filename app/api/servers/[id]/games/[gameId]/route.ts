import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteGame, getServerGames } from "@/lib/randomBotExpressServer";
import { getGuild } from "@/lib/discordApiUtils";
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
    const serverId = url.pathname.split("/").at(-3);
    const gameId = url.pathname.split("/").at(-1);
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
    for (let i = 0; i < games.length; i++) {
      if (games[i].hostId === gameId) {
        return NextResponse.json(games[i], { status: 200 });
      }
    }
    return NextResponse.json({ message: `400 : Bad Request` }, { status: 400 });
  } catch (err: any) {
    if (err instanceof AxiosError)
      return NextResponse.json(
        {
          message: `${err.response?.status || "500"} : ${
            err.response?.statusText || "server error"
          }`,
        },
        { status: err.response?.status }
      );
    return NextResponse.json(
      { message: `500 : server error` },
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
    const serverId = url.pathname.split("/").at(-3);
    const gameId = url.pathname.split("/").at(-1);
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
    for (let i = 0; i < games.length; i++) {
      if (games[i].hostId === gameId) {
        await deleteGame(
          serverId as string,
          gameId,
          session.user.accessToken as string
        );
        return NextResponse.json({}, { status: 200 });
      }
    }
    return NextResponse.json({ message: `400 : Bad Request` }, { status: 400 });
  } catch (err: any) {
    if (err instanceof AxiosError)
      return NextResponse.json(
        {
          message: `${err.response?.status || "500"} : ${
            err.response?.statusText || "server error"
          }`,
        },
        { status: err.response?.status }
      );
    return NextResponse.json(
      { message: `500 : server error` },
      { status: 500 }
    );
  }
}
