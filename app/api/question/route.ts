import { db } from "@/prisma/db";
import { qa } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();
  const user = await getUserByClerkID();

  const entries = await db.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  const answer = await qa(question, entries);

  return NextResponse.json({ data: answer });
};
