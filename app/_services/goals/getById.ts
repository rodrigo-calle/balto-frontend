import { GoalWithWeeks } from "@/_types";
import axios from "axios";
import { BASE_API_URL } from "../common";

export async function getGoal(
  id: string,
  token: string
): Promise<GoalWithWeeks | undefined> {
  try {
    const response = await axios.get<GoalWithWeeks>(
      `${BASE_API_URL}/goals/${id}`,
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
