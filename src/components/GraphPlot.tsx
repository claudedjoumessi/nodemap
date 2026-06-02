import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler);

type GraphPlotProps = {
  fn: (x: number) => number;
};

const GraphPlot = ({ fn }: GraphPlotProps) => {
  const xs = Array.from({ length: 200 }, (_, i) => -10 + i * 0.1);
  const ys = xs.map(fn);

  const data = {
    labels: xs.map((x) => x.toFixed(1)),
    datasets: [
      {
        data: ys,
        borderColor: "#fff",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    animation: false as const,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: true, grid: { color: "#fff3" } },
      y: { grid: { color: "#fff3" }, ticks: { color: "#64748b" } },
    },
  
  };

  return (
    <div className="relative w-full h-full">
      <Line data={data} options={{...options, maintainAspectRatio: false}} />
    </div>
  );
};

export default GraphPlot;
