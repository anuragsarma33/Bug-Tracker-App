import React, { memo } from "react";
import styles from './style.module.css';

export const Select = memo(({
    label,
    options,
    error,
    value,
    id,
    handleChange
  }) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
    return (
        <div className={styles.formControl}>
        <label htmlFor={selectId}>{label}</label>
        <select name={selectId} onChange={handleChange} value={value}>
          {options.map((priority) => (
            <option key={priority.key} value={priority.key}>
              {priority.value}
            </option>
          ))}
        </select>
        {error && (
          <p className={styles.errorText}>{error}</p>
        )}
      </div>
    );
  }
)