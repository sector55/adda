import React from 'react';

interface ScentJourneyProps {
  profileTitle: string;
  onJourneySelect: (journey: string) => void;
  isLoadingJourney: string | null;
}

const journeys = [
  { title: 'جلسه کاری مهم', icon: '💼' },
  { title: 'قرار ملاقات عاشقانه', icon: '❤️' },
  { title: 'عصر آرام و مدیتیشن', icon: '🧘' },
  { title: 'جشن و مهمانی شبانه', icon: '🎉' },
  { title: 'افزایش خلاقیت و تمرکز', icon: '💡' },
  { title: 'سفر ماجراجویانه', icon: '✈️' },
];

const ScentJourney: React.FC<ScentJourneyProps> = ({ profileTitle, onJourneySelect, isLoadingJourney }) => {
  return (
    <div className="text-center p-8 bg-gray-800/50 rounded-3xl shadow-2xl border border-indigo-500/20 backdrop-blur-sm mt-12">
      <h2 className="text-4xl font-serif text-white mb-2">سفر رایحه شما</h2>
      <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
        بر اساس شخصیت <span className="text-cyan-300 font-bold">"{profileTitle}"</span>، رایحه‌ای منحصر به فرد برای هر لحظه از زندگی خود کشف کنید.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {journeys.map(({ title, icon }) => (
          <button
            key={title}
            onClick={() => onJourneySelect(title)}
            disabled={!!isLoadingJourney}
            className="flex flex-col items-center justify-center p-6 bg-gray-700/60 rounded-xl border-2 border-transparent hover:border-cyan-500 hover:bg-cyan-900/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 aspect-square disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingJourney === title ? (
              <div className="w-8 h-8 border-4 border-t-4 border-gray-500 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="text-4xl mb-2">{icon}</span>
                <span className="text-center font-semibold text-gray-200">{title}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScentJourney;
