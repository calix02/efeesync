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

function EventChart({ eventSummary, code }) {

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
            backgroundColor: "#66a810a1"
          },
          {
            label: "Unsettled",
            data: [
              event.student_summary.first_year.total_unsettled,
              event.student_summary.second_year.total_unsettled,
              event.student_summary.third_year.total_unsettled,
              event.student_summary.fourth_year.total_unsettled
            ],
            backgroundColor: "#eab20886"
          },
          {
            label: "Not Paid",
            data: [
              event.student_summary.first_year.total_unpaid,
              event.student_summary.second_year.total_unpaid,
              event.student_summary.third_year.total_unpaid,
              event.student_summary.fourth_year.total_unpaid
            ],
            backgroundColor: "#de0004ac"
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
   const colors = {
            CIT: " text-[#621668]",
            COE: "text-[#020180]",
            COC: "text-[#660A0A]",
            COT: "text-[#847714]",
            ESAF: "text-[#6F3306]",
            SSC: "text-[#174515]"
        };
    const color = colors[code] || "text-[#174515]";

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

      <h2 className={` ${color} font-bold mb-2`}>{selectedEvent}</h2>

      <div className="w-full h-60">
        <Bar data={eventsData[selectedEvent]} options={chartOptions} />
      </div>
    </div>
  );
}

export default EventChart;