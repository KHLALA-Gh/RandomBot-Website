import NextAuth, { DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
      id?: string;
    } & DefaultSession["user"];
  }
}
