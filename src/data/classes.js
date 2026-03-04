export const CLASSES = [
    {
      id: 'warrior',
      name: 'Guerrier',
      emoji: '⚔️',
      description: 'Expert en combat rapproché. Haute vitalité et défense.',
      color: '#dc2626',
      baseStats: {
        strength: 15,
        agility: 8,
        intelligence: 5,
        vitality: 12,
        luck: 7
      },
      specialAbility: 'Coup de bouclier : Ignore la défense ennemie',
    },
    {
      id: 'mage',
      name: 'Mage',
      emoji: '🔮',
      description: 'Maître de la magie dévastatrice. Puissant à distance.',
      color: '#2563eb',
      baseStats: {
        strength: 5,
        agility: 7,
        intelligence: 15,
        vitality: 8,
        luck: 8
      },
      specialAbility: 'Boule de feu : Dégâts magiques de zone',
    },
    {
      id: 'rogue',
      name: 'Voleur',
      emoji: '🗡️',
      description: 'Rapide et mortel. Haute chance de critiques.',
      color: '#16a34a',
      baseStats: {
        strength: 10,
        agility: 15,
        intelligence: 7,
        vitality: 9,
        luck: 12
      },
      specialAbility: 'Attaque sournoise : Dégâts x3 en premier',
    },
  ];
  
  export function calculateStats(baseStats, level = 1) {
    return {
      hp: baseStats.vitality * 10 + (level - 1) * 5,
      maxHp: baseStats.vitality * 10 + (level - 1) * 5,
      mp: baseStats.intelligence * 8 + (level - 1) * 3,
      maxMp: baseStats.intelligence * 8 + (level - 1) * 3,
      attack: baseStats.strength * 2 + baseStats.agility,
      defense: Math.floor(baseStats.vitality / 2),
    };
  }