import { db } from "@/prisma/db";
import { auth } from "@clerk/nextjs/server";

export const getUserByClerkID = async () => {
  const { userId } = auth();

  const user = await db.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
  });

  return user;
};
