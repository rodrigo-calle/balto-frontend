"use client";

import { useGetGoals } from "@/hooks/goals/useGetGoals";
import { useAuthStore } from "@/_store";
import GoalPageCard from "@/_components/dashboard/goals/goal-page-card";

export default function Goals() {
  const { user } = useAuthStore();
  const { data, error } = useGetGoals(user?.token ?? "");

  if (error && !data) {
    return <div>error</div>;
  }

  return (
    <div className="flex flex-row justify-start gap-5">
      {data?.map((goal) => (
        <GoalPageCard goal={goal} key={goal.id} />
      ))}
    </div>
  );
}
