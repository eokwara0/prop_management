'use client'
import * as React from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'


interface TooltipItem {
    icon? : any
  image: string
  name: string
  fallback: string
  designation: string
}

function AnimatedTooltip({ items }: { items: TooltipItem[] }) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const springConfig = { stiffness: 100, damping: 5 }

  // going to set this value on mouse move
  const x = useMotionValue(0)

  // rotate the tooltip
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig)

  // translate the tooltip
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig)

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2

    // set the x value, which is then used in transform and rotate
    x.set(event.nativeEvent.offsetX - halfWidth)
  }

  return (
    <>
      {items.map((item, index) => (
        <div
          className='relative -me-2.5'
          key={item.name}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode='popLayout'>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 30, x:100, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 50,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 10
                  }
                }}
                exit={{ opacity: 0, y: 30, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: 'nowrap'
                }}
                className='text-primary-foreground bg-primary absolute start-1/2 -top-2 z-50 flex -translate-x-1/2 -translate-y-full flex-col items-center justify-center rounded-md px-4 py-2 text-xs shadow-xl'
              >
                <div className='relative z-1 text-base font-semibold'>{item.name}</div>
                <div className='text-primary-foreground/80 text-xs'>{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
            {<item.icon/>}
        </div>
      ))}
    </>
  )
}

export { AnimatedTooltip }
