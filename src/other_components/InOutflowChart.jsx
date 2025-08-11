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

const yearData = {
  'Academic Year': {
    labels: ['CESC', 'CCSC', 'COTSC', 'SCEAP','CITSC'],
    datasets: [
      {
        label: 'Inflow',
        data: [200, 150, 70, 50,120],
        backgroundColor: '#ACD8A7'
      },
      {
        label: 'Outflow',
        data: [50, 25, 15, 15,],
        backgroundColor: '#F6FFB1'
      },
    ]
  },
 
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

function InOutflowChart() {
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('Academic Year');

  return (
    <div className='lg:w-160 w-[350px] p-[20px] m-auto'>
      <div className='flex justify-between'>
        <h2 className='font-semibold text-lg'>Inflow and Outflow Trends</h2>
        <span className='grid grid-cols-2 gap-4 text-sm'>
            <select className='w-30 border-1 border-[#000] rounded-md shadow-[2px_2px_3px_grey]'>
                <option>
                    Academic Year
                </option>
            </select>
             <select className='w-30 border-1 border-[#000] rounded-md shadow-[2px_2px_3px_grey]'>
                <option>
                    Semester
                </option>
            </select>
        </span>
        
      </div>
      <Bar data={yearData[selectedAcademicYear]} options={chartOptions} />
    </div>
  );
};

export default InOutflowChart;
