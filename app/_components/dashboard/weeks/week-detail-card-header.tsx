import { Card, CardContent, CardHeader } from "@/_components/ui/card";
import { Week } from "@/_types";
import { format } from "date-fns";

type Props = {
  week: Week;
  goalTitle: string;
};

export function WeekDetailCardHeader(prop: Props) {
  const { week, goalTitle } = prop;

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold">Week: {week?.description}</h1>
        <h2 className="text-lg">Belong to the goal: {goalTitle}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-base text-muted-foreground">
          Start Date: {format(week.startDate, "PP")}
        </p>
        <p className="text-base text-muted-foreground">
          End Date: {format(week.endDate, "PP")}
        </p>
      </CardContent>
    </Card>
  );
}
