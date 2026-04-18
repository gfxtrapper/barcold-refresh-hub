import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://xyzcompany.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'public-anon-key'; // Replace with your public key
const supabase = createClient(supabaseUrl, supabaseKey);

// Define testimonial type
export interface Testimonial {
    id: string;
    name: string;
    content: string;
    created_at: string;
}

// Fetch testimonials from Supabase
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
    try {
        const { data, error, status } = await supabase
            .from<Testimonial>('testimonials')
            .select('*');

        if (error && status !== 406) {
            throw new Error(`Error fetching testimonials: ${error.message}`);
        }
        return (data as Testimonial[]) || [];
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to fetch testimonials: ${error}`);
    }
};

// Additional error handling can be done in the calling function when invoking fetchTestimonials.