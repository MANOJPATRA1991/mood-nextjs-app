"use client";

import { updateEntry } from "@/utils/api";
import { JournalEntry } from "@prisma/client";
import { useState } from "react";
import { useAutosave } from "react-autosave";

type TProps = { entry: JournalEntry };

const Editor = ({ entry }: TProps) => {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);

  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value === entry?.content) return;
      setIsLoading(true);
      const updated = await updateEntry(entry.id, _value);
      setIsLoading(false);
    },
  })

  return (
    <div className="w-full h-full">
      {isLoading && (<div>...loading</div>)}
      <textarea
        className="w-full h-full text-xl p-8 outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Editor;
