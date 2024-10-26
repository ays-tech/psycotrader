import { LinearProgress } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; // Import CircularProgressbar
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Dashboard({ user }) {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const storedPoints = parseInt(localStorage.getItem("points") || "0");
    setPoints(storedPoints);
  }, []);

  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Trading Performance',
        data: [0, 100, 200, 300, 400, points],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const userGoalProgress = (points / 1000) * 100;

  return (
    <div className="h-auto flex flex-col justify-between overflow-auto px-4 py-5 bg-gray-900 text-white sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col items-start mb-6">
        <div className="flex items-center w-full bg-[#002247] rounded-lg py-4 px-4">
          <div className="w-10 h-10 bg-[#232e3c] rounded-full flex items-center justify-center text-2xl text-green-400">
            {user?.first_name?.slice(0, 1)}
          </div>
          <div className="truncate ml-2 text-lg font-semibold">Welcome, {user?.first_name || "Trader"}!</div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-300">Trading Performance</h3>
        <div className="bg-[#1a202c] rounded-lg p-4 shadow-md">
          <Line data={performanceData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Goal Progress */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-300">Current Goal</h3>
        <p className="text-sm text-slate-400">Your progress towards achieving your goal</p>
        <div className="flex items-center justify-center mt-4">
          <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={userGoalProgress}
              text={`${Math.round(userGoalProgress)}%`}
              styles={buildStyles({
                pathColor: '#4caf50', // Green color for the progress
                textColor: '#fff', // Text color
                trailColor: '#3e3e3e', // Background circle color
              })}
            />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-slate-400">0 XP</span>
          <span className="text-sm text-slate-400">1000 XP</span>
        </div>
      </div>

      {/* Recent Signals */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-300">Recent Signals</h3>
        <div className="space-y-3 mt-3">
          <div className="flex justify-between items-center bg-[#232e3c] rounded-lg p-3 shadow-md">
            <div className="flex items-center gap-2">
              <Image src="/coin.png" width={20} height={20} alt="coin" />
              <span className="text-slate-300">BTC/USDT</span>
            </div>
            <span className="text-green-400">Buy Signal</span>
          </div>
        </div>
      </div>

      {/* Trading Mindset */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-300">Trading Mindset Reminder</h3>
        <p className="text-sm text-slate-400 mt-3">Discipline is the key to successful trading. Stay focused on your goals.</p>
      </div>
    </div>
  );
}
