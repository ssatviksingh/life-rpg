import { Quest, QuestCategory, QuestStatus } from '../types/models';

const questTemplates = {
    health: [
        { title: 'Drink a glass of water', xp: 15, energy: 2 },
        { title: 'Take a 10-minute walk', xp: 25, energy: 5 },
        { title: 'Do 5 minutes of stretching', xp: 20, energy: 3 },
        { title: 'Prepare a healthy meal', xp: 35, energy: 8 },
        { title: 'Get 7-8 hours of sleep', xp: 50, energy: 0 },
        { title: 'Practice deep breathing for 3 minutes', xp: 18, energy: 2 },
        { title: 'Eat a piece of fruit', xp: 12, energy: 1 },
        { title: 'Do 20 jumping jacks', xp: 22, energy: 4 },
        { title: 'Practice yoga for 15 minutes', xp: 40, energy: 6 },
        { title: 'Take vitamins or supplements', xp: 18, energy: 1 },
        { title: 'Go for a bike ride', xp: 45, energy: 8 },
        { title: 'Have a protein-rich breakfast', xp: 28, energy: 3 },
        { title: 'Drink herbal tea', xp: 14, energy: 1 },
        { title: 'Take a relaxing bath', xp: 30, energy: 4 },
        { title: 'Do 10 push-ups', xp: 25, energy: 5 },
        { title: 'Stand up and stretch every hour', xp: 20, energy: 2 },
        { title: 'Track your water intake for the day', xp: 15, energy: 2 },
        { title: 'Prepare a smoothie', xp: 25, energy: 4 },
        { title: 'Go swimming or water aerobics', xp: 50, energy: 9 },
        { title: 'Take a 20-minute power nap', xp: 35, energy: 2 },
    ],
    mindfulness: [
        { title: 'Meditate for 5 minutes', xp: 30, energy: 4 },
        { title: 'Write in a gratitude journal', xp: 25, energy: 6 },
        { title: 'Practice mindfulness for 10 minutes', xp: 35, energy: 5 },
        { title: 'Reflect on your day\'s progress', xp: 22, energy: 3 },
        { title: 'Take a mindful nature walk', xp: 40, energy: 7 },
        { title: 'Practice positive affirmations', xp: 20, energy: 2 },
        { title: 'Listen to calming music for 15 minutes', xp: 25, energy: 3 },
        { title: 'Write down three things you\'re thankful for', xp: 18, energy: 2 },
        { title: 'Practice mindful eating during a meal', xp: 28, energy: 4 },
        { title: 'Do a body scan meditation', xp: 35, energy: 5 },
        { title: 'Spend time in silence for 10 minutes', xp: 22, energy: 2 },
        { title: 'Write a letter to your future self', xp: 40, energy: 6 },
        { title: 'Practice loving-kindness meditation', xp: 30, energy: 4 },
        { title: 'Observe your thoughts without judgment', xp: 25, energy: 3 },
        { title: 'Create a vision board', xp: 45, energy: 8 },
        { title: 'Practice mindful breathing before bed', xp: 20, energy: 2 },
        { title: 'Read an inspirational quote and reflect', xp: 15, energy: 2 },
        { title: 'Do a digital detox for 30 minutes', xp: 35, energy: 3 },
        { title: 'Practice forgiveness meditation', xp: 32, energy: 4 },
        { title: 'Take photos of things that make you happy', xp: 28, energy: 5 },
    ],
    productivity: [
        { title: 'Organize your workspace', xp: 28, energy: 6 },
        { title: 'Complete one focused task', xp: 45, energy: 10 },
        { title: 'Plan tomorrow\'s priorities', xp: 32, energy: 4 },
        { title: 'Review and update your goals', xp: 38, energy: 5 },
        { title: 'Declutter your digital space', xp: 30, energy: 7 },
        { title: 'Create a task checklist', xp: 25, energy: 3 },
        { title: 'Read for 20 minutes', xp: 35, energy: 4 },
        { title: 'Learn something new for 15 minutes', xp: 30, energy: 5 },
        { title: 'Write a to-do list for tomorrow', xp: 22, energy: 3 },
        { title: 'Clean up your email inbox', xp: 25, energy: 6 },
        { title: 'Update your resume or portfolio', xp: 40, energy: 8 },
        { title: 'Organize your finances', xp: 35, energy: 7 },
        { title: 'Complete an online course module', xp: 50, energy: 8 },
        { title: 'Write down your thoughts in a journal', xp: 20, energy: 4 },
        { title: 'Plan a healthy meal for tomorrow', xp: 18, energy: 2 },
        { title: 'Sort through old documents', xp: 30, energy: 6 },
        { title: 'Backup important files', xp: 25, energy: 4 },
        { title: 'Create a budget for the month', xp: 35, energy: 5 },
        { title: 'Update your skill development plan', xp: 28, energy: 4 },
        { title: 'Research a topic that interests you', xp: 32, energy: 6 },
    ],
    social: [
        { title: 'Call a friend or family member', xp: 35, energy: 6 },
        { title: 'Send a thoughtful message', xp: 20, energy: 3 },
        { title: 'Compliment someone genuinely', xp: 18, energy: 2 },
        { title: 'Help someone with a task', xp: 40, energy: 8 },
        { title: 'Attend a social gathering', xp: 50, energy: 10 },
        { title: 'Write a thank-you note', xp: 28, energy: 5 },
        { title: 'Join an online community', xp: 20, energy: 3 },
        { title: 'Have a meaningful conversation', xp: 30, energy: 5 },
        { title: 'Attend a local meetup', xp: 40, energy: 7 },
        { title: 'Collaborate on a project with someone', xp: 45, energy: 8 },
        { title: 'Share your progress with others', xp: 28, energy: 4 },
        { title: 'Host a small gathering', xp: 50, energy: 10 },
        { title: 'Mentor someone younger', xp: 42, energy: 6 },
        { title: 'Participate in a group activity', xp: 35, energy: 7 },
        { title: 'Send birthday wishes to someone', xp: 12, energy: 1 },
        { title: 'Join a club or group', xp: 30, energy: 5 },
        { title: 'Help a neighbor with something', xp: 25, energy: 4 },
        { title: 'Share a meal with loved ones', xp: 38, energy: 6 },
        { title: 'Connect with an old friend online', xp: 25, energy: 3 },
        { title: 'Volunteer for a local cause', xp: 48, energy: 9 },
    ],
    creativity: [
        { title: 'Draw or sketch something', xp: 35, energy: 7 },
        { title: 'Write a short story or poem', xp: 45, energy: 9 },
        { title: 'Play a musical instrument', xp: 40, energy: 8 },
        { title: 'Create something with your hands', xp: 50, energy: 10 },
        { title: 'Design a new habit tracker', xp: 38, energy: 6 },
        { title: 'Take artistic photos', xp: 32, energy: 5 },
        { title: 'Sing or compose a song', xp: 35, energy: 6 },
        { title: 'Paint or color something', xp: 42, energy: 8 },
        { title: 'Dance or create a dance routine', xp: 38, energy: 7 },
        { title: 'Cook or bake something new', xp: 45, energy: 9 },
        { title: 'Design graphics or digital art', xp: 40, energy: 8 },
        { title: 'Write creative prompts', xp: 28, energy: 4 },
        { title: 'Make a vision board', xp: 35, energy: 6 },
        { title: 'Create a piece of jewelry', xp: 48, energy: 9 },
        { title: 'Write a song or rap lyrics', xp: 38, energy: 7 },
        { title: 'Arrange flowers or decor', xp: 30, energy: 5 },
        { title: 'Create a comic strip', xp: 45, energy: 8 },
        { title: 'Film a short video', xp: 50, energy: 10 },
        { title: 'Design a poster or flyer', xp: 35, energy: 6 },
        { title: 'Sculpt or model with clay', xp: 52, energy: 10 },
    ],
    learning: [
        { title: 'Read 10 pages of a book', xp: 30, energy: 4 },
        { title: 'Learn a new word or concept', xp: 20, energy: 3 },
        { title: 'Watch an educational video', xp: 28, energy: 4 },
        { title: 'Practice a new skill for 15 minutes', xp: 35, energy: 6 },
        { title: 'Research a topic of interest', xp: 40, energy: 7 },
        { title: 'Teach someone something you know', xp: 45, energy: 8 },
        { title: 'Take an online course lesson', xp: 42, energy: 6 },
        { title: 'Read a scientific article', xp: 35, energy: 5 },
        { title: 'Learn a basic phrase in another language', xp: 22, energy: 3 },
        { title: 'Solve a puzzle or brain teaser', xp: 25, energy: 4 },
        { title: 'Watch a documentary', xp: 38, energy: 5 },
        { title: 'Learn to play a simple game', xp: 30, energy: 6 },
        { title: 'Study a historical event', xp: 32, energy: 5 },
        { title: 'Practice mental math', xp: 28, energy: 4 },
        { title: 'Learn about a different culture', xp: 36, energy: 5 },
        { title: 'Read the news and analyze an article', xp: 30, energy: 4 },
        { title: 'Learn basic coding or programming', xp: 45, energy: 8 },
        { title: 'Study geography or world maps', xp: 28, energy: 4 },
        { title: 'Learn a new recipe technique', xp: 25, energy: 3 },
        { title: 'Study a famous person\'s biography', xp: 35, energy: 5 },
    ],
};

