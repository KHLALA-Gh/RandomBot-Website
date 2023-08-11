import { getGeneralConfig } from "@/lib/Config";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const config = (
      await getGeneralConfig(require("@/package.json").randombotV)
    ).quiz;
    return NextResponse.json(config, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
