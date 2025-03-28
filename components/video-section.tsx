"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function VideoSection() {
  const videoRef = useRef(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="video" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-light mb-4">A video</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10">
            haynaku, hindi ko naayos ang bidyow kc haix, hindi sinend yung Filinvest
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <video
                ref={videoRef}
                controls
                className="w-full h-full object-cover"
                poster="/assets/video/video-tumbnail.jpg" // Replace with your thumbnail
              >
                <source src="https://drive.google.com/file/d/1KKrhtoX4E5IxoPLw6oLr3svdetj4ih2s/view?usp=sharing" type="video/mp4" /> {/* Replace with your video */}
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

