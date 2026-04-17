import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { supabase } from "@/integrations/supabase/client";

// Fallback images
import gallery1 from "@/assets/untitled-00497.webp";
import gallery2 from "@/assets/untitled-00574.webp";
import gallery3 from "@/assets/untitled-00614.webp";
import gallery4 from "@/assets/untitled-00561.webp";
import gallery5 from "@/assets/untitled-00577.webp";
import gallery6 from "@/assets/untitled-00452.webp";

interface GallerySlide {
  image: string;
  title: string;
  caption: string;
}

const fallbackSlides: GallerySlide[] = [
  { image: gallery1, title: "Showroom Display", caption: "Condensing units and evaporators ready for client delivery" },
  { image: gallery2, title: "Equipment Assembly Floor", caption: "Large-scale refrigeration equipment preparation and testing" },
  { image: gallery3, title: "Condensing Unit Range", caption: "Blue and white condensing units in various capacities" },
  { image: gallery4, title: "Compressor Installation", caption: "Technician wiring and commissioning a condensing unit" },
  { image: gallery5, title: "Evaporator Fan Detail", caption: "Close-up of a blue evaporator fan assembly" },
  { image: gallery6, title: "Barcold Branded Unit", caption: "Compressor unit with Barcold Refrigeration branding" },
];

const GallerySlideshow = () => {
  const [slides, setSlides] = useState<GallerySlide[]>(fallbackSlides);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // Fetch real gallery images from database
  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (data && data.length > 0) {
        setSlides(
          data.map((img: any) => ({
            image: img.image_url,
            title: img.title,
            caption: img.caption || "",
          }))
        );
      }
    };
    fetchGallery();
  }, []);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, slides.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
  }, [current, slides.length, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // Reset current if slides change and index is out of bounds
  useEffect(() => {
    if (current >= slides.length) setCurrent(0);
  }, [slides.length, current]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  if (slides.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container-max">
        <SectionHeading
          label="Gallery"
          title="Our Work in Action"
          description="A showcase of our completed refrigeration, HVAC, and kitchen equipment installations."
        />
        <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg">
          <div className="relative aspect-[16/9] w-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={slides[current].image}
                  alt={slides[current].title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  width={1280}
                  height={720}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-xl font-bold text-white md:text-2xl">{slides[current].title}</h3>
                  <p className="mt-1 text-sm text-white/80 md:text-base">{slides[current].caption}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 p-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySlideshow;
