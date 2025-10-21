
import type { Category } from './types';
import { PromptCategory } from './types';

export const CATEGORIES: Category[] = [
  {
    id: PromptCategory.VIBE_CODING,
    name: 'Vibe Coding',
    description: 'Generate code snippets with a specific style or purpose.',
    placeholder: 'e.g., a retro-style login form component using React and Tailwind CSS, functional component with hooks...',
  },
  {
    id: PromptCategory.PROJECT_CREATION,
    name: 'Project Creation',
    description: 'Brainstorm and structure new project ideas.',
    placeholder: 'e.g., a task management app for freelance designers, main features, tech stack ideas...',
  },
  {
    id: PromptCategory.CONTENT_WRITING,
    name: 'Content Writing',
    description: 'Craft articles, blog posts, or social media content.',
    placeholder: 'e.g., a blog post about the benefits of remote work, target audience: tech startups, tone: informative but witty...',
  },
  {
    id: PromptCategory.IMAGE_GEN,
    name: 'Image Gen',
    description: 'Create detailed prompts for image generation models.',
    placeholder: 'e.g., a cyberpunk city at night, raining, neon signs, high detail, photorealistic, 8k...',
  },
  {
    id: PromptCategory.SCRIPT_WRITING,
    name: 'Script Writing',
    description: 'Develop scripts for videos, podcasts, or plays.',
    placeholder: 'e.g., a 5-minute YouTube video script explaining quantum computing to beginners, simple analogies, engaging visuals...',
  },
];
