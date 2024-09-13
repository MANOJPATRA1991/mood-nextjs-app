import HistoryChart from "@/components/HistoryChart";
import { db } from "@/prisma/db";
import { getUserByClerkID } from "@/utils/auth";

const getData = async () => {
  const user = await getUserByClerkID();
  const analyses = await db.entryAnalysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const sum = analyses.reduce((all, current) => {
    return all + current.sentimentScore;
  }, 0);
  const avg = sum / analyses.length;

  return { analyses, avg };
}

const History = async () => {
  const { avg, analyses } = await getData();
  return (
    <div className="w-full h-[800px]">
      <div>{`Avg. Sentiment: ${avg}`}</div>
      <div className="h-full w-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
};

export default History;