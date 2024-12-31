export type WeekleObjective = {
  id: string;
  weekId: string;
  objective: string;
};

export type DailyEntry = {
  id: string;
  weekId: string;
  progress: number;
  notes: string;
  date: Date;
};

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