const categoryIcons = {
    health: '💚',
    mindfulness: '🧘',
    productivity: '⚡',
    social: '👥',
    creativity: '🎨',
    learning: '📚',
    special: '🏆',
};

// Daily Challenge Templates
const dailyChallenges = [
    {
        title: "Triple Threat",
        description: "Complete 3 quests in different categories today",
        xpReward: 100,
        energyCost: 15,
        icon: "🎯",
        type: "multi_category",
        requirement: 3,
    },
    {
        title: "Early Bird",
        description: "Complete your first quest before 10 AM",
        xpReward: 75,
        energyCost: 5,
        icon: "🌅",
        type: "time_based",
        requirement: "before_10am",
    },
    {
        title: "Streak Master",
        description: "Maintain your current streak for 3 more days",
        xpReward: 150,
        energyCost: 20,
        icon: "🔥",
        type: "streak_based",
        requirement: 3,
    },
    {
        title: "Health Hero",
        description: "Complete 2 health-related quests today",
        xpReward: 80,
        energyCost: 10,
        icon: "🏃",
        type: "category_focus",
        requirement: { category: "health", count: 2 },
    },
    {
        title: "Creativity Boost",
        description: "Create something new and share it (virtually or physically)",
        xpReward: 90,
        energyCost: 12,
        icon: "🎨",
        type: "special",
        requirement: "creative_output",
    },
    {
        title: "Mindful Moment",
        description: "Spend 20 minutes in deep mindfulness or meditation",
        xpReward: 85,
        energyCost: 8,
        icon: "🧘",
        type: "mindfulness",
        requirement: 20,
    },
];

