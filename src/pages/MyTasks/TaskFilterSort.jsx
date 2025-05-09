import React, { memo, useState } from "react";
import styles from "./style.module.css";
import { Select } from "../../components/Select";
import { PRIORITY_TYPES, SORT_BY, STATUS_TYPES } from "../../utils/constant";
import { Input } from "../../components/Input";

const TaskFilterSort = memo(
  ({
    onFilterChange,
    onSortChange,
    onSearch,
    assigneeOptions,
    isRoleDeveloper,
  }) => {
    const [filters, setFilters] = useState({
      priority: "ALL",
      status: "ALL",
      assignee: "ALL",
      sortBy: "",
      searchQuery: "",
    });

    const uniqueData = Array.from(
      new Map(assigneeOptions.map((item) => [item.key, item])).values()
    );

    const handleChange = (key, value) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);

      if (key === "searchQuery") {
        onSearch(value);
      } else {
        onFilterChange(newFilters);
      }
    };

    const handleSortChange = (e) => {
      const value = e.target.value;
      setFilters({ ...filters, sortBy: value });
      onSortChange(value);
    };

    return (
      <div className={styles.filterSortContainer}>
        <div className={styles.filters}>
          <Input
            placeholder="Search by Status,Priority,Title etc"
            handleChange={(e) => handleChange("searchQuery", e.target.value)}
            value={filters.searchQuery}
            isSearchbar
          />
          <div className={styles.sortWrapper}>
            {!isRoleDeveloper && (
              <Select
                id="assignee"
                options={[{ key: "ALL", value: "All" }, ...uniqueData]}
                handleChange={(e) => handleChange("assignee", e.target.value)}
                label="Assignee"
                value={filters.assignee}
              />
            )}
            <Select
              id="priority"
              options={[{ key: "ALL", value: "All" }, ...PRIORITY_TYPES]}
              handleChange={(e) => handleChange("priority", e.target.value)}
              label="Priority"
              value={filters.priority}
            />
            <Select
              id="status"
              options={[{ key: "ALL", value: "All" }, ...STATUS_TYPES]}
              handleChange={(e) => handleChange("status", e.target.value)}
              label="Status"
              value={filters.status}
            />
            <Select
              id="sortBy"
              options={SORT_BY}
              handleChange={handleSortChange}
              label="Sort By"
              value={filters.sortBy}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default TaskFilterSort;
