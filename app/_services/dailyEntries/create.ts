import { NewDailyEntry } from "@/_types";
import axios from "axios";
import { BASE_API_URL } from "../common";

export async function createDailyEntry(entry: NewDailyEntry, token: string) {
  try {
    const response = await axios.post(`${BASE_API_URL}/daily-entries`, entry, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
