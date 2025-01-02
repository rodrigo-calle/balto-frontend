import { useCreateDailyObjectives } from "@/_hooks/dailyEntryGoals/useCreateDailyObjectives";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ZodResolver } from "@/_hooks/zod/zodResolver";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  dailyEntryId: string;
};

const newDailyEntryGoalSchema = z.object({
  dailyEntryId: z.string().min(1, { message: "Daily entry is required" }),
  objective: z.string().min(1, { message: "Objective is required" }),
  isCompleted: z.boolean().default(false),
  description: z.string().optional(),
});

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

export default function AddDailyGoalDialog(props: Props) {
  const { dailyEntryId } = props;
  const form = useForm<z.infer<typeof newDailyEntryGoalSchema>>({
    defaultValues: {
      dailyEntryId,
      objective: "",
      isCompleted: false,
      description: "",
    },
    resolver: ZodResolver(newDailyEntryGoalSchema),
  });
  const {
    mutate: createDailyEntryGoal,
    error,
    isError,
  } = useCreateDailyObjectives();

  if (error || isError) {
    return <p>{error?.message}</p>;
  }

  const onSubmit = (data: z.infer<typeof newDailyEntryGoalSchema>) => {
    createDailyEntryGoal({ ...data, description: data.description ?? "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add a Daily Goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Daily Goal</DialogTitle>
          <DialogDescription>
            Add a daily goal to track your progress
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="objective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekle Goal</FormLabel>
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
                    <Input placeholder="Description..." {...field} />
                  </FormControl>
                  <FormDescription>Description for this goal.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
