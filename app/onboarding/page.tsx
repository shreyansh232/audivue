"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { experience, mockGoals, techRoles } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { FileUpload } from "@/components/ui/file-upload";

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

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      form.setValue("resume", files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 mb-20">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white/8 shadow-lg bg-opacity-70 backdrop-filter backdrop-blur-md px-6 sm:px-10 md:px-16 lg:px-20 py-8 sm:py-12 lg:py-10 rounded-2xl sm:rounded-3xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6 text-sm sm:text-base"
          >
            <FormField
              control={form.control}
              name="jobrole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg sm:text-xl">Job Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full p-3 sm:p-4 lg:p-6 h-12 sm:h-14",
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
                  <FormLabel className="text-lg sm:text-xl">
                    Experience
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full p-3 sm:p-4 lg:p-6 h-12 sm:h-14",
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
                  <FormLabel className="text-lg sm:text-xl">
                    Mock Interview Goal
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full p-3 sm:p-4 lg:p-6 h-12 sm:h-14",
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
                    <FormLabel className="text-lg sm:text-xl">
                      Job Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter the job description here..."
                        className={cn(
                          "min-h-[100px] sm:min-h-[120px] p-3 sm:p-4 resize-y",
                          getBorderColor(
                            !!form.formState.errors.jobdescription,
                          ),
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
              render={() => (
                <FormItem>
                  <FormLabel className="text-lg sm:text-xl">
                    Upload Resume
                  </FormLabel>
                  <FormControl>
                    <div
                      className={cn(
                        "w-full",
                        getBorderColor(!!form.formState.errors.resume),
                      )}
                    >
                      <FileUpload onChange={handleFileUpload} />
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs sm:text-sm mt-2">
                    PDF or DOC format preferred
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-accent cursor-pointer hover:bg-orange-400 w-full text-base sm:text-lg h-12 sm:h-14 mt-6 sm:mt-8 transition-colors duration-200"
            >
              Start Mock Interview
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Page;
