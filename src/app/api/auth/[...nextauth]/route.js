import connectDB from "@/lib/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }
        const db = await connectDB();
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          return null;
        }
        const passwordMatched = bcrypt.compareSync(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          return null;
        }
        return currentUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
        // Persist the OAuth access_token and or the user id to the token right after signin
        if (account) {
        //   token.accessToken = account.access_token
          token.photo = user.photo
        }
        return token
      },
    async session({ session, user, token }) {
        session.user.photo = token.photo
        return session
      },
  },

  pages: {
    signIn: "/login",
    signUp: "/register"
  },
});

export { handler as GET, handler as POST };
