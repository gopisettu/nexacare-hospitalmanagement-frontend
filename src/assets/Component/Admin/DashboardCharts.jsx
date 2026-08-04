import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import "../Style/Dashboard.css";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

export function MiniCard({
  title,
  value,
  color,
  bg,
  icon,
  data = [],
})  {
  return (
    <div
      className="card border-0 shadow-sm rounded-4 h-100"
      style={{ background: bg }}
    >
      <div className="card-body d-flex justify-content-between align-items-start">

        <div>
          <div
            className="rounded-3 text-white d-flex align-items-center justify-content-center mb-3"
            style={{
              width: 45,
              height: 45,
              background: color,
            }}
          >
            <i className={`bi ${icon}`}></i>
          </div>

          <h6 className="text-muted">{title}</h6>

          <h3 className="fw-bold">{value}</h3>
        </div>

        <div style={{ width: "170px", height: "80px" }}>
          <Line
            data={{
              labels: data.map((_, i) => i + 1),
              datasets: [
                {
                  data,
                  borderColor: color,
                  backgroundColor: `${color}30`,
                  fill: true,
                  tension: 0.45,
                  pointRadius: 0,
                  borderWidth: 3,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,

              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: false,
                },
              },

              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                },
              },
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default function DashboardStats({ stats, cards }) {

  const dashboardCards = cards ?? [
    {
      title: "Appointments",
      value: stats?.totalAppointments ?? 0,
      icon: "bi-calendar-check",
      color: "#7c4dff",
      bg: "#efe8ff",
      data: [2,2,2,2,2,2,2,2,8,25,18,4],
    },
    {
      title: "Patients",
      value: stats?.totalPatients ?? 0,
      icon: "bi-people",
      color: "#ff9800",
      bg: "#fff2df",
      data: [1,1,1,1,3,5,15,20,18,2],
    },
    {
      title: "Doctors",
      value: stats?.totalDoctors ?? 0,
      icon: "bi-heart-pulse",
      color: "#22c55e",
      bg: "#e9fff2",
      data: [1,1,1,1,2,3,4,18,9,3],
    },
  ];

  return (
    <div className="row g-4">

      {dashboardCards.map((card, index) => (

        <div className="col-md-4" key={index}>

          <MiniCard
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            bg={card.bg}
            data={card.data}
          />

        </div>

      ))}

    </div>
  );
}