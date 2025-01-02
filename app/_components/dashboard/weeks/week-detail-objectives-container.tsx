import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Week } from "@/_types";
import WeekleGoalDialogForm from "./dialogForms/addWeekleGoalDialog";
import { Goal } from "lucide-react";
import AddDailyGoalDialog from "../daily/dialogForm/addDailyGoalDialog";

type Props = {
  week: Week;
};

export default function WeekDetailCardObjectives(props: Props) {
  const { week } = props;
  return (
    <Card>
      <CardHeader>
        <h1 className="text-3xl font-bold">Week Goals</h1>
      </CardHeader>
      <CardContent>
        {week.WeeklyObjectives.length === 0 && <p>No Objectives</p>}
        <ul>
          {week.WeeklyObjectives.map((objective) => (
            <div
              key={objective.id}
              className="flex flex-row justify-start gap-2 items-center"
            >
              <Goal className="h-4 w-4" />{" "}
              <li className="my-2 first-letter:uppercase">
                {objective.objective}
              </li>
              <AddDailyGoalDialog dailyEntryId={week.id} />
            </div>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <WeekleGoalDialogForm weekId={week.id} />
      </CardFooter>
    </Card>
  );
}
