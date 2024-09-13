import { EntryAnalysis, JournalEntry } from "@prisma/client";

export type TJournalEntry = {
  entry: JournalEntry & { analysis: EntryAnalysis };
};
