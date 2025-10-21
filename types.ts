
export enum PromptCategory {
  VIBE_CODING = 'VIBE_CODING',
  PROJECT_CREATION = 'PROJECT_CREATION',
  CONTENT_WRITING = 'CONTENT_WRITING',
  IMAGE_GEN = 'IMAGE_GEN',
  SCRIPT_WRITING = 'SCRIPT_WRITING',
}

export interface Category {
  id: PromptCategory;
  name: string;
  description: string;
  placeholder: string;
}
