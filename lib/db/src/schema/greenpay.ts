import { createInsertSchema } from "drizzle-zod";
import { boolean, date, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const servicesTable = pgTable("greenpay_services", {
  id: serial("id").primaryKey(),
  icon: text("icon").notNull().default("sparkle"),
  title: text("title").notNull(),
  text: text("text").notNull(),
  tag: text("tag").notNull(),
  visible: boolean("visible").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const projectsTable = pgTable("greenpay_projects", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  text: text("text").notNull(),
  image: text("image").notNull().default(""),
  accent: text("accent").notNull().default("green"),
  features: text("features").array().notNull().default([]),
  visible: boolean("visible").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const foundersTable = pgTable("greenpay_founders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  initials: text("initials").notNull(),
  color: text("color").notNull().default("green"),
  visible: boolean("visible").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const testimonialsTable = pgTable("greenpay_testimonials", {
  id: serial("id").primaryKey(),
  quote: text("quote").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  initials: text("initials").notNull(),
  visible: boolean("visible").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const faqsTable = pgTable("greenpay_faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  visible: boolean("visible").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const bookingsTable = pgTable("greenpay_bookings", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  name: text("name").notNull(),
  business: text("business").notNull().default(""),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  budget: text("budget").notNull().default(""),
  preferredDate: date("preferred_date", { mode: "string" }),
  description: text("description").notNull(),
  contactPreference: text("contact_preference").notNull().default("WhatsApp"),
  attachmentPath: text("attachment_path"),
  status: text("status").notNull().default("New"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const messagesTable = pgTable("greenpay_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  topic: text("topic").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const settingsTable = pgTable("greenpay_settings", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  tagline: text("tagline").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  whatsapp: text("whatsapp").notNull(),
  location: text("location").notNull(),
  hours: text("hours").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertServiceSchema = createInsertSchema(servicesTable).omit({ id: true, createdAt: true });
export const insertProjectSchema = createInsertSchema(projectsTable).omit({ id: true, createdAt: true });
export const insertFounderSchema = createInsertSchema(foundersTable).omit({ id: true, createdAt: true });
export const insertTestimonialSchema = createInsertSchema(testimonialsTable).omit({ id: true, createdAt: true });
export const insertFaqSchema = createInsertSchema(faqsTable).omit({ id: true, createdAt: true });
export const insertBookingSchema = createInsertSchema(bookingsTable).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messagesTable).omit({ id: true, createdAt: true });
export const insertSettingsSchema = createInsertSchema(settingsTable).omit({ id: true, updatedAt: true });

export type Service = typeof servicesTable.$inferSelect;
export type Project = typeof projectsTable.$inferSelect;
export type Founder = typeof foundersTable.$inferSelect;
export type Testimonial = typeof testimonialsTable.$inferSelect;
export type Faq = typeof faqsTable.$inferSelect;
export type Booking = typeof bookingsTable.$inferSelect;
export type Message = typeof messagesTable.$inferSelect;
export type CompanySettings = typeof settingsTable.$inferSelect;

export const bookingStatusSchema = z.enum(["New", "Contacted", "Quoted", "In Progress", "Completed", "Cancelled"]);