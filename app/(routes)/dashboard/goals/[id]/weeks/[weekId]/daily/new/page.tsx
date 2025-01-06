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
import { format } from "date-fns";
import { Textarea } from "@/_components/ui/textArea";
import { Button } from "@/_components/ui/button";

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

  const { mutate: createDailyEntry, error, isError } = useCreateDailyEntry();

  const form = useForm<z.infer<typeof newEntrySchema>>({
    defaultValues: {
      weekId,
      date: new Date(),
      notes: "",
      progress: "In Progress",
    },
    resolver: ZodResolver(newEntrySchema),
  });

  if (isError && error) {
    return <div>{error.message}</div>;
  }

  const onSubmit = (data: z.infer<typeof newEntrySchema>) => {
    createDailyEntry(data);
    router.push(`/dashboard/goals/${weekId}/weeks/${data.weekId}`);
  };

  return (
    <div className="flex flex-row justify-center items-center w-full h-full">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Add New Daily Entry</h1>
          <p>Daily Entry for: {format(new Date(), "PP")}</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      You can use it as a journal.
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
