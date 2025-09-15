'use client'

import { useTransform, motion, MotionValue } from 'framer-motion'
import Image from 'next/image'
import styles from './zoomparallax.module.scss'
import FallbackImage from '../fallback-image'

interface Props {
  src: string
  scaleRange: [number, number]
  scrollYProgress: MotionValue<number>
  index: number
}

export default function ParallaxImage({ src, scaleRange, scrollYProgress, index }: Props) {
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange)

  return (
    <motion.div style={{ scale }} className={`${styles.el} ${styles[`el${index + 1}`]}`}>
      <div className={styles.imageContainer}>
        <FallbackImage src="nail" fill alt="Parallax Image"  />
      </div>
    </motion.div>
  )
}
