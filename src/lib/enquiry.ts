import { z } from "zod";
import { siteConfig } from "@/lib/site";

const eventTypes = ["Wedding", "Birthday", "Corporate", "Family Function", "Other"] as const;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be 80 characters or fewer."),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number.")
    .max(20, "Enter a valid phone number.")
    .regex(/^\+?[\d\s()-]+$/, "Use digits, spaces, + or - only.")
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    }, "Enter a valid phone number."),
  eventType: z
    .string()
    .min(1, "Please select an event type.")
    .refine((value) => eventTypes.includes(value as (typeof eventTypes)[number]), "Please select an event type."),
  guests: z
    .string()
    .trim()
    .regex(/^\d{1,6}$/, "Enter the number of guests.")
    .refine((value) => Number(value) > 0, "Enter at least one guest."),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Select an event date.")
    .refine((value) => {
      const parsed = new Date(`${value}T00:00:00`);
      if (Number.isNaN(parsed.getTime())) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return parsed.getTime() >= today.getTime();
    }, "Select today or a future date."),
  location: z
    .string()
    .trim()
    .min(5, "Location is required.")
    .max(200, "Location must be 200 characters or fewer."),
  message: z.string().trim().max(1000, "Message must be 1000 characters or fewer.").optional().default(""),
  website: z.string().max(0, "Invalid submission.").optional().default(""),
  turnstileToken: z.string().max(2048).optional().default(""),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;

export function buildWhatsAppUrl(values: EnquiryValues) {
  const message = [
    "Booking Enquiry - Yadgaar Caterers",
    "",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Event Type: ${values.eventType}`,
    `Number of Guests: ${values.guests}`,
    `Event Date: ${values.date}`,
    `Location: ${values.location}`,
    `Message: ${values.message || "N/A"}`,
  ].join("\n");

  return `${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
