export const COMPANION_LINES = {
  calm: [
    "You don't need to rush today.",
    "Consistency grows quietly.",
    "Rest is part of the system.",
    "Showing up gently still counts.",
    "Small steps still matter.",
    "Peace in the present moment.",
    "Growth happens in stillness.",
    "Today is enough.",
    "Breathe and be present.",
    "Kindness to yourself matters.",
  ],
  encouraging: [
    "You're doing great today.",
    "Every step forward counts.",
    "Your effort is building something beautiful.",
    "Keep nurturing your progress.",
    "You're stronger than you know.",
    "Your journey is unique and valuable.",
    "Small actions create big changes.",
    "You're exactly where you need to be.",
    "Growth is a gentle process.",
    "Celebrate your wins today.",
  ],
  motivational: [
    "Let's build something amazing together.",
    "Your potential is limitless.",
    "Every challenge is an opportunity.",
    "You're capable of incredible things.",
    "Keep pushing forward.",
    "Your growth inspires others.",
    "Embrace the journey ahead.",
    "You're making a difference.",
    "Stay committed to your path.",
    "Your future self will thank you.",
  ],
  reflective: [
    "What small step can you take today?",
    "How has your journey changed you?",
    "What brings you peace today?",
    "What are you grateful for?",
    "What lesson did yesterday teach?",
    "How can you be kinder to yourself?",
    "What progress are you proud of?",
    "What brings you joy in this moment?",
    "How are you growing today?",
    "What does your heart need today?",
  ],
};

export const getDailyCompanionLine = (
  level: number = 1,
  streak: number = 0,
  completedQuests: number = 0
): string => {
  const today = new Date().toISOString().split("T")[0];
  let hash = 0;

  for (let i = 0; i < today.length; i++) {
    hash = today.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Determine mood based on progress
  let moodCategory: keyof typeof COMPANION_LINES;

  if (streak >= 7) {
    moodCategory = "motivational"; // High streak - motivational
  } else if (level >= 5 && completedQuests >= 20) {
    moodCategory = "encouraging"; // Good progress - encouraging
  } else if (completedQuests >= 10) {
    moodCategory = "reflective"; // Some progress - reflective
  } else {
    moodCategory = "calm"; // New or struggling - calm
  }

  const lines = COMPANION_LINES[moodCategory];
  return lines[Math.abs(hash) % lines.length];
};
