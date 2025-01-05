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
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Unauthorized");
  } catch (error) {
    throw error;
  }
}
