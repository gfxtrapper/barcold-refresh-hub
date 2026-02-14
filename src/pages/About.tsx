import { motion } from "framer-motion";
import { Award, Users, Target, Eye } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import serviceMaintenance from "@/assets/service-maintenance.jpg";
import serviceColdroom from "@/assets/service-coldroom.jpg";

const About = () => (
  <main className="pt-20">
    {/* Hero */}
    <section className="section-padding bg-secondary">
      <div className="container-max">
        <SectionHeading label="About Us" title="Building Trust Through Excellence" description="For over 20 years, Barcold Refrigeration has been Kenya's trusted partner in delivering world-class cooling and HVAC solutions." />
      </div>
    </section>

    {/* Story */}
    <section className="section-padding">
      <div className="container-max grid items-center gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h3 className="text-2xl font-bold">Our Story</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Founded in 2003, Barcold Refrigeration Ltd started as a small repair shop in Nairobi's Industrial Area. Today, we are one of East Africa's leading refrigeration, air conditioning, and HVAC solutions providers, serving over 500 commercial and industrial clients across Kenya.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Our team of certified engineers and technicians brings decades of combined experience, ensuring every project meets international standards of quality and reliability.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="grid grid-cols-2 gap-4">
          <img src={serviceMaintenance} alt="Barcold technician at work" className="rounded-xl shadow-lg" />
          <img src={serviceColdroom} alt="Cold room installation" className="mt-8 rounded-xl shadow-lg" />
        </motion.div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="section-padding bg-secondary">
      <div className="container-max grid gap-8 md:grid-cols-2">
        {[
          { icon: Target, title: "Our Mission", text: "To provide innovative, reliable, and energy-efficient refrigeration and HVAC solutions that protect our clients' investments and support Kenya's growing industries." },
          { icon: Eye, title: "Our Vision", text: "To be East Africa's most trusted name in refrigeration and climate control, setting the standard for quality, sustainability, and customer service." },
        ].map((item, i) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }} className="rounded-xl bg-card p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Why choose us */}
    <section className="section-padding">
      <div className="container-max">
        <SectionHeading label="Why Barcold" title="What Sets Us Apart" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Award, title: "Certified Engineers", desc: "Our team holds international certifications in refrigeration and HVAC systems." },
            { icon: Users, title: "500+ Happy Clients", desc: "Trusted by Kenya's top retailers, hotels, hospitals, and food processors." },
            { title: "Genuine Parts", desc: "We use only original manufacturer parts for all installations and repairs.", icon: Award },
            { title: "Full Warranty", desc: "Comprehensive warranty coverage on all our installations and services.", icon: Award },
          ].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }} className="rounded-xl border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <h4 className="font-heading font-semibold">{item.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default About;
