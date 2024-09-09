import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { db } from "@/prisma/db";
import { getUserByClerkID } from "@/utils/auth";
import Link from "next/link";

const getEntries = async () => {
  const user = await getUserByClerkID();
  const entries = await db.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    }
  });

  return entries;
};

const JournalPage = async () => {
  const entries = await getEntries();
  console.log({ entries })
  return (
    <div className="p-10 bg-zinc-400/10">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
