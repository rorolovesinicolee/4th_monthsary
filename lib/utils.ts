import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fisher-Yates shuffle algorithm
export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array]
  let currentIndex = newArray.length
  let randomIndex

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element
    ;[newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]]
  }

  return newArray
}

