import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ReasonDistribution({ data }) {

  const chartData = {
    labels: Object.keys(data || {}),

    datasets: [
      {
        data: Object.values(data || {}),

        backgroundColor: [
          "#3B82F6",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
          "#10B981",
          "#FACC15",
          "#F97316",
          "#64748B",
        ],

        borderWidth: 3,
      },
    ],
  };

  return (
    <div className="card shadow border-0 rounded-4 h-100">

      <div className="card-header bg-white border-0">
        <h5 className="fw-bold">Reason Distribution</h5>
      </div>

      <div className="card-body">

        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            cutout: "70%",

            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />

      </div>

    </div>
  );
}

export default ReasonDistribution;