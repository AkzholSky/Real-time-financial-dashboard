import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const StockChart = ({ chartData }) => {
    return (
        <div>
            <h3>Price History</h3>
            <Line data={chartData} />
        </div>
    );
};

export default StockChart;
