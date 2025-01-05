import axios from "axios";
import { BASE_API_URL } from "../common";
import { UserWithToken } from "@/_types";

export async function loginUser(user: {
  email: string;
  password: string;
}): Promise<UserWithToken> {
  try {
    const response = await axios.post<UserWithToken>(
      `${BASE_API_URL}/auth/login`,
      user
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error("Failed to login user");
  } catch (error) {
    throw error;
  }
}
