import type { Car } from '@/lib/types';

function CarCard({ car }: { car: Car }) {
  return (
    <div className="car-card">
      <div className="car-thumb">
        {car.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={car.image} alt={`${car.name}${car.year ? ' ' + car.year : ''}`} loading="lazy" />
        ) : (
          <div className="car-placeholder">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 17h14l-1.5-4.5a2 2 0 0 0-1.9-1.5H8.4a2 2 0 0 0-1.9 1.5L5 17Z" />
              <path d="M3 17h18v2H3zM7 19v1.5M17 19v1.5" />
            </svg>
            <span>Photo coming soon</span>
          </div>
        )}
        {car.promo && <span className="promo-badge">Promo</span>}
      </div>
      <div className="car-meta">
        <h3 className="car-name">{car.name}</h3>
        <span className="car-year">{car.year}</span>
      </div>
      <div className="car-sub">
        <span className="car-body">{car.body}</span>
        <span className="car-note">{car.note}</span>
      </div>
    </div>
  );
}

export default function Inventory({ cars }: { cars: Car[] }) {
  return (
    <section id="inventory">
      <div className="inventory-inner">
        <div className="inventory-header reveal">
          <div style={{ maxWidth: '50ch' }}>
            <p className="section-eyebrow">The lineup</p>
            <h2 className="section-h2">Cars ready to import.</h2>
          </div>
          <a
            href="https://wa.me/233537633242"
            target="_blank"
            rel="noopener"
            className="inventory-request"
          >
            Request a model
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="car-grid reveal">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
