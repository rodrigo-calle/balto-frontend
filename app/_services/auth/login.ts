import axios from "axios";
import { BASE_API_URL } from "../common";

export async function loginUser(user: { email: string; password: string }) {
  try {
    const response = await axios.post(`${BASE_API_URL}/auth/login`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
}
