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
import { Bar } from "react-chartjs-2";

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
            data: [50, 51, 55, 53, 80, 85, 87, 80, 150, 152, 170, 189],
            borderColor: "#ff9e0d",
            backgroundColor: "#ff9e0dcf",
        },
    ],
};

function MembersGraph() {
    return <Bar options={options} data={data} height={300} width={1200} />;
}

export default MembersGraph;
