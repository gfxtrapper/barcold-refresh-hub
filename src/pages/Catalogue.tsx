import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Download,
  Snowflake,
  Wind,
  ThermometerSnowflake,
  Wrench,
  Gauge,
  Fan,
  Droplets,
  Brackets,
  SprayCan,
  ChevronRight,
  ArrowRight,
  Cpu,
  Thermometer,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SectionHeading from "@/components/SectionHeading";

/* ------------------------------------------------------------------ */
/*  CATALOGUE DATA — from Barcold Refrigeration product profile       */
/* ------------------------------------------------------------------ */

const categories = [
  {
    id: "compressors",
    icon: Cpu,
    title: "Compressors",
    subtitle: "GMCC & HITACHI — Rotary, Scroll, Inverter, Fixed Speed",
    products: [
      {
        name: "GMCC Rotary Inverter Compressors",
        specs: [
          "COP increased by 8%",
          "APF increased by 6%",
          "3 dB lower noise",
          "50% less airflow pulsation",
          "For inverter AC systems",
        ],
      },
      {
        name: "GMCC Scroll AC Compressors",
        specs: [
          "High-efficiency scroll technology",
          "Residential & commercial AC",
          "Strong cooling capacity",
        ],
      },
      {
        name: "HITACHI Fixed Speed (Refrigeration)",
        specs: [
          "High compression ratio",
          "High efficiency at low temp",
          "EN12900 MT test conditions",
          "Medium temperature refrigeration",
        ],
      },
      {
        name: "HITACHI Scroll (R410A DC Inverter)",
        specs: [
          "200-220 V & 380-415 V options",
          "10–100 RPS speed range",
          "Up to 88,387 BTU/h cooling",
          "COP up to 3.27 W/W",
        ],
      },
    ],
  },
  {
    id: "monoblock",
    icon: Snowflake,
    title: "Cold Room & Monoblock Units",
    subtitle: "Indoor Variable-Temperature Monoblock Condensing Units",
    products: [
      {
        name: "Wall-Mounted Monoblock (R404A)",
        specs: [
          "Storage: -25 °C to +10 °C",
          "Ambient: +35 °C",
          "1.5 HP – 4 HP range",
          "Hot-gas defrost",
          "220 V/1φ or 380 V/3φ",
        ],
      },
      {
        name: "Top-Type Monoblock (R404A)",
        specs: [
          "-25 °C storage: 7–20 m³",
          "+5 °C storage: 30–120 m³",
          "100 mm panel thickness",
          "Air-cooled system",
        ],
      },
    ],
  },
  {
    id: "condensers",
    icon: Fan,
    title: "Condensers",
    subtitle: "Air-cooled condensers for medium & high temperature applications",
    products: [
      {
        name: "Air-Cooled Condensers",
        specs: [
          "Fan Ø 200–350 mm",
          "Airflow 530–2 270 m³/h",
          "Heat exchange 0.9–2.7 kW",
          "R134A refrigerant",
          "-10 °C to +15 °C range",
          "Compatible: EMBRACO, TECUMSEH",
        ],
      },
    ],
  },
  {
    id: "thermostats",
    icon: Thermometer,
    title: "Thermostats & Pressure Controls",
    subtitle: "TAM-series thermostats, LP/HP & dual pressure controls",
    products: [
      {
        name: "TAM Series Thermostats",
        specs: [
          "Ranges: -35 to -10 °C, -27 to -20 °C, -10 to +10 °C",
          "Various capillary lengths",
          "Warm / Normal / Cold settings",
          "Icemaker thermostat options",
        ],
      },
      {
        name: "Low Pressure Controls",
        specs: [
          "-0.9 to 7.5 MPa range",
          "Auto or manual reset",
          "SPDT contact system",
        ],
      },
      {
        name: "High Pressure Controls",
        specs: [
          "Up to 32 MPa",
          "Fixed or adjustable differential",
          "Automatic reset",
        ],
      },
      {
        name: "Dual Pressure Controls",
        specs: [
          "Combined high/low monitoring",
          "Manual or auto reset",
          "Max 3.3 MPa working pressure",
        ],
      },
    ],
  },
  {
    id: "ac-controls",
    icon: Radio,
    title: "Universal AC Control Systems",
    subtitle: "Boards, remotes & inverter control kits for DC/AC split systems",
    products: [
      {
        name: "Universal AC Control Board Kit",
        specs: [
          "5 working modes, 3 fan speeds",
          "Auto fan & defrost",
          "Timer on/off, sleep mode",
          "AC 180–240 V input",
          "Max output 11 A / 100 Hz",
          "Includes indoor board, remote, outdoor inverter board",
        ],
      },
      {
        name: "Universal AC Remote Controls",
        specs: [
          "1028 / 2000 / 4000-in-1 code DB",
          "LCD backlight & large keys",
          "Clock & permanent memory",
          "Intelligent cool/heat modes",
        ],
      },
    ],
  },
  {
    id: "accessories",
    icon: Wrench,
    title: "Installation Accessories",
    subtitle: "Brackets, anti-vibration mountings & hardware",
    products: [
      {
        name: "AC Outdoor Unit Brackets",
        specs: [
          "150–300 kg load capacity",
          "9 000–36 000 BTU compatibility",
          "Steel, RAL 9003 finish",
          "1.7–2 mm thickness",
          "BK-A / BK-D / BK-C / BK-O series",
        ],
      },
      {
        name: "Rubber Anti-Vibration Mountings",
        specs: [
          "For AC & refrigeration systems",
          "Reduces vibration & noise",
        ],
      },
    ],
  },
  {
    id: "pumps",
    icon: Droplets,
    title: "Pumps & Drainage",
    subtitle: "Condensate water pumps for split & commercial systems",
    products: [
      {
        name: "Mini Split Condensate Pump",
        specs: [
          "Max 12 L/h flow",
          "< 25 dB sound level",
          "35 ml tank, < 16 W",
          "Suits units up to 10 kW (30 000 BTU/h)",
        ],
      },
      {
        name: "High Capacity Condensate Pump",
        specs: [
          "Max 50 L/h flow",
          "200 ml tank, 5 m head",
          "< 55 dB, 58 W power",
        ],
      },
    ],
  },
  {
    id: "cleaning",
    icon: SprayCan,
    title: "Cleaning & Maintenance",
    subtitle: "AC cleaning covers & maintenance accessories",
    products: [
      {
        name: "AC Cleaning Covers",
        specs: [
          "9 000–36 000 BTU units",
          "Medium & Large sizes",
          "2.4–3.2 m circumference",
          "70–130 cm unit lengths",
        ],
      },
    ],
  },
  {
    id: "air-curtains",
    icon: Wind,
    title: "Air Curtains",
    subtitle: "Commercial air curtain solutions for doorways",
    products: [
      {
        name: "Commercial Air Curtains",
        specs: [
          "Energy saving design",
          "Temperature zone separation",
          "Various widths available",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                */
/* ------------------------------------------------------------------ */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                         */
/* ------------------------------------------------------------------ */

const Catalogue = () => (
  <main className="pt-20">
    {/* Hero */}
    <section className="section-padding bg-secondary">
      <div className="container-max flex flex-col items-center text-center">
        <SectionHeading
          label="Product Catalogue"
          title="Equipment & Solutions"
          description="Barcold Refrigeration supplies a comprehensive range of compressors, condensing units, cold-room systems, control systems, HVAC accessories, and spare parts for residential, commercial, and industrial applications."
        />
        <Button asChild size="lg" className="gap-2">
          <a href="/BARCOLD_Refrigeration_catalog.pdf" download>
            <Download className="h-5 w-5" />
            Download Full Catalogue (PDF)
          </a>
        </Button>
      </div>
    </section>

    {/* Quick-jump tabs (mobile-scrollable) */}
    <section className="sticky top-[60px] z-30 border-b bg-background/95 backdrop-blur">
      <div className="container-max overflow-x-auto py-2">
        <div className="flex gap-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <cat.icon className="h-3.5 w-3.5" />
              {cat.title}
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="section-padding">
      <div className="container-max space-y-24">
        {categories.map((cat) => (
          <motion.div
            id={cat.id}
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="scroll-mt-32"
          >
            {/* Category header */}
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <cat.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{cat.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cat.subtitle}</p>
              </div>
            </div>

            {/* Product cards */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {cat.products.map((product) => (
                <motion.div key={product.name} variants={item}>
                  <Card className="group h-full transition-shadow hover:shadow-md">
                    <CardContent className="p-5">
                      <h4 className="font-semibold">{product.name}</h4>
                      <ul className="mt-3 space-y-1.5">
                        {product.specs.map((spec) => (
                          <li
                            key={spec}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="link"
                        size="sm"
                        asChild
                        className="mt-4 h-auto p-0 text-primary"
                      >
                        <Link to="/request-quote">
                          Request Quote <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-max text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Need Help Choosing?</h2>
        <p className="mx-auto mt-4 max-w-xl opacity-90">
          Our engineers will help you select the right compressor, condensing unit, or control system for your project. Get a tailored recommendation and competitive quote.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="secondary" size="lg" asChild>
            <Link to="/request-quote" className="gap-2">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <a href="/BARCOLD_Refrigeration_catalog.pdf" download className="gap-2">
              <Download className="h-4 w-4" /> Download PDF
            </a>
          </Button>
        </div>
      </div>
    </section>
  </main>
);

export default Catalogue;
