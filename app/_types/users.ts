export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserWithToken = User & {
  token: string;
};

export type NewUser = {
  name: string;
  email: string;
  password: string;
};
