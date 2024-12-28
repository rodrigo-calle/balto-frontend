import axios from "axios";
import { BASE_API_URL } from "../common";

export async function getWeeksByGoal(goalId: number) {
  try {
    const response = await axios.get(`${BASE_API_URL}/weeks/${goalId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
