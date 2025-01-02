import { Button } from "@/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/_components/ui/card";
import { Separator } from "@/_components/ui/separator";
import { Week } from "@/_types";
import { format } from "date-fns";
import Link from "next/link";
import AddDailyGoalDialog from "../daily/dialogForm/addDailyGoalDialog";

type Props = {
  week: Week;
};
export default function WeekDetailDailyEntries(props: Props) {
  const { week } = props;
  return (
    <Card>
      <CardHeader>
        <h1 className="text-3xl font-bold">Daily Entries</h1>
      </CardHeader>
      <Separator className="w-10/12 mx-auto" />
      <CardContent>
        {week.DailyEntry.length === 0 && <p>No Daily Entries Registered</p>}
        <div className="flex-col gap-4 flex">
          {week.DailyEntry.map((daily) => (
            <div key={daily.id} className="rounded-md border p-4 flex flex-col">
              <p className="font-bold">Date {format(daily.date, "PP")}</p>
              <Separator />
              <div className="flex flex-row items-center justify-between mt-2">
                <p className="font-bold mt-2">Daily Goals:</p>
                <AddDailyGoalDialog dailyEntryId={daily.id} />
              </div>
              <div>
                {daily.DailyEntryObjectives.map((dailyGoal, index) => (
                  <div
                    className=" flex items-center space-x-4 rounded-md border p-4"
                    key={index}
                  >
                    <p key={dailyGoal.id}>Goal:{dailyGoal.objective}</p>
                    <p>Daily Goal description: {dailyGoal.description} </p>
                    <p>Completed: {dailyGoal.isCompleted}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/dashboard/goals/${week.goalId}/weeks/${week.id}/daily/new`}
        >
          <Button>Register your daily entry</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
