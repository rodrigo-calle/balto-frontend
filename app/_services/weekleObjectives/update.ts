import axios from "axios";
import { BASE_API_URL } from "../common";
import { UpdateWeekleObjective, WeekleObjective } from "@/_types";

export async function updateWeekleObjective(
  id: string,
  weekleObjective: UpdateWeekleObjective,
  token: string
): Promise<WeekleObjective> {
  try {
    const response = await axios.patch(
      `${BASE_API_URL}/weekle-objectives/${id}`,
      weekleObjective,
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
