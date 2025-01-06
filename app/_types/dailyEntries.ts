export type DailyEntryObjectives = {
  id: string;
  dailyEntryId: string;
  objective: string;
  isCompleted: boolean;
  description: string;
};

export type NewDailyEntryGoal = Omit<DailyEntryObjectives, "id">;
export type UpdateDailyEntryGoal = Partial<NewDailyEntryGoal>;

export type DailyEntry = {
  id: string;
  weekId: string;
  date: Date;
  progress: string;
  notes: string;
  DailyEntryObjectives: DailyEntryObjectives[];
};

export type NewDailyEntry = Omit<DailyEntry, "id" | "DailyEntryObjectives">;
export type UpdateDailyEntry = Partial<NewDailyEntry>;
