"use client";

import { WeekDetailCardHeader } from "@/_components/dashboard/weeks/week-detail-card-header";
import WeekDetailDailyEntries from "@/_components/dashboard/weeks/week-detail-daily-entries";
import WeekDetailCardObjectives from "@/_components/dashboard/weeks/week-detail-objectives-container";
import { useGetGoal } from "@/_hooks/goals/useGetGoal";
import { useGetWeek } from "@/_hooks/weeks/useGetWeek";
import { useParams } from "next/navigation";

export default function WeekPage() {
  const up = useParams();
  const weekId = typeof up.weekId === "string" ? up.weekId : "";
  const { data: week, error, isError, isLoading, refetch } = useGetWeek(weekId);
  const {
    data: goal,
    error: goalError,
    isError: goalIsError,
    isLoading: goalIsLoading,
  } = useGetGoal(week?.goalId ?? "");

  if (error || isError || !week || goalError || goalIsError || !goal) {
    return <div>{`${error}`}</div>;
  }

  if (isLoading || goalIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <WeekDetailCardHeader week={week} goalTitle={goal.title} />
      <WeekDetailCardObjectives week={week} />
      <WeekDetailDailyEntries week={week} refetch={refetch} />
    </>
  );
}
