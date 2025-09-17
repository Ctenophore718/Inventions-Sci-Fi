export type CharacterSheet = {
  id: string; // UUID or timestamp
  // Identity
  playerName: string;
  name: string;
  charClass: string;
  subclass: string;
  species: string;
  subspecies: string;
  background: string;


  // Features
  classFeature?: string;
  subclassFeature?: string;
  speciesFeature?: string;
  subspeciesFeature?: string;

  // Stats
  resistances: string;
  immunities: string;
  absorptions: string;
  movement: string;
  strike: string;
  xpTotal: number;
  xpSpent: number;
  xpRemaining: number;
  spTotal: number;
  spSpent: number;
  spRemaining: number;

  // Portrait
  portrait?: string;
  // Combat
  speed: string;
  strikeDamage: string;
  maxHitPoints: number;
  deathCount: number;
  credits: number;
  chemTokens?: number; // For Chemist class
  // Hit Points UI
  deathDots: boolean[]; // 10 elements, true if selected

  // Strike section
  multiStrike: number;
  strikeEffects: string;

  // Attributes
  attributes: {
    strength: number;
    dexterity: number;
    intelligence: number;
    // Add more as needed
  };

  // Skills
  skills: string[];
  skillsObj: { [key: string]: number };
  // UI state fields
  skillDots?: { [key: string]: boolean[] };
  currentHitPoints?: number;
  hasFreeSkillStarterDots?: boolean; // Track if this character was created with free starter dots

  // Persistent state for Level Up Class Card dots (rows of booleans)
  classCardDots?: boolean[][];

  // Dart guns for Chemist class
  dartGuns?: string[];

  // Super Serums for Chemist class
  superSerums?: string[];

  // Grenades for Grenadier subclass
  grenades?: string[];

  // Subclass progression dots (specific to each subclass)
  subclassProgressionDots?: {
    // Anatomist subclass progression
    anatomistFeatureDots?: boolean[];
    anatomistPrecisionHxDots?: boolean[];
    anatomistTechniqueRangeDots?: boolean[];
    anatomistTechniqueStrikeDamageDots?: boolean[];
    anatomistTechniqueStrikeDots?: boolean[];
    anatomistTechniqueCooldownDots?: boolean[];
    anatomistAttackDamageDots?: boolean[];
    anatomistAttackCritDots?: boolean[];
    anatomistAttackCooldownDots?: boolean[];
    anatomistStrikeDots?: boolean[];
    anatomistSurgeonDots?: boolean[];
    // Grenadier subclass progression
    grenadierFeatureDots?: boolean[];
    grenadierFeatureIncludesAlliesDots?: boolean[];
    grenadierFeatureAoEDots?: boolean[];
    grenadierFeatureImmunityDots?: boolean[];
    grenadierTechniqueDieSizeDots?: boolean[];
    grenadierTechniqueRangeDots?: boolean[];
    grenadierTechniqueCooldownDots?: boolean[];
    grenadierAttackAoEDots?: boolean[];
    grenadierAttackDamageDots?: boolean[];
    grenadierAttackCritDots?: boolean[];
    grenadierAttackCooldownDots?: boolean[];
    grenadierStrikeDots?: boolean[];
    grenadierExplosiveTemperDots?: boolean[];
    // Add other subclasses as needed
  };
};