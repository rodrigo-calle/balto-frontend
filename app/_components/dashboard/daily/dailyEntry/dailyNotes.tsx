import { Button } from "@/_components/ui/button";
import { Edit, NotebookTabs } from "lucide-react";

type Props = {
  notes: string;
};
export default function DailyNotes(props: Props) {
  const { notes } = props;
  return (
    <div className="flex flex-col mt-3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-2 justify-start items-center">
          <NotebookTabs className="h-5 w-5" />
          <h3 className="font-bold mt-2">My daily notes</h3>
        </div>
        <Button variant="outline" size="icon">
          <Edit />
        </Button>
      </div>
      <p className="capitalize my-2 border p-2">{notes}</p>
    </div>
  );
}
