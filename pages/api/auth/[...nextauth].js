import NextAuth, { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/utils/mongodb";

const adminEmails = ["prakhargoyal.104@gmail.com"];

export const authOptions = {
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!adminEmails.includes(session?.user?.email)) {
    // res.status(401);
    // res.end();
    throw "not an admin";
  }
}

//   async session({ session }) {
//     return session;
//   },
//   async signIn({ profile }) {
//     try {
//       await connectDB();
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   },
// export default handler;
// export default NextAuth({
//   providers: [
//     // OAuth authentication providers...
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   adapter: MongoDBAdapter(clientPromise),
// });
