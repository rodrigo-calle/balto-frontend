import { Week } from "@/_types";
import { format } from "date-fns";

type Props = {
  week: Week;
};

export default function WeekCardHeaderContent(props: Props) {
  const { week } = props;
  return (
    <>
      <h1 className="text-2xl font-bold">{week?.description}</h1>
      <p className="text-sm mt-0 text-muted-foreground">
        Start Date: {format(week.startDate, "PP")}
      </p>
      <p className="text-sm mt-0 text-muted-foreground">
        End Date: {format(week.endDate, "PP")}
      </p>
    </>
  );
}