export const getQuestIcon = (category: QuestCategory): string => {
    return categoryIcons[category];
};

const pickQuestTemplate = (difficulty: number): { title: string; category: QuestCategory; xp: number; energy: number } => {
    const categories: Exclude<QuestCategory, 'special'>[] = ['health', 'mindfulness', 'productivity', 'social', 'creativity', 'learning'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const templates = questTemplates[category];

    // Filter templates based on difficulty
    const suitableTemplates = templates.filter(template => {
        if (difficulty <= 2) return template.energy <= 5;
        if (difficulty === 3) return template.energy <= 8;
        return template.energy > 5; // Higher difficulty allows higher energy quests
    });

    const template = suitableTemplates[Math.floor(Math.random() * suitableTemplates.length)];
    return { ...template, category };
};

export const generateDailyChallenge = () => {
    const today = new Date().toDateString();
    const challengeIndex = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % dailyChallenges.length;

    const challenge = dailyChallenges[challengeIndex];
    return {
        id: `challenge-${Date.now()}`,
        title: challenge.title,
        category: 'special' as const,
        difficulty: 5 as const,
        xpReward: challenge.xpReward,
        energyCost: challenge.energyCost,
        icon: challenge.icon,
        status: 'active' as const,
        isChallenge: true,
        challengeType: challenge.type,
        requirement: challenge.requirement,
        description: challenge.description,
    };
};

export const generateDailyQuests = (): Quest[] => {
    const quests = Array.from({ length: 4 }).map((_, i) => {
        const difficulty = (Math.floor(Math.random() * 5) + 1) as 1 | 2 | 3 | 4 | 5;
        const template = pickQuestTemplate(difficulty);

        return {
            id: `${Date.now()}-${i}`,
            title: template.title,
            category: template.category,
            difficulty,
            xpReward: template.xp,
            energyCost: template.energy,
            icon: getQuestIcon(template.category),
            status: 'active' as QuestStatus,
            isChallenge: false,
        };
    });

    // Add daily challenge as the 5th quest
    const challenge = generateDailyChallenge();
    quests.push(challenge);

    return quests;
};
