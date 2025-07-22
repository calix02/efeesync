// ITWeekChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Charts() {
  const data = {
    labels: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
    datasets: [
      {
        label: 'Paid',
        data: [200, 150, 70, 50],
        backgroundColor: '#d492f9'
      },
      {
        label: 'Unsettled',
        data: [50, 25, 15, 15],
        backgroundColor: '#f97ed4'
      },
      {
        label: 'Not Paid',
        data: [50, 25, 5, 5],
        backgroundColor: '#e24468'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ color: '#7b1fa2' }}>IT Week</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Charts;
