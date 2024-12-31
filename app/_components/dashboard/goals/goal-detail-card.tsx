import { Card, CardContent, CardHeader } from "@/_components/ui/card";
import { Button } from "@/_components/ui/button";
import { Goal } from "@/_types";
import { format } from "date-fns";

type GoalDetailCardProps = {
  goal: Goal;
};

export default function GoalDetailCard(props: GoalDetailCardProps) {
  const { goal } = props;
  return (
    <Card key={goal.id}>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold">Goal: {goal?.title}</h1>
          <p className="text-lg">{goal?.description}</p>
        </div>
        <Button>Edit</Button>
      </CardHeader>
      <CardContent>
        <p className="text-base text-muted-foreground">
          Start Date: {format(goal.startDate, "PP")}
        </p>
        <p className="text-base text-muted-foreground">
          End Date: {format(goal.endDate, "PP")}
        </p>
      </CardContent>
    </Card>
  );
}
