import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Decision } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scoreColor(score: number): string {
  if (score >= 75) return "text-success";
  if (score >= 50) return "text-warning";
  return "text-danger";
}

export function scoreBgColor(score: number): string {
  if (score >= 75) return "bg-success";
  if (score >= 50) return "bg-warning";
  return "bg-danger";
}

export function scoreBadgeClasses(score: number): string {
  if (score >= 75) return "bg-green-100 text-green-800";
  if (score >= 50) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

export function decisionLabel(decision: Decision): string {
  switch (decision) {
    case "approved":
      return "Approved";
    case "denied":
      return "Denied";
    case "flagged_for_review":
      return "Flagged for Review";
  }
}

export function decisionBadgeClasses(decision: Decision): string {
  switch (decision) {
    case "approved":
      return "bg-green-100 text-green-800";
    case "denied":
      return "bg-red-100 text-red-800";
    case "flagged_for_review":
      return "bg-yellow-100 text-yellow-800";
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatFactorName(key: string): string {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
