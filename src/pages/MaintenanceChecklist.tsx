import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Calendar, Wrench, AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

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

const MaintenanceChecklist = () => (
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

      <section className="section-padding">
        <div className="container-max max-w-4xl rounded-xl bg-primary p-8 text-primary-foreground md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">Book a maintenance audit</h2>
          <p className="mt-3 max-w-2xl opacity-90">
            Tell us about your equipment and we'll schedule a free on-site inspection, then send back a tailored preventive maintenance plan.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/request-quote">Request a Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/services">Browse Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </article>
  </>
);

export default MaintenanceChecklist;
