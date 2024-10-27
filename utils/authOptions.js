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
        await connectDB(); // Ensure database is connected

        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          const username = profile.name.slice(0, 20); // Limit to 20 chars
          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }

        return true; // Successful sign-in
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Prevent sign-in on error
      }
    },

    async session({ session }) {
      try {
        await connectDB();

        // Retrieve user from database
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
          console.warn("User not found in session callback");
          return null; // Handle user not found case (null or empty session)
        }

        // Attach user ID to session
        session.user.id = user._id.toString();
        return session;
      } catch (error) {
        console.error("Error fetching session:", error);
        return null; // Return null if an error occurs
      }
    },
  },
};
