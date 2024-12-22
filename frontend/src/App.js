import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import StockChart from "./StockChart";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [realTimeData, setRealTimeData] = useState({});
    const [priceHistory, setPriceHistory] = useState([]);
    const [timestampHistory, setTimestampHistory] = useState([]);

    useEffect(() => {
        const socket = io("https://real-time-financial-dashboard.onrender.com");
        socket.on("financialData", (data) => {
            setRealTimeData(data);
            setPriceHistory((prev) => [...prev, parseFloat(data.price)]);
            setTimestampHistory((prev) => [...prev, data.timestamp]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const chartData = {
        labels: timestampHistory,
        datasets: [
            {
                label: "Price",
                data: priceHistory,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="container mt-4">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">
                    Financial Dashboard
                </a>
            </nav>
            <h1 className="text-center my-4">Real-Time Financial Dashboard</h1>
            <div className="card">
                <div className="card-body">
                    <h4>Real-Time Stock Data</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <strong>Stock:</strong> {realTimeData.stock || "Loading..."}
                        </li>
                        <li className="list-group-item">
                            <strong>Price:</strong> ${realTimeData.price || "Loading..."}
                        </li>
                        <li className="list-group-item">
                            <strong>Timestamp:</strong> {realTimeData.timestamp || "Loading..."}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-4">
                <StockChart chartData={chartData} />
            </div>
        </div>
    );
};

export default App;
