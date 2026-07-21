
import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import styles from './Expertise.module.scss';
import eskp from '../../assets/images/image 983.png'
import { MatrixText } from '../MatrixText/MatrixText';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

interface DockMotion {
  x: number;
  y: number;
  rotate: number;
  delay: number;
}

const dockVariants: Variants = {
  hidden: ({ x, y, rotate }: DockMotion) => ({
    opacity: 0,
    x,
    y,
    rotate,
    scale: 0.96,
  }),
  visible: ({ delay }: DockMotion) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 76,
      damping: 18,
      mass: 0.92,
      delay,
    },
  }),
};

const Expertise = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.18 });

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
          <MatrixText text={'Экспертиза для ведущих\nсекторов экономики'} />
        </motion.h2>

        {/* Сетка карточек */}
        <div className={styles.gridContainer} ref={gridRef}>
          {/* Левая колонка */}
          <div className={styles.leftColumn}>
            {/* 01 — Ритейл и E-commerce */}
            <motion.div
              className={styles.cardRetail}
              custom={{ x: -460, y: -28, rotate: -3, delay: 0.04 } satisfies DockMotion}
              initial="hidden"
              animate={isGridInView ? 'visible' : 'hidden'}
              variants={dockVariants}
              whileHover={{ scale: 1.02 }}
            >
              <span className={styles.number}>01</span>
              <h3 className={styles.cardTitle}>Ритейл и E-commerce</h3>
              <p className={styles.cardText}>
                Разработка интернет-магазинов, интеграция с 1С и складскими
                системами. Автоматизация выкладки и ценообразования.
              </p>
            </motion.div>

            {/* 03 — Производство (синяя) */}
            <motion.div
              className={styles.cardProduction}
              custom={{ x: -500, y: 42, rotate: -2, delay: 0.18 } satisfies DockMotion}
              initial="hidden"
              animate={isGridInView ? 'visible' : 'hidden'}
              variants={dockVariants}
              whileHover={{ scale: 1.02 }}
            >
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
            <motion.div
              className={styles.cardLogistics}
              custom={{ x: 460, y: -34, rotate: 3, delay: 0.1 } satisfies DockMotion}
              initial="hidden"
              animate={isGridInView ? 'visible' : 'hidden'}
              variants={dockVariants}
              whileHover={{ scale: 1.02 }}
            >
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
              <motion.div
                className={styles.cardConsulting}
                custom={{ x: 380, y: 48, rotate: 2, delay: 0.24 } satisfies DockMotion}
                initial="hidden"
                animate={isGridInView ? 'visible' : 'hidden'}
                variants={dockVariants}
                whileHover={{ scale: 1.02 }}
              >
                <span className={styles.number}>04</span>
                <h3 className={styles.cardTitle}>
                  Услуги и
                  <br />
                  консалтинг
                </h3>
              </motion.div>

              {/* Карточка с изображением (esc) */}
              <motion.div
                className={styles.cardImage}
                custom={{ x: 500, y: 58, rotate: 4, delay: 0.31 } satisfies DockMotion}
                initial="hidden"
                animate={isGridInView ? 'visible' : 'hidden'}
                variants={dockVariants}
                whileHover={{ scale: 1.02 }}
              >
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
