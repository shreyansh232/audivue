"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/actions/auth-actions";
import { FcGoogle } from "react-icons/fc";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    try {
      if (type === "sign-up") {
        formData.append("name", data.name || "");
        formData.append("email", data.email);
        formData.append("password", data.password);
        await signUp(formData);
        toast.success("User signed up");
        router.push("/sign-in");
      } else {
        formData.append("email", data.email);
        formData.append("password", data.password);
        await signIn(formData);
        toast.success("User signed in");
        router.push("/");
      }
    } catch (error) {
      toast.error("Error occured. Please try again later");
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="mx-auto w-[350px] py-8 lg:max-w-3xl max-w-xl lg:w-[550px] lg:p-10 rounded-3xl bg-white/8 shadow-lg bg-opacity-70 backdrop-filter backdrop-blur-md">
      <div className="flex flex-col gap-3 lg:px-10 px-7 justify-center items-center">
        <div className="flex gap-2 justify-center items-center">
          <Image src={"/audivue-logo.svg"} alt="logo" height={45} width={45} />
          <h2 className="bg-gradient-to-b from-gray-100 via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Audivue AI
          </h2>
        </div>
        <h3 className="text-center">
          {isSignIn ? "Sign In to your account" : "Create a new account"}
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full mt-4"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            {isSignIn ? (
              <Button
                className="w-full py-5 bg-accent hover:bg-orange-400 cursor-pointer"
                type="submit"
              >
                Sign In
              </Button>
            ) : (
              <Button
                className="w-full py-5 bg-accent hover:bg-orange-400 cursor-pointer"
                type="submit"
              >
                Sign Up
              </Button>
            )}
            {isSignIn ? (
              <Button className="w-full py-5 bg-black text-white cursor-pointer hover:bg-black/30">
                Sign In with Google
                <FcGoogle />
              </Button>
            ) : (
              <Button className="w-full py-5 bg-black text-white cursor-pointer hover:bg-black/30">
                Sign Up with Google
                <FcGoogle />
              </Button>
            )}
          </form>
        </Form>
        <p className="text-center lg:text-base text-sm mt-5">
          {isSignIn ? "No account yet?" : "Already have an account?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1 text-accent"
          >
            {!isSignIn ? "Sign In" : "Create an account"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
