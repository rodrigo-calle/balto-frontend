import axios from "axios";
import { BASE_API_URL } from "../common";

export async function isAuthorized(token: string) {
  try {
    const response = await axios.get(`${BASE_API_URL}/auth/validate-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
