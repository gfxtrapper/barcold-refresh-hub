import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Upload, Trash2, Image, Loader2 } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  caption: string | null;
  image_url: string;
  display_order: number;
  created_at: string;
}

interface AdminGalleryProps {
  password: string;
}

const AdminGallery = ({ password }: AdminGalleryProps) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Upload, Trash2, Image, Loader2 } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  caption: string | null;
  image_url: string;
  display_order: number;
  created_at: string;
}

interface AdminGalleryProps {
  password: string;
}

const AdminGallery = ({ password }: AdminGalleryProps) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fetched, setFetched] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-quotes", {
      body: { password, action: "gallery_list" },
    });
    setLoading(false);
    if (error || data?.error) {
      toast({ title: "Error loading gallery", variant: "destructive" });
      return;
    }
    setImages(data.data || []);
    setFetched(true);
  }, [password]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      toast({ title: "Please provide a title and image", variant: "destructive" });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image must be under 5MB", variant: "destructive" });
      return;
    }

    setUploading(true);

    try {
      // Convert file to base64
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64 = btoa(binary);

      const { data, error } = await supabase.functions.invoke("admin-quotes", {
        body: {
          password,
          action: "gallery_upload",
          title: title.trim(),
          caption: caption.trim() || null,
          image_base64: base64,
          file_name: file.name,
        },
      });

      if (error || data?.error) {
        throw new Error(data?.error || "Upload failed");
      }

      setImages((prev) => [...prev, data.data]);
      setTitle("");
      setCaption("");
      setFile(null);
      // Reset file input
      const fileInput = document.getElementById("gallery-file-input") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      toast({ title: "Image uploaded successfully" });
    } catch (err) {
      toast({ title: "Upload failed", description: (err as Error).message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery image?")) return;

    const { data, error } = await supabase.functions.invoke("admin-quotes", {
      body: { password, action: "gallery_delete", id },
    });

    if (error || data?.error) {
      toast({ title: "Delete failed", variant: "destructive" });
    } else {
      setImages((prev) => prev.filter((img) => img.id !== id));
      toast({ title: "Image deleted" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Upload className="h-5 w-5" /> Upload New Image
        </h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              placeholder="Image title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              placeholder="Caption (optional)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Input
              id="gallery-file-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="max-w-xs"
            />
            <Button type="submit" disabled={uploading || !file || !title.trim()}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Max file size: 5MB. Supported: JPG, PNG, WebP</p>
        </form>
      </Card>

      {/* Gallery Grid */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Image className="h-5 w-5" /> Gallery Images ({images.length})
        </h3>
        {loading && !fetched ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : images.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-12 text-center">
            <Image className="mb-2 h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground">No gallery images yet. Upload your first image above.</p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => (
              <Card key={img.id} className="overflow-hidden">
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
                <div className="flex items-start justify-between p-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm">{img.title}</p>
                    {img.caption && (
                      <p className="truncate text-xs text-muted-foreground">{img.caption}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => handleDelete(img.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
