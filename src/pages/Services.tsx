import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Snowflake, Wind, ThermometerSnowflake, Wrench, Building2, ShieldCheck, UtensilsCrossed, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import serviceAircon from "@/assets/product-cassette-ac.webp";
import serviceColdroom from "@/assets/product-coldroom-branded.webp";
import serviceMaintenance from "@/assets/team-tech-repair.webp";
import serviceKitchen from "@/assets/kitchen-stainless-suite.webp";
import condensingUnits from "@/assets/untitled-00614.webp";
import compressorUnit from "@/assets/untitled-00452.webp";
import technicianWork from "@/assets/untitled-00561.webp";
import fanCloseup from "@/assets/untitled-00577.webp";

const services = [
  { icon: Snowflake, title: "Compressors & Condensing Units", image: compressorUnit, desc: "We supply GMCC and HITACHI compressors — rotary, scroll, inverter, and fixed-speed — alongside variable-temperature monoblock condensing units for cold-room applications ranging from -25 °C to +10 °C.", features: ["GMCC Rotary & Scroll", "HITACHI Inverter & Fixed Speed", "Monoblock condensing units", "R404A / R410A systems"] },
  { icon: Wind, title: "Air Conditioning Systems", image: condensingUnits, desc: "Complete AC solutions including universal control systems, DC/AC inverter boards, remote controls, air curtains, and installation accessories for residential and commercial properties.", features: ["Universal AC control kits", "1028–4000-in-1 remotes", "Air curtains", "Brackets & mountings"] },
  { icon: ThermometerSnowflake, title: "Cold Room Systems", image: fanCloseup, desc: "Indoor variable-temperature monoblock units with wall-mounted and top-type options. Storage sizes from 7 m³ to 120 m³, hot-gas defrost, 220 V or 380 V supply.", features: ["Wall-mounted monoblocks", "Top-type monoblocks", "7–120 m³ cold rooms", "Hot-gas defrost"] },
  { icon: Wrench, title: "Parts & Accessories", image: serviceMaintenance, desc: "Thermostats (TAM series, -35 °C to +10 °C), LP/HP/dual pressure controls, condensers, condensate pumps, AC cleaning covers, and anti-vibration mountings.", features: ["TAM thermostats", "LP / HP pressure controls", "Condensate pumps", "Anti-vibration mountings"] },
  { icon: Building2, title: "HVAC & Ventilation", image: serviceAircon, desc: "Full heating, ventilation, and air conditioning solutions for large-scale commercial and industrial facilities — design, engineering, ductwork fabrication, and building automation.", features: ["System design & engineering", "Ductwork fabrication", "Building automation", "Energy management"] },
  { icon: ShieldCheck, title: "Service & Maintenance", image: technicianWork, desc: "Preventive maintenance contracts, 24/7 emergency repairs, system commissioning, energy audits, retrofits, and operator training programs.", features: ["Preventive maintenance", "24/7 emergency repairs", "Energy audits", "System commissioning"], link: { to: "/blog/commercial-refrigeration-maintenance-checklist", label: "Read our maintenance checklist" } },
  { icon: UtensilsCrossed, title: "Kitchen Equipment", image: serviceKitchen, desc: "Supply, installation, and maintenance of commercial kitchen equipment — ovens, fryers, grills, dishwashers, food prep stations, and exhaust systems for restaurants, hotels, and catering businesses.", features: ["Commercial ovens & grills", "Dishwashers & steamers", "Exhaust & ventilation", "Equipment maintenance"] },
];

const Services = () => (
  <main className="pt-20">
    <SEO
      title="Refrigeration, HVAC & AC Services in Kenya"
      description="Compressors, cold rooms, AC, kitchen equipment, HVAC ventilation & 24/7 maintenance for commercial & industrial clients in Kenya."
      canonical="/services"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "HVAC and Refrigeration",
        "provider": { "@type": "LocalBusiness", "name": "Barcold Refrigeration Ltd" },
        "areaServed": { "@type": "Country", "name": "Kenya" },
        "url": "https://barcoldrefrigerationltd.co.ke/services"
      }}
    />
    <section className="section-padding bg-secondary">
      <div className="container-max">
        <SectionHeading as="h1" label="Our Services" title="Comprehensive Cooling Solutions" description="End-to-end refrigeration, air conditioning, and HVAC services for commercial, industrial, and residential clients." />
      </div>
    </section>

    <section className="section-padding">
      <div className="container-max space-y-16">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">{service.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{service.desc}</p>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="h-3 w-3 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              {service.link && (
                <Link to={service.link.to} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  {service.link.label} <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              )}
              <Button className="mt-6" asChild>
                <Link to="/contact">Request This Service</Link>
              </Button>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <img src={service.image} alt={service.title} className="rounded-xl shadow-lg" loading="lazy" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </main>
);

export default Services;
