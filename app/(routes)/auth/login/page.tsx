"use client";
import { useLoginUser } from "@/_hooks/auth/useLoginUser";
import { ZodResolver } from "@/_hooks/zod/zodResolver";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { Button } from "@/_components/ui/button";

const loginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: ZodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginUser, isError, error } = useLoginUser();

  if (isError) {
    return <p>{error.message}</p>;
  }

  const onSubmit = (data: z.infer<typeof loginUserSchema>) => {
    console.log({ data });
    loginUser(data, {
      onSuccess: () => {
        form.reset();
        alert("User logged in successfully");
      },
      onError: (error: Error) => {
        // TODO: handle error
        console.error("Error logging in user:", error);
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-3/6 mx-auto">
      <h1 className="text-2xl font-bold">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>your email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormDescription>
                  your password, must be at least 6 characters
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
