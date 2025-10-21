import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, placeholder, disabled }) => {
  return (
    <div>
      <label htmlFor="prompt-input" className="block text-xl font-bold text-[#2A2F27] dark:text-[#F5EFE7] mb-4 text-center">
        Enter Your Keywords
      </label>
      <textarea
        id="prompt-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={5}
        className="w-full p-4 bg-[#F5EFE7] border-2 border-[#0B6247] rounded-lg text-[#2A2F27] placeholder-[#5A6351] focus:outline-none focus:ring-2 focus:ring-[#D7B877] focus:border-[#D7B877] transition-colors duration-200 dark:bg-[#2A2F27] dark:border-[#5A6351] dark:text-[#F5EFE7] dark:placeholder-[#CFF5E7]/50"
      />
    </div>
  );
};
