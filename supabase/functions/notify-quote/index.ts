import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
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
    const quote: QuotePayload = await req.json();

    const htmlBody = `
      <h2>New Quote Request from ${quote.name}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${quote.name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${quote.email}</td></tr>
        ${quote.phone ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${quote.phone}</td></tr>` : ""}
        ${quote.company ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Company</td><td style="padding:8px;border:1px solid #ddd;">${quote.company}</td></tr>` : ""}
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Services</td><td style="padding:8px;border:1px solid #ddd;">${quote.services.join(", ")}</td></tr>
        ${quote.propertyType ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Property Type</td><td style="padding:8px;border:1px solid #ddd;">${quote.propertyType}</td></tr>` : ""}
        ${quote.location ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Location</td><td style="padding:8px;border:1px solid #ddd;">${quote.location}</td></tr>` : ""}
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Description</td><td style="padding:8px;border:1px solid #ddd;">${quote.projectDescription}</td></tr>
        ${quote.budget ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Budget</td><td style="padding:8px;border:1px solid #ddd;">${quote.budget}</td></tr>` : ""}
        ${quote.timeline ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Timeline</td><td style="padding:8px;border:1px solid #ddd;">${quote.timeline}</td></tr>` : ""}
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
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending notification:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
