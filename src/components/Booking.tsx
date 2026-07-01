"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "Valid phone number required."),
  eventType: z.string({ required_error: "Please select an event type." }),
  guests: z.string().min(1, "Number of guests is required."),
  date: z.string().min(1, "Event date is required."),
  location: z.string().min(5, "Location is required."),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Booking() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      eventType: "",
      guests: "",
      date: "",
      location: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const text = `Booking Enquiry - Yadgaar Caterers

Name: ${data.name}
Phone: ${data.phone}
Event Type: ${data.eventType}
Number of Guests: ${data.guests}
Event Date: ${data.date}
Location: ${data.location}
Message: ${data.message || "N/A"}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919975132722?text=${encodedText}`, '_blank');
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-white" {...field} />
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
                        <Input placeholder="+91 9876543210" className="bg-white" type="tel" {...field} />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        <Input placeholder="E.g. 200" type="number" className="bg-white" {...field} />
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
                        <Input placeholder="Venue name or address" className="bg-white" {...field} />
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
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-xl text-lg h-14 font-medium gap-2"
              >
                <MessageCircle size={24} />
                Send via WhatsApp
              </Button>

            </form>
          </Form>
        </motion.div>

      </div>
    </section>
  );
}