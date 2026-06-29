import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import Lightbox from "@/components/Lightbox";
import { supabase } from "@/integrations/supabase/client";
import showroomDisplay from "@/assets/untitled-00497.webp";
import equipmentFloor from "@/assets/untitled-00574.webp";
import condensingUnits from "@/assets/untitled-00614.webp";
import technicianWork from "@/assets/untitled-00561.webp";
import compressorUnit from "@/assets/untitled-00452.webp";
import workshopInterior from "@/assets/untitled-00610.webp";
import multideckFridge from "@/assets/product-multideck-fridge.webp";
import pizzaOven from "@/assets/product-pizza-oven.webp";
import kitchenFryer from "@/assets/kitchen-fryer.webp";

const categories = ["All", "Commercial", "Industrial", "Hospitality"];

const projects = [
  { image: showroomDisplay, title: "Showroom Equipment Display", category: "Commercial", desc: "Full range of condensing units and evaporators prepared for client installations across Kenya." },
  { image: condensingUnits, title: "Condensing Unit Assembly", category: "Industrial", desc: "Blue and white condensing units in various capacities for cold room applications." },
  { image: multideckFridge, title: "Supermarket Multideck Chillers", category: "Commercial", desc: "Open-front multideck refrigerated display cases for supermarket beverage and dairy aisles." },
  { image: equipmentFloor, title: "Equipment Preparation Floor", category: "Commercial", desc: "Large-scale refrigeration equipment assembly, testing, and quality control." },
  { image: technicianWork, title: "Compressor Commissioning", category: "Industrial", desc: "Technician wiring and commissioning condensing units for deployment." },
  { image: compressorUnit, title: "Branded Compressor Units", category: "Commercial", desc: "Barcold-branded monoblock condensing units ready for cold room installation." },
  { image: pizzaOven, title: "Restaurant Pizza Oven Install", category: "Hospitality", desc: "Commercial deck pizza oven supplied and installed for a Nairobi restaurant kitchen." },
  { image: kitchenFryer, title: "Commercial Kitchen Fryer Setup", category: "Hospitality", desc: "Heavy-duty deep fryer installation for a high-volume hospitality client." },
  { image: workshopInterior, title: "Workshop & Inventory", category: "Industrial", desc: "Parts, accessories, and refrigeration equipment inventory at our Nairobi facility." },
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
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; caption?: string } | null>(null);
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
          <SectionHeading as="h1" label="Portfolio" title="Our Projects" description="Explore our track record of successful installations across Kenya." />
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
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: project.image, alt: project.title, caption: project.desc })}
                    className="block w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={`View ${project.title} full-size`}
                  >
                    <img src={project.image} alt={project.title} className="h-56 w-full cursor-zoom-in object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </button>
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
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: img.image_url, alt: img.title, caption: img.caption || undefined })}
                    className="block w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label={`View ${img.title} full-size`}
                  >
                    <img
                      src={img.image_url}
                      alt={img.title}
                      className="h-48 w-full cursor-zoom-in object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </button>
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

      <Lightbox
        src={lightbox?.src ?? null}
        alt={lightbox?.alt}
        caption={lightbox?.caption}
        onClose={() => setLightbox(null)}
      />
    </main>
  );
};

export default Projects;
