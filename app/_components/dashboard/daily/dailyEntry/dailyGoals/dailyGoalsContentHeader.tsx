import { Goal } from "lucide-react";
import AddDailyGoalDialog from "../../dialogForm/addDailyGoalDialog";

type Props = {
  dailyEntryId: string;
  isOpen: boolean;
  setOpenDialog: (isOpen: boolean) => void;
};
export default function DailyGoalsContentHeader(props: Props) {
  const { dailyEntryId, isOpen, setOpenDialog } = props;
  return (
    <div className="flex flex-row items-center justify-between my-2 py-2">
      <div className="font-bold mt-2 flex flex-row gap-2 justify-start items-center">
        <Goal className="h-5 w-5" /> <p>Daily Goals:</p>
      </div>
      <AddDailyGoalDialog
        dailyEntryId={dailyEntryId}
        isOpen={isOpen}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
}
