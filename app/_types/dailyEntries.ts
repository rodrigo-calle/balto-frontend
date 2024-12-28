export type DailyEntry = {
  id: number;
  weekId: number;
  date: Date;
  progress: number;
  challenges: string;
};

export type NewDailyEntry = Omit<DailyEntry, "id">;
export type UpdateDailyEntry = Partial<DailyEntry>;