"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Lock } from "lucide-react"

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isUnlocked, setIsUnlocked] = useState(false)

  // Target date: March 29, 2025, 6:00 PM
  const targetDate = new Date("2025-03-29T18:00:00")

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date()

      // Check if we've reached the target date
      if (now >= targetDate) {
        setIsUnlocked(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      const difference = targetDate.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return { days, hours, minutes, seconds }
    }

    // Check if already unlocked (only once)
    const now = new Date()
    if (now >= targetDate) {
      setIsUnlocked(true)
      setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      return // Exit early if already unlocked
    }

    // Initial calculation (only once)
    setTimeRemaining(calculateTimeRemaining())

    // Update countdown every second
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining()
      setTimeRemaining(remaining)

      // Check if countdown has reached zero
      if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        setIsUnlocked(true)
        clearInterval(timer)
      }
    }, 1000)

    // Cleanup interval on component unmount
    return () => clearInterval(timer)
  }, []) // Empty dependency array - only run once on mount

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-light mb-4">By. Roro</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10">Happy Four-month anniversary, love!</p>

          <div className="max-w-2xl mx-auto">
            {/* Love letter image with countdown and lock */}
            <div className="mb-16 relative">
              <div className={`relative rounded-lg shadow-md overflow-hidden ${!isUnlocked ? "filter blur-lg" : ""}`}>
                <Image
                  src="/assets/letter/letters.jpg"
                  alt="Love Letter"
                  width={600}
                  height={800}
                  className="mx-auto"
                  unoptimized
                />
              </div>

              {/* Locked overlay */}
              {!isUnlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 rounded-lg">
                  <Lock className="w-16 h-16 text-white mb-4" />
                  <p className="text-white text-xl font-bold mb-6">Locked Until March 29</p>

                  {/* Countdown timer */}
                  <div className="grid grid-cols-4 gap-4 text-white">
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold">{timeRemaining.days}</div>
                      <div className="text-sm">Days</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold">{timeRemaining.hours}</div>
                      <div className="text-sm">Hours</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold">{timeRemaining.minutes}</div>
                      <div className="text-sm">Minutes</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold">{timeRemaining.seconds}</div>
                      <div className="text-sm">Seconds</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Unlock animation */}
              {isUnlocked && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 0] }}
                    transition={{ duration: 2 }}
                    className="w-full h-full bg-white/30 rounded-full"
                  />
                </motion.div>
              )}
            </div>

            {/* Profile section */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src="/assets/profile-pic/myprofile.jpg" // Replace with your profile image
                  alt="Jair Legaspi"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-xl font-medium">Jair Legaspi</h3>
              <p className="text-gray-600 dark:text-gray-400">your man</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

