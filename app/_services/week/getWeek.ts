import axios from "axios";
import { BASE_API_URL } from "../common";
import { Week } from "@/_types";

export async function getWeek(id: string, token: string) {
  try {
    const response = await axios.get<Week>(`${BASE_API_URL}/weeks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log({ response });
    return response.data;
  } catch (error) {
    throw error;
  }
}
