"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

// Letter categories and content
const letterCategories = ["love", "memories", "future", "dreams", "moments"]

// Generate 29 letters (for the 29th monthsary date)
const generateLetters = () => {
  const letters = []

  // Love letters
  letters.push({
    id: 1,
    category: "love",
    content: "When I’m stressed with coding and you message me, my worries fade as we talk.",
  })
  letters.push({
    id: 2,
    category: "love",
    content: "Just seeing your picture when I’m tired makes me feel like I’m not exhausted anymore.",
  })
  letters.push({
    id: 3,
    category: "love",
    content: "Your love has this magic—it makes everything feel lighter for me.",
  })
  letters.push({
    id: 4,
    category: "love",
    content: "Thank you for staying and loving me the way you do. I’m so lucky.",
  })
  letters.push({
    id: 5,
    category: "love",
    content: "Even now, I still can’t believe you said yes to me that day in the tricycle—hehe.",
  })
  letters.push({
    id: 6,
    category: "love",
    content: "I’ll never get tired of telling you how much you mean to me.",
  })

  // Memories letters
  letters.push({
    id: 7,
    category: "memories",
    content: "I’ll never forget sitting outside that closed green store at night, talking in the rain.",
  })
  letters.push({
    id: 8,
    category: "memories",
    content: "Remember when the guard kept scolding us by the fence, but we stayed anyway?",
  })
  letters.push({
    id: 9,
    category: "memories",
    content: "That time we rented bikes in Filinvest—I loved watching you enjoy the ride.",
  })
  letters.push({
    id: 10,
    category: "memories",
    content: "My birthday with you was simple, but you made it so special. Thank you.",
  })
  letters.push({
    id: 11,
    category: "memories",
    content: "All these little moments with you? They’re my favorites.",
  })

  // Future letters
  letters.push({
    id: 12,
    category: "future",
    content: "We’re building our future together, and I’ll always be here—I promise.",
  })
  letters.push({
    id: 13,
    category: "future",
    content: "Don’t worry too much about what’s ahead. We’ll figure it out, okay?",
  })
  letters.push({
    id: 14,
    category: "future",
    content: "No matter what happens, we’ll face it together and grow stronger.",
  })
  letters.push({
    id: 15,
    category: "future",
    content: "Let’s enjoy life as long as we’re alive. I’m excited for what’s coming.",
  })
  letters.push({
    id: 16,
    category: "future",
    content: "The more time passes, the more I want to build a life with you.",
  })

  // Dreams letters
  letters.push({
    id: 17,
    category: "dreams",
    content: "I dream of taking you to work every day, just being by your side.",
  })
  letters.push({
    id: 18,
    category: "dreams",
    content: "Let’s travel together, even just around our country, making memories.",
  })
  letters.push({
    id: 19,
    category: "dreams",
    content: "Imagine us biking in the park, feeling the breeze—I want that with you.",
  })
  letters.push({
    id: 20,
    category: "dreams",
    content: "One day, we’ll go abroad together too. I’ll make sure of it.",
  })
  letters.push({
    id: 21,
    category: "dreams",
    content: "My dreams are simple, but they keep me going because they’re with you.",
  })
  letters.push({
    id: 22,
    category: "dreams",
    content: "Every dream feels possible as long as you’re part of it.",
  })

  // Moments letters
  letters.push({
    id: 23,
    category: "moments",
    content: "It's the little moments with you that I treasure most - your laugh, your touch, your voice.",
  })
  letters.push({
    id: 24,
    category: "moments",
    content: "The way I hold your hand makes me feel like the luckiest person alive.",
  })
  letters.push({
    id: 25,
    category: "moments",
    content: "I love catching you looking at me when you think I don't notice.",
  })
  letters.push({
    id: 26,
    category: "moments",
    content: "Every time we meet, it feels like the first time—nervous but exciting.",
  })
  letters.push({
    id: 27,
    category: "moments",
    content: "The sound of your voice on the phone still gives me butterflies.",
  })
  letters.push({
    id: 28,
    category: "moments",
    content: "I cherish every second we spend together, creating memories that will last a lifetime.",
  })
  letters.push({
    id: 29,
    category: "moments",
    content: "Here’s to more months, more memories, and more love with you.",
  })

  return letters
}

const letters = generateLetters()

export default function Letters() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const filteredLetters =
    selectedCategory === "all" ? letters : letters.filter((letter) => letter.category === selectedCategory)

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
            All (29)
          </button>
          {letterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition-all ${
                selectedCategory === category
                  ? "bg-black text-white dark:bg-white dark:text-black"
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
          {filteredLetters.map((letter) => (
            <motion.div
              key={letter.id}
              variants={fadeIn}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium rounded-full capitalize">
                  {letter.category}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{letter.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

