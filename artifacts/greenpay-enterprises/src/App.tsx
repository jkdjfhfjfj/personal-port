import { type ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Clock3,
  Code2,
  Eye,
  EyeOff,
  FileText,
  Globe2,
  Inbox,
  LayoutDashboard,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Minus,
  Pencil,
  Phone,
  Plus,
  Quote,
  RefreshCw,
  Save,
  Search,
  Send,
  Settings,
  Sparkles,
  Trash2,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  getGetDashboardSummaryQueryKey,
  getGetPublicBootstrapQueryKey,
  getGetSettingsQueryKey,
  getListBookingsQueryKey,
  getListFaqsQueryKey,
  getListFoundersQueryKey,
  getListMessagesQueryKey,
  getListProjectsQueryKey,
  getListServicesQueryKey,
  getListTestimonialsQueryKey,
  useCreateBooking,
  useCreateFaq,
  useCreateFounder,
  useCreateMessage,
  useCreateProject,
  useCreateService,
  useCreateTestimonial,
  useDeleteFaq,
  useDeleteFounder,
  useDeleteProject,
  useDeleteService,
  useDeleteTestimonial,
  useGetDashboardSummary,
  useGetPublicBootstrap,
  useGetSettings,
  useListBookings,
  useListFaqs,
  useListFounders,
  useListMessages,
  useListProjects,
  useListServices,
  useListTestimonials,
  useUpdateBooking,
  useUpdateFaq,
  useUpdateFounder,
  useUpdateProject,
  useUpdateService,
  useUpdateSettings,
  useUpdateTestimonial,
} from "@workspace/api-client-react";
import type {
  Booking,
  BookingUpdateStatus,
  CompanySettings,
  DashboardSummary,
  Faq,
  Founder,
  Message,
  Project,
  Service,
  Testimonial,
} from "@workspace/api-client-react";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  Router as WouterRouter,
} from "wouter";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();
const inputClass =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10";
const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50";
const OWNER_EMAIL = "moxndam69@gmail.com";
const OWNER_PASSWORD = "12345678";

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      data-testid="link-brand"
      className={`flex items-center gap-3 ${inverse ? "text-background" : "text-foreground"}`}
    >
      <span
        className={`grid size-9 place-items-center rounded-xl ${inverse ? "bg-accent text-primary" : "bg-primary text-accent"}`}
      >
        <Zap size={18} strokeWidth={2.5} />
      </span>
      <span className="font-bold tracking-tight">
        greenpay<span className="text-accent">.</span>
      </span>
    </Link>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="gp-mono mb-4 text-[10px] font-bold text-primary/70">
      {children}
    </p>
  );
}

function PublicNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#work" data-testid="link-nav-work">
            Selected work
          </a>
          <a href="#services" data-testid="link-nav-services">
            What we do
          </a>
          <a href="#approach" data-testid="link-nav-approach">
            Our approach
          </a>
          <a href="#contact" data-testid="link-nav-contact">
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          data-testid="link-nav-start"
          className={`${buttonBase} bg-primary px-4 py-2 text-xs text-primary-foreground`}
        >
          Start a conversation <ArrowRight size={15} />
        </a>
        <button
          type="button"
          aria-label="Open navigation"
          data-testid="button-open-navigation"
          className="ml-2 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-4 md:hidden">
          {["work", "services", "approach", "contact"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              data-testid={`link-mobile-${id}`}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-semibold capitalize"
            >
              {id === "work"
                ? "Selected work"
                : id === "approach"
                  ? "Our approach"
                  : id === "contact"
                    ? "Contact"
                    : "What we do"}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function BookingForm({
  settings,
  services,
}: {
  settings: CompanySettings;
  services: Service[];
}) {
  const create = useCreateBooking();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    preferredDate: "",
    description: "",
    contactPreference: "Email",
  });
  const set = (key: string, value: string) =>
    setForm((old) => ({ ...old, [key]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    create.mutate(
      { data: { ...form, preferredDate: form.preferredDate || null } },
      {
        onSuccess: () => setDone(true),
        onError: () =>
          setError(
            "We could not send that through. Please try again or email us directly.",
          ),
      },
    );
  };
  if (done)
    return (
      <div
        className="rounded-3xl border border-primary/20 bg-secondary/60 p-8 text-center"
        data-testid="status-booking-success"
      >
        <span className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-primary text-accent">
          <Check />
        </span>
        <h3 className="gp-display text-3xl">We have your note.</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Thanks for reaching out. A real person from GreenPay will be in touch
          within one business day.
        </p>
        <button
          type="button"
          data-testid="button-booking-another"
          className={`${buttonBase} mt-6 border border-border bg-card`}
          onClick={() => {
            setDone(false);
            setForm({
              name: "",
              business: "",
              email: "",
              phone: "",
              service: "",
              budget: "",
              preferredDate: "",
              description: "",
              contactPreference: "Email",
            });
          }}
        >
          Send another note
        </button>
      </div>
    );
  return (
    <form
      onSubmit={submit}
      className="grid gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm md:grid-cols-2 md:p-8"
      data-testid="form-booking"
    >
      <div className="md:col-span-2">
        <SectionLabel>01 / Tell us a little</SectionLabel>
        <h3 className="gp-display text-3xl">Let’s make the next move clear.</h3>
      </div>
      <input
        required
        className={inputClass}
        value={form.name}
        onChange={(e) => set("name", e.target.value)}
        placeholder="Your name"
        data-testid="input-booking-name"
      />
      <input
        className={inputClass}
        value={form.business}
        onChange={(e) => set("business", e.target.value)}
        placeholder="Business name"
        data-testid="input-booking-business"
      />
      <input
        required
        type="email"
        className={inputClass}
        value={form.email}
        onChange={(e) => set("email", e.target.value)}
        placeholder="Work email"
        data-testid="input-booking-email"
      />
      <input
        required
        className={inputClass}
        value={form.phone}
        onChange={(e) => set("phone", e.target.value)}
        placeholder="Phone / WhatsApp"
        data-testid="input-booking-phone"
      />
      <select
        className={inputClass}
        value={form.service}
        onChange={(e) => set("service", e.target.value)}
        data-testid="select-booking-service"
      >
        <option value="">What can we help with?</option>
        {services.map((service) => (
          <option key={service.id} value={service.title}>
            {service.title}
          </option>
        ))}
        <option value="Not sure yet">Not sure yet</option>
      </select>
      <select
        className={inputClass}
        value={form.budget}
        onChange={(e) => set("budget", e.target.value)}
        data-testid="select-booking-budget"
      >
        <option value="">Working budget</option>
        <option>Under KES 100k</option>
        <option>KES 100k – 300k</option>
        <option>KES 300k – 750k</option>
        <option>Over KES 750k</option>
      </select>
      <input
        type="date"
        className={inputClass}
        value={form.preferredDate}
        onChange={(e) => set("preferredDate", e.target.value)}
        data-testid="input-booking-date"
      />
      <select
        className={inputClass}
        value={form.contactPreference}
        onChange={(e) => set("contactPreference", e.target.value)}
        data-testid="select-booking-contact"
      >
        <option>Email</option>
        <option>Phone call</option>
        <option>WhatsApp</option>
      </select>
      <textarea
        required
        rows={4}
        className={`${inputClass} md:col-span-2`}
        value={form.description}
        onChange={(e) => set("description", e.target.value)}
        placeholder="What are you trying to build, improve, or untangle?"
        data-testid="textarea-booking-description"
      />
      {error && (
        <p
          className="md:col-span-2 text-sm text-destructive"
          data-testid="status-booking-error"
        >
          {error}
        </p>
      )}
      <div className="flex items-center justify-between gap-4 md:col-span-2">
        <p className="text-xs leading-5 text-muted-foreground">
          <MapPin size={13} className="mr-1 inline" />
          {settings.location || "Nairobi, Kenya"} · Usually reply within one
          working day
        </p>
        <button
          type="submit"
          disabled={create.isPending}
          data-testid="button-submit-booking"
          className={`${buttonBase} bg-primary text-primary-foreground`}
        >
          {create.isPending ? "Sending…" : "Send enquiry"}{" "}
          <ArrowRight size={15} />
        </button>
      </div>
    </form>
  );
}

function Home() {
  const bootstrap = useGetPublicBootstrap();
  const data = bootstrap.data;
  const settings = data?.settings ?? {
    company: "GreenPay Enterprises",
    tagline: "Digital systems for businesses going somewhere.",
    email: "hello@greenpay.co.ke",
    phone: "+254 700 000 000",
    whatsapp: "+254 700 000 000",
    location: "Nairobi, Kenya",
    hours: "Mon–Fri, 8:30–17:30",
  };
  const services = data?.services?.filter((item) => item.visible) ?? [];
  const projects = data?.projects?.filter((item) => item.visible) ?? [];
  const founders = data?.founders?.filter((item) => item.visible) ?? [];
  const testimonials = data?.testimonials?.filter((item) => item.visible) ?? [];
  const faqs = data?.faqs?.filter((item) => item.visible) ?? [];
  return (
    <div className="gp-noise min-h-[100dvh] overflow-hidden">
      <PublicNav />
      <main>
        <section className="gp-grid relative px-5 pb-24 pt-36 lg:px-8 lg:pb-36 lg:pt-48">
          <div className="mx-auto grid max-w-7xl items-end gap-16 lg:grid-cols-[1.1fr_.9fr]">
            <div className="gp-rise">
              <div className="mb-8 flex items-center gap-3 text-xs font-semibold">
                <span className="size-2 rounded-full bg-accent gp-pulse" />{" "}
                Nairobi-based · Built for the long run
              </div>
              <h1 className="gp-display max-w-4xl text-[clamp(3.7rem,9vw,8.7rem)] leading-[.86]">
                Make your next
                <br />
                <span className="text-primary/45">move count.</span>
              </h1>
              <p className="mt-9 max-w-xl text-lg leading-8 text-muted-foreground">
                GreenPay is the digital technology partner for growing
                businesses. We build the websites, apps, payments, and systems
                that help good work travel further.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  data-testid="link-hero-contact"
                  className={`${buttonBase} bg-primary text-primary-foreground`}
                >
                  Talk through a project <ArrowRight size={16} />
                </a>
                <a
                  href="#work"
                  data-testid="link-hero-work"
                  className={`${buttonBase} border border-border bg-card`}
                >
                  See selected work <ChevronRight size={16} />
                </a>
              </div>
            </div>
            <div className="relative min-h-[310px] lg:min-h-[430px]">
              <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
              <div className="absolute bottom-2 left-6 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative ml-auto max-w-md rotate-2 rounded-[2rem] border border-primary/20 bg-primary p-7 text-primary-foreground shadow-2xl lg:p-9">
                <div className="flex items-start justify-between">
                  <span className="gp-mono text-[10px] text-accent">
                    GreenPay / field notes
                  </span>
                  <Sparkles className="text-accent" size={20} />
                </div>
                <p className="gp-display mt-24 text-4xl leading-[.98]">
                  The best digital work feels obvious in hindsight.
                </p>
                <div className="mt-10 flex items-center justify-between border-t border-primary-foreground/20 pt-4 text-xs text-primary-foreground/60">
                  <span>01</span>
                  <span>Strategy → shipped</span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-1 rounded-2xl border border-border bg-card p-5 shadow-xl">
                <p className="gp-mono text-[9px] text-muted-foreground">
                  Today’s focus
                </p>
                <p className="mt-2 text-sm font-bold">
                  Useful, not just beautiful.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="border-y border-border bg-primary px-5 py-6 text-primary-foreground lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
            <p className="gp-mono text-[10px] text-accent">
              One partner / fewer handoffs
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-primary-foreground/70">
              <span>Websites that work</span>
              <span>Payments that flow</span>
              <span>Operations that breathe</span>
              <span>Growth you can see</span>
            </div>
          </div>
        </section>
        <section id="services" className="px-5 py-24 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
              <div>
                <SectionLabel>02 / What we do</SectionLabel>
                <h2 className="gp-display max-w-md text-5xl leading-[.94] md:text-6xl">
                  Digital foundations with a point of view.
                </h2>
                <p className="mt-7 max-w-sm text-sm leading-7 text-muted-foreground">
                  You bring the ambition. We bring the thinking, design,
                  engineering, and follow-through to make it real.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.length ? (
                  services.map((item, i) => (
                    <article
                      key={item.id}
                      className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                      data-testid={`card-service-${item.id}`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary">
                          {item.icon || <Code2 size={18} />}
                        </span>
                        <span className="gp-mono text-[9px] text-muted-foreground">
                          0{i + 1}
                        </span>
                      </div>
                      <p className="mt-12 text-xs font-bold uppercase tracking-wider text-accent-foreground/60">
                        {item.tag}
                      </p>
                      <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {item.text}
                      </p>
                    </article>
                  ))
                ) : (
                  <EmptyPublic text="Our service notes are loading." />
                )}
              </div>
            </div>
          </div>
        </section>
        <section
          id="work"
          className="bg-secondary/50 px-5 py-24 lg:px-8 lg:py-36"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionLabel>03 / Selected work</SectionLabel>
                <h2 className="gp-display text-5xl leading-none md:text-6xl">
                  Built for real
                  <br />
                  Kenyan momentum.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-muted-foreground">
                A few projects where clear thinking met committed teams.
              </p>
            </div>
            <div className="mt-14 space-y-6">
              {projects.length ? (
                projects.map((project, index) => (
                  <article
                    key={project.id}
                    className={`grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2 ${index % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
                    data-testid={`card-project-${project.id}`}
                  >
                    <div
                      className="relative min-h-[270px] overflow-hidden p-8"
                      style={{
                        background: project.accent || "hsl(164 39% 14%)",
                      }}
                    >
                      <div className="absolute -right-12 -top-12 size-56 rounded-full border border-white/20" />
                      <div className="absolute bottom-8 left-8 grid size-14 place-items-center rounded-2xl bg-accent text-primary">
                        <Globe2 size={24} />
                      </div>
                      <span className="gp-mono relative text-[10px] text-white/70">
                        {project.category}
                      </span>
                      <p className="gp-display relative mt-24 max-w-sm text-4xl leading-none text-white">
                        {project.title}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between p-8 lg:p-12">
                      <div>
                        <span className="gp-mono text-[10px] text-muted-foreground">
                          The brief
                        </span>
                        <p className="mt-5 text-lg leading-8">{project.text}</p>
                        <div className="mt-7 flex flex-wrap gap-2">
                          {(project.features || []).map((feature) => (
                            <span
                              key={feature}
                              className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-10 flex items-center gap-2 text-sm font-bold text-primary">
                        View the thinking <ArrowRight size={15} />
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <EmptyPublic text="Our project shelf is being refreshed." />
              )}
            </div>
          </div>
        </section>
        <section id="approach" className="px-5 py-24 lg:px-8 lg:py-36">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <SectionLabel>04 / How we work</SectionLabel>
              <h2 className="gp-display text-5xl leading-[.92] md:text-6xl">
                Small team.
                <br />
                Senior attention.
              </h2>
              <div className="mt-10 border-l-2 border-accent pl-5 text-sm leading-7 text-muted-foreground">
                No layers of account management between you and the people
                making the decisions. We stay close, direct, and curious.
              </div>
            </div>
            <div className="space-y-1">
              {[
                [
                  "01",
                  "Listen before we draw",
                  "We find the sharpest version of the problem, not just the loudest request.",
                ],
                [
                  "02",
                  "Make the invisible visible",
                  "A clear plan, a useful prototype, and language everyone can get behind.",
                ],
                [
                  "03",
                  "Ship in the open",
                  "Frequent checkpoints, practical trade-offs, and no mysterious black boxes.",
                ],
                [
                  "04",
                  "Leave things stronger",
                  "Your team gets a system they can own, not a dependency they have to manage.",
                ],
              ].map(([number, title, text]) => (
                <div
                  key={number}
                  className="group flex gap-6 border-t border-border py-7"
                >
                  <span className="gp-mono w-8 pt-1 text-[10px] text-accent-foreground/50">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                      {text}
                    </p>
                  </div>
                  <ArrowRight
                    className="ml-auto mt-1 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                    size={18}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        {testimonials.length > 0 && (
          <section className="bg-primary px-5 py-24 text-primary-foreground lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionLabel>05 / Kind words</SectionLabel>
              <div className="grid gap-7 lg:grid-cols-[1.15fr_.85fr]">
                {testimonials.slice(0, 2).map((item) => (
                  <figure
                    key={item.id}
                    className="rounded-3xl border border-primary-foreground/15 p-7 lg:p-10"
                    data-testid={`quote-testimonial-${item.id}`}
                  >
                    <Quote className="mb-9 text-accent" size={30} />
                    <blockquote className="gp-display text-3xl leading-tight lg:text-4xl">
                      “{item.quote}”
                    </blockquote>
                    <figcaption className="mt-9 flex items-center gap-3 text-sm">
                      <span className="grid size-9 place-items-center rounded-full bg-accent text-xs font-bold text-primary">
                        {item.initials}
                      </span>
                      <span>
                        <b className="block">{item.name}</b>
                        <span className="text-primary-foreground/60">
                          {item.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}
        {founders.length > 0 && (
          <section className="px-5 py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionLabel>06 / The people</SectionLabel>
              <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
                <div>
                  <h2 className="gp-display text-5xl leading-none">
                    Good work
                    <br />
                    needs good company.
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {founders.map((founder) => (
                    <article
                      key={founder.id}
                      className="rounded-2xl border border-border bg-card p-6"
                      data-testid={`card-founder-${founder.id}`}
                    >
                      <span
                        className="grid size-16 place-items-center rounded-2xl text-lg font-bold"
                        style={{
                          background: founder.color || "hsl(42 83% 63%)",
                        }}
                      >
                        {founder.initials}
                      </span>
                      <h3 className="mt-6 text-lg font-bold">{founder.name}</h3>
                      <p className="text-xs font-semibold text-muted-foreground">
                        {founder.role}
                      </p>
                      <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {founder.bio}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="border-y border-border bg-accent px-5 py-10 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
            <div>
              <p className="gp-mono text-[10px] text-primary/60">
                A useful promise
              </p>
              <p className="gp-display mt-2 text-3xl text-primary">
                You will always know what happens next.
              </p>
            </div>
            <a
              href="#contact"
              data-testid="link-band-contact"
              className={`${buttonBase} bg-primary text-primary-foreground`}
            >
              Let’s talk <ArrowRight size={15} />
            </a>
          </div>
        </section>
        {faqs.length > 0 && (
          <section className="px-5 py-24 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <SectionLabel>07 / Frequently asked</SectionLabel>
              <h2 className="gp-display text-5xl">Good questions welcome.</h2>
              <div className="mt-10 divide-y divide-border border-y border-border">
                {faqs.map((faq) => (
                  <details
                    key={faq.id}
                    className="group py-6"
                    data-testid={`details-faq-${faq.id}`}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                      {faq.question}
                      <Plus
                        className="shrink-0 transition group-open:rotate-45"
                        size={19}
                      />
                    </summary>
                    <p className="max-w-2xl pt-4 text-sm leading-7 text-muted-foreground">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}
        <section
          id="contact"
          className="bg-secondary/60 px-5 py-24 lg:px-8 lg:py-36"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <SectionLabel>08 / Start here</SectionLabel>
              <h2 className="gp-display text-6xl leading-[.88]">
                Bring the
                <br />
                good brief.
              </h2>
              <p className="mt-7 max-w-sm text-sm leading-7 text-muted-foreground">
                Tell us what is changing in your business. We will help you work
                out what to build first.
              </p>
              <div className="mt-10 space-y-4 text-sm">
                <a
                  className="flex items-center gap-3 font-semibold"
                  href={`mailto:${settings.email}`}
                  data-testid="link-contact-email"
                >
                  <Mail size={16} />
                  {settings.email}
                </a>
                <a
                  className="flex items-center gap-3 font-semibold"
                  href={`tel:${settings.phone}`}
                  data-testid="link-contact-phone"
                >
                  <Phone size={16} />
                  {settings.phone}
                </a>
                <p className="flex items-center gap-3 text-muted-foreground">
                  <Clock3 size={16} />
                  {settings.hours}
                </p>
              </div>
            </div>
            <BookingForm settings={settings} services={services} />
          </div>
        </section>
      </main>
      <footer className="bg-primary px-5 py-10 text-primary-foreground lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <Brand inverse />
          <div className="text-sm text-primary-foreground/60">
            {settings.location} · {new Date().getFullYear()} GreenPay
            Enterprises
          </div>
        </div>
      </footer>
    </div>
  );
}

function EmptyPublic({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}
function SkeletonRows() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="h-16 animate-pulse rounded-2xl bg-secondary"
        />
      ))}
    </div>
  );
}

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Zap },
  { href: "/admin/projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "/admin/founders", label: "Founders", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/faqs", label: "FAQs", icon: CircleHelp },
  { href: "/admin/bookings", label: "Bookings", icon: ClipboardList },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminShell({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [mobile, setMobile] = useState(false);
  const current =
    navItems.find((item) => item.href === location)?.label || "Overview";
  const logout = () => {
    localStorage.removeItem("greenpay-owner");
    setLocation("/sign-in");
  };
  return (
    <div className="min-h-[100dvh] bg-background lg:flex">
      {mobile && (
        <button
          aria-label="Close menu"
          data-testid="button-close-admin-menu"
          className="fixed inset-0 z-20 bg-primary/30 lg:hidden"
          onClick={() => setMobile(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-[260px] -translate-x-full flex-col bg-primary p-5 text-primary-foreground transition-transform lg:relative lg:translate-x-0 ${mobile ? "translate-x-0" : ""}`}
      >
        <div className="flex items-center justify-between">
          <Brand inverse />
          <button
            className="lg:hidden"
            data-testid="button-hide-admin-menu"
            onClick={() => setMobile(false)}
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-12">
          <p className="gp-mono mb-3 px-3 text-[9px] text-primary-foreground/40">
            Workspace
          </p>
          {navItems.slice(0, 6).map((item) => (
            <AdminLink
              key={item.href}
              item={item}
              active={location === item.href}
              onClick={() => setMobile(false)}
            />
          ))}
          <p className="gp-mono mb-3 mt-8 px-3 text-[9px] text-primary-foreground/40">
            Inbox & company
          </p>
          {navItems.slice(6).map((item) => (
            <AdminLink
              key={item.href}
              item={item}
              active={location === item.href}
              onClick={() => setMobile(false)}
            />
          ))}
        </div>
        <div className="mt-auto border-t border-primary-foreground/15 pt-5">
          <p className="px-3 text-xs text-primary-foreground/50">
            Signed in as
          </p>
          <p className="mt-1 px-3 text-sm font-semibold">GreenPay owner</p>
          <button
            data-testid="button-admin-sign-out"
            onClick={logout}
            className="mt-4 flex items-center gap-2 px-3 text-xs font-semibold text-accent"
          >
            <ArrowRight size={13} className="rotate-180" /> Sign out
          </button>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex h-[76px] items-center justify-between border-b border-border bg-background/85 px-5 backdrop-blur-xl lg:px-10">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              data-testid="button-show-admin-menu"
              onClick={() => setMobile(true)}
            >
              <Menu />
            </button>
            <div>
              <p className="text-xs text-muted-foreground">
                GreenPay owner workspace
              </p>
              <h1 className="text-lg font-bold">{current}</h1>
            </div>
          </div>
          <Link
            href="/"
            data-testid="link-view-site"
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary"
          >
            <Eye size={16} /> View site
          </Link>
        </header>
        <main className="mx-auto max-w-[1440px] p-5 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
function AdminLink({
  item,
  active,
  onClick,
}: {
  item: (typeof navItems)[number];
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      data-testid={`link-admin-${item.label.toLowerCase()}`}
      onClick={onClick}
      className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${active ? "bg-accent text-primary" : "text-primary-foreground/65 hover:bg-primary-foreground/10 hover:text-primary-foreground"}`}
    >
      <Icon size={16} />
      {item.label}
    </Link>
  );
}
function PageHeading({
  eyebrow,
  title,
  text,
  action,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
      <div>
        <p className="gp-mono mb-3 text-[10px] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="gp-display text-5xl leading-none">{title}</h2>
        {text && (
          <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
            {text}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
function AdminGuard({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();
  if (
    typeof window !== "undefined" &&
    !localStorage.getItem("greenpay-owner")
  ) {
    setLocation("/sign-in");
    return null;
  }
  return <AdminShell>{children}</AdminShell>;
}

function SignIn() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      email.trim().toLowerCase() !== OWNER_EMAIL ||
      password !== OWNER_PASSWORD
    ) {
      setError("That owner email or password is not correct.");
      return;
    }
    localStorage.setItem("greenpay-owner", OWNER_EMAIL);
    setLocation("/admin");
  };
  return (
    <div className="gp-noise grid min-h-[100dvh] lg:grid-cols-[.95fr_1.05fr]">
      <section className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col">
        <Brand inverse />
        <div className="mt-auto max-w-lg">
          <p className="gp-mono mb-6 text-[10px] text-accent">
            GreenPay / owner workspace
          </p>
          <h1 className="gp-display text-7xl leading-[.86]">
            Keep the
            <br />
            good work
            <br />
            <span className="text-accent">moving.</span>
          </h1>
          <p className="mt-8 max-w-sm text-sm leading-7 text-primary-foreground/60">
            A considered place to keep your public story, active opportunities,
            and the work behind the work in order.
          </p>
        </div>
        <div className="mt-20 flex justify-between text-xs text-primary-foreground/45">
          <span>Nairobi, Kenya</span>
          <span>01 — 09</span>
        </div>
      </section>
      <section className="flex items-center justify-center p-5 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-12 lg:hidden">
            <Brand />
          </div>
          <p className="gp-mono mb-3 text-[10px] text-muted-foreground">
            Welcome back
          </p>
          <h1 className="gp-display text-5xl leading-none">
            Good to see you again.
          </h1>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Sign in to manage your site and stay close to every new conversation.
          </p>
          <form
            className="mt-9 space-y-4"
            onSubmit={submit}
            data-testid="form-auth"
          >
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="Owner email"
              data-testid="input-auth-email"
            />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="Password"
              data-testid="input-auth-password"
            />
            {error && (
              <p
                className="text-sm text-destructive"
                data-testid="status-auth-error"
              >
                {error}
              </p>
            )}
            <button
              className={`${buttonBase} w-full bg-primary text-primary-foreground`}
              data-testid="button-auth-submit"
            >
              Sign in <ArrowRight size={16} />
            </button>
          </form>
          <p className="mt-12 text-center text-xs text-muted-foreground">
            Owner access is private to your GreenPay workspace.
          </p>
        </div>
      </section>
    </div>
  );
}

type ResourceKey =
  "services" | "projects" | "founders" | "testimonials" | "faqs";
const resourceMeta: Record<
  ResourceKey,
  {
    title: string;
    singular: string;
    desc: string;
    fields: {
      key: string;
      label: string;
      type?: string;
      placeholder?: string;
    }[];
  }
> = {
  services: {
    title: "Services",
    singular: "service",
    desc: "Shape the capabilities clients see first.",
    fields: [
      { key: "title", label: "Title", placeholder: "Digital product design" },
      { key: "tag", label: "Tag", placeholder: "Strategy + build" },
      { key: "icon", label: "Icon label", placeholder: "01" },
      {
        key: "text",
        label: "Description",
        type: "textarea",
        placeholder: "A short, clear explanation.",
      },
    ],
  },
  projects: {
    title: "Projects",
    singular: "project",
    desc: "Keep the portfolio close to the work you are proud of.",
    fields: [
      { key: "title", label: "Title", placeholder: "A better way to..." },
      { key: "category", label: "Category", placeholder: "Web platform" },
      { key: "image", label: "Image URL", placeholder: "https://..." },
      { key: "accent", label: "Accent colour", placeholder: "#183d32" },
      {
        key: "text",
        label: "Description",
        type: "textarea",
        placeholder: "The brief and the outcome.",
      },
      {
        key: "features",
        label: "Features",
        placeholder: "Payments, Dashboard, Mobile",
      },
    ],
  },
  founders: {
    title: "Founders",
    singular: "founder",
    desc: "Introduce the humans behind the decisions.",
    fields: [
      { key: "name", label: "Name", placeholder: "Amina Njoroge" },
      { key: "role", label: "Role", placeholder: "Co-founder, Strategy" },
      { key: "initials", label: "Initials", placeholder: "AN" },
      { key: "color", label: "Avatar colour", placeholder: "#f2bf52" },
      {
        key: "bio",
        label: "Bio",
        type: "textarea",
        placeholder: "A little context about this person.",
      },
    ],
  },
  testimonials: {
    title: "Testimonials",
    singular: "testimonial",
    desc: "The voices of people who trusted you with a hard problem.",
    fields: [
      { key: "name", label: "Name", placeholder: "Wanjiku Kariuki" },
      { key: "role", label: "Role", placeholder: "Founder, Company" },
      { key: "initials", label: "Initials", placeholder: "WK" },
      {
        key: "quote",
        label: "Quote",
        type: "textarea",
        placeholder: "What did they say?",
      },
    ],
  },
  faqs: {
    title: "FAQs",
    singular: "FAQ",
    desc: "Answer the questions that help good-fit clients take the next step.",
    fields: [
      {
        key: "question",
        label: "Question",
        placeholder: "How do projects usually start?",
      },
      {
        key: "answer",
        label: "Answer",
        type: "textarea",
        placeholder: "A useful, human answer.",
      },
    ],
  },
};

function ResourceManager({ resource }: { resource: ResourceKey }) {
  const meta = resourceMeta[resource];
  const qc = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [search, setSearch] = useState("");
  const services = useListServices();
  const projects = useListProjects();
  const founders = useListFounders();
  const testimonials = useListTestimonials();
  const faqs = useListFaqs();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const createFounder = useCreateFounder();
  const updateFounder = useUpdateFounder();
  const deleteFounder = useDeleteFounder();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();
  const createFaq = useCreateFaq();
  const updateFaq = useUpdateFaq();
  const deleteFaq = useDeleteFaq();
  const all: any[] = ({
    services: services.data,
    projects: projects.data,
    founders: founders.data,
    testimonials: testimonials.data,
    faqs: faqs.data,
  }[resource] || []) as any[];
  const loading = {
    services: services.isLoading,
    projects: projects.isLoading,
    founders: founders.isLoading,
    testimonials: testimonials.isLoading,
    faqs: faqs.isLoading,
  }[resource];
  const filtered = all.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase()),
  );
  const invalidate = () =>
    qc.invalidateQueries({
      queryKey: {
        services: getListServicesQueryKey,
        projects: getListProjectsQueryKey,
        founders: getListFoundersQueryKey,
        testimonials: getListTestimonialsQueryKey,
        faqs: getListFaqsQueryKey,
      }[resource](),
    });
  const save = (form: any) => {
    const data = {
      ...form,
      visible: form.visible !== false,
      features:
        resource === "projects"
          ? String(form.features || "")
              .split(",")
              .map((x: string) => x.trim())
              .filter(Boolean)
          : undefined,
    };
    const onSuccess = () => {
      invalidate();
      setEditing(null);
    };
    if (resource === "services") {
      const mutation: any = editing?.id ? updateService : createService;
      mutation.mutate(editing?.id ? { id: editing.id, data } : { data }, {
        onSuccess,
      });
    }
    if (resource === "projects") {
      const mutation: any = editing?.id ? updateProject : createProject;
      mutation.mutate(editing?.id ? { id: editing.id, data } : { data }, {
        onSuccess,
      });
    }
    if (resource === "founders") {
      const mutation: any = editing?.id ? updateFounder : createFounder;
      mutation.mutate(editing?.id ? { id: editing.id, data } : { data }, {
        onSuccess,
      });
    }
    if (resource === "testimonials") {
      const mutation: any = editing?.id ? updateTestimonial : createTestimonial;
      mutation.mutate(editing?.id ? { id: editing.id, data } : { data }, {
        onSuccess,
      });
    }
    if (resource === "faqs") {
      const mutation: any = editing?.id ? updateFaq : createFaq;
      mutation.mutate(editing?.id ? { id: editing.id, data } : { data }, {
        onSuccess,
      });
    }
  };
  const remove = (item: any) => {
    if (!window.confirm(`Delete this ${meta.singular}?`)) return;
    const mutation: any = {
      services: deleteService,
      projects: deleteProject,
      founders: deleteFounder,
      testimonials: deleteTestimonial,
      faqs: deleteFaq,
    }[resource];
    mutation.mutate({ id: item.id }, { onSuccess: invalidate });
  };
  return (
    <>
      <PageHeading
        eyebrow={`Content / ${meta.title}`}
        title={meta.title}
        text={meta.desc}
        action={
          <button
            data-testid={`button-add-${resource}`}
            onClick={() => setEditing({ visible: true })}
            className={`${buttonBase} bg-primary text-primary-foreground`}
          >
            <Plus size={16} /> Add {meta.singular}
          </button>
        }
      />
      <div className="mb-5 flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            className={`${inputClass} pl-10`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${meta.title.toLowerCase()}`}
            data-testid={`input-search-${resource}`}
          />
        </div>
        <span className="rounded-full bg-secondary px-3 py-2 text-xs font-bold">
          {filtered.length} total
        </span>
      </div>
      {loading ? (
        <SkeletonRows />
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-16 text-center">
          <FileText className="mx-auto text-muted-foreground" />
          <p className="mt-4 font-semibold">
            No {meta.title.toLowerCase()} yet.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add the first one to start shaping the site.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center gap-4 border-b border-border p-5 last:border-0"
              data-testid={`row-${resource}-${item.id}`}
            >
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-sm font-bold text-primary">
                {item.initials || item.icon || String(item.id).padStart(2, "0")}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold">
                  {item.title || item.name || item.question}
                </p>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  {item.text ||
                    item.bio ||
                    item.quote ||
                    item.answer ||
                    item.role ||
                    item.category}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold ${item.visible ? "bg-secondary text-primary" : "bg-muted text-muted-foreground"}`}
              >
                {item.visible ? "Published" : "Hidden"}
              </span>
              <button
                title={item.visible ? "Hide" : "Publish"}
                data-testid={`button-toggle-${resource}-${item.id}`}
                onClick={() =>
                  save({
                    ...item,
                    visible: !item.visible,
                    features: item.features?.join(", "),
                  })
                }
                className="rounded-full p-2 hover:bg-secondary"
              >
                {item.visible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button
                title="Edit"
                data-testid={`button-edit-${resource}-${item.id}`}
                onClick={() =>
                  setEditing({ ...item, features: item.features?.join(", ") })
                }
                className="rounded-full p-2 hover:bg-secondary"
              >
                <Pencil size={16} />
              </button>
              <button
                title="Delete"
                data-testid={`button-delete-${resource}-${item.id}`}
                onClick={() => remove(item)}
                className="rounded-full p-2 text-destructive hover:bg-destructive/10"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      {editing && (
        <ResourceDialog
          meta={meta}
          initial={editing}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      )}
    </>
  );
}

function ResourceDialog({
  meta,
  initial,
  onClose,
  onSave,
}: {
  meta: (typeof resourceMeta)[ResourceKey];
  initial: any;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState<any>(initial);
  const set = (key: string, value: string | boolean) =>
    setForm((old: any) => ({ ...old, [key]: value }));
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-primary/35 p-4 backdrop-blur-sm">
      <div
        className="max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-3xl border border-border bg-background p-6 shadow-2xl lg:p-8"
        role="dialog"
        aria-modal="true"
        data-testid="dialog-resource"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="gp-mono text-[10px] text-muted-foreground">
              {initial.id ? "Edit" : "New"} {meta.singular}
            </p>
            <h3 className="gp-display mt-2 text-4xl">
              {initial.id ? "Refine the story." : "Add to the story."}
            </h3>
          </div>
          <button data-testid="button-close-resource-dialog" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {meta.fields.map((field) => (
            <label
              key={field.key}
              className={field.type === "textarea" ? "sm:col-span-2" : ""}
            >
              <span className="mb-2 block text-xs font-bold">
                {field.label}
              </span>
              {field.type === "textarea" ? (
                <textarea
                  rows={4}
                  className={inputClass}
                  value={form[field.key] || ""}
                  onChange={(e) => set(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  data-testid={`input-resource-${field.key}`}
                />
              ) : (
                <input
                  className={inputClass}
                  value={form[field.key] || ""}
                  onChange={(e) => set(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  data-testid={`input-resource-${field.key}`}
                />
              )}
            </label>
          ))}
          <label className="flex items-center gap-3 rounded-xl bg-secondary p-4 text-sm font-semibold sm:col-span-2">
            <input
              type="checkbox"
              checked={form.visible !== false}
              onChange={(e) => set("visible", e.target.checked)}
              data-testid="input-resource-visible"
            />{" "}
            Show this on the public site
          </label>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <button
            data-testid="button-cancel-resource"
            onClick={onClose}
            className={`${buttonBase} border border-border`}
          >
            Cancel
          </button>
          <button
            data-testid="button-save-resource"
            onClick={() => onSave(form)}
            className={`${buttonBase} bg-primary text-primary-foreground`}
          >
            <Save size={15} /> Save {meta.singular}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminOverview() {
  const summary = useGetDashboardSummary();
  const data = summary.data;
  return (
    <>
      <PageHeading
        eyebrow="Owner workspace / Today"
        title="Keep momentum visible."
        text="A quick read on your public presence and the conversations waiting for you."
        action={
          <Link
            href="/"
            data-testid="link-dashboard-public"
            className={`${buttonBase} border border-border bg-card`}
          >
            <Eye size={15} /> View public site
          </Link>
        }
      />
      {summary.isLoading ? (
        <SkeletonRows />
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["services", "Services live", Zap],
              ["projects", "Projects live", BriefcaseBusiness],
              ["bookings", "Open bookings", ClipboardList],
              ["messages", "Messages waiting", Inbox],
              ["founders", "Founders", Users],
              ["testimonials", "Testimonials", Quote],
              ["faqs", "FAQs", CircleHelp],
            ].map(([key, label, Icon]: any) => (
              <div
                key={key}
                className="rounded-2xl border border-border bg-card p-5"
                data-testid={`stat-${key}`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-9 place-items-center rounded-xl bg-secondary text-primary">
                    <Icon size={16} />
                  </span>
                  <span className="gp-mono text-[9px] text-muted-foreground">
                    live
                  </span>
                </div>
                <p className="mt-7 text-3xl font-bold">
                  {Number(data?.[key as keyof DashboardSummary] ?? 0)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
            <div className="rounded-2xl border border-border bg-card p-5 lg:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="gp-mono text-[10px] text-muted-foreground">
                    Pipeline / recent
                  </p>
                  <h3 className="mt-2 text-xl font-bold">
                    Latest conversations
                  </h3>
                </div>
                <Link
                  href="/admin/bookings"
                  data-testid="link-dashboard-bookings"
                  className="text-xs font-bold text-primary"
                >
                  Open pipeline <ArrowRight className="ml-1 inline" size={13} />
                </Link>
              </div>
              {data?.recentBookings?.length ? (
                <div className="mt-6 space-y-2">
                  {data.recentBookings.slice(0, 5).map((booking) => (
                    <BookingRow key={booking.id} booking={booking} compact />
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-xl bg-secondary/60 p-8 text-center text-sm text-muted-foreground">
                  New enquiries will appear here when they arrive.
                </div>
              )}
            </div>
            <div className="gp-grid rounded-2xl bg-primary p-7 text-primary-foreground">
              <Sparkles className="text-accent" size={22} />
              <p className="gp-display mt-20 text-4xl leading-none">
                A clear site makes a clear first conversation.
              </p>
              <p className="mt-5 text-sm leading-6 text-primary-foreground/60">
                Keep your services, proof, and answers current. The right
                clients notice.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function BookingRow({
  booking,
  compact = false,
}: {
  booking: Booking;
  compact?: boolean;
}) {
  return (
    <Link
      href="/admin/bookings"
      data-testid={`link-booking-${booking.id}`}
      className="flex items-center gap-3 rounded-xl border border-border/70 p-3 hover:border-primary/40"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-primary">
        {booking.name.slice(0, 2).toUpperCase()}
      </span>
      <span className="min-w-0 flex-1">
        <b className="block truncate text-sm">{booking.name}</b>
        <span className="block truncate text-xs text-muted-foreground">
          {booking.business || booking.service}
        </span>
      </span>
      <span
        className={`rounded-full px-2 py-1 text-[9px] font-bold ${booking.status === "New" ? "bg-accent text-primary" : "bg-secondary text-primary"}`}
      >
        {booking.status}
      </span>
      {!compact && <ChevronRight size={15} />}
    </Link>
  );
}

const statuses: BookingUpdateStatus[] = [
  "New",
  "Contacted",
  "Quoted",
  "In Progress",
  "Completed",
  "Cancelled",
];
function BookingsPage() {
  const bookings = useListBookings();
  const update = useUpdateBooking();
  const [query, setQuery] = useState("");
  const list = (bookings.data || []).filter((item) =>
    JSON.stringify(item).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="Inbox / Lead pipeline"
        title="Bookings"
        text="Turn good first conversations into clear next steps."
      />
      <div className="mb-5 flex max-w-sm items-center gap-2">
        <Search className="text-muted-foreground" size={16} />
        <input
          className={inputClass}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search bookings"
          data-testid="input-search-bookings"
        />
      </div>
      {bookings.isLoading ? (
        <SkeletonRows />
      ) : list.length === 0 ? (
        <EmptyPublic text="No bookings match that search." />
      ) : (
        <div className="grid gap-3">
          {list.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl border border-border bg-card p-5 lg:flex lg:items-center lg:gap-5"
              data-testid={`row-booking-${booking.id}`}
            >
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-primary">
                  {booking.name.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-bold">{booking.name}</h3>
                    <span className="gp-mono text-[9px] text-muted-foreground">
                      {booking.reference}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {booking.business || "Independent project"} ·{" "}
                    {booking.service}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-6">
                    {booking.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <a
                      href={`mailto:${booking.email}`}
                      className="font-semibold text-primary"
                    >
                      {booking.email}
                    </a>
                    <a href={`tel:${booking.phone}`}>{booking.phone}</a>
                    {booking.budget && <span>{booking.budget}</span>}
                  </div>
                </div>
              </div>
              <select
                className="mt-5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold lg:mt-0"
                value={booking.status}
                disabled={update.isPending}
                onChange={(e) =>
                  update.mutate({
                    id: booking.id,
                    data: { status: e.target.value as BookingUpdateStatus },
                  })
                }
                data-testid={`select-booking-status-${booking.id}`}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
function MessagesPage() {
  const messages = useListMessages();
  return (
    <>
      <PageHeading
        eyebrow="Inbox / Direct notes"
        title="Messages"
        text="The small notes can be the beginning of the right project."
      />
      {messages.isLoading ? (
        <SkeletonRows />
      ) : messages.data?.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {messages.data.map((message) => (
            <article
              key={message.id}
              className="rounded-2xl border border-border bg-card p-6"
              data-testid={`card-message-${message.id}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold">{message.name}</h3>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-xs text-muted-foreground"
                  >
                    {message.email}
                  </a>
                </div>
                <span className="gp-mono text-[9px] text-muted-foreground">
                  {new Date(message.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-wide text-accent-foreground/60">
                {message.topic}
              </p>
              <p className="mt-2 text-sm leading-7">{message.message}</p>
              <a
                href={`mailto:${message.email}?subject=Re: ${message.topic}`}
                data-testid={`link-reply-message-${message.id}`}
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-primary"
              >
                Reply <Send size={13} />
              </a>
            </article>
          ))}
        </div>
      ) : (
        <EmptyPublic text="Your message inbox is clear." />
      )}
    </>
  );
}

function SettingsPage() {
  const qc = useQueryClient();
  const settings = useGetSettings();
  const update = useUpdateSettings();
  const [form, setForm] = useState<CompanySettings | null>(null);
  const values = form || settings.data;
  const set = (key: keyof CompanySettings, value: string) =>
    setForm((old) => ({
      ...(old ||
        settings.data || {
          company: "",
          tagline: "",
          email: "",
          phone: "",
          whatsapp: "",
          location: "",
          hours: "",
        }),
      [key]: value,
    }));
  const save = () =>
    values &&
    update.mutate(
      { data: values },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getGetSettingsQueryKey() });
          setForm(null);
        },
      },
    );
  return (
    <>
      <PageHeading
        eyebrow="Company / Public details"
        title="Settings"
        text="These details travel across your public site and your first replies."
        action={
          <button
            disabled={!values || update.isPending}
            onClick={save}
            data-testid="button-save-settings"
            className={`${buttonBase} bg-primary text-primary-foreground`}
          >
            <Save size={15} /> {update.isPending ? "Saving…" : "Save settings"}
          </button>
        }
      />
      {settings.isLoading ? (
        <SkeletonRows />
      ) : (
        <div className="max-w-2xl rounded-3xl border border-border bg-card p-6 lg:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {(
              [
                "company",
                "tagline",
                "email",
                "phone",
                "whatsapp",
                "location",
                "hours",
              ] as (keyof CompanySettings)[]
            ).map((key) => (
              <label
                key={key}
                className={
                  key === "tagline" || key === "hours" ? "sm:col-span-2" : ""
                }
              >
                <span className="mb-2 block text-xs font-bold capitalize">
                  {key}
                </span>
                <input
                  className={inputClass}
                  value={values?.[key] || ""}
                  onChange={(e) => set(key, e.target.value)}
                  data-testid={`input-settings-${key}`}
                />
              </label>
            ))}
          </div>
          <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Check size={14} className="text-primary" /> Changes are reflected
            anywhere this information appears.
          </p>
        </div>
      )}
    </>
  );
}

