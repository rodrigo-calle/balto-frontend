"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetGoals } from "@/hooks/goals/useGetGoals";
import { useAuthStore } from "@/_store";
import { format } from "date-fns";
import { Button } from "@/_components/ui/button";
import { useRouter } from "next/navigation";

export default function Goals() {
  const { user } = useAuthStore();
  const { data, error } = useGetGoals(user?.token ?? "");
  const router = useRouter();

  if (error && !data) {
    console.log({ error });
    return <div>error</div>;
  }

  const handleRedirect = (id: string) => router.push(`/dashboard/goals/${id}`);

  return (
    <div>
      {data?.map((goal) => (
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
      ))}
    </div>
  );
}
