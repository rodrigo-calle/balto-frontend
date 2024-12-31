"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Goal } from "@/_types";
import { format } from "date-fns";
import { Button } from "@/_components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  goal: Goal;
};

export default function GoalPageCard(props: Props) {
  const { goal } = props;
  const router = useRouter();
  const handleRedirect = (id: string) => router.push(`/dashboard/goals/${id}`);

  return (
    <Card key={goal.id} className="w-72">
      <CardHeader>
        <CardTitle>{goal.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Description: {goal.description}
          <p>Start Date: {format(goal.startDate, "PP")}</p>
          <p>End Date: {format(goal.endDate, "PP")}</p>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => handleRedirect(goal.id)}>View</Button>
      </CardFooter>
    </Card>
  );
}
