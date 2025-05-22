import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (number: number) => {
  if (number < 1) {
    return parseFloat(Number(number).toPrecision(4));
  }
  return parseFloat(Number(number).toFixed(2));
};
