export interface Player {
    level: number;
    xp: number;
    stamina: number; // 0–100
}

export type QuestStatus = 'active' | 'completed' | 'skipped';

export interface Quest {
    id: string;
    title: string;
    difficulty: 1 | 2 | 3 | 4 | 5;
    status: QuestStatus;
}

export interface Streak {
    current: number;
    lastCompletedDate: string | null;
}
