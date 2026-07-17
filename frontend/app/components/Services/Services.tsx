import React from 'react';
import { motion } from 'framer-motion';
import styles from './Services.module.scss';
import { useNavigate } from 'react-router';

const Services = () => {
    const navigate = useNavigate()
  // Анимация контейнера — поочерёдное появление дочерних элементов
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

 const itemTransition = {
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1.0] as const,
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className={styles.servicesSection}>
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.h2
          variants={itemVariants}
          transition={itemTransition}
          className={styles.sectionTitle}
        >
          Наши услуги
        </motion.h2>

        <div className={styles.grid}>
          {/* Левая карточка */}
          <motion.div
            variants={itemVariants}
            transition={itemTransition}
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
              variants={itemVariants}
              transition={itemTransition}
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
              variants={itemVariants}
              transition={itemTransition}
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
      </motion.div>
    </section>
  );
};

export default Services;
