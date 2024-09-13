import Editor from "@/components/Editor";
import { db } from "@/prisma/db";
import { getUserByClerkID } from "@/utils/auth";

const getEntry = async (id: string) => {
  const user = await getUserByClerkID();
  const entry = await db.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    }
  });

  return entry as any;
};

type TProps = {
  params: {
    id: string;
  };
};

const EntryPage = async ({ params }: TProps) => {
  const entry = await getEntry(params.id);

  return (
    <Editor entry={entry} />
  );
};

export default EntryPage;
