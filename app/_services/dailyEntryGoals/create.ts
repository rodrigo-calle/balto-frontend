import { DailyEntryObjectives, NewDailyEntryGoal } from "@/_types";
import axios from "axios";
import { BASE_API_URL } from "../common";

export async function createDailyEntryGoals(
  dailyEntryGoals: NewDailyEntryGoal,
  token: string
): Promise<DailyEntryObjectives> {
  try {
    const response = await axios.post<DailyEntryObjectives>(
      `${BASE_API_URL}/daily-entry-goals`,
      dailyEntryGoals,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
