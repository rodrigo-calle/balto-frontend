export type Week = {
  id: number;
  goalId: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type NewWeek = Omit<Week, "id" | "createdAt" | "updatedAt">;
export type UpdateWeek = Partial<NewWeek>;
