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
    async signIn({ account, profile }) {
      // connect to db

      // check if user already exists

      // if not, create user

      // reurn true to indicate successful sign in
    },
    // modify the session
    async session({ session }) {
      // get user from db

      // set user id to the session

      // return session
  },
}, 
};
