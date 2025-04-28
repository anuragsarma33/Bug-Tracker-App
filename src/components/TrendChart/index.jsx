import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { memo } from "react";
import { formatDate } from "../../utils/utilitiy";
import styles from "./styles.module.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const TrendChart = memo(({ tasks }) => {
  const groupedTasks = {};

  tasks.forEach((task) => {
    const isoDate = new Date(task.dueDate).toISOString().split("T")[0];
    groupedTasks[isoDate] = (groupedTasks[isoDate] || 0) + 1;
  });

  const sortedDates = Object.keys(groupedTasks).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const chartData = {
    labels: sortedDates.map((item) => formatDate(item)),
    datasets: [
      {
        label: "Active Tasks",
        data: sortedDates.map((date) => groupedTasks[date]),
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "#3b82f6",
        tension: 0.4,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#111827",
        padding: 12,
        bodyFont: {
          family: "'Inter', sans-serif",
        },
        titleFont: {
          family: "'Inter', sans-serif",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chartHeader}>Task Trend</div>
      <div className={styles.chartContent}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
});

export { TrendChart };
