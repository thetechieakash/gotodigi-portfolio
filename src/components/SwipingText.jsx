import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { TEXTS } from '../constant';

export default function SwipingText() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex(prev => (prev + 1) % TEXTS.length)
        }, 3000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative h-14 overflow-hidden my-2">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 text-xl font-bold text-black/60 dark:text-white/60"
                >
                    {TEXTS[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}