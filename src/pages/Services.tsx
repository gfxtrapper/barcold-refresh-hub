import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Snowflake, Wind, ThermometerSnowflake, Wrench, Building2, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import serviceAircon from "@/assets/service-aircon.jpg";
import serviceColdroom from "@/assets/service-coldroom.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";

const services = [
  { icon: Snowflake, title: "Commercial Refrigeration", image: serviceColdroom, desc: "We design, supply, install, and maintain a full range of commercial refrigeration systems including display cases, bottle coolers, walk-in coolers, and freezer rooms. Our solutions serve supermarkets, restaurants, and food processing plants across Kenya.", features: ["Display cabinets & coolers", "Walk-in cold rooms", "Blast freezers", "Ice machines"] },
  { icon: Wind, title: "Air Conditioning", image: serviceAircon, desc: "From split units to VRV/VRF central systems, we provide complete air conditioning solutions. Our team handles design, installation, commissioning, and ongoing maintenance for offices, hotels, hospitals, and residential properties.", features: ["Split & cassette units", "VRV/VRF systems", "Ducted systems", "Chiller plants"] },
  { icon: ThermometerSnowflake, title: "Cold Room Construction", image: serviceColdroom, desc: "Custom-designed cold rooms and blast freezers built to your exact specifications. We use premium insulated panels and energy-efficient refrigeration systems to ensure optimal temperature control and minimal running costs.", features: ["Modular cold rooms", "Blast freezers", "Controlled atmosphere storage", "Pharmaceutical cold chain"] },
  { icon: Wrench, title: "Maintenance & Repairs", image: serviceMaintenance, desc: "Our preventive maintenance programs keep your equipment running efficiently year-round. With 24/7 emergency response, we minimize downtime and extend the life of your refrigeration and HVAC systems.", features: ["Preventive maintenance contracts", "24/7 emergency repairs", "System diagnostics", "Performance optimization"] },
  { icon: Building2, title: "HVAC Systems", image: serviceAircon, desc: "Complete heating, ventilation, and air conditioning solutions for commercial and industrial facilities. From design and engineering to installation and commissioning, we handle projects of any scale.", features: ["System design & engineering", "Ductwork fabrication", "Building automation", "Energy management"] },
  { icon: ShieldCheck, title: "Energy Audits", image: serviceMaintenance, desc: "Our energy audit services help you identify inefficiencies in your cooling systems and develop strategies to reduce energy consumption by up to 30%, lowering operational costs while maintaining optimal performance.", features: ["System efficiency analysis", "Cost reduction strategies", "Equipment upgrade recommendations", "Sustainability reporting"] },
];

const Services = () => (
  <main className="pt-20">
    <section className="section-padding bg-secondary">
      <div className="container-max">
        <SectionHeading label="Our Services" title="Comprehensive Cooling Solutions" description="End-to-end refrigeration, air conditioning, and HVAC services for commercial, industrial, and residential clients." />
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
              <Button className="mt-6" asChild>
                <Link to="/contact">Request This Service</Link>
              </Button>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <img src={service.image} alt={service.title} className="rounded-xl shadow-lg" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  </main>
);

export default Services;
