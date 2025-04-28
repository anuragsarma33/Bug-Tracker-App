import { memo } from "react";

import styles from "./style.module.css";

export const Input = memo(
  ({
    label,
    error,
    id,
    handleChange,
    type = "text",
    value,
    placeholder = "",
    required,
    isSearchbar = false,
  }) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={styles.formControl}>
        {label && <label htmlFor={inputId}>{label}</label>}
        <input
          name={inputId}
          placeholder={placeholder}
          onChange={handleChange}
          required={required}
          className={isSearchbar ? styles.searchInput : styles.input}
          value={value}
          type={type}
        />
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    );
  }
);
