import { getServer, getGuildByUser } from "@/lib/Servers";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ message: "unauthorized", code: 401 }),
        { status: 401 }
      );
    }
    const url = new URL(req.url);
    const serverId = url.pathname.split("/").reverse()[0];
    const server = await getServer(serverId);
    if (!server) {
      return new Response(
        JSON.stringify({ message: "server not found", code: 404 }),
        { status: 404 }
      );
    }
    const guild = await getGuildByUser(
      session.user?.accessToken as string,
      serverId
    );
    if (!guild) {
      return NextResponse.json(
        { message: "404 : guild not found" },
        { status: 404 }
      );
    }
    if (!guild.owner) {
      return new Response(
        JSON.stringify({
          message: "not allowed to access to this server's config",
          code: 403,
        }),
        { status: 403 }
      );
    }
    return new Response(JSON.stringify(server.config), { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return new Response(
      JSON.stringify({ message: "server error", code: 500 }),
      { status: 200 }
    );
  }
}
