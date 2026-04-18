DROP POLICY IF EXISTS "Service role can delete quote requests" ON public.quote_requests;

CREATE POLICY "Service role can delete quote requests"
ON public.quote_requests
FOR DELETE
TO service_role
USING (true);