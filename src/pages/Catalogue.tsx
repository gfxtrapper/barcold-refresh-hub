import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Snowflake, Wind, ThermometerSnowflake, Wrench, Building2, ShieldCheck, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/SectionHeading";
import serviceColdroom from "@/assets/service-coldroom.jpg";
import serviceAircon from "@/assets/service-aircon.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";

const categories = [
  {
    icon: Snowflake,
    title: "Commercial Refrigeration",
    image: serviceColdroom,
    products: [
      { name: "Display Cabinets", desc: "Upright and island display coolers for retail" },
      { name: "Bottle Coolers", desc: "Under-counter and freestanding beverage coolers" },
      { name: "Walk-In Coolers", desc: "Modular cold rooms from 2m³ to 100m³" },
      { name: "Chest Freezers", desc: "Commercial-grade deep freezers for bulk storage" },
      { name: "Ice Machines", desc: "Cube, flake and nugget ice makers" },
      { name: "Prep Tables", desc: "Refrigerated preparation and salad tables" },
    ],
  },
  {
    icon: ThermometerSnowflake,
    title: "Cold Room Systems",
    image: serviceColdroom,
    products: [
      { name: "Modular Cold Rooms", desc: "Custom panel cold rooms for any space" },
      { name: "Blast Freezers", desc: "Rapid freeze units for food processing" },
      { name: "Controlled Atmosphere", desc: "CA storage for fruits and produce" },
      { name: "Pharma Cold Chain", desc: "Temperature-validated pharmaceutical storage" },
      { name: "Condensing Units", desc: "Semi-hermetic and scroll compressor units" },
      { name: "Evaporators", desc: "Unit coolers for cold room applications" },
    ],
  },
  {
    icon: Wind,
    title: "Air Conditioning",
    image: serviceAircon,
    products: [
      { name: "Split Systems", desc: "Wall-mount and floor-standing split ACs" },
      { name: "Cassette Units", desc: "4-way ceiling cassette air conditioners" },
      { name: "VRV/VRF Systems", desc: "Multi-zone variable refrigerant flow systems" },
      { name: "Ducted Systems", desc: "Concealed duct air conditioning units" },
      { name: "Portable ACs", desc: "Mobile cooling for temporary needs" },
      { name: "Air Curtains", desc: "Door-mounted air barriers for efficiency" },
    ],
  },
  {
    icon: Building2,
    title: "HVAC & Ventilation",
    image: serviceAircon,
    products: [
      { name: "Chiller Plants", desc: "Air and water-cooled chiller systems" },
      { name: "AHU / FCU", desc: "Air handling and fan coil units" },
      { name: "Ductwork", desc: "GI and insulated duct fabrication" },
      { name: "BMS Controls", desc: "Building management and automation systems" },
      { name: "Exhaust Fans", desc: "Industrial and kitchen extraction systems" },
      { name: "Heat Pumps", desc: "Energy-efficient heating and cooling" },
    ],
  },
  {
    icon: Wrench,
    title: "Parts & Accessories",
    image: serviceMaintenance,
    products: [
      { name: "Compressors", desc: "Copeland, Bitzer, Danfoss compressors" },
      { name: "Expansion Valves", desc: "TEV and EEV valves for all systems" },
      { name: "Refrigerants", desc: "R134a, R404A, R410A, R290 gases" },
      { name: "Controllers", desc: "Digital temperature and humidity controllers" },
      { name: "Copper & Fittings", desc: "ACR copper tubes, fittings and insulation" },
      { name: "Filters & Driers", desc: "Liquid line and suction line filter driers" },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Service & Maintenance",
    image: serviceMaintenance,
    products: [
      { name: "Preventive Maintenance", desc: "Scheduled servicing contracts" },
      { name: "Emergency Repairs", desc: "24/7 breakdown response" },
      { name: "System Commissioning", desc: "Installation and start-up services" },
      { name: "Energy Audits", desc: "Efficiency analysis and optimization" },
      { name: "Retrofit & Upgrades", desc: "System modernization and upgrades" },
      { name: "Training", desc: "Operator and technician training programs" },
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Catalogue = () => (
  <main className="pt-20">
    {/* Hero */}
    <section className="section-padding bg-secondary">
      <div className="container-max flex flex-col items-center text-center">
        <SectionHeading
          label="Product Catalogue"
          title="Equipment & Solutions"
          description="Browse our full range of refrigeration, air conditioning, and HVAC products. From display cabinets to chiller plants — we supply, install, and maintain it all."
        />
        <Button asChild size="lg" className="gap-2">
          <a href="/BARCOLD_Refrigeration_catalog.pdf" download>
            <Download className="h-5 w-5" />
            Download Full Catalogue (PDF)
          </a>
        </Button>
      </div>
    </section>

    {/* Categories */}
    <section className="section-padding">
      <div className="container-max space-y-20">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Category header */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <cat.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{cat.title}</h3>
                <p className="text-sm text-muted-foreground">{cat.products.length} products</p>
              </div>
            </div>

            {/* Product grid */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {cat.products.map((product) => (
                <motion.div key={product.name} variants={item}>
                  <Card className="group h-full transition-shadow hover:shadow-md">
                    <CardContent className="flex items-start gap-3 p-5">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{product.desc}</p>
                      </div>
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
          Our engineers will help you select the right equipment for your project. Get a tailored recommendation and competitive quote.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="secondary" size="lg" asChild>
            <Link to="/request-quote" className="gap-2">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
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
