import axios from "axios";
import { BASE_API_URL } from "../common";

export async function getEntriesByWeek(weekId: number, token: string) {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/daily-entries/${weekId}`,
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
