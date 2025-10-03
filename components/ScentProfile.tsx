import React, { useState, useEffect } from 'react';
import type { ScentProfile as ScentProfileType, Perfume } from '../types';
import PerfumeCard from './PerfumeCard';
import Button from './ui/Button';
import ScentJourney from './ScentJourney';
import { generateImageForTheme, generateJourneyPerfume } from '../services/geminiService';

interface ScentProfileProps {
  profile: ScentProfileType;
  onRetakeQuiz: () => void;
}

interface JourneyPerfume extends Perfume {
  journeyTitle: string;
}

const ScentProfile: React.FC<ScentProfileProps> = ({ profile, onRetakeQuiz }) => {
  const [perfumesWithImages, setPerfumesWithImages] = useState<Perfume[]>(profile.perfumes);
  const [journeyPerfumes, setJourneyPerfumes] = useState<JourneyPerfume[]>([]);
  const [isLoadingJourney, setIsLoadingJourney] = useState<string | null>(null);
  const [journeyError, setJourneyError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const generateImages = async () => {
      try {
        const imagePromises = profile.perfumes.map(p => generateImageForTheme(p.visualTheme));
        const imageUrls = await Promise.all(imagePromises);

        if (isMounted) {
          const updatedPerfumes = profile.perfumes.map((perfume, index) => ({
            ...perfume,
            imageUrl: imageUrls[index],
          }));
          setPerfumesWithImages(updatedPerfumes);
        }
      } catch (error) {
        console.error("Failed to generate one or more perfume images:", error);
      }
    };

    if (profile.perfumes && profile.perfumes.length > 0) {
      generateImages();
    }
    
    return () => {
      isMounted = false;
    };
  }, [profile.perfumes]);

  const handleJourneySelect = async (journey: string) => {
    if (isLoadingJourney || journeyPerfumes.some(p => p.journeyTitle === journey)) return;

    setIsLoadingJourney(journey);
    setJourneyError(null);
    try {
      const newPerfume = await generateJourneyPerfume(profile, journey);
      const journeyPerfume: JourneyPerfume = { ...newPerfume, journeyTitle: journey };
      setJourneyPerfumes(prev => [...prev, journeyPerfume]);

      const imageUrl = await generateImageForTheme(newPerfume.visualTheme);
      setJourneyPerfumes(prev => prev.map(p => 
        p.journeyTitle === journey ? { ...p, imageUrl } : p
      ));
    } catch (error) {
      console.error(`Error in scent journey for "${journey}":`, error);
      setJourneyError(`متاسفانه در خلق رایحه برای "${journey}" مشکلی پیش آمد. لطفاً دوباره تلاش کنید.`);
      setJourneyPerfumes(prev => prev.filter(p => p.journeyTitle !== journey));
    } finally {
      setIsLoadingJourney(null);
    }
  };

  return (
    <div className="animate-fade-in space-y-12">
      <div className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-indigo-500/20">
        <h1 className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-400 mb-4 drop-shadow-lg">
          {profile.profileTitle}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {profile.personalityTraits.map((trait) => (
            <span key={trait} className="bg-cyan-500/20 text-cyan-300 text-sm font-medium px-4 py-2 rounded-full border border-cyan-500/30">
              {trait}
            </span>
          ))}
        </div>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
          {profile.profileDescription}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {profile.recommendedNotes.map((note) => (
            <span key={note} className="bg-gray-700 text-cyan-300 text-sm font-medium px-4 py-2 rounded-full">
              {note}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-4xl font-serif text-center mb-8 text-white">عطرهای پیشنهادی اولیه شما</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {perfumesWithImages.map((perfume, index) => (
            <PerfumeCard key={index} perfume={perfume} />
          ))}
        </div>
      </div>
      
      <ScentJourney 
        profileTitle={profile.profileTitle} 
        onJourneySelect={handleJourneySelect}
        isLoadingJourney={isLoadingJourney}
      />
      
      {journeyError && <div className="text-center text-red-400 bg-red-900/50 p-3 rounded-lg mt-8">{journeyError}</div>}
      
      {journeyPerfumes.length > 0 && (
         <div>
            <h2 className="text-4xl font-serif text-center mb-8 text-white">رایحه‌های کشف شده در سفر شما</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {journeyPerfumes.map((perfume) => (
                <PerfumeCard key={perfume.journeyTitle} perfume={perfume} journeyTitle={perfume.journeyTitle}/>
              ))}
            </div>
        </div>
      )}

      <div className="text-center pt-8">
        <Button onClick={onRetakeQuiz} variant="secondary">
          انجام دوباره آزمون
        </Button>
      </div>
    </div>
  );
};

export default ScentProfile;