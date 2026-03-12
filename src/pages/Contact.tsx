import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SectionHeading from "@/components/SectionHeading";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message Sent!", description: "Thank you for reaching out. We'll get back to you within 24 hours." });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <main className="pt-20">
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <SectionHeading label="Contact" title="Get In Touch" description="Have a project in mind? Reach out to us for a free consultation and quote." />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-6 lg:col-span-2">
            <h3 className="text-xl font-bold">Contact Information</h3>
            <p className="text-muted-foreground">We'd love to hear from you. Reach out via any of the channels below.</p>
            {[
              { icon: MapPin, label: "Address", value: "Jowin Shopping Arcade, Ruai Eastern Bypass\nNairobi, Kenya" },
              { icon: Phone, label: "Phone", value: "+254 742 105 866\n+254 786 839 306" },
              { icon: Mail, label: "Email", value: "info@barcoldrefrigerationltd.co.ke" },
              { icon: Clock, label: "Working Hours", value: "Mon–Fri: 8AM – 6PM\nSat: 9AM – 1PM" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="whitespace-pre-line text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="overflow-hidden rounded-xl border">
              <iframe
                title="Barcold Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.843553312673!2d36.979322474045546!3d1.2665441356029272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f6b4edd48cbff%3A0x1dc86afd9ee2a40e!2sHybrid%20Kenya!5e0!3m2!1sen!2ske!4v1772377769576!5m2!1sen!2ske"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-3">
            <div className="rounded-xl border bg-card p-8">
              <h3 className="mb-6 text-xl font-bold">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Full Name *</label>
                    <Input id="name" name="name" placeholder="John Doe" required maxLength={100} />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email *</label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required maxLength={255} />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">Phone</label>
                    <Input id="phone" name="phone" type="tel" placeholder="+254 700 000 000" maxLength={20} />
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-sm font-medium">Service Needed</label>
                    <select id="service" name="service" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="">Select a service</option>
                      <option>Commercial Refrigeration</option>
                      <option>Air Conditioning</option>
                      <option>Cold Room Construction</option>
                      <option>Maintenance & Repairs</option>
                      <option>HVAC Systems</option>
                      <option>Kitchen Equipment</option>
                      <option>Energy Audit</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">Budget Range (KES)</label>
                    <select id="budget" name="budget" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="">Select your budget</option>
                      <option>Under 50,000</option>
                      <option>50,000 – 100,000</option>
                      <option>100,000 – 250,000</option>
                      <option>250,000 – 500,000</option>
                      <option>500,000 – 1,000,000</option>
                      <option>1,000,000 – 5,000,000</option>
                      <option>Above 5,000,000</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="mb-1.5 block text-sm font-medium">Preferred Timeline</label>
                    <select id="timeline" name="timeline" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <option value="">Select timeline</option>
                      <option>Urgent (within 1 week)</option>
                      <option>1 – 2 weeks</option>
                      <option>1 month</option>
                      <option>2 – 3 months</option>
                      <option>Flexible / No rush</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="scope" className="mb-1.5 block text-sm font-medium">What do you need done? *</label>
                  <Textarea id="scope" name="scope" placeholder="Describe the work needed — e.g. type of equipment, number of units, location, size of space, any specific requirements..." rows={4} required maxLength={2000} />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Additional Notes</label>
                  <Textarea id="message" name="message" placeholder="Any other details, preferences, or questions..." rows={3} maxLength={2000} />
                </div>
                <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                  {loading ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
