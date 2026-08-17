import type { Car } from './types';

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc' | 'name-asc';

export type PriceBand = 'ALL' | 'under-100k' | '100k-200k' | 'over-200k';

export const PRICE_BAND_LABELS: Record<PriceBand, string> = {
  ALL: 'Any price',
  'under-100k': 'Under GHC 100,000',
  '100k-200k': 'GHC 100,000 - 200,000',
  'over-200k': 'Over GHC 200,000',
};

export const SORT_LABELS: Record<SortKey, string> = {
  featured: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'year-desc': 'Year: Newest',
  'year-asc': 'Year: Oldest',
  'name-asc': 'Name: A to Z',
};

/**
 * Pulls a GHC amount out of a free-text note like "from GHC 84,000".
 * Notes like "Request a quote" have no number and return null — those
 * cars are excluded from price-range filtering and sorted last.
 */
export function parsePriceFromNote(note: string): number | null {
  const match = note.replace(/,/g, '').match(/(\d{4,})/);
  return match ? Number(match[1]) : null;
}

export function matchesPriceBand(note: string, band: PriceBand): boolean {
  if (band === 'ALL') return true;
  const price = parsePriceFromNote(note);
  if (price == null) return false;
  if (band === 'under-100k') return price < 100_000;
  if (band === '100k-200k') return price >= 100_000 && price <= 200_000;
  return price > 200_000;
}

export function sortCars(cars: Car[], sortBy: SortKey): Car[] {
  if (sortBy === 'featured') return cars;
  const sorted = [...cars];
  switch (sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => (parsePriceFromNote(a.note) ?? Infinity) - (parsePriceFromNote(b.note) ?? Infinity));
      break;
    case 'price-desc':
      sorted.sort((a, b) => (parsePriceFromNote(b.note) ?? -Infinity) - (parsePriceFromNote(a.note) ?? -Infinity));
      break;
    case 'year-desc':
      sorted.sort((a, b) => Number(b.year) - Number(a.year));
      break;
    case 'year-asc':
      sorted.sort((a, b) => Number(a.year) - Number(b.year));
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
  return sorted;
}
