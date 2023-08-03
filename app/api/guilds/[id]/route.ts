import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getGuildByUser } from "@/lib/Servers";
import { AxiosError } from "axios";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { message: "401 : unauthorized" },
        { status: 401 }
      );
    const url = new URL(req.url);
    const guild = await getGuildByUser(
      session.user?.accessToken as string,
      url.pathname.split("/").reverse()[0]
    );
    if (!guild)
      return NextResponse.json(
        { message: "404 : guild not found" },
        { status: 404 }
      );
    if (!guild.owner)
      return NextResponse.json(
        { message: "401 : unauthorized" },
        { status: 401 }
      );
    return NextResponse.json(guild, { status: 200 });
  } catch (err: any) {
    if (err instanceof AxiosError)
      return NextResponse.json(
        {
          message: `failed to fetch discord api with status code ${err.response?.status}`,
        },
        { status: +(err.response?.status || 500) }
      );

    return NextResponse.json(
      { message: "500 : server error" },
      { status: 500 }
    );
  }
}
