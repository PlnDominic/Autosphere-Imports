import { NextResponse } from 'next/server';
import { readCarsFromDisk } from '@/lib/cars';

export async function GET() {
  const cars = await readCarsFromDisk();
  return NextResponse.json({ cars });
}
