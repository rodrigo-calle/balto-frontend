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
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/_store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const loginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: ZodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginUserStore = useAuthStore((state) => state.login);
  const { mutate: loginUser, isError, error } = useLoginUser();

  if (isError) {
    return <p>{error.message}</p>;
  }

  const onSubmit = (credentials: z.infer<typeof loginUserSchema>) => {
    loginUser(credentials, {
      onSuccess: (userData) => {
        loginUserStore(userData);
        form.reset();
        router.push("/dashboard");
      },
      onError: (error: Error) => {
        // TODO: handle error
        console.error("Error logging in user:", error);
      },
    });
  };

  return (
    <Card className="w-[350px] mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-1xl font-bold text-center">
          Login to your Balto account
        </CardTitle>
        <CardDescription>Login with your email and password.</CardDescription>
      </CardHeader>
      <CardContent>
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
                  <FormDescription>your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm">Don&apos;t have an account?</p>
        <Button onClick={() => router.push("/auth/register")} variant="link">
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}
