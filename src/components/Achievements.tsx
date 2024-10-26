import React, { useState } from "react";
import { List } from "@telegram-apps/telegram-ui";
import Modal from "./Modal";

// Define the interface for user achievements
interface UserAchievements {
  totalTrades: number;
  successfulTrades: number;
  losses: number;
  highestProfit: number;
}

// Props for the Profile component
interface ProfileProps {
  user: {
    firstName: string;
    lastName?: string;
    username: string;
    isPremium?: boolean;
  };
  userAchievements: UserAchievements; // Include userAchievements in props
}

const Achievement: React.FC<ProfileProps> = ({ user, userAchievements }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const handleAchievementsClick = () => {
    setModalContent(
      <div className='p-4'>
        <div className='font-bold mb-4'>Trading Achievements</div>
        <div className='grid gap-2'>
          <div className='p-2 rounded-md bg-gray-800 text-white'>
            <strong>Total Trades:</strong> {userAchievements.totalTrades}
          </div>
          <div className='p-2 rounded-md bg-gray-800 text-white'>
            <strong>Successful Trades:</strong> {userAchievements.successfulTrades}
          </div>
          <div className='p-2 rounded-md bg-gray-800 text-white'>
            <strong>Losses:</strong> {userAchievements.losses}
          </div>
          <div className='p-2 rounded-md bg-gray-800 text-white'>
            <strong>Highest Profit:</strong> ${userAchievements.highestProfit}
          </div>
        </div>
      </div>
    );
    setIsModalOpen(true);
  };

  return (
    <List className='flex flex-col w-full mt-4 p-4 shadow-md rounded-lg'>
      <div className='mb-4'>
        <div className='text-lg font-bold mb-1'>
          {user.firstName} {user.lastName && user.lastName}
          {user.isPremium && <span className='text-blue-500'> ⭐</span>}
        </div>
        <div className='text-gray-500 mb-2'>@{user.username}</div>
        <button 
          onClick={handleAchievementsClick} 
          className='text-blue-600 hover:underline'>
          View Trading Achievements
        </button>
      </div>

      {/* Modal for Achievements */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {modalContent}
        </Modal>
      )}
    </List>
  );
};

export default Achievement;
