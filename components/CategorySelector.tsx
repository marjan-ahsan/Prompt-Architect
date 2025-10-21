import React from 'react';
import type { Category } from '../types';
import { PromptCategory } from '../types';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: PromptCategory | null;
  onSelectCategory: (categoryId: PromptCategory) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-center text-[#2A2F27] dark:text-[#F5EFE7] mb-4">Select a Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`p-4 rounded-lg text-center transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F0F2F5] dark:focus:ring-offset-[#1A1D1A] ${
              selectedCategory === category.id
                ? 'bg-[#0B6247] text-[#F5EFE7] shadow-lg scale-105 ring-2 ring-[#D7B877]'
                : 'bg-[#E9DCC9] text-[#2A2F27] hover:bg-[#0B6247] hover:text-[#F5EFE7] hover:scale-105 dark:bg-[#5A6351] dark:text-[#F5EFE7] dark:hover:bg-[#0B6247]'
            }`}
          >
            <span className="font-semibold">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
