import { connectDB } from "@/lib/connectDB";

export async function GET() {
  try {
    await connectDB();
    return new Response(null, { status: 200 });
  } catch (err: any) {
    return new Response(null, { status: 500 });
  }
}
