export const calculateXP = (difficulty: number): number => {
    return difficulty * 10;
};

export const getXPToNextLevel = (level: number): number => {
    return Math.floor(100 * Math.pow(level, 1.5));
};
