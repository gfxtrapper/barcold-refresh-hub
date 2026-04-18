import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface QuotePayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services: string[];
  propertyType?: string;
  location?: string;
  projectDescription: string;
  budget?: string;
  timeline?: string;
}

// Escape HTML to prevent injection in the email body
const esc = (s: unknown): string => {
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 255;
const clamp = (s: unknown, max: number) => (typeof s === "string" ? s.slice(0, max) : "");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Require a valid Supabase JWT (anon or authenticated) to prevent unauthenticated abuse
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claims, error: claimsErr } = await supabase.auth.getClaims(token);
    if (claimsErr || !claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return new Response(
      JSON.stringify({ error: "Email service not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const raw = (await req.json()) as Partial<QuotePayload>;

    // Server-side validation
    const name = clamp(raw.name, 100).trim();
    const email = clamp(raw.email, 255).trim();
    const projectDescription = clamp(raw.projectDescription, 2000).trim();
    const services = Array.isArray(raw.services)
      ? raw.services.filter((s) => typeof s === "string").slice(0, 20).map((s) => clamp(s, 100))
      : [];

    if (!name || !email || !isEmail(email) || !projectDescription || services.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const quote: QuotePayload = {
      name,
      email,
      phone: clamp(raw.phone, 20).trim() || undefined,
      company: clamp(raw.company, 100).trim() || undefined,
      services,
      propertyType: clamp(raw.propertyType, 100).trim() || undefined,
      location: clamp(raw.location, 200).trim() || undefined,
      projectDescription,
      budget: clamp(raw.budget, 50).trim() || undefined,
      timeline: clamp(raw.timeline, 50).trim() || undefined,
    };

    const htmlBody = `
      <h2>New Quote Request from ${esc(quote.name)}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${esc(quote.name)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${esc(quote.email)}</td></tr>
        ${quote.phone ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${esc(quote.phone)}</td></tr>` : ""}
        ${quote.company ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Company</td><td style="padding:8px;border:1px solid #ddd;">${esc(quote.company)}</td></tr>` : ""}
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Services</td><td style="padding:8px;border:1px solid #ddd;">${esc(quote.services.join(", "))}</td></tr>
        ${quote.propertyType ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Property Type</td><td style="padding:8px;border:1px solid #ddd;">${esc(quote.propertyType)}</td></tr>` : ""}
        ${quote.location ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Location</td><td style="padding:8px;border:1px solid #ddd;">${esc(quote.location)}</td></tr>` : ""}
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Description</td><td style="padding:8px;border:1px solid #ddd;">${esc(quote.projectDescription).replace(/\n/g, "<br>")}</td></tr>
        ${quote.budget ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Budget</td><td style="padding:8px;border:1px solid #ddd;">${esc(quote.budget)}</td></tr>` : ""}
        ${quote.timeline ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Timeline</td><td style="padding:8px;border:1px solid #ddd;">${esc(quote.timeline)}</td></tr>` : ""}
      </table>
      <p style="margin-top:16px;font-family:sans-serif;color:#666;">Reply directly to this email to reach the customer.</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Barcold Quotes <onboarding@resend.dev>",
        to: ["info@barcold.co.ke"],
        reply_to: quote.email,
        subject: `New Quote Request: ${quote.services.join(", ")} — ${quote.name}`,
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending notification:", error);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
