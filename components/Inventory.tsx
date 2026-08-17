'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Car } from '@/lib/types';
import {
  matchesPriceBand,
  sortCars,
  PRICE_BAND_LABELS,
  type PriceBand,
  type SortKey,
} from '@/lib/carFilters';
import NotifyMeForm from './NotifyMeForm';
import FilterModal from './FilterModal';

function describeFilters({
  brand,
  body,
  year,
  price,
  promoOnly,
}: {
  brand: string;
  body: string;
  year: string;
  price: PriceBand;
  promoOnly: boolean;
}): string {
  const parts: string[] = [];
  if (brand !== 'ALL') parts.push(`Brand: ${brand}`);
  if (body !== 'ALL') parts.push(`Body type: ${body}`);
  if (year !== 'ALL') parts.push(`Year: ${year}`);
  if (price !== 'ALL') parts.push(`Price: ${PRICE_BAND_LABELS[price]}`);
  if (promoOnly) parts.push('Promo only');
  return parts.length ? parts.join(', ') : 'Browsing all cars (no specific filters set)';
}

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
function SlidersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="7" cy="18" r="2" fill="currentColor" stroke="none" />
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
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtersActive =
    activeBrand !== 'ALL' ||
    bodyFilter !== 'ALL' ||
    yearFilter !== 'ALL' ||
    priceFilter !== 'ALL' ||
    promoOnly ||
    sortBy !== 'featured';

  const modalFilterCount = [bodyFilter !== 'ALL', yearFilter !== 'ALL', priceFilter !== 'ALL', promoOnly].filter(
    Boolean
  ).length;

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

  // Only show the floating filter button while the section itself is on
  // screen — once the visitor scrolls past it into Pricing/Contact/etc.
  // there's nothing left for it to filter.
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(true);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setSectionVisible(entry.isIntersecting), {
      rootMargin: '-74px 0px 0px 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="inventory" className="showroom" ref={sectionRef}>
      {/* ── Filter trigger — floating icon, kept out of the hero flow ──
          Hidden once results are empty (that state has its own inline
          "Adjust filters" link) or once the section scrolls out of view,
          so it never sits on top of a form field or another section. ── */}
      {activeCar && sectionVisible && (
        <button
          type="button"
          className="filter-fab"
          onClick={() => setFiltersOpen(true)}
          aria-haspopup="dialog"
          aria-label={modalFilterCount ? `Filter cars (${modalFilterCount} active)` : 'Filter cars'}
        >
          <SlidersIcon />
          {modalFilterCount > 0 && <span className="filter-fab-badge">{modalFilterCount}</span>}
        </button>
      )}

      <FilterModal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        bodyTypes={bodyTypes}
        years={years}
        bodyFilter={bodyFilter}
        setBodyFilter={setBodyFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        promoOnly={promoOnly}
        setPromoOnly={setPromoOnly}
        sortBy={sortBy}
        setSortBy={setSortBy}
        resultCount={filtered.length}
        onReset={resetFilters}
      />

      {filtered.length === 0 || !activeCar ? (
        <div className="showroom-empty">
          <p>No cars match those filters right now.</p>
          <p className="showroom-empty-criteria">
            Looking for: {describeFilters({ brand: activeBrand, body: bodyFilter, year: yearFilter, price: priceFilter, promoOnly })}
          </p>
          <NotifyMeForm
            criteria={describeFilters({ brand: activeBrand, body: bodyFilter, year: yearFilter, price: priceFilter, promoOnly })}
          />
          <p>
            <button type="button" className="showroom-filter-reset" onClick={() => setFiltersOpen(true)}>
              Adjust filters
            </button>{' '}
            {filtersActive && (
              <>
                &middot;{' '}
                <button type="button" className="showroom-filter-reset" onClick={resetFilters}>
                  Reset filters
                </button>{' '}
              </>
            )}
            or <Link href="#request">request the exact car you have in mind</Link> and we&apos;ll
            source it.
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
