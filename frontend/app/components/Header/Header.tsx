import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../../hooks/useLang";
import styles from "./Header.module.scss";
import { Button } from "../Button/Button";
import logo from "../../assets/icons/logo.svg";
import { useContactModal } from "../../hooks/useContactModal";

export function Header() {
  const { content, buildHref } = useLang();
  const { components } = content;
  const { nav, startConversation, ariaLabels } = components.header;

  const [mobileOpen, setMobileOpen] = useState(false);
  const { openModal } = useContactModal();

  const mainNavLinks = [
    { label: nav.services, path: "/services" },
    { label: nav.home, path: "/" },
    { label: nav.portfolio, path: "/portfolio" },
  ];

  // Close mobile menu on resize
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 1200) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className={styles.header} role="banner">
        <div className={styles.headerWrapper}>
          <NavLink to="/">
            <img alt="Logo" src={logo} className={styles.logo}></img>
          </NavLink>
          <nav className={styles.nav} aria-label="Main navigation">
            {mainNavLinks.map(({ label, path }) => (
              <NavLink
                key={path}
                to={buildHref(path)}
                end={path === "/"}
                className={({ isActive }) =>
                  [styles.link, isActive ? styles.activeLink : ""].filter(Boolean).join(" ")
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className={styles.actions}>
            {/* Language switcher dropdown */}
            {/* <div
            className={styles.langWrapper}
            ref={langWrapperRef}
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button
              type="button"
              className={[styles.link, styles.langBtn, langOpen ? styles.langBtnOpen : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Select language"
            >
              {lang.toUpperCase()}
              <ChevronIcon isOpen={langOpen} />
            </button> */}

            {/* <AnimatePresence>
              {langOpen && (
                <motion.div
                  className={styles.langDropdown}
                  initial={{ opacity: 0, y: -8, scaleY: 0.94 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -8, scaleY: 0.94 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{ transformOrigin: "top center" }}
                  role="listbox"
                  aria-label="Language"
                >
                  {LANGS.map(({ code, label }) => (
                    <button
                      key={code}
                      type="button"
                      role="option"
                      aria-selected={lang === code}
                      className={[styles.langOption, lang === code ? styles.langOptionActive : ""]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => {
                        setLang(code);
                        setLangOpen(false);
                      }}
                    >
                      <span className={styles.langOptionCode}>{code.toUpperCase()}</span>
                      <span className={styles.langOptionLabel}>{label.split(" — ")[1]}</span>
                      {lang === code && (
                        <svg
                          className={styles.langCheck}
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 7L5.5 10.5L12 4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>*/}
            {/* </div> */}

            {/* <div className={styles.ctaDesktop}>
              <Button theme="white" className={styles.ctaDesktop} type="button" onClick={openModal}>
                {startConversation}
              </Button>
            </div> */}
            {/* Burger button */}
            <button
              type="button"
              className={styles.burger}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? ariaLabels.closeMenu : ariaLabels.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <motion.span
                className={styles.burgerLine}
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className={styles.burgerLine}
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className={styles.burgerLine}
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            className={styles.mobileMenu}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.33, ease: "easeInOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabels.mobileNav}
          >
            {/* Mobile menu header row */}
            <div className={styles.mobileMenuTop}>
              <button
                type="button"
                className={styles.mobileClose}
                onClick={() => setMobileOpen(false)}
                aria-label={ariaLabels.closeMenu}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M3 3L17 17M17 3L3 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className={styles.mobileNav}>
              {mainNavLinks.slice(0, 3).map(({ label, path }) => (
                <NavLink
                  key={path}
                  to={buildHref(path)}
                  className={({ isActive }) =>
                    [styles.mobileLink, isActive ? styles.mobileLinkActive : ""]
                      .filter(Boolean)
                      .join(" ")
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className={styles.mobileFooter}>
              {/* Mobile language switcher */}
              {/*<div className={styles.mobileLangSwitcher}>
                {LANGS.map(({ code, label }) => (
                  <button
                    key={code}
                    type="button"
                    className={[
                      styles.mobileLangOption,
                      lang === code ? styles.mobileLangOptionActive : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => {
                      setLang(code);
                      setMobileOpen(false);
                    }}
                    aria-pressed={lang === code}
                  >
                    <span className={styles.mobileLangCode}>{code.toUpperCase()}</span>
                    <span className={styles.mobileLangName}>{label.split(" — ")[1]}</span>
                    {lang === code && (
                      <svg
                        className={styles.mobileLangCheck}
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 7L5.5 10.5L12 4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div> */}
              <Button
                theme="white"
                className={styles.mobileCta}
                onClick={() => {
                  setMobileOpen(false);
                  openModal();
                }}
              >
                {startConversation}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
