import { motion } from "framer-motion";
import { Button } from "../Button/Button";
import styles from "./Footer.module.scss";
import people from "../../assets/images/footer_img.png";
import { ClickMeBtn } from "../ClickMeBtn/ClickMeBtn";
import { useLang } from "~/hooks/useLang";
import { useContactModal } from "../../hooks/useContactModal";

export function Footer() {
  const { content } = useLang();
  const { footer } = content.components;
  const { openModal } = useContactModal();

  return (
    <motion.footer
      id="footer"
      className={styles.footer}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.footerWrapper}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {footer.title}
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
          >
            {footer.subtitle}
          </motion.p>
          <motion.div whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.98 }}>
            <Button className={styles.buttonCont} size="lg" type="button" onClick={openModal}>
              {footer.buttonLabel}
            </Button>
          </motion.div>

          <motion.div
            className={styles.contacts}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <div>
              <span className={styles.label}>{footer.contacts.teamLabel}</span>
              <motion.a
                href={footer.contacts.addressHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                whileHover={{ x: 4, opacity: 0.9 }}
              >
                {footer.contacts.address}
              </motion.a>
            </div>
            <div>
              <span className={styles.label}>{footer.contacts.emailLabel}</span>
              <motion.a
                className={styles.link}
                href={`mailto:${footer.contacts.email}`}
                whileHover={{ x: 4, opacity: 0.9 }}
              >
                {footer.contacts.email}
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className={styles.clickMeBtn} whileHover={{ rotate: 4, scale: 1.02 }}>
            <ClickMeBtn hasBorder />
          </motion.div>
          <motion.img
            src={people}
            alt={footer.imageAlt}
            className={styles.people}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.16 }}
          />
        </motion.div>
      </div>
    </motion.footer>
  );
}
