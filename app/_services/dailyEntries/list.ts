import axios from "axios";
import { BASE_API_URL } from "../common";

export async function getEntriesByWeek(weekId: number) {
  try {
    const response = await axios.get(`${BASE_API_URL}/daily-entries/${weekId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
