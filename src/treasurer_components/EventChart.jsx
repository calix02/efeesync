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
    <div className='lg:w-[500px] w-[350px] p-[20px] m-auto'>
      <div style={{ marginBottom: '10px' }}>
       
        <select
          id="event-select"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="cursor-pointer w-[300px] lg:w-[450px] py-[10px] px-[10px] border-none shadow-[1px_2px_1px_grey,-1px_-2px_2px_white] rounded-[5px] font-bold text-[18px]"
        >
          {Object.keys(eventsData).map((eventName) => (
            <option key={eventName} value={eventName}>
              {eventName}
            </option>
          ))}
        </select>
      </div>
      <h2 style={{ color: '#7b1fa2' }}>{selectedEvent}</h2>
      <Bar data={eventsData[selectedEvent]} options={chartOptions} />
    </div>
  );
};

export default EventChart;
