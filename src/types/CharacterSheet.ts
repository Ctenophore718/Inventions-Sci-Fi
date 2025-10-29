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

  // Lenses for Coder class
  lenses?: string[];

  // Rifles for Commander class
  rifles?: string[];

  // Focuses for Contemplative class
  focuses?: string[];

  // Disciplines for Contemplative class (secondary attacks)
  disciplines?: string[];

  // Incantations for Devout class (primary attacks)
  incantations?: string[];

  // Relics for Devout class (secondary attacks)
  relics?: string[];

  // Shards for Elementalist class (primary attacks)
  shards?: string[];

  // Elementals for Elementalist class (secondary attacks)
  elementals?: string[];

  // Integrated Blasters for Exospecialist class (primary attacks)
  integratedBlasters?: string[];

  // Smart Missiles for Exospecialist class (secondary attacks)
  smartMissiles?: string[];

  // Algorithms for Coder class
  algorithms?: string[];

  // Super Serums for Chemist class
  superSerums?: string[];

  // Grenades for Grenadier subclass
  grenades?: string[];

  // Chem Zombies for Necro subclass
  chemZombies?: string[];

  // Noxious Fumes for Poisoner subclass
  noxiousFumes?: string[];

  // Whips for Beguiler subclass
  whips?: string[];

  // Sabres for Galvanic subclass
  sabres?: string[];

  // Flares for Tactician subclass
  flares?: string[];

  // Blasters for Tyrant subclass
  blasters?: string[];

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
    // Necro subclass progression
    necroFeatureDots?: boolean[];
    necroIgnoreDamageDots?: boolean[];
    necroTechniqueRangeDots?: boolean[];
    necroTechniqueInflictBlindDots?: boolean[];
    necroTechniqueCooldownDots?: boolean[];
    necroAttackSpeedDots?: boolean[];
    necroAttackDamageDots?: boolean[];
    necroAttackCritDots?: boolean[];
    necroAttackCooldownDots?: boolean[];
    necroPerksSkillsDots?: boolean[];
    // Poisoner subclass progression
    poisonerFeatureDots?: boolean[];
    poisonerSpikeInflictToxicDots?: boolean[];
    poisonerChemicalImmunityDots?: boolean[];
    poisonerToxicImmunityDots?: boolean[];
    poisonerTechniqueExtraSpikeReroll5Dots?: boolean[];
    poisonerTechniqueExtraSpikeReroll4Dots?: boolean[];
    poisonerTechniqueSameEffectMultipleDots?: boolean[];
    poisonerTechnique2EffectsPerTokenDots?: boolean[];
    poisonerTechniqueCooldownDots?: boolean[];
    poisonerAttackAoEDots?: boolean[];
    poisonerAttackDamageDots?: boolean[];
    poisonerAttackCritDots?: boolean[];
    poisonerAttackCooldownDots?: boolean[];
    poisonerPerksSkillsDots?: boolean[];
    // Coercive subclass progression (Coder)
    coerciveFeatureDots?: boolean[];
    coerciveFeatureAllyAttackDots?: boolean[];
    coerciveTechniqueDots?: boolean[];
    coerciveTechniqueCreatureDots?: boolean[];
    coerciveTechniqueCooldownDots?: boolean[];
    coerciveStrikeMesmerizeDots?: boolean[];
    coercivePerksSkillsDots?: boolean[];
    // Divinist subclass progression (Coder)
    divinistFeatureDots?: boolean[];
    divinistFeatureCritDots?: boolean[];
    divinistFeatureRangeDots?: boolean[];
    divinistStrikeCritDots?: boolean[];
    divinistPerksSkillsDots?: boolean[];
    // Naturalist subclass progression (Coder)
    naturalistStrikeDrainDots?: boolean[];
    naturalistPerksSkillsDots?: boolean[];
    // Technologist subclass progression (Coder)
    technologistStrikeRestrainDots?: boolean[];
    technologistPerksSkillsDots?: boolean[];
    // Poisoner venom master dots
    poisonerVenomMasterDots?: boolean[];
    // Beguiler subclass progression (Commander)
    beguilerFeatureHxDots?: boolean[];
    beguilerTechniqueRangeDots?: boolean[];
    beguilerTechniqueMoveDots?: boolean[];
    beguilerTechniqueCooldownDots?: boolean[];
    beguilerAttackAoEDots?: boolean[];
    beguilerAttackCritDots?: boolean[];
    beguilerAttackCooldownDots?: boolean[];
    beguilerStrikeStrikeDots?: boolean[];
    beguilerStrikeMesmerizeDots?: boolean[];
    beguilerPerksSkillsDots?: boolean[];
    // Galvanic subclass progression (Commander)
    galvanicFeatureHxDots?: boolean[];
    galvanicFeatureHpDots?: boolean[];
    galvanicTechniqueHxDots?: boolean[];
    galvanicTechniqueCritDots?: boolean[];
    galvanicTechniqueHpDots?: boolean[];
    galvanicTechniqueCooldownDots?: boolean[];
    galvanicAttackAoEDots?: boolean[];
    galvanicAttackDamageDots?: boolean[];
    galvanicAttackCritDots?: boolean[];
    galvanicAttackCooldownDots?: boolean[];
    galvanicStrikeDamageDots?: boolean[];
    galvanicStrikeStrikeDots?: boolean[];
    galvanicStrikeAoEDots?: boolean[];
    galvanicPerksSkillsDots?: boolean[];
    // Tactician subclass progression (Commander)
    tacticianFeatureRangeHxDots?: boolean[];
    tacticianFeatureCritDots?: boolean[];
    tacticianFeatureSpeedDots?: boolean[];
    tacticianTechniqueRangeHxDots?: boolean[];
    tacticianTechniqueDamageDiceDots?: boolean[];
    tacticianTechniqueCooldownDots?: boolean[];
    tacticianAttackAoEDots?: boolean[];
    tacticianAttackCritDots?: boolean[];
    tacticianAttackCooldownDots?: boolean[];
    tacticianStrikeStrikeDots?: boolean[];
    tacticianPerksSkillsDots?: boolean[];
    // Tyrant subclass progression (Commander)
    tyrantFeatureHxDots?: boolean[];
    tyrantFeatureConfuseImmunityDots?: boolean[];
    tyrantFeatureMesmerizeImmunityDots?: boolean[];
    tyrantTechniqueHxDots?: boolean[];
    tyrantTechniqueMoveDots?: boolean[];
    tyrantTechniqueCooldownDots?: boolean[];
    tyrantAttackDamageDots?: boolean[];
    tyrantAttackCritDots?: boolean[];
    tyrantAttackCooldownDots?: boolean[];
    tyrantStrikeDamageDots?: boolean[];
    tyrantStrikeDemorizeDots?: boolean[];
    tyrantPerksSkillsDots?: boolean[];
    // Inertial subclass progression (Contemplative)
    inertialFeatureReflectDots?: boolean[];
    inertialTechniqueRangeDots?: boolean[];
    inertialTechniqueCooldownDots?: boolean[];
    inertialHitPointsDots?: boolean[];
    inertialStrikeDamageDots?: boolean[];
    inertialStrikeRestrainDots?: boolean[];
    inertialStrikeSleepDots?: boolean[];
    inertialPerksSkillsDots?: boolean[];
    // Kinetic subclass progression (Contemplative)
    kineticFeatureStrikeDamageDots?: boolean[];
    kineticFeatureMoveHxDots?: boolean[];
    kineticTechniqueBounceHxDots?: boolean[];
    kineticTechniqueDamageDots?: boolean[];
    kineticTechniqueCooldownDots?: boolean[];
    kineticMovementSpeedDots?: boolean[];
    kineticMovementCreatureJumpDots?: boolean[];
    kineticStrikeDamageDots?: boolean[];
    kineticStrikeRangeDots?: boolean[];
    kineticStrikeSlamHxDots?: boolean[];
    kineticStrikeMultiStrikeDots?: boolean[];
    kineticPerksSkillsDots?: boolean[];
    // Aeronaut subclass progression (Exospecialist)
    aeronautFeatureSpeedDots?: boolean[];
    aeronautTechniqueBounceDots?: boolean[];
    aeronautTechniqueSpikeDots?: boolean[];
    aeronautTechniqueAoEDots?: boolean[];
    aeronautTechniqueCooldownDots?: boolean[];
    aeronautHitPointsDots?: boolean[];
    aeronautStrikeDamageDots?: boolean[];
    aeronautStrikeExtraDots?: boolean[];
    aeronautMovementSpeedDots?: boolean[];
    aeronautPerksSkillsDots?: boolean[];
    // Add other subclasses as needed
  };
};