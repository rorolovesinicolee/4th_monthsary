"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"

export default function Footer() {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    // Update the date every second
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)

    // Clean up the interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="py-10 border-t dark:border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {format(currentDate, "EEEE, MMMM d, yyyy")} | <Clock />
        </p>
        <CountdownTimer />
      </div>
    </footer>
  )
}

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <span className="inline-block min-w-20">{format(time, "h:mm:ss a")}</span>
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set this to tomorrow (March 29, 2025)
  const targetDate = new Date("2025-03-29T00:00:00")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // If we've passed the target date
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Calculate immediately
    calculateTimeLeft()

    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Countdown to Monthsary:</p>
      <div className="flex justify-center gap-4">
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <CountdownUnit value={timeLeft.minutes} label="Minutes" />
        <CountdownUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  )
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <span className="text-2xl font-bold transition-all duration-500 animate-pulse">{value}</span>
        <div className="absolute h-0.5 w-full bg-gray-200 dark:bg-gray-700 top-1/2 transform -translate-y-1/2" />
      </div>
      <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  )
}

