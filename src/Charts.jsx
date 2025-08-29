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

function Charts({title}) {
  const data = {
    labels: ['CITSC', 'SCEAP', 'COTSC', 'CESC','CCSC'],
    datasets: [
      {
        data: [200,127,300,430,690],
        backgroundColor: ['#d492f9','#FFD8CC','#F6FFB1','#D4E4FF','#FCBBD8']
      },
       
     
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display:false
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
    <div className='lg:w-150 md:w-150 w-80 p-4'>
      <h2 className='font-semibold text-lg py-3'>{title}</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Charts;
