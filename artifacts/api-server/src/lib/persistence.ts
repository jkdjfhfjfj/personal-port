import { db, type CompanySettings } from "@workspace/db";
import {
  bookingStatusSchema,
  bookingsTable,
  faqsTable,
  foundersTable,
  messagesTable,
  projectsTable,
  servicesTable,
  settingsTable,
  testimonialsTable,
} from "@workspace/db";
import { desc, eq, sql } from "drizzle-orm";

export type Resource =
  | "services"
  | "projects"
  | "founders"
  | "testimonials"
  | "faqs";

type RecordWithId = Record<string, unknown> & { id: number };
type InputRecord = Record<string, unknown>;

const defaultSettings: Omit<CompanySettings, "id" | "updatedAt"> = {
  company: "GreenPay Enterprises",
  tagline: "Digital systems that move business forward.",
  email: "hello@greenpay.co.ke",
  phone: "+254 700 123 456",
  whatsapp: "+254 700 123 456",
  location: "Nairobi, Kenya",
  hours: "Mon–Fri, 8:00am–5:30pm",
};

const fallbackResources: Record<Resource, RecordWithId[]> = {
  services: [
    { id: 1, icon: "code", title: "Websites & web apps", text: "Conversion-focused websites and powerful web apps built around how your business works.", tag: "Build", visible: true },
    { id: 2, icon: "chart", title: "Mobile & custom software", text: "Android apps and custom tools that keep your team productive wherever work happens.", tag: "Build", visible: true },
    { id: 3, icon: "sparkle", title: "Payments & integrations", text: "M-Pesa, APIs, WhatsApp, SMS and the connections that make every process flow.", tag: "Connect", visible: true },
    { id: 4, icon: "users", title: "Growth & brand systems", text: "UI/UX, branding, SEO and digital marketing that help the right customers find you.", tag: "Grow", visible: true },
    { id: 5, icon: "lock", title: "Hosting & business email", text: "Reliable hosting, domains and professional email configured for your business.", tag: "Run", visible: true },
    { id: 6, icon: "phone", title: "IT support & consulting", text: "Practical technology guidance and responsive support when your business needs it.", tag: "Support", visible: true },
  ],
  projects: [
    { id: 1, category: "Web & app", title: "Kijani Market", text: "A fresh e-commerce experience that makes local shopping simple, fast and delightful.", image: "", accent: "lime", features: ["Online store", "M-Pesa checkout", "Order dashboard"], visible: true },
    { id: 2, category: "Custom software", title: "Mwangaza Schools", text: "A connected school management platform built to save administrators hours every week.", image: "", accent: "navy", features: ["Student records", "SMS notifications", "Reports"], visible: true },
    { id: 3, category: "Brand & growth", title: "Safi Spaces", text: "A confident new identity and digital home for a modern property management company.", image: "", accent: "peach", features: ["Brand identity", "Website", "SEO foundation"], visible: true },
    { id: 4, category: "Integrations", title: "Kopa Finance", text: "A streamlined customer journey connecting enquiries, payment and follow-up.", image: "", accent: "blue", features: ["API integration", "WhatsApp flow", "Admin tools"], visible: true },
  ],
  founders: [
    { id: 1, name: "Brian Kasomo", role: "Founder & Technology Lead", bio: "Turns complex business needs into focused, useful digital systems.", initials: "BK", color: "green", visible: true },
    { id: 2, name: "Amina Wanjiku", role: "Design & Growth Partner", bio: "Connects sharp brand thinking with experiences customers enjoy using.", initials: "AW", color: "peach", visible: true },
  ],
  testimonials: [
    { id: 1, quote: "GreenPay took our idea from a sketch to a working product we could confidently show customers. They understood the business, not just the brief.", name: "Amina W.", role: "Founder, Kijani Market", initials: "AW", visible: true },
    { id: 2, quote: "The difference is how practical the team is. We now spend less time fixing disconnected tools and more time serving our customers.", name: "Brian K.", role: "Operations Lead, Mwangaza", initials: "BK", visible: true },
  ],
  faqs: [
    { id: 1, question: "How long does a typical project take?", answer: "Most focused website projects take 3–6 weeks. We will give you a clearer timeline after understanding your scope.", visible: true },
    { id: 2, question: "Can you work with our existing systems?", answer: "Yes. We can connect the tools you already use or recommend a clean path forward where something is holding you back.", visible: true },
    { id: 3, question: "Do you support projects after launch?", answer: "Yes. We offer practical support, maintenance and ongoing improvement packages for teams that want a long-term technology partner.", visible: true },
  ],
};

