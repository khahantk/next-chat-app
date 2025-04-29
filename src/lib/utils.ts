import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInMilliseconds, format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const displayMsgTime = (sentAt: Date) => {
  const now = new Date();
  const diffMs = differenceInMilliseconds(now, sentAt);
  const oneDayMs = 24 * 60 * 60 * 1000;
  if (diffMs > oneDayMs) {
    return format(sentAt, 'M/d/yy HH:mm');
  } else {
    return format(sentAt, 'HH:mm');
  }
};