import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Discord from "next-auth/providers/discord";

const handler: AuthOptions = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DC_ID as string,
      clientSecret: process.env.DC_SECRET as string,
      authorization: { params: { scope: "identify guilds" } },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.accessToken = token.access_token as string | undefined;
      session.user.id = token.id as string;
      return session;
    },
    async jwt({ token, user, account }) {
      return { ...token, ...user, ...account };
    },
  },
});

export { handler as GET, handler as POST };
