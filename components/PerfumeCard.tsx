
import React from 'react';
import type { Perfume } from '../types';

interface PerfumeCardProps {
  perfume: Perfume;
  journeyTitle?: string;
}

const PerfumeCard: React.FC<PerfumeCardProps> = ({ perfume, journeyTitle }) => {
  return (
    <div className="bg-gray-800/50 rounded-2xl shadow-lg overflow-hidden border border-gray-700/50 group transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <div className="relative w-full h-56 bg-gray-700">
        {perfume.imageUrl ? (
          <img
            src={perfume.imageUrl}
            alt={perfume.visualTheme}
            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center animate-pulse">
            <svg className="w-10 h-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 right-0 p-4 w-full text-right">
            {journeyTitle && (
                <span className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-purple-500 to-amber-500 text-white px-3 py-1 rounded-full shadow-md mb-2 inline-block">
                    {journeyTitle}
                </span>
            )}
            <h3 className="text-2xl font-serif text-white font-bold drop-shadow-lg">{perfume.name}</h3>
        </div>
      </div>
      <div className="p-6 flex-grow text-right">
        <p className="italic text-purple-300 mb-2">{perfume.notes}</p>
        <p className="text-gray-300">{perfume.description}</p>
      </div>
    </div>
  );
};

export default PerfumeCard;