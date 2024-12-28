"use client";
import { useCreateGoal } from "@/_hooks/goals/useCreateGoal";
import { ZodResolver } from "@/_hooks/zod/zodResolver";
import { z } from "zod";
import { addMonths, format } from "date-fns";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { Button } from "@/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/_components/ui/calendar";

const newGoalSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  startDate: z.date(),
  endDate: z.date(),
});

export default function NewGoal() {
  const form = useForm<z.infer<typeof newGoalSchema>>({
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: addMonths(new Date(), 3),
    },
    resolver: ZodResolver(newGoalSchema),
  });

  const { mutate: createGoal, isError, error } = useCreateGoal();

  if (isError) {
    return <p>{error.message}</p>;
  }

  const onSubmit = (data: z.infer<typeof newGoalSchema>) => {
    console.log({ data });
    createGoal(data, {
      onSuccess: () => {
        form.reset();
        alert("Goal created successfully");
      },
    });
  };
  return (
    <div className="flex flex-col gap-4 w-3/6 mx-auto">
      <h1 className="text-2xl font-bold">New Goal</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Goal Name..." {...field} />
                </FormControl>
                <FormDescription>Name for this goal.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Goal description..." {...field} />
                </FormControl>
                <FormDescription>Description for this goal.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
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
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        form.setValue("endDate", addMonths(date!, 3));
                      }}
                      disabled={(date) => date < new Date()}
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
            name="endDate"
            disabled
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Goal Final Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        disabled
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
                      mode="single"
                      selected={field.value}
                      disabled={true}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the final date for this goal. You can&apos;t change
                  this. Lets go for 3 months!.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
