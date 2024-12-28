import { UpdateWeek } from "@/_types";
import { BASE_API_URL } from "../common";
import axios from "axios";

export async function updateWeek(id: number, week: UpdateWeek) {
  try {
    const response = await axios.patch(`${BASE_API_URL}/weeks/${id}`, week);
    return response.data;
  } catch (error) {
    throw error;
  }
}
