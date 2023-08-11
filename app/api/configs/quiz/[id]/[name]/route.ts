import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isQuizConfig } from "@/lib/Config";
import { createInviteLink } from "@/lib/Invite";
import { getGuildByUser, getServer, updateServer } from "@/lib/Servers";
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
    const guild = await getGuildByUser(session.user.accessToken as string, id);
    if (!guild)
      return NextResponse.json(
        { message: `404 : guild not found` },
        { status: 404 }
      );
    if (!guild.owner)
      return NextResponse.json({
        message: "401 : not allowed to access this information",
      });
    const server = await getServer(id);
    if (!server)
      return NextResponse.json(
        {
          message: `302 : bot is not in this server invite it from here ${createInviteLink(
            { origin: url.origin, guildId: id }
          )}`,
        },
        { status: 302 }
      );
    const configName: keyof QuizConfig = url.pathname
      .split("/")
      .reverse()[0] as keyof QuizConfig;
    if (!server.config.quiz[configName])
      return NextResponse.json(
        { message: "404 : quiz config not found" },
        { status: 404 }
      );
    return NextResponse.json(server.config.quiz[configName], { status: 200 });
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
      { message: `500 : server error` },
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
    const id = url.pathname.split("/").reverse()[1];
    const guild = await getGuildByUser(session.user.accessToken as string, id);
    if (!guild)
      return NextResponse.json(
        { message: `404 : guild not found` },
        { status: 404 }
      );
    if (!guild.owner)
      return NextResponse.json({
        message: "401 : not allowed to access this information",
      });
    const server = await getServer(id);
    if (!server)
      return NextResponse.json(
        {
          message: `302 : bot is not in this server invite it from here ${createInviteLink(
            { origin: url.origin, guildId: id }
          )}`,
        },
        { status: 302 }
      );
    const configName: keyof QuizConfig = url.pathname
      .split("/")
      .reverse()[0] as keyof QuizConfig;
    if (server.config.quiz[configName] === undefined)
      return NextResponse.json(
        { message: "404 : quiz config not found" },
        { status: 404 }
      );
    const body = await req.json();
    const check = isQuizConfig(configName, body.config);
    if (!check)
      return NextResponse.json(
        { message: "400 : invalid body" },
        { status: 400 }
      );
    (server.config.quiz[configName] as any) = body.config;
    await updateServer(id, server);
    return NextResponse.json(server.config.quiz[configName], { status: 200 });
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
