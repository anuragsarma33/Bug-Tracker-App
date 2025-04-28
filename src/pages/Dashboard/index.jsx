import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronRight, Plus } from "lucide-react";

import { TaskForm } from "../../components/TaskForm";
import { Modal } from "../../components/Modal";
import { TaskItem } from "../../components/TaskItem";
import { TrendChart } from "../../components/TrendChart";

import styles from "./styles.module.css";

const Dashboard = memo(() => {
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);

  const [showForm, setShowForm] = useState(false);

  const isRoleDeveloper = user.role === "developer";

  const userTasks = isRoleDeveloper
    ? tasks.filter((task) => task.assignee === user.username)
    : tasks;

  const taskStats = {
    openTasks: userTasks.filter((task) => task.status === "OPEN").length,
    inProgressTasks: userTasks.filter((task) => task.status === "IN_PROGRESS")
      .length,
    pendingApprovalTasks: userTasks.filter(
      (task) => task.status === "PENDING_APPROVAL"
    ).length,
    closedTasks: userTasks.filter((task) => task.status === "CLOSED").length,
  };

  const renderTasks = () => {
    if (userTasks.length === 0) {
      return (
        <div className={styles.noTaskFound}>
          <div className={styles.primaryText}>No Tasks Found</div>
          <p className={styles.subHeading}>
            You don't have any tasks assigned to you yet.
          </p>
          <button
            type="button"
            className={styles.createTaskBtn}
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} /> Create New Tasks
          </button>
        </div>
      );
    }
    return userTasks.map((task) => <TaskItem key={task.id} task={task} />);
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <div className={styles.primaryText}>Welcome {user.name}</div>
            <p className={styles.secondaryText}>
              Here's what's happening with your tasks today.
            </p>
          </div>
          {isRoleDeveloper && (
            <button
              type="button"
              className={styles.createTaskBtn}
              onClick={() => setShowForm(!showForm)}
            >
              <Plus size={20} /> New Task
            </button>
          )}
        </div>
        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.justifySpaceBetween}>
              <h3 className={styles.primaryText}>Open Tasks</h3>
              <span className={styles.textBlue}>{taskStats.openTasks}</span>
            </div>
            <div className={styles.secondaryText}>
              Tasks that need to be started
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.justifySpaceBetween}>
              <h3 className={styles.primaryText}>In Progress</h3>
              <span className={styles.textBlue}>
                {taskStats.inProgressTasks}
              </span>
            </div>
            <div className={styles.secondaryText}>
              Tasks currently being worked on
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.justifySpaceBetween}>
              <h3 className={styles.primaryText}>Pending</h3>
              <span className={styles.textAmber}>
                {taskStats.pendingApprovalTasks}
              </span>
            </div>
            <div className={styles.secondaryText}>Tasks awaiting approval</div>
          </div>

          <div className={styles.card}>
            <div className={styles.justifySpaceBetween}>
              <h3 className={styles.primaryText}>Closed</h3>
              <span className={styles.textGreen}>{taskStats.closedTasks}</span>
            </div>
            <div className={styles.secondaryText}>Completed tasks</div>
          </div>
        </div>

        <div className={styles.taskWrapper}>
          <div className={styles.taskHeader}>
            <div className={styles.title}>Recent Tasks</div>
            {userTasks.length > 0 && (
              <Link
                to='/tasks'
                className={styles.linkBtn}
              >
                View All <ChevronRight size={16} />
              </Link>
            )}
          </div>
          <div className={styles.tasksList}>{renderTasks()}</div>
        </div>
        <div>
          <TrendChart tasks={userTasks} />
        </div>
      </div>
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

export default Dashboard;
