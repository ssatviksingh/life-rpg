export interface CharacterProfile {
  name: string;
  title: string;
  description: string;
  minLevel: number;
}

export const CHARACTER_PROFILES: CharacterProfile[] = [
  {
    name: "Life Warrior",
    title: "Personal Growth Champion",
    description: "A steadfast warrior in the battle for self-improvement",
    minLevel: 1,
  },
  {
    name: "Mind Guardian",
    title: "Mental Fortitude Master",
    description: "Protector of inner peace and mental resilience",
    minLevel: 5,
  },
  {
    name: "Habit Knight",
    title: "Routine Crusader",
    description: "Champion of daily discipline and consistent action",
    minLevel: 8,
  },
  {
    name: "Wisdom Seeker",
    title: "Knowledge Pathfinder",
    description: "Explorer of deeper understanding and self-awareness",
    minLevel: 12,
  },
  {
    name: "Spirit Wanderer",
    title: "Soul Journey Guide",
    description: "Navigator of inner landscapes and personal transformation",
    minLevel: 15,
  },
  {
    name: "Growth Sage",
    title: "Evolution Mentor",
    description: "Ancient wisdom keeper guiding continuous development",
    minLevel: 18,
  },
  {
    name: "Phoenix Rising",
    title: "Resurrection Warrior",
    description: "Born from challenges, rising stronger each time",
    minLevel: 22,
  },
  {
    name: "Harmony Weaver",
    title: "Balance Artisan",
    description: "Master weaver of work, rest, and personal harmony",
    minLevel: 25,
  },
];

export const getCharacterProfile = (level: number): CharacterProfile => {
  // Find the highest level profile the player qualifies for
  const availableProfiles = CHARACTER_PROFILES.filter(profile => level >= profile.minLevel);
  if (availableProfiles.length === 0) {
    return CHARACTER_PROFILES[0]; // Fallback to first profile
  }

  // Use level as seed for consistent but varied selection
  const index = level % availableProfiles.length;
  return availableProfiles[index];
};
