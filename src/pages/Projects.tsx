import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import projectSupermarket from "@/assets/project-supermarket.jpg";
import projectWarehouse from "@/assets/project-warehouse.jpg";
import projectHotel from "@/assets/project-hotel.jpg";
import serviceColdroom from "@/assets/service-coldroom.jpg";
import serviceAircon from "@/assets/service-aircon.jpg";
import serviceMaintenance from "@/assets/service-maintenance.jpg";

const categories = ["All", "Commercial", "Industrial", "Hospitality"];

const projects = [
  { image: projectSupermarket, title: "Naivas Supermarket Chain", category: "Commercial", desc: "Installed refrigeration display systems across 15 branches nationwide." },
  { image: projectWarehouse, title: "KTDA Cold Storage Facility", category: "Industrial", desc: "Designed and built a 5,000 sq ft cold storage warehouse for tea processing." },
  { image: projectHotel, title: "Sarova Stanley Hotel", category: "Hospitality", desc: "Central HVAC system installation for the iconic 200+ room hotel in Nairobi." },
  { image: serviceColdroom, title: "Carrefour Hypermarket", category: "Commercial", desc: "Walk-in cold rooms and display refrigeration for new store openings." },
  { image: serviceAircon, title: "UAP Tower Offices", category: "Commercial", desc: "VRV air conditioning system for the 33-floor commercial tower." },
  { image: serviceMaintenance, title: "Bidco Africa Factory", category: "Industrial", desc: "Industrial cooling and process refrigeration for manufacturing plant." },
];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main className="pt-20">
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <SectionHeading label="Portfolio" title="Our Projects" description="Explore our track record of successful installations across Kenya." />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          {/* Filters */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  filter === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-xl border bg-card"
                >
                  <div className="overflow-hidden">
                    <img src={project.image} alt={project.title} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{project.category}</span>
                    <h3 className="mt-1 font-heading text-lg font-semibold">{project.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{project.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;
