import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
} from "chart.js";
import { useNodeContext } from "@/context/NodeContext";
import { useEvaluate } from "@/hooks/useEvaluate";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler);

const GraphPlot = () => {
  const { nodes, connections } = useNodeContext();

  const { evaluate } = useEvaluate(nodes, connections);
  const fn = evaluate("out"); // Evaluate at Output Node

  const xs = Array.from({ length: 200 }, (_, i) => -10 + i * 0.1);
  const ys = xs.map(fn);

  const data = {
    labels: xs.map((x) => x.toFixed(1)),
    datasets: [
      {
        data: ys,
        borderColor: "#ffffff",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    animation: true as const,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        type: "linear",
        position: "center",
        grid: {
          color: (ctx: any) => (ctx.tick.value === 0 ? "#fff6" : "#fff2"),
          lineWidth: (ctx: any) => (ctx.tick.value === 0 ? 2 : 1),
        },
      },
      y: {
        type: "linear",
        position: "center",
        grid: {
          color: (ctx: any) => (ctx.tick.value === 0 ? "#fff6" : "#fff2"),
          lineWidth: (ctx: any) => (ctx.tick.value === 0 ? 2 : 1),
        },
        grace: "5%",
      },
    },
  };

  return (
    <div className="relative w-full h-full bg-neutral-900/40 rounded-md">
      <Line data={data} options={{ ...options, maintainAspectRatio: false } as any} />
    </div>
  );
};

export default GraphPlot;
