// frontend/app/components/Modal/Modal.tsx
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

type ModalSize = "sm" | "md" | "lg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  closeLabel?: string;
  className?: string;
  contentClassName?: string;
  size?: ModalSize;
  showCloseButton?: boolean;
  disableBackdropClose?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  labelledBy?: string;
  describedBy?: string;
}

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];

  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  return Array.from(container.querySelectorAll<HTMLElement>(selectors)).filter((element) => {
    return element.offsetParent !== null || element.getClientRects().length > 0;
  });
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  closeLabel = "Close dialog",
  className,
  contentClassName,
  size = "md",
  showCloseButton = true,
  disableBackdropClose = false,
  initialFocusRef,
  labelledBy,
  describedBy,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const effectiveTitleId = labelledBy ?? (title ? titleId : undefined);
  const effectiveDescriptionId = describedBy ?? (description ? descriptionId : undefined);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements(dialogRef.current);

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return;

    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTarget =
      initialFocusRef?.current ??
      dialogRef.current?.querySelector<HTMLElement>("[data-modal-autofocus='true']") ??
      dialogRef.current;

    window.requestAnimationFrame(() => {
      focusTarget?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;

      if (
        previouslyFocusedElementRef.current &&
        document.contains(previouslyFocusedElementRef.current)
      ) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [initialFocusRef, isOpen]);

  if (typeof document === "undefined") return null;

  const dialog = (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
          key="modal-backdrop"
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={disableBackdropClose ? undefined : onClose}
        >
          <motion.div
            className={styles.wrapper}
            role="presentation"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div
              ref={dialogRef}
              className={[styles.dialog, styles[size], className].filter(Boolean).join(" ")}
              role="dialog"
              aria-modal="true"
              aria-labelledby={effectiveTitleId}
              aria-describedby={effectiveDescriptionId}
              tabIndex={-1}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={handleKeyDown}
            >
              {showCloseButton && (
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={onClose}
                  aria-label={closeLabel}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                      d="M4 4L16 16M16 4L4 16"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}

              {(title || description) && (
                <div className={styles.header}>
                  {title ? <h2 className={styles.title}>{title}</h2> : null}
                  {description ? (
                    <p className={styles.description} id={effectiveDescriptionId}>
                      {description}
                    </p>
                  ) : null}
                </div>
              )}

              <div className={[styles.content, contentClassName].filter(Boolean).join(" ")}>
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return createPortal(dialog, document.body);
}
