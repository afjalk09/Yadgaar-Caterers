"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TurnstileField from "@/components/TurnstileField";
import {
  Form,
  FormControl,
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
import { trackEvent } from "@/lib/analytics";
import { enquirySchema, type EnquiryValues } from "@/lib/enquiry";

const defaultValues: EnquiryValues = {
  name: "",
  phone: "",
  eventType: "",
  guests: "",
  date: "",
  location: "",
  message: "",
  website: "",
  turnstileToken: "",
};

export default function Booking() {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues,
    mode: "onBlur",
  });

  const setTurnstileToken = useCallback(
    (token: string) => form.setValue("turnstileToken", token, { shouldValidate: false }),
    [form],
  );

  const onSubmit = async (data: EnquiryValues) => {
    if (submitting) return;
    setSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: unknown = await response.json();

      if (
        !response.ok ||
        !result ||
        typeof result !== "object" ||
        (result as { success?: boolean }).success !== true ||
        typeof (result as { data?: { whatsappUrl?: unknown } }).data?.whatsappUrl !== "string"
      ) {
        const message =
          result && typeof result === "object" && typeof (result as { message?: unknown }).message === "string"
            ? (result as { message: string }).message
            : "Something went wrong. Please try again or call us directly.";
        setErrorMessage(message);
        return;
      }

      const whatsappUrl = (result as { data: { whatsappUrl: string } }).data.whatsappUrl;
      trackEvent("form_submit", { form_name: "booking_enquiry" });
      setSuccessMessage("Your enquiry is ready in WhatsApp. Please send the prefilled message there to complete it.");
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      form.reset(defaultValues);
    } catch {
      setErrorMessage("Unable to reach the server. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Plan Your Event</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Book Your Catering</h3>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
          <p className="mt-6 text-muted-foreground">
            Fill out the form below to share your requirements, and we will get back to you promptly to discuss how we can make your event memorable.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-background rounded-3xl p-8 md:p-10 shadow-xl border border-border"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="enquiry-website">Leave this field empty</label>
                <input
                  id="enquiry-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...form.register("website")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-white" autoComplete="name" maxLength={80} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 9876543210" className="bg-white" type="tel" autoComplete="tel" maxLength={20} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Event Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Wedding">Wedding</SelectItem>
                          <SelectItem value="Birthday">Birthday</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="Family Function">Family Function</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Number of Guests</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g. 200" type="number" inputMode="numeric" min={1} max={999999} className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Event Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Event Location / Venue</FormLabel>
                      <FormControl>
                        <Input placeholder="Venue name or address" className="bg-white" maxLength={200} autoComplete="off" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Additional Requirements (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about specific menu items, dietary requirements, or theme details..."
                        className="bg-white resize-none h-32"
                        maxLength={1000}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <TurnstileField onToken={setTurnstileToken} />

              {errorMessage && (
                <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                  {errorMessage}
                </p>
              )}
              {successMessage && (
                <p role="status" className="flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {successMessage}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-xl text-lg h-14 font-medium gap-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageCircle size={24} aria-hidden="true" />
                    Send via WhatsApp
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                This opens WhatsApp with your details prefilled. You choose whether to send the message.
              </p>

            </form>
          </Form>
        </motion.div>

      </div>
    </section>
  );
}
