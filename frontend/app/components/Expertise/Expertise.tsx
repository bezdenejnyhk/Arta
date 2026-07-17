
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Expertise.module.scss';
import eskp from '../../assets/images/image 983.png'

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const cardProps = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '-50px' },
  variants: fadeUpVariant,
  whileHover: { scale: 1.02 },
  transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
};

const Expertise = () => {
  return (
    <section className={styles.expertiseSection}>
      <div className={styles.container}>
        {/* Заголовок */}
        <motion.h2
          className={styles.mainTitle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUpVariant}
        >
          Экспертиза для ведущих
          <br />
          секторов экономики
        </motion.h2>

        {/* Сетка карточек */}
        <div className={styles.gridContainer}>
          {/* Левая колонка */}
          <div className={styles.leftColumn}>
            {/* 01 — Ритейл и E-commerce */}
            <motion.div className={styles.cardRetail} {...cardProps}>
              <span className={styles.number}>01</span>
              <h3 className={styles.cardTitle}>Ритейл и E-commerce</h3>
              <p className={styles.cardText}>
                Разработка интернет-магазинов, интеграция с 1С и складскими
                системами. Автоматизация выкладки и ценообразования.
              </p>
            </motion.div>

            {/* 03 — Производство (синяя) */}
            <motion.div className={styles.cardProduction} {...cardProps}>
              <span className={`${styles.number} ${styles.numberInverted}`}>03</span>
              <h3 className={styles.cardTitle}>Производство</h3>
              <p className={styles.cardText}>
                Внедрение ERP и MES-систем для контроля себестоимости и
                планирования поставок.
              </p>
            </motion.div>
          </div>

          {/* Правая колонка */}
          <div className={styles.rightColumn}>
            {/* 02 — Логистика */}
            <motion.div className={styles.cardLogistics} {...cardProps}>
              <span className={styles.number}>02</span>
              <h3 className={styles.cardTitle}>Логистика</h3>
              <p className={styles.cardText}>
                Системы управления складом (WMS), трекинг транспорта в реальном
                времени.
              </p>
            </motion.div>

            {/* Нижний ряд правой колонки */}
            <div className={styles.rightBottomRow}>
              {/* 04 — Услуги и консалтинг */}
              <motion.div className={styles.cardConsulting} {...cardProps}>
                <span className={styles.number}>04</span>
                <h3 className={styles.cardTitle}>
                  Услуги и
                  <br />
                  консалтинг
                </h3>
              </motion.div>

              {/* Карточка с изображением (esc) */}
              <motion.div className={styles.cardImage} {...cardProps}>
                <img src={eskp} alt="Esc" className={styles.escImage} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;