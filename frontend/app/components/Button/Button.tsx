import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "red" | "white" | "black";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ theme = "red", children, className, size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={[styles.button, styles[theme], styles[size], className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.7197 1.5H0.53033V0H13.2804V12.75H11.7804V2.56066L1.06066 13.2803L0 12.2197L10.7197 1.5Z"
          fill="#1A1A1A"
        />
      </svg>
    </button>
  );
}
