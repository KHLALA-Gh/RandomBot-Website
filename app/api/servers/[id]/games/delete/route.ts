import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteGames } from "@/lib/randomBotExpressServer";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { message: `401 : Unauthorized` },
        { status: 401 }
      );
    const body = await req.json();
    if (!body.games)
      return NextResponse.json(
        { message: "400 : Bad Request" },
        { status: 400 }
      );
    if (!(body.games instanceof Array))
      return NextResponse.json(
        { message: "400 : Bad Request" },
        { status: 400 }
      );

    for (let i = 0; i < body.games.length; i++) {
      if (!body.games[i])
        return NextResponse.json(
          { message: "400 : Bad Request" },
          { status: 400 }
        );
      if (typeof body.games[i] !== "string")
        return NextResponse.json(
          { message: "400 : Bad Request" },
          { status: 400 }
        );
    }
    const url = new URL(req.url);
    const serverId = url.pathname.split("/").at(-3);
    if (!serverId)
      return NextResponse.json(
        { message: "400 : Bad Request" },
        { status: 400 }
      );
    const res = await deleteGames(
      serverId,
      body.games,
      session.user.accessToken as string
    );
    return NextResponse.json(res, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    if (err instanceof SyntaxError)
      return NextResponse.json(
        { message: "400 : Bad Request" },
        { status: 400 }
      );
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
      {
        message: "500 : server error",
      },
      { status: 500 }
    );
  }
}
