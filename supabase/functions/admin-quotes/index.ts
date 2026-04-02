import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { password, action, id } = body;
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");

    if (!adminPassword || password !== adminPassword) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Quote actions
    if (action === "list") {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete" && id) {
      const { error } = await supabase.from("quote_requests").delete().eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Gallery actions
    if (action === "gallery_list") {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "gallery_upload") {
      const { title, caption, image_base64, file_name } = body;
      if (!title || !image_base64 || !file_name) {
        return new Response(JSON.stringify({ error: "Missing title, image_base64, or file_name" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Decode base64 and upload to storage
      const binaryStr = atob(image_base64);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }

      const ext = file_name.split(".").pop() || "jpg";
      const storagePath = `${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(storagePath, bytes, {
          contentType: `image/${ext === "jpg" ? "jpeg" : ext}`,
          upsert: false,
        });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(storagePath);

      // Get max display_order
      const { data: maxOrder } = await supabase
        .from("gallery_images")
        .select("display_order")
        .order("display_order", { ascending: false })
        .limit(1);

      const nextOrder = (maxOrder?.[0]?.display_order ?? -1) + 1;

      const { data: inserted, error: insertError } = await supabase
        .from("gallery_images")
        .insert({
          title,
          caption: caption || null,
          image_url: urlData.publicUrl,
          display_order: nextOrder,
        })
        .select()
        .single();
      if (insertError) throw insertError;

      return new Response(JSON.stringify({ data: inserted }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "gallery_delete" && id) {
      // Get image to find storage path
      const { data: img, error: fetchErr } = await supabase
        .from("gallery_images")
        .select("image_url")
        .eq("id", id)
        .single();
      if (fetchErr) throw fetchErr;

      // Extract storage path from URL
      if (img?.image_url) {
        const parts = img.image_url.split("/gallery/");
        if (parts[1]) {
          await supabase.storage.from("gallery").remove([parts[1]]);
        }
      }

      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
