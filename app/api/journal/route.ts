import { db } from "@/prisma/db";
import { getUserByClerkID } from "@/utils/auth";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkID();
  const entry = await db.journalEntry.create({
    data: {
      userId: user.id,
      content: "Write about your day",
      analysis: {
        create: {
          mood: "Neutral",
          subject: 'None',
          negative: false,
          summary: 'None',
          sentimentScore: 0,
          color: '#0101fe',
          userId: user.id,
        }
      }
    },
  });

  return NextResponse.json({ data: entry });
};
