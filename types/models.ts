export interface Player {
    level: number;
    xp: number;
    stamina: number; // 0–100
}

export type QuestStatus = 'active' | 'completed' | 'skipped';

export type QuestCategory = 'health' | 'mindfulness' | 'productivity' | 'social' | 'creativity' | 'learning' | 'special';

export interface Quest {
    id: string;
    title: string;
    category: QuestCategory;
    difficulty: 1 | 2 | 3 | 4 | 5;
    xpReward: number;
    energyCost: number;
    status: QuestStatus;
    icon: string;
    isChallenge?: boolean;
    challengeType?: string;
    requirement?: any;
    description?: string;
}

export interface Streak {
    current: number;
    lastCompletedDate: string | null;
}
