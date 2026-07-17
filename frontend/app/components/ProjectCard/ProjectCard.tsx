import React from 'react';
import styles from './ProjectCard.module.scss';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, image, index }: { title:string, description:string, image:string, index:number }) => {
  return (
    <motion.div 
      className={styles.cardWrapper}
      style={{ top: `calc(15vh + ${index * 40}px)` }} // Смещение для эффекта "лесенки"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className={styles.cardInner}>
        <div className={styles.imageBox}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.infoBox}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;