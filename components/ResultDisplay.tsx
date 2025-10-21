import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';

interface ResultDisplayProps {
  promptText: string;
  isLoading: boolean;
  error: string | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ promptText, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (!promptText) return;
    navigator.clipboard.writeText(promptText);
    setCopied(true);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8">
          <Icon name="loading" className="w-12 h-12 text-[#D7B877]"/>
          <p className="mt-4 text-lg text-[#5A6351] dark:text-[#CFF5E7]">Architecting your prompt...</p>
        </div>
      );
    }

    if (error) {
      return <div className="p-6 text-red-700 bg-red-100 border border-red-400 rounded-lg dark:bg-red-900/50 dark:text-red-300 dark:border-red-700">{error}</div>;
    }

    if (promptText) {
      // Basic markdown parsing for bold text
      const formattedText = promptText
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#2A2F27] dark:text-[#F5EFE7]">$1</strong>');
      
      return (
        <div className="relative">
          <button
            onClick={handleCopy}
            className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-200 ${
              copied
                ? 'bg-[#0B6247] text-[#F5EFE7]'
                : 'bg-[#E9DCC9] text-[#2A2F27] hover:bg-[#0B6247]/80 hover:text-[#F5EFE7] dark:bg-[#5A6351] dark:text-[#F5EFE7] dark:hover:bg-[#0B6247]'
            }`}
            aria-label={copied ? "Copied!" : "Copy prompt"}
            title={copied ? "Copied!" : "Copy prompt"}
          >
            {copied ? <Icon name="check" className="w-5 h-5" /> : <Icon name="copy" className="w-5 h-5" />}
          </button>
          <div className="prose max-w-none prose-pre:bg-transparent prose-pre:p-0">
             <div dangerouslySetInnerHTML={{ __html: formattedText }} className="whitespace-pre-wrap font-sans text-base leading-relaxed" />
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Icon name="sparkles" className="w-12 h-12 text-[#5A6351]/50 dark:text-[#CFF5E7]/50" />
        <p className="mt-4 text-lg text-[#5A6351]/80 dark:text-[#CFF5E7]/80">Your enhanced prompt will appear here.</p>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#F5EFE7] border border-[#0B6247] rounded-lg min-h-[20rem] p-6 transition-all duration-300 dark:bg-[#2A2F27] dark:border-[#5A6351]">
      {renderContent()}
    </div>
  );
};
