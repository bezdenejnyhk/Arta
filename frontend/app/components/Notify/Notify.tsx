import styles from "./Notify.module.scss";

export type TStatusNotify = "success" | "error" | "warning" | "default";

interface INotifyProps {
  status: TStatusNotify;
  setOpen: (open: boolean) => void;
  open: boolean;
  title?: string;
  text?: string;
}

const notifyIcon = (status: TStatusNotify) => {
  if (status === "success") {
    return (
      <svg
        width="32px"
        height="32px"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        fill="#59c97e"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fill="#59c97e"
            d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
          ></path>
        </g>
      </svg>
    );
  } else if (status === "warning") {
    return (
      <svg
        fill="#ff8d00"
        width="32px"
        height="32px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <title>warning</title>
          <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path>
        </g>
      </svg>
    );
  } else if (status === "error") {
    return (
      <svg
        fill="#f44336"
        width="32px"
        height="32px"
        viewBox="-1.7 0 20.4 20.4"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.cfIconSvg}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-6.804.01 3.032-3.033a.792.792 0 0 0-1.12-1.12L8.494 9.173 5.46 6.14a.792.792 0 0 0-1.12 1.12l3.034 3.033-3.033 3.033a.792.792 0 0 0 1.12 1.119l3.032-3.033 3.033 3.033a.792.792 0 0 0 1.12-1.12z"></path>
        </g>
      </svg>
    );
  }
};

export const Notify = ({ status, setOpen, open, title, text }: INotifyProps) => {
  return (
    <>
      <div className={`${styles.popup} ${styles[status]} ${open && styles.open}`}>
        <div className={styles.popup__container}>
          <div className={styles.popup__message}>
            {notifyIcon(status)}
            <div className={styles.message}>
              {title && <h3 className={styles.title}>{title}</h3>}
              {text && <p className={styles.text}>{text}</p>}
            </div>
          </div>
          <button type="button" className={styles.close} onClick={() => setOpen(false)}>
            <svg
              width="16px"
              height="16px"
              viewBox="-0.5 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M3 21.32L21 3.32001"
                  stroke="#b2b2b2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 3.32001L21 21.32"
                  stroke="#b2b2b2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
