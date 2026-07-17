import { motion } from "framer-motion";
import styles from "./BottomSection.module.scss";

interface BottomSectionProps {
  title: React.ReactNode;
  subtitle: string;
  items: {
    id: number;
    title: string;
    description: string;
  }[];
}

export function BottomSection({ title, subtitle, items }: BottomSectionProps) {
  return (
    <motion.section
      className={styles.backend}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.backendWrapper}>
        <h2 className={styles.backendTitle}>{title}</h2>
        <p className={styles.backendText}>{subtitle}</p>

        <motion.ul
          className={styles.backendList}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {items.map((item, index) => (
            <motion.li
              key={item.id}
              className={styles.backendService}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <span className={styles.backendServiceId}>{item.id.toString().padStart(2, "0")}</span>
              <p className={styles.backendServiceTitle}>{item.title}</p>
              <p className={styles.backendServiceDescription}>{item.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
