import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log(baseUrl);
    },
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id;
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userAlreadyExists = await User.findOne({
          email: profile.email,
        });
        if (!userAlreadyExists) {
          await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.image,
            prompts: [],
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
