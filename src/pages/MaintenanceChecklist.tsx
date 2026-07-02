import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { CheckCircle2, Calendar, Wrench, AlertTriangle, ShieldCheck, ArrowRight, BookOpen, Building2, FileText, Send, Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";


const SITE = "https://barcoldrefrigerationltd.co.ke";
const URL = `${SITE}/blog/commercial-refrigeration-maintenance-checklist`;
const PUBLISHED = "2026-06-29";

const schedule = [
  {
    cadence: "Daily",
    icon: Calendar,
    items: [
      "Verify cabinet and cold-room temperatures against setpoints.",
      "Check for unusual noise, vibration, or icing on coils.",
      "Inspect door gaskets and confirm doors seal fully.",
      "Clear spillage and debris from around evaporator drains.",
    ],
  },
  {
    cadence: "Weekly",
    icon: Wrench,
    items: [
      "Clean condenser coils of dust, lint, and grease build-up.",
      "Wipe down evaporator fan blades and guards.",
      "Confirm defrost cycles are completing without ice carry-over.",
      "Check refrigerant sight glass for bubbles or moisture indicator colour.",
    ],
  },
  {
    cadence: "Monthly",
    icon: ShieldCheck,
    items: [
      "Tighten electrical terminals at the compressor and control panel.",
      "Measure compressor amp draw and compare to nameplate.",
      "Inspect insulation on suction lines for damage or condensation.",
      "Test alarms, high-pressure cut-outs, and safety controls.",
    ],
  },
  {
    cadence: "Quarterly",
    icon: AlertTriangle,
    items: [
      "Acid-test refrigeration oil and log results.",
      "Calibrate digital controllers and temperature probes.",
      "Inspect cold-room panels, hinges, and sweep heaters.",
      "Service condensing-unit fan motors and bearings.",
    ],
  },
  {
    cadence: "Annually",
    icon: CheckCircle2,
    items: [
      "Full system performance audit — superheat, subcooling, capacity.",
      "Leak-test the entire refrigerant circuit per F-Gas best practice.",
      "Replace filter-driers and inspect expansion valves.",
      "Review energy consumption and recommend efficiency upgrades.",
    ],
  },
];

const faqs = [
  {
    q: "How often should commercial refrigeration be serviced?",
    a: "Most systems benefit from professional service every 3–6 months. Heavy-use units — supermarket multi-decks, blast freezers, large cold rooms — should be inspected monthly to prevent breakdowns.",
  },
  {
    q: "What does a routine refrigeration inspection include?",
    a: "Barcold's routine inspections cover temperature verification, condenser and evaporator cleaning, refrigerant checks, electrical testing, safety-control testing, and a written service report.",
  },
  {
    q: "Can preventive maintenance reduce repair costs?",
    a: "Yes. Catching blocked condensers, worn gaskets, low refrigerant, and loose electrical connections early prevents the compressor failures and emergency callouts that drive up repair bills.",
  },
  {
    q: "Do you offer maintenance contracts in Kenya?",
    a: "We do. Barcold offers quarterly and monthly maintenance contracts with priority emergency response, discounted parts and labour, and compliance-ready service logs.",
  },
  {
    q: "What signs mean I need immediate commercial refrigeration repair?",
    a: "Call an engineer right away if you notice short-cycling, rising temperatures, oil stains indicating leaks, heavy ice build-up, burning smells, or repeated breaker trips.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Commercial Refrigeration Maintenance Checklist",
  description:
    "Reduce commercial refrigeration repair costs with this preventive maintenance checklist. Routine inspections for cold rooms, display chillers and kitchens.",
  keywords: "commercial refrigeration repair, routine inspections, preventive maintenance, cold room maintenance, refrigeration checklist",
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { "@type": "Organization", name: "Barcold Refrigeration Ltd" },
  publisher: {
    "@type": "Organization",
    name: "Barcold Refrigeration Ltd",
    logo: { "@type": "ImageObject", url: `${SITE}/barcold-logo.png` },
  },
  mainEntityOfPage: URL,
};

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Enter a valid email").max(255, "Email is too long"),
  phone: z.string().trim().max(20, "Phone is too long").optional(),
  company: z.string().trim().max(100, "Company name is too long").optional(),
  projectDescription: z.string().trim().min(10, "Please add a few details").max(2000, "Description is too long"),
});

type QuoteForm = z.infer<typeof quoteSchema>;

