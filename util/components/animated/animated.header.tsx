'use client'
import { motion } from "framer-motion";


const AnimatedHeader = () => (
    <motion.h1
        className="text-2xl flex gap-1"
        initial="hidden"
        animate="visible"
        variants={{
            visible: { transition: { staggerChildren: 0.04 } },
            hidden: {},
        }}
    >
        {"Properties Management".split("").map((char, i) => (
            <motion.span
                key={i}
                variants={{
                    hidden: { opacity: 0, y: -20, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1.4 },
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                    mass: 0.2,
                }}
                style={{ display: "inline-block" }}
            >
                {char === " " ? "\u00A0" : char}
            </motion.span>
        ))}
    </motion.h1>
);

export { AnimatedHeader };