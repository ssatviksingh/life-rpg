export const calculateXP = (difficulty: number): number => {
    return difficulty * 10;
};

export const getXPToNextLevel = (level: number): number => {
    return Math.floor(100 * Math.pow(level, 1.5));
};

export const getCurrentLevelXP = (level: number, totalXP: number): number => {
    // Calculate total XP required for previous levels
    let xpForPreviousLevels = 0;
    for (let i = 1; i < level; i++) {
        xpForPreviousLevels += getXPToNextLevel(i);
    }

    // Return XP within current level
    return totalXP - xpForPreviousLevels;
};