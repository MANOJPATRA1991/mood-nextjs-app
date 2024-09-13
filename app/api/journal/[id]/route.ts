import { db } from "@/prisma/db";
import { update } from "@/utils/actions";
import { analyze } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { NextResponse } from "next/server";

export const PATCH = async (
  request: Request,
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

  const analysis = await analyze(updatedEntry);

  const savedAnalysis = await db.entryAnalysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    update: { ...analysis },
    create: {
      entryId: updatedEntry.id,
      userId: user.id,
      ...analysis,
    },
  });

  update(["/journal"]);

  return NextResponse.json({ data: savedAnalysis });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const user = await getUserByClerkID();

  await db.journalEntry.delete({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
  });

  update(["/journal"]);

  return NextResponse.json({ data: { id: params.id } });
};
