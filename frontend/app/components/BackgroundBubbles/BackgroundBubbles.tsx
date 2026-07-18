import type { CSSProperties } from "react";
import bubbleBurstImg from "../../assets/images/bubble-burst-transparent.png";
import bubbleImg from "../../assets/images/bubble-real-transparent.png";
import styles from "./BackgroundBubbles.module.scss";

const bubbles = [
  {
    className: styles.bubbleLarge,
    style: {
      "--bubble-left": "8%",
      "--bubble-top": "7%",
      "--bubble-size": "clamp(110px, 13vw, 230px)",
      "--drift-duration": "20s",
      "--cycle-duration": "68s",
      "--phase": "-12s",
      "--drift-x": "32px",
      "--drift-y": "44px",
    },
  },
  {
    className: styles.bubbleSmall,
    style: {
      "--bubble-left": "88%",
      "--bubble-top": "13%",
      "--bubble-size": "clamp(70px, 8vw, 150px)",
      "--drift-duration": "23s",
      "--cycle-duration": "74s",
      "--phase": "-39s",
      "--drift-x": "-36px",
      "--drift-y": "26px",
    },
  },
  {
    className: styles.bubbleSoft,
    style: {
      "--bubble-left": "16%",
      "--bubble-top": "30%",
      "--bubble-size": "clamp(84px, 10vw, 180px)",
      "--drift-duration": "26s",
      "--cycle-duration": "82s",
      "--phase": "-58s",
      "--drift-x": "46px",
      "--drift-y": "-30px",
    },
  },
  {
    className: styles.bubbleLarge,
    style: {
      "--bubble-left": "94%",
      "--bubble-top": "38%",
      "--bubble-size": "clamp(120px, 14vw, 260px)",
      "--drift-duration": "29s",
      "--cycle-duration": "76s",
      "--phase": "-25s",
      "--drift-x": "-54px",
      "--drift-y": "36px",
    },
  },
  {
    className: styles.bubbleTiny,
    style: {
      "--bubble-left": "74%",
      "--bubble-top": "52%",
      "--bubble-size": "clamp(54px, 6vw, 110px)",
      "--drift-duration": "18s",
      "--cycle-duration": "88s",
      "--phase": "-6s",
      "--drift-x": "-26px",
      "--drift-y": "-38px",
    },
  },
  {
    className: styles.bubbleSoft,
    style: {
      "--bubble-left": "6%",
      "--bubble-top": "63%",
      "--bubble-size": "clamp(92px, 11vw, 205px)",
      "--drift-duration": "30s",
      "--cycle-duration": "72s",
      "--phase": "-47s",
      "--drift-x": "40px",
      "--drift-y": "24px",
    },
  },
  {
    className: styles.bubbleSmall,
    style: {
      "--bubble-left": "84%",
      "--bubble-top": "76%",
      "--bubble-size": "clamp(72px, 8vw, 155px)",
      "--drift-duration": "22s",
      "--cycle-duration": "84s",
      "--phase": "-64s",
      "--drift-x": "-34px",
      "--drift-y": "-28px",
    },
  },
  {
    className: styles.bubbleTiny,
    style: {
      "--bubble-left": "22%",
      "--bubble-top": "88%",
      "--bubble-size": "clamp(58px, 7vw, 120px)",
      "--drift-duration": "25s",
      "--cycle-duration": "80s",
      "--phase": "-31s",
      "--drift-x": "30px",
      "--drift-y": "-34px",
    },
  },
  {
    className: styles.bubbleSmall,
    style: {
      "--bubble-left": "52%",
      "--bubble-top": "22%",
      "--bubble-size": "clamp(58px, 6vw, 118px)",
      "--drift-duration": "24s",
      "--cycle-duration": "92s",
      "--phase": "-72s",
      "--drift-x": "24px",
      "--drift-y": "30px",
    },
  },
  {
    className: styles.bubbleSoft,
    style: {
      "--bubble-left": "36%",
      "--bubble-top": "47%",
      "--bubble-size": "clamp(68px, 7vw, 136px)",
      "--drift-duration": "27s",
      "--cycle-duration": "86s",
      "--phase": "-18s",
      "--drift-x": "-28px",
      "--drift-y": "32px",
    },
  },
  {
    className: styles.bubbleTiny,
    style: {
      "--bubble-left": "66%",
      "--bubble-top": "91%",
      "--bubble-size": "clamp(48px, 5vw, 96px)",
      "--drift-duration": "21s",
      "--cycle-duration": "90s",
      "--phase": "-54s",
      "--drift-x": "26px",
      "--drift-y": "-24px",
    },
  },
] as const;

export function BackgroundBubbles() {
  return (
    <div className={styles.bubblesLayer} aria-hidden="true">
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className={[styles.bubble, bubble.className].join(" ")}
          style={bubble.style as CSSProperties}
        >
          <img className={styles.bubbleImage} src={bubbleImg} alt="" draggable={false} />
          <img className={styles.bubbleBurst} src={bubbleBurstImg} alt="" draggable={false} />
        </div>
      ))}
    </div>
  );
}
