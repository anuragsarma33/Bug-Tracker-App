import React, { memo } from "react";
import classNames from "classnames";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../reducers/auth/authSlice";

import { Avatar } from "../Avatar";

import styles from "./style.module.css";

const Navbar = memo(() => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={styles.navbarWrapper}>
      <div className={styles.navbarContent}>
        <div
          className={classNames(
            styles.alignContentCenter,
            styles.justifySpaceBetween
          )}
        >
          <div className={styles.alignContentCenter}>
            <div className={styles.logoHeader}>
              <span className={styles.primary}>Bug</span>
              <span className={styles.secondary}>Tracker</span>
            </div>
          </div>
          <div className={styles.alignContentCenter}>
            {user && (
              <div
                className={classNames(styles.alignContentCenter, styles.gapMd)}
              >
                <div className={styles.userDetails}>
                  <span className={styles.textPrimary}>{user.name}</span>
                  <span className={styles.textSecondary}>{user.role}</span>
                </div>
                <div className={styles.relative}>
                  <Avatar name={user.name} src={user.avatar} size="md" />
                </div>
                <button
                  onClick={handleLogout}
                  className={styles.logoutBtn}
                  aria-label="Logout"
                >
                  <LogOut width={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});

export { Navbar };
