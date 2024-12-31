import { Goal } from "@/_types";
import axios from "axios";
import { BASE_API_URL } from "../common";

export async function getGoals(token: string): Promise<Goal[]> {
  try {
    const response = await axios.get<Goal[]>(`${BASE_API_URL}/goals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
