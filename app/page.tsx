import carsData from '@/data/cars.json';
import type { Car } from '@/lib/types';
import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import Inventory from '@/components/Inventory';
import Contact from '@/components/Contact';
import SiteFooter from '@/components/SiteFooter';
import RevealInit from '@/components/RevealInit';

export default function HomePage() {
  const cars = carsData.cars as Car[];

  return (
    <>
      <SiteHeader />
      <Hero />
      <HowItWorks />
      <Pricing />
      <Inventory cars={cars} />
      <Contact />
      <SiteFooter />
      <RevealInit />
    </>
  );
}