const fallbackBookings: RecordWithId[] = [];
const fallbackMessages: RecordWithId[] = [];

const resourceTables = {
  services: servicesTable,
  projects: projectsTable,
  founders: foundersTable,
  testimonials: testimonialsTable,
  faqs: faqsTable,
} as const;

function database(): any {
  if (!db) {
    throw new Error("DATABASE_URL is required for database-backed persistence.");
  }
  return db;
}

export function hasDatabase() {
  return Boolean(db);
}

function bodyString(input: InputRecord, key: string, fallback = "") {
  return String(input[key] ?? fallback);
}

function bodyBoolean(input: InputRecord, key: string, fallback = true) {
  return input[key] === undefined ? fallback : input[key] !== false;
}

function bodyStringArray(input: InputRecord, key: string) {
  return Array.isArray(input[key])
    ? input[key].map((value) => String(value))
    : [];
}

function normalizeResourceInput(resource: Resource, input: InputRecord, partial = false): InputRecord {
  const value: InputRecord = {};
  const addString = (key: string, fallback?: string) => {
    if (!partial || key in input) value[key] = bodyString(input, key, fallback);
  };
  const addBoolean = (key: string) => {
    if (!partial || key in input) value[key] = bodyBoolean(input, key);
  };

  if (resource === "services") {
    addString("icon", "sparkle");
    addString("title");
    addString("text");
    addString("tag");
    addBoolean("visible");
  } else if (resource === "projects") {
    addString("category");
    addString("title");
    addString("text");
    addString("image");
    addString("accent", "green");
    if (!partial || "features" in input) value.features = bodyStringArray(input, "features");
    addBoolean("visible");
  } else if (resource === "founders") {
    addString("name");
    addString("role");
    addString("bio");
    addString("initials");
    addString("color", "green");
    addBoolean("visible");
  } else if (resource === "testimonials") {
    addString("quote");
    addString("name");
    addString("role");
    addString("initials");
    addBoolean("visible");
  } else {
    addString("question");
    addString("answer");
    addBoolean("visible");
  }

  return value;
}

function publicSettings(value: InputRecord) {
  return {
    company: bodyString(value, "company"),
    tagline: bodyString(value, "tagline"),
    email: bodyString(value, "email"),
    phone: bodyString(value, "phone"),
    whatsapp: bodyString(value, "whatsapp"),
    location: bodyString(value, "location"),
    hours: bodyString(value, "hours"),
  };
}

export async function initializeDatabase() {
  if (!db) return;

  await database().execute(sql`select 1`);

  const existingSettings = await database()
    .select({ id: settingsTable.id })
    .from(settingsTable)
    .limit(1);
  if (!existingSettings.length) {
    await database().insert(settingsTable).values(defaultSettings);
  }

  for (const resource of Object.keys(resourceTables) as Resource[]) {
    const table = resourceTables[resource] as any;
    const existing = await database().select({ id: table.id }).from(table).limit(1);
    if (!existing.length) {
      const seedRows = fallbackResources[resource].map(({ id: _id, ...row }) => row);
      await database().insert(table).values(seedRows);
    }
  }
}

export async function getBootstrap() {
  if (!db) {
    return {
      settings: { ...defaultSettings },
      ...fallbackResources,
    };
  }

  const [settingsRows, services, projects, founders, testimonials, faqs] =
    await Promise.all([
      database().select().from(settingsTable).limit(1),
      listResource("services"),
      listResource("projects"),
      listResource("founders"),
      listResource("testimonials"),
      listResource("faqs"),
    ]);

  return {
    settings: publicSettings(settingsRows[0] ?? defaultSettings),
    services,
    projects,
    founders,
    testimonials,
    faqs,
  };
}

export async function getSettings() {
  if (!db) return { ...defaultSettings };
  const rows = await database().select().from(settingsTable).limit(1);
  return publicSettings(rows[0] ?? defaultSettings);
}

export async function updateSettings(input: InputRecord) {
  if (!db) {
    Object.assign(defaultSettings, input);
    return { ...defaultSettings };
  }

  const current = await database().select().from(settingsTable).limit(1);
  const values = publicSettings({ ...(current[0] ?? defaultSettings), ...input });
  if (!current.length) {
    await database().insert(settingsTable).values(values);
  } else {
    await database()
      .update(settingsTable)
      .set(values)
      .where(eq(settingsTable.id, current[0].id));
  }
  return values;
}

export async function listResource(resource: Resource): Promise<RecordWithId[]> {
  if (!db) return fallbackResources[resource];
  return database().select().from(resourceTables[resource] as any);
}

