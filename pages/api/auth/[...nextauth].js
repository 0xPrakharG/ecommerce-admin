import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/mongoose";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "@/utils/mongodb";

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile }) {
      console.log(profile);
      try {
        await connectDB();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export default handler;
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
