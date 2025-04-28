import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../../reducers/tasks/tasksSlice";
import styles from "./style.module.css";
import { PRIORITY_TYPES, STATUS_TYPES } from "../../utils/constant";
import { Select } from "../Select";
import { Input } from "../Input";

const TaskForm = memo(({ onCancel, task }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "LOW",
    assignee: user.username,
    status: "OPEN",
  });

  useEffect(() => {
    if (!task) return;
    setFormData(task);
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      createdAt: new Date().toISOString(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      dispatch(updateTask(formData));
    } else {
      dispatch(addTask(formData));
    }
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <Input
        id="title"
        value={formData.title}
        label="Title"
        handleChange={handleChange}
        required
        placeholder="Title"
      />
      <div className={styles.formControl}>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className={styles.textarea}
          value={formData.description}
        />
      </div>
      <div className={styles.gridContainer}>
        <Select
          label="Priority"
          id="priority"
          handleChange={handleChange}
          value={formData.priority}
          options={PRIORITY_TYPES}
        />
        <Select
          label="Status"
          id="status"
          handleChange={handleChange}
          value={formData.status}
          options={STATUS_TYPES}
        />
      </div>
      <div className={styles.gridContainer}>
        <Input
          id="category"
          value={formData.category}
          label="Category"
          handleChange={handleChange}
          required
          placeholder="e.g., Frontend, Backend, Testing"
        />

        <Input
          id="dueDate"
          value={formData.dueDate}
          label="Due Date"
          handleChange={handleChange}
          required
          type="date"
        />
      </div>
      <div className={styles.actionsWrapper}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          {task ? "Update" : "Add"} Task
        </button>
      </div>
    </form>
  );
});

export { TaskForm };
