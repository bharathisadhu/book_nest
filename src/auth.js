import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import jwt from "jsonwebtoken";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    maxAge: 24 * 60 * 60, // 24 hours
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
