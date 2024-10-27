import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useEffect, useState } from 'react';
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
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const storedPoints = parseInt(localStorage.getItem("points") || "0");
    setPoints(storedPoints);
  }, []);

  useEffect(() => {
    const tips = [
      "Stay disciplined and stick to your trading plan!",
      "Use stop-loss orders to protect your capital.",
      "Diversify your portfolio to manage risk.",
      "Keep emotions in check; trading is not gambling.",
      "Learn to read charts to identify trends.",
    ];

    // Change tip every 5 seconds
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const userGoalProgress = (points / 1000) * 100;

  // Example data for Market Sentiment
  const marketSentiments = [
    { asset: 'BTC', sentiment: 'Bullish' },
    { asset: 'ETH', sentiment: 'Neutral' },
    { asset: 'ADA', sentiment: 'Bearish' },
  ];

  // Example data for Top Gainers and Losers
  const topMovers = {
    gainers: [{ asset: 'ETH', change: '+8%' }, { asset: 'ADA', change: '+5%' }],
    losers: [{ asset: 'SOL', change: '-3%' }, { asset: 'DOT', change: '-2%' }],
  };

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

      {/* Tip of the Day */}
      <div className="flex flex-col items-start mt-6">
        <h3 className="text-lg font-semibold text-slate-300">Tip of the Day</h3>
        <div className="bg-[#232e3c] p-4 rounded-lg shadow-md mt-2">
          <p className="text-sm text-slate-400">{["Stay disciplined and stick to your trading plan!", "Use stop-loss orders to protect your capital.", "Diversify your portfolio to manage risk.", "Keep emotions in check; trading is not gambling.", "Learn to read charts to identify trends."][currentTipIndex]}</p>
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
                pathColor: '#4caf50', 
                textColor: '#fff', 
                trailColor: '#3e3e3e',
              })}
            />
          </div>
          <div className="ml-4 flex flex-col">
            <p className="text-sm text-slate-400">Points Earned: {points}</p>
            <p className="text-sm text-slate-400">Goal: 1000 Points</p>
          </div>
        </div>
      </div>

      {/* Market Sentiment Indicator */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-300">Market Sentiments</h3>
        {marketSentiments.map((market, index) => (
          <div key={index} className="bg-[#232e3c] p-4 rounded-lg shadow-md flex items-center justify-between mb-2">
            <span className="text-slate-300">{market.asset}</span>
            <span className={`text-lg font-bold ${market.sentiment === 'Bullish' ? 'text-green-400' : market.sentiment === 'Bearish' ? 'text-red-400' : 'text-yellow-400'}`}>
              {market.sentiment}
            </span>
          </div>
        ))}
      </div>

      {/* Top Gainers and Losers */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-300">Top Gainers & Losers</h3>
        <div className="flex mt-4 gap-4">
          <div className="w-1/2">
            <h4 className="text-md font-semibold text-green-400">Gainers</h4>
            <div className="bg-[#232e3c] p-3 rounded-lg space-y-2">
              {topMovers.gainers.map((gainer, index) => (
                <div key={index} className="flex justify-between text-slate-300">
                  <span>{gainer.asset}</span>
                  <span className="text-green-400">{gainer.change}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2">
            <h4 className="text-md font-semibold text-red-400">Losers</h4>
            <div className="bg-[#232e3c] p-3 rounded-lg space-y-2">
              {topMovers.losers.map((loser, index) => (
                <div key={index} className="flex justify-between text-slate-300">
                  <span>{loser.asset}</span>
                  <span className="text-red-400">{loser.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
