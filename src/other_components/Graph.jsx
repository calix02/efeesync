import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function StudentGraph ({graphTitle ,data, options}) {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.formattedValue}`;
          }
        }
      }
    }
  };

  return (
    <div className='text-center p-5 w-70 '>
      <h2 style={{ color: '#000' }} className='text-md lg:text-lg font-[family-name:Helvetica] font-semibold'>{graphTitle}</h2>
      <Doughnut data={data} options={options || defaultOptions} /> 
      <div className='flex justify-center font-[family-name:Arial] gap-4 mt-5'>
        {data.labels.map((label, i) => (
          <div key={label} style={{ textAlign: 'center',  }}>
            <div style={{
              width: '15px',
              height: '15px',
              backgroundColor: data.datasets[0].backgroundColor[i],
              borderRadius: '50%',
              display: 'inline-block',
              marginRight: '15px'
            }}></div>
            <span className="text-xs">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default StudentGraph;
