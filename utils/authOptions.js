import {connectDB} from "@/config/db";
import {User} from "@/model/User";

import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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
  ],
  callbacks: {
    async signIn({ profile }) {
      // connect to db
      await connectDB();
      // check if user already exists
      const userExists = await User.findOne({ email: profile.email });
      // if not, create user
      if (!userExists) {
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // reurn true to indicate successful sign in
      return true;
    },
    // modify the session
    async session({ session }) {
      // get user from db
      const user = await User.findOne({ email: session.user.email });
      // set user id to the session
      session.user.id = user._id.toString();
      // return session
      return session;
    },
  },
};
