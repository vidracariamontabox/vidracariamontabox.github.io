import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import { testimonials } from '@/data/testimonials';

export default function Page() {
  return (
    <main className="bg-[#121212]">
      <Navbar />
      <Hero />
      <TestimonialsCarousel testimonials={testimonials} />
    </main>
  );
}
