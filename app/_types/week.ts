import { DailyEntry } from "./dailyEntries";

export type WeekleObjective = {
  id: string;
  weekId: string;
  objective: string;
};

export type NewWeekleObjective = Omit<WeekleObjective, "id">;
export type UpdateWeekleObjective = Partial<NewWeekleObjective>;

export type Week = {
  id: string;
  goalId: string;
  description: string;
  WeeklyObjectives: WeekleObjective[];
  DailyEntry: DailyEntry[];
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type NewWeek = Omit<Week, "id" | "createdAt" | "updatedAt">;
export type UpdateWeek = Partial<NewWeek>;
