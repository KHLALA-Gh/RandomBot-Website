import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getGuildByUser } from "@/lib/Servers";
import { getGuildMembers } from "@/lib/discordApiUtils";
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
    if (!guild || !guild?.owner)
      return NextResponse.json(
        { message: "404 : guild not found" },
        { status: 404 }
      );
    const members = await getGuildMembers(id);
    return NextResponse.json(members, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    if (err instanceof AxiosError)
      return NextResponse.json(
        {
          message: `${err.response?.status || 500}  : ${
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
