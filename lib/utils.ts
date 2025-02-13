import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string): string =>
    name
        .split("")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

export const dateConverter = (timestamp: string): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case diffInDays > 7:
      const weeks = Math.floor(diffInDays / 7);
      return weeks === 1 ? `1 week ago` : `${weeks} weeks ago`;
    case diffInDays >= 1 && diffInDays <= 7:
      const days = Math.floor(diffInDays);
      return days === 1 ? `1 day ago` : `${days} days ago`;
    case diffInHours >= 1:
      const hours = Math.floor(diffInHours);
      return hours === 1 ? `1 hour ago` : `${hours} hours ago`;
    case diffInMinutes >= 1:
      const minutes = Math.floor(diffInMinutes);
      return minutes === 1 ? `1 minute ago` : `${minutes} minutes ago`;
    default:
      return 'Just now';
  }
};

export const countdownTimer = (endDate: string): string => {
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();

  if (end <= now) return "UNLOCKED";

  const diff = end - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${days} d : ${hours} h : ${minutes} m : ${seconds} s`;
};