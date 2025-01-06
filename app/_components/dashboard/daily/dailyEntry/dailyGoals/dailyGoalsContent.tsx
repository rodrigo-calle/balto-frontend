import { DailyEntry } from "@/_types";
import DailyGoalsContentHeader from "./dailyGoalsContentHeader";
import DailyGoal from "./dailyGoal";

type Props = {
  daily: DailyEntry;
  setOpenDialog: (isOpen: boolean) => void;
  isOpen: boolean;
};

export default function DailyGoalsContent(props: Props) {
  const { daily, setOpenDialog, isOpen } = props;
  return (
    <>
      <DailyGoalsContentHeader
        dailyEntryId={daily.id}
        isOpen={isOpen}
        setOpenDialog={setOpenDialog}
      />
      <div className="flex flex-col gap-2">
        {daily.DailyEntryObjectives.length === 0 && (
          <p>No Daily Goals Registered</p>
        )}
        {daily.DailyEntryObjectives.map((dailyGoal, index) => (
          <DailyGoal key={index} dailyGoal={dailyGoal} />
        ))}
      </div>
    </>
  );
}