const MaintenanceChecklist = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteForm, string>>>({});
  const [form, setForm] = useState<QuoteForm>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectDescription:
      "I found your Commercial Refrigeration Maintenance Checklist and would like a tailored preventive maintenance / routine inspections plan for my equipment.",
  });

  const update = (field: keyof QuoteForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = quoteSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof QuoteForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof QuoteForm;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("quote_requests").insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        services: ["Maintenance & Repairs"],
        project_description: form.projectDescription,
      });
      if (error) throw error;
      supabase.functions.invoke("notify-quote", {
        body: {
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          company: form.company || undefined,
          services: ["Maintenance & Repairs"],
          projectDescription: form.projectDescription,
        },
      }).catch((err) => {
        if (import.meta.env.DEV) console.error("Notification failed:", err);
      });
      toast({
        title: "Quote Request Submitted!",
        description: "Our team will review your maintenance requirements and get back to you within 24–48 hours.",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectDescription:
          "I found your Commercial Refrigeration Maintenance Checklist and would like a tailored preventive maintenance / routine inspections plan for my equipment.",
      });
      setErrors({});
    } catch {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Commercial Refrigeration Maintenance Checklist"
        description="Reduce commercial refrigeration repair costs with this preventive maintenance checklist. Routine inspections for cold rooms, display chillers and kitchens."
        canonical="/blog/commercial-refrigeration-maintenance-checklist"
        type="article"
        jsonLd={articleJsonLd}
      />
      <Helmet>
        <meta name="keywords" content="commercial refrigeration repair, commercial refrigeration maintenance checklist, routine inspections, preventive maintenance, cold room maintenance, display chiller maintenance, refrigeration checklist Kenya, Barcold" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <article className="bg-background">
        <header className="bg-secondary section-padding">
          <div className="container-max max-w-4xl">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Expert Guide
            </span>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              Commercial Refrigeration Maintenance Checklist
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              Preventive routine inspections cut commercial refrigeration repair bills, protect stock, and extend equipment life.
              Barcold's field engineers use the schedule below across supermarkets, hotels, restaurants, and cold-storage facilities in Kenya.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">Published {new Date(PUBLISHED).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })} · 8 min read</p>
          </div>
        </header>

        <section className="section-padding">
          <div className="container-max max-w-4xl space-y-6">
            <h2 className="text-2xl font-bold md:text-3xl">Why preventive maintenance matters</h2>
            <p className="text-muted-foreground">
              Most emergency commercial refrigeration repair calls trace back to a missed routine inspection — a blocked
              condenser, a worn door gasket, low refrigerant charge from a slow leak. A structured maintenance plan catches
              these issues weeks before they cause downtime or spoil inventory. For Kenyan operators, where ambient
              temperatures and dust loads are high, the payoff is even larger: cleaner condensers run cooler, draw less
              current, and last years longer.
            </p>
            <p className="text-muted-foreground">
              Use the schedule below as a baseline. Heavy-duty installations — large cold rooms, blast freezers,
              supermarket multi-decks — typically need tighter intervals. Barcold tailors a contract to your specific
              equipment, load profile, and operating environment.
            </p>
          </div>
        </section>

        <section className="section-padding bg-secondary">
          <div className="container-max max-w-4xl">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl">Routine inspections by interval</h2>
            <div className="space-y-6">
              {schedule.map(({ cadence, icon: Icon, items }) => (
                <div key={cadence} className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-md bg-primary/10 p-2 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold">{cadence}</h3>
                  </div>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2 text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-max max-w-4xl space-y-6">
            <h2 className="text-2xl font-bold md:text-3xl">When to call for commercial refrigeration repair</h2>
            <p className="text-muted-foreground">
              Some symptoms can't wait for the next scheduled visit. Shut the unit down and call an engineer if you see:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2"><AlertTriangle className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /> Compressor short-cycling or tripping on overload.</li>
              <li className="flex gap-2"><AlertTriangle className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /> Cabinet temperatures climbing despite the compressor running continuously.</li>
              <li className="flex gap-2"><AlertTriangle className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /> Oil staining around joints, valves, or the compressor body — a refrigerant leak indicator.</li>
              <li className="flex gap-2"><AlertTriangle className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /> Heavy ice build-up on evaporator coils or suction lines.</li>
              <li className="flex gap-2"><AlertTriangle className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /> Burning smells, smoke, or breaker trips at the panel.</li>
            </ul>
            <p className="text-muted-foreground">
              Barcold offers 24/7 emergency response across Kenya — call <a className="text-primary underline" href="tel:+254742105866">+254&nbsp;742&nbsp;105&nbsp;866</a> any time.
            </p>
          </div>
        </section>

        <section className="section-padding bg-secondary">
          <div className="container-max max-w-4xl space-y-6">
            <h2 className="text-2xl font-bold md:text-3xl">What a Barcold maintenance contract includes</h2>
            <p className="text-muted-foreground">
              We package the routine inspections above into fixed-fee quarterly or monthly contracts. Each visit ends with
              a written report covering temperatures, electrical readings, refrigerant charge, and any recommended remedial
              work — so you have a paper trail for food-safety audits and insurers.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="flex gap-2 text-muted-foreground"><CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /> Priority emergency response</li>
              <li className="flex gap-2 text-muted-foreground"><CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /> Discounted parts and labour rates</li>
              <li className="flex gap-2 text-muted-foreground"><CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /> Genuine GMCC &amp; HITACHI spares</li>
              <li className="flex gap-2 text-muted-foreground"><CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" /> Compliance-ready service logs</li>
            </ul>
          </div>
        </section>

        <section className="section-padding bg-secondary">
          <div className="container-max max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border bg-card px-6">
                  <AccordionTrigger className="text-left font-heading font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-max max-w-5xl">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">Related maintenance guides</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                to="/services"
                className="group rounded-xl border bg-card p-5 transition hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Wrench className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-semibold group-hover:text-primary">Refrigeration Services</h3>
                <p className="mt-1 text-sm text-muted-foreground">Installation, repair, and planned maintenance for commercial kitchens and cold stores.</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  Read more <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                to="/catalogue"
                className="group rounded-xl border bg-card p-5 transition hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-semibold group-hover:text-primary">Equipment Catalogue</h3>
                <p className="mt-1 text-sm text-muted-foreground">Explore cold rooms, display chillers, pizza ovens, and kitchen workstations.</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  Browse products <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                to="/projects"
                className="group rounded-xl border bg-card p-5 transition hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-semibold group-hover:text-primary">Recent Projects</h3>
                <p className="mt-1 text-sm text-muted-foreground">See how we maintain and install refrigeration systems across Kenya.</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  View projects <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                to="/request-quote"
                className="group rounded-xl border bg-card p-5 transition hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-semibold group-hover:text-primary">Maintenance Quote</h3>
                <p className="mt-1 text-sm text-muted-foreground">Get a free on-site inspection and a tailored preventive maintenance plan.</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                  Request quote <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-max max-w-3xl">
            <div className="rounded-xl bg-primary p-8 text-primary-foreground md:p-12">
              <h2 className="text-2xl font-bold md:text-3xl">Request a Free Maintenance Quote</h2>
              <p className="mt-3 max-w-2xl opacity-90">
                Tell us about your equipment and we'll schedule a free on-site inspection, then send back a tailored preventive maintenance plan.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Full Name *</label>
                    <Input
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="John Doe"
                      maxLength={100}
                      className="bg-primary-foreground text-foreground placeholder:text-muted-foreground"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-200">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Email *</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="john@example.com"
                      maxLength={255}
                      className="bg-primary-foreground text-foreground placeholder:text-muted-foreground"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-200">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Phone</label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+254 700 000 000"
                      maxLength={20}
                      className="bg-primary-foreground text-foreground placeholder:text-muted-foreground"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-200">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Company / Organization</label>
                    <Input
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="Your company name"
                      maxLength={100}
                      className="bg-primary-foreground text-foreground placeholder:text-muted-foreground"
                    />
                    {errors.company && <p className="mt-1 text-xs text-red-200">{errors.company}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Service Interest</label>
                  <div className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-2 text-sm">
                    <Wrench className="h-4 w-4" />
                    Maintenance & Repairs
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">Project Details *</label>
                  <Textarea
                    value={form.projectDescription}
                    onChange={(e) => update("projectDescription", e.target.value)}
                    rows={4}
                    maxLength={2000}
                    className="bg-primary-foreground text-foreground placeholder:text-muted-foreground"
                  />
                  {errors.projectDescription && <p className="mt-1 text-xs text-red-200">{errors.projectDescription}</p>}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    variant="secondary"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Submit Quote Request
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Link to="/services">Browse Services</Link>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default MaintenanceChecklist;
