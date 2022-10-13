import { TICK_INTERVAL } from "./constants";

export function clampValue(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
export function roundToTickInterval(interval: number): number {
  return Math.floor(interval / TICK_INTERVAL) * TICK_INTERVAL;
}
