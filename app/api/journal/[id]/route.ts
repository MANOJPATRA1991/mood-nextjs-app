import { db } from "@/prisma/db";
import { getUserByClerkID } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { content } = await request.json();
  const user = await getUserByClerkID();
  const updatedEntry = await db.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  return NextResponse.json({ data: updatedEntry });
};
