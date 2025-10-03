import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScentQuiz from './components/ScentQuiz';
import ScentProfile from './components/ScentProfile';
import ChatConsultant from './components/ChatConsultant';
import CommunityFeed from './components/CommunityFeed';
import { generateScentProfile } from './services/geminiService';
import type { QuizAnswers, ScentProfile as ScentProfileType } from './types';
import Loader from './components/ui/Loader';

type View = 'home' | 'quiz' | 'profile' | 'chat' | 'community';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [scentProfile, setScentProfile] = useState<ScentProfileType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuizComplete = useCallback(async (answers: QuizAnswers) => {
    setIsLoading(true);
    setError(null);
    setView('profile');
    try {
      const profile = await generateScentProfile(answers);
      setScentProfile(profile);
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating your scent profile. Please try again.');
      setView('quiz'); // Go back to quiz on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetQuiz = () => {
    setScentProfile(null);
    setView('quiz');
  };

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader />
          <p className="mt-4 text-lg text-cyan-300 animate-pulse font-serif">
            در حال تحلیل شخصیت و ساخت پروفایل بویایی شما...
          </p>
        </div>
      );
    }

    switch (view) {
      case 'quiz':
        return <ScentQuiz onComplete={handleQuizComplete} />;
      case 'profile':
        return scentProfile ? <ScentProfile profile={scentProfile} onRetakeQuiz={resetQuiz} /> : <div className="text-center p-8">ابتدا باید در آزمون شرکت کنید.</div>;
      case 'chat':
        return <ChatConsultant />;
      case 'community':
        return <CommunityFeed />;
      case 'home':
      default:
        return (
          <section 
            className="flex items-center justify-center min-h-[80vh] p-4 md:p-8"
          >
            <div className="container mx-auto">
              <div className="bg-black/30 backdrop-blur-lg rounded-3xl border border-indigo-500/20 p-8 md:p-12 text-center max-w-4xl mx-auto">
                  <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-amber-300 drop-shadow-lg mb-4 font-serif">
                    راز رایحه خود را کشف کنید
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    با تست روانشناسی رایحه ما، به اعماق شخصیت خود سفر کنید و عطری را بیابید که داستان شما را روایت می‌کند.
                  </p>
                  <button
                    onClick={() => setView('quiz')}
                    className="bg-gradient-to-r from-purple-500 to-amber-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg"
                  >
                    شروع تست روانشناسی رایحه
                  </button>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen text-gray-200 flex flex-col">
      <Header setView={setView} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {error && <div className="bg-red-800 border border-red-600 text-white px-4 py-3 rounded-lg relative mb-6 text-center">{error}</div>}
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;