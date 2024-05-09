"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "Banks",
        data: [1250, 1235, 3700],
        backgroundColor: ["#0747b6", "#4d80dd", "#0880b8"]
      }
    ],
    labels: ["Bank 1", "Bank 2", "Bank 3"]
  };
  return (
    <Doughnut
      data={data}
      options={{
        plugins: {
          legend: {
            display: false
          }
        }
      }}
    />
  );
};

export default DonutChart;
