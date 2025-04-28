import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Plus } from "lucide-react";

import TaskFilterSort from "./TaskFilterSort";
import { TaskItem } from "../../components/TaskItem";
import { Modal } from "../../components/Modal";
import { TaskForm } from "../../components/TaskForm";

import styles from "./style.module.css";

const TaskList = memo(() => {
  const { tasks } = useSelector((state) => state.tasks);

  const { user } = useSelector((state) => state.auth);

  const isRoleDeveloper = user.role === "developer";

  const userTasks = isRoleDeveloper
  ? tasks.filter((task) => task.assignee === user.username)
  : tasks;

  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    priority: "ALL",
    status: "ALL",
    assignee: "ALL",
    searchQuery: "",
  });
  const [sortBy, setSortBy] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(userTasks);

  useEffect(() => {
    let updatedTasks = [...userTasks];

    if (filters.priority !== "ALL") {
      updatedTasks = updatedTasks.filter(
        (task) => task.priority === filters.priority
      );
    }

    if (filters.status !== "ALL") {
      updatedTasks = updatedTasks.filter(
        (task) => task.status === filters.status
      );
    }

    if (filters.assignee !== "ALL") {
      updatedTasks = updatedTasks.filter(
        (task) => task.assignee === filters.assignee
      );
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      updatedTasks = updatedTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.status.toLowerCase().includes(query) ||
          task.priority.toLowerCase().includes(query)
      );
    }

    if (sortBy === "DUE_DATE_ASC") {
      updatedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === "DUE_DATE_DESC") {
      updatedTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    } else if (sortBy === "PRIORITY") {
      const priorityOrder = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];
      updatedTasks.sort(
        (a, b) =>
          priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
      );
    }

    setFilteredTasks(updatedTasks);
  }, [tasks, filters, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sortBy) => {
    setSortBy(sortBy);
  };

  const handleSearch = (searchQuery) => {
    const newFilters = { ...filters, searchQuery };
    setFilters(newFilters);
  };

  const renderLists = () => {
    if (filteredTasks.length === 0) {
      return (
        <div className={styles.noTaskFound}>
          <div className={styles.primaryText}>No Tasks Found</div>
          <p className={styles.subHeading}>
            You don't have any tasks assigned to you yet.
          </p>
          <button
            type="button"
            className={styles.createBtn}
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} /> Create New Tasks
          </button>
        </div>
      );
    }
    return (
      <div className={styles.taskList}>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    );
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.title}>Tasks</div>
        {isRoleDeveloper && (
          <button
            className={styles.createBtn}
            type="button"
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} /> Create Task
          </button>
        )}
      </div>

      <TaskFilterSort
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onSearch={handleSearch}
        assigneeOptions={userTasks.map(task => ({key: task.assignee, value: task.assignee}))}
        isRoleDeveloper={isRoleDeveloper}
      />

      {renderLists()}
      <Modal
        header="Create New Task"
        isOpen={showForm}
        onClose={() => setShowForm(false)}
      >
        <TaskForm onCancel={() => setShowForm(false)} />
      </Modal>
    </main>
  );
});

export default TaskList;
