const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));

const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// Generate Mock Data
const generateMockData = () => ({
    stock: "AAPL",
    price: parseFloat((100 + Math.random() * 50).toFixed(2)), // Random price between 100-150
    volume: Math.floor(1000000 + Math.random() * 500000), // Random volume
    timestamp: new Date().toISOString(),
});

// Emit Mock Data Every Second
io.on("connection", (socket) => {
    console.log("Client connected");

    const interval = setInterval(() => {
        const mockData = generateMockData();
        socket.emit("financialData", mockData);
    }, 1000); // Emit data every second

    socket.on("disconnect", () => {
        clearInterval(interval);
        console.log("Client disconnected");
    });
});

app.get("/", (req, res) => res.send("Server is running!"));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
