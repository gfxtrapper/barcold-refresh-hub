
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials"
  ON public.testimonials FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role can insert testimonials"
  ON public.testimonials FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update testimonials"
  ON public.testimonials FOR UPDATE
  TO service_role
  USING (true);

CREATE POLICY "Service role can delete testimonials"
  ON public.testimonials FOR DELETE
  TO service_role
  USING (true);
