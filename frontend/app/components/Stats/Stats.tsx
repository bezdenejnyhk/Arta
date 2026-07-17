import { motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from './Stats.module.scss'

export function Stats({ stats }: { stats: { value: string; label: string }[] }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

    useEffect(() => {
        if (!isInView) return;

        const targets = stats.map(stat => parseFloat(stat.value) || 0);
        const duration = 2000;
        const frameRate = 60;
        const totalFrames = (duration / 1000) * frameRate;
        
        let frame = 0;
        const interval = setInterval(() => {
            frame++;
            const progress = Math.min(frame / totalFrames, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            
            setCounts(targets.map(target => target * eased));
            
            if (frame >= totalFrames) {
                clearInterval(interval);
                setCounts(targets);
            }
        }, 1000 / frameRate);

        return () => clearInterval(interval);
    }, [isInView, stats]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    // Функция для извлечения числа и суффикса
    const parseValue = (value: string) => {
        const match = value.match(/^([\d.]+)(.*)$/);
        if (match) {
            return {
                number: parseFloat(match[1]),
                suffix: match[2] // сохраняет +, %, /7, K, M и т.д.
            };
        }
        return {
            number: 0,
            suffix: value
        };
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className={styles.stats}>
                {stats.map(({ value, label }, index) => {
                    const { number, suffix } = parseValue(value);
                    const displayNumber = isInView 
                        ? value.includes('.')
                            ? counts[index].toFixed(1)
                            : Math.floor(counts[index]).toString()
                        : '0';
                    
                    return (
                        <motion.article 
                            key={label} 
                            className={styles.stat}
                            variants={itemVariants}
                        >
                            <div className={styles.statValue}>
                                {displayNumber}
                                {suffix}
                            </div>
                            <p className={styles.statLabel}>{label}</p>
                        </motion.article>
                    );
                })}
            </div>
        </motion.div>
    )
}