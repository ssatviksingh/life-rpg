import { Quest } from '../types/models';

const gentle = [
    'Drink a glass of water',
    'Stretch for 5 minutes',
    'Take 3 deep breaths',
];

const normal = [
    'Walk for 10 minutes',
    'Organize your desk',
    'Read 5 pages of a book',
];

const stretch = [
    'Complete a focused 30-minute task',
    'Do light exercise for 20 minutes',
    'Plan tomorrow’s top 3 tasks',
];

const pickTitle = (difficulty: number): string => {
    if (difficulty <= 2) {
        return gentle[Math.floor(Math.random() * gentle.length)];
    }
    if (difficulty === 3) {
        return normal[Math.floor(Math.random() * normal.length)];
    }
    return stretch[Math.floor(Math.random() * stretch.length)];
};

export const generateDailyQuests = (): Quest[] => {
    return Array.from({ length: 3 }).map((_, i) => {
        const difficulty = (Math.floor(Math.random() * 5) + 1) as 1 | 2 | 3 | 4 | 5;

        return {
            id: `${Date.now()}-${i}`,
            title: pickTitle(difficulty),
            difficulty,
            status: 'active',
        };
    });
};
