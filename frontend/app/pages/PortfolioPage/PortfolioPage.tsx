import { useRef, useState, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, type MotionValue, type Variants } from 'framer-motion';
import { MatrixText } from '~/components/MatrixText/MatrixText';
import styles from './PortfolioPage.module.scss';
import Bubble from '../../components/Bubble/Bubble';
import projectBuildova from "../../assets/images/project_1.png";
import projectTarot from "../../assets/images/project_2.png";
import projectCrypto from "../../assets/images/project_3.png";
import projectConsulting from "../../assets/images/project_4.png";

import bubbleImg from '../../assets/bubble.png';
import { useLang } from '~/hooks/useLang';
import { useContactModal } from '~/hooks/useContactModal';
import { Button } from '~/components/Button/Button';
import video from '../../assets/videoCTA.mp4'
import videoStar from '../../assets/videoLoop.mp4'

const textAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
} as const satisfies Variants;

const PROJECT_IMAGES = [projectBuildova, projectTarot, projectCrypto, projectConsulting];

type ReviewDeckStyle = CSSProperties & {
  "--review-scroll-height": string;
};

type ReviewItem = {
  id: number;
  rating: string;
  text: string;
  author: string;
  date: string;
};

function ReviewDealCard({
  review,
  index,
  total,
  scrollYProgress,
}: {
  review: ReviewItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segment = 1 / Math.max(total, 1);
  const start = index * segment;
  const hold = Math.min(start + segment * 0.38, 0.94);
  const end = Math.min(start + segment * 0.92, 1);
  const gone = Math.min(end + 0.08, 1);
  const baseRotate = (index - (total - 1) / 2) * 2.2;
  const baseY = (index - (total - 1) / 2) * 7;

  const x = useTransform(scrollYProgress, [start, hold, end], ["0vw", "0vw", "88vw"]);
  const y = useTransform(scrollYProgress, [start, hold, end], [baseY, baseY - 8, baseY + 34]);
  const rotate = useTransform(scrollYProgress, [start, hold, end], [baseRotate, baseRotate, 24 + index * 4]);
  const scale = useTransform(scrollYProgress, [start, hold, end], [1, 1, 0.94]);
  const opacity = useTransform(scrollYProgress, [start, end, gone], [1, 1, 0]);

  return (
    <motion.div
      className={styles.reviewDealCard}
      role="listitem"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex: total - index,
      }}
    >
      <span className={styles.reviewRating}>{review.rating}</span>

      <div>
        <p className={styles.reviewText}>{review.text}</p>

        <div>
          <p className={styles.reviewName}>{review.author}</p>
          <p className={styles.reviewDate}>{review.date}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function PortfolioPage(){
  const reviewsDeckRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: reviewsDeckRef,
    offset: ["start start", "end end"],
  });
     const { content } = useLang();
  const portfolioContent = content.pages.portfolio.content;
  const projects = portfolioContent.projects.map((project, index) => ({
    ...project,
    id: index + 1,
    image: PROJECT_IMAGES[index],
  }));
  const reviews = portfolioContent.reviews.items;
  const reviewsScrollHeight = `${Math.max(reviews.length * 84, 180)}vh`;
      const [mobileOpen, setMobileOpen] = useState(false);
      const { openModal } = useContactModal();
  return (
    <div className={styles.page}>
      {/* Фон с плавающими шариками */}
      <div className={styles.bubblesBackground}>
        <Bubble src={bubbleImg} size={300} top="2%" left="33%" duration={6} />
        <Bubble src={bubbleImg} size={80} top="0%" left="80%" duration={8} />
        <Bubble src={bubbleImg} size={300} top="3%" left="73%" duration={6} />
        <Bubble src={bubbleImg} size={300} top="2%" left="88%" duration={6} />
        <Bubble src={bubbleImg} size={300} top="0%" left="77%" duration={6} />
        <Bubble src={bubbleImg} size={120} top="5%" left="90%" duration={5} />
        <Bubble src={bubbleImg} size={400} top="12%" left="80%" duration={5} />
        <Bubble src={bubbleImg} size={200} top="69%" left="10%" duration={10} />
        <Bubble src={bubbleImg} size={500} top="60%" left="-10%" duration={10} />
        <Bubble src={bubbleImg} size={100} top="80%" left="75%" duration={7} />
        <Bubble src={bubbleImg} size={500} top="2%" left="-10%" duration={7} />
        <Bubble src={bubbleImg} size={400} top="40%" left="95%" duration={7} />
        <Bubble src={bubbleImg} size={300} top="500%" left="55%" duration={7} />
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={textAnimation}
        >
          <h1 className={styles.title}>
            <MatrixText text="ПОРТФОЛИО" duration={950} />
          </h1>
          <p className={styles.subtitle}>
            Реальные примеры разработки сайтов, приложений и CRM-систем.<br/>
            Результаты автоматизации и роста бизнеса.
          </p>
        </motion.div>
         <motion.div
          className={styles.videoWrap}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            className={styles.video}
            src={videoStar}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </motion.div>
      </section>
         <motion.section
         id="portfolio"
         className={styles.portfolio}
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
       >
         <div className={styles.portfolioWrapper}>
           <div className={styles.portfolioHeader}>
             <h2 className={styles.portfolioTitle}>
               <MatrixText text={portfolioContent.heading.titleLines.join('\n')} />
             </h2>
             <p className={styles.portfolioSubtitle}>{portfolioContent.heading.subtitle}</p>
          </div>

          <div className={styles.projectsGrid}>
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                className={`${styles.projectCard} ${i % 2 === 0 ? styles.even : styles.odd}`}
                 initial={{ opacity: 0, y: 24 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.2 }}
                 transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                 whileHover={{ boxShadow: "0 18px 45px rgba(18, 18, 18, 0.24)" }}
               >
                 <div
                   className={`${styles.projectContent} ${i % 2 !== 0 && styles.projectContentText}`}
                 >
                   <h3 className={styles.projectTitle}>
                     <span>{project.title}</span>
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       width="30"
                       height="30"
                       className={styles.arrow}
                       viewBox="0 0 30 30"
                       fill="none"
                     >
                       <path
                         fillRule="evenodd"
                         clipRule="evenodd"
                         d="M19.5858 7H4.41421V3H26.4142V25H22.4142V9.82843L5.82843 26.4142L3 23.5858L19.5858 7Z"
                         fill="#121212"
                       />
                     </svg>
                   </h3>
                   <p className={styles.projectDescription}>{project.description}</p>
                 </div>
                 <div className={styles.projectContent}>
                   <img src={project.image} alt={project.title} className={styles.projectImage} />
                 </div>
               </motion.div>
             ))}
           </div>
         </div>
