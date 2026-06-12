-- Tighten INSERT policy on launch_registrations to avoid WITH CHECK (true).
-- Replaces the always-true expression with a real validation: non-empty,
-- length-bounded, basic email shape. Keeps the public registration flow working.
DROP POLICY IF EXISTS "Anyone can register for launch" ON public.launch_registrations;

CREATE POLICY "Anyone can register for launch"
  ON public.launch_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND length(email) BETWEEN 5 AND 254
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );