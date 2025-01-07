"use client";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ZodResolver } from "@/_hooks/zod/zodResolver";
import { useCreateDailyEntry } from "@/_hooks/dailyEntries/useCreateDailyEntry";
import { Card, CardContent, CardHeader } from "@/_components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { format, isSameDay } from "date-fns";
import { Textarea } from "@/_components/ui/textArea";
import { Button } from "@/_components/ui/button";
import { Popover, PopoverTrigger } from "@/_components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "@/_components/ui/calendar";
import { cn } from "@/lib/utils";
import { useGetWeek } from "@/_hooks/weeks/useGetWeek";
import { useEffect, useState } from "react";

const newEntrySchema = z.object({
  weekId: z.string().min(1, { message: "Week is required" }),
  date: z.date(),
  progress: z.enum(["In Progress", "Closed", "Completed"]),
  notes: z.string().min(1, { message: "Notes is required" }),
});

export default function NewDailyEntryPage() {
  const params = useParams();
  const router = useRouter();
  const weekId = typeof params.weekId === "string" ? params.weekId : "";
  const [daysOfWeekToDisable, setDaysOfWeekToDisable] = useState<Date[]>([]);

  const { mutate: createDailyEntry, error, isError } = useCreateDailyEntry();
  const { data: week, isLoading, isError: weekIsError } = useGetWeek(weekId);

  const form = useForm<z.infer<typeof newEntrySchema>>({
    defaultValues: {
      weekId,
      date: new Date(),
      notes: "",
      progress: "In Progress",
    },
    resolver: ZodResolver(newEntrySchema),
  });

  useEffect(() => {
    if (week) {
      const daysAlreadyRegistered = week.DailyEntry.map((daily) => daily.date);

      setDaysOfWeekToDisable(daysAlreadyRegistered);
    }
  }, [week]);

  if (isError && error && isError && weekIsError) {
    return <div>{error.message}</div>;
  }

  if (isLoading || !week) {
    return <div>Loading...</div>;
  }

  const onSubmit = (data: z.infer<typeof newEntrySchema>) => {
    const isDayAlreadyRegistered = daysOfWeekToDisable.some((day) =>
      isSameDay(day, data.date)
    );
    if (isDayAlreadyRegistered) {
      form.setError("date", {
        type: "manual",
        message: "This day is already registered",
      });
      return;
    }
    createDailyEntry(data);
    router.push(`/dashboard/goals/${weekId}/weeks/${data.weekId}`);
  };

  return (
    <div className="flex flex-row justify-center items-center w-full h-full">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Add New Daily Entry</h1>
          <p>Daily Entry for: {format(form.watch("date"), "PP")}</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Goal Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          className="rounded-md bg-popover p-4 border"
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          disabled={{
                            before: week.startDate,
                            after: week.endDate,
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      When will you start this goal?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Save your day notes here..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can use it as a journal (is optional).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
