import { Goal, NewGoal } from "@/_types";
import axios from "axios";
import { BASE_API_URL } from "../common";
console.log({ BASE_API_URL });
export async function createGoal(goal: NewGoal): Promise<Goal> {
  try {
    const response = await axios.post<Goal>(`${BASE_API_URL}/goals`, goal);

    return response.data;
  } catch (error) {
    throw error;
  }
}
