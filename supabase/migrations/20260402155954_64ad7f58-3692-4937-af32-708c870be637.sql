
-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  caption TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Anyone can view gallery images
CREATE POLICY "Anyone can view gallery images"
ON public.gallery_images
FOR SELECT
TO public
USING (true);

-- Only service_role can insert
CREATE POLICY "Service role can insert gallery images"
ON public.gallery_images
FOR INSERT
TO service_role
WITH CHECK (true);

-- Only service_role can delete
CREATE POLICY "Service role can delete gallery images"
ON public.gallery_images
FOR DELETE
TO service_role
USING (true);

-- Only service_role can update
CREATE POLICY "Service role can update gallery images"
ON public.gallery_images
FOR UPDATE
TO service_role
USING (true);

-- Create storage bucket for gallery
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);

-- Anyone can view gallery files
CREATE POLICY "Anyone can view gallery files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'gallery');

-- Service role can manage gallery files
CREATE POLICY "Service role can upload gallery files"
ON storage.objects
FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Service role can delete gallery files"
ON storage.objects
FOR DELETE
TO service_role
USING (bucket_id = 'gallery');
