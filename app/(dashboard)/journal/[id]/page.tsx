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
  });

  return entry!;
};

type TProps = {
  params: {
    id: string;
  };
};

const EntryPage = async ({ params }: TProps) => {
  const entry = await getEntry(params.id);
  const analysisData = [
    { name: "Summary", value: "" },
    { name: "Subject", value: "" },
    { name: "Mood", value: "" },
    { name: "Negative", value: false },
  ];
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/5">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li key={item.name} className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
