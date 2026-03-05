-- Create table for Perfect Pack launch email registrations
CREATE TABLE public.launch_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.launch_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public registration)
CREATE POLICY "Anyone can register for launch" ON public.launch_registrations
  FOR INSERT WITH CHECK (true);

-- No public reads
CREATE POLICY "No public reads" ON public.launch_registrations
  FOR SELECT USING (false);