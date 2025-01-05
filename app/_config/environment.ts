const env = process.env.NEXT_PUBLIC_ENV || "dev";
export const config = {
  dev: {
    server: "http://localhost:8080",
    domain: "localhost",
    cookieSecure: false,
  },
  prod: {
    server: process.env.NEXT_PUBLIC_API_URL,
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    cookieSecure: true,
  },
}[env];
