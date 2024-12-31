import { Goal, NewGoal } from "@/_types";
import axios from "axios";
import { BASE_API_URL } from "../common";

export async function createGoal(goal: NewGoal, token: string): Promise<Goal> {
  try {
    const response = await axios.post<Goal>(`${BASE_API_URL}/goals`, goal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
