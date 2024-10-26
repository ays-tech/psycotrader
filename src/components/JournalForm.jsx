import { useEffect, useState } from "react";

export default function JournalForm({ entry, onSave, onClose }) {
  const [formData, setFormData] = useState({
    date: entry ? entry.date : new Date().toLocaleDateString(),
    instrument: entry ? entry.instrument : "",
    lotSize: entry ? entry.lotSize : "",
    longShort: entry ? entry.longShort : "long",
    entryPrice: entry ? entry.entryPrice : "",
    exitPrice: entry ? entry.exitPrice : "",
    stopLoss: entry ? entry.stopLoss : "",
    takeProfit: entry ? entry.takeProfit : "",
    profitLoss: entry ? entry.profitLoss : "",
    improvements: entry ? entry.improvements : "",
    emotions: entry ? entry.emotions : "neutral",
    remarks: entry ? entry.remarks : "",
    tradingType: entry ? entry.tradingType : "crypto",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle save action
  const handleSave = () => {
    if (
      !formData.instrument ||
      !formData.lotSize ||
      !formData.entryPrice ||
      !formData.exitPrice ||
      !formData.stopLoss ||
      !formData.takeProfit ||
      !formData.profitLoss
    ) {
      alert("Please fill in all fields before saving.");
      return;
    }

    onSave({ ...formData, id: entry ? entry.id : Date.now() });
  };

  return (
    <div className="mt-4 p-4 bg-[#232e3c] rounded-lg">
      <h3 className="text-lg font-semibold">{entry ? "Edit" : "New"} Journal Entry</h3>
      <input
        name="instrument"
        type="text"
        placeholder="Instrument"
        value={formData.instrument}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <input
        name="lotSize"
        type="number"
        placeholder="Lot Size"
        value={formData.lotSize}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <select
        name="longShort"
        value={formData.longShort}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      >
        <option value="long">Long</option>
        <option value="short">Short</option>
      </select>
      <input
        name="entryPrice"
        type="number"
        placeholder="Entry Price"
        value={formData.entryPrice}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <input
        name="exitPrice"
        type="number"
        placeholder="Exit Price"
        value={formData.exitPrice}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <input
        name="stopLoss"
        type="number"
        placeholder="Stop Loss"
        value={formData.stopLoss}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <input
        name="takeProfit"
        type="number"
        placeholder="Take Profit"
        value={formData.takeProfit}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <input
        name="profitLoss"
        type="number"
        placeholder="Profit/Loss"
        value={formData.profitLoss}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <textarea
        name="improvements"
        placeholder="Improvements"
        value={formData.improvements}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <textarea
        name="emotions"
        placeholder="Emotions"
        value={formData.emotions}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <textarea
        name="remarks"
        placeholder="Remarks"
        value={formData.remarks}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      />
      <select
        name="tradingType"
        value={formData.tradingType}
        onChange={handleChange}
        className="mt-2 p-2 w-full bg-gray-800 rounded-lg"
      >
        <option value="crypto">Crypto</option>
        <option value="forex">Forex</option>
        <option value="stocks">Stocks</option>
      </select>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleSave}
          className="p-2 bg-blue-500 rounded-lg"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="p-2 bg-red-500 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
