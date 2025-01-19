import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
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
import io from "socket.io-client";
import "./App.css"; // Import the CSS for styling

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function App() {
    const [data, setData] = useState({
        stock: "",
        price: 0,
        volume: 0,
        timestamp: "",
    });

    const [priceHistory, setPriceHistory] = useState([]);
    const [timeHistory, setTimeHistory] = useState([]);

    useEffect(() => {
        const socket = io("http://localhost:4000"); // Connect to the WebSocket backend

        socket.on("connect", () => {
            console.log("Connected to backend");
        });

        socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });

        socket.on("financialData", (newData) => {
            console.log("Received data from backend:", newData);

            if (newData && newData.price && newData.timestamp) {
                setData(newData);

                // Keep the last 50 entries for the chart
                setPriceHistory((prevHistory) => {
                    const updatedHistory = [...prevHistory, newData.price];
                    return updatedHistory.slice(-50);
                });

                setTimeHistory((prevHistory) => {
                    const updatedHistory = [...prevHistory, newData.timestamp];
                    return updatedHistory.slice(-50);
                });
            }
        });

        return () => {
            socket.disconnect(); // Clean up on component unmount
        };
    }, []);

    const chartData = {
        labels: timeHistory, // X-axis (timestamps)
        datasets: [
            {
                label: "Stock Price",
                data: priceHistory, // Y-axis (prices)
                borderColor: "rgba(75,192,192,1)",
                fill: false,
                tension: 0.1, // Smooth line
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                mode: "index",
                intersect: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 10, // Limit the number of X-axis labels
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="App">
            <h1>Real-Time Financial Dashboard</h1>

            {/* Display real-time stock details */}
            <div className="card">
                <h2>Real-Time Stock Information</h2>
                <p>Stock: {data.stock || "N/A"}</p>
                <p>Price: ${data.price.toFixed(2) || "0.00"}</p>
                <p>Volume: {data.volume || 0}</p>
                <p>Last Updated: {new Date(data.timestamp).toLocaleTimeString() || "N/A"}</p>
            </div>

            {/* Display real-time chart */}
            <div className="card chart-container">
                <h2>Real-Time Stock Price Chart</h2>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}

export default App;
