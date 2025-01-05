"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mainNavConfig } from "@/common/mainNavConfig";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/_store";
import { UserWithToken } from "@/_types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

type MainNavMenuProps = {
  user: Omit<UserWithToken, "token"> | null;
  logOut: () => void;
};
function MainNavMenu(props: MainNavMenuProps) {
  const { user, logOut } = props;
  const router = useRouter();

  const handleLogOut = () => {
    logOut();
    router.push("/");
  };
  if (user) {
    return (
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 ">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  return (
    <div className="flex gap-2">
      <Link href="/auth/login">
        <Button variant="outline">Sign In</Button>
      </Link>
      <Link href="/auth/register">
        <Button>Register</Button>
      </Link>
    </div>
  );
}

export default function MainNav() {
  const [navList, setNavList] = useState(mainNavConfig);
  const userLogoutStore = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      const navAuthList = mainNavConfig.filter(
        (item) => item.privileges === "auth"
      );
      setNavList(navAuthList);
      return;
    }
    const navAllList = mainNavConfig.filter(
      (item) => item.privileges === "all"
    );
    setNavList(navAllList);
  }, [user]);

  if (user) return null;

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <h1 className="text-2xl font-bold">Year of 12 Weeks</h1>
          </Link>
          <div className="grid gap-2 py-6">
            {navList.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex w-full items-center py-2 text-lg font-semibold"
                prefetch={false}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 items-center justify-between  container mx-auto">
        <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
          <h1 className="text-2xl font-bold">Year of 12 Weeks</h1>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6">
          <MainNavMenu user={user} logOut={userLogoutStore} />
        </nav>
      </div>
    </header>
  );
}

function MenuIcon(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
