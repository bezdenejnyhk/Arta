import { useEffect, useState } from "react";
import { Form } from "../Form/Form";
import { Modal } from "../Modal/Modal";
import { Notify, type TStatusNotify } from "../Notify/Notify";
import { useContactModal } from "../../hooks/useContactModal";
import styles from "./ModalForm.module.scss";

type TNotifyState = {
  text: string;
  title: string;
  status: TStatusNotify;
};

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  buttonText?: string;
  placeholder?: {
    name: string;
    company: string;
    email: string;
    message: string;
  };
}

const defaultPlaceholder = {
  name: "Введите ваше имя",
  company: "Компания (необязательно)",
  email: "Введите email",
  message: "Расскажите о задаче",
};

export function ModalForm({
  isOpen,
  onClose,
  title = "Давайте обсудим ваш проект",
  buttonText = "Отправить заявку",
  placeholder = defaultPlaceholder,
}: ModalFormProps) {
  const { closeModal } = useContactModal();
  const [notify, setNotify] = useState<TNotifyState>({
    title: "",
    text: "",
    status: "default",
  });
  const [notifyOpen, setNotifyOpen] = useState(false);

  useEffect(() => {
    if (!notifyOpen) return;

    const timeoutId = window.setTimeout(() => {
      setNotifyOpen(false);
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [notifyOpen]);

  const handleClose = () => {
    setNotifyOpen(false);
    onClose();
    closeModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} className={styles.dialog} size="md">
        <Form
          title={title}
          placeholder={placeholder}
          buttonText={buttonText}
          onClose={handleClose}
          setNotify={setNotify}
          setOpenNotify={setNotifyOpen}
        />
      </Modal>

      <Notify
        open={notifyOpen}
        setOpen={setNotifyOpen}
        status={notify.status}
        title={notify.title}
        text={notify.text}
      />
    </>
  );
}
