import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Discord from "next-auth/providers/discord";

const handler: AuthOptions = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DC_ID as string,
      clientSecret: process.env.DC_SECRET as string,
    }),
  ],
});

export { handler as GET, handler as POST };
