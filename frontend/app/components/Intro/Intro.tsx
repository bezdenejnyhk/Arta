import { motion } from "framer-motion";
import styles from "./Intro.module.scss";
import { Stats } from "../Stats/Stats";
import { Button } from "../Button/Button";
import { useState } from "react";
import { useContactModal } from "~/hooks/useContactModal";
import { useLang } from "~/hooks/useLang";
import video from '../../assets/video-44403bdc-6d98-4626-9412-27e103481876.mp4'

export function Intro({
  title,
  subtitle,
  stats,
}: {
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
}) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { openModal } = useContactModal();
      const { content } = useLang();
      const { components } = content;
     const { startConversation } = components.header;
  return (
    <section id="intro" className={styles.intro}>
      <motion.div
        className={styles.introWrapper}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          {title}
        </motion.h1>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          <p className={styles.subtitle}>{subtitle}</p>

        </motion.div>
        <Stats stats={stats}/>
        <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
                theme="white"
                className={styles.mobileCta}
                onClick={() => {
                  setMobileOpen(false);
                  openModal();
                }}
              >
                {startConversation}
              </Button>
          </motion.div>
      </motion.div>
    </section>
  );
}
