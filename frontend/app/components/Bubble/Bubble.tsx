import React from 'react';
import { motion } from 'framer-motion';

const Bubble = ({ src, size, top, left, duration }: { src:string, size:number, top: string, left:string, duration: number }) => {
  return (
    <motion.img
      src={src}
      alt="bubble"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        top: top,
        left: left,
        objectFit: 'contain',
        filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.1))'
      }}
      // Плавное движение вверх-вниз и вправо-влево
      animate={{
        y: [0, -30, 0],
        x: [0, 15, -15, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

export default Bubble;