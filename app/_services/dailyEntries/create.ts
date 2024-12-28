import { NewDailyEntry } from "@/_types";
import axios from "axios";
import { BASE_API_URL } from "../common";

export async function createDailyEntry(entry: NewDailyEntry) {
  try {
    const response = await axios.post(`${BASE_API_URL}/daily-entries`, entry);
    return response.data;
  } catch (error) {
    throw error;
  }
}
