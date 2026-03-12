import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Snowflake, Wind, Wrench, Building2, ThermometerSnowflake, ShieldCheck, Clock, Award, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import heroImage from "@/assets/hero-refrigeration.jpg";
import serviceAircon from "@/assets/service-aircon.jpg";
import serviceColdroom from "@/assets/service-coldroom.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";
import projectSupermarket from "@/assets/project-supermarket.jpg";
import projectWarehouse from "@/assets/project-warehouse.jpg";
import projectHotel from "@/assets/project-hotel.jpg";

const services = [
  { icon: Snowflake, title: "Compressors & Condensing Units", desc: "GMCC & HITACHI rotary, scroll, and inverter compressors plus monoblock condensing units for every application." },
  { icon: Wind, title: "Air Conditioning Systems", desc: "Universal AC control systems, remote controls, split-system accessories, and air curtains." },
  { icon: ThermometerSnowflake, title: "Cold Room Solutions", desc: "Variable-temperature monoblock units, condensers, and cold-room systems from 7 m³ to 120 m³." },
  { icon: Wrench, title: "Parts & Accessories", desc: "Thermostats, pressure controls, brackets, anti-vibration mountings, and condensate pumps." },
  { icon: Building2, title: "HVAC & Ventilation", desc: "Complete heating, ventilation, and air conditioning solutions for commercial and industrial facilities." },
  { icon: ShieldCheck, title: "Service & Maintenance", desc: "Preventive maintenance, 24/7 emergency repairs, energy audits, and system commissioning." },
  { icon: Wrench, title: "Kitchen Equipment", desc: "Commercial kitchen equipment supply, installation, and maintenance for restaurants, hotels, and catering facilities." },
];

const stats = [
  { value: "6", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support Available" },
];

const projects = [
  { image: projectSupermarket, title: "Naivas Supermarket", category: "Commercial", desc: "Full refrigeration display system installation" },
  { image: projectWarehouse, title: "KTDA Cold Storage", category: "Industrial", desc: "Large-scale cold storage warehouse facility" },
  { image: projectHotel, title: "Movenpick Hotel", category: "Hospitality", desc: "Central HVAC system for 200+ room hotel" },
];

const testimonials = [
  { name: "James Mwangi", role: "Operations Manager, Naivas", text: "Barcold transformed our refrigeration systems across 15 branches. Professional, reliable, and always on time.", rating: 5 },
  { name: "Sarah Odhiambo", role: "Facility Manager, Sarova Hotels", text: "Their HVAC expertise is unmatched in East Africa. We've worked with them for over 8 years now.", rating: 5 },
  { name: "Peter Njoroge", role: "Director, Fresh Foods Ltd", text: "The cold room they built for us operates flawlessly. Excellent after-sales support and maintenance.", rating: 5 },
];

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Barcold commercial refrigeration system" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-nav/90 via-nav/70 to-nav/40" />
        </div>
        <div className="container-max relative z-10 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              Kenya's #1 Refrigeration & HVAC Experts
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-nav-foreground md:text-5xl lg:text-6xl">
              Cooling Solutions That{" "}
              <span className="text-gradient">Power Business</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-nav-foreground/70 md:text-xl">
              Compressors, condensing units, cold-room systems, AC controls &amp; HVAC accessories — we supply, install, and maintain cooling solutions that keep Kenya moving.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-nav-foreground/30 text-nav-foreground hover:bg-nav-foreground/10">
                <Link to="/services">Our Services <ChevronRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary">
        <div className="container-max grid grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary-foreground md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-primary-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            label="What We Do"
            title="Our Core Services"
            description="Comprehensive refrigeration, air conditioning, and HVAC solutions tailored to your needs."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link to="/services">View All Services <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading label="Why Barcold" title="Trusted by Kenya's Leading Businesses" center={false} />
              <div className="space-y-6">
                {[
                  { icon: Award, title: "26+ Years Expertise", desc: "Since 2019,delivering world-class cooling solutions across East Africa." },
                  { icon: Clock, title: "24/7 Emergency Service", desc: "Round-the-clock support to minimize downtime and protect your inventory." },
                  { icon: ShieldCheck, title: "Warranty & Guarantee", desc: "Comprehensive warranties on all installations and maintenance services." },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold">{item.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <img src={serviceAircon} alt="Air conditioning units" className="rounded-xl shadow-lg" />
              <img src={serviceColdroom} alt="Cold room interior" className="mt-8 rounded-xl shadow-lg" />
              <img src={serviceMaintenance} alt="HVAC maintenance" className="col-span-2 h-48 w-full rounded-xl object-cover shadow-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding">
        <div className="container-max">
          <SectionHeading
            label="Portfolio"
            title="Featured Projects"
            description="Explore some of our recent installations and custom solutions."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group overflow-hidden rounded-xl border bg-card"
              >
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{project.category}</span>
                  <h3 className="mt-1 font-heading text-lg font-semibold">{project.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link to="/projects">View All Projects <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <SectionHeading label="Testimonials" title="What Our Clients Say" />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="rounded-xl bg-card p-6 shadow-sm"
              >
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground italic">"{t.text}"</p>
                <div className="mt-4 border-t pt-4">
                  <p className="font-heading text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Contact us today for a free consultation and quote. Our team is ready to help with your refrigeration and HVAC needs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/contact">Request a Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="tel:+254742105866">Call Us Now</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
