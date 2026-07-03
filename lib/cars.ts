import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Car } from './types';

const CARS_JSON_PATH = path.join(process.cwd(), 'data', 'cars.json');

export async function readCarsFromDisk(): Promise<Car[]> {
  const raw = await readFile(CARS_JSON_PATH, 'utf-8');
  const parsed = JSON.parse(raw) as { cars?: Car[] };
  return Array.isArray(parsed.cars) ? parsed.cars : [];
}
