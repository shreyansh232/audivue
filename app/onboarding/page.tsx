"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { experience, mockGoals, techRoles } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // Ensure you have this utility for className merging

const formSchema = z.object({
  jobrole: z.string().min(2, { message: "Job role is required." }),
  experience: z.string().min(2, { message: "Experience is required." }),
  jobdescription: z.string().optional(),
  resume: z.any().refine((file) => file instanceof File || file === undefined, {
    message: "Resume must be a file.",
  }),
  goal: z.string().min(2, { message: "Goal is required." }),
});

type FormData = z.infer<typeof formSchema>;

function getBorderColor(hasError: boolean) {
  return hasError ? "border-red-500 focus-visible:ring-red-500" : "";
}

function Page() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobrole: "",
      experience: "",
      jobdescription: "",
      resume: undefined,
    },
  });

  const [jdOpen, setJdOpen] = useState(false);
  const goal = form.watch("goal");

  useEffect(() => {
    if (goal === "specific_company") {
      setJdOpen(true);
    } else {
      setJdOpen(false);
    }
  }, [goal]);

  function onSubmit(values: FormData) {
    console.log("Form submitted:", values);
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-3xl bg-white/8 shadow-lg lg:w-[550px] bg-opacity-70 backdrop-filter backdrop-blur-md px-6 py-8 rounded-3xl w-[350px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-base"
          >
            <FormField
              control={form.control}
              name="jobrole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Job Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          getBorderColor(!!form.formState.errors.jobrole),
                        )}
                      >
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {techRoles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Experience</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          getBorderColor(!!form.formState.errors.experience),
                        )}
                      >
                        <SelectValue placeholder="Select your experience" />
                      </SelectTrigger>
                      <SelectContent>
                        {experience.map((ex) => (
                          <SelectItem key={ex.value} value={ex.value}>
                            {ex.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Mock Interview Goal</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full",
                          getBorderColor(!!form.formState.errors.goal),
                        )}
                      >
                        <SelectValue placeholder="Select your goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockGoals.map((g) => (
                          <SelectItem key={g.value} value={g.value}>
                            {g.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {jdOpen && (
              <FormField
                control={form.control}
                name="jobdescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter the job description here..."
                        className={getBorderColor(
                          !!form.formState.errors.jobdescription,
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Upload Resume</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      className={getBorderColor(!!form.formState.errors.resume)}
                    />
                  </FormControl>
                  <FormDescription>PDF or DOC format preferred</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-accent cursor-pointer hover:bg-orange-400 w-full"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Page;
