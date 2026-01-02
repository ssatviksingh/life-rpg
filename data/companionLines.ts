export const COMPANION_LINES = [
    'You don’t need to rush today.',
    'Consistency grows quietly.',
    'Rest is part of the system.',
    'Showing up gently still counts.',
    'Small steps still matter.',
];

export const getDailyCompanionLine = (): string => {
    const today = new Date().toISOString().split('T')[0];
    let hash = 0;

    for (let i = 0; i < today.length; i++) {
        hash = today.charCodeAt(i) + ((hash << 5) - hash);
    }

    return COMPANION_LINES[Math.abs(hash) % COMPANION_LINES.length];
};
