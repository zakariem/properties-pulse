import { connectDB } from "@/config/db";
import { User } from "@/model/User";
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
      try {
        // Connect to the database (if not already connected)
        await connectDB();

        // Check if the user already exists
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          const username = profile.name.slice(0, 20); // Limit username length
          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }

        // Return true to indicate successful sign-in
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Return false to prevent the sign-in if there was an error
      }
    },

    async session({ session }) {
      try {
        // Connect to the database
        await connectDB();

        // Retrieve the user from the database
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
          throw new Error("User not found");
        }

        // Add user ID to the session object
        session.user.id = user._id.toString();

        // Return the session object
        return session;
      } catch (error) {
        console.error("Error fetching session:", error);
        return session; // Return the session even in case of error (depends on your requirements)
      }
    },
  },
};
