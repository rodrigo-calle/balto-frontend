import { Week } from "./week";

export type NewGoal = {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
};
export type Goal = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
};

export type GoalWithWeeks = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  weeks: Week[];
};
