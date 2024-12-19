const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();  // Load environment variables

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());

// Log the environment variables to check if they are correctly loaded
console.log("Alpha Vantage API Key:", process.env.ALPHA_VANTAGE_API_KEY);
console.log("Stock Symbol:", process.env.SYMBOL);

// Get API Key and Symbol from environment variables
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const SYMBOL = process.env.SYMBOL || "AAPL"; // Default to "AAPL" if SYMBOL is not in the .env file

// Store the latest financial data
let latestFinancialData = {};

// Function to fetch stock data from Alpha Vantage
const fetchStockData = async () => {
    try {
        const response = await axios.get(
            `https://www.alphavantage.co/query`,
            {
                params: {
                    function: "TIME_SERIES_INTRADAY",
                    symbol: SYMBOL,
                    interval: "1min",
                    apikey: ALPHA_VANTAGE_API_KEY,
                },
            }
        );

        // Log the entire API response for debugging
        console.log("API Response:", response.data);

        const timeSeries = response.data["Time Series (1min)"];
        
        if (!timeSeries) {
            console.error("No time series data available.");
            return;
        }

        const latestTimestamp = Object.keys(timeSeries)[0];
        const latestData = timeSeries[latestTimestamp];

        latestFinancialData = {
            stock: SYMBOL,
            price: parseFloat(latestData["1. open"]).toFixed(2),
            volume: latestData["5. volume"],
            timestamp: latestTimestamp,
        };

        console.log("Updated Stock Data:", latestFinancialData);
    } catch (error) {
        console.error("Error fetching stock data:", error.message);
    }
};

// Fetch stock data every minute
setInterval(fetchStockData, 60000);

// Emit real-time stock data every minute (same frequency as data update)
setInterval(() => {
    if (Object.keys(latestFinancialData).length > 0) {
        io.emit("financialData", latestFinancialData);
    }
}, 60000);

// API endpoint to fetch the latest financial data
app.get("/api/real-time-data", (req, res) => {
    if (Object.keys(latestFinancialData).length === 0) {
        return res.status(503).json({ error: "Data not available yet." });
    }
    res.json(latestFinancialData);
});

// Basic route
app.get("/", (req, res) => {
    res.send("Welcome to the Backend Server!");
});

// Start the server
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Fetch initial data on startup
fetchStockData();

