import { Button } from "@/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/_components/ui/card";
import { Week } from "@/_types";
import { format } from "date-fns";

type WeekCardProps = {
  week: Week;
};

export default function WeekCard(props: WeekCardProps) {
  const { week } = props;
  return (
    <Card className="w-72 h-72">
      <CardHeader>
        <h1 className="text-2xl font-bold">{week?.description}</h1>
        <p className="text-sm mt-0 text-muted-foreground">
          Start Date: {format(week.startDate, "PP")}
        </p>
        <p className="text-sm mt-0 text-muted-foreground">
          End Date: {format(week.endDate, "PP")}
        </p>
      </CardHeader>
      <CardContent>
        {week.WeeklyObjectives.length > 0 ? (
          week.WeeklyObjectives.map((objective) => (
            <p key={objective.id}>{objective.objective}</p>
          ))
        ) : (
          <p>No Objectives</p>
        )}
      </CardContent>
      <CardFooter>
        <Button>View</Button>
      </CardFooter>
    </Card>
  );
}
