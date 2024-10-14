import connectDB from "@/lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

const authOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    // Credentials provider
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

        // Compare passwords (async version)
        const passwordMatched = await bcrypt.compare(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          return null;
        }

        return currentUser;
      },
    }),

    // Google provider
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

    // GitHub provider
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

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },

    async signIn({ user, account }) {
      const { email } = user;

      if (account.provider === "google" || account.provider === "github") {
        try {
          const db = await connectDB();
          const userCollection = db.collection("users");

          const userExist = await userCollection.findOne({ email });

          if (!userExist) {
            // Insert user with specific fields
            const newUser = {
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role || "user",
            };
            await userCollection.insertOne(newUser);
          }
          return true;
        } catch (error) {
          console.error("Error during sign-in:", error);
          return false;
        }
      }

      return true;
    },
  },

  pages: {
    signIn: "/login",
    signUp: "/register",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
