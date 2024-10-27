import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export default async function getSessionUserID() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}
