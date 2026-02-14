import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHeading from "@/components/SectionHeading";

const faqs = [
  { q: "What areas in Kenya do you serve?", a: "We serve clients across Kenya, with primary operations in Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret. We also undertake projects in neighboring East African countries." },
  { q: "Do you offer emergency repair services?", a: "Yes! We provide 24/7 emergency repair services. Our technicians are always on standby to respond to urgent breakdowns and minimize downtime for your business." },
  { q: "What brands of equipment do you work with?", a: "We work with all major refrigeration and HVAC brands including Carrier, Daikin, Bitzer, Copeland, Danfoss, and more. We source genuine parts directly from manufacturers." },
  { q: "How long does a typical installation take?", a: "Installation timelines vary based on project scope. A standard split AC unit takes 4-6 hours, while a complete cold room installation can take 2-4 weeks. We provide detailed timelines during consultation." },
  { q: "Do you offer maintenance contracts?", a: "Yes, we offer customized preventive maintenance contracts that include regular inspections, cleaning, gas top-ups, and priority emergency response at discounted rates." },
  { q: "What warranty do you provide?", a: "We offer a standard 12-month warranty on all installations covering parts and labor. Extended warranties of up to 3 years are available on select equipment and services." },
  { q: "Can you help reduce our energy costs?", a: "Absolutely. Our energy audit services identify inefficiencies in your cooling systems. We've helped clients reduce energy consumption by up to 30% through equipment upgrades and optimization." },
  { q: "Do you provide financing options?", a: "We work with select financial partners to offer flexible payment plans for large-scale installations. Contact us to discuss financing options tailored to your budget." },
];

const FAQ = () => (
  <main className="pt-20">
    <section className="section-padding bg-secondary">
      <div className="container-max">
        <SectionHeading label="FAQ" title="Frequently Asked Questions" description="Find answers to common questions about our services and processes." />
      </div>
    </section>

    <section className="section-padding">
      <div className="container-max max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border bg-card px-6">
              <AccordionTrigger className="text-left font-heading font-semibold hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  </main>
);

export default FAQ;
