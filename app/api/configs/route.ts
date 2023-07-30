import { getServer } from "@/lib/Servers";
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const commands = await axios.get(
      "https://raw.githubusercontent.com/RandomX12/RandomBot/v0.5.1/config.json?token=GHSAT0AAAAAACFG6B6EDBEI4TV75KTGU7HUZGGOK4A"
    );
    return new Response(JSON.stringify(commands.data.commands), {
      status: 200,
    });
  } catch (err: any) {
    console.log(err);
    return new Response(
      JSON.stringify({ message: "server error", code: 500 }),
      { status: 500 }
    );
  }
}
