import { getGeneralConfig } from "@/lib/Config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const configs = await getGeneralConfig(
      require("@/package.json").randombotV
    );
    const commands = configs.commands;
    return NextResponse.json(commands, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "500 : server error" },
      { status: 500 }
    );
  }
}
