"use client";
import { Button } from "@/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/_components/ui/card";
import { Separator } from "@/_components/ui/separator";
import { Week } from "@/_types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DailyEntryContent from "../daily/dailyEntry/dailyEntryContent";

type Props = {
  week: Week;
  refetch: () => void;
};
export default function WeekDetailDailyEntries(props: Props) {
  const { week, refetch } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const [isCurrentDateAvailable, setIsCurrentDateAvailable] = useState(false);
  useEffect(() => {
    const today = new Date();
    const isAvailable = week?.DailyEntry?.some(
      (daily) => format(daily.date, "PP") === format(today, "PP")
    );
    setIsCurrentDateAvailable(!isAvailable);
  }, [week.DailyEntry]);

  // TODO: Fix reftech
  useEffect(() => {
    refetch();
    console.log("test");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDialog]);

  return (
    <Card>
      <CardHeader>
        <h1 className="text-3xl font-bold">Daily Entries</h1>
      </CardHeader>
      <Separator className="w-10/12 mx-auto" />
      <CardContent>
        {week.DailyEntry.length === 0 && <p>No Daily Entries Registered</p>}
        <div className="flex-col gap-4 flex">
          {week.DailyEntry.map((daily) => (
            <DailyEntryContent
              key={daily.id}
              dailyEntry={daily}
              isOpen={openDialog}
              setOpenDialog={setOpenDialog}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col items-start justify-between">
          <Button
            onClick={() =>
              router.push(
                `/dashboard/goals/${week.goalId}/weeks/${week.id}/daily/new`
              )
            }
          >
            Register your daily entry
          </Button>
          {!isCurrentDateAvailable && (
            <p className="text-red-500 text-sm">Already registered for today</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
