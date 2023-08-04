import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isCommandConfig, updateCommandConfig } from "@/lib/Config";
import { getGuildByUser, getServer } from "@/lib/Servers";
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
    const commandName = url.pathname.split("/").reverse()[0];
    const serverId = url.pathname.split("/").reverse()[1];
    const server = await getServer(serverId);
    const guild = await getGuildByUser(
      session.user?.accessToken as string,
      serverId
    );
    if (!server)
      return NextResponse.json(
        { message: "404 : Server not found" },
        { status: 404 }
      );
    if (!guild || !guild.owner)
      return NextResponse.json(
        { message: "401 : not allowed to access this information" },
        { status: 401 }
      );
    for (let i = 0; i < server.config?.commands?.length; i++) {
      if (server.config?.commands[i]?.name === commandName)
        return NextResponse.json(server.config?.commands[i], { status: 200 });
    }
    return NextResponse.json(
      { message: "404 : command not found" },
      { status: 404 }
    );
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

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { message: "401 : unauthorized" },
        { status: 401 }
      );
    const url = new URL(req.url);
    const commandName = url.pathname.split("/").reverse()[0];
    const serverId = url.pathname.split("/").reverse()[1];
    const server = await getServer(serverId);
    const guild = await getGuildByUser(
      session.user?.accessToken as string,
      serverId
    );
    if (!server)
      return NextResponse.json(
        { message: "404 : Server not found" },
        { status: 404 }
      );
    if (!guild || !guild.owner)
      return NextResponse.json(
        { message: "401 : not allowed to access this information" },
        { status: 401 }
      );
    for (let i = 0; i < server.config?.commands?.length; i++) {
      if (server.config?.commands[i]?.name === commandName) {
        const body = await req.json();
        if (!body || !body.command || !isCommandConfig(body?.command))
          return NextResponse.json(
            { message: "400 : invalid body" },
            { status: 400 }
          );
        await updateCommandConfig(server.serverId, commandName, body.command);
        return NextResponse.json(body.command, { status: 200 });
      }
    }
    return NextResponse.json(
      { message: "404 : command not found" },
      { status: 404 }
    );
  } catch (err: any) {
    console.log(err.message);
    if (err instanceof AxiosError)
      return NextResponse.json(
        {
          message: `${err.response?.status || 500} : ${
            err.response?.statusText || "server error"
          }`,
        },
        { status: err.response?.status || 500 }
      );
    if (err instanceof SyntaxError)
      return NextResponse.json(
        { message: "400 : invalid body" },
        { status: 400 }
      );
    return NextResponse.json(
      { message: "500 : server error" },
      { status: 500 }
    );
  }
}
