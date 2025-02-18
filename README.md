# Real-Time Financial Dashboard

## Description
The Real-Time Financial Dashboard is a project designed to visualize stock data dynamically. It fetches financial data in real-time using WebSocket communication and displays the data interactively using Chart.js.

## Features
- **Real-Time Data Updates**: Displays live stock price updates and trends.
- **Interactive Charts**: Visualizes data using a dynamic line chart.
- **Optimized Performance**: Limits data history to the last 50 entries for smoother updates.

## Technologies Used
- **Frontend**:
  - React.js
  - Chart.js
  - Socket.io-client
- **Backend**:
  - Node.js
  - Express.js
  - Socket.io
- **Tools**:
  - npm (Node Package Manager)
  - Git

## How to Run

### Prerequisites
- Node.js (v16 or later)
- npm (Node Package Manager)

### Steps to Run the Project
1. **Clone the repository**:
   ```bash
   git clone https://github.com/AkzholSky/real-time-financial-dashboard.git
   ```
2. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the backend server:
     ```bash
     npm start
     ```
3. **Navigate to the frontend folder**:
   ```bash
   cd frontend
   ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend application:
     ```bash
     npm start
     ```
4. Open your browser and go to `http://localhost:3000` to view the application.

## Screenshots
- **Dashboard Overview**: Displays live stock details and charts.
- **Interactive Chart**: Dynamic line chart visualizing stock price trends.

## Future Enhancements
- Add user authentication for personalized dashboards.
- Enable dynamic selection of stock symbols.
- Integrate MongoDB for storing historical data.
- Implement alert notifications for significant stock price changes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
