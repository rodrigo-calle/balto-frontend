import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ZodResolver } from "@/_hooks/zod/zodResolver";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { useCreateWeekleObjective } from "@/_hooks/weekleObjectives/useCreateWeekleObjective";

type Props = {
  weekId: string;
};

const newWeekleGoalSchema = z.object({
  weekId: z.string().min(1, { message: "Week is required" }),
  objective: z.string().min(1, { message: "Objective is required" }),
});

export default function WeekleGoalDialogForm(props: Props) {
  const { weekId } = props;
  const form = useForm<z.infer<typeof newWeekleGoalSchema>>({
    defaultValues: {
      weekId: weekId,
      objective: "",
    },
    resolver: ZodResolver(newWeekleGoalSchema),
  });

  const {
    mutate: createWeekleObjective,
    error,
    isError,
    isPending,
  } = useCreateWeekleObjective();

  const onSubmit = (data: z.infer<typeof newWeekleGoalSchema>) => {
    createWeekleObjective(data);
    form.reset();
    window.location.reload();
  };

  if (error || isError) {
    return <p>{error?.message}</p>;
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Weekle Goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add weekle goal</DialogTitle>
          <DialogDescription>
            Add a new weekle goal to your week, you can add multiple goals
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
