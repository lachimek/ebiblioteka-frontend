import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

export const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: "bottom" as const,
        },
        title: {
            display: true,
            text: "Wykres wypożyczeń dziennych",
        },
    },
};

let labels = [];
for (let index = 1; index <= 31; index++) {
    labels.push("Mar " + index);
}

export const data = {
    labels,
    datasets: [
        {
            label: "Ilość książek",
            data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 20)),
            borderColor: "#ff9e0d",
            backgroundColor: "#ff9e0dcf",
        },
    ],
};

function DailyIssuesGraph() {
    return <Bar options={options} data={data} height={300} width={1200} />;
}

export default DailyIssuesGraph;
