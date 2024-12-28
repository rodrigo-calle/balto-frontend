enum Privileges {
  all = "all",
  auth = "auth",
}
type MainNavConfig = {
  title: string;
  href: string;
  privileges: Privileges;
}[];
export const mainNavConfig: MainNavConfig = [
  {
    title: "Login",
    href: "/auth/login",
    privileges: Privileges.all,
  },
  {
    title: "Register",
    href: "/auth/register",
    privileges: Privileges.all,
  },
  {
    title: "Goals",
    href: "/goals",
    privileges: Privileges.auth,
  },
  {
    title: "Daily Entries",
    href: "/daily-entries",
    privileges: Privileges.auth,
  },
  {
    title: "Weeks",
    href: "/weeks",
    privileges: Privileges.auth,
  },
];
