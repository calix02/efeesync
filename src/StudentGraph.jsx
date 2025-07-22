import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function StudentGraph (props) {
  const data = {
    labels: [' 1st,Year', ' 2nd,Year', '3rd,Year', ' 4th,Year'],
    datasets: [
      {
        label: 'CITizens',
        data: [300, 200, 100, 70],
        backgroundColor: ['#d492f9', '#a659f5', '#7b1fa2', '#4a0072'],
        borderWidth: 0,
        cutout: '50%'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
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
    <div style={{
      maxWidth: '300px',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h2 style={{ color: '#7b1fa2' }} className='text-[16px] font-bold'>{props.graphTitle}</h2>
      <Doughnut data={data} options={options} />
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        {data.labels.map((label, i) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{
              width: '15px',
              height: '15px',
              backgroundColor: data.datasets[0].backgroundColor[i],
              borderRadius: '50%',
              display: 'inline-block',
              marginRight: '5px'
            }}></div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default StudentGraph;
