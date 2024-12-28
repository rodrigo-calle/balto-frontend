import { NewUser, UserWithToken } from "@/_types";
import axios from "axios";
import { BASE_API_URL } from "../common";

export async function createUser(user: NewUser) {
  try {
    const response = await axios.post<UserWithToken>(
      `${BASE_API_URL}/auth/register`,
      user
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
