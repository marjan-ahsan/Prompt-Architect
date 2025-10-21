import React, { useState, useMemo, useEffect } from 'react';
import type { Category } from './types';
import { PromptCategory } from './types';
import { CATEGORIES } from './constants';
import { enhancePrompt } from './services/geminiService';
import { CategorySelector } from './components/CategorySelector';
import { PromptInput } from './components/PromptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { Icon } from './components/Icon';
import { ThemeToggle } from './components/ThemeToggle';

const App: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<PromptCategory | null>(null);
  const [userInput, setUserInput] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') as 'light' | 'dark' || 'light'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const selectedCategory = useMemo(() => {
    if (!selectedCategoryId) return null;
    return CATEGORIES.find(cat => cat.id === selectedCategoryId) || null;
  }, [selectedCategoryId]);

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      setError('Please enter some keywords to generate a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const result = await enhancePrompt(selectedCategory, userInput);
      if (result.startsWith('An error occurred')) {
         setError(result);
      } else {
        setGeneratedPrompt(result);
      }
    } catch (e: unknown) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unexpected error occurred.');
        }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectCategory = (categoryId: PromptCategory) => {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(categoryId);
    }
    setGeneratedPrompt('');
    setError(null);
  }

  const handleClear = () => {
    setUserInput('');
    setGeneratedPrompt('');
    setError(null);
    setSelectedCategoryId(null);
  };

  const isClearable = userInput.length > 0 || generatedPrompt.length > 0 || selectedCategoryId !== null || error !== null;

  return (
    <div className="min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#CFF5E7]/50 via-[#F0F2F5] to-[#F0F2F5] -z-10 dark:from-[#0B6247]/30 dark:via-[#1A1D1A] dark:to-[#1A1D1A]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0% 100%)' }}
      ></div>
      <div className="max-w-4xl mx-auto">
        <header className="text-center my-8 relative">
           <div className="absolute top-0 right-0">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D7B877] to-[#0B6247] mb-2">
            AI Prompt Architect
          </h1>
          <p className="text-lg text-[#5A6351] dark:text-[#CFF5E7]">
            Generate & Enhance Prompts for Any Task
          </p>
        </header>

        <main className="space-y-12">
          <section className="bg-white/50 dark:bg-[#2A2F27]/50 backdrop-blur-md border border-white/80 dark:border-white/20 p-6 rounded-xl shadow-2xl shadow-[#0B6247]/10 dark:shadow-[#0B6247]/20 space-y-8">
            <CategorySelector
              categories={CATEGORIES}
              selectedCategory={selectedCategoryId}
              onSelectCategory={handleSelectCategory}
            />
            <PromptInput
              value={userInput}
              onChange={setUserInput}
              placeholder={selectedCategory?.placeholder || 'Enter keywords for any task, or select a category for inspiration...'}
              disabled={isLoading}
            />
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !userInput.trim()}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#0B6247] to-[#5A6351] text-[#F5EFE7] font-bold rounded-lg shadow-lg hover:shadow-[#0B6247]/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F0F2F5] dark:focus:ring-offset-[#1A1D1A] focus:ring-[#D7B877]"
              >
                {isLoading ? (
                    <>
                      <Icon name="loading" className="w-5 h-5"/>
                      <span>Generating...</span>
                    </>
                ) : (
                    <>
                      <Icon name="sparkles" className="w-5 h-5"/>
                      <span>Enhance Prompt</span>
                    </>
                )}
              </button>
              <button
                onClick={handleClear}
                disabled={!isClearable || isLoading}
                className="px-8 py-3 bg-transparent text-[#5A6351] font-bold rounded-lg border-2 border-[#E9DCC9] hover:bg-[#E9DCC9] hover:text-[#2A2F27] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F0F2F5] dark:focus:ring-offset-[#1A1D1A] focus:ring-[#D7B877] dark:text-[#CFF5E7] dark:border-[#5A6351] dark:hover:bg-[#5A6351] dark:hover:text-[#F5EFE7]"
              >
                Clear
              </button>
            </div>
          </section>

          <section>
            <ResultDisplay
              promptText={generatedPrompt}
              isLoading={isLoading}
              error={error}
            />
          </section>
        </main>
        
        <footer className="text-center mt-12 py-4">
            <p className="text-[#5A6351]/80 dark:text-[#CFF5E7]/80 text-sm">Powered by 4amthoughts</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
