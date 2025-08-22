import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Chart } from 'react-chartjs-2';

// Register controllers + elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function StackedLineBarChart({ monthlyExpenses }) {
  const labels = monthlyExpenses.map(e => e.month);
  const barData = monthlyExpenses.map(e => Number(e.total));

  const data = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Monthly Expenses',
        data: barData,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        stack: 'combined',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Expenses - Stacked Line/Bar Chart',
        font: { size: 18 },
      },
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ': ' + Number(context.raw).toLocaleString();
          },
        },
      },
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
        },
      },
    },
  };

  return <Chart type="bar" data={data} options={options} />;
}
