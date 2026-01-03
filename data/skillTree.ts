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
    {
        id: 'mindfulness-1',
        title: 'Present Moment',
        description: 'Cultivate awareness of the here and now.',
        requiredLevel: 10,
        passiveBonus: '+ mindful decision making',
    },
    {
        id: 'creativity-1',
        title: 'Creative Flow',
        description: 'Express yourself without judgment.',
        requiredLevel: 12,
        passiveBonus: '+ artistic inspiration',
    },
    {
        id: 'relationships-1',
        title: 'Connection Builder',
        description: 'Nurture meaningful relationships.',
        requiredLevel: 15,
        passiveBonus: '+ social harmony',
    },
    {
        id: 'learning-1',
        title: 'Curious Mind',
        description: 'Embrace learning as a lifelong journey.',
        requiredLevel: 18,
        passiveBonus: '+ knowledge absorption',
    },
    {
        id: 'gratitude-1',
        title: 'Thankful Heart',
        description: 'Find joy in what you already have.',
        requiredLevel: 20,
        passiveBonus: '+ positive outlook',
    },
    {
        id: 'discipline-1',
        title: 'Inner Strength',
        description: 'Align actions with values consistently.',
        requiredLevel: 22,
        passiveBonus: '+ self-mastery',
    },
    {
        id: 'compassion-1',
        title: 'Kind Spirit',
        description: 'Extend kindness to yourself and others.',
        requiredLevel: 25,
        passiveBonus: '+ empathetic connections',
    },
    {
        id: 'wisdom-1',
        title: 'Wise Choices',
        description: 'Make decisions from experience and insight.',
        requiredLevel: 28,
        passiveBonus: '+ sound judgment',
    },
];
