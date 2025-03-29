"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { shuffle } from "@/lib/utils"

// Letter categories with colors
const categoryColors = {
  love: {
    bg: "bg-pink-100",
    border: "border-pink-200",
    text: "text-pink-800",
    darkBg: "dark:bg-pink-900/30",
    darkBorder: "dark:border-pink-800/50",
    darkText: "dark:text-pink-200",
  },
  memories: {
    bg: "bg-blue-100",
    border: "border-blue-200",
    text: "text-blue-800",
    darkBg: "dark:bg-blue-900/30",
    darkBorder: "dark:border-blue-800/50",
    darkText: "dark:text-blue-200",
  },
  future: {
    bg: "bg-purple-100",
    border: "border-purple-200",
    text: "text-purple-800",
    darkBg: "dark:bg-purple-900/30",
    darkBorder: "dark:border-purple-800/50",
    darkText: "dark:text-purple-200",
  },
  dreams: {
    bg: "bg-green-100",
    border: "border-green-200",
    text: "text-green-800",
    darkBg: "dark:bg-green-900/30",
    darkBorder: "dark:border-green-800/50",
    darkText: "dark:text-green-200",
  },
  moments: {
    bg: "bg-amber-100",
    border: "border-amber-200",
    text: "text-amber-800",
    darkBg: "dark:bg-amber-900/30",
    darkBorder: "dark:border-amber-800/50",
    darkText: "dark:text-amber-200",
  },
}

// Generate 29 letters (for the 29th monthsary date)
const generateLetters = () => {
  const letters = []

  // Love letters
  letters.push({
    id: 1,
    categories: ["love"],
    content: "When I'm stressed with coding and you message me, my worries fade as we talk.",
  })
  letters.push({
    id: 2,
    categories: ["love", "moments"],
    content: "Just seeing your picture when I'm tired makes me feel like I'm not exhausted anymore.",
  })
  letters.push({
    id: 3,
    categories: ["love"],
    content: "Your love has this magic—it makes everything feel lighter for me.",
  })
  letters.push({
    id: 4,
    categories: ["love", "future"],
    content: "Thank you for staying and loving me the way you do. I'm so lucky.",
  })
  letters.push({
    id: 5,
    categories: ["love", "memories"],
    content: "Even now, I still can't believe you said yes to me that day in the tricycle—hehe.",
  })
  letters.push({
    id: 6,
    categories: ["love"],
    content: "I'll never get tired of telling you how much you mean to me.",
  })

  // Memories letters
  letters.push({
    id: 7,
    categories: ["memories", "moments"],
    content: "I'll never forget sitting outside that closed green store at night, talking in the rain.",
  })
  letters.push({
    id: 8,
    categories: ["memories"],
    content: "Remember when the guard kept scolding us by the fence, but we stayed anyway?",
  })
  letters.push({
    id: 9,
    categories: ["memories", "moments"],
    content: "That time we rented bikes in Filinvest—I loved watching you enjoy the ride.",
  })
  letters.push({
    id: 10,
    categories: ["memories", "love"],
    content: "My birthday with you was simple, but you made it so special. Thank you.",
  })
  letters.push({
    id: 11,
    categories: ["memories", "moments"],
    content: "All these little moments with you? They're my favorites.",
  })

  // Future letters
  letters.push({
    id: 12,
    categories: ["future", "love"],
    content: "We're building our future together, and I'll always be here—I promise.",
  })
  letters.push({
    id: 13,
    categories: ["future"],
    content: "Don't worry too much about what's ahead. We'll figure it out, okay?",
  })
  letters.push({
    id: 14,
    categories: ["future"],
    content: "No matter what happens, we'll face it together and grow stronger.",
  })
  letters.push({
    id: 15,
    categories: ["future", "dreams"],
    content: "Let's enjoy life as long as we're alive. I'm excited for what's coming.",
  })
  letters.push({
    id: 16,
    categories: ["future", "dreams"],
    content: "The more time passes, the more I want to build a life with you.",
  })

  // Dreams letters
  letters.push({
    id: 17,
    categories: ["dreams", "future"],
    content: "I dream of taking you to work every day, just being by your side.",
  })
  letters.push({
    id: 18,
    categories: ["dreams"],
    content: "Let's travel together, even just around our country, making memories.",
  })
  letters.push({
    id: 19,
    categories: ["dreams", "moments"],
    content: "Imagine us biking in the park, feeling the breeze—I want that with you.",
  })
  letters.push({
    id: 20,
    categories: ["dreams", "future"],
    content: "One day, we'll go abroad together too. I'll make sure of it.",
  })
  letters.push({
    id: 21,
    categories: ["dreams"],
    content: "My dreams are simple, but they keep me going because they're with you.",
  })
  letters.push({
    id: 22,
    categories: ["dreams", "love"],
    content: "Every dream feels possible as long as you're part of it.",
  })

  // Moments letters
  letters.push({
    id: 23,
    categories: ["moments", "love"],
    content: "It's the little moments with you that I treasure most - your laugh, your touch, your voice.",
  })
  letters.push({
    id: 24,
    categories: ["moments"],
    content: "The way I hold your hand makes me feel like the luckiest person alive.",
  })
  letters.push({
    id: 25,
    categories: ["moments"],
    content: "I love catching you looking at me when you think I don't notice.",
  })
  letters.push({
    id: 26,
    categories: ["moments", "memories"],
    content: "Every time we meet, it feels like the first time—nervous but exciting.",
  })
  letters.push({
    id: 27,
    categories: ["moments"],
    content: "The sound of your voice on the phone still gives me butterflies.",
  })
  letters.push({
    id: 28,
    categories: ["moments", "memories"],
    content: "I cherish every second we spend together, creating memories that will last a lifetime.",
  })
  letters.push({
    id: 29,
    categories: ["moments", "love", "future"],
    content: "Here's to more months, more memories, and more love with you.",
  })

  return letters
}

const allLetters = generateLetters()

export default function Letters() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [letters, setLetters] = useState(allLetters)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Shuffle letters when in "all" category
  useEffect(() => {
    if (selectedCategory === "all") {
      setLetters(shuffle([...allLetters]))
    } else {
      setLetters(allLetters.filter((letter) => letter.categories.includes(selectedCategory)))
    }
  }, [selectedCategory])

  // Get unique categories for filter buttons
  const uniqueCategories = [...new Set(allLetters.flatMap((letter) => letter.categories))]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Get category badge styles
  const getCategoryStyles = (category) => {
    const colors = categoryColors[category]
    return `${colors.bg} ${colors.border} ${colors.text} ${colors.darkBg} ${colors.darkBorder} ${colors.darkText}`
  }

  return (
    <section id="letters" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-light mb-4">Letters</h2>
          <p className="text-gray-600 dark:text-gray-400">Categorized notes from my heart to yours.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              selectedCategory === "all"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            All ({allLetters.length})
          </button>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
                selectedCategory === category
                  ? `${categoryColors[category].bg} ${categoryColors[category].text} border-2 ${categoryColors[category].border} dark:bg-opacity-20 dark:border-opacity-50`
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {letters.map((letter) => (
            <motion.div
              key={letter.id}
              variants={fadeIn}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="mb-4 flex flex-wrap gap-2">
                {letter.categories.map((category) => (
                  <span
                    key={`${letter.id}-${category}`}
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full capitalize border ${getCategoryStyles(category)}`}
                  >
                    {category}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300">{letter.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

