import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-nav/95 backdrop-blur-md shadow-lg" : "bg-nav/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-max flex items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold font-heading text-primary-foreground">B</span>
          </div>
          <div>
            <span className="text-lg font-bold font-heading text-nav-foreground">Barcold</span>
            <span className="hidden text-xs text-nav-foreground/60 sm:block">Refrigeration Ltd</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-primary/20 text-primary-foreground"
                  : "text-nav-foreground/70 hover:text-nav-foreground hover:bg-nav-foreground/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+254700000000" className="flex items-center gap-2 text-sm text-nav-foreground/80">
            <Phone className="h-4 w-4" />
            +254 700 000 000
          </a>
          <Button asChild>
            <Link to="/request-quote">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-nav-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="border-t border-nav-foreground/10 bg-nav px-4 py-4 lg:hidden animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-primary/20 text-primary-foreground"
                  : "text-nav-foreground/70 hover:text-nav-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 border-t border-nav-foreground/10 pt-4">
            <Button asChild className="w-full">
              <Link to="/request-quote">Get a Free Quote</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
