import { Router, type IRouter } from "express";

type RecordWithId = Record<string, unknown> & { id: number };
type Resource = "services" | "projects" | "founders" | "testimonials" | "faqs";

const settings = {
  company: "GreenPay Enterprises",
  tagline: "Digital systems that move business forward.",
  email: "hello@greenpay.co.ke",
  phone: "+254 700 123 456",
  whatsapp: "+254 700 123 456",
  location: "Nairobi, Kenya",
  hours: "Mon–Fri, 8:00am–5:30pm",
};

const resources: Record<Resource, RecordWithId[]> = {
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

const bookings: RecordWithId[] = [];
const messages: RecordWithId[] = [];

function isResource(value: string): value is Resource {
  return value in resources;
}

function nextId(items: RecordWithId[]) {
  return Math.max(0, ...items.map((item) => item.id)) + 1;
}

function bodyRecord(body: unknown): Record<string, unknown> {
  return body && typeof body === "object" && !Array.isArray(body)
    ? body as Record<string, unknown>
    : {};
}

const router: IRouter = Router();

router.get("/bootstrap", (_req, res) => {
  res.json({ settings, ...resources });
});

router.get("/settings", (_req, res) => {
  res.json(settings);
});

router.patch("/settings", (req, res) => {
  Object.assign(settings, bodyRecord(req.body));
  res.json(settings);
});

router.get("/dashboard/summary", (_req, res) => {
  res.json({
    services: resources.services.filter((item) => item.visible !== false).length,
    projects: resources.projects.filter((item) => item.visible !== false).length,
    founders: resources.founders.filter((item) => item.visible !== false).length,
    bookings: bookings.length,
    messages: messages.length,
    testimonials: resources.testimonials.filter((item) => item.visible !== false).length,
    faqs: resources.faqs.filter((item) => item.visible !== false).length,
    recentBookings: bookings.slice(-5).reverse(),
  });
});

router.get("/bookings", (_req, res) => {
  res.json(bookings);
});

router.post("/bookings", (req, res) => {
  const input = bodyRecord(req.body);
  const id = nextId(bookings);
  const booking = {
    id,
    reference: `GP-${new Date().getFullYear()}-${String(id).padStart(4, "0")}`,
    name: String(input.name ?? ""),
    business: String(input.business ?? ""),
    email: String(input.email ?? ""),
    phone: String(input.phone ?? ""),
    service: String(input.service ?? ""),
    budget: String(input.budget ?? ""),
    preferredDate: input.preferredDate == null ? null : String(input.preferredDate),
    description: String(input.description ?? ""),
    contactPreference: String(input.contactPreference ?? "Email"),
    status: "New",
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  res.status(201).json(booking);
});

router.patch("/bookings/:id", (req, res) => {
  const booking = bookings.find((item) => item.id === Number(req.params.id));
  if (!booking) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }
  Object.assign(booking, bodyRecord(req.body));
  res.json(booking);
});

router.get("/messages", (_req, res) => {
  res.json(messages);
});

router.post("/messages", (req, res) => {
  const input = bodyRecord(req.body);
  const message = {
    id: nextId(messages),
    name: String(input.name ?? ""),
    email: String(input.email ?? ""),
    topic: String(input.topic ?? ""),
    message: String(input.message ?? ""),
    createdAt: new Date().toISOString(),
  };
  messages.push(message);
  res.status(201).json(message);
});

router.get("/:resource", (req, res) => {
  if (!isResource(req.params.resource)) {
    res.status(404).json({ error: "Resource not found" });
    return;
  }
  res.json(resources[req.params.resource]);
});

router.post("/:resource", (req, res) => {
  if (!isResource(req.params.resource)) {
    res.status(404).json({ error: "Resource not found" });
    return;
  }
  const input = bodyRecord(req.body);
  const item = {
    ...input,
    id: nextId(resources[req.params.resource]),
    visible: input.visible !== false,
  };
  resources[req.params.resource].push(item);
  res.status(201).json(item);
});

router.patch("/:resource/:id", (req, res) => {
  if (!isResource(req.params.resource)) {
    res.status(404).json({ error: "Resource not found" });
    return;
  }
  const item = resources[req.params.resource].find((entry) => entry.id === Number(req.params.id));
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  Object.assign(item, bodyRecord(req.body));
  res.json(item);
});

router.delete("/:resource/:id", (req, res) => {
  if (!isResource(req.params.resource)) {
    res.status(404).json({ error: "Resource not found" });
    return;
  }
  const items = resources[req.params.resource];
  const index = items.findIndex((entry) => entry.id === Number(req.params.id));
  if (index === -1) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  items.splice(index, 1);
  res.status(204).send();
});

export default router;