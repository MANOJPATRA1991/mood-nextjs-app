"use client";

import { TJournalEntry } from "@/types";
import { deleteEntry, updateEntry } from "@/utils/api";
import { EntryAnalysis } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import Spinner from "./Spinner";

const Editor = ({ entry }: TJournalEntry) => {
  const [value, setValue] = useState(entry.content);
  const [currentAnalysis, setAnalysis] = useState<EntryAnalysis>(
    entry.analysis
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const analysisData = [
    { name: "Summary", value: currentAnalysis.summary },
    { name: "Subject", value: currentAnalysis.subject },
    { name: "Mood", value: currentAnalysis.mood },
    { name: "Negative", value: currentAnalysis.negative },
  ];

  const handleDelete = async () => {
    await deleteEntry(entry.id);
    router.push("/journal");
  };

  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value === entry?.content) return;
      setIsLoading(true);
      const data = await updateEntry(entry.id, _value);
      setAnalysis(data);
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full grid grid-cols-3 gap-0 relative">
      <div className="absolute left-0 top-0 p-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="col-span-2">
        <textarea
          className="w-full h-full text-xl p-8 outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="border-l border-black/5">
        <div
          style={{ background: currentAnalysis.color }}
          className="px-6 py-10"
        >
          <h2 className="text-2xl bg-white/25 text-black">Analysis</h2>
        </div>
        <div>
          <ul role="list" className="divide-y divide-gray-200">
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value.toString()}</span>
              </li>
            ))}
            <li className="py-2 px-4 flex items-center justify-between">
              <button
                onClick={handleDelete}
                type="button"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
