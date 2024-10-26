export default function JournalEntry({ entry, onEdit, onDelete, onClick }) {
    return (
      <div
        className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
        onClick={() => onClick(entry)}
      >
        <h4 className="font-semibold">{entry.instrument}</h4>
        <p>Date: {entry.date}</p>
        <p>Lot Size: {entry.lotSize}</p>
        <p>Position: {entry.longShort}</p>
        <div className="flex justify-between mt-2">
          <button onClick={(e) => { e.stopPropagation(); onEdit(entry); }} className="text-yellow-500">Edit</button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }} className="text-red-500">Delete</button>
        </div>
      </div>
    );
  }
  