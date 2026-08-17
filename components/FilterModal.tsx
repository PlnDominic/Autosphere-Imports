'use client';

import { useEffect } from 'react';
import {
  PRICE_BAND_LABELS,
  SORT_LABELS,
  type PriceBand,
  type SortKey,
} from '@/lib/carFilters';

type Props = {
  open: boolean;
  onClose: () => void;
  bodyTypes: string[];
  years: string[];
  bodyFilter: string;
  setBodyFilter: (v: string) => void;
  yearFilter: string;
  setYearFilter: (v: string) => void;
  priceFilter: PriceBand;
  setPriceFilter: (v: PriceBand) => void;
  promoOnly: boolean;
  setPromoOnly: (v: boolean) => void;
  sortBy: SortKey;
  setSortBy: (v: SortKey) => void;
  resultCount: number;
  onReset: () => void;
};

export default function FilterModal({
  open,
  onClose,
  bodyTypes,
  years,
  bodyFilter,
  setBodyFilter,
  yearFilter,
  setYearFilter,
  priceFilter,
  setPriceFilter,
  promoOnly,
  setPromoOnly,
  sortBy,
  setSortBy,
  resultCount,
  onReset,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
      <div
        className="filter-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Filter and sort cars"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="filter-modal-header">
          <h2>Filter &amp; sort</h2>
          <button type="button" className="filter-modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className="filter-modal-body">
          <div className="filter-modal-field">
            <label className="request-label" htmlFor="fm-body">
              Body type
            </label>
            <select
              id="fm-body"
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
          </div>

          <div className="filter-modal-field">
            <label className="request-label" htmlFor="fm-year">
              Year
            </label>
            <select
              id="fm-year"
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
          </div>

          <div className="filter-modal-field">
            <label className="request-label" htmlFor="fm-price">
              Price
            </label>
            <select
              id="fm-price"
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
          </div>

          <div className="filter-modal-field">
            <label className="request-label" htmlFor="fm-sort">
              Sort by
            </label>
            <select
              id="fm-sort"
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
          </div>

          <label className="showroom-filter-toggle filter-modal-toggle">
            <input type="checkbox" checked={promoOnly} onChange={(e) => setPromoOnly(e.target.checked)} />
            Promo only
          </label>
        </div>

        <div className="filter-modal-footer">
          <button type="button" className="showroom-filter-reset" onClick={onReset}>
            Reset filters
          </button>
          <button type="button" className="request-submit" onClick={onClose}>
            Show {resultCount} {resultCount === 1 ? 'car' : 'cars'}
          </button>
        </div>
      </div>
    </div>
  );
}
