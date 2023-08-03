import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getGeneralConfig, isCommand } from "@/lib/Config";
import { getGuildByUser, getServer, updateServer } from "@/lib/Servers";
import { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
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
    const id = url.pathname.split("/").reverse()[0];
    const server = await getServer(id);
    const guild = await getGuildByUser(session.user.accessToken as string, id);
    if (!server) {
      return NextResponse.json(
        { message: "404 : server not found" },
        { status: 404 }
      );
    }
    if (!guild) {
      return NextResponse.json(
        { message: "401 : You are not allowed to access this server" },
        { status: 401 }
      );
    }
    return NextResponse.json(server.config.commands, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "500 : server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "401 : unauthorized" },
        { status: 401 }
      );
    }
    const url = new URL(req.url);
    const id = url.pathname.split("/").reverse()[0];
    const server = await getServer(id);
    const guild = await getGuildByUser(session.user.accessToken as string, id);
    if (!server) {
      return NextResponse.json(
        { message: "404 : server not found" },
        { status: 404 }
      );
    }
    if (!guild) {
      return NextResponse.json(
        { message: "401 : You are not allowed to access this server" },
        { status: 401 }
      );
    }
    const body = await req.json();
    if (!body.commands || !(body.commands instanceof Array)) {
      return NextResponse.json(
        { message: "400 : Invalid request body" },
        { status: 400 }
      );
    }
    for (let i = 0; i < body.commands?.length; i++) {
      if (!isCommand(body.commands[i]))
        return NextResponse.json(
          { message: "400 : Invalid Body" },
          { status: 400 }
        );
    }
    const commands = (
      await getGeneralConfig(require("@/package.json").randombotV)
    ).commands;
    const updatedCommands = (body.commands as Command[])
      .map((e: Command) => {
        let isValid = false;
        if (!isCommand(e)) return;
        commands.map((name) => {
          if (name === e.name) {
            isValid = true;
          }
        });
        if (!isValid) {
          return undefined;
        }
        return e;
      })
      .filter((e) => isCommand(e));
    server.config.commands = server.config.commands
      .map((command) => {
        updatedCommands.map((uc) => {
          if (uc?.name === command.name) {
            command.enable = uc.enable;
          }
        });
        return command;
      })
      .filter((c) => (c ? true : false)) as CommandConfig[];
    await updateServer(id, server);
    return NextResponse.json(server.config?.commands, { status: 200 });
  } catch (err: any) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        { message: "500 : " + err.response?.data || "server error" },
        { status: err.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { message: "500 : server error" },
      { status: 500 }
    );
  }
}
