'use client';

import { useState, useMemo, useCallback } from 'react';
import type { Car } from '@/lib/types';

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Shared strip card list — rendered in two places, toggled via CSS */
function StripCards({
  filtered,
  activeId,
  activeCar,
  onSelect,
  className,
}: {
  filtered: Car[];
  activeId: string;
  activeCar: Car;
  onSelect: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={`showroom-strip${className ? ' ' + className : ''}`} role="list">
      {filtered.map((car) => (
        <button
          key={car.id}
          role="listitem"
          onClick={() => onSelect(car.id)}
          className={'strip-card' + (car.id === activeCar.id ? ' active' : '')}
          aria-pressed={car.id === activeCar.id}
        >
          <div className="strip-thumb">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={car.image} alt="" />
            {car.badge && <span className="strip-badge">{car.badge}</span>}
          </div>
          <p className="strip-name">{car.name}</p>
          <span className="strip-year">{car.year}</span>
          <div className="strip-specs">
            <div className="strip-spec-row"><em>Engine</em><span>{car.engine}</span></div>
            <div className="strip-spec-row"><em>Fuel</em><span>{car.fuel}</span></div>
            <div className="strip-spec-row"><em>Seats</em><span>{car.seats}</span></div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function Inventory({ cars }: { cars: Car[] }) {
  const brands = useMemo(
    () => ['ALL', ...Array.from(new Set(cars.map((c) => c.brand).filter(Boolean)))],
    [cars]
  );

  const [activeBrand, setActiveBrand] = useState<string>('ALL');
  const [activeId, setActiveId] = useState<string>(cars[0]?.id ?? '');

  const filtered = useMemo(
    () => (activeBrand === 'ALL' ? cars : cars.filter((c) => c.brand === activeBrand)),
    [cars, activeBrand]
  );

  const activeCar = useMemo(
    () => filtered.find((c) => c.id === activeId) ?? filtered[0],
    [filtered, activeId]
  );

  const activeIdx = useMemo(
    () => filtered.findIndex((c) => c.id === activeCar?.id),
    [filtered, activeCar]
  );

  const handleBrandChange = useCallback(
    (brand: string) => {
      setActiveBrand(brand);
      const next = brand === 'ALL' ? cars : cars.filter((c) => c.brand === brand);
      if (next.length) setActiveId(next[0].id);
    },
    [cars]
  );

  const handlePrev = useCallback(() => {
    if (activeIdx > 0) setActiveId(filtered[activeIdx - 1].id);
  }, [activeIdx, filtered]);

  const handleNext = useCallback(() => {
    if (activeIdx < filtered.length - 1) setActiveId(filtered[activeIdx + 1].id);
  }, [activeIdx, filtered]);

  if (!activeCar) return null;

  return (
    <section id="inventory" className="showroom">
      {/* ── Main display ─────────────────────────────────── */}
      <div className="showroom-main">
        {/* Brand sidebar */}
        <aside className="showroom-brands" aria-label="Filter by brand">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleBrandChange(brand)}
              className={'brand-btn' + (activeBrand === brand ? ' active' : '')}
              aria-pressed={activeBrand === brand}
            >
              {brand}
            </button>
          ))}
        </aside>

        {/* Visual panel — first in DOM so it's first on mobile */}
        <div className="showroom-visual">
          <div className="showroom-available">
            <span className="showroom-available-label">Available now</span>
            <strong className="showroom-available-count">{cars.length} Vehicles</strong>
          </div>

          <div className="showroom-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={activeCar.id}
              src={activeCar.image}
              alt={`${activeCar.name} ${activeCar.year}`}
              className="showroom-car-img"
            />
          </div>

          <div className="showroom-nav">
            <button className="showroom-nav-btn" onClick={handlePrev} disabled={activeIdx === 0} aria-label="Previous vehicle">
              <ChevronLeft />
            </button>
            <span className="showroom-nav-count">{activeIdx + 1} / {filtered.length}</span>
            <button className="showroom-nav-btn" onClick={handleNext} disabled={activeIdx === filtered.length - 1} aria-label="Next vehicle">
              <ChevronRight />
            </button>
            <span className="showroom-nav-label">{activeCar.body.toUpperCase()}</span>
          </div>
        </div>

        {/* Info panel */}
        <div className="showroom-info">
          <p className="showroom-eyebrow">In our showroom</p>
          <div className="showroom-title-row">
            <h2 className="showroom-car-name">{activeCar.name}</h2>
            <span className="showroom-car-year">{activeCar.year}</span>
          </div>
          <p className="showroom-spec">
            {activeCar.engine}&nbsp;&mdash;&nbsp;{activeCar.seats}-Seat {activeCar.body}
          </p>
          <div className="showroom-divider" />

          {/* Strip — mobile only (above actions) */}
          <StripCards
            filtered={filtered}
            activeId={activeId}
            activeCar={activeCar}
            onSelect={setActiveId}
            className="strip--mobile"
          />

          <ul className="showroom-actions">
            <li>
              <a href="https://wa.me/233537633242" target="_blank" rel="noopener noreferrer">
                Reserve this car <ArrowRight />
              </a>
            </li>
            <li>
              <a href="https://wa.me/233537633242" target="_blank" rel="noopener noreferrer">
                Request a Quote <ArrowRight />
              </a>
            </li>
            <li>
              <a href="#contact">
                Contact Us <ArrowRight />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Strip — desktop only (full-width bottom) */}
      <StripCards
        filtered={filtered}
        activeId={activeId}
        activeCar={activeCar}
        onSelect={setActiveId}
        className="strip--desktop"
      />
    </section>
  );
}
