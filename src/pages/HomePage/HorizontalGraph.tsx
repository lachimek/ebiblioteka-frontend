import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    indexAxis: "y" as const,
    elements: {
        bar: {
            borderWidth: 1,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
};

const labels = ["Ilość książek", "Ilość wypożyczeń", "Ilość zgubiona", "Ilość zwrócona"];

export const data = {
    labels,
    datasets: [
        {
            label: "Ilość",
            data: [200, 35, 52, 60],
            borderColor: "#ff9e0d",
            backgroundColor: "#ff9e0dcf",
        },
    ],
};

export function HorizontalGraph() {
    return <Bar options={options} data={data} style={{ maxHeight: "200px" }} />;
}
