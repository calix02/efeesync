// EventChart.jsx
import React, { useState } from 'react';
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

const eventsData = {
  'IT Week': {
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
  },
  'Basta Baraylihan': {
    labels: ['First Year', 'Second Year', 'Third Year', 'Fourth Year'],
    datasets: [
      {
        label: 'Paid',
        data: [100, 80, 60, 40],
        backgroundColor: '#d492f9'
      },
      {
        label: 'Unsettled',
        data: [30, 20, 10, 10],
        backgroundColor: '#f97ed4'
      },
      {
        label: 'Not Paid',
        data: [20, 10, 5, 5],
        backgroundColor: '#e24468'
      }
    ]
  }
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // ✅ allow it to fill container
  plugins: {
    legend: { position: 'top' },
    title: { display: false }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 50 }
    }
  }
};

function EventChart() {
  const [selectedEvent, setSelectedEvent] = useState('IT Week');

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="mb-4">
        <select
          id="event-select"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="cursor-pointer w-full  py-2 px-3 shadow-md rounded font-bold text-lg"
        >
          {Object.keys(eventsData).map((eventName) => (
            <option key={eventName} value={eventName}>
              {eventName}
            </option>
          ))}
        </select>
      </div>
      <h2 className="text-[#621668] font-bold mb-2">{selectedEvent}</h2>

      {/* Chart wrapper with fixed height so it can scale */}
      <div className="w-full h-60 ">
        <Bar data={eventsData[selectedEvent]} options={chartOptions} />
      </div>
    </div>
  );
}

export default EventChart;
