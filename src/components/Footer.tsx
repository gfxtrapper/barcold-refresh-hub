import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import barcoldLogo from "@/assets/barcold-logo.png";

const Footer = () => {
  return (
    <footer className="bg-nav text-nav-foreground">
      <div className="container-max section-padding">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={barcoldLogo} alt="Barcold Refrigeration Ltd" className="h-12 w-auto brightness-0 invert hover-scale" />
            </div>
            <p className="text-sm text-nav-foreground/60 leading-relaxed">
              Kenya's premier refrigeration, air conditioning & HVAC solutions provider since 2019.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-nav-foreground/10 text-nav-foreground/60 transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-heading font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-nav-foreground/60">
              {["About", "Services", "Catalogue", "Projects", "FAQ", "Contact"].map((l) => (
                <li key={l}>
                  <Link to={`/${l.toLowerCase()}`} className="transition-colors hover:text-nav-foreground">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-heading font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-nav-foreground/60">
              {["Compressors & Units", "Air Conditioning", "Cold Room Systems", "Parts & Accessories", "Service & Maintenance", "Kitchen Equipment"].map((s) => (
                <li key={s}>
                  <Link to="/services" className="transition-colors hover:text-nav-foreground">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-heading font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm text-nav-foreground/60">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Jowin Shopping Arcade, Ruai Eastern Bypass, Nairobi
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+254742105866" className="hover:text-nav-foreground">+254 742 105 866</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+254786839306" className="hover:text-nav-foreground">+254 786 839 306</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@barcoldrefrigerationltd.co.ke" className="hover:text-nav-foreground">info@barcoldrefrigerationltd.co.ke</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-nav-foreground/10 pt-6 text-center text-xs text-nav-foreground/40">
          © {new Date().getFullYear()} Barcold Refrigeration Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
