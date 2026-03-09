import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Lock, Eye, Trash2, RefreshCw, LogOut } from "lucide-react";

interface QuoteRequest {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  services: string[];
  property_type: string | null;
  location: string | null;
  project_description: string;
  space_size: string | null;
  number_of_units: string | null;
  existing_system: string | null;
  special_requirements: string | null;
  budget: string | null;
  timeline: string | null;
  how_heard: string | null;
  additional_notes: string | null;
}

function LoginGate({ onLogin }: { onLogin: (pw: string) => void }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onLogin(password);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-sm p-8">
        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Enter the admin password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Sign In"}
          </Button>
        </form>
      </Card>
    </main>
  );
}

function QuoteDetail({ quote }: { quote: QuoteRequest }) {
  const fields = [
    { label: "Name", value: quote.name },
    { label: "Email", value: quote.email },
    { label: "Phone", value: quote.phone },
    { label: "Company", value: quote.company },
    { label: "Services", value: quote.services?.join(", ") },
    { label: "Property Type", value: quote.property_type },
    { label: "Location", value: quote.location },
    { label: "Space Size", value: quote.space_size },
    { label: "Units", value: quote.number_of_units },
    { label: "Existing System", value: quote.existing_system },
    { label: "Budget", value: quote.budget },
    { label: "Timeline", value: quote.timeline },
    { label: "How Heard", value: quote.how_heard },
    { label: "Description", value: quote.project_description },
    { label: "Special Requirements", value: quote.special_requirements },
    { label: "Additional Notes", value: quote.additional_notes },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {fields.map(
        (f) =>
          f.value && (
            <div key={f.label} className={f.label === "Description" || f.label === "Special Requirements" || f.label === "Additional Notes" ? "sm:col-span-2" : ""}>
              <p className="text-xs font-medium text-muted-foreground">{f.label}</p>
              <p className="text-sm">{f.value}</p>
            </div>
          )
      )}
    </div>
  );
}

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchQuotes = useCallback(async (pw: string) => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-quotes", {
      body: { password: pw, action: "list" },
    });
    setLoading(false);

    if (error || data?.error) {
      toast({ title: "Error", description: data?.error || "Failed to fetch quotes", variant: "destructive" });
      return false;
    }
    setQuotes(data.data || []);
    return true;
  }, []);

  const handleLogin = async (pw: string) => {
    setPassword(pw);
    const success = await fetchQuotes(pw);
    if (success) setAuthenticated(true);
    else toast({ title: "Invalid password", variant: "destructive" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this quote request?")) return;
    const { data, error } = await supabase.functions.invoke("admin-quotes", {
      body: { password, action: "delete", id },
    });
    if (error || data?.error) {
      toast({ title: "Delete failed", variant: "destructive" });
    } else {
      setQuotes((prev) => prev.filter((q) => q.id !== id));
      toast({ title: "Quote deleted" });
    }
  };

  if (!authenticated) return <LoginGate onLogin={handleLogin} />;

  return (
    <main className="min-h-screen bg-secondary pt-20">
      <div className="container-max px-4 py-8 md:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Quote Requests</h1>
            <p className="text-sm text-muted-foreground">{quotes.length} total submissions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => fetchQuotes(password)} disabled={loading}>
              <RefreshCw className={`mr-1 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setAuthenticated(false); setPassword(""); setQuotes([]); }}>
              <LogOut className="mr-1 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        <Card className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                    {loading ? "Loading..." : "No quote requests yet."}
                  </TableCell>
                </TableRow>
              ) : (
                quotes.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="whitespace-nowrap text-sm">
                      {new Date(q.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{q.name}</TableCell>
                    <TableCell className="text-sm">{q.email}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {q.services?.slice(0, 2).map((s) => (
                          <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                        ))}
                        {q.services?.length > 2 && (
                          <Badge variant="outline" className="text-xs">+{q.services.length - 2}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{q.location || "—"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                          </DialogTrigger>
                          <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Quote from {q.name}</DialogTitle>
                            </DialogHeader>
                            <QuoteDetail quote={q} />
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(q.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </main>
  );
};

export default AdminDashboard;
