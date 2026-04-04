import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Star, Loader2, MessageSquareQuote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  display_order: number;
  created_at: string;
}

interface AdminTestimonialsProps {
  password: string;
}

const AdminTestimonials = ({ password }: AdminTestimonialsProps) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-quotes", {
      body: { password, action: "testimonials_list" },
    });
    setLoading(false);
    if (error || data?.error) {
      toast({ title: "Error loading testimonials", variant: "destructive" });
      return;
    }
    setTestimonials(data.data || []);
  }, [password]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !text.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-quotes", {
        body: {
          password,
          action: "testimonials_add",
          name: name.trim(),
          role: role.trim(),
          text: text.trim(),
          rating,
        },
      });

      if (error || data?.error) throw new Error(data?.error || "Failed to add");

      setTestimonials((prev) => [...prev, data.data]);
      setName("");
      setRole("");
      setText("");
      setRating(5);
      toast({ title: "Testimonial added" });
    } catch (err) {
      toast({ title: "Failed to add testimonial", description: (err as Error).message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;

    const { data, error } = await supabase.functions.invoke("admin-quotes", {
      body: { password, action: "testimonials_delete", id },
    });

    if (error || data?.error) {
      toast({ title: "Delete failed", variant: "destructive" });
    } else {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast({ title: "Testimonial deleted" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Form */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Plus className="h-5 w-5" /> Add Testimonial
        </h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Client name *" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input placeholder="Role / Company *" value={role} onChange={(e) => setRole(e.target.value)} required />
          </div>
          <Textarea placeholder="Testimonial text *" value={text} onChange={(e) => setText(e.target.value)} required rows={3} />
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-colors"
                  >
                    <Star className={`h-5 w-5 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" disabled={submitting || !name.trim() || !role.trim() || !text.trim()}>
              {submitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...</>
              ) : (
                <><Plus className="mr-2 h-4 w-4" /> Add Testimonial</>
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* Testimonials List */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <MessageSquareQuote className="h-5 w-5" /> Testimonials ({testimonials.length})
        </h3>
        {loading && testimonials.length === 0 ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : testimonials.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-12 text-center">
            <MessageSquareQuote className="mb-2 h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground">No testimonials yet. Add your first one above.</p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((t) => (
              <Card key={t.id} className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleDelete(t.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <p className="text-sm italic text-muted-foreground">"{t.text}"</p>
                <div className="mt-3 border-t pt-3">
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonials;
