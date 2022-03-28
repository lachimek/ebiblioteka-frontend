import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
