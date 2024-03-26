import { generateRandomColor } from "../components/functions";
import { useEffect } from "react";
import Chart from "chart.js/auto";
export default function Line({ labels, chartName, dataArr, id, className }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: chartName,
        data: dataArr,
        fill: false,
        borderColor: generateRandomColor(),
        tension: 0.1,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
  };
  useEffect(() => {
    const canva = document.getElementById(chartName);
    const chart = new Chart(canva, config);
    return () => {
      chart.destroy();
    };
  });
  return (
    <div id={id} className={className}>
      <canvas id={chartName}></canvas>
    </div>
  );
}
