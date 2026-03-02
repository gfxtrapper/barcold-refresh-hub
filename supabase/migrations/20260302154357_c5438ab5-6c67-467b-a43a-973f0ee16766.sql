
-- Create quote_requests table
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  services TEXT[] NOT NULL DEFAULT '{}',
  property_type TEXT,
  location TEXT,
  project_description TEXT NOT NULL,
  space_size TEXT,
  number_of_units TEXT,
  existing_system TEXT,
  special_requirements TEXT,
  budget TEXT,
  timeline TEXT,
  how_heard TEXT,
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form, no auth required)
CREATE POLICY "Anyone can submit a quote request"
  ON public.quote_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only service role can read (admin access via dashboard)
CREATE POLICY "Service role can read all quote requests"
  ON public.quote_requests
  FOR SELECT
  TO service_role
  USING (true);
