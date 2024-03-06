import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const randomNumber = function createRandomNumber(base, max) {
  let randomIndex = base;

  randomIndex = Math.floor(Math.random() * max);

  if (randomIndex === base) {
    return createRandomNumber(base, max);
  } else return randomIndex;
};
