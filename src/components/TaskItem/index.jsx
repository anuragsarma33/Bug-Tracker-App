import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Flag,
  Pencil,
  Trash2,
  XCircle,
} from "lucide-react";
import classNames from "classnames";

import {
  approveTask,
  deleteTask,
  logTime,
  reopenTask,
} from "../../reducers/tasks/tasksSlice";
import { capitalizeString, formatDate } from "../../utils/utilitiy";

import { Badge } from "../Badge";
import { TaskForm } from "../TaskForm";
import { Modal } from "../Modal";

import styles from "./style.module.css";

const TaskItem = memo(({ task }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [showForm, setShowForm] = useState(false);
  const [timeInput, setTimeInput] = useState("");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "LOW":
        return "success";
      case "MEDIUM":
        return "primary";
      case "HIGH":
        return "warning";
      case "CRITICAL":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "OPEN":
        return { variant: "default", icon: <AlertCircle size={16} /> };
      case "IN_PROGRESS":
        return { variant: "primary", icon: <Clock size={16} /> };
      case "PENDING_APPROVAL":
        return { variant: "warning", icon: <Clock size={16} /> };
      case "CLOSED":
        return { variant: "success", icon: <CheckCircle size={16} /> };
      case "REOPENED":
        return { variant: "danger", icon: <XCircle size={16} /> };
      default:
        return { variant: "default", icon: null };
    }
  };

  const { variant, icon } = getStatusInfo(task.status);

  const handleLogTime = () => {
    const time = parseFloat(timeInput);
    if (!isNaN(time) && time > 0) {
      dispatch(logTime({ id: task.id, timeSpent: time }));
      setTimeInput("");
    }
  };

  return (
    <div className={styles.taskItemWrapper}>
      <div className={styles.badgeWrapper}>
        <Badge variant={variant}>
          {icon} {capitalizeString(task.status)}
        </Badge>
        <span
          className={classNames(
            styles.priorityInfo,
            styles[getPriorityColor(task.priority)]
          )}
        >
          <Flag size={16} />
          {capitalizeString(task.priority)}
        </span>
      </div>
      <div className={styles.title}>{task.title}</div>
      <p className={styles.subTitle}>{task.description}</p>
      <div className={classNames(styles.flexContent, styles.marginBot1)}>
        {task.category && <Badge>{task.category}</Badge>}
        <div>{formatDate(task.dueDate)}</div>
      </div>
      <div className={styles.flexContent}>
        <div>
          <strong>Time Spent:</strong> {task.timeSpent || 0} hours
        </div>
      </div>
      <div className={styles.actionBtnsWrapper}>
        {user.role === "developer" && task.status !== "CLOSED" && (
          <div className={styles.timeTracker}>
            <input
              type="number"
              placeholder="Hours"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              min="0"
              className={styles.timeInput}
            />
            <button
              type="button"
              onClick={handleLogTime}
              className={styles.logTimeBtn}
            >
              <Clock size={16} /> Log Time
            </button>
          </div>
        )}
        {user.role === "manager" && task.status === "PENDING_APPROVAL" && (
          <button
            onClick={() => dispatch(approveTask(task.id))}
            type="button"
            className={classNames(styles.btn, styles.approveBtn)}
          >
            Approve
          </button>
        )}
        {user.role === "manager" && task.status === "CLOSED" && (
          <button
            onClick={() => dispatch(reopenTask(task.id))}
            type="button"
            className={classNames(styles.btn, styles.reopenBtn)}
          >
            Reopen
          </button>
        )}
        {user.role === "developer" && (
          <>
            <button
              type="button"
              className={classNames(styles.btn, styles.deleteBtn)}
              onClick={() => dispatch(deleteTask(task.id))}
            >
              <Trash2 size={16} /> Delete
            </button>
            <button
              type="button"
              className={classNames(styles.btn, styles.editBtn)}
              onClick={() => setShowForm(true)}
            >
              {" "}
              <Pencil size={16} /> Edit
            </button>
          </>
        )}
      </div>
      <Modal
        header="Update Task"
        isOpen={showForm}
        onClose={() => setShowForm(false)}
      >
        <TaskForm onCancel={() => setShowForm(false)} task={task} />
      </Modal>
    </div>
  );
});

export { TaskItem };
