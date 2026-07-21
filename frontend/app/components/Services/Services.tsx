import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import styles from './Services.module.scss';
import { useNavigate } from 'react-router';
import { MatrixText } from '../MatrixText/MatrixText';

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
      stiffness: 78,
      damping: 18,
      mass: 0.9,
      delay,
    },
  }),
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const Services = () => {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.22 });

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
          className={styles.sectionTitle}
        >
          <MatrixText text="Наши услуги" />
        </motion.h2>

        <div className={styles.grid} ref={gridRef}>
          {/* Левая карточка */}
          <motion.div
            custom={{ x: -420, y: 20, rotate: -3, delay: 0.04 } satisfies DockMotion}
            initial="hidden"
            animate={isGridInView ? 'visible' : 'hidden'}
            variants={dockVariants}
            whileHover={{ scale: 1.02 }}
            className={`${styles.card} ${styles.leftCard}`}
          >
            <div className={styles.cardNumber}>01</div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Разработка сайтов</h3>
              <p className={styles.cardDesc}>
                От лендингов до сложных корпоративных порталов и интернет-магазинов с высокой посещаемостью.
              </p>
            </div>
          </motion.div>

          {/* Правая колонка */}
          <div className={styles.rightColumn}>
            {/* Верхняя правая карточка */}
            <motion.div
              custom={{ x: 420, y: -24, rotate: 3, delay: 0.13 } satisfies DockMotion}
              initial="hidden"
              animate={isGridInView ? 'visible' : 'hidden'}
              variants={dockVariants}
              whileHover={{ scale: 1.02 }}
              className={`${styles.card} ${styles.rightCard}`}
            >
              <div className={styles.cardNumber}>02</div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>CRM/ERP Системы</h3>
                <p className={styles.cardDesc}>
                  Внедряем и дорабатываем системы для управления продажами, складом и персоналом.
                </p>
              </div>
            </motion.div>

            {/* Нижняя кнопка-карточка */}
            <motion.div
              custom={{ x: 480, y: 34, rotate: 2, delay: 0.24 } satisfies DockMotion}
              initial="hidden"
              animate={isGridInView ? 'visible' : 'hidden'}
              variants={dockVariants}
              whileHover={{ scale: 1.02 }}
              className={`${styles.card} ${styles.actionCard}`}
              onClick={() => navigate('/services')}
            >
              <h3 className={styles.actionTitle}>
                Узнать больше <span>↗</span>
              </h3>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
