import React, { memo } from "react";
import classNames from "classnames";

import styles from "./styles.module.css";

export const Badge = memo(({ children, variant = "default" }) => {
  return (
    <span className={classNames(styles.badgeWrapper, styles[variant])}>
      {children}
    </span>
  );
});
