import { UpdateDailyEntry } from "@/_types";
import axios from "axios";
import { BASE_API_URL } from "../common";

export async function updateDailyEntry(id: number, entry: UpdateDailyEntry) {
  try {
    const response = await axios.patch(
      `${BASE_API_URL}/daily-entries/${id}`,
      entry
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}