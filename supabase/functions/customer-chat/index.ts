import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Barcold Assistant, the friendly and knowledgeable customer care chatbot for Barcold Refrigeration Ltd — Kenya's premier refrigeration, air conditioning, HVAC, and kitchen equipment solutions provider since 2019.

Your role:
- Answer questions about Barcold's services: compressors & condensing units, air conditioning systems, cold room solutions, parts & accessories, HVAC & ventilation, kitchen equipment, and service & maintenance.
- Help customers understand which products or services suit their needs.
- Provide general pricing guidance (suggest requesting a formal quote for exact pricing).
- Share contact info: Phone: +254 742 105 866 or +254 786 839 306, Email: info@barcoldrefrigerationltd.co.ke, Location: Jowin Shopping Arcade, Ruai Eastern Bypass, Nairobi.
- Working hours: Mon–Fri 8AM–6PM, Sat 9AM–1PM.
- Encourage customers to request a quote at /request-quote for detailed project pricing.
- Be warm, professional, and concise. Use short paragraphs.
- If you don't know something specific, direct the customer to call or email the team.
- You can answer in English or Swahili depending on the customer's language.

Key brands: GMCC, HITACHI compressors. Temperature ranges: -25°C to +10°C for cold rooms. Cold room sizes: 7m³ to 120m³.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "We're experiencing high demand. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please contact us directly." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("customer-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
