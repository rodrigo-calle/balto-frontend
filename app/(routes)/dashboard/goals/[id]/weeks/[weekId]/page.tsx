"use client";

import { WeekDetailCardHeader } from "@/_components/dashboard/weeks/week-detail-card-header";
import WeekDetailDailyEntries from "@/_components/dashboard/weeks/week-detail-daily-entries";
import WeekDetailCardObjectives from "@/_components/dashboard/weeks/week-detail-objectives-container";
import { useGetGoal } from "@/_hooks/goals/useGetGoal";
import { useGetWeek } from "@/_hooks/weeks/useGetWeek";
import { useAuthStore } from "@/_store";
import { useParams } from "next/navigation";

export default function WeekPage() {
  const up = useParams();
  const user = useAuthStore((state) => state.user);
  const weekId = typeof up.weekId === "string" ? up.weekId : "";
  const {
    data: week,
    error,
    isError,
    isLoading,
  } = useGetWeek(user?.token ?? "", weekId);
  const {
    data: goal,
    error: goalError,
    isError: goalIsError,
  } = useGetGoal(user?.token ?? "", week?.goalId ?? "");

  if (error || isError || !week || goalError || goalIsError || !goal) {
    return <div>{`${error}`}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <WeekDetailCardHeader week={week} goalTitle={goal.title} />
      <WeekDetailCardObjectives week={week} />
      <WeekDetailDailyEntries week={week} />
    </>
  );
}
