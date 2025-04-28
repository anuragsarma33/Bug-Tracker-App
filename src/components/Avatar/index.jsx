import React, { memo } from "react";

import styles from "./styles.module.css";

const Avatar = memo(({ name, src }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className={styles.avatarWrapper}>
      {src ? (
        <img src={src} alt={name} />
      ) : (
        <span className={styles.initials}>{getInitials(name)}</span>
      )}
    </div>
  );
});

export { Avatar };
