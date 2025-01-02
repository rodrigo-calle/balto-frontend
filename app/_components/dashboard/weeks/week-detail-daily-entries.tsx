import { Button } from "@/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/_components/ui/card";
import { Week } from "@/_types";
import { format } from "date-fns";

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
      <CardContent>
        {week.DailyEntry.length === 0 && <p>No Daily Entries Registered</p>}
        {week.DailyEntry.map((daily) => (
          <>
            <p key={daily.id}>Date {format(daily.date, "PP")}</p>
            <p>Dayly Goals:</p>
            <div>
              {daily.DailyEntryObjectives.map((dailyGoal) => (
                <>
                  <p key={dailyGoal.id}>Goal:{dailyGoal.objective}</p>
                  <p>Daily Goal description: {dailyGoal.description} </p>
                  <p>Completed: {dailyGoal.isCompleted}</p>
                </>
              ))}
            </div>
          </>
        ))}
      </CardContent>
      <CardFooter>
        <Button>Register your daily entry</Button>
      </CardFooter>
    </Card>
  );
}
