import { generateRandomColor } from "../components/functions";
import { useEffect } from "react";
import Chart from "chart.js/auto";
export default function Bar({
  labels,
  chartName,
  dataArr,
  id,
  className,
  axis,
}) {
  const bgColors = [],
    bdColors = [];
  for (let i = 0; i < labels.length; i++) {
    bgColors.push(generateRandomColor(0.5));
    bdColors.push(generateRandomColor());
  }
  const data = {
    labels: labels,
    axis: axis,
    datasets: [
      {
        label: chartName,
        data: dataArr,
        backgroundColor: bgColors,
        borderColor: bdColors,
        borderWidth: 1,
      },
    ],
  };
  const options =
    axis == "x"
      ? {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }
      : {
          indexAxis: "y",
        };
  const config = {
    type: "bar",
    data: data,
    options: options,
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
