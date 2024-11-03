export const CATEGORIES = [
  "Web Development",
  "Programming",
  "Technology",
  "Design",
] as const;

export type Category = (typeof CATEGORIES)[number]; 