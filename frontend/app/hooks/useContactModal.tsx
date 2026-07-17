import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ContactModalContextValue = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal,
    }),
    [closeModal, isOpen, openModal]
  );

  return <ContactModalContext.Provider value={value}>{children}</ContactModalContext.Provider>;
}

export function useContactModal() {
  const context = useContext(ContactModalContext);

  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }

  return context;
}
