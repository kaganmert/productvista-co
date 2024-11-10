import React from 'react';

interface WelcomeBannerProps {
  username?: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ username = 'Guest' }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="relative mb-8 overflow-hidden rounded-sm bg-indigo-200 p-4 dark:bg-indigo-500 sm:p-6">
      <div className="relative">
        <h1 className="mb-1 text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
          {getGreeting()}, {username} 👋
        </h1>
        <p className="dark:text-indigo-200">Here is what's happening with new products today:</p>
      </div>
    </div>
  );
};
