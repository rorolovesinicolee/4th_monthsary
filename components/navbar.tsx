"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white dark:bg-gray-900 shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm font-extrabold tracking-widest">FROM RORO</div>

          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-lg"
            aria-label="Toggle theme"
          >
            29
          </button>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>

        <div className="text-center mt-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider">HAPPY 4TH MONTHSARY!</h2>
        </div>

        <div className="hidden md:flex items-center justify-center space-x-8 mt-4">
          <Link href="#" className="text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href="#letters" className="text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            Letters
          </Link>
          <Link href="#music" className="text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            Music
          </Link>
          <Link href="#video" className="text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            Video
          </Link>
          <Link href="#about" className="text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            By. Roro
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col"
        >
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <div className="text-sm font-extrabold tracking-widest">FROM J</div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold text-lg"
                aria-label="Toggle theme"
              >
                29
              </button>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="text-center py-6">
            <h2 className="text-2xl font-bold tracking-wider">HAPPY 4TH MONTHSARY!</h2>
          </div>

          <div className="flex flex-col items-center space-y-6 py-10">
            <Link
              href="#"
              className="text-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#letters"
              className="text-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Letters
            </Link>
            <Link
              href="#music"
              className="text-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Music
            </Link>
            <Link
              href="#video"
              className="text-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Video
            </Link>
            <Link
              href="#about"
              className="text-lg hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              By. Roro
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  )
}

