"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Replace these with your actual image paths
  const images = [
    "/image-slider/mybirthday.jpg",
    "/image-slider/picture-in-elevator.jpg",
    "/image-slider/me-with-cat.jpg",
    "/image-slider/youwithflowers.jpg",
    "/image-slider/us-in-elevator.jpg",
    "/image-slider/our-shadow.jpg",
    "/image-slider/picture-paint.jpg",
    "/image-slider/us-together.jpg",
    "/image-slider/us-in-elevator.jpg",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover"
            // Use placeholder until you replace with actual images
            unoptimized
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-4" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

