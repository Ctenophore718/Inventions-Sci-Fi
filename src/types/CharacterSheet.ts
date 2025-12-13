export type CharacterSheet = {
  id: string; // UUID or timestamp
  // Identity
  playerName: string;
  name: string;
  charClass: string;
  subclass: string;
  species: string;
  subspecies: string;
  hostSpecies?: string; // For Cerebronych species - the host they mimic
  humanHostDamageTypes?: string[]; // For Human Host - selected damage types (max 2)
  humanDamageTypes?: string[]; // For Human species - selected damage types (varies with upgrades)
  humanLanguages?: string[]; // For Human species - selected languages (max 2)
  cerebronychLanguage?: string; // For Cerebronych species - selected bonus language from subspecies card
  cognizantLanguage?: string; // For Cognizant species - selected bonus language from species card
  lumenarenLanguage?: string; // For Lumenaren species - selected bonus language
  pollenCollectiveLanguage?: string; // For Adherent of the Pollen Collective background - selected bonus language
  antiDeftSecessionistLanguage?: string; // For Anti-Deft Secessionist background (always Defteran)
  awakenedMachineLanguage?: string; // For Awakened Machine background - selected bonus language
  beltMinerLanguage?: string; // For Belt Miner background - selected bonus language
  blackMarketExecutiveLanguages?: string[]; // For Black Market Executive background - selected bonus languages (max 2)
  combatMedicLanguages?: string[]; // For Combat Medic background - selected bonus languages (max 2)
  covertOperativeLanguage?: string; // For Covert Operative background - selected bonus language
  dagrOfficerLanguage?: string; // For DAGR Officer background - selected bonus language
  exobiologistLanguages?: string[]; // For Exobiologist background - selected bonus languages (max 2)
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
  currentSummonHp?: number; // For Elementalist and Technician classes
  maxSummonHp?: number; // For Elementalist and Technician classes
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

  // Persistent state for Species Card dots (rows of booleans)
  speciesCardDots?: boolean[][];

  // Persistent state for Subspecies Card dots (rows of booleans)
  subspeciesCardDots?: boolean[][];

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

  // Coder Carbines for Ammo Coder subclass (primary attacks)
  coderCarbines?: string[];

  // Rocket Launchers for Ordnancer subclass (primary attacks)
  rocketLaunchers?: string[];

  // Dual Pistols for Pistoleer subclass (primary attacks)
  dualPistols?: string[];

  // Sniper Rifles for Sniper subclass (primary attacks)
  sniperRifles?: string[];

  // Tech Pulses for Technician class (secondary attacks)
  techPulses?: string[];

  // Stealth Drones for Hacker subclass (primary attacks)
  stealthDrones?: string[];

  // Junker Drones for Junker subclass (primary attacks)
  junkerDrones?: string[];

  // Nanodrone Swarms for Nanoboticist subclass (primary attacks)
  nanodroneSwarms?: string[];

  // Siege Drones for Tanker subclass (primary attacks)
  siegeDrones?: string[];

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
    technologistTechniqueReflectHalfDots?: boolean[];
    technologistTechniqueReflectFullDots?: boolean[];
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
    // Brawler subclass progression (Exospecialist)
    brawlerFeatureConditionDots?: boolean[];
    brawlerFeatureCounterDots?: boolean[];
    brawlerTechniqueRangeDots?: boolean[];
    brawlerTechniqueSlamDots?: boolean[];
    brawlerTechniqueSpikeDots?: boolean[];
    brawlerTechniqueCooldownDots?: boolean[];
    brawlerHitPointsDots?: boolean[];
    brawlerStrikeDamageDots?: boolean[];
    brawlerStrikeSpikeDots?: boolean[];
    brawlerStrikeExtraDots?: boolean[];
    brawlerMovementSpeedDots?: boolean[];
    brawlerPerksSkillsDots?: boolean[];
    // Dreadnaught subclass progression (Exospecialist)
    dreadnaughtFeatureBounceImmunityDots?: boolean[];
    dreadnaughtFeatureMesmerizeImmunityDots?: boolean[];
    dreadnaughtFeatureRestrainImmunityDots?: boolean[];
    dreadnaughtFeatureSlamImmunityDots?: boolean[];
    dreadnaughtTechniqueExtraAttackDots?: boolean[];
    dreadnaughtTechniqueCooldownDots?: boolean[];
    dreadnaughtHitPointsDots?: boolean[];
    dreadnaughtHitPointsExtraDots?: boolean[];
    dreadnaughtStrikeDamageDots?: boolean[];
    dreadnaughtPerksSkillsDots?: boolean[];
    // Spectre subclass progression (Exospecialist)
    spectreFeatureExtraCoverDieDots?: boolean[];
    spectreTechniqueTeleportDots?: boolean[];
    spectreTechniqueCannotBeTargetedDots?: boolean[];
    spectreTechniqueCooldownDots?: boolean[];
    spectreHitPointsDots?: boolean[];
    spectreStrikeDamageDots?: boolean[];
    spectreStrikeExtraDots?: boolean[];
    spectreMovementSpeedDots?: boolean[];
    spectrePerksSkillsDots?: boolean[];
    // Hacker subclass progression (Technician)
    hackerTechniqueHitPointsDots?: boolean[];
    hackerTechniqueSpikeDots?: boolean[];
    hackerTechniqueCooldownDots?: boolean[];
    hackerPrimaryAttackDieSizeDots?: boolean[];
    hackerPrimaryAttackSpeedDots?: boolean[];
    hackerPrimaryAttackCritDots?: boolean[];
    hackerPrimaryAttackHitPointsDots?: boolean[];
    hackerStrikeForcedTeleportationDots?: boolean[];
    hackerPerksSkillsDots?: boolean[];
    // Junker subclass progression (Technician)
    junkerFeatureRangeDots?: boolean[];
    junkerFeatureAllyDots?: boolean[];
    junkerFeatureCritDamageDot?: boolean[];
    junkerTechniqueAoEDots?: boolean[];
    junkerTechniqueSpikeDots?: boolean[];
    junkerTechniqueCooldownDots?: boolean[];
    junkerPrimaryAttackDieSizeDots?: boolean[];
    junkerPrimaryAttackRepeatDots?: boolean[];
    junkerPrimaryAttackSpeedDots?: boolean[];
    junkerPrimaryAttackCritDots?: boolean[];
    junkerPrimaryAttackHitPointsDots?: boolean[];
    junkerPerksSkillsDots?: boolean[];
    // Nanoboticist subclass progression (Technician)
    nanoboticistFeatureRangeDots?: boolean[];
    nanoboticistFeatureIncludesAlliesDot?: boolean[];
    nanoboticistTechniqueRangeDots?: boolean[];
    nanoboticistTechniqueConditionDots?: boolean[];
    nanoboticistTechniqueCooldownDots?: boolean[];
    nanoboticistTechniqueFromDroneDot?: boolean[];
    nanoboticistPrimaryAttackTargetDots?: boolean[];
    nanoboticistPrimaryAttackDieSizeDots?: boolean[];
    nanoboticistPrimaryAttackSpeedDots?: boolean[];
    nanoboticistPrimaryAttackHitPointsDots?: boolean[];
    nanoboticistPrimaryAttackSwarmDots?: boolean[];
    nanoboticistPrimaryAttackSpikeDot?: boolean[];
    nanoboticistMovementFlightDot?: boolean[];
    nanoboticistPerksSkillsDots?: boolean[];
    // Add other subclasses as needed
  };

  // Background progression dots (specific to each background)
  backgroundProgressionDots?: {
    pollenCollectiveGreenThumbDots?: boolean[];
    antiDeftSecessionistAtrocitiesDots?: boolean[];
    awakenedMachineFilthyCogDots?: boolean[];
    beltMinerMinersKnowledgeDots?: boolean[];
    blackMarketExecutiveQuestionableNegotiationsDots?: boolean[];
    combatMedicHorrorsOfWarDots?: boolean[];
    covertOperativeInfiltrationExpertDots?: boolean[];
    dagrOfficerSupernaturalAwarenessDots?: boolean[];
    exobiologistNatureAndScienceDots?: boolean[];
  };
};