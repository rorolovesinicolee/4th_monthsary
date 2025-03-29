"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

// Components
import Navbar from "@/components/navbar"
import ImageSlider from "@/components/image-slider"
import Letters from "@/components/letters"
import MusicPlayer from "@/components/music-player"
import VideoSection from "@/components/video-section"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar />


      <section className="container mx-auto px-4 pt-48 pb-32 md:pt-60 md:pb-40">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">Every Moment With You Is A Treasure</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl">
            A collection of our memories, feelings, and the little things that make our journey special.
          </p>
        </motion.div>
      </section>

      <motion.section
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-10"
      >
        <ImageSlider />
      </motion.section>

      <Letters />
      <MusicPlayer />
      <VideoSection />
      <AboutSection />
      <Footer />
    </main>
  )
}

