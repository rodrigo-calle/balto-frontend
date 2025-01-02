import axios from "axios";
import { BASE_API_URL } from "../common";

export async function deleteWeekleObjective(id: string, token: string) {
  try {
    const response = await axios.delete(
      `${BASE_API_URL}/weekle-objectives/${id}`,
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
