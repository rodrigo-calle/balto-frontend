import { Button } from "@/_components/ui/button";
import { Checkbox } from "@/_components/ui/checkbox";
import { DailyEntryObjectives } from "@/_types";
import { Edit, Trash } from "lucide-react";

type Props = {
  dailyGoal: DailyEntryObjectives;
};

export default function DailyGoal(props: Props) {
  const { dailyGoal } = props;
  return (
    <div
      key={dailyGoal.id}
      className="flex flex-row items-center justify-between border"
    >
      <div className=" flex items-center space-x-4 rounded-md p-4">
        <Checkbox checked={dailyGoal.isCompleted} onChange={() => {}} />
        <div className="flex flex-col items-start">
          <p>
            <span className="font-bold">Goal:</span> {dailyGoal.objective}
          </p>
          <p>
            <span className="font-bold">Description:</span>{" "}
            {dailyGoal.description}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center mr-2">
        <Button variant="outline" size="icon">
          <Edit />
        </Button>
        <Button variant="outline" size="icon">
          <Trash />
        </Button>
      </div>
    </div>
  );
}
