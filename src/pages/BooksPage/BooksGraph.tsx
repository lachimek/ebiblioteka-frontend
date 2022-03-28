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
            text: "Wykres posiadanych książek",
        },
    },
};

const labels = [
    ["Styczeń", "2022"],
    ["Luty", "2022"],
    ["Marzec", "2022"],
    ["Kwiecień", "2022"],
    ["Maj", "2022"],
    ["Czerwiec", "2022"],
    ["Lipiec", "2022"],
    ["Sierpień", "2022"],
    ["Wrzesień", "2022"],
    ["Październik", "2022"],
    ["Listopad", "2022"],
    ["Grudzień", "2022"],
];

export const data = {
    labels,
    datasets: [
        {
            label: "Ilość książek",
            data: [50, 75, 120, 168, 250, 300, 320, 315, 300, 350, 370, 390],
            borderColor: "#ff9e0d",
            backgroundColor: "#ff9e0dcf",
        },
    ],
};

function BooksGraph() {
    return <Bar options={options} data={data} height={300} width={1200} />;
}

export default BooksGraph;
