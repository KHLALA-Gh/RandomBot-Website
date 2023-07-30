import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Discord from "next-auth/providers/discord";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET as string,
  providers: [
    Discord({
      clientId: process.env.DC_ID as string,
      clientSecret: process.env.DC_SECRET as string,
      authorization: {
        params: { scope: "identify guilds email" },
      },
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
};

const handler: AuthOptions = NextAuth(authOptions);

export { handler as GET, handler as POST };
