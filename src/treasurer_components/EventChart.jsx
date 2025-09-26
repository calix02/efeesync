import React, { useState, useMemo, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
    title: { display: false }
  },
  scales: {
    y: { beginAtZero: true }
  }
};

function EventChart({ eventSummary }) {

  const [selectedEvent, setSelectedEvent] = useState("");

  const eventsData = useMemo(() => {
    const obj = {};
    eventSummary.forEach((event) => {
      obj[event.event_name] = {
        labels: ["First Year", "Second Year", "Third Year", "Fourth Year"],
        datasets: [
          {
            label: "Paid",
            data: [
              event.student_summary.first_year.total_paid,
              event.student_summary.second_year.total_paid,
              event.student_summary.third_year.total_paid,
              event.student_summary.fourth_year.total_paid
            ],
            backgroundColor: "#d492f9"
          },
          {
            label: "Unsettled",
            data: [
              event.student_summary.first_year.total_unsettled,
              event.student_summary.second_year.total_unsettled,
              event.student_summary.third_year.total_unsettled,
              event.student_summary.fourth_year.total_unsettled
            ],
            backgroundColor: "#f97ed4"
          },
          {
            label: "Not Paid",
            data: [
              event.student_summary.first_year.total_unpaid,
              event.student_summary.second_year.total_unpaid,
              event.student_summary.third_year.total_unpaid,
              event.student_summary.fourth_year.total_unpaid
            ],
            backgroundColor: "#e24468"
          }
        ]
      };
    });
    setSelectedEvent(eventSummary[0]?.event_name);
    return obj;
  }, [eventSummary]);

  if (!selectedEvent || !eventsData[selectedEvent]) {
    return <p className="text-gray-500">No event data available</p>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="mb-4">
        <select
          id="event-select"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="cursor-pointer w-full py-2 px-3 shadow-md rounded font-bold text-lg"
        >
          {Object.keys(eventsData).map((eventName) => (
            <option key={eventName} value={eventName}>
              {eventName}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-[#621668] font-bold mb-2">{selectedEvent}</h2>

      <div className="w-full h-60">
        <Bar data={eventsData[selectedEvent]} options={chartOptions} />
      </div>
    </div>
  );
}

export default EventChart;