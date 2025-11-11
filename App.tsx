
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import ReviewOutput from './components/ReviewOutput';
import { reviewCode } from './services/geminiService';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [codeDiff, setCodeDiff] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!codeDiff.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setReview('');

    try {
      const result = await reviewCode(codeDiff);
      setReview(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [codeDiff, isLoading]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        <CodeInput
          value={codeDiff}
          onChange={(e) => setCodeDiff(e.target.value)}
          disabled={isLoading}
        />
        <ReviewOutput review={review} isLoading={isLoading} error={error} />
      </main>
      <footer className="sticky bottom-0 bg-dark-900/80 backdrop-blur-sm p-4 border-t border-dark-700">
        <div className="container mx-auto flex justify-center">
          <button
            onClick={handleReview}
            disabled={!codeDiff.trim() || isLoading}
            className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary text-white font-bold text-lg rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-300 disabled:bg-dark-700 disabled:text-gray-500 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100 disabled:transform-none"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
                <span>Reviewing...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-6 h-6" />
                <span>Review Code</span>
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
