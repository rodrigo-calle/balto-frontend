import { Separator } from "@/_components/ui/separator";
import { DailyEntry } from "@/_types";
import DailyNotes from "./dailyNotes";
import DailyEntryContentHeader from "./dailyEntryContentHeader";
import DailyGoalsContent from "./dailyGoals/dailyGoalsContent";

type Props = {
  dailyEntry: DailyEntry;
  isOpen: boolean;
  setOpenDialog: (isOpen: boolean) => void;
};

export default function DailyEntryContent(props: Props) {
  const { dailyEntry: daily, isOpen, setOpenDialog } = props;

  return (
    <div key={daily.id} className="rounded-md border-4 p-4 flex flex-col">
      <DailyEntryContentHeader dailyDate={daily.date} />
      <Separator />
      <DailyNotes notes={daily.notes} />
      <Separator />
      <DailyGoalsContent
        daily={daily}
        isOpen={isOpen}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
}
