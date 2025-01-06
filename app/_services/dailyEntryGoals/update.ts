import { DailyEntryObjectives, UpdateDailyEntryGoal } from "@/_types";
import axios from "axios";
import { BASE_API_URL } from "../common";

export async function updateDailyEntryGoals(
  id: string,
  dailyEntryGoals: UpdateDailyEntryGoal,
  token: string
) {
  try {
    const response = await axios.patch<DailyEntryObjectives>(
      `${BASE_API_URL}/daily-goals/${id}`,
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