export async function createResource(resource: Resource, input: InputRecord) {
  if (!db) {
    const item = {
      ...normalizeResourceInput(resource, input),
      id: Math.max(0, ...fallbackResources[resource].map((entry) => entry.id)) + 1,
    };
    fallbackResources[resource].push(item);
    return item;
  }

  const [item] = await database()
    .insert(resourceTables[resource] as any)
    .values(normalizeResourceInput(resource, input))
    .returning();
  return item;
}

export async function updateResource(resource: Resource, id: number, input: InputRecord) {
  if (!db) {
    const item = fallbackResources[resource].find((entry) => entry.id === id);
    if (!item) return null;
    Object.assign(item, normalizeResourceInput(resource, input, true));
    return item;
  }

  const [item] = await database()
    .update(resourceTables[resource] as any)
    .set(normalizeResourceInput(resource, input, true))
    .where(eq((resourceTables[resource] as any).id, id))
    .returning();
  return item ?? null;
}

export async function deleteResource(resource: Resource, id: number) {
  if (!db) {
    const items = fallbackResources[resource];
    const index = items.findIndex((entry) => entry.id === id);
    if (index === -1) return false;
    items.splice(index, 1);
    return true;
  }

  const deleted = await database()
    .delete(resourceTables[resource] as any)
    .where(eq((resourceTables[resource] as any).id, id))
    .returning({ id: (resourceTables[resource] as any).id });
  return deleted.length > 0;
}

export async function listBookings(): Promise<RecordWithId[]> {
  if (!db) return [...fallbackBookings].reverse();
  return database().select().from(bookingsTable).orderBy(desc(bookingsTable.createdAt));
}

export async function createBooking(input: InputRecord) {
  const booking = {
    reference: `GP-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}`,
    name: bodyString(input, "name"),
    business: bodyString(input, "business"),
    email: bodyString(input, "email"),
    phone: bodyString(input, "phone"),
    service: bodyString(input, "service"),
    budget: bodyString(input, "budget"),
    preferredDate: input.preferredDate == null ? null : bodyString(input, "preferredDate"),
    description: bodyString(input, "description"),
    contactPreference: bodyString(input, "contactPreference", "Email"),
    status: "New",
  };

  if (!db) {
    const saved = {
      ...booking,
      id: Math.max(0, ...fallbackBookings.map((entry) => entry.id)) + 1,
      createdAt: new Date().toISOString(),
    };
    fallbackBookings.push(saved);
    return saved;
  }

  const [saved] = await database().insert(bookingsTable).values(booking).returning();
  return saved;
}

export async function updateBooking(id: number, input: InputRecord) {
  const status = bookingStatusSchema.safeParse(input.status);
  if (!status.success) return null;

  if (!db) {
    const booking = fallbackBookings.find((entry) => entry.id === id);
    if (!booking) return null;
    booking.status = status.data;
    return booking;
  }

  const [booking] = await database()
    .update(bookingsTable)
    .set({ status: status.data })
    .where(eq(bookingsTable.id, id))
    .returning();
  return booking ?? null;
}

export async function listMessages(): Promise<RecordWithId[]> {
  if (!db) return [...fallbackMessages].reverse();
  return database().select().from(messagesTable).orderBy(desc(messagesTable.createdAt));
}

export async function createMessage(input: InputRecord) {
  const message = {
    name: bodyString(input, "name"),
    email: bodyString(input, "email"),
    topic: bodyString(input, "topic"),
    message: bodyString(input, "message"),
  };

  if (!db) {
    const saved = {
      ...message,
      id: Math.max(0, ...fallbackMessages.map((entry) => entry.id)) + 1,
      createdAt: new Date().toISOString(),
    };
    fallbackMessages.push(saved);
    return saved;
  }

  const [saved] = await database().insert(messagesTable).values(message).returning();
  return saved;
}

export async function getDashboardSummary() {
  const [services, projects, founders, bookings, messages, testimonials, faqs] =
    await Promise.all([
      listResource("services"),
      listResource("projects"),
      listResource("founders"),
      listBookings(),
      listMessages(),
      listResource("testimonials"),
      listResource("faqs"),
    ]);

  return {
    services: services.filter((item) => item.visible !== false).length,
    projects: projects.filter((item) => item.visible !== false).length,
    founders: founders.filter((item) => item.visible !== false).length,
    bookings: bookings.length,
    messages: messages.length,
    testimonials: testimonials.filter((item) => item.visible !== false).length,
    faqs: faqs.filter((item) => item.visible !== false).length,
    recentBookings: bookings.slice(0, 5),
  };
}