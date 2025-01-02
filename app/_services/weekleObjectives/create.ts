import axios from "axios";
import { BASE_API_URL } from "../common";
import { NewWeekleObjective, WeekleObjective } from "@/_types";

export async function createWeekleObjectives(
  weekleObjectives: NewWeekleObjective,
  token: string
): Promise<WeekleObjective> {
  try {
    const response = await axios.post<WeekleObjective>(
      `${BASE_API_URL}/weekle-goals`,
      weekleObjectives,
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
