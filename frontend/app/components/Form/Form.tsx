import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { Button } from "../Button/Button";
import type { TStatusNotify } from "../Notify/Notify";
import styles from "./Form.module.scss";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

type TForm = {
  title: string;
  placeholder: {
    name: string;
    company: string;
    email: string;
    message: string;
  };
  buttonText: string;
  onClose?: () => void;
  setOpenNotify: (open: boolean) => void;
  setNotify: Dispatch<SetStateAction<{ text: string; title: string; status: TStatusNotify }>>;
};

type TFormData = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type TFormErrors = {
  name: string;
  email: string;
  message: string;
};

const initialFormData: TFormData = {
  name: "",
  email: "",
  company: "",
  message: "",
};

const initialErrors: TFormErrors = {
  name: "",
  email: "",
  message: "",
};

export const Form = ({
  title,
  placeholder,
  buttonText,
  onClose,
  setNotify,
  setOpenNotify,
}: TForm) => {
  const [formData, setFormData] = useState<TFormData>(initialFormData);
  const [errors, setErrors] = useState<TFormErrors>(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (data: TFormData) => {
    const nextErrors: TFormErrors = {
      name: data.name.trim() ? "" : "Пожалуйста, укажите ваше имя",
      email: data.email.trim() ? "" : "Пожалуйста, укажите email",
      message: data.message.trim() ? "" : "Пожалуйста, напишите кратко о задаче",
    };

    if (data.email.trim() && !isValidEmail(data.email)) {
      nextErrors.email = "Введите корректный email";
    }

    return nextErrors;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (errors[name as keyof TFormErrors]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.email || nextErrors.message) {
      return;
    }

    setIsSubmitting(true);

    try {
      const backendUrl =
        (import.meta.env as Record<string, string | undefined>).VITE_APP_URL_BACKEND ||
        (import.meta.env as Record<string, string | undefined>).REACT_APP_URL_BACKEND ||
        "https://localhost:8000";
      const response = await fetch(`${backendUrl}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          company: formData.company.trim(),
          email: formData.email.trim(),
          msg: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok && result?.success) {
        setNotify({
          title: "Заявка отправлена",
          text: "Спасибо! Мы свяжемся с вами в ближайшее время.",
          status: "success",
        });
        setOpenNotify(true);
        setFormData(initialFormData);
        onClose?.();
      } else {
        throw new Error(result?.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setNotify({
        title: "Ошибка",
        text: "Сервис временно недоступен.",
        status: "error",
      });
      setOpenNotify(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.fieldGroup}>
        <label className={styles.field} htmlFor="contact-name">
          <span className={styles.labelText}>Имя</span>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={formData.name}
            placeholder={placeholder.name}
            className={[styles.input, errors.name ? styles.inputError : ""]
              .filter(Boolean)
              .join(" ")}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name ? (
            <span id="contact-name-error" className={styles.errorText}>
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className={styles.field} htmlFor="contact-company">
          <span className={styles.labelText}>Компания</span>
          <input
            id="contact-company"
            name="company"
            type="text"
            value={formData.company}
            placeholder={placeholder.company}
            className={styles.input}
            onChange={handleChange}
          />
        </label>

        <label className={styles.field} htmlFor="contact-email">
          <span className={styles.labelText}>Email</span>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            placeholder={placeholder.email}
            className={[styles.input, errors.email ? styles.inputError : ""]
              .filter(Boolean)
              .join(" ")}
            onChange={handleChange}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email ? (
            <span id="contact-email-error" className={styles.errorText}>
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className={styles.field} htmlFor="contact-message">
          <span className={styles.labelText}>Комментарий</span>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            placeholder={placeholder.message}
            className={[styles.textarea, errors.message ? styles.inputError : ""]
              .filter(Boolean)
              .join(" ")}
            onChange={handleChange}
            rows={5}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
          {errors.message ? (
            <span id="contact-message-error" className={styles.errorText}>
              {errors.message}
            </span>
          ) : null}
        </label>
      </div>

      <div className={styles.actions}>
        <Button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? "Отправка..." : buttonText}
        </Button>
      </div>
    </form>
  );
};
