import React, { memo } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

import styles from "./styles.module.css";

const Modal = memo(({ isOpen, onClose, header, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>{header}</div>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
          >
            <X size={20} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
});

export { Modal };
