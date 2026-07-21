import { motion, type Variants } from "framer-motion";
import styles from "./HomePage.module.scss";
import { Intro } from "~/components/Intro/Intro";
import { useLang } from "~/hooks/useLang";
import { BottomSection } from "~/components/BottomSection/BottomSection";
import { useContactModal } from "~/hooks/useContactModal";
import { useRef, useState } from "react";
import Services from "~/components/Services/Services";
import Expertise from "~/components/Expertise/Expertise";
import { Button } from "~/components/Button/Button";
import { LiquidPlanet } from "~/components/Rtut/LiquidPlanet";
import video from '../../assets/videoCTA.mp4'
 
function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      className={[styles.marqueeRow, reverse ? styles.marqueeRowReverse : ""].join(" ")}
      aria-hidden="true"
    />
  );
}
const textAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
} as const satisfies Variants;

export function HomePage() {
  const { content } = useLang();
  const { openModal } = useContactModal();
      const [mobileOpen, setMobileOpen] = useState(false);
  const home = content.pages.home.content;

    const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 60 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <main className={styles.page}>
      <Intro title={home.hero.title} subtitle={home.hero.subtitle} stats={home.stats}/>

      <motion.section
        className={styles.statsSection}
        aria-labelledby="company-platform-title"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >

        <div className={styles.about}>
          <h2 id="company-platform-title" className={styles.aboutTitle}>
            {home.about.title}
          </h2>
        </div>
      </motion.section>

      <motion.section
        className={styles.featuresSection}
        aria-labelledby="features-title"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.container}>

        <div className={styles.itemsGrid}>
          {home.features.cards.map((item, index) => (
            <motion.div
              key={item.number}
              className={styles.item}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className={styles.featureNumber}>{item.number}</span>
              <h3 className={styles.featureTitle}>{item.title}</h3>
              <p className={styles.featureDescription}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.paragraph}>
           {home.about.text}
            </p>
        </motion.div>
      </motion.section>

        <motion.section
          className={styles.servicesSection}
          aria-labelledby="services-title"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
        <Services/>
        </motion.section>

        <motion.section
          className={styles.marqueeSection}
          aria-labelledby="marquee-title"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.marqueeInner}>
            <div className={styles.marqueeContent}>
              <h2 id="marquee-title" className={styles.marqueeText}>
                {home.marquee.text}
              </h2>
              <LiquidPlanet />
              {/* <img src={marqueImg} alt="img" className={styles.marqueeImg}/> */}
              
            <Button
                theme="white"
                className={styles.mobileCta}
                onClick={() => {
                  setMobileOpen(false);
                  openModal();
                }}
              >
                Стать клиентом
              </Button>
            </div>
          </div>
        </motion.section>
      
      <motion.section
        className={styles.industriesSection}
        aria-labelledby="industries-title"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <Expertise/>
      </motion.section>

      <BottomSection
        title={home.products.title}
        subtitle={home.products.text}
        items={home.caseStudy.items}
      />

      <section className={styles.cta}>
         <motion.div
          className={styles.ctaVideo}
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            className={styles.video}
            src={video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </motion.div>
        <motion.div 
          className={styles.ctaCard}
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={textAnimation}
        >
          
          <h2>Нужно решение под Вашу задачу?</h2>
          <p>Оставьте заявку и мы предложим стратегию разработки уже сегодня.</p>
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
                Стать клиентом
              </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
       <footer className={styles.footer}>
        <div className={styles.logo}>APTA</div>
        <div className={styles.contacts}>
          <div>
            <span>Email</span>
            <a href="mailto:info@Arta.zona">info@Arta.zona</a>
          </div>
          <div>
            <span>Наш офис</span>
            <p>Москва, Россия</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
