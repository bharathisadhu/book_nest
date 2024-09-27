// import connectDB from "@/lib/connectDB";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
// import bcrypt from "bcrypt";

// const authOptions = {
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   providers: [
//     // Credentials provider
//     CredentialsProvider({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials;
//         if (!email || !password) {
//           return null;
//         }
//         const db = await connectDB();
//         const currentUser = await db.collection("users").findOne({ email });
//         if (!currentUser) {
//           return null;
//         }
//         const passwordMatched = bcrypt.compareSync(
//           password,
//           currentUser.password
//         );
//         if (!passwordMatched) {
//           return null;
//         }
//         return currentUser;
//       },
//     }),

//     // Google provider
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),

//     // GitHub provider
//     GithubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//       authorization: {
//         params: {
//           scope: "read:user user:email",
//         },
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account.provider === "google" || account.provider === "github") {
//         const { name, email, photo } = user;
//         try {
//           const db = await connectDB();
//           const userCollection = db.collection("users");
//           const userExist = await userCollection.findOne({ email });
//           if (!userExist) {
//             const res = await userCollection.insertOne(user);
//             return user;
//           } else {
//             return user;
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       } else {
//         return user;
//       }
//     },
//   },
//   pages: {
//     signIn: '/login',
//     signUp: "/register"
//   }
// };
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };



import connectDB from "@/lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

const authOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET ,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    // Credentials provider
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        const db = await connectDB();
        const currentUser = await db.collection("users").findOne({ email });

        if (!currentUser) {
          throw new Error('User not found');
        }

        const passwordMatched = bcrypt.compareSync(password, currentUser.password);
        if (!passwordMatched) {
          throw new Error('Invalid password');
        }

        // Return user object with required fields
        return { id: currentUser._id, email: currentUser.email, name: currentUser.name };
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
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const { email, name, image } = user;
        const db = await connectDB();
        const userCollection = db.collection("users");

        const userExist = await userCollection.findOne({ email });
        if (!userExist) {
          await userCollection.insertOne({ email, name, image });
        }
        return { id: userExist ? userExist._id : null, email, name, image };
      }
      return user;
    },
    async session({ session, user }) {
      session.user.id = user.id; // Add user ID to session
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signUp: "/register",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