function AdminRouter() {
  return (
    <Switch>
      <Route
        path="/admin"
        component={() => (
          <AdminGuard>
            <AdminOverview />
          </AdminGuard>
        )}
      />
      <Route
        path="/admin/services"
        component={() => (
          <AdminGuard>
            <ResourceManager resource="services" />
          </AdminGuard>
        )}
      />
      <Route
        path="/admin/projects"
        component={() => (
          <AdminGuard>
            <ResourceManager resource="projects" />
          </AdminGuard>
        )}
      />
      <Route
        path="/admin/founders"
        component={() => (
          <AdminGuard>
            <ResourceManager resource="founders" />
          </AdminGuard>
        )}
      />
      <Route
        path="/admin/testimonials"
        component={() => (
          <AdminGuard>
            <ResourceManager resource="testimonials" />
          </AdminGuard>
        )}
      />
      <Route
        path="/admin/faqs"
        component={() => (
          <AdminGuard>
            <ResourceManager resource="faqs" />
          </AdminGuard>
        )}
      />
      <Route
        path="/admin/bookings"
        component={() => (
          <AdminGuard>
            <BookingsPage />
          </AdminGuard>
        )}
      />
      <Route
        path="/admin/messages"
        component={() => (
          <AdminGuard>
            <MessagesPage />
          </AdminGuard>
        )}
      />
      <Route
        path="/admin/settings"
        component={() => (
          <AdminGuard>
            <SettingsPage />
          </AdminGuard>
        )}
      />
    </Switch>
  );
}

function Router() {
  return (
    <ErrorBoundary resetKey={window.location.pathname}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sign-in" component={() => <SignIn />} />
        <Route path="/sign-in/:rest*" component={() => <SignIn />} />
        <Route path="/sign-up" component={() => <SignIn />} />
        <Route path="/sign-up/:rest*" component={() => <SignIn />} />
        <Route component={AdminRouter} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
export default App;
