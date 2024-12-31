"use client";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const pathGoalsWithUuid = /^\/dashboard\/goals\/[0-9a-fA-F-]{36}$/;
const getBreadcrumbPath = (path: string) => {
  if (path === "/dashboard")
    return (
      <BreadcrumbItem className="hidden md:block">
        <BreadcrumbLink href="/dashboard/">Home</BreadcrumbLink>
      </BreadcrumbItem>
    );

  if (path === "/dashboard/goals")
    return (
      <>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard/goals">Goals</BreadcrumbLink>
        </BreadcrumbItem>
      </>
    );

  if (path === "/dashboard/goals/new")
    return (
      <>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard/goals">Goals</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard/goals/new">New</BreadcrumbLink>
        </BreadcrumbItem>
      </>
    );
  if (pathGoalsWithUuid.test(path)) {
    const uuid = path.split("/").pop();
    return (
      <>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard/goals">Goals</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={`/dashboard/goals/${uuid}`}>
            {uuid?.slice(0, 6)}...
          </BreadcrumbLink>
        </BreadcrumbItem>
      </>
    );
  }

  if (path === "/dashboard/weeks")
    return (
      <>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard/weeks">Weeks</BreadcrumbLink>
        </BreadcrumbItem>
      </>
    );

  if (path === "/dashboard/weeks/new")
    return (
      <>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard/weeks">Weeks</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard/weeks/new">New</BreadcrumbLink>
        </BreadcrumbItem>
      </>
    );

  return null;
};

export default function BreadcrumbRoutes() {
  const router = window.location.pathname;

  const breadcrumb = getBreadcrumbPath(router);

  return <BreadcrumbList>{breadcrumb}</BreadcrumbList>;
}
