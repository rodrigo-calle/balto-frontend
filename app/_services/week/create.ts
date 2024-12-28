import axios from "axios";
import { BASE_API_URL } from "../common";
import { NewWeek } from "@/_types";

export async function createWeek(week: NewWeek) {
  try {
    const response = await axios.post(`${BASE_API_URL}/weeks`, week);
    return response.data;
  } catch (error) {
    throw error;
  }
}
