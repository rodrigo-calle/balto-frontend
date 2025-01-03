import axios from "axios";
import { BASE_API_URL } from "../common";
import { UserWithToken } from "@/_types";

export async function isAuthorized(token: string) {
  try {
    const response = await axios.get<UserWithToken>(
      `${BASE_API_URL}/auth/validate-token`,
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
