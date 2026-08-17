import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import carsData from '@/data/cars.json';
import type { Car } from '@/lib/types';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import RevealInit from '@/components/RevealInit';
import CarInquiryForm from '@/components/CarInquiryForm';

const cars = carsData.cars as Car[];

function getCar(id: string): Car | undefined {
  return cars.find((c) => c.id === id);
}

export function generateStaticParams() {
  return cars.map((c) => ({ id: c.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const car = getCar(id);
  if (!car) return { title: 'Car not found - Autosphere Imports' };
  return {
    title: `${car.name} ${car.year} - Autosphere Imports`,
    description: `${car.name} (${car.year}), ${car.body}, ${car.engine}, ${car.fuel}, ${car.seats} seats. ${car.note}. Direct import to Ghana with transparent DDP & CIF pricing.`,
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params;
  const car = getCar(id);
  if (!car) notFound();

  const reserveText = encodeURIComponent(
    `Hi, I'm interested in the ${car.name} (${car.year}). Is it still available?`
  );
  const related = cars.filter((c) => c.id !== car.id && c.brand === car.brand).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="car-detail">
        <div className="car-detail-inner">
          <Link href="/#inventory" className="car-detail-back">
            &larr; Back to inventory
          </Link>

          <div className="car-detail-grid">
            <div className="car-detail-media reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={car.image} alt={`${car.name} ${car.year}`} />
              {car.badge && <span className="car-detail-tag car-detail-tag-badge">{car.badge}</span>}
              {car.promo && <span className="car-detail-tag car-detail-tag-promo">Promo</span>}
            </div>

            <div className="car-detail-info reveal">
              <p className="section-eyebrow">{car.brand}</p>
              <div className="car-detail-title-row">
                <h1 className="car-detail-name">{car.name}</h1>
                <span className="car-detail-year">{car.year}</span>
              </div>
              <p className="car-detail-note">{car.note}</p>

              <dl className="car-detail-specs">
                <div>
                  <dt>Body type</dt>
                  <dd>{car.body}</dd>
                </div>
                <div>
                  <dt>Engine</dt>
                  <dd>{car.engine}</dd>
                </div>
                <div>
                  <dt>Fuel</dt>
                  <dd>{car.fuel}</dd>
                </div>
                <div>
                  <dt>Seats</dt>
                  <dd>{car.seats}</dd>
                </div>
              </dl>

              <div className="car-detail-cta">
                <a
                  className="request-submit"
                  href={`https://wa.me/233537633242?text=${reserveText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserve on WhatsApp
                </a>
                <Link href="/#estimator" className="car-detail-cta-secondary">
                  Estimate the landed cost
                </Link>
                <Link href="/#inventory" className="car-detail-cta-secondary">
                  See the rest of the lineup
                </Link>
              </div>
            </div>
          </div>

          <CarInquiryForm car={car} />

          {related.length > 0 && (
            <section className="car-detail-related reveal">
              <p className="section-eyebrow">More from {car.brand}</p>
              <div className="car-detail-related-grid">
                {related.map((r) => (
                  <Link key={r.id} href={`/cars/${r.id}`} className="car-detail-related-card">
                    <div className="car-detail-related-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.image} alt="" />
                    </div>
                    <span className="car-detail-related-name">{r.name}</span>
                    <span className="car-detail-related-year">{r.year}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
