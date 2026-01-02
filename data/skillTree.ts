export interface SkillNodeData {
    id: string;
    title: string;
    description: string;
    requiredLevel: number;
    passiveBonus: string;
}

export const SKILL_TREE: SkillNodeData[] = [
    {
        id: 'focus-1',
        title: 'Gentle Focus',
        description: 'Build the habit of showing up calmly.',
        requiredLevel: 1,
        passiveBonus: '+ clarity in daily tasks',
    },
    {
        id: 'energy-1',
        title: 'Energy Awareness',
        description: 'Notice when to act and when to rest.',
        requiredLevel: 3,
        passiveBonus: '+ better stamina balance',
    },
    {
        id: 'consistency-1',
        title: 'Steady Rhythm',
        description: 'Progress without rushing.',
        requiredLevel: 5,
        passiveBonus: '+ long-term consistency',
    },
    {
        id: 'resilience-1',
        title: 'Resilience',
        description: 'Bounce back without pressure.',
        requiredLevel: 8,
        passiveBonus: '+ recovery mindset',
    },
];
