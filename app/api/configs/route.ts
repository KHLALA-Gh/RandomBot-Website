import { getGeneralConfig } from "@/lib/Config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const config = await getGeneralConfig(require("@/package.json").randombotV);
    return NextResponse.json(config, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return new Response(
      JSON.stringify({ message: "server error", code: 500 }),
      { status: 500 }
    );
  }
}
