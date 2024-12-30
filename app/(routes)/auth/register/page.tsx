"use client";
import { useCreateUser } from "@/_hooks/auth/useCreateUser";
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
import { useAuthStore } from "@/_store";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useValidateToken } from "@/_hooks/auth/useValidateToken";

const newUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export default function Register() {
  const router = useRouter();
  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: ZodResolver(newUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const authLoginStore = useAuthStore((state) => state.logIn);
  const { mutate: createUser, isError, error } = useCreateUser();
  const { isAuthValidated } = useValidateToken();

  if (isAuthValidated) {
    return null;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const onSubmit = (data: z.infer<typeof newUserSchema>) => {
    createUser(data, {
      onSuccess: (d) => {
        authLoginStore(d);
        form.reset();
        router.push("/dashboard");
      },
    });
  };

  return (
    <Card className="w-[350px] mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-1xl font-bold text-center">
          Register a new account in Balto
        </CardTitle>
        <CardDescription>Register a new account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormDescription>Your name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm">Already have an account?</p>
        <Button onClick={() => router.push("/auth/login")} variant="link">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
