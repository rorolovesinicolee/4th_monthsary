"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Play, Pause } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [autoplayAttempted, setAutoplayAttempted] = useState(false)
  const audioRef = useRef(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    const audio = audioRef.current

    const setAudioData = () => {
      setDuration(audio.duration)
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      // If not looping, we'd handle the ended event here
      // But since we're using the loop attribute, this won't fire unless loop is disabled
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    // Events
    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)

    // Cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
    }
  }, [])

  // Attempt autoplay when component mounts
  useEffect(() => {
    if (!autoplayAttempted) {
      const audio = audioRef.current

      // Set loop attribute
      audio.loop = true

      // Attempt to play (this may be blocked by browser)
      const playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started successfully
            setIsPlaying(true)
          })
          .catch((error) => {
            // Autoplay was prevented
            console.log("Autoplay prevented:", error)
            // We'll rely on user interaction to start playback
          })
      }

      setAutoplayAttempted(true)
    }
  }, [autoplayAttempted])

  const togglePlay = () => {
    const audio = audioRef.current

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }

    setIsPlaying(!isPlaying)
  }

  // Format time in minutes and seconds
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Calculate progress percentage
  const progressPercentage = (currentTime / duration) * 100 || 0

  return (
    <section id="music" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-light mb-4">Music</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10">This song reminds me of you.</p>

          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                <Image
                  src="/assets/album-cover/album-pic.jpg" // Replace with your album cover
                  alt="Album Cover"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-medium text-center mb-1">Favorite Person</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-6">Delorians</p>

                {/* Audio element with loop attribute */}
                <audio ref={audioRef} src="/assets/album-song/album-song.mp3" loop />

                {/* Progress bar */}
                <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
                  <div
                    className="h-full bg-black dark:bg-white rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>

                {/* Time and controls */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(currentTime)}</span>

                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                  </button>

                  <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* Audio wave animation */}
            <div className="mt-8 flex items-center justify-center h-16">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 mx-0.5 bg-black dark:bg-white rounded-full"
                  animate={{
                    height: isPlaying ? [15, Math.random() * 30 + 5, 15] : 15,
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.05,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

