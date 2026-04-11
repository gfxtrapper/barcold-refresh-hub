import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
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
  { image: projectHotel, title: "Movenpick Hotel", category: "Hospitality", desc: "Central HVAC system installation for the iconic 200+ room hotel in Nairobi." },
  { image: serviceColdroom, title: "Carrefour Hypermarket", category: "Commercial", desc: "Walk-in cold rooms and display refrigeration for new store openings." },
  { image: serviceAircon, title: "UAP Tower Offices", category: "Commercial", desc: "VRV air conditioning system for the 33-floor commercial tower." },
  { image: serviceMaintenance, title: "Bidco Africa Factory", category: "Industrial", desc: "Industrial cooling and process refrigeration for manufacturing plant." },
];

interface GalleryImage {
  id: string;
  title: string;
  caption: string | null;
  image_url: string;
}

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });
      if (data && data.length > 0) setGalleryImages(data);
    };
    fetchGallery();
  }, []);

  return (
    <main className="pt-20">
      <SEO
        title="Projects - Refrigeration & HVAC Installations in Kenya"
        description="View Barcold Refrigeration's completed projects — supermarket refrigeration, cold storage facilities, hotel HVAC systems & more across Kenya."
        canonical="/projects"
      />
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
                    <img src={project.image} alt={project.title} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
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

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-max">
            <SectionHeading label="Gallery" title="Our Work Gallery" description="Browse photos from our completed installations and projects." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group overflow-hidden rounded-xl bg-card shadow-sm"
                >
                  <div className="overflow-hidden">
                    <img
                      src={img.image_url}
                      alt={img.title}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm">{img.title}</p>
                    {img.caption && <p className="text-xs text-muted-foreground">{img.caption}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Projects;
