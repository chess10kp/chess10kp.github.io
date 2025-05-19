"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the form schema with validation rules
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setTimeout(async () => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("access_key", "bb0d6658-d0e2-4b80-93b7-7345582a9b01");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      console.log(response);
      const result = await response.json();

      if (result.success) {
      } else {
        console.error("Submission failed:", result.message);
        // Handle error case
      }
      console.log(result.success);

      setIsSubmitted(true);
    }, 1000);
  }

  if (isSubmitted) {
    return (
      <div className="flex my-16 flex-col items-center justify-center p-6">
        <h4 className="text-lg font-medium mb-2">Message Sent!</h4>
        <p className="text-sm text-center text-zinc-400 mb-4">
          Thanks for reaching out. I'll get back to you as soon as possible.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="my-16">
      <h2 className="mono mb-4 text-2xl">Get in Touch</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-400">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      className="bg-zinc-800/50 border-zinc-700 focus:border-cyan-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-400">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-zinc-800/50 border-zinc-700 focus:border-cyan-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-400">Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What is this regarding?"
                    className="bg-zinc-800/50 border-zinc-700 focus:border-cyan-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-400">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message"
                    className="bg-zinc-800/50 border-zinc-700 focus:border-cyan-500 min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r "
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <SendIcon className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
