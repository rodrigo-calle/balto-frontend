"use client";
import { Button } from "@/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/_components/ui/card";
import { Week } from "@/_types";
import { useRouter } from "next/navigation";
import WeekCardHeaderContent from "./week-header-card-content";
import { Goal } from "lucide-react";
import Link from "next/link";

type WeekCardProps = {
  week: Week;
};

export default function WeekCard(props: WeekCardProps) {
  const { week } = props;
  const router = useRouter();

  const navigationHandler = () => {
    router.push(`/dashboard/goals/${week.goalId}/weeks/${week.id}`);
  };
  console.log({ x: week.WeeklyObjectives.length });
  return (
    <Card className="w-72 h-72">
      <CardHeader>
        <WeekCardHeaderContent week={week} />
      </CardHeader>
      <CardContent>
        {week.WeeklyObjectives.length > 0 ? (
          week.WeeklyObjectives.slice(0, 2).map((objective) => (
            <div
              key={objective.id}
              className="flex flex-row gap-2 items-center"
            >
              <Goal className="h-4 w-4" />
              <p>{objective.objective}</p>
            </div>
          ))
        ) : (
          <p>No Objectives</p>
        )}
        {week.WeeklyObjectives.length > 2 && (
          <Link
            href={`/dashboard/goals/${week.goalId}/weeks/${week.id}`}
            className="text-blue-500 text-xs"
          >
            View more
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={navigationHandler}>View</Button>
      </CardFooter>
    </Card>
  );
}
