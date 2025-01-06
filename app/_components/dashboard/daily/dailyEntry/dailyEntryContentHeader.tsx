import { Button } from "@/_components/ui/button";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

type Props = {
  dailyDate: Date;
};

export default function DailyEntryContentHeader(props: Props) {
  const { dailyDate } = props;
  return (
    <div className="flex flex-row items-center justify-between mb-3">
      <p className="font-bold text-lg">Date {format(dailyDate, "PP")}</p>
      <div>
        <Button variant="outline" size="icon">
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
