import { generateRandomColor } from "../components/functions";
import { useEffect } from "react";
import Chart from "chart.js/auto";
export default function Donut({ labels, chartName, dataArr, id, className }) {
  const bgColors = [];
  for (let i = 0; i < labels.length; i++) {
    bgColors.push(generateRandomColor());
  }
  const data = {
    labels: labels,
    datasets: [
      {
        label: chartName,
        data: dataArr,
        backgroundColor: bgColors,
        hoverOffset: labels.length,
      },
    ],
  };
  const config = {
    type: "doughnut",
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
