import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Send, Building2, User, ClipboardList, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SectionHeading from "@/components/SectionHeading";
import { supabase } from "@/integrations/supabase/client";

const steps = [
  { label: "Your Info", icon: User },
  { label: "Project Details", icon: ClipboardList },
  { label: "Requirements", icon: Building2 },
  { label: "Budget & Review", icon: DollarSign },
];

const serviceOptions = [
  "Commercial Refrigeration",
  "Air Conditioning",
  "Cold Room Construction",
  "Maintenance & Repairs",
  "HVAC Systems",
  "Kitchen Equipment",
  "Energy Audit",
];

const propertyTypes = ["Supermarket / Retail", "Hotel / Restaurant", "Hospital / Clinic", "Office Building", "Factory / Warehouse", "Residential", "Other"];

const RequestQuote = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    services: [] as string[], propertyType: "", location: "", projectDescription: "",
    spaceSize: "", numberOfUnits: "", existingSystem: "", specialRequirements: "",
    budget: "", timeline: "", howHeard: "", additionalNotes: "",
  });

  const update = (field: string, value: string | string[]) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleService = (s: string) => {
    const current = form.services;
    update("services", current.includes(s) ? current.filter((x) => x !== s) : [...current, s]);
  };

  const canProceed = () => {
    if (currentStep === 0) return form.name.trim() && form.email.trim();
    if (currentStep === 1) return form.services.length > 0 && form.projectDescription.trim();
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("quote_requests").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        company: form.company.trim() || null,
        services: form.services,
        property_type: form.propertyType || null,
        location: form.location.trim() || null,
        project_description: form.projectDescription.trim(),
        space_size: form.spaceSize.trim() || null,
        number_of_units: form.numberOfUnits.trim() || null,
        existing_system: form.existingSystem || null,
        special_requirements: form.specialRequirements.trim() || null,
        budget: form.budget || null,
        timeline: form.timeline || null,
        how_heard: form.howHeard || null,
        additional_notes: form.additionalNotes.trim() || null,
      });
      if (error) throw error;
      // Fire-and-forget email notification (don't block the user)
      supabase.functions.invoke("notify-quote", {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          company: form.company.trim() || undefined,
          services: form.services,
          propertyType: form.propertyType || undefined,
          location: form.location.trim() || undefined,
          projectDescription: form.projectDescription.trim(),
          budget: form.budget || undefined,
          timeline: form.timeline || undefined,
        },
      }).catch((err) => console.error("Notification failed:", err));
      toast({ title: "Quote Request Submitted!", description: "Our team will review your project and get back to you within 24–48 hours with a detailed quote." });
      setCurrentStep(0);
      setForm({ name: "", email: "", phone: "", company: "", services: [], propertyType: "", location: "", projectDescription: "", spaceSize: "", numberOfUnits: "", existingSystem: "", specialRequirements: "", budget: "", timeline: "", howHeard: "", additionalNotes: "" });
    } catch {
      toast({ title: "Submission Failed", description: "Something went wrong. Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const selectClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <main className="pt-20">
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <SectionHeading label="Get a Quote" title="Request a Detailed Quote" description="Tell us about your project and we'll prepare a comprehensive, no-obligation quote tailored to your needs." />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max max-w-3xl">
          {/* Stepper */}
          <div className="mb-10 flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step.label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                      i < currentStep
                        ? "border-primary bg-primary text-primary-foreground"
                        : i === currentStep
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < currentStep ? <Check className="h-5 w-5" /> : <step.icon className="h-4 w-4" />}
                  </div>
                  <span className={`hidden text-xs font-medium sm:block ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`mx-2 h-0.5 flex-1 rounded transition-colors ${i < currentStep ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="rounded-xl border bg-card p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Info */}
              {currentStep === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-5">
                  <h3 className="text-lg font-bold">Your Information</h3>
                  <p className="text-sm text-muted-foreground">Let us know who you are so we can get back to you.</p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Full Name *</label>
                      <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="John Doe" maxLength={100} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Email *</label>
                      <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="john@example.com" maxLength={255} />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Phone</label>
                      <Input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+254 700 000 000" maxLength={20} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Company / Organization</label>
                      <Input value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Your company name" maxLength={100} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-5">
                  <h3 className="text-lg font-bold">Project Details</h3>
                  <p className="text-sm text-muted-foreground">Select the services you need and describe your project.</p>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Services Needed * (select all that apply)</label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {serviceOptions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={`rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-all ${
                            form.services.includes(s)
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-background text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Property Type</label>
                      <select value={form.propertyType} onChange={(e) => update("propertyType", e.target.value)} className={selectClass}>
                        <option value="">Select type</option>
                        {propertyTypes.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Project Location</label>
                      <Input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Westlands, Nairobi" maxLength={200} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Project Description *</label>
                    <Textarea value={form.projectDescription} onChange={(e) => update("projectDescription", e.target.value)} placeholder="Describe what you need — the more detail, the more accurate our quote will be..." rows={4} maxLength={2000} />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Requirements */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-5">
                  <h3 className="text-lg font-bold">Technical Requirements</h3>
                  <p className="text-sm text-muted-foreground">Help us understand the scope — all fields are optional.</p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Space Size (sq ft / sq m)</label>
                      <Input value={form.spaceSize} onChange={(e) => update("spaceSize", e.target.value)} placeholder="e.g. 2,000 sq ft" maxLength={50} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Number of Units / Rooms</label>
                      <Input value={form.numberOfUnits} onChange={(e) => update("numberOfUnits", e.target.value)} placeholder="e.g. 5 AC units, 2 cold rooms" maxLength={100} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Existing System (if any)</label>
                    <select value={form.existingSystem} onChange={(e) => update("existingSystem", e.target.value)} className={selectClass}>
                      <option value="">Select</option>
                      <option>New installation (no existing system)</option>
                      <option>Replacing an old system</option>
                      <option>Upgrading / expanding current system</option>
                      <option>Need repair on existing system</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Special Requirements</label>
                    <Textarea value={form.specialRequirements} onChange={(e) => update("specialRequirements", e.target.value)} placeholder="e.g. specific temperature ranges, brand preferences, compliance standards, backup power needs..." rows={3} maxLength={1000} />
                  </div>
                </motion.div>
              )}

              {/* Step 4: Budget & Review */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-5">
                  <h3 className="text-lg font-bold">Budget & Final Details</h3>
                  <p className="text-sm text-muted-foreground">Almost done! Set your budget and review.</p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Budget Range (KES)</label>
                      <select value={form.budget} onChange={(e) => update("budget", e.target.value)} className={selectClass}>
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
                      <label className="mb-1.5 block text-sm font-medium">Preferred Timeline</label>
                      <select value={form.timeline} onChange={(e) => update("timeline", e.target.value)} className={selectClass}>
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
                    <label className="mb-1.5 block text-sm font-medium">How did you hear about us?</label>
                    <select value={form.howHeard} onChange={(e) => update("howHeard", e.target.value)} className={selectClass}>
                      <option value="">Select</option>
                      <option>Google Search</option>
                      <option>Social Media</option>
                      <option>Referral / Word of Mouth</option>
                      <option>Existing Client</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Additional Notes</label>
                    <Textarea value={form.additionalNotes} onChange={(e) => update("additionalNotes", e.target.value)} placeholder="Anything else you'd like us to know..." rows={3} maxLength={1000} />
                  </div>

                  {/* Summary */}
                  <div className="rounded-lg bg-secondary p-5 space-y-2">
                    <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quote Summary</h4>
                    <div className="grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
                      <p><span className="font-medium">Name:</span> {form.name}</p>
                      <p><span className="font-medium">Email:</span> {form.email}</p>
                      {form.phone && <p><span className="font-medium">Phone:</span> {form.phone}</p>}
                      {form.company && <p><span className="font-medium">Company:</span> {form.company}</p>}
                      <p className="sm:col-span-2"><span className="font-medium">Services:</span> {form.services.join(", ") || "—"}</p>
                      {form.propertyType && <p><span className="font-medium">Property:</span> {form.propertyType}</p>}
                      {form.location && <p><span className="font-medium">Location:</span> {form.location}</p>}
                      {form.budget && <p><span className="font-medium">Budget:</span> {form.budget}</p>}
                      {form.timeline && <p><span className="font-medium">Timeline:</span> {form.timeline}</p>}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((s) => s - 1)}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button onClick={() => setCurrentStep((s) => s + 1)} disabled={!canProceed()}>
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading || !canProceed()}>
                  {loading ? "Submitting..." : <><Send className="mr-2 h-4 w-4" /> Submit Quote Request</>}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RequestQuote;
