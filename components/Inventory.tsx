'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import type { Car } from '@/lib/types';
import {
  matchesPriceBand,
  sortCars,
  PRICE_BAND_LABELS,
  SORT_LABELS,
  type PriceBand,
  type SortKey,
} from '@/lib/carFilters';

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

  const bodyTypes = useMemo(
    () => Array.from(new Set(cars.map((c) => c.body).filter(Boolean))).sort(),
    [cars]
  );
  const years = useMemo(
    () =>
      Array.from(new Set(cars.map((c) => c.year).filter(Boolean))).sort(
        (a, b) => Number(b) - Number(a)
      ),
    [cars]
  );

  const [activeBrand, setActiveBrand] = useState<string>('ALL');
  const [bodyFilter, setBodyFilter] = useState<string>('ALL');
  const [yearFilter, setYearFilter] = useState<string>('ALL');
  const [priceFilter, setPriceFilter] = useState<PriceBand>('ALL');
  const [promoOnly, setPromoOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>('featured');
  const [activeId, setActiveId] = useState<string>(cars[0]?.id ?? '');

  const filtersActive =
    activeBrand !== 'ALL' ||
    bodyFilter !== 'ALL' ||
    yearFilter !== 'ALL' ||
    priceFilter !== 'ALL' ||
    promoOnly ||
    sortBy !== 'featured';

  const filtered = useMemo(() => {
    let list = activeBrand === 'ALL' ? cars : cars.filter((c) => c.brand === activeBrand);
    if (bodyFilter !== 'ALL') list = list.filter((c) => c.body === bodyFilter);
    if (yearFilter !== 'ALL') list = list.filter((c) => c.year === yearFilter);
    if (promoOnly) list = list.filter((c) => c.promo);
    if (priceFilter !== 'ALL') list = list.filter((c) => matchesPriceBand(c.note, priceFilter));
    return sortCars(list, sortBy);
  }, [cars, activeBrand, bodyFilter, yearFilter, priceFilter, promoOnly, sortBy]);

  const activeCar = useMemo(
    () => filtered.find((c) => c.id === activeId) ?? filtered[0],
    [filtered, activeId]
  );

  const activeIdx = useMemo(
    () => filtered.findIndex((c) => c.id === activeCar?.id),
    [filtered, activeCar]
  );

  // Whenever any filter narrows the list past the currently selected car,
  // fall back to the first result instead of showing a stale selection.
  useEffect(() => {
    if (filtered.length && !filtered.some((c) => c.id === activeId)) {
      setActiveId(filtered[0].id);
    }
  }, [filtered, activeId]);

  const handleBrandChange = useCallback((brand: string) => {
    setActiveBrand(brand);
  }, []);

  const resetFilters = useCallback(() => {
    setActiveBrand('ALL');
    setBodyFilter('ALL');
    setYearFilter('ALL');
    setPriceFilter('ALL');
    setPromoOnly(false);
    setSortBy('featured');
  }, []);

  const handlePrev = useCallback(() => {
    if (activeIdx > 0) setActiveId(filtered[activeIdx - 1].id);
  }, [activeIdx, filtered]);

  const handleNext = useCallback(() => {
    if (activeIdx < filtered.length - 1) setActiveId(filtered[activeIdx + 1].id);
  }, [activeIdx, filtered]);

  return (
    <section id="inventory" className="showroom">
      {/* ── Filter & sort toolbar ────────────────────────── */}
      <div className="showroom-filters">
        <label className="showroom-filter-field">
          <span className="showroom-filter-label">Body</span>
          <select
            className="showroom-filter-select"
            value={bodyFilter}
            onChange={(e) => setBodyFilter(e.target.value)}
          >
            <option value="ALL">All types</option>
            {bodyTypes.map((body) => (
              <option key={body} value={body}>
                {body}
              </option>
            ))}
          </select>
        </label>

        <label className="showroom-filter-field">
          <span className="showroom-filter-label">Year</span>
          <select
            className="showroom-filter-select"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="ALL">All years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label className="showroom-filter-field">
          <span className="showroom-filter-label">Price</span>
          <select
            className="showroom-filter-select"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value as PriceBand)}
          >
            {(Object.keys(PRICE_BAND_LABELS) as PriceBand[]).map((band) => (
              <option key={band} value={band}>
                {PRICE_BAND_LABELS[band]}
              </option>
            ))}
          </select>
        </label>

        <label className="showroom-filter-toggle">
          <input type="checkbox" checked={promoOnly} onChange={(e) => setPromoOnly(e.target.checked)} />
          Promo only
        </label>

        <label className="showroom-filter-field">
          <span className="showroom-filter-label">Sort</span>
          <select
            className="showroom-filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
          >
            {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
        </label>

        <span className="showroom-filter-count">
          {filtered.length} {filtered.length === 1 ? 'match' : 'matches'}
        </span>

        {filtersActive && (
          <button type="button" className="showroom-filter-reset" onClick={resetFilters}>
            Reset filters
          </button>
        )}
      </div>

      {filtered.length === 0 || !activeCar ? (
        <div className="showroom-empty">
          <p>No cars match those filters right now.</p>
          <p>
            <button type="button" className="showroom-filter-reset" onClick={resetFilters}>
              Reset filters
            </button>{' '}
            or <Link href="#request">request the car you have in mind</Link> and we&apos;ll source it.
          </p>
        </div>
      ) : (
        <>
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
              <Link href={`/cars/${activeCar.id}`}>
                View Full Details <ArrowRight />
              </Link>
            </li>
            <li>
              <a href="#request">
                Request a Different Car <ArrowRight />
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
        </>
      )}
    </section>
  );
}
