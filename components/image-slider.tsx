"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right to left, -1 for left to right

  // Replace these with your actual image paths
  const images = [
    "/image-slider/mybirthday.jpg",
    "/image-slider/picture-in-elevator.jpg",
    "/image-slider/me-with-cat.jpg",
    "/image-slider/youwithflowers.jpg",
    "/image-slider/us-in-gmeet.jpg",
    "/image-slider/us-in-elevator.jpg",
    "/image-slider/our-shadow.jpg",
    "/image-slider/you-in-restroom.jpg",
    "/image-slider/picture-paint.jpg",
    "/image-slider/us-together.jpg",
    "/image-slider/our-streak.jpg",
    "/image-slider/us-in-mirror.jpg",
    "/image-slider/white-rose.jpg",
    "/image-slider/chocolates.jpg",
    "/image-slider/us-in-elevator.jpg",
    "/image-slider/us-in-future.jpg",
  ]

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1) // Always slide left for auto-advance
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  // Handle manual navigation
  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Handle dot navigation
  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Variants for slide animations
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
    }),
    center: {
      x: 0,
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
    }),
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover"
            unoptimized
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows (optional) */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
        <button
          onClick={handlePrevious}
          className="bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-4" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

