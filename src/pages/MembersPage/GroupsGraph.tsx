import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

export const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        y: {
            ticks: {
                precision: 0,
            },
        },
    },
    plugins: {
        legend: {
            position: "bottom" as const,
        },
        title: {
            display: true,
            text: "Ranking wypożyczeń dla klas",
        },
    },
};

// const labels = [
//     ["Styczeń", "2022"],
//     ["Luty", "2022"],
//     ["Marzec", "2022"],
//     ["Kwiecień", "2022"],
//     ["Maj", "2022"],
//     ["Czerwiec", "2022"],
//     ["Lipiec", "2022"],
//     ["Sierpień", "2022"],
//     ["Wrzesień", "2022"],
//     ["Październik", "2022"],
//     ["Listopad", "2022"],
//     ["Grudzień", "2022"],
// ];

// export const data = {
//     labels,
//     datasets: [
//         {
//             label: "Ilość książek",
//             data: [50, 51, 55, 53, 80, 85, 87, 80, 150, 152, 170, 189],
//             borderColor: "#ff9e0d",
//             backgroundColor: "#ff9e0dcf",
//         },
//     ],
// };

export interface GroupsGraphData {
    group: string;
    value: number;
}

function GroupsGraph({ graphData }: { graphData: GroupsGraphData[] }) {
    const labels = graphData.map((item) => {
        return item.group;
    });
    const dataNumbers = graphData.map((item) => {
        return item.value;
    });
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Ilość wypożyczonych książek",
                data: dataNumbers,
                borderColor: "#ff9e0d",
                backgroundColor: "#ff9e0dcf",
            },
        ],
    };
    return <Bar options={options} data={data} height={300} width={1200} />;
}

export default GroupsGraph;
