import React, { useState, type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import styles from './ServicesPage.module.scss';
import { useContactModal } from '~/hooks/useContactModal';
import { Button } from '~/components/Button/Button';
import img1 from '../../assets/images/services_1.png'
import img2 from '../../assets/images/services_2.png'
import img3 from '../../assets/images/services_3.png'
import img4 from '../../assets/images/services_4.png'
import img5 from '../../assets/images/services_5.png'
import img6 from '../../assets/images/services_6.jpg'
import Bubble from '~/components/Bubble/Bubble';
import bubbleImg from '../../assets/bubble.png'
import video from '../../assets/videoCTA.mp4'
import { MatrixText } from '~/components/MatrixText/MatrixText';

interface BubbleProps {
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

interface FadeInScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const textAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
} as const satisfies Variants;

// Компонент для плавающих шариков
const FloatingBubble: React.FC<BubbleProps> = ({ size, top, left, delay, duration }: {size: number, top: string, left: string, delay: number, duration: number}) => (
  <motion.div
    className={styles.bubble}
    style={{ width: size, height: size, top, left }}
    animate={{
      y: [0, -30, 0, 15, 0],
      x: [0, 15, 0, -15, 0],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  />
);

// Обертка для анимации появления при скролле
const FadeInScroll: React.FC<FadeInScrollProps> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export function ServicesPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { openModal } = useContactModal();
  const webDevCards = [
    { id: '01', title: 'E-commerce и ритейл', desc: 'Разработка интернет-магазинов, интеграция с 1С и складскими системами. Автоматизация скидок и ценообразования.', img: img1 },
    { id: '02', title: 'Корпоративные сайты', desc: 'Разработка интернет-магазинов, интеграция с 1С и складскими системами.', img: img2 },
    { id: '03', title: 'Интернет магазины', desc: 'Разработка интернет-магазинов, интеграция с 1С и складскими системами.', img: img3 },
    { id: '04', title: 'Личные кабинеты и B2B порталы', desc: 'Создаем решения для оптовых клиентов с привязкой, аналитикой и статусами заказов.', img: img4 },
    { id: '05', title: 'Десктоп-решения для Windows', desc: 'Desktop-решения для Windows с интеграцией в систему, фоновые программы, парсинг.', img: img5 },
    { id: '06', title: 'Разработка ПО для спортсменов', desc: 'Разработка ПО для управления тренировками, медицинского мониторинга и спортивной статистики.', img: img6 },
  ];

  const highloadItems = [
    { id: '01', title: 'Разработка бэкенда', desc: 'Создаем надежную, масштабируемую архитектуру. Работаем с микросервисами, интегрируем системы.' },
    { id: '02', title: 'Разработка фронтенда', desc: 'Создаем интерфейсы, которые нравятся пользователям. Быстрая загрузка, адаптивность.' },
    { id: '03', title: 'Высоконагруженные системы', desc: 'Проектируем системы, которые не падают под нагрузкой.' },
    { id: '04', title: 'Облачная инфраструктура, DevOps', desc: 'Развиваем и оптимизируем серверы, настраиваем CI/CD.' },
  ];

  return (
    <div className={styles.container}>
      {/* Шарики на фоне */}
              <Bubble src={bubbleImg} size={300} top="8%" left="33%" duration={6} />
        <Bubble src={bubbleImg} size={80} top="0%" left="80%" duration={8} />
        <Bubble src={bubbleImg} size={300} top="6%" left="73%" duration={6} />
        <Bubble src={bubbleImg} size={120} top="5%" left="90%" duration={5} />
        <Bubble src={bubbleImg} size={400} top="12%" left="80%" duration={5} />
        <Bubble src={bubbleImg} size={200} top="69%" left="10%" duration={10} />
        <Bubble src={bubbleImg} size={500} top="60%" left="-10%" duration={10} />
        <Bubble src={bubbleImg} size={100} top="80%" left="75%" duration={7} />
        <Bubble src={bubbleImg} size={500} top="5%" left="-10%" duration={7} />
        <Bubble src={bubbleImg} size={400} top="40%" left="65%" duration={7} />
        <Bubble src={bubbleImg} size={300} top="50%" left="55%" duration={7} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <FadeInScroll>
          <h1 className={styles.heroTitle}>
            <MatrixText text="УСЛУГИ" duration={950} />
          </h1>
          <p className={styles.heroSubtitle}>
            Разрабатываем решения любой сложности — от быстрого лендинга до высоконагруженных экосистем. Находим направление, которое решит вашу задачу.
          </p>
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
        </FadeInScroll>
      </section>

      {/* Веб-разработка Section */}
      <section className={styles.section}>
        <FadeInScroll>
          <h2 className={styles.sectionTitle}>
            <MatrixText text="Веб-разработка" />
          </h2>
          <p className={styles.sectionSubtitle}>
            Инструменты для вашего роста и онлайн-присутствия. Создаем сайты, которые продают.
          </p>
        </FadeInScroll>

        <div className={styles.grid}>
          {webDevCards.map((card, index) => (
            <motion.div 
              key={card.id} 
              className={styles.card}
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.cardImageWrapper}>
                <span className={styles.cardNumber}>{card.id}</span>
                <img src={card.img} alt={card.title} className={styles.cardImage} />
              </div>
              <div className={styles.cardContent}>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Highload Section */}
      <section className={styles.section}>
        <FadeInScroll>
          <h2 className={styles.sectionTitle}>
            <MatrixText text={'Highload, бэкенд и\nинфраструктура'} />
          </h2>
          <p className={styles.sectionSubtitle}>
            Сервисы высокопроизводительных серверов.
          </p>
        </FadeInScroll>

        <div className={styles.list}>
          {highloadItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              className={styles.listItem}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
              <span className={styles.listNumber}>{item.id}</span>
              <div className={styles.listText}>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <FadeInScroll>
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
      </FadeInScroll>

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
    </div>
  );
}
