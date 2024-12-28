import { Goal } from "@/_types";
import axios from "axios";
import { BASE_API_URL } from "../common";

export async function getGoals(): Promise<Goal[]> {
  try {
    const response = await axios.get<Goal[]>(`${BASE_API_URL}/goals`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
