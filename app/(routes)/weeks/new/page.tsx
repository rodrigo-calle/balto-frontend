import { z } from "zod";
const newWeekSchema = z.object({
  goalId: z.string().min(1, { message: "Goal is required" }),
  startDate: z.date(),
  endDate: z.date(),
});