</motion.section>

      {/* Testimonials Section */}
      <motion.section
      id="reviews"
       className={styles.reviews}
       initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h2 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={textAnimation}
        >
          <MatrixText text="Отзывы наших клиентов" />
        </motion.h2>
        <section>
        <div className={styles.topReviewWrapper}>
             <div className={styles.topReview}>
             <p className={styles.topReviewTitle}>
                <svg 
                  width="38"
                  height="28"
                  viewBox="0 0 38 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.9602 0.560115C15.2802 0.160115 13.3602 0.000112534 11.5202 0.000112534C3.60023 0.000112534 0.000234544 3.68011 0.000234544 9.84011V27.6001H15.6802V11.6801H8.72023V10.2401C8.72023 8.24012 9.44023 7.76011 12.2402 7.76011C13.2802 7.76011 14.4802 7.92012 15.8402 8.08011L16.9602 0.560115ZM37.6802 0.560115C36.0802 0.160115 34.1602 0.000112534 32.3202 0.000112534C24.4002 0.000112534 20.8002 3.68011 20.8002 9.84011V27.6001H36.4002V11.6801H29.5202V10.2401C29.5202 8.24012 30.2402 7.76011 32.9602 7.76011C34.0802 7.76011 35.2802 7.92012 36.6402 8.08011L37.6802 0.560115Z"
                    fill="white"
                  />
                </svg>

                <span>{portfolioContent.reviews.topReview.title}</span>
              </p>

              <p className={styles.topReviewText}>{portfolioContent.reviews.topReview.text}</p>

              <div className={styles.topReviewAuthor}>
                <div className={styles.topReviewImage}></div>
                <div>
                  <p className={styles.topReviewName}>
                    {portfolioContent.reviews.topReview.author}
                  </p>
                  <p className={styles.topReviewDate}>{portfolioContent.reviews.topReview.date}</p>
                </div>
              </div>
            </div>
          </div>


          <section
            className={styles.reviewDealSection}
            ref={reviewsDeckRef}
            style={{ "--review-scroll-height": reviewsScrollHeight } as ReviewDeckStyle}
          >
            <div
              className={styles.reviewDealStage}
              aria-label={portfolioContent.reviews.carouselAriaLabel}
              role="list"
            >
              {reviews.map((review, index) => (
                <ReviewDealCard
                  key={review.id}
                  review={review}
                  index={index}
                  total={reviews.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </section>
      </section>
      </motion.section>

      {/* CTA Section */}
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
    </div>
  );
};




