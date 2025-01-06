"use client";

import { useGetGoals } from "@/hooks/goals/useGetGoals";
import GoalPageCard from "@/_components/dashboard/goals/goal-page-card";
import { Button } from "@/_components/ui/button";
import Link from "next/link";

export default function Goals() {
  const { data: goals, error, isLoading } = useGetGoals();

  if (error && !goals) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {goals?.length === 0 && (
        <div className="flex flex-col w-full h-full justify-center items-center">
          <p className="text-2xl">No Goals</p>
          <Link href="/dashboard/goals/new">
            <Button>New Goal</Button>
          </Link>
        </div>
      )}
      <div className="flex flex-row justify-start gap-5">
        {goals?.map((goal) => (
          <GoalPageCard goal={goal} key={goal.id} />
        ))}
      </div>
    </>
  );
}
