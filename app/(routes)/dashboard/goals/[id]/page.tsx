"use client";

import { useGetGoal } from "@/_hooks/goals/useGetGoal";
import { useAuthStore } from "@/_store";
import { useParams } from "next/navigation";
import GoalDetailCard from "@/_components/dashboard/goals/goal-detail-card";
import WeekCard from "@/_components/dashboard/weeks/week-card";

export default function Goals() {
  const up = useParams();
  const user = useAuthStore((state) => state.user);
  const goalId = typeof up.id === "string" ? up.id : "";
  const { data, error, isError, isLoading } = useGetGoal(
    user?.token ?? "",
    goalId
  );
  console.log(data);
  if (error || isError || !data) {
    return <div>{`${error}`}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div key={data.id} className="flex flex-col gap-5">
      <GoalDetailCard goal={data} />
      <div className="flex flex-row flex-wrap justify-between gap-6">
        {data.weeks.map((week, index) => (
          <WeekCard key={String(index)} week={week} />
        ))}
      </div>
    </div>
  );
}
