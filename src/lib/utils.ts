import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Accepts a date-only value ("2026-12-05", read as local time) or a full ISO timestamp from the API.
export function parseDate(value: string, time = '12:00:00') {
  return new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T${time}` : value)
}
