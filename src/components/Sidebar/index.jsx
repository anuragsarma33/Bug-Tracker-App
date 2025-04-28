import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ListTodo } from "lucide-react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./style.module.css";

const Sidebar = memo(() => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home size={20} />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <ListTodo size={20} />,
      showFor: ["developer", "manager"],
    },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.showFor || item.showFor.includes(user?.role || "")
  );

  return (
    <aside id="sidebar" className={styles.sidebarWrapper} aria-label="Sidebar">
      <div className={styles.sidebarContent}>
        <ul className={styles.sidebarList}>
          {filteredNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={classNames(styles.sidebarLink, {
                  [styles.active]: location.pathname === item.path,
                })}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
});

export { Sidebar };
