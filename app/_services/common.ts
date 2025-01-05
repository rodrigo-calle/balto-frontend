import { config } from "@/_config";

export const BASE_API_URL = config?.server;
export const cookieEnvSettings = {
  domain: config?.domain,
  secure: config?.cookieSecure,
};
