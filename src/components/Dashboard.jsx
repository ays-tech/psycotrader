import { LinearProgress } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Dashboard({ user }) {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const storedPoints = parseInt(localStorage.getItem("points") || "0");
    setPoints(storedPoints);
  }, []);

  const performanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Trading Performance",
        data: [0, 100, 200, 300, 400, points],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const userGoalProgress = (points / 1000) * 100;

  return (
    <div className="h-auto flex flex-col overflow-auto px-4 py-5 bg-gray-900 text-white sm:px-6 lg:px-8">
      {/* Trading Mindset Reminder */}
      <div className="flex flex-col items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-300">Trading Mindset Reminder</h3>
        <p className="text-sm text-slate-400 mt-2 text-center">
          Discipline is the key to successful trading. Stay focused on your goals.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Goal Progress Circle */}
        <div className="flex items-center justify-center bg-[#1a202c] rounded-lg p-4 shadow-md">
          <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={userGoalProgress}
              text={`${Math.round(userGoalProgress)}%`}
              styles={buildStyles({
                pathColor: "#4caf50",
                textColor: "#fff",
                trailColor: "#3e3e3e",
              })}
            />
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-[#1a202c] rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold text-slate-300 mb-2">Trading Performance</h3>
          <Line data={performanceData} options={{ responsive: true }} />
        </div>

        {/* Recent Signals */}
        <div className="bg-[#1a202c] rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold text-slate-300 mb-2">Recent Signals</h3>
          <div className="space-y-3 mt-3">
            <div className="flex justify-between items-center bg-[#232e3c] rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Image src="/coin.png" width={20} height={20} alt="coin" />
                <span className="text-slate-300">BTC/USDT</span>
              </div>
              <span className="text-green-400">Buy Signal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="flex flex-col items-start mt-6 bg-[#002247] rounded-lg py-4 px-4">
        <div className="w-10 h-10 bg-[#232e3c] rounded-full flex items-center justify-center text-2xl text-green-400">
          {user?.first_name?.slice(0, 1)}
        </div>
        <div className="truncate ml-2 text-lg font-semibold">Welcome, {user?.first_name || "Trader"}!</div>
      </div>
    </div>
  );
}
