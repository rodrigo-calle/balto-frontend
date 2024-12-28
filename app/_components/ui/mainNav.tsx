"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mainNavConfig } from "@/common/mainNavConfig";
import { useEffect, useState } from "react";

export default function MainNav() {
  const [navList, setNavList] = useState(mainNavConfig);
  const user = false;

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

  // TODO: Check if user is logged in
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
          {navList.map((item) => (
            <Link
              href={item.href}
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              prefetch={false}
              key={item.href}
            >
              {item.title}
            </Link>
          ))}
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
