import React, { useState } from "react";
import styles from './CharacterSheet.module.css';
import { generateOutOfSightJSX } from "../utils/diminutiveFeature";
import { generateFleetOfFootFeatureJSX } from "../utils/litheFeature";
import { generateILLSEEYOUINHELLFeatureJSX } from "../utils/massiveFeature";
import { generateDieHardFeatureJSX } from "../utils/stoutFeature";
import { generateImmutableEnergyReservesFeatureJSX } from "../utils/lumenarenFeature";
import { generateInfraredTrackingFeatureJSX } from "../utils/infraredFeature";
import { generateMisleadingSignalsFeatureJSX } from "../utils/radiofrequentFeature";
import { generateIrradiateFeatureJSX } from "../utils/xrayFeature";
import { generateInspiredHunterFeatureJSX } from "../utils/canidFeature";
import { generateCatsGraceFeatureJSX } from "../utils/felidFeature";
import { generateWeaselFeatureJSX } from "../utils/mustelidFeature";
import { generateNaturalInsulationJSX } from "../utils/ursidFeature";

import type { CharacterSheet } from "../types/CharacterSheet";
import { saveCharacterSheet, loadSheetById } from "../utils/storage";
import { generateChemicalReactionJSX, calculateChemistFeatureData } from "../utils/chemistFeature";
import { generateParasiticComposureJSX, calculateCerebronychFeatureData } from "../utils/cerebronychFeature";
import { generateChemistStrikeJSX } from "../utils/chemistStrike";
import { generateCommanderStrikeJSX } from "../utils/commanderStrike";
import { generateGalvanicStrikeJSX } from "../utils/galvanicStrike";
import { generateAnatomicalPrecisionJSX } from "../utils/anatomistFeature";
import { generateBlasterMasterJSX } from "../utils/grenadierFeature";
import { generateBodySnatcherJSX } from "../utils/necroFeature";
import { generateBackstabberJSX } from "../utils/poisonerFeature";
import { generateFieldOfCoercionJSX } from "../utils/coerciveFeature";
import { generateAuraOfLuckJSX } from "../utils/divinistFeature";
import { generateBoughbenderJSX } from "../utils/naturalistFeature";
import { generateNaturalistStrikeJSX } from "../utils/naturalistStrike";
import { generateTechManipulationJSX } from "../utils/technologistFeature";
import { generateTechnologistStrikeJSX } from "../utils/technologistStrike";
import { generateStaySharpJSX } from "../utils/commanderFeature";
import { generateLoyalServantsJSX } from "../utils/beguilerFeature";
import { generateInspiringPresenceJSX } from "../utils/galvanicFeature";
import { generateTacticalOffensiveJSX } from "../utils/tacticianFeature";
import { generateFearlessJSX } from "../utils/tyrantFeature";
import { generatePsychosomaticHarmonyJSX } from "../utils/contemplativeFeature";
import { generateAdaptablePhysiqueJSX } from "../utils/humanFeature";
import { generateTelekineticShieldJSX } from "../utils/inertialFeature";
import { generateInertialStrikeJSX, generateInertialStrikeDamageJSX, generateInertialStrikeEffectsJSX } from "../utils/inertialStrike";
import { generateFinalFistsJSX } from "../utils/kineticFeature";
import { generateKineticStrikeJSX, generateKineticStrikeDamageJSX, generateKineticStrikeEffectsJSX } from "../utils/kineticStrike";
import { generateMercurialStrikeDamageJSX, generateMercurialStrikeEffectsJSX } from "../utils/mercurialStrike";
import { generateUnreasonableAccuracyJSX } from "../utils/vectorialFeature";
import { generateCrowsCunningJSX } from "../utils/corvidFeature";
import { generateRendingTalonsJSX } from "../utils/falcadorFeature";
import { generateEyesOfTheNightJSX } from "../utils/nocturneFeature";
import { generateCarrionGorgeJSX } from "../utils/vulturineFeature";
import { generateFirstInFlightJSX } from "../utils/avenochFeature";
import { generateVectorialStrikeDamageJSX, generateVectorialStrikeRangeJSX } from "../utils/vectorialStrike";
import { generateRapidRegenerationJSX } from "../utils/chloroptidFeature";
import { generateDeepRootsJSX } from "../utils/barkskinFeature";
import { generateSapSuckerJSX } from "../utils/carnivorousFeature";
import { generateLeafOnTheWindJSX } from "../utils/driftingFeature";
import { generateClimbingCreeperJSX } from "../utils/vinyFeature";
import { generateGearsAndCogsJSX } from "../utils/cognizantFeature";
import { generateEncryptedCerebralCortexJSX } from "../utils/androidFeature";
import { generateVariantUtilityJSX } from "../utils/utilitydroidFeature";
import { generateMountainsEnduranceJSX } from "../utils/petranFeature";
import { generateBornOfFireJSX } from "../utils/emberfolkFeature";
import { generateIgnitionJSX } from "../utils/pyranFeature";
import { generateInsectoidResistanceJSX } from "../utils/entomosFeature";
import { generateSwarmTacticsJSX } from "../utils/apocritanFeature";
import { generateHerculeanJSX } from "../utils/dynastesFeature";
import { generateRaptorialClawsJSX } from "../utils/mantidFeature";
import { generatePredatorJSX } from "../utils/praedariFeature";

import { generateBloodTradeJSX } from "../utils/devoutFeature";
import { generateFatigueJSX } from "../utils/voidFeature";
import { generateVoidStrikeDamageJSX } from "../utils/voidStrike";

import { generateAirArmorJSX } from "../utils/airFeature";
import { generateAirStrikeDamageJSX } from "../utils/airStrike";
import { generateEarthArmorJSX } from "../utils/earthFeature";
import { generateEarthStrikeDamageJSX } from "../utils/earthStrike";
import { generateFireArmorJSX } from "../utils/fireFeature";
import { generateFireStrikeDamageJSX } from "../utils/fireStrike";
import { generateWaterArmorJSX } from "../utils/waterFeature";
import { generateWaterStrikeDamageJSX } from "../utils/waterStrike";

import { generateSteelWingsJSX } from "../utils/aeronautFeature";
import { generateAeronautStrikeJSX, generateAeronautStrikeDamageJSX } from "../utils/aeronautStrike";

import { generateFightinDirtyJSX } from "../utils/brawlerFeature";
import { generateBrawlerStrikeJSX, generateBrawlerStrikeDamageJSX, generateBrawlerStrikeEffectsJSX } from "../utils/brawlerStrike";

import { generateToweringDefenseJSX } from "../utils/dreadnaughtFeature";
import { generateDreadnaughtStrikeDamageJSX } from "../utils/dreadnaughtStrike";

import { generateHoloFieldJSX } from "../utils/spectreFeature";
import { generateSpectreStrikeDamageJSX } from "../utils/spectreStrike";

import { generateMartyrJSX } from "../utils/astralFeature";
import { generateAstralStrikeDamageJSX } from "../utils/astralStrike";
import { generateAggressionJSX } from "../utils/chaosFeature";
import { generateChaosStrikeDamageJSX } from "../utils/chaosStrike";
import { generateOrderStrikeDamageJSX } from "../utils/orderStrike";
import { generateArmoredGuardJSX } from "../utils/orderFeature";
import { generateElementalExcitementJSX } from "../utils/elementalistFeature";
import { generateExosuitJSX } from "../utils/exospecialistFeature";
import { generateSharpshooterCharacterSheetJSX } from "../utils/gunslingerFeature";
import { generateBulletCodeJSX } from "../utils/ammocoderFeature";
import { generateExcessiveDisplayJSX } from "../utils/ordnancerFeature";
import { generateHarryCharacterSheetJSX } from "../utils/pistoleerFeature";
import { generateAmmoCoderStrikeDamageJSX } from "../utils/ammocoderStrike";
import { generateOrdnancerStrikeDamageJSX } from "../utils/ordnancerStrike";
import { generatePistoleerStrikeDamageJSX } from "../utils/pistoleerStrike";
import { generateTargeteerCharacterSheetJSX } from "../utils/sniperFeature";
import { generateSniperStrikeDamageJSX } from "../utils/sniperStrike";
import { generateMasterMechanicCharacterSheetJSX } from "../utils/technicianFeature";
import { generateForcedTeleportationCharacterSheetJSX } from "../utils/hackerStrike";
import { generateSalvageJSX } from "../utils/junkerFeature";
import { generateProtectiveSwarmJSX } from "../utils/nanoboticistFeature";
import { generateIroncladJSX } from "../utils/tankerFeature";

import CharacterSheetInventory from "./CharacterSheetInventory";
import CharacterSheetPerks from "./CharacterSheetPerks";
import CharacterSheetBackground from "./CharacterSheetBackground";

type Props = {
  sheet: CharacterSheet | null;
  onLevelUp: () => void;
  onCards: () => void;
  onHome: () => void;
  onAutoSave: (updates: Partial<CharacterSheet>) => void;
  charClass: string;
  setCharClass: (c: string) => void;
  subclass: string;
  setSubclass: (s: string) => void;
  species: string;
  setSpecies: (sp: string) => void;
  subspecies: string;
  setSubspecies: (ss: string) => void;
  hostSpecies?: string;
  setHostSpecies?: (hs: string) => void;
  isNewCharacter?: boolean;
};


const CharacterSheetComponent: React.FC<Props> = ({ sheet, onLevelUp, onCards, onHome, onAutoSave, charClass, setCharClass, subclass, setSubclass, species, setSpecies, subspecies, setSubspecies, hostSpecies, setHostSpecies }) => {

  // Ref to track pending updates - prevents race conditions with cross-window sync
  const hasPendingUpdatesRef = React.useRef(false);

  // Auto-save helper function
  const handleAutoSave = (fieldUpdates: Partial<CharacterSheet>) => {
    // Mark that we have pending updates
    hasPendingUpdatesRef.current = true;
    onAutoSave(fieldUpdates);
    // Clear pending flag after a short delay (matches App.tsx debounce)
    setTimeout(() => {
      hasPendingUpdatesRef.current = false;
    }, 350);
  };

  // Portrait upload state and ref
  const [portraitUrl, setPortraitUrl] = useState<string | null>(sheet?.portrait || null);
  const [showPortraitOptions, setShowPortraitOptions] = useState(false);
  const portraitInputRef = React.useRef<HTMLInputElement>(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isXpSpMenuExpanded, setIsXpSpMenuExpanded] = useState(false);
  const [isHpMenuExpanded, setIsHpMenuExpanded] = useState(false);
  const [isCreditsMenuExpanded, setIsCreditsMenuExpanded] = useState(false);
  const [isChemTokensMenuExpanded, setIsChemTokensMenuExpanded] = useState(false);
  const [isSummonHpMenuExpanded, setIsSummonHpMenuExpanded] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const waffleRef = React.useRef<HTMLButtonElement>(null);
  const xpSpMenuRef = React.useRef<HTMLDivElement>(null);
  const xpSpButtonRef = React.useRef<HTMLButtonElement>(null);
  const hpMenuRef = React.useRef<HTMLDivElement>(null);
  const hpButtonRef = React.useRef<HTMLButtonElement>(null);
  const creditsMenuRef = React.useRef<HTMLDivElement>(null);
  const creditsButtonRef = React.useRef<HTMLButtonElement>(null);
  const chemTokensMenuRef = React.useRef<HTMLDivElement>(null);
  const chemTokensButtonRef = React.useRef<HTMLButtonElement>(null);
  const summonHpMenuRef = React.useRef<HTMLDivElement>(null);
  const summonHpButtonRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (!isNavExpanded) return;
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        waffleRef.current && !waffleRef.current.contains(e.target as Node)
      ) {
        setIsNavExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isNavExpanded]);

  React.useEffect(() => {
    if (!isXpSpMenuExpanded) return;
    function handleClick(e: MouseEvent) {
      if (
        xpSpMenuRef.current && !xpSpMenuRef.current.contains(e.target as Node) &&
        xpSpButtonRef.current && !xpSpButtonRef.current.contains(e.target as Node)
      ) {
        setIsXpSpMenuExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isXpSpMenuExpanded]);

  React.useEffect(() => {
    if (!isHpMenuExpanded) return;
    function handleClick(e: MouseEvent) {
      if (
        hpMenuRef.current && !hpMenuRef.current.contains(e.target as Node) &&
        hpButtonRef.current && !hpButtonRef.current.contains(e.target as Node)
      ) {
        setIsHpMenuExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isHpMenuExpanded]);

  React.useEffect(() => {
    if (!isCreditsMenuExpanded) return;
    function handleClick(e: MouseEvent) {
      if (
        creditsMenuRef.current && !creditsMenuRef.current.contains(e.target as Node) &&
        creditsButtonRef.current && !creditsButtonRef.current.contains(e.target as Node)
      ) {
        setIsCreditsMenuExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isCreditsMenuExpanded]);

  React.useEffect(() => {
    if (!isChemTokensMenuExpanded) return;
    function handleClick(e: MouseEvent) {
      if (
        chemTokensMenuRef.current && !chemTokensMenuRef.current.contains(e.target as Node) &&
        chemTokensButtonRef.current && !chemTokensButtonRef.current.contains(e.target as Node)
      ) {
        setIsChemTokensMenuExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isChemTokensMenuExpanded]);

  React.useEffect(() => {
    if (!isSummonHpMenuExpanded) return;
    function handleClick(e: MouseEvent) {
      if (
        summonHpMenuRef.current && !summonHpMenuRef.current.contains(e.target as Node) &&
        summonHpButtonRef.current && !summonHpButtonRef.current.contains(e.target as Node)
      ) {
        setIsSummonHpMenuExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isSummonHpMenuExpanded]);
  // Auto-dismiss notice after 2.5 seconds
  React.useEffect(() => {
    if (notice) {
      const timeout = setTimeout(() => setNotice(""), 2500);
      return () => clearTimeout(timeout);
    }
  });


  // Identity fields
  const [playerName, setPlayerName] = useState(sheet?.playerName || "");
  const [name, setName] = useState(sheet?.name || "");
  // charClass, subclass, species, subspecies are now props
  const [background, setBackground] = useState(sheet?.background || "");

  // Sync local state when sheet prop changes
  React.useEffect(() => {
    if (sheet) {
      setPlayerName(sheet.playerName || "");
      setName(sheet.name || "");
      setBackground(sheet.background || "");
      setResistances(sheet.resistances || "");
      setImmunities(sheet.immunities || "");
      setAbsorptions(sheet.absorptions || "");
      setMovement(sheet.movement || "");
      setStrike(sheet.strike || "");
      setXpTotal(sheet.xpTotal || 0);
      setSpTotal(sheet.spTotal || 0);
      setPortraitUrl(sheet.portrait || null);
      setCurrentHitPoints(sheet.currentHitPoints || 0);
      setCredits(sheet.credits || 0);
      setChemTokens(sheet.chemTokens || 0);
      setCurrentSummonHp(sheet.currentSummonHp || 0);
      setMaxSummonHp(sheet.maxSummonHp || 0);
      setDeathCount(sheet.deathCount || 0);
      setClassFeature(sheet.classFeature || "");
    }
  }, [sheet]);

  // Stats fields
  const [resistances, setResistances] = useState(sheet?.resistances || "");
  const [immunities, setImmunities] = useState(sheet?.immunities || "");
  const [absorptions, setAbsorptions] = useState(sheet?.absorptions || "");
  const [movement, setMovement] = useState(sheet?.movement || "");
  const [strike, setStrike] = useState(sheet?.strike || "");
  const [xpTotal, setXpTotal] = useState(sheet?.xpTotal || 0);
  const [spTotal, setSpTotal] = useState(sheet?.spTotal || 0);

  // Features fields
  const [classFeature, setClassFeature] = useState(sheet?.classFeature || "");
  // Map class to string for auto-fill (no JSX)
  const classFeatureMap: { [key: string]: string } = {
    Chemist: "Chemical Reaction.",
    Coder: "Subtle Magic.",
    Commander: "Stay Sharp.",
    Contemplative: "Psychosomatic Harmony.",
    Devout: "Blood Trade.",
    Elementalist: "Elemental Excitement.",
    Exospecialist: "Exosuit.",
    Gunslinger: "Sharpshooter.",
    Technician: "Master Mechanic.",
  };

  // Auto-fill classFeature when class changes, unless user has typed something custom
  React.useEffect(() => {
    if (charClass && classFeatureMap[charClass]) {
      setClassFeature(classFeatureMap[charClass]);
    } else if (!charClass) {
      setClassFeature("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charClass]);

  // Rich JSX for Chemist, Coder, Commander, Contemplative, Devout
  // Use shared function for Chemical Reaction feature
  const chemistFeatureJSX = generateChemicalReactionJSX(sheet?.classCardDots);
  // Show [100] if Coder's Ignore 100% Cover dot is selected (classCardDots[0][0])
  const coderIgnore100 = charClass === "Coder" && sheet?.classCardDots?.[0]?.[0];
  // Show Crit bonus as [1], [2], [3] if +1 Crit dots are selected (classCardDots[1])
  let coderCritBonus = 0;
  if (charClass === "Coder" && sheet?.classCardDots?.[1]) {
    coderCritBonus = sheet.classCardDots[1].filter(Boolean).length;
  }
  const coderFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#112972' }}>Subtle Magic.</i></b> Your <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> ignore <b>[{coderIgnore100 ? 100 : 50}]</b>% Cover and gain a +<b>[{coderCritBonus}]</b> Crit.
    </span>
  );
  const commanderFeatureJSX = generateStaySharpJSX(sheet?.classCardDots);
  const contemplativeFeatureJSX = generatePsychosomaticHarmonyJSX(sheet?.classCardDots);
  const devoutFeatureJSX = generateBloodTradeJSX(sheet?.classCardDots);
  const elementalistFeatureJSX = generateElementalExcitementJSX(sheet?.classCardDots, subclass);
  const exospecialistFeatureJSX = generateExosuitJSX();


  const gunslingerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateSharpshooterCharacterSheetJSX(sheet)}
    </span>
  );  

  const technicianFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateMasterMechanicCharacterSheetJSX(sheet)}
    </span>
  );

  // Auto-fill classFeature when class changes, unless user has typed something custom
  React.useEffect(() => {
    if (charClass && classFeatureMap[charClass]) {
      setClassFeature(classFeatureMap[charClass]);
    } else if (!charClass) {
      setClassFeature("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charClass]);

  // Clear Awakened Machine background if species changes away from Cognizant
  React.useEffect(() => {
    if (!sheet) return;
    if (sheet.background === "Awakened Machine" && sheet.species !== "Cognizant") {
      handleAutoSave({ background: "" });
    }
  }, [sheet?.species, sheet?.background]);

  // Removed unused XP/SP fields

  // Combat fields
  // Calculate speed with Tactician Tactical Offensive bonus
  const baseSpeed = 0; // Base speed is 0 for now (will be increased by Species/Subspecies/Items later)

  const tacticianSpeedBonus = sheet?.subclass === 'Tactician' 
    ? 1 + ((sheet?.subclassProgressionDots as any)?.tacticianFeatureSpeedDots?.filter(Boolean).length || 0)
    : 0;
  const kineticSpeedBonus = sheet?.subclass === 'Kinetic'
    ? ((sheet?.subclassProgressionDots as any)?.kineticMovementSpeedDots?.filter(Boolean).length || 0)
    : 0;
  const mercurialSpeedBonus = sheet?.subclass === 'Mercurial'
    ? ((sheet?.subclassProgressionDots as any)?.mercurialMovementSpeedDots?.filter(Boolean).length || 0)
    : 0;
  const airSpeedBonus = sheet?.subclass === 'Air'
    ? ((sheet?.subclassProgressionDots as any)?.airMovementSpeedDots?.filter(Boolean).length || 0)
    : 0;
  const fireSpeedBonus = sheet?.subclass === 'Fire'
    ? ((sheet?.subclassProgressionDots as any)?.fireMovementSpeedDots?.filter(Boolean).length || 0)
    : 0;
  const waterSpeedBonus = sheet?.subclass === 'Water'
    ? ((sheet?.subclassProgressionDots as any)?.waterMovementSpeedDots?.filter(Boolean).length || 0)
    : 0;
  const aeronautSpeedBonus = sheet?.subclass === 'Aeronaut'
    ? 2 + ((sheet?.subclassProgressionDots as any)?.aeronautFeatureSpeedDots?.filter(Boolean).length || 0) * 2 + ((sheet?.subclassProgressionDots as any)?.aeronautMovementSpeedDots?.filter(Boolean).length || 0) * 2
    : 0;
  const brawlerSpeedBonus = sheet?.subclass === 'Brawler'
    ? ((sheet?.subclassProgressionDots as any)?.brawlerMovementSpeedDots?.filter(Boolean).length || 0)
    : 0;
  const spectreSpeedBonus = sheet?.subclass === 'Spectre'
    ? ((sheet?.subclassProgressionDots as any)?.spectreMovementSpeedDots?.filter(Boolean).length || 0)
    : 0;
  
  // Calculate Avenoch species speed bonus (6 base + dots)
  const avenochSpeedBonus = sheet?.species === 'Avenoch'
    ? (() => {
        const speciesDots = sheet?.speciesCardDots || [];
        const speedDots = speciesDots[7] || [];
        return 6 + speedDots.filter(Boolean).length;
      })()
    : 0;
  
  // Calculate Falcador subspecies speed bonus
  const falcadorSpeedBonus = sheet?.subspecies === 'Falcador'
    ? (sheet?.subspeciesCardDots?.[4]?.filter(Boolean).length || 0)
    : 0;
  
  const ammocoderSpeedBonus = sheet?.subclass === 'Ammo Coder'
    ? ((sheet?.subclassProgressionDots as any)?.ammocoderMovementSpeedDots?.filter(Boolean).length || 0)
    : 0;
  const pistoleerSpeedBonus = sheet?.subclass === 'Pistoleer'
    ? ((sheet?.subclassProgressionDots as any)?.pistoleerMovementSpeedDots?.filter(Boolean).length || 0)
    : 0;
  
  // Calculate Cerebronych species speed bonus (6 base + dots)
  const cerebronychSpeedBonus = sheet?.species === 'Cerebronych'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const speedDots = subspeciesDots[2] || [];
        return 6 + speedDots.filter(Boolean).length;
      })()
    : 0;
  
  // Calculate Chloroptid species speed bonus (6 base + dots)
  const chloroptidSpeedBonus = sheet?.species === 'Chloroptid'
    ? (() => {
        const speciesDots = sheet?.speciesCardDots || [];
        const speedDots = speciesDots[7] || [];
        return 6 + speedDots.filter(Boolean).length;
      })()
    : 0;
  
  // Calculate Drifting subspecies speed bonus
  const driftingSpeedBonus = sheet?.subspecies === 'Drifting'
    ? (sheet?.subspeciesCardDots?.[4]?.filter(Boolean).length || 0)
    : 0;
  
  // Calculate Cognizant species speed bonus (6 base + dots)
  const cognizantSpeedBonus = sheet?.species === 'Cognizant'
    ? (() => {
        const speciesDots = sheet?.speciesCardDots || [];
        const speedDots = speciesDots[8] || [];
        return 6 + speedDots.filter(Boolean).length;
      })()
    : 0;
  
  // Calculate Emberfolk species speed bonus (6 base + dots)
  const emberfolkSpeedBonus = sheet?.species === 'Emberfolk'
    ? (() => {
        const speciesDots = sheet?.speciesCardDots || [];
        const speedDots = speciesDots[6] || [];
        return speedDots.filter(Boolean).length;
      })()
    : 0;
  
  // Calculate Petran subspecies speed bonus (base 5)
  const petranSpeedBonus = sheet?.subspecies === 'Petran' ? 5 : 0;
  
  // Calculate Pyran subspecies speed bonus (base 7 + speed dots from array 8)
  const pyranSpeedBonus = sheet?.subspecies === 'Pyran'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const speedDots = subspeciesDots[8] || [];
        return 7 + speedDots.filter(Boolean).length;
      })()
    : 0;
  
  // Calculate Entomos species speed bonus (base 6 + speed dots from array 5)
  const entomosSpeedBonus = sheet?.species === 'Entomos'
    ? (() => {
        const speciesDots = sheet?.speciesCardDots || [];
        const speedDots = speciesDots[5] || [];
        return 6 + speedDots.filter(Boolean).length;
      })()
    : 0;

  // Calculate Human species speed bonus
  const humanSpeedBonus = sheet?.species === 'Human'
    ? (() => {
        const speciesDots = sheet?.speciesCardDots || [];
        const speedDots = speciesDots[3] || [];
        return 6 + speedDots.filter(Boolean).length;
      })()
    : 0;

  // Calculate Lumenaren species speed bonus (base 5 + speed dots from array 7)
  const lumenarenSpeedBonus = sheet?.species === 'Lumenaren'
    ? (() => {
        const speciesDots = sheet?.speciesCardDots || [];
        const speedDots = speciesDots[7] || [];
        return 5 + speedDots.filter(Boolean).length;
      })()
    : 0;

  // Calculate Apocritan subspecies speed bonus
  const apocritanSpeedBonus = sheet?.subspecies === 'Apocritan'
    ? (sheet?.subspeciesCardDots?.[10]?.[0] ? 1 : 0)
    : 0;
  
  const mantidSpeedBonus = sheet?.subspecies === 'Mantid'
    ? (sheet?.subspeciesCardDots?.[8]?.filter(Boolean).length || 0)
    : 0;
  
  // Calculate Lithe Evolution subspecies speed bonus
  const litheEvolutionSpeedBonus = sheet?.subspecies === 'Lithe Evolution'
    ? (sheet?.subspeciesCardDots?.[7]?.filter(Boolean).length || 0)
    : 0;
  
  // Calculate Praedari species speed bonus (base 7 + speed dots from array 6)
  const praedariSpeedBonus = sheet?.species === 'Praedari'
    ? (() => {
        const speciesDots = sheet?.speciesCardDots || [];
        const speedDots = speciesDots[6] || [];
        return 7 + speedDots.filter(Boolean).length;
      })()
    : 0;
  
  // Calculate Canid subspecies speed bonus (+1 if movement dot is selected)
  const canidSpeedBonus = sheet?.subspecies === 'Canid' && sheet?.subspeciesCardDots?.[9]?.[0]
    ? 1
    : 0;
  
  // Calculate Felid subspecies speed bonus (+1 base + speed dots)
  const felidSpeedBonus = sheet?.subspecies === 'Felid'
    ? 1 + (sheet?.subspeciesCardDots?.[5]?.filter(Boolean).length || 0)
    : 0;

  // Calculate Mustelid subspecies speed bonus (+1 if speed dot is selected)
  const mustelidSpeedBonus = sheet?.subspecies === 'Mustelid'
    ? (sheet?.subspeciesCardDots?.[7]?.filter(Boolean).length || 0)
    : 0;
  
  const totalSpeed = baseSpeed + tacticianSpeedBonus + kineticSpeedBonus + mercurialSpeedBonus + airSpeedBonus + fireSpeedBonus + waterSpeedBonus + aeronautSpeedBonus + brawlerSpeedBonus + spectreSpeedBonus + avenochSpeedBonus + falcadorSpeedBonus + ammocoderSpeedBonus + pistoleerSpeedBonus + cerebronychSpeedBonus + chloroptidSpeedBonus + driftingSpeedBonus + cognizantSpeedBonus + emberfolkSpeedBonus + petranSpeedBonus + pyranSpeedBonus + entomosSpeedBonus + humanSpeedBonus + lumenarenSpeedBonus + apocritanSpeedBonus + mantidSpeedBonus + litheEvolutionSpeedBonus + praedariSpeedBonus + canidSpeedBonus + felidSpeedBonus + mustelidSpeedBonus;
  const speed = totalSpeed > 0 ? `${totalSpeed}` : "0";
  
  // Calculate jump speed and jump amount for Kinetic subclass
  // Kinetic subclass
  const kineticJumpSpeedBonus = sheet?.subclass === 'Kinetic' && (sheet?.subclassProgressionDots as any)?.kineticMovementCreatureJumpDots?.[0]
    ? 3
    : 0;
  const kineticJumpAmountBonus = sheet?.subclass === 'Kinetic' && (sheet?.subclassProgressionDots as any)?.kineticMovementCreatureJumpDots?.[0]
    ? 1
    : 0;

  // Mercurial subclass
  // Mercurial subclass
  const mercurialJumpSpeedBonus = sheet?.subclass === 'Mercurial'
    ? ((sheet?.subclassProgressionDots as any)?.mercurialMovementJumpSpeedDots?.filter(Boolean).length || 0) + ((sheet?.subclassProgressionDots as any)?.mercurialMovementCreatureJumpDots?.[0] ? 3 : 0)
    : 0;
  const mercurialJumpAmountBonus = sheet?.subclass === 'Mercurial'
    ? ((sheet?.subclassProgressionDots as any)?.mercurialMovementCreatureDots?.[0] ? 1 : 0) + ((sheet?.subclassProgressionDots as any)?.mercurialMovementCreatureJumpDots?.[0] ? 1 : 0)
    : 0;
  
  // Pyran subspecies jump speed and jump amount
  const pyranJumpSpeedBonus = sheet?.subspecies === 'Pyran' && sheet?.subspeciesCardDots?.[9]?.[0]
    ? 3 + (sheet?.subspeciesCardDots?.[10]?.filter(Boolean).length || 0)
    : 0;
  const pyranJumpAmountBonus = sheet?.subspecies === 'Pyran' && sheet?.subspeciesCardDots?.[9]?.[0]
    ? 1
    : 0;
  
  // Mantid subspecies jump speed and jump amount
  const mantidJumpSpeedBonus = sheet?.subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[9]?.[0]
    ? 3 + (sheet?.subspeciesCardDots?.[11]?.filter(Boolean).length || 0)
    : 0;
  const mantidJumpAmountBonus = sheet?.subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[9]?.[0]
    ? 1 + (sheet?.subspeciesCardDots?.[10]?.[0] ? 1 : 0)
    : 0;
  
  // Felid subspecies jump speed and jump amount
  const felidJumpSpeedBonus = sheet?.subspecies === 'Felid' && sheet?.subspeciesCardDots?.[6]?.[0]
    ? 3 + (sheet?.subspeciesCardDots?.[8]?.filter(Boolean).length || 0)
    : 0;
  const felidJumpAmountBonus = sheet?.subspecies === 'Felid' && sheet?.subspeciesCardDots?.[6]?.[0]
    ? 1 + (sheet?.subspeciesCardDots?.[7]?.filter(Boolean).length || 0)
    : 0;

  // Mustelid subspecies jump speed and jump amount
  const mustelidJumpSpeedBonus = sheet?.subspecies === 'Mustelid' && sheet?.subspeciesCardDots?.[8]?.[0]
    ? 3
    : 0;
  const mustelidJumpAmountBonus = sheet?.subspecies === 'Mustelid' && sheet?.subspeciesCardDots?.[8]?.[0]
    ? 1
    : 0;
  
  const strikeDamage = sheet?.strikeDamage || "";
  const [maxHitPoints, setMaxHitPoints] = useState(sheet?.maxHitPoints || 0);
  
  // Calculate Aeronaut hit points bonus
  const aeronautHitPointsBonus = sheet?.subclass === 'Aeronaut'
    ? ((sheet?.subclassProgressionDots as any)?.aeronautHitPointsDots?.filter(Boolean).length || 0) * 5
    : 0;
  
  // Calculate Brawler hit points bonus
  const brawlerHitPointsBonus = sheet?.subclass === 'Brawler'
    ? ((sheet?.subclassProgressionDots as any)?.brawlerHitPointsDots?.filter(Boolean).length || 0) * 10
    : 0;
  
  // Calculate Dreadnaught hit points bonus
  const dreadnaughtHitPointsBonus = sheet?.subclass === 'Dreadnaught'
    ? ((sheet?.subclassProgressionDots as any)?.dreadnaughtHitPointsDots?.filter(Boolean).length || 0) * 10 + (((sheet?.subclassProgressionDots as any)?.dreadnaughtHitPointsExtraDots?.[0]) ? 20 : 0)
    : 0;
  
  // Calculate Spectre hit points bonus
  const spectreHitPointsBonus = sheet?.subclass === 'Spectre'
    ? ((sheet?.subclassProgressionDots as any)?.spectreHitPointsDots?.filter(Boolean).length || 0) * 10
    : 0;
  
  // Calculate Avenoch species hit points bonus
  const avenochHitPointsBonus = sheet?.species === 'Avenoch'
    ? (() => {
        const speciesDots = sheet?.speciesCardDots || [];
        const hp5Dots = speciesDots[4] || [];
        const hp10Dots = speciesDots[5] || [];
        const hp15Dots = speciesDots[6] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = (hp15Dots[0] ? 15 : 0);
        
        return 35 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;
  
  // Calculate Cerebronych species hit points bonus
  const cerebronychHitPointsBonus = sheet?.species === 'Cerebronych'
    ? (() => {
        const speciesDots = sheet?.speciesCardDots || [];
        const hp5Dots = speciesDots[9] || [];
        const hp10Dots = speciesDots[10] || [];
        const hp15Dots = speciesDots[11] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = (hp15Dots[0] ? 15 : 0);
        
        return 30 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;
  
  // Calculate Chloroptid species hit points bonus
  const chloroptidHitPointsBonus = sheet?.species === 'Chloroptid'
    ? (() => {
        const speciesDots = sheet?.speciesCardDots || [];
        const hp5Dots = speciesDots[4] || [];
        const hp10Dots = speciesDots[5] || [];
        const hp15Dots = speciesDots[6] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = (hp15Dots[0] ? 15 : 0);
        
        return 40 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;
  
  // Calculate Lumenaren species hit points bonus
  const lumenarenHitPointsBonus = sheet?.species === 'Lumenaren'
    ? (() => {
        const speciesDots = sheet?.speciesCardDots || [];
        const hp5Dots = speciesDots[4] || [];
        const hp10Dots = speciesDots[5] || [];
        const hp15Dots = speciesDots[6] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = (hp15Dots[0] ? 15 : 0);
        
        return 30 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;
  
  // Calculate Barkskin subspecies hit points bonus
  const barkskinHitPointsBonus = sheet?.subspecies === 'Barkskin'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const hp10Dots = subspeciesDots[7] || [];
        
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        
        return hp10Bonus;
      })()
    : 0;
  
  // Calculate Petran subspecies hit points bonus
  const petranHitPointsBonus = sheet?.subspecies === 'Petran'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const hp5Dots = subspeciesDots[7] || [];
        const hp10Dots = subspeciesDots[8] || [];
        const hp15Dots = subspeciesDots[9] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
        
        return 50 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;

  // Calculate Ursid subspecies hit points bonus
  const ursidHitPointsBonus = sheet?.subspecies === 'Ursid'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const hp5Dots = subspeciesDots[9] || [];
        const hp10Dots = subspeciesDots[10] || [];
        const hp15Dots = subspeciesDots[11] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
        
        return 45 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;

  // Calculate Pyran subspecies hit points bonus
  const pyranHitPointsBonus = sheet?.subspecies === 'Pyran'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const hp5Dots = subspeciesDots[5] || [];
        const hp10Dots = subspeciesDots[6] || [];
        const hp15Dots = subspeciesDots[7] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
        
        return 40 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;

  // Calculate Apocritan subspecies hit points bonus
  const apocritanHitPointsBonus = sheet?.subspecies === 'Apocritan'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const hp5Dots = subspeciesDots[7] || [];
        const hp10Dots = subspeciesDots[8] || [];
        const hp15Dots = subspeciesDots[9] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
        
        return 40 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;

  // Calculate Dynastes subspecies hit points bonus
  const dynastesHitPointsBonus = sheet?.subspecies === 'Dynastes'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const hp5Dots = subspeciesDots[6] || [];
        const hp10Dots = subspeciesDots[7] || [];
        const hp15Dots = subspeciesDots[8] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
        
        return 45 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;
  
  // Calculate Mantid subspecies hit points bonus
  const mantidHitPointsBonus = sheet?.subspecies === 'Mantid'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const hp5Dots = subspeciesDots[5] || [];
        const hp10Dots = subspeciesDots[6] || [];
        const hp15Dots = subspeciesDots[7] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
        
        return 35 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;
  
  // Calculate Diminutive Evolution subspecies hit points bonus
  const diminutiveEvolutionHitPointsBonus = sheet?.subspecies === 'Diminutive Evolution'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const hp5Dots = subspeciesDots[3] || [];
        const hp10Dots = subspeciesDots[4] || [];
        const hp15Dots = subspeciesDots[5] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = (hp15Dots[0] ? 15 : 0);
        
        return 40 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;
  
  // Calculate Lithe Evolution subspecies hit points bonus
  const litheEvolutionHitPointsBonus = sheet?.subspecies === 'Lithe Evolution'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const hp5Dots = subspeciesDots[4] || [];
        const hp10Dots = subspeciesDots[5] || [];
        const hp15Dots = subspeciesDots[6] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = (hp15Dots[0] ? 15 : 0);
        
        return 40 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;
  
  const massiveEvolutionHitPointsBonus = sheet?.subspecies === 'Massive Evolution'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const hp5Dots = subspeciesDots[9] || [];
        const hp10Dots = subspeciesDots[10] || [];
        const hp15Dots = subspeciesDots[11] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
        
        return 45 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;
  
  const stoutEvolutionHitPointsBonus = sheet?.subspecies === 'Stout Evolution'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const hp5Dots = subspeciesDots[7] || [];
        const hp10Dots = subspeciesDots[8] || [];
        const hp15Dots = subspeciesDots[9] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
        
        return 40 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;
  
  // Calculate Canid subspecies hit points bonus
  const canidHitPointsBonus = sheet?.subspecies === 'Canid'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const hp5Dots = subspeciesDots[6] || [];
        const hp10Dots = subspeciesDots[7] || [];
        const hp15Dots = subspeciesDots[8] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
        
        return 40 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;

  // Calculate Mustelid subspecies hit points bonus
  const mustelidHitPointsBonus = sheet?.subspecies === 'Mustelid'
    ? (() => {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const hp5Dots = subspeciesDots[4] || [];
        const hp10Dots = subspeciesDots[5] || [];
        const hp15Dots = subspeciesDots[6] || [];
        
        const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
        const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
        const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
        
        return 30 + hp5Bonus + hp10Bonus + hp15Bonus;
      })()
    : 0;
  
  const [deathCount, setDeathCount] = useState(sheet?.deathCount || 0);

  // Attributes
  // Removed unused attribute fields

  // Track SP spent for skills
  const [spSpent, setSpSpent] = useState(() => {
    if (sheet?.spSpent !== undefined) {
      return sheet.spSpent;
    }
    // For new characters, SP spent should start at 0 (will be recalculated in useEffect)
    return 0;
  });

  // Auto-save when critical fields change (debounced for performance)
  // REMOVED - This useEffect was bypassing the parent's auto-save system and causing state sync issues
  // All saves now go through handleAutoSave which properly updates the parent's currentSheet state

  // Hit Points UI state
  const [deathDots, setDeathDots] = useState<boolean[]>(sheet?.deathDots || Array(10).fill(false));
  // Strike section state
  const [multiStrike, setMultiStrike] = useState<number>(sheet?.multiStrike || 0);
  const [strikeEffects, setStrikeEffects] = useState<string>(sheet?.strikeEffects || "");

  // Inventory state for Attack Weapons/Spells dropdown
  const [pendingAttack, setPendingAttack] = useState<string>("");
  const [pendingSecondaryAttack, setPendingSecondaryAttack] = useState<string>("");

  // Current Hit Points state (local only)
  const [currentHitPoints, setCurrentHitPoints] = useState<number>(sheet?.currentHitPoints ?? sheet?.maxHitPoints ?? 0);
  const [hpDelta, setHpDelta] = useState<number>(0);
  
  // Credits state
  const [credits, setCredits] = useState<number>(sheet?.credits ?? 0);
  const [creditsDelta, setCreditsDelta] = useState<number>(0);
  // Chem Tokens state (for Chemist class)
  const [chemTokens, setChemTokens] = useState<number>(sheet?.chemTokens ?? 0);
  
  // Summon HP state (for Elementalist and Technician classes)
  const [currentSummonHp, setCurrentSummonHp] = useState<number>(sheet?.currentSummonHp ?? 0);
  const [maxSummonHp, setMaxSummonHp] = useState<number>(sheet?.maxSummonHp ?? 0);
  const [summonHpDelta, setSummonHpDelta] = useState<number>(0);
  
  // Notice state
  const [notice, setNotice] = useState<string>("");

  // Cross-window synchronization for this character
  React.useEffect(() => {
    const sheetId = sheet?.id;
    
    const handleStorageChange = (e: StorageEvent) => {
      // Skip if we have pending local updates
      if (hasPendingUpdatesRef.current) return;
      
      if (e.key === "rpg-character-sheets" && sheetId) {
        // Reload the current character from storage
        const updatedSheet = loadSheetById(sheetId);
        if (updatedSheet) {
          // Update all local state to match the stored character
          setPlayerName(updatedSheet.playerName || "");
          setName(updatedSheet.name || "");
          setBackground(updatedSheet.background || "");
          setResistances(updatedSheet.resistances || "");
          setImmunities(updatedSheet.immunities || "");
          setAbsorptions(updatedSheet.absorptions || "");
          setMovement(updatedSheet.movement || "");
          setStrike(updatedSheet.strike || "");
          setXpTotal(updatedSheet.xpTotal || 0);
          setSpTotal(updatedSheet.spTotal || 0);
          setCredits(updatedSheet.credits ?? 0);
          setChemTokens(updatedSheet.chemTokens ?? 0);
          setCurrentSummonHp(updatedSheet.currentSummonHp ?? 0);
          setMaxSummonHp(updatedSheet.maxSummonHp ?? 0);
          setMaxHitPoints(updatedSheet.maxHitPoints ?? 0);
          setClassFeature(updatedSheet.classFeature || "");
          setPortraitUrl(updatedSheet.portrait || null);
          setSpSpent(updatedSheet.spSpent ?? 0);
          setDeathDots(updatedSheet.deathDots || Array(10).fill(false));
          setMultiStrike(updatedSheet.multiStrike || 0);
          setStrikeEffects(updatedSheet.strikeEffects || "");
          // Update character details
          setCharClass(updatedSheet.charClass || "");
          setSubclass(updatedSheet.subclass || "");
          setSpecies(updatedSheet.species || "");
          setSubspecies(updatedSheet.subspecies || "");
          if (setHostSpecies) setHostSpecies(updatedSheet.hostSpecies || "");
        }
      }
    };

    const handleCharacterUpdate = (e: CustomEvent<{ sheet: CharacterSheet }>) => {
      // Skip if we have pending local updates
      if (hasPendingUpdatesRef.current) return;
      
      if (sheetId && e.detail.sheet.id === sheetId) {
        const updatedSheet = e.detail.sheet;
        // Update all local state to match the updated character
        setPlayerName(updatedSheet.playerName || "");
        setName(updatedSheet.name || "");
        setBackground(updatedSheet.background || "");
        setResistances(updatedSheet.resistances || "");
        setImmunities(updatedSheet.immunities || "");
        setAbsorptions(updatedSheet.absorptions || "");
        setMovement(updatedSheet.movement || "");
        setStrike(updatedSheet.strike || "");
        setXpTotal(updatedSheet.xpTotal || 0);
        setSpTotal(updatedSheet.spTotal || 0);
        setCredits(updatedSheet.credits ?? 0);
        setChemTokens(updatedSheet.chemTokens ?? 0);
        setCurrentSummonHp(updatedSheet.currentSummonHp ?? 0);
        setMaxSummonHp(updatedSheet.maxSummonHp ?? 0);
        setClassFeature(updatedSheet.classFeature || "");
        setPortraitUrl(updatedSheet.portrait || null);
        setSpSpent(updatedSheet.spSpent ?? 0);
        setDeathDots(updatedSheet.deathDots || Array(10).fill(false));
        setMultiStrike(updatedSheet.multiStrike || 0);
        setStrikeEffects(updatedSheet.strikeEffects || "");
        
        // Update character details
        setCharClass(updatedSheet.charClass || "");
        setSubclass(updatedSheet.subclass || "");
        setSpecies(updatedSheet.species || "");
        setSubspecies(updatedSheet.subspecies || "");
        if (setHostSpecies) setHostSpecies(updatedSheet.hostSpecies || "");
      }
    };

    // Listen for storage changes from other windows
    window.addEventListener('storage', handleStorageChange);
    // Listen for character updates from current window
    window.addEventListener('character-updated', handleCharacterUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('character-updated', handleCharacterUpdate as EventListener);
    };
  }, [sheet?.id, setCharClass, setSubclass, setSpecies, setSubspecies, setHostSpecies]);

  const classOptions = [
    { label: "Chemist", value: "Chemist", color: "#721131" },
    { label: "Coder", value: "Coder", color: "#112972" },
    { label: "Commander", value: "Commander", color: "#717211" },
    { label: "Contemplative", value: "Contemplative", color: "#116372" },
    { label: "Devout", value: "Devout", color: "#6b1172" },
    { label: "Elementalist", value: "Elementalist", color: "#231172" },
    { label: "Exospecialist", value: "Exospecialist", color: "#117233" },
    { label: "Gunslinger", value: "Gunslinger", color: "#4e7211" },
    { label: "Technician", value: "Technician", color: "#724811" },
  ];

  const subclassOptionsMap: { [key: string]: { label: string; value: string; color: string }[] } = {
    Chemist: [
      { label: "Anatomist", value: "Anatomist", color: "#66cf00" },
      { label: "Grenadier", value: "Grenadier", color: "#cf0000" },
      { label: "Necro", value: "Necro", color: "#0033cf" },
      { label: "Poisoner", value: "Poisoner", color: "#cf7600" },
    ],
    Coder: [
      { label: "Coercive", value: "Coercive", color: "#43c9ff" },
      { label: "Divinist", value: "Divinist", color: "#ff4343" },
      { label: "Naturalist", value: "Naturalist", color: "#66cf00" },
      { label: "Technologist", value: "Technologist", color: "#8c43ff" },
    ],
    Commander: [
      { label: "Beguiler", value: "Beguiler", color: "#1f21ce" },
      { label: "Galvanic", value: "Galvanic", color: "#6fce1f" },
      { label: "Tactician", value: "Tactician", color: "#cec31f" },
      { label: "Tyrant", value: "Tyrant", color: "#ce1f1f" },
    ],
    Contemplative: [
      { label: "Inertial", value: "Inertial", color: "#1c945e" },
      { label: "Kinetic", value: "Kinetic", color: "#7b941c" },
      { label: "Mercurial", value: "Mercurial", color: "#941c6c" },
      { label: "Vectorial", value: "Vectorial", color: "#531c94" },
    ],
    Devout: [
      { label: "Astral", value: "Astral", color: "#5bb1af" },
      { label: "Chaos", value: "Chaos", color: "#b15b6c" },
      { label: "Order", value: "Order", color: "#aeb15b" },
      { label: "Void", value: "Void", color: "#5b73b1" },
    ],
    Elementalist: [
      { label: "Air", value: "Air", color: "#0ee2df" },
      { label: "Earth", value: "Earth", color: "#e2b90e" },
      { label: "Fire", value: "Fire", color: "#e20e0e" },
      { label: "Water", value: "Water", color: "#0e42e2" },
    ],
    Exospecialist: [
      { label: "Aeronaut", value: "Aeronaut", color: "#3da1d8" },
      { label: "Brawler", value: "Brawler", color: "#d8a53d" },
      { label: "Dreadnaught", value: "Dreadnaught", color: "#d83da0" },
      { label: "Spectre", value: "Spectre", color: "#6a3dd8" },
    ],
    Gunslinger: [
      { label: "Ammo Coder", value: "Ammo Coder", color: "#0a3991" },
      { label: "Ordnancer", value: "Ordnancer", color: "#910a0a" },
      { label: "Pistoleer", value: "Pistoleer", color: "#5a910a" },
      { label: "Sniper", value: "Sniper", color: "#0a6f91" },
    ],
    Technician: [
      { label: "Hacker", value: "Hacker", color: "#5c57b8" },
      { label: "Junker", value: "Junker", color: "#6db857" },
      { label: "Nanoboticist", value: "Nanoboticist", color: "#57b8b0" },
      { label: "Tanker", value: "Tanker", color: "#b8578b" },
    ],
  };
  const subclassOptions = subclassOptionsMap[charClass] || [];

  // Flatten all subclasses for the 'all subclasses' dropdown
  const allSubclassOptions = Object.entries(subclassOptionsMap).flatMap(([cls, arr]) =>
    arr.map(opt => ({ ...opt, class: cls }))
  );

  const speciesOptions = [
    { label: "Avenoch", value: "Avenoch", color: "#2b5f59" },
    { label: "Cerebronych", value: "Cerebronych", color: "#5f5e2b" },
    { label: "Chloroptid", value: "Chloroptid", color: "#315f2b" },
    { label: "Cognizant", value: "Cognizant", color: "#2b3b5f" },
    { label: "Emberfolk", value: "Emberfolk", color: "#5f2b2b" },
    { label: "Entomos", value: "Entomos", color: "#5f422b" },
    { label: "Human", value: "Human", color: "#2b315f" },
    { label: "Lumenaren", value: "Lumenaren", color: "#515f2b" },
    { label: "Praedari", value: "Praedari", color: "#5f2b5c" },
  ];
  const subspeciesOptionsMap: { [key: string]: { label: string; value: string; color: string; species: string }[] } = {
    Avenoch: [
      { label: "Corvid", value: "Corvid", color: "#75904e", species: "Avenoch" },
      { label: "Falcador", value: "Falcador", color: "#6d7156", species: "Avenoch" },
      { label: "Nocturne", value: "Nocturne", color: "#334592", species: "Avenoch" },
      { label: "Vulturine", value: "Vulturine", color: "#a96d8c", species: "Avenoch" },
    ],
    Cerebronych: [],
    Chloroptid: [
      { label: "Barkskin", value: "Barkskin", color: "#5f2d2b", species: "Chloroptid" },
      { label: "Carnivorous", value: "Carnivorous", color: "#2b2d5f", species: "Chloroptid" },
      { label: "Drifting", value: "Drifting", color: "#5f8a5f", species: "Chloroptid" },
      { label: "Viny", value: "Viny", color: "#5f5f2b", species: "Chloroptid" },
    ],
    Cognizant: [
      { label: "Android", value: "Android", color: "#581fbd", species: "Cognizant" },
      { label: "Utility Droid", value: "Utility Droid", color: "#bd891f", species: "Cognizant" },
    ],
    Emberfolk: [
      { label: "Petran", value: "Petran", color: "#735311", species: "Emberfolk" },
      { label: "Pyran", value: "Pyran", color: "#b31111", species: "Emberfolk" },
    ],
    Entomos: [
      { label: "Apocritan", value: "Apocritan", color: "#6d7156", species: "Entomos" },
      { label: "Dynastes", value: "Dynastes", color: "#334592", species: "Entomos" },
      { label: "Mantid", value: "Mantid", color: "#75904e", species: "Entomos" },
    ],
    Human: [
      { label: "Diminutive Evolution", value: "Diminutive Evolution", color: "#c3735f", species: "Human" },
      { label: "Lithe Evolution", value: "Lithe Evolution", color: "#2b5f5f", species: "Human" },
      { label: "Massive Evolution", value: "Massive Evolution", color: "#2b175f", species: "Human" },
      { label: "Stout Evolution", value: "Stout Evolution", color: "#5f2b2b", species: "Human" },
    ],
    Lumenaren: [
      { label: "Infrared", value: "Infrared", color: "#b17fbe", species: "Lumenaren" },
      { label: "Radiofrequent", value: "Radiofrequent", color: "#bea97f", species: "Lumenaren" },
      { label: "X-Ray", value: "X-Ray", color: "#7f8abe", species: "Lumenaren" },
    ],
    Praedari: [
      { label: "Canid", value: "Canid", color: "#2f8da6", species: "Praedari" },
      { label: "Felid", value: "Felid", color: "#b16326", species: "Praedari" },
      { label: "Mustelid", value: "Mustelid", color: "#699239", species: "Praedari" },
      { label: "Ursid", value: "Ursid", color: "#9026b1", species: "Praedari" },
    ],
  };
  const allSubspeciesOptions = Object.values(subspeciesOptionsMap).flat();
  const hostOptions = [
    { label: "Avenoch Host", value: "Avenoch Host", color: "#2b5f59", hostColor: "#2b5f59" },
    { label: "Corvid Avenoch Host", value: "Corvid Avenoch Host", color: "#75904e", hostColor: "#2b5f59" },
    { label: "Falcador Avenoch Host", value: "Falcador Avenoch Host", color: "#6d7156", hostColor: "#2b5f59" },
    { label: "Nocturne Avenoch Host", value: "Nocturne Avenoch Host", color: "#334592", hostColor: "#2b5f59" },
    { label: "Vulturine Avenoch Host", value: "Vulturine Avenoch Host", color: "#a96d8c", hostColor: "#2b5f59" },
    { label: "Chloroptid Host", value: "Chloroptid Host", color: "#315f2b", hostColor: "#315f2b" },
    { label: "Barkskin Chloroptid Host", value: "Barkskin Chloroptid Host", color: "#5f2d2b", hostColor: "#315f2b" },
    { label: "Carnivorous Chloroptid Host", value: "Carnivorous Chloroptid Host", color: "#2b2d5f", hostColor: "#315f2b" },
    { label: "Drifting Chloroptid Host", value: "Drifting Chloroptid Host", color: "#5f8a5f", hostColor: "#315f2b" },
    { label: "Viny Chloroptid Host", value: "Viny Chloroptid Host", color: "#5f5f2b", hostColor: "#315f2b" },
    { label: "Cognizant Host", value: "Cognizant Host", color: "#2b3b5f", hostColor: "#2b3b5f" },
    { label: "Android Cognizant Host", value: "Android Cognizant Host", color: "#581fbd", hostColor: "#2b3b5f" },
    { label: "Utility Droid Cognizant Host", value: "Utility Droid Cognizant Host", color: "#bd891f", hostColor: "#2b3b5f" },
    { label: "Emberfolk Host", value: "Emberfolk Host", color: "#5f2b2b", hostColor: "#5f2b2b" },
    { label: "Petran Emberfolk Host", value: "Petran Emberfolk Host", color: "#735311", hostColor: "#5f2b2b" },
    { label: "Pyran Emberfolk Host", value: "Pyran Emberfolk Host", color: "#b31111", hostColor: "#5f2b2b" },
    { label: "Entomos Host", value: "Entomos Host", color: "#5f422b", hostColor: "#5f422b" },
    { label: "Apocritan Entomos Host", value: "Apocritan Entomos Host", color: "#6d7156", hostColor: "#5f422b" },
    { label: "Dynastes Entomos Host", value: "Dynastes Entomos Host", color: "#334592", hostColor: "#5f422b" },
    { label: "Mantid Entomos Host", value: "Mantid Entomos Host", color: "#75904e", hostColor: "#5f422b" },
    { label: "Human Host", value: "Human Host", color: "#2b315f", hostColor: "#2b315f" },
    { label: "Diminutive Human Host", value: "Diminutive Human Host", color: "#c3735f", hostColor: "#2b315f" },
    { label: "Lithe Human Host", value: "Lithe Human Host", color: "#2b5f5f" },
    { label: "Massive Human Host", value: "Massive Human Host", color: "#2b175f" },
    { label: "Stout Human Host", value: "Stout Human Host", color: "#5f2b2b" },
    { label: "Lumenaren Host", value: "Lumenaren Host", color: "#515f2b" },
    { label: "Infrared Lumenaren Host", value: "Infrared Lumenaren Host", color: "#b17fbe" },
    { label: "Radiofrequent Lumenaren Host", value: "Radiofrequent Lumenaren Host", color: "#bea97f" },
    { label: "X-Ray Lumenaren Host", value: "X-Ray Lumenaren Host", color: "#7f8abe" },
    { label: "Praedari Host", value: "Praedari Host", color: "#5f2b5c" },
    { label: "Canid Praedari Host", value: "Canid Praedari Host", color: "#2f8da6" },
    { label: "Felid Praedari Host", value: "Felid Praedari Host", color: "#b16326" },
    { label: "Mustelid Praedari Host", value: "Mustelid Praedari Host", color: "#699239" },
    { label: "Ursid Praedari Host", value: "Ursid Praedari Host", color: "#9026b1" },
  ];
  const subspeciesOptions = species === "Cerebronych"
    ? hostOptions
    : subspeciesOptionsMap[species] || [];

  // Helper function to render colored host text for Cerebronych
  const renderColoredHostText = (hostValue: string): React.JSX.Element => {
    const colorMap: { [key: string]: React.JSX.Element } = {
      "": <span style={{ fontWeight: 'bold', color: '#000' }}>Select Host</span>,
      "Avenoch Host": <><span style={{ color: '#2b5f59', fontWeight: 'bold' }}>Avenoch</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Corvid Avenoch Host": <><span style={{ color: '#75904e', fontWeight: 'bold' }}>Corvid</span> <span style={{ color: '#2b5f59', fontWeight: 'bold' }}>Avenoch</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Falcador Avenoch Host": <><span style={{ color: '#6d7156', fontWeight: 'bold' }}>Falcador</span> <span style={{ color: '#2b5f59', fontWeight: 'bold' }}>Avenoch</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Nocturne Avenoch Host": <><span style={{ color: '#334592', fontWeight: 'bold' }}>Nocturne</span> <span style={{ color: '#2b5f59', fontWeight: 'bold' }}>Avenoch</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Vulturine Avenoch Host": <><span style={{ color: '#a96d8c', fontWeight: 'bold' }}>Vulturine</span> <span style={{ color: '#2b5f59', fontWeight: 'bold' }}>Avenoch</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Chloroptid Host": <><span style={{ color: '#315f2b', fontWeight: 'bold' }}>Chloroptid</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Barkskin Chloroptid Host": <><span style={{ color: '#5f2d2b', fontWeight: 'bold' }}>Barkskin</span> <span style={{ color: '#315f2b', fontWeight: 'bold' }}>Chloroptid</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Carnivorous Chloroptid Host": <><span style={{ color: '#2b2d5f', fontWeight: 'bold' }}>Carnivorous</span> <span style={{ color: '#315f2b', fontWeight: 'bold' }}>Chloroptid</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Drifting Chloroptid Host": <><span style={{ color: '#5f8a5f', fontWeight: 'bold' }}>Drifting</span> <span style={{ color: '#315f2b', fontWeight: 'bold' }}>Chloroptid</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Viny Chloroptid Host": <><span style={{ color: '#5f5f2b', fontWeight: 'bold' }}>Viny</span> <span style={{ color: '#315f2b', fontWeight: 'bold' }}>Chloroptid</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Cognizant Host": <><span style={{ color: '#2b3b5f', fontWeight: 'bold' }}>Cognizant</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Android Cognizant Host": <><span style={{ color: '#581fbd', fontWeight: 'bold' }}>Android</span> <span style={{ color: '#2b3b5f', fontWeight: 'bold' }}>Cognizant</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Utility Droid Cognizant Host": <><span style={{ color: '#bd891f', fontWeight: 'bold' }}>Utility Droid</span> <span style={{ color: '#2b3b5f', fontWeight: 'bold' }}>Cognizant</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Emberfolk Host": <><span style={{ color: '#5f2b2b', fontWeight: 'bold' }}>Emberfolk</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Petran Emberfolk Host": <><span style={{ color: '#735311', fontWeight: 'bold' }}>Petran</span> <span style={{ color: '#5f2b2b', fontWeight: 'bold' }}>Emberfolk</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Pyran Emberfolk Host": <><span style={{ color: '#b31111', fontWeight: 'bold' }}>Pyran</span> <span style={{ color: '#5f2b2b', fontWeight: 'bold' }}>Emberfolk</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Entomos Host": <><span style={{ color: '#5f422b', fontWeight: 'bold' }}>Entomos</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Apocritan Entomos Host": <><span style={{ color: '#6d7156', fontWeight: 'bold' }}>Apocritan</span> <span style={{ color: '#5f422b', fontWeight: 'bold' }}>Entomos</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Dynastes Entomos Host": <><span style={{ color: '#334592', fontWeight: 'bold' }}>Dynastes</span> <span style={{ color: '#5f422b', fontWeight: 'bold' }}>Entomos</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Mantid Entomos Host": <><span style={{ color: '#75904e', fontWeight: 'bold' }}>Mantid</span> <span style={{ color: '#5f422b', fontWeight: 'bold' }}>Entomos</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Human Host": <><span style={{ color: '#2b315f', fontWeight: 'bold' }}>Human</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Diminutive Human Host": <><span style={{ color: '#c3735f', fontWeight: 'bold' }}>Diminutive</span> <span style={{ color: '#2b315f', fontWeight: 'bold' }}>Human</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Lithe Human Host": <><span style={{ color: '#2b5f5f', fontWeight: 'bold' }}>Lithe</span> <span style={{ color: '#2b315f', fontWeight: 'bold' }}>Human</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Massive Human Host": <><span style={{ color: '#2b175f', fontWeight: 'bold' }}>Massive</span> <span style={{ color: '#2b315f', fontWeight: 'bold' }}>Human</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Stout Human Host": <><span style={{ color: '#5f2b2b', fontWeight: 'bold' }}>Stout</span> <span style={{ color: '#2b315f', fontWeight: 'bold' }}>Human</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Lumenaren Host": <><span style={{ color: '#515f2b', fontWeight: 'bold' }}>Lumenaren</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Infrared Lumenaren Host": <><span style={{ color: '#b17fbe', fontWeight: 'bold' }}>Infrared</span> <span style={{ color: '#515f2b', fontWeight: 'bold' }}>Lumenaren</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Radiofrequent Lumenaren Host": <><span style={{ color: '#bea97f', fontWeight: 'bold' }}>Radiofrequent</span> <span style={{ color: '#515f2b', fontWeight: 'bold' }}>Lumenaren</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "X-Ray Lumenaren Host": <><span style={{ color: '#7f8abe', fontWeight: 'bold' }}>X-Ray</span> <span style={{ color: '#515f2b', fontWeight: 'bold' }}>Lumenaren</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Praedari Host": <><span style={{ color: '#5f2b5c', fontWeight: 'bold' }}>Praedari</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Canid Praedari Host": <><span style={{ color: '#2f8da6', fontWeight: 'bold' }}>Canid</span> <span style={{ color: '#5f2b5c', fontWeight: 'bold' }}>Praedari</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Felid Praedari Host": <><span style={{ color: '#b16326', fontWeight: 'bold' }}>Felid</span> <span style={{ color: '#5f2b5c', fontWeight: 'bold' }}>Praedari</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Mustelid Praedari Host": <><span style={{ color: '#699239', fontWeight: 'bold' }}>Mustelid</span> <span style={{ color: '#5f2b5c', fontWeight: 'bold' }}>Praedari</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
      "Ursid Praedari Host": <><span style={{ color: '#9026b1', fontWeight: 'bold' }}>Ursid</span> <span style={{ color: '#5f2b5c', fontWeight: 'bold' }}>Praedari</span> <span style={{ color: '#5f5e2b', fontWeight: 'bold' }}>Host</span></>,
    };

    return colorMap[hostValue] || <span style={{ fontWeight: 'bold', color: '#000' }}>Select Host</span>;
  };

  const allBackgroundOptions = [
    { label: "Adherent of the Pollen Collective", value: "Adherent of the Pollen Collective", color: "#666666" },
    { label: "Anti-Deft Secessionist", value: "Anti-Deft Secessionist", color: "#666666" },
    { label: "Awakened Machine", value: "Awakened Machine", color: "#666666", prerequisite: "Cognizant" },
    { label: "Belt Miner", value: "Belt Miner", color: "#666666" },
    { label: "Black Market Executive", value: "Black Market Executive", color: "#666666" },
    { label: "Combat Medic", value: "Combat Medic", color: "#666666" },
    { label: "Covert Operative", value: "Covert Operative", color: "#666666" },
    { label: "DAGR Officer", value: "DAGR Officer", color: "#666666" },
    { label: "Exobiologist", value: "Exobiologist", color: "#666666" },
    { label: "Feathered One", value: "Feathered One", color: "#666666" },
    { label: "Galactapol Netizen", value: "Galactapol Netizen", color: "#666666" },
    { label: "Interstellar Refugee", value: "Interstellar Refugee", color: "#666666" },
    { label: "Intragalactic Nobility", value: "Intragalactic Nobility", color: "#666666" },
    { label: "Kenos Assassin", value: "Kenos Assassin", color: "#666666" },
    { label: "Knight of the Chromatic Blade", value: "Knight of the Chromatic Blade", color: "#666666" },
    { label: "Military Officer", value: "Military Officer", color: "#666666" },
    { label: "Oikomonastic Disciple", value: "Oikomonastic Disciple", color: "#666666" },
    { label: "Physios Universal Contestant", value: "Physios Universal Contestant", color: "#666666" },
    { label: "Scoundrel", value: "Scoundrel", color: "#666666" },
    { label: "Signals Intelligence Collector", value: "Signals Intelligence Collector", color: "#666666" },
    { label: "Silver Swarm Scion", value: "Silver Swarm Scion", color: "#666666" },
    { label: "Student of Lux Academy (Ruby)", value: "Student of Lux Academy (Ruby)", color: "#666666" },
    { label: "Student of Lux Academy (Emerald)", value: "Student of Lux Academy (Emerald)", color: "#666666" },
    { label: "Student of Lux Academy (Sapphire)", value: "Student of Lux Academy (Sapphire)", color: "#666666" },
    { label: "Traveling Performer", value: "Traveling Performer", color: "#666666" },
    { label: "Wandering Yogi", value: "Wandering Yogi", color: "#666666" },
  ];

  // No filtering - show all backgrounds
  const backgroundOptions = allBackgroundOptions;

  // Add this after the other feature JSX constants
  const anatomistFeatureJSX = generateAnatomicalPrecisionJSX(
    sheet?.subclassProgressionDots?.anatomistFeatureDots,
    sheet?.subclassProgressionDots?.anatomistPrecisionHxDots
  );

  // Add after anatomistFeatureJSX
  const grenadierFeatureJSX = generateBlasterMasterJSX({
    grenadierFeatureIncludesAlliesDots: sheet?.subclassProgressionDots?.grenadierFeatureIncludesAlliesDots,
    grenadierFeatureAoEDots: sheet?.subclassProgressionDots?.grenadierFeatureAoEDots,
    grenadierFeatureImmunityDots: sheet?.subclassProgressionDots?.grenadierFeatureImmunityDots
  });

  // Add after grenadierFeatureJSX
  const necroFeatureJSX = generateBodySnatcherJSX(
    sheet?.subclassProgressionDots?.necroFeatureDots,
    sheet?.subclassProgressionDots?.necroIgnoreDamageDots
  );

  // Add after necroFeatureJSX
  const coerciveFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateFieldOfCoercionJSX(sheet)}
    </span>
  );

  // Add after coerciveFeatureJSX
  const divinistFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateAuraOfLuckJSX({
        divinistFeatureDots: sheet?.subclassProgressionDots?.divinistFeatureDots || [false, false, false],
        divinistFeatureCritDots: sheet?.subclassProgressionDots?.divinistFeatureCritDots || [false, false, false],
        divinistFeatureRangeDots: sheet?.subclassProgressionDots?.divinistFeatureRangeDots || [false, false, false],
      })}
    </span>
  );

  // Add after divinistFeatureJSX
  const naturalistFeatureJSX = generateBoughbenderJSX(sheet);

  // Add after naturalistFeatureJSX
  const technologistFeatureJSX = generateTechManipulationJSX(sheet);

  // Add after technologistFeatureJSX
  // beguilerFeatureJSX is now handled dynamically in the subclass check

  // Add after beguilerFeatureJSX
  const galvanicFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateInspiringPresenceJSX(
        sheet?.subclassProgressionDots?.galvanicFeatureHxDots,
        sheet?.subclassProgressionDots?.galvanicFeatureHpDots
      )}
    </span>
  );

  // Add after galvanicFeatureJSX
  const tacticianFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateTacticalOffensiveJSX(
        sheet?.subclassProgressionDots?.tacticianFeatureRangeHxDots,
        sheet?.subclassProgressionDots?.tacticianFeatureCritDots,
        sheet?.subclassProgressionDots?.tacticianFeatureSpeedDots
      )}
    </span>
  );

  // Add after tacticianFeatureJSX
  const tyrantFeatureJSX = generateFearlessJSX(
    sheet?.subclassProgressionDots?.tyrantFeatureHxDots,
    sheet?.subclassProgressionDots?.tyrantFeatureConfuseImmunityDots,
    sheet?.subclassProgressionDots?.tyrantFeatureMesmerizeImmunityDots
  );

  // Add after tyrantFeatureJSX
  const inertialFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateTelekineticShieldJSX(sheet)}
    </span>
  );

  // Add after inertialFeatureJSX
  const kineticFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateFinalFistsJSX(sheet)}
    </span>
  );

  // Add after kineticFeatureJSX
  const mercurialFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#941c6c' }}>Bladeshield.</i></b> You gain 50% Cover against all <b><i style={{ color: '#351c75' }}>Strikes</i></b>.
    </span>
  );

  // Add after mercurialFeatureJSX
  const vectorialFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateUnreasonableAccuracyJSX(sheet)}
    </span>
  );

  // Add after vectorialFeatureJSX
  const astralFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateMartyrJSX(sheet)}
    </span>
  );

  // Add after astralFeatureJSX
  const chaosFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateAggressionJSX(sheet)}
    </span>
  );
  // Add after chaosFeatureJSX
  const orderFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateArmoredGuardJSX(sheet)}
    </span>
  );

  // Add after orderFeatureJSX
  const voidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateFatigueJSX(sheet)}
    </span>
  );

  // Add after voidFeatureJSX
  const airFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateAirArmorJSX(sheet)}
    </span>
  );

  // Add after airFeatureJSX
  const earthFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateEarthArmorJSX(sheet)}
    </span>
  );

  // Add after earthFeatureJSX
  const fireFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateFireArmorJSX(sheet)}
    </span>
  );

  const waterFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateWaterArmorJSX(sheet)}
    </span>
  );

  const aeronautFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateSteelWingsJSX(sheet)}
    </span>
  );

  const brawlerFeatureJSX = generateFightinDirtyJSX(sheet);

  const dreadnaughtFeatureJSX = generateToweringDefenseJSX(sheet);

  const spectreFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateHoloFieldJSX(sheet)}
    </span>
  );

  const ammoCoderFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateBulletCodeJSX(sheet)}
    </span>
  );

  const ordnancerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateExcessiveDisplayJSX(sheet)}
    </span>
  );

  const pistoleerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateHarryCharacterSheetJSX(sheet)}
    </span>
  );

  const sniperFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateTargeteerCharacterSheetJSX(sheet)}
    </span>
  );

  const hackerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5c57b8' }}>Mobile Gate.</i></b> Your allies can use you and your <i>Drone</i> as a pair of <i style={{ color: '#38761d' }}>Teleportation Gates</i>.
    </span>
  );

  const junkerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateSalvageJSX(sheet)}
    </span>
  );

  const nanoboticistFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateProtectiveSwarmJSX(sheet)}
    </span>
  );

  const tankerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
    {generateIroncladJSX(sheet)}
    </span>
  );

  const avenochFeatureJSX = generateFirstInFlightJSX({
    move: 2 + ((sheet?.speciesCardDots?.[0] || []).filter(Boolean).length * 2),
    moveWhenHit: (sheet?.speciesCardDots?.[1] || []).filter(Boolean).length
  });

  // Helper function to get the host feature JSX based on selected host
  const getHostFeatureJSX = (hostValue: string): React.JSX.Element | null => {
    if (!hostValue) return null;

    const featureMap: { [key: string]: React.JSX.Element } = {
      "Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b5f59' }}>First in Flight.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, you can <b><i style={{ color: '#38761d' }}>Move</i></b> 2hx whenever you Crit on an <b><i style={{ color: '#990000' }}>Attack</i></b>.</span>,
      "Corvid Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#75904e' }}>Crow's Cunning.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, you are <i>Immune</i> to the <b><i>Confuse</i></b> and <b><i>Mesmerize</i></b> conditions.</span>,
      "Falcador Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#6d7156' }}>Rending Talons.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, when you roll for <b><i>Spike</i></b> Damage on <b><i style={{ color: '#351c75' }}>Strikes</i></b>, the <b><i>Spike</i></b> effect triggers on a roll of 5+.</span>,
      "Nocturne Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#334592' }}>Eyes of the Night.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, you are <i>Immune</i> to the <b><i>Blind</i></b> condition and don't have a <i>Rear Arc</i>. Additionally, whenever you Crit on an <b><i style={{ color: '#990000' }}>Attack</i></b>, you inflict the <b><i>Mesmerize</i></b> condition.</span>,
      "Vulturine Avenoch Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#a96d8c' }}>Carrion Gorge.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, when you destroy an enemy using a <b><i style={{ color: '#351c75' }}>Strike</i></b>, you immediately gain 2d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.</span>,
      "Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#315f2b' }}>Rapid Regeneration.</i></b> You gain 1d4 <b><i style={{ color: '#990000' }}>Hit Points</i></b> at the start of your turn. Additionally, your size is 1hx, 2hx, or 3hx, depending on the size of your host.</span>,
      "Barkskin Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f2d2b' }}>Deep Roots.</i></b> You are <i>Immune</i> to the <b><i>Slam</i></b> and <b><i>Bounce</i></b> conditions.</span>,
      "Carnivorous Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b2d5f' }}>Sap Sucker.</i></b> Whenever you heal as a result of the <b><i>Drain</i></b> condition, you heal all of the amount of Damage done instead of half.</span>,
      "Drifting Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f8a5f' }}>Leaf on the Wind.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, you can <b><i style={{ color: '#38761d' }}>Move</i></b> 1hx after you take any Damage.</span>,
      "Viny Chloroptid Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f5f2b' }}>Climbing Creeper.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b> and <i>Resist</i> <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>.</span>,
      "Cognizant Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b3b5f' }}>Gears & Cogs.</i></b> You <i>Resist</i> <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Drain</i></b> condition and can naturally survive in the vacuum of space.</span>,
      "Android Cognizant Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#581fbd' }}>Encrypted Cerebral Cortex.</i></b> You are <i>Immune</i> to the <b><i>Confuse</i></b> condition.</span>,
      "Utility Droid Cognizant Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#bd891f' }}>Variant Utility.</i></b> Your size is 1hx, 2hx, or 3hx, depending on the size of your host, and you gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b>.</span>,
      "Emberfolk Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f2b2b' }}>Born of Fire.</i></b> You <i>Resist</i> <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Spike</i></b> condition.</span>,
      "Petran Emberfolk Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#735311' }}>Mountain's Endurance.</i></b> You <i>Resist</i> <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Demoralize</i></b> condition.</span>,
      "Pyran Emberfolk Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#b31111' }}>Ignition.</i></b> You can choose to have your <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> and/or <b><i style={{ color: '#351c75' }}>Strikes</i></b> deal <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> at-will.</span>,
      "Entomos Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f422b' }}>Insectoid Resistance.</i></b>  You are <i>Immune</i> to the <b><i>Confuse</i></b> condition and fall Damage.</span>,
      "Apocritan Entomos Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#6d7156' }}>Swarm Tactics.</i></b> When you are 1hx away from an enemy, allies who <b><i style={{ color: '#351c75' }}>Strike</i></b> that enemy can choose to inflict the <b><i>Spike</i></b>, <b><i>Confuse</i></b> or <b><i>Restrain</i></b> condition on it. The <b><i>Spike</i></b> Damage type is the same as the ally's <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage type.</span>,
      "Dynastes Entomos Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#334592' }}>Herculean.</i></b> Your size is 3hx. You are also <i>Immune</i> to the <b><i>Slam</i></b> and <b><i>Bounce</i></b> conditions. Additionally, when you inflict the <b><i>Slam</i></b> or <b><i>Bounce</i></b> condition, increase the forced <b><i style={{ color: '#38761d' }}>Movement</i></b> by 2hx.</span>,
      "Mantid Entomos Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#75904e' }}>Raptorial Claws.</i></b> You can <b><i style={{ color: '#351c75' }}>Strike</i></b> enemies in an adjacent hx during your <b><i style={{ color: '#38761d' }}>Move</i></b> instead of having to <b><i style={{ color: '#38761d' }}>Move</i></b> through them.</span>,
      "Human Host": (
        <span style={{ color: '#000', fontWeight: 400 }}>
          {generateAdaptablePhysiqueJSX(2)}
          <br />
          <span><i>Resistances</i>: </span>
          {sheet?.humanHostDamageTypes && sheet.humanHostDamageTypes.length > 0 ? (
            sheet.humanHostDamageTypes.map((type, index) => {
              const damageTypeColors: { [key: string]: string } = {
                'Chemical': '#de7204',
                'Cold': '#3ebbff',
                'Electric': '#d5d52a',
                'Fire': '#e20e0e',
                'Force': '#516fff',
                'Neural': '#a929ff',
                'Toxic': '#02b900'
              };
              const damageTypeIcons: { [key: string]: string } = {
                'Chemical': '/Chemical.png',
                'Cold': '/Cold.png',
                'Electric': '/Electric.png',
                'Fire': '/Fire.png',
                'Force': '/Force.png',
                'Neural': '/Neural.png',
                'Toxic': '/Toxic.png'
              };
              return (
                <span key={index}>
                  {index > 0 && ', '}
                  <b><u style={{ color: damageTypeColors[type], display: 'inline-flex', alignItems: 'center' }}>
                    {type}<img src={damageTypeIcons[type]} alt={type} style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
                  </u></b>
                </span>
              );
            })
          ) : (
            <span style={{ fontStyle: 'italic' }}>None selected</span>
          )}
        </span>
      ),
      "Diminutive Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#c3735f' }}>Out of Sight.</i></b> When you are <b><i><span style={{ color: '#990000' }}>Attacked</span></i></b> and have any Cover, you roll one additional Cover die and discard the lowest roll.</span>,
      "Lithe Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b5f5f' }}>Fleet of Foot.</i></b> You ignore <i>Rough Terrain</i> and <i>Dangerous Terrain</i> and you gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b>.</span>,
      "Massive Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2b175f' }}>I'LL SEE YOU IN HELL!</i></b> Whenever you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you can immediately make a <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b>. Additionally, your size is 3hx.</span>,
      "Stout Human Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f2b2b' }}>Die Hard.</i></b> The first time you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you immediately gain 1 <b><i style={{ color: '#990000' }}>Hit Point</i></b> and are not dying.</span>,
      "Lumenaren Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#515f2b' }}>Immutable Energy Reserves.</i></b> You are <i>Immune</i> to the <b><i>Sleep</i></b> condition, <i>Resist</i> <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and can naturally survive in the vacuum of space.</span>,
      "Infrared Lumenaren Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#b17fbe' }}>Infrared Tracking.</i></b> All <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> you make automatically have the Arcing keyword.</span>,
      "Radiofrequent Lumenaren Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#bea97f' }}>Misleading Signals.</i></b> Enemies <b><i><span style={{ color: '#990000' }}>Attacking</span></i></b> you roll an additional Crit die and discard the highest rolled.</span>,
      "X-Ray Lumenaren Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#7f8abe' }}>Irradiate.</i></b> Enemies starting their turn within 3hx of you suffer two instances of the <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> condition.</span>,
      "Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#5f2b5c' }}>Predator.</i></b> Whenever you <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> a creature who is not at full <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you gain +2 Crit and +1d6 Damage. The Damage type is the same as the <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage type.</span>,
      "Canid Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#2f8da6' }}>Inspired Hunter.</i></b> When you reduce a creature to 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you immediately gain 1 <i>Action</i>. You can only benefit from this once per turn.</span>,
      "Felid Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#b16326' }}>Cat's Grace.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b> and cannot take damage from falling as long as you are conscious. Additionally, you can use the <i>Acrobatics</i> skill once per turn without using an <i>Action</i>.</span>,
      "Mustelid Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#699239' }}>Weasel.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Burrow Speed</i></b> and are <i>Immune</i> to the <b><i>Restrain</i></b> condition. Additionally you can use the <i>Thievery</i> skill once per turn without using an <i>Action</i>.</span>,
      "Ursid Praedari Host": <span style={{ color: '#000', fontWeight: 400 }}><b><i style={{ color: '#9026b1' }}>Natural Insulation.</i></b> You <i>Resist</i> <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Restrain</i></b> condition. Your size is 3hx.</span>,
    };

    return featureMap[hostValue] || null;
  };

  // Generate Cerebronych feature with dynamic values
  const cerebronychFeatureJSX = generateParasiticComposureJSX(sheet?.speciesCardDots);

  const chloroptidFeatureJSX = generateRapidRegenerationJSX({ 
    hitPointsDice: 1 + (sheet?.speciesCardDots?.[0]?.[0] ? 1 : 0) 
  });

  const cognizantFeatureJSX = generateGearsAndCogsJSX(
    sheet?.speciesCardDots?.[0]?.[0] ?? false,
    sheet?.speciesCardDots?.[1]?.[0] ?? false
  );

  const emberfolkFeatureJSX = generateBornOfFireJSX(
    sheet?.speciesCardDots?.[0]?.[0] ?? false,
    sheet?.speciesCardDots?.[1]?.[0] ?? false
  );

  const entomosFeatureJSX = generateInsectoidResistanceJSX(
    sheet?.speciesCardDots?.[0]?.[0] ?? false,
    sheet?.speciesCardDots?.[1]?.[0] ?? false
  );

  const humanFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateAdaptablePhysiqueJSX(2 + (sheet?.speciesCardDots?.[0]?.filter(Boolean).length || 0))}
      <br />
      <span><i>Resistances</i>: </span>
      {sheet?.humanDamageTypes && sheet.humanDamageTypes.length > 0 ? (
        sheet.humanDamageTypes.map((type, index) => {
          const damageTypeColors: { [key: string]: string } = {
            'Chemical': '#de7204',
            'Cold': '#3ebbff',
            'Electric': '#d5d52a',
            'Fire': '#e20e0e',
            'Force': '#516fff',
            'Neural': '#a929ff',
            'Toxic': '#02b900'
          };
          const damageTypeIcons: { [key: string]: string } = {
            'Chemical': '/Chemical.png',
            'Cold': '/Cold.png',
            'Electric': '/Electric.png',
            'Fire': '/Fire.png',
            'Force': '/Force.png',
            'Neural': '/Neural.png',
            'Toxic': '/Toxic.png'
          };
          return (
            <span key={index}>
              {index > 0 && ', '}
              <b><u style={{ color: damageTypeColors[type], display: 'inline-flex', alignItems: 'center' }}>
                {type}<img src={damageTypeIcons[type]} alt={type} style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
              </u></b>
            </span>
          );
        })
      ) : (
        <span style={{ fontStyle: 'italic' }}>None selected</span>
      )}
    </span>
  );

  const lumenarenFeatureJSX = generateImmutableEnergyReservesFeatureJSX(
    sheet?.speciesCardDots?.[0]?.[0] || false,
    sheet?.speciesCardDots?.[1]?.[0] || false
  );

  const praedariFeatureJSX = generatePredatorJSX(
    2 + ((sheet?.speciesCardDots?.[0]?.filter(Boolean).length || 0) * 2),
    1 + (sheet?.speciesCardDots?.[1]?.filter(Boolean).length || 0)
  );

  const corvidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateCrowsCunningJSX({ 
        hasDemoralizeImmunity: sheet?.subspeciesCardDots?.[0]?.[0] || false 
      })}
    </span>
  );

  const falcadorFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateRendingTalonsJSX({
        includesAttacks: sheet?.subspeciesCardDots?.[0]?.[0] ?? false,
        spike4Plus: sheet?.subspeciesCardDots?.[1]?.[0] ?? false
      })}
    </span>
  );

  const nocturneFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateEyesOfTheNightJSX({
        critBonus: sheet?.subspeciesCardDots?.[0]?.filter(Boolean).length ?? 0,
        rangeBonus: sheet?.subspeciesCardDots?.[1]?.filter(Boolean).length ?? 0
      })}
    </span>
  );

  const vulturineFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateCarrionGorgeJSX({
        healingBonus: sheet?.subspeciesCardDots?.[0]?.filter(Boolean).length ?? 0
      })}
    </span>
  );

  const hostMimicFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
              <i style={{ fontWeight: 'bold', color: '#5f5e2b' }}>Host Mimic.</i> You inhabit a host body from a different <i>Species</i> or <i>Subspecies</i>. Choose a Host <i>Species</i> or <i>Subspecies</i>, which provides a modified <b><i style={{ color: '#0b5394' }}>Feature</i></b> that cannot be upgraded. Throughout your <i style={{ color: '#5f5e2b' }}>Cerebronych's</i> life, you may change host bodies depending on your desires and opportunities.
    </span>
  );

  const barkskinFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateDeepRootsJSX({ mesmerizeImmunity: sheet?.subspeciesCardDots?.[0]?.[0] })}
    </span>
  );

  const carnivorousFeatureJSX = generateSapSuckerJSX();

  const driftingFeatureJSX = generateLeafOnTheWindJSX(1 + (sheet?.subspeciesCardDots?.[0]?.filter(Boolean).length || 0));

  const vinyFeatureJSX = generateClimbingCreeperJSX(
    sheet?.subspeciesCardDots?.[0]?.[0] ?? false,
    sheet?.subspeciesCardDots?.[1]?.[0] ?? false
  );

  const androidFeatureJSX = generateEncryptedCerebralCortexJSX(
    sheet?.subspeciesCardDots?.[0]?.[0] ?? false,
    sheet?.subspeciesCardDots?.[1]?.[0] ?? false,
    sheet?.subspeciesCardDots?.[2]?.[0] ?? false
  );

  const utilityDroidFeatureJSX = generateVariantUtilityJSX(
    sheet?.subspeciesCardDots?.[0]?.[0] ?? false,
    sheet?.subspeciesCardDots?.[1]?.[0] ?? false,
    sheet?.subspeciesCardDots?.[2]?.[0] ?? false
  );

  const petranFeatureJSX = generateMountainsEnduranceJSX(
    sheet?.subspeciesCardDots?.[0]?.[0] ?? false,
    sheet?.subspeciesCardDots?.[1]?.[0] ?? false,
    sheet?.subspeciesCardDots?.[2]?.[0] ?? false,
    sheet?.subspeciesCardDots?.[3]?.[0] ?? false
  );

  const pyranFeatureJSX = generateIgnitionJSX(
    sheet?.subspeciesCardDots?.[0]?.filter(Boolean).length ?? 0
  );

  const apocritanFeatureJSX = generateSwarmTacticsJSX(
    1 + (sheet?.subspeciesCardDots?.[0]?.filter(Boolean).length || 0)
  );

  const dynastesFeatureJSX = generateHerculeanJSX(
    (sheet?.subspeciesCardDots?.[0]?.filter(Boolean).length || 0) * 2
  );

  const mantidFeatureJSX = generateRaptorialClawsJSX(
    sheet?.subspeciesCardDots?.[0]?.[0] ? 1 : 0
  );

  const diminutiveEvolutionFeatureJSX = (() => {
    const subspeciesDots = sheet?.subspeciesCardDots || [];
    const featureDots = subspeciesDots[0] || [];
    const coverDice = 1 + (featureDots[0] ? 1 : 0);
    return (
      <span style={{ color: '#000', fontWeight: 400 }}>
        {generateOutOfSightJSX(coverDice)}
      </span>
    );
  })();

  const litheEvolutionFeatureJSX = generateFleetOfFootFeatureJSX(
    sheet?.subspeciesCardDots?.[0]?.[0] ?? false
  );

  const massiveEvolutionFeatureJSX = generateILLSEEYOUINHELLFeatureJSX(
    sheet?.subspeciesCardDots?.[1]?.[0] ? 'triple' : sheet?.subspeciesCardDots?.[0]?.[0] ? 'double' : '-',
    sheet?.subspeciesCardDots?.[2]?.filter(Boolean).length ?? 0
  );

  const stoutEvolutionFeatureJSX = generateDieHardFeatureJSX(
    sheet?.subspeciesCardDots?.[2]?.[0] ? 'Immune' : sheet?.subspeciesCardDots?.[1]?.[0] ? 'Resistant' : '-',
    sheet?.subspeciesCardDots?.[0]?.[0] || false
  );

  const infraredFeatureJSX = generateInfraredTrackingFeatureJSX();

  const radiofrequentFeatureJSX = generateMisleadingSignalsFeatureJSX(sheet?.subspeciesCardDots?.[0]?.[0] ?? false);

  // X-Ray: range = 3 + upgrades from dots[0], spikeCount = 2 + upgrades from dots[1]
  const xRayRange = 3 + (sheet?.subspeciesCardDots?.[0]?.filter(Boolean).length ?? 0);
  const xRaySpikeCount = 2 + (sheet?.subspeciesCardDots?.[1]?.filter(Boolean).length ?? 0);
  const xRayFeatureJSX = generateIrradiateFeatureJSX(xRayRange, xRaySpikeCount);

  // Calculate Canid subspecies bonuses for Inspired Hunter feature
  const canidFeatureSpeedBonus = sheet?.subspeciesCardDots?.[0]?.filter(Boolean).length ?? 0;
  const canidFeatureCritBonus = (sheet?.subspeciesCardDots?.[1]?.filter(Boolean).length ?? 0) * 2;
  const canidFeatureJSX = generateInspiredHunterFeatureJSX(canidFeatureSpeedBonus, canidFeatureCritBonus);

  const felidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#b16326' }}>Cat’s Grace.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b> and cannot take damage from falling as long as you are conscious. Additionally, you can use the <i>Acrobatics</i> skill once per turn without using an <i>Action</i>.
    </span>
  );
  
  const mustelidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      {generateWeaselFeatureJSX()}
    </span>
  );
  
  const ursidFeatureJSX = generateNaturalInsulationJSX(sheet);

  // Helper functions for Attack Weapons/Spells dropdown
  const getAvailablePrimaryAttacks = () => {
    const attacks: { name: string; type: string; cost: number }[] = [];
    
    // Add Dart Guns for Chemist class
    if (charClass === 'Chemist') {
      attacks.push(
        { name: 'Chem Gun', type: 'Dart Gun', cost: 150 },
        { name: 'Happy Pill Pusher', type: 'Dart Gun', cost: 160 },
        { name: 'Sour Juicer', type: 'Dart Gun', cost: 160 },
        { name: 'Prickly Goo', type: 'Dart Gun', cost: 175 }
      );
    }
    
    // Add Lenses for Coder class
    if (charClass === 'Coder') {
      attacks.push(
        { name: 'Hodge Podge', type: 'Lens', cost: 150 },
        { name: 'Time Stutter', type: 'Lens', cost: 150 }
      );
    }
    
    // Add Rifles for Commander class
    if (charClass === 'Commander') {
      attacks.push(
        { name: 'Plasma Rifle', type: 'Rifle', cost: 150 },
        { name: 'Sapper Gun', type: 'Rifle', cost: 150 }
      );
    }
    
    // Add Focuses for Contemplative class
    if (charClass === 'Contemplative') {
      attacks.push(
        { name: 'Ensnaring Hand Wraps', type: 'Focus', cost: 165 },
        { name: 'Mala of Mind Darts', type: 'Focus', cost: 155 },
        { name: 'Singing Bowl', type: 'Focus', cost: 165 },
        { name: 'Telekinetic Knuckles', type: 'Focus', cost: 150 },
        { name: 'Viperfang Ring', type: 'Focus', cost: 155 }
      );
    }
    
    // Add Incantations for Devout class (subclass-specific)
    if (charClass === 'Devout') {
      if (subclass === 'Astral') {
        attacks.push(
          { name: 'Cleanse', type: 'Incantation', cost: 160 },
          { name: 'Enlighten', type: 'Incantation', cost: 160 }
        );
      } else if (subclass === 'Order') {
        attacks.push(
          { name: 'Comply', type: 'Incantation', cost: 155 },
          { name: 'Detain', type: 'Incantation', cost: 155 }
        );
      } else if (subclass === 'Chaos') {
        attacks.push(
          { name: 'Rampage', type: 'Incantation', cost: 155 },
          { name: 'Terrify', type: 'Incantation', cost: 155 }
        );
      } else if (subclass === 'Void') {
        attacks.push(
          { name: 'Erase', type: 'Incantation', cost: 155 },
          { name: 'Exhaust', type: 'Incantation', cost: 160 }
        );
      }
    }
    
    // Add Shards for Elementalist class (subclass-specific, alphabetically ordered)
    if (charClass === 'Elementalist') {
      if (subclass === 'Air') {
        attacks.push(
          { name: 'Bluster', type: 'Shard', cost: 175 },
          { name: 'Bolt', type: 'Shard', cost: 190 }
        );
      } else if (subclass === 'Earth') {
        attacks.push(
          { name: 'Meteor', type: 'Shard', cost: 175 },
          { name: 'Tremor', type: 'Shard', cost: 175 }
        );
      } else if (subclass === 'Fire') {
        attacks.push(
          { name: 'Fireball', type: 'Shard', cost: 215 },
          { name: 'Lava Well', type: 'Shard', cost: 175 }
        );
      } else if (subclass === 'Water') {
        attacks.push(
          { name: 'Frostbite', type: 'Shard', cost: 185 },
          { name: 'Vortex', type: 'Shard', cost: 175 }
        );
      }
    }
    
    // Add Integrated Blasters for Exospecialist class
    if (charClass === 'Exospecialist') {
      attacks.push(
        { name: 'Boomstick', type: 'Integrated Blaster', cost: 170 },
        { name: 'Firestarter', type: 'Integrated Blaster', cost: 160 },
        { name: 'Sleepytime', type: 'Integrated Blaster', cost: 170 }
      );
    }
    
    // Add Coder Carbines for Gunslinger class (Ammo Coder subclass)
    if (charClass === 'Gunslinger' && subclass === 'Ammo Coder') {
      attacks.push(
        { name: 'Arcane Railgun', type: 'Coder Carbine', cost: 175 },
        { name: 'Space Vaporizer', type: 'Coder Carbine', cost: 165 }
      );
    }
    
    // Add Rocket Launchers for Gunslinger class (Ordnancer subclass)
    if (charClass === 'Gunslinger' && subclass === 'Ordnancer') {
      attacks.push(
        { name: 'Demolitmus', type: 'Rocket Launcher', cost: 160 },
        { name: 'Steelburst', type: 'Rocket Launcher', cost: 155 }
      );
    }
    
    // Add Dual Pistols for Gunslinger class (Pistoleer subclass)
    if (charClass === 'Gunslinger' && subclass === 'Pistoleer') {
      attacks.push(
        { name: 'Rise & Shine', type: 'Dual Pistol', cost: 155 },
        { name: 'Thoughts & Prayers', type: 'Dual Pistol', cost: 155 },
        { name: 'Twin Drivers', type: 'Dual Pistol', cost: 155 }
      );
    }
    
    // Add Sniper Rifles for Gunslinger class (Sniper subclass)
    if (charClass === 'Gunslinger' && subclass === 'Sniper') {
      attacks.push(
        { name: 'Ghost Rifle', type: 'Sniper Rifle', cost: 165 },
        { name: 'Starseeker', type: 'Sniper Rifle', cost: 160 }
      );
    }
    
    // Add Stealth Drones for Technician class (Hacker subclass)
    if (charClass === 'Technician' && subclass === 'Hacker') {
      attacks.push(
        { name: 'Blind Silence', type: 'Stealth Drone', cost: 165 },
        { name: 'Will-o\'-the-Wisp', type: 'Stealth Drone', cost: 160 }
      );
    }
    
    return attacks;
  };

  const getAvailableSecondaryAttacks = () => {
    const attacks: { name: string; type: string; cost: number }[] = [];
    
    // Add Algorithms for Coder class
    if (charClass === 'Coder') {
      attacks.push(
        { name: 'Digital Wave', type: 'Algorithm', cost: 205 },
        { name: 'Soul Tracer', type: 'Algorithm', cost: 240 }
      );
    }
    
    // Add Relics for Devout class
    if (charClass === 'Devout') {
      if (subclass === 'Astral') {
        attacks.push(
          { name: "Aktinovo's Lantern", type: 'Relic', cost: 275 },
          { name: "Agathe's Halo", type: 'Relic', cost: 275 }
        );
      } else if (subclass === 'Chaos') {
        attacks.push(
          { name: "Entropos' Maw", type: 'Relic', cost: 265 },
          { name: "Kako's Bloodshot Eye", type: 'Relic', cost: 265 },
          { name: "Storvald's Rimehold Hand", type: 'Relic', cost: 255 }
        );
      } else if (subclass === 'Order') {
        attacks.push(
          { name: 'Scepter of Ethos', type: 'Relic', cost: 275 },
          { name: "Fylakas' Censor", type: 'Relic', cost: 290 }
        );
      } else if (subclass === 'Void') {
        attacks.push(
          { name: "Kenos' Scythe", type: 'Relic', cost: 255 },
          { name: 'Orb of Mitra', type: 'Relic', cost: 275 }
        );
      }
    }
    
    // Add Elementals for Elementalist class
    if (charClass === 'Elementalist') {
      if (subclass === 'Air') {
        attacks.push(
          { name: 'Cloud Elemental', type: 'Elemental', cost: 300 },
          { name: 'Thunderbird', type: 'Elemental', cost: 325 }
        );
      }
      if (subclass === 'Air' || subclass === 'Earth') {
        attacks.push(
          { name: 'Sandstorm', type: 'Elemental', cost: 300 }
        );
      }
      if (subclass === 'Earth') {
        attacks.push(
          { name: 'Stone Golem', type: 'Elemental', cost: 300 }
        );
      }
      if (subclass === 'Earth' || subclass === 'Fire') {
        attacks.push(
          { name: 'Magmoid', type: 'Elemental', cost: 300 }
        );
      }
      if (subclass === 'Earth' || subclass === 'Water') {
        attacks.push(
          { name: 'Sludge Brute', type: 'Elemental', cost: 300 }
        );
      }
      if (subclass === 'Fire') {
        attacks.push(
          { name: 'Fire Dragon', type: 'Elemental', cost: 310 },
          { name: 'Firefox', type: 'Elemental', cost: 300 },
          { name: 'Phoenix', type: 'Elemental', cost: 325 },
          { name: 'Salamander', type: 'Elemental', cost: 300 }
        );
      }
      if (subclass === 'Water') {
        attacks.push(
          { name: 'Ice Golem', type: 'Elemental', cost: 300 },
          { name: 'Water Horse', type: 'Elemental', cost: 295 },
          { name: 'Water Panda', type: 'Elemental', cost: 295 },
          { name: 'Wave Elemental', type: 'Elemental', cost: 300 }
        );
      }
    }
    
    // Add Super Serums for Anatomist subclass
    if (subclass === 'Anatomist') {
      attacks.push(
        { name: 'Jacob\'s Ladder', type: 'Super Serum', cost: 215 },
        { name: 'Vampirismagoria', type: 'Super Serum', cost: 185 }
      );
    }
    
    // Add Grenades for Grenadier subclass
    if (subclass === 'Grenadier') {
      attacks.push(
        { name: 'Amethyst Blast', type: 'Grenade', cost: 220 },
        { name: 'Void Grenade', type: 'Grenade', cost: 200 }
      );
    }
    
    // Add Chem Zombies for Necro subclass
    if (subclass === 'Necro') {
      attacks.push(
        { name: 'Synthetic Corpse', type: 'Chem Zombie', cost: 200 }
      );
    }
    
    // Add Noxious Fumes for Poisoner subclass
    if (subclass === 'Poisoner') {
      attacks.push(
        { name: 'Brainstorm', type: 'Noxious Fume', cost: 200 },
        { name: 'Color Spray', type: 'Noxious Fume', cost: 220 }
      );
    }
    
    // Add Whips for Beguiler subclass
    if (subclass === 'Beguiler') {
      attacks.push(
        { name: 'Heartstrings', type: 'Whip', cost: 190 },
        { name: 'The Crackler', type: 'Whip', cost: 200 }
      );
    }
    
    // Add Sabres for Galvanic subclass
    if (subclass === 'Galvanic') {
      attacks.push(
        { name: 'Phase Sword', type: 'Sabre', cost: 185 },
        { name: 'Truthsinger', type: 'Sabre', cost: 185 }
      );
    }
    
    // Add Flares for Tactician subclass
    if (subclass === 'Tactician') {
      attacks.push(
        { name: 'Fire Flare', type: 'Flare', cost: 185 },
        { name: 'Flash Freeze', type: 'Flare', cost: 185 }
      );
    }
    
    // Add Blasters for Tyrant subclass
    if (subclass === 'Tyrant') {
      attacks.push(
        { name: 'Blizzard Blast', type: 'Blaster', cost: 215 },
        { name: 'Shock Gun', type: 'Blaster', cost: 195 }
      );
    }
    
    // Add Disciplines for Contemplative subclasses
    if (subclass === 'Kinetic') {
      attacks.push(
        { name: 'Empty Mudra', type: 'Discipline', cost: 210 },
        { name: 'Mudra of Brilliance', type: 'Discipline', cost: 210 }
      );
    }
    
    if (subclass === 'Mercurial') {
      attacks.push(
        { name: 'Way of Quicksilver', type: 'Discipline', cost: 240 },
        { name: 'Way of Sublimation', type: 'Discipline', cost: 235 }
      );
    }
    
    if (subclass === 'Inertial') {
      attacks.push(
        { name: 'Asana of Heaviness', type: 'Discipline', cost: 210 },
        { name: 'Passive Asana', type: 'Discipline', cost: 210 }
      );
    }
    
    if (subclass === 'Vectorial') {
      attacks.push(
        { name: 'Bane Prana', type: 'Discipline', cost: 240 },
        { name: 'Night Prana', type: 'Discipline', cost: 240 }
      );
    }
    
    // Add Smart Missiles for Exospecialist class
    if (charClass === 'Exospecialist') {
      attacks.push(
        { name: 'Neutron Torpedo', type: 'Smart Missile', cost: 215 },
        { name: 'Pulsar Cannon', type: 'Smart Missile', cost: 225 },
        { name: 'Razor Rain', type: 'Smart Missile', cost: 250 }
      );
    }

    // Add Tech Pulses for Technician class
    if (charClass === 'Technician') {
      if (subclass === 'Hacker') {
        attacks.push({ name: 'Cloaker Bubble', type: 'Tech Pulse', cost: 290 });
      } else if (subclass === 'Junker') {
        attacks.push({ name: 'Shrap Happy', type: 'Tech Pulse', cost: 210 });
      } else if (subclass === 'Nanoboticist') {
        attacks.push({ name: 'Swarm Surge', type: 'Tech Pulse', cost: 255 });
      } else if (subclass === 'Tanker') {
        attacks.push({ name: 'Rubblemaker', type: 'Tech Pulse', cost: 285 });
      }
    }
    
    return attacks;
  };

  const handleAttackPurchase = (attackName: string, cost: number, type: string) => {
    if (credits < cost) {
      setNotice("Not enough credits!");
      return;
    }
    
    if (sheet) {
      let partialUpdate: Partial<CharacterSheet>;
      if (type === 'Dart Gun') {
        const newDartGuns = [...(sheet.dartGuns || []), attackName];
        partialUpdate = { 
          dartGuns: newDartGuns,
          credits: credits - cost
        };
      } else if (type === 'Lens') {
        const newLenses = [...(sheet.lenses || []), attackName];
        partialUpdate = { 
          lenses: newLenses,
          credits: credits - cost
        };
      } else if (type === 'Super Serum') {
        const newSuperSerums = [...(sheet.superSerums || []), attackName];
        partialUpdate = { 
          superSerums: newSuperSerums,
          credits: credits - cost
        };
      } else if (type === 'Rifle') {
        const newRifles = [...(sheet.rifles || []), attackName];
        partialUpdate = { 
          rifles: newRifles,
          credits: credits - cost
        };        
      } else if (type === 'Focus') {
        const newFocuses = [...(sheet.focuses || []), attackName];
        partialUpdate = { 
          focuses: newFocuses,
          credits: credits - cost
        };
      } else if (type === 'Incantation') {
        const newIncantations = [...(sheet.incantations || []), attackName];
        partialUpdate = { 
          incantations: newIncantations,
          credits: credits - cost
        };
      } else if (type === 'Shard') {
        const newShards = [...(sheet.shards || []), attackName];
        partialUpdate = { 
          shards: newShards,
          credits: credits - cost
        };
      } else if (type === 'Integrated Blaster') {
        const newIntegratedBlasters = [...(sheet.integratedBlasters || []), attackName];
        partialUpdate = { 
          integratedBlasters: newIntegratedBlasters,
          credits: credits - cost
        };
      } else if (type === 'Coder Carbine') {
        const newCoderCarbines = [...(sheet.coderCarbines || []), attackName];
        partialUpdate = { 
          coderCarbines: newCoderCarbines,
          credits: credits - cost
        };
      } else if (type === 'Rocket Launcher') {
        const newRocketLaunchers = [...(sheet.rocketLaunchers || []), attackName];
        partialUpdate = { 
          rocketLaunchers: newRocketLaunchers,
          credits: credits - cost
        };
      } else if (type === 'Dual Pistol') {
        const newDualPistols = [...(sheet.dualPistols || []), attackName];
        partialUpdate = { 
          dualPistols: newDualPistols,
          credits: credits - cost
        };
      } else if (type === 'Sniper Rifle') {
        const newSniperRifles = [...(sheet.sniperRifles || []), attackName];
        partialUpdate = { 
          sniperRifles: newSniperRifles,
          credits: credits - cost
        };
      } else if (type === 'Stealth Drone') {
        const newStealthDrones = [...(sheet.stealthDrones || []), attackName];
        partialUpdate = { 
          stealthDrones: newStealthDrones,
          credits: credits - cost
        };
      } else {
        return;
      }
      
      handleAutoSave(partialUpdate);
    }
    setPendingAttack("");
  };

  const handleAttackAdd = (attackName: string, type: string) => {
    if (sheet) {
      let partialUpdate: Partial<CharacterSheet>;
      if (type === 'Dart Gun') {
        const newDartGuns = [...(sheet.dartGuns || []), attackName];
        partialUpdate = { 
          dartGuns: newDartGuns
        };
      } else if (type === 'Lens') {
        const newLenses = [...(sheet.lenses || []), attackName];
        partialUpdate = { 
          lenses: newLenses
        };
      } else if (type === 'Super Serum') {
        const newSuperSerums = [...(sheet.superSerums || []), attackName];
        partialUpdate = { 
          superSerums: newSuperSerums
        };
      } else if (type === 'Rifle') {
        const newRifles = [...(sheet.rifles || []), attackName];
        partialUpdate = { 
          rifles: newRifles
        };
      } else if (type === 'Focus') {
        const newFocuses = [...(sheet.focuses || []), attackName];
        partialUpdate = { 
          focuses: newFocuses
        };
      } else if (type === 'Incantation') {
        const newIncantations = [...(sheet.incantations || []), attackName];
        partialUpdate = { 
          incantations: newIncantations
        };
      } else if (type === 'Shard') {
        const newShards = [...(sheet.shards || []), attackName];
        partialUpdate = { 
          shards: newShards
        };
      } else if (type === 'Integrated Blaster') {
        const newIntegratedBlasters = [...(sheet.integratedBlasters || []), attackName];
        partialUpdate = { 
          integratedBlasters: newIntegratedBlasters
        };
      } else if (type === 'Coder Carbine') {
        const newCoderCarbines = [...(sheet.coderCarbines || []), attackName];
        partialUpdate = { 
          coderCarbines: newCoderCarbines
        };
      } else if (type === 'Rocket Launcher') {
        const newRocketLaunchers = [...(sheet.rocketLaunchers || []), attackName];
        partialUpdate = { 
          rocketLaunchers: newRocketLaunchers
        };
      } else if (type === 'Dual Pistol') {
        const newDualPistols = [...(sheet.dualPistols || []), attackName];
        partialUpdate = { 
          dualPistols: newDualPistols
        };
      } else if (type === 'Sniper Rifle') {
        const newSniperRifles = [...(sheet.sniperRifles || []), attackName];
        partialUpdate = { 
          sniperRifles: newSniperRifles
        };
      } else if (type === 'Stealth Drone') {
        const newStealthDrones = [...(sheet.stealthDrones || []), attackName];
        partialUpdate = { 
          stealthDrones: newStealthDrones
        };
      } else {
        return;
      }
      
      handleAutoSave(partialUpdate);
    }
    setPendingAttack("");
  };

  const handleSecondaryAttackPurchase = (attackName: string, cost: number, type: string) => {
    if (credits < cost) {
      setNotice("Not enough credits!");
      return;
    }
    
    if (sheet) {
      let partialUpdate: Partial<CharacterSheet>;
      if (type === 'Algorithm') {
        const newAlgorithms = [...(sheet.algorithms || []), attackName];
        partialUpdate = { 
          algorithms: newAlgorithms,
          credits: credits - cost
        };
      } else if (type === 'Relic') {
        const newRelics = [...(sheet.relics || []), attackName];
        partialUpdate = { 
          relics: newRelics,
          credits: credits - cost
        };
      } else if (type === 'Elemental') {
        const newElementals = [...(sheet.elementals || []), attackName];
        partialUpdate = { 
          elementals: newElementals,
          credits: credits - cost
        };
      } else if (type === 'Super Serum') {
        const newSuperSerums = [...(sheet.superSerums || []), attackName];
        partialUpdate = { 
          superSerums: newSuperSerums,
          credits: credits - cost
        };
      } else if (type === 'Grenade') {
        const newGrenades = [...(sheet.grenades || []), attackName];
        partialUpdate = { 
          grenades: newGrenades,
          credits: credits - cost
        };
      } else if (type === 'Chem Zombie') {
        const newChemZombies = [...(sheet.chemZombies || []), attackName];
        partialUpdate = { 
          chemZombies: newChemZombies,
          credits: credits - cost
        };
      } else if (type === 'Noxious Fume') {
        const newNoxiousFumes = [...(sheet.noxiousFumes || []), attackName];
        partialUpdate = { 
          noxiousFumes: newNoxiousFumes,
          credits: credits - cost
        };
      } else if (type === 'Whip') {
        const newWhips = [...(sheet.whips || []), attackName];
        partialUpdate = { 
          whips: newWhips,
          credits: credits - cost
        };
      } else if (type === 'Sabre') {
        const newSabres = [...(sheet.sabres || []), attackName];
        partialUpdate = { 
          sabres: newSabres,
          credits: credits - cost
        };
      } else if (type === 'Flare') {
        const newFlares = [...(sheet.flares || []), attackName];
        partialUpdate = { 
          flares: newFlares,
          credits: credits - cost
        };
      } else if (type === 'Blaster') {
        const newBlasters = [...(sheet.blasters || []), attackName];
        partialUpdate = { 
          blasters: newBlasters,
          credits: credits - cost
        };
      } else if (type === 'Discipline') {
        const newDisciplines = [...(sheet.disciplines || []), attackName];
        partialUpdate = { 
          disciplines: newDisciplines,
          credits: credits - cost
        };
      } else if (type === 'Smart Missile') {
        const newSmartMissiles = [...(sheet.smartMissiles || []), attackName];
        partialUpdate = { 
          smartMissiles: newSmartMissiles,
          credits: credits - cost
        };
      } else if (type === 'Tech Pulse') {
        const newTechPulses = [...(sheet.techPulses || []), attackName];
        partialUpdate = { 
          techPulses: newTechPulses,
          credits: credits - cost
        };
      } else {
        return;
      }
      
      handleAutoSave(partialUpdate);
      setCredits(credits - cost);
    }
    setPendingSecondaryAttack("");
  };

  const handleSecondaryAttackAdd = (attackName: string, type: string) => {
    if (sheet) {
      let partialUpdate: Partial<CharacterSheet>;
      if (type === 'Algorithm') {
        const newAlgorithms = [...(sheet.algorithms || []), attackName];
        partialUpdate = { 
          algorithms: newAlgorithms
        };
      } else if (type === 'Relic') {
        const newRelics = [...(sheet.relics || []), attackName];
        partialUpdate = { 
          relics: newRelics
        };
      } else if (type === 'Elemental') {
        const newElementals = [...(sheet.elementals || []), attackName];
        partialUpdate = { 
          elementals: newElementals
        };
      } else if (type === 'Super Serum') {
        const newSuperSerums = [...(sheet.superSerums || []), attackName];
        partialUpdate = { 
          superSerums: newSuperSerums
        };
      } else if (type === 'Grenade') {
        const newGrenades = [...(sheet.grenades || []), attackName];
        partialUpdate = { 
          grenades: newGrenades
        };
      } else if (type === 'Chem Zombie') {
        const newChemZombies = [...(sheet.chemZombies || []), attackName];
        partialUpdate = { 
          chemZombies: newChemZombies
        };
      } else if (type === 'Noxious Fume') {
        const newNoxiousFumes = [...(sheet.noxiousFumes || []), attackName];
        partialUpdate = { 
          noxiousFumes: newNoxiousFumes
        };
      } else if (type === 'Whip') {
        const newWhips = [...(sheet.whips || []), attackName];
        partialUpdate = { 
          whips: newWhips
        };
      } else if (type === 'Sabre') {
        const newSabres = [...(sheet.sabres || []), attackName];
        partialUpdate = { 
          sabres: newSabres
        };
      } else if (type === 'Flare') {
        const newFlares = [...(sheet.flares || []), attackName];
        partialUpdate = { 
          flares: newFlares
        };
      } else if (type === 'Blaster') {
        const newBlasters = [...(sheet.blasters || []), attackName];
        partialUpdate = { 
          blasters: newBlasters
        };
      } else if (type === 'Discipline') {
        const newDisciplines = [...(sheet.disciplines || []), attackName];
        partialUpdate = { 
          disciplines: newDisciplines
        };
      } else if (type === 'Smart Missile') {
        const newSmartMissiles = [...(sheet.smartMissiles || []), attackName];
        partialUpdate = { 
          smartMissiles: newSmartMissiles
        };
      } else if (type === 'Tech Pulse') {
        const newTechPulses = [...(sheet.techPulses || []), attackName];
        partialUpdate = { 
          techPulses: newTechPulses
        };
      } else {
        return;
      }
      
      handleAutoSave(partialUpdate);
    }
    setPendingSecondaryAttack("");
  };

  return (
    <div className="character-editor" style={{ 
      position: 'relative',
      backgroundColor: '#ffffff',
      color: '#000000',
      colorScheme: 'light',
      // Force all children to inherit light mode
      forcedColorAdjust: 'none'
    }}>
  {/* Character Sheet header moved to App.tsx for right alignment */}
      <div className={styles.characterSheetGrid}>
        {/* Custom Card: Column 1, Rows 3 & 4 (span 2) */}
        <div className={styles.customCard}>
          <h3 style={{ marginTop: 0, textDecoration: 'underline', fontFamily: 'Arial, sans-serif' }}>Skills</h3>
          <div style={{ fontSize: '1em', color: '#333', fontFamily: 'Arial, sans-serif', marginTop: 8 }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {(() => {
                const skillList = [
                  "Acrobatics", "Athletics", "Awareness", "Computers", "Culture", "Deception", "Diplomacy", "Intimidation", "Investigation", "Medicine", "Oikomagic", "Performance", "Piloting", "Stealth", "Survival", "Technology", "Thievery", "Xenomagic"
                ];
                const skillColumnValues = [20, 18, 16, 14, 12, 10, 8, 6, 4, 2];
                
                // Check if this is a new character without skill dots initialized
                const isNewCharacter = !sheet || !sheet.hasFreeSkillStarterDots || !sheet.skillDots;
                
                // Helper function to get all booster sources for a skill
                const getBoosterSources = (skillName: string) => {
                  const sources = [];
                  
                  // Class boosters
                  if (charClass === "Chemist" && skillName === "Investigation") sources.push({ type: 'class', color: "rgba(114,17,49,0.5)" });
                  if (charClass === "Coder" && skillName === "Oikomagic") sources.push({ type: 'class', color: "rgba(17,33,114,0.5)" });
                  if (charClass === "Commander" && skillName === "Diplomacy") sources.push({ type: 'class', color: "rgba(113,114,17,0.5)" });
                  if (charClass === "Contemplative" && skillName === "Awareness") sources.push({ type: 'class', color: "rgba(17,99,114,0.5)" });
                  if (charClass === "Devout" && skillName === "Xenomagic") sources.push({ type: 'class', color: "rgba(107,17,114,0.5)" });
                  if (charClass === "Elementalist" && skillName === "Xenomagic") sources.push({ type: 'class', color: "rgba(35,17,114,0.5)" });
                  if (charClass === "Exospecialist" && skillName === "Athletics") sources.push({ type: 'class', color: "rgba(17,114,51,0.5)" });
                  if (charClass === "Gunslinger" && skillName === "Deception") sources.push({ type: 'class', color: "rgba(78,114,17,0.5)" });
                  if (charClass === "Technician" && skillName === "Technology") sources.push({ type: 'class', color: "rgba(114,72,17,0.5)" });
                  
                  // Subclass boosters
                  if (subclass === "Anatomist" && skillName === "Medicine") sources.push({ type: 'subclass', color: "rgba(102,207,0,0.5)" });
                  if (subclass === "Grenadier" && skillName === "Intimidation") sources.push({ type: 'subclass', color: "rgba(207,0,0,0.5)" });
                  if (subclass === "Necro" && skillName === "Survival") sources.push({ type: 'subclass', color: "rgba(0,51,207,0.5)" });
                  if (subclass === "Poisoner" && skillName === "Thievery") sources.push({ type: 'subclass', color: "rgba(207,118,0,0.5)" });
                  if (subclass === "Coercive" && skillName === "Deception") sources.push({ type: 'subclass', color: "rgba(67,201,255,0.5)" });
                  if (subclass === "Divinist" && skillName === "Investigation") sources.push({ type: 'subclass', color: "rgba(255,67,67,0.5)" });
                  if (subclass === "Naturalist" && skillName === "Survival") sources.push({ type: 'subclass', color: "rgba(102,207,0,0.5)" });
                  if (subclass === "Technologist" && skillName === "Technology") sources.push({ type: 'subclass', color: "rgba(140,67,255,0.5)" });
                  if (subclass === "Beguiler" && skillName === "Deception") sources.push({ type: 'subclass', color: "rgba(31,33,206,0.5)" });
                  if (subclass === "Galvanic" && skillName === "Athletics") sources.push({ type: 'subclass', color: "rgba(111,206,31,0.5)" });
                  if (subclass === "Tactician" && skillName === "Awareness") sources.push({ type: 'subclass', color: "rgba(206,195,31,0.5)" });
                  if (subclass === "Tyrant" && skillName === "Intimidation") sources.push({ type: 'subclass', color: "rgba(206,31,195,0.5)" });
                  if (subclass === "Inertial" && skillName === "Diplomacy") sources.push({ type: 'subclass', color: "rgba(28,148,94,0.5)" });
                  if (subclass === "Kinetic" && skillName === "Athletics") sources.push({ type: 'subclass', color: "rgba(123,148,28,0.5)" });
                  if (subclass === "Mercurial" && skillName === "Acrobatics") sources.push({ type: 'subclass', color: "rgba(148,28,108,0.5)" });
                  if (subclass === "Vectorial" && skillName === "Piloting") sources.push({ type: 'subclass', color: "rgba(83,28,148,0.5)" });
                  if (subclass === "Astral" && skillName === "Medicine") sources.push({ type: 'subclass', color: "rgba(91,177,175,0.5)" });
                  if (subclass === "Chaos" && skillName === "Intimidation") sources.push({ type: 'subclass', color: "rgba(177,91,108,0.5)" });
                  if (subclass === "Order" && skillName === "Culture") sources.push({ type: 'subclass', color: "rgba(174,177,91,0.5)" });
                  if (subclass === "Void" && skillName === "Stealth") sources.push({ type: 'subclass', color: "rgba(91,115,177,0.5)" });
                  if (subclass === "Air" && skillName === "Acrobatics") sources.push({ type: 'subclass', color: "rgba(14,226,223,0.5)" });
                  if (subclass === "Earth" && skillName === "Survival") sources.push({ type: 'subclass', color: "rgba(226,185,14,0.5)" });
                  if (subclass === "Fire" && skillName === "Intimidation") sources.push({ type: 'subclass', color: "rgba(226,14,14,0.5)" });
                  if (subclass === "Water" && skillName === "Medicine") sources.push({ type: 'subclass', color: "rgba(14,66,226,0.5)" });
                  if (subclass === "Aeronaut" && skillName === "Piloting") sources.push({ type: 'subclass', color: "rgba(61,161,216,0.5)" });
                  if (subclass === "Brawler" && skillName === "Survival") sources.push({ type: 'subclass', color: "rgba(216,165,61,0.5)" });
                  if (subclass === "Dreadnaught" && skillName === "Intimidation") sources.push({ type: 'subclass', color: "rgba(216,61,160,0.5)" });
                  if (subclass === "Spectre" && skillName === "Stealth") sources.push({ type: 'subclass', color: "rgba(106,61,216,0.5)" });
                  if (subclass === "Ammo Coder" && skillName === "Oikomagic") sources.push({ type: 'subclass', color: "rgba(10,57,145,0.5)" });
                  if (subclass === "Ordnancer" && skillName === "Athletics") sources.push({ type: 'subclass', color: "rgba(145,10,10,0.5)" });
                  if (subclass === "Pistoleer" && skillName === "Thievery") sources.push({ type: 'subclass', color: "rgba(90,145,10,0.5)" });
                  if (subclass === "Sniper" && skillName === "Stealth") sources.push({ type: 'subclass', color: "rgba(10,111,145,0.5)" });
                  if (subclass === "Hacker" && skillName === "Computers") sources.push({ type: 'subclass', color: "rgba(92,87,184,0.5)" });
                  if (subclass === "Junker" && skillName === "Thievery") sources.push({ type: 'subclass', color: "rgba(109,184,87,0.5)" });
                  if (subclass === "Nanoboticist" && skillName === "Acrobatics") sources.push({ type: 'subclass', color: "rgba(87,184,176,0.5)" });
                  if (subclass === "Tanker" && skillName === "Piloting") sources.push({ type: 'subclass', color: "rgba(184,87,139,0.5)" });
                  
                  // Species boosters
                  if (sheet?.species === "Avenoch" && skillName === "Awareness") sources.push({ type: 'species', color: "rgba(43,95,89,0.5)" });
                  if (sheet?.species === "Cerebronych" && skillName === "Deception") sources.push({ type: 'species', color: "rgba(95,94,43,0.5)" });
                  if (sheet?.species === "Cerebronych" && skillName === "Intimidation") sources.push({ type: 'species', color: "rgba(95,94,43,0.5)" });
                  if (sheet?.species === "Chloroptid" && skillName === "Awareness") sources.push({ type: 'species', color: "rgba(49,95,43,0.5)" });
                  if (sheet?.species === "Cognizant" && skillName === "Technology") sources.push({ type: 'species', color: "rgba(43,59,95,0.5)" });
                  if (sheet?.species === "Emberfolk" && skillName === "Xenomagic") sources.push({ type: 'species', color: "rgba(95,43,43,0.5)" });
                  if (sheet?.species === "Entomos" && skillName === "Athletics") sources.push({ type: 'species', color: "rgba(95,66,43,0.5)" });
                  if (species === "Human" && skillName === "Culture") sources.push({ type: 'species', color: "rgba(43,49,95,0.5)" });
                  if (species === "Lumenaren" && skillName === "Stealth") sources.push({ type: 'species', color: "rgba(81,95,43,0.5)" });
                  if (species === "Praedari" && skillName === "Survival") sources.push({ type: 'species', color: "rgba(95,43,92,0.5)" });

                  
                  // Subspecies boosters
                  if (subspecies === "Corvid" && skillName === "Thievery") sources.push({ type: 'subspecies', color: "rgba(117,144,78,0.5)" });
                  if (subspecies === "Falcador" && skillName === "Intimidation") sources.push({ type: 'subspecies', color: "rgba(109,113,86,0.5)" });
                  if (subspecies === "Nocturne" && skillName === "Investigation") sources.push({ type: 'subspecies', color: "rgba(51,69,146,0.5)" });
                  if (subspecies === "Vulturine" && skillName === "Survival") sources.push({ type: 'subspecies', color: "rgba(169,109,140,0.5)" });
                  if (subspecies === "Barkskin" && skillName === "Survival") sources.push({ type: 'subspecies', color: "rgba(95,45,43,0.5)" });
                  if (subspecies === "Carnivorous" && skillName === "Intimidation") sources.push({ type: 'subspecies', color: "rgba(43,45,95,0.5)" });
                  if (subspecies === "Drifting" && skillName === "Piloting") sources.push({ type: 'subspecies', color: "rgba(95,138,95,0.5)" });
                  if (subspecies === "Viny" && skillName === "Thievery") sources.push({ type: 'subspecies', color: "rgba(95,95,43,0.5)" });
                  if (subspecies === "Android" && skillName === "Diplomacy") sources.push({ type: 'subspecies', color: "rgba(88,31,189,0.5)" });
                  if (subspecies === "Utility Droid" && skillName === "Computers") sources.push({ type: 'subspecies', color: "rgba(189,137,31,0.5)" });
                  if (subspecies === "Petran" && skillName === "Survival") sources.push({ type: 'subspecies', color: "rgba(115,83,17,0.5)" });
                  if (subspecies === "Pyran" && skillName === "Performance") sources.push({ type: 'subspecies', color: "rgba(179,17,17,0.5)" });
                  if (subspecies === "Infrared" && skillName === "Performance") sources.push({ type: 'subspecies', color: "rgba(177,127,190,0.5)" });
                  if (subspecies === "Radiofrequent" && skillName === "Deception") sources.push({ type: 'subspecies', color: "rgba(190,169,127,0.5)" });
                  if (subspecies === "X-Ray" && skillName === "Investigation") sources.push({ type: 'subspecies', color: "rgba(127,138,190,0.5)" });
                  if (subspecies === "Apocritan" && skillName === "Survival") sources.push({ type: 'subspecies', color: "rgba(109,113,86,0.5)" });
                  if (subspecies === "Dynastes" && skillName === "Intimidation") sources.push({ type: 'subspecies', color: "rgba(51,69,146,0.5)" });
                  if (subspecies === "Mantid" && skillName === "Awareness") sources.push({ type: 'subspecies', color: "rgba(117,144,78,0.5)" });
                  if (subspecies === "Diminutive Evolution" && skillName === "Thievery") sources.push({ type: 'subspecies', color: "rgba(195,115,95,0.5)" });
                  if (subspecies === "Lithe Evolution" && skillName === "Acrobatics") sources.push({ type: 'subspecies', color: "rgba(43,95,95,0.5)" });
                  if (subspecies === "Massive Evolution" && skillName === "Athletics") sources.push({ type: 'subspecies', color: "rgba(43,23,95,0.5)" });
                  if (subspecies === "Stout Evolution" && skillName === "Survival") sources.push({ type: 'subspecies', color: "rgba(95,43,43,0.5)" });
                  if (subspecies === "Canid" && skillName === "Intimidation") sources.push({ type: 'subspecies', color: "rgba(47,141,166,0.5)" });
                  if (subspecies === "Felid" && skillName === "Acrobatics") sources.push({ type: 'subspecies', color: "rgba(177,99,38,0.5)" });
                  if (subspecies === "Mustelid" && skillName === "Thievery") sources.push({ type: 'subspecies', color: "rgba(105,146,57,0.5)" });
                  if (subspecies === "Ursid" && skillName === "Athletics") sources.push({ type: 'subspecies', color: "rgba(144,38,177,0.5)" });

                  // Background boosters
                  if (sheet?.background === "Adherent of the Pollen Collective" && skillName === "Medicine") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Adherent of the Pollen Collective" && skillName === "Survival") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Anti-Deft Secessionist" && skillName === "Culture") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Anti-Deft Secessionist" && skillName === "Survival") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Awakened Machine" && skillName === "Awareness") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Awakened Machine" && skillName === "Investigation") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Belt Miner" && skillName === "Athletics") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Belt Miner" && skillName === "Awareness") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Black Market Executive" && skillName === "Deception") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Black Market Executive" && skillName === "Diplomacy") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Combat Medic" && skillName === "Medicine") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Combat Medic" && skillName === "Performance") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Covert Operative" && skillName === "Acrobatics") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Covert Operative" && skillName === "Stealth") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "DAGR Officer" && skillName === "Awareness") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "DAGR Officer" && skillName === "Investigation") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Exobiologist" && skillName === "Medicine") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  if (sheet?.background === "Exobiologist" && skillName === "Survival") sources.push({ type: 'background', color: "rgba(102,102,102,0.5)" });
                  
                  return sources;
                };
                
                // Helper function to get anti-booster skills (skills that lose an auto-filled dot)
                const getAntiBoosterSkills = () => {
                  const antiSkills = [];
                  if (sheet?.background === "Adherent of the Pollen Collective") {
                    antiSkills.push("Investigation", "Technology");
                  }
                  if (sheet?.background === "Anti-Deft Secessionist") {
                    antiSkills.push("Diplomacy", "Intimidation");
                  }
                  if (sheet?.background === "Awakened Machine") {
                    antiSkills.push("Culture", "Performance");
                  }
                  if (sheet?.background === "Belt Miner") {
                    antiSkills.push("Culture", "Performance");
                  }
                  if (sheet?.background === "Black Market Executive") {
                    antiSkills.push("Awareness", "Survival");
                  }
                  if (sheet?.background === "Combat Medic") {
                    antiSkills.push("Deception", "Stealth");
                  }
                  if (sheet?.background === "Covert Operative") {
                    antiSkills.push("Diplomacy", "Medicine");
                  }
                  if (sheet?.background === "DAGR Officer") {
                    antiSkills.push("Medicine", "Thievery");
                  }
                  if (sheet?.background === "Exobiologist") {
                    antiSkills.push("Culture", "Deception");
                  }
                  return antiSkills;
                };

                // Helper function to get booster positions for a skill (handles overlaps and anti-boosters)
                const getBoosterPositions = (skillName: string) => {
                  const sources = getBoosterSources(skillName);
                  const antiBoosterSkills = getAntiBoosterSkills();
                  const hasAntiBooster = antiBoosterSkills.includes(skillName);
                  
                  if (sources.length === 0) return [];
                  
                  // If skill has anti-booster, shift all booster positions left by 1 (positions 1, 2, 3 instead of 2, 3, 4)
                  // This effectively removes the 18+ auto-dot and shifts boosters into 18+ and 16+ columns
                  const startPosition = hasAntiBooster ? 1 : 2;
                  
                  // Assign positions: first booster at startPosition, second at startPosition+1, third at startPosition+2, etc.
                  return sources.map((source, index) => ({
                    position: startPosition + index,
                    color: source.color,
                    type: source.type
                  }));
                };
                
                return skillList.map(skill => {
                  const dots = sheet?.skillDots?.[skill] || [];
                  const boosterPositions = getBoosterPositions(skill);
                  const antiBoosterSkills = getAntiBoosterSkills();
                  const hasAntiBooster = antiBoosterSkills.includes(skill);
                  
                  // Check for Jack of All Trades (Human perk)
                  const jackOfAllTradesDots = sheet?.species === "Human" && sheet?.speciesCardDots && sheet.speciesCardDots[4] && sheet.speciesCardDots[4][0];
                  
                  let value;
                  let displayDots: boolean[] = [];
                  
                  // Build displayDots array by combining stored dots + auto-filled dots
                  // Start with stored skillDots data
                  displayDots = [...dots];
                  
                  // Determine how many positions we need based on boosters
                  const maxBoosterPosition = boosterPositions.length > 0 
                    ? Math.max(...boosterPositions.map(bp => bp.position))
                    : -1;
                  const minRequiredLength = Math.max(
                    hasAntiBooster ? 1 : 2,  // Starter dots
                    jackOfAllTradesDots ? 4 : 0,  // Jack of All Trades
                    maxBoosterPosition + 1  // Booster positions
                  );
                  
                  // Extend array to required length
                  while (displayDots.length < minRequiredLength) {
                    displayDots.push(false);
                  }
                  
                  // Mark auto-filled positions as true
                  displayDots[0] = true; // 20+ is always filled
                  if (!hasAntiBooster) {
                    displayDots[1] = true; // 18+ filled for non-anti-booster skills
                  }
                  
                  // Jack of All Trades dots at positions 2 and 3
                  if (jackOfAllTradesDots) {
                    displayDots[2] = true;
                    displayDots[3] = true;
                  }
                  
                  // Booster dots are auto-filled at ALL positions (including position 1 for anti-booster skills)
                  boosterPositions.forEach(bp => {
                    displayDots[bp.position] = true;
                  });
                  
                  // Calculate value based on rightmost filled dot
                  let idx = displayDots.lastIndexOf(true);
                  value = idx >= 0 ? skillColumnValues[idx] + "+" : "-";
                  
                  // Render visual dots - show all filled dots (including filled anti-booster positions)
                  const dotElements = displayDots.map((isFilled, dotIndex) => {
                    // Skip unfilled dots
                    if (!isFilled) return null;
                    
                    // Check if this position has a booster
                    const boosterAtPosition = boosterPositions.find(bp => bp.position === dotIndex);
                    // Check if this is a Jack of All Trades dot
                    const isJackOfAllTradesDot = jackOfAllTradesDots && (dotIndex === 2 || dotIndex === 3);
                    
                    // Determine dot color: booster color takes priority, then Jack of All Trades, then default
                    const dotColor = boosterAtPosition ? boosterAtPosition.color : (isJackOfAllTradesDot ? 'rgba(43,49,95,0.25)' : '#666');
                    
                    return (
                      <span
                        key={dotIndex}
                        style={{
                          display: 'inline-block',
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: dotColor,
                          marginRight: 2,
                        }}
                      />
                    );
                  });
                  
                  return (
                    <li key={skill} style={{ display: 'flex', alignItems: 'center', marginBottom: 2, fontFamily: 'Arial, sans-serif', fontSize: '1em' }}>
                      <span style={{ fontWeight: 'bold', minWidth: 120, textAlign: 'right', marginRight: 10, marginLeft: -10 }}>{skill}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <span style={{ fontWeight: 'bold', color: '#000', fontSize: '1em', marginRight: 10, minWidth: 32, textAlign: 'right', display: 'inline-block' }}>{value}</span>
                        {dotElements}
                      </span>
                    </li>
                  );
                });
              })()}
            </ul>
          </div>
        </div>
      <div className={styles.identityCard}>
  <h3 style={{ fontFamily: 'Arial, sans-serif' }}>Identity</h3>
        <div className={styles.cardContent}>
          {/* Row 1: Player Name, Character Name, Background */}
          <div className={styles.identityRow}>
            <label>
              <span style={{ fontFamily: 'Arial, sans-serif' }}>Player Name</span>
              <input value={playerName} onChange={e => {
                setPlayerName(e.target.value);
                handleAutoSave({ playerName: e.target.value });
              }} style={{ textAlign: 'center' }} />
            </label>
            <label>
              <span style={{ fontFamily: 'Arial, sans-serif' }}>Character Name</span>
              <input value={name} onChange={e => {
                setName(e.target.value);
                handleAutoSave({ name: e.target.value });
              }} style={{ textAlign: 'center' }} />
            </label>
            <label>
              <span style={{ fontFamily: 'Arial, sans-serif' }}>Background</span>
              <div className={styles.selectWrapper}>
                <div
                  style={{ 
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    color: backgroundOptions.find(opt => opt.value === background)?.color || '#000',
                    textAlign: 'center',
                    minWidth: '120px',
                    background: 'white',
                    minHeight: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {background || '—'}
                </div>
              </div>
            </label>
          </div>
          
          {/* Row 2: Class, Subclass, Species, Subspecies */}
          <div className={styles.identityRow}>
            <label>
              <span style={{ fontFamily: 'Arial, sans-serif' }}>Class</span>
              <div className={styles.selectWrapper}>
                <div
                  style={{ 
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: classOptions.find(opt => opt.value === charClass)?.color || '#000',
                    minWidth: '120px',
                    background: 'white',
                    minHeight: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {charClass || '—'}
                </div>
              </div>
            </label>
            <label>
              <span style={{ fontFamily: 'Arial, sans-serif' }}>Subclass</span>
              <div className={styles.selectWrapper}>
                <div
                  style={{ 
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: (subclassOptions.find(opt => opt.value === subclass) || allSubclassOptions.find(opt => opt.value === subclass))?.color || '#000',
                    minWidth: '120px',
                    background: 'white',
                    minHeight: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {subclass || '—'}
                </div>
              </div>
            </label>
            <label>
              <span style={{ fontFamily: 'Arial, sans-serif' }}>Species</span>
              <div className={styles.selectWrapper}>
                <div
                  style={{ 
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: speciesOptions.find(opt => opt.value === species)?.color || '#000',
                    minWidth: '120px',
                    background: 'white',
                    minHeight: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {species || '—'}
                </div>
              </div>
            </label>
            <label>
              <span style={{ fontFamily: 'Arial, sans-serif' }}>
                {species === "Cerebronych" ? "Host" : "Subspecies"}
              </span>
              <div className={styles.selectWrapper}>
                {species === "Cerebronych" ? (
                  // Read-only display for Cerebronych Host
                  <div
                    style={{ 
                      fontFamily: 'Arial, Helvetica, sans-serif',
                      fontWeight: 'bold',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      textAlign: 'center',
                      color: hostSpecies ? (hostOptions.find(opt => opt.value === hostSpecies)?.color || '#000') : '#000',
                      minWidth: '120px',
                      background: 'white',
                      minHeight: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {hostSpecies || '—'}
                  </div>
                ) : (
                  // Read-only display for other species
                  <div
                    style={{ 
                      fontFamily: 'Arial, Helvetica, sans-serif',
                      fontWeight: 'bold',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      textAlign: 'center',
                      color: (subspeciesOptions.find(opt => opt.value === subspecies) || allSubspeciesOptions.find(opt => opt.value === subspecies))?.color || '#000',
                      minWidth: '120px',
                      background: 'white',
                      minHeight: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {subspecies || '—'}
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Move Features section here */}
      <div className={styles.featuresCard}>
  <h3 style={{ fontFamily: 'Arial, sans-serif' }}>Features</h3>
        <div className={styles.cardContent}>
          <label style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.90em' }}>{
            charClass === "Chemist"
              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>{chemistFeatureJSX}</span>
              : charClass === "Coder"
                ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>{coderFeatureJSX}</span>
                : charClass === "Commander"
                  ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>{commanderFeatureJSX}</span>
                  : charClass === "Contemplative"
                    ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>{contemplativeFeatureJSX}</span>
                    : charClass === "Devout"
                      ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>{devoutFeatureJSX}</span>
                      : charClass === "Elementalist"
                        ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>{elementalistFeatureJSX}</span>
                        : charClass === "Exospecialist"
                          ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>{exospecialistFeatureJSX}</span>
                          : charClass === "Gunslinger"
                            ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>{gunslingerFeatureJSX}</span>
                            : charClass === "Technician"
                              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>{technicianFeatureJSX}</span>
                              : null
          }</label>
          <label style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.90em' }}>{
            subclass === "Anatomist" 
              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{anatomistFeatureJSX}</span>
              : subclass === "Beguiler"
                ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{generateLoyalServantsJSX(sheet?.subclassProgressionDots?.beguilerFeatureHxDots || [false, false, false])}</span>
                : subclass === "Coercive"
                  ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{coerciveFeatureJSX}</span>
                  : subclass === "Divinist"
                    ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{divinistFeatureJSX}</span>
                    : subclass === "Galvanic"
                      ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{galvanicFeatureJSX}</span>
                      : subclass === "Grenadier"
                        ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{grenadierFeatureJSX}</span>
                        : subclass === "Naturalist"
                          ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{naturalistFeatureJSX}</span>
                          : subclass === "Necro"
                            ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{necroFeatureJSX}</span>
                            : subclass === "Poisoner"
                              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{generateBackstabberJSX({
                                  poisonerChemicalImmunityDots: sheet?.subclassProgressionDots?.poisonerChemicalImmunityDots || [false],
                                  poisonerToxicImmunityDots: sheet?.subclassProgressionDots?.poisonerToxicImmunityDots || [false],
                                  poisonerSpikeInflictToxicDots: sheet?.subclassProgressionDots?.poisonerSpikeInflictToxicDots || [false]
                                })}</span>
                              : subclass === "Technologist"
                                ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{technologistFeatureJSX}</span>
                                : subclass === "Tactician"
                                  ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{tacticianFeatureJSX}</span>
                                  : subclass === "Tyrant"
                                    ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{tyrantFeatureJSX}</span>
                                    : subclass === "Inertial"
                                      ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{inertialFeatureJSX}</span>
                                      : subclass === "Kinetic"
                                        ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{kineticFeatureJSX}</span>
                                        : subclass === "Mercurial"
                                          ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{mercurialFeatureJSX}</span>
                                          : subclass === "Vectorial"
                                            ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{vectorialFeatureJSX}</span>
                                            : subclass === "Astral"
                                              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{astralFeatureJSX}</span>
                                              : subclass === "Chaos"
                                                ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{chaosFeatureJSX}</span>
                                                : subclass === "Order"
                                                  ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{orderFeatureJSX}</span>
                                                  : subclass === "Void"
                                                    ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{voidFeatureJSX}</span>
                                                    : subclass === "Air"
                                                      ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{airFeatureJSX}</span>
                                                      : subclass === "Earth"
                                                        ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{earthFeatureJSX}</span>
                                                        : subclass === "Fire"
                                                          ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{fireFeatureJSX}</span>
                                                          : subclass === "Water"
                                                            ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{waterFeatureJSX}</span>
                                                            : subclass === "Aeronaut"
                                                              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{aeronautFeatureJSX}</span>
                                                              : subclass === "Brawler"
                                                                ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{brawlerFeatureJSX}</span>
                                                                : subclass === "Dreadnaught"
                                                                  ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{dreadnaughtFeatureJSX}</span>
                                                                  : subclass === "Spectre"
                                                                    ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{spectreFeatureJSX}</span>
                                                                    : subclass === "Ammo Coder"
                                                                      ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{ammoCoderFeatureJSX}</span>
                                                                      : subclass === "Ordnancer"
                                                                        ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{ordnancerFeatureJSX}</span>
                                                                        : subclass === "Pistoleer"
                                                                          ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{pistoleerFeatureJSX}</span>
                                                                          : subclass === "Sniper"
                                                                            ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{sniperFeatureJSX}</span>
                                                                            : subclass === "Hacker"
                                                                              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{hackerFeatureJSX}</span>
                                                                              : subclass === "Junker"
                                                                                ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{junkerFeatureJSX}</span>
                                                                                : subclass === "Nanoboticist"
                                                                                  ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{nanoboticistFeatureJSX}</span>
                                                                                  : subclass === "Tanker"
                                                                                    ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{tankerFeatureJSX}</span>
                                                                                    : null
          }</label>
          <label style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.90em' }}>{
            species === "Avenoch" 
              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{avenochFeatureJSX}</span>
              : species === "Cerebronych"
                ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{cerebronychFeatureJSX}</span> 
                : species === "Chloroptid"
                  ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{chloroptidFeatureJSX}</span>
                  : species === "Cognizant"
                    ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{cognizantFeatureJSX}</span>
                    : species === "Emberfolk"
                      ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{emberfolkFeatureJSX}</span>
                      : species === "Entomos"
                        ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{entomosFeatureJSX}</span>
                        : species === "Human"
                          ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{humanFeatureJSX}</span>
                          : species === "Lumenaren"
                            ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{lumenarenFeatureJSX}</span>
                            : species === "Praedari"
                              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{praedariFeatureJSX}</span>
                              : null
          }</label>
          <label style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.90em' }}>{
          species === "Cerebronych"
            ? <>
                <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{hostMimicFeatureJSX}</span>
                {hostSpecies && getHostFeatureJSX(hostSpecies) && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, marginLeft: '24px', color: '#000', fontWeight: 400 }}>
                    {getHostFeatureJSX(hostSpecies)}
                  </span>
                )}
                {subspecies === "Avenoch Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    {generateFirstInFlightJSX()}
                  </span>
                )}
                {subspecies === "Corvid Avenoch Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    {generateCrowsCunningJSX({ 
                      hasDemoralizeImmunity: sheet?.subspeciesCardDots?.[0]?.[0] || false 
                    })}
                  </span>
                )}
                {subspecies === "Falcador Avenoch Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    {generateRendingTalonsJSX()}
                  </span>
                )}
                {subspecies === "Nocturne Avenoch Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    {generateEyesOfTheNightJSX()}
                  </span>
                )}
                {subspecies === "Vulturine Avenoch Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    {generateCarrionGorgeJSX()}
                  </span>
                )}
                {subspecies === "Chloroptid Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    {generateRapidRegenerationJSX({ 
                      hitPointsDice: 1 + (sheet?.speciesCardDots?.[0]?.[0] ? 1 : 0) 
                    })}
                  </span>
                )}
                {subspecies === "Barkskin Chloroptid Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    {generateDeepRootsJSX({ mesmerizeImmunity: sheet?.subspeciesCardDots?.[0]?.[0] })}
                  </span>
                )}
                {subspecies === "Carnivorous Chloroptid Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8 }}>
                    {generateSapSuckerJSX(sheet?.subspeciesCardDots?.[0]?.[0])}
                  </span>
                )}
                {subspecies === "Drifting Chloroptid Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#5f8a5f' }}>Leaf on the Wind.</i></b> You have a <b><i style={{ color: '#38761d' }}>Flight Speed</i></b>. Additionally, you can <b><i style={{ color: '#38761d' }}>Move</i></b> 1hx after you take any Damage.
                  </span>
                )}
                {subspecies === "Viny Chloroptid Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#5f5f2b' }}>Climbing Creeper.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b> and <i>Resist</i> <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>.
                  </span>
                )}
                {subspecies === "Cognizant Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8 }}>
                    You are <i>Resistant</i> to <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Drain</i></b> condition and can naturally survive in the vacuum of space.
                  </span>
                )}
                {subspecies === "Cognizant Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#2b3b5f' }}>Gears & Cogs.</i></b> You <i>Resist</i> <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> damage and are <i>Immune</i> to the <b><i>Drain</i></b> condition and can naturally survive in the vacuum of space.
                  </span>
                )}
                {subspecies === "Android Cognizant Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#581fbd' }}>Encrypted Cerebral Cortex.</i></b> You are <i>Immune</i> to the <b><i>Confuse</i></b> condition.
                  </span>
                )}
                {subspecies === "Utility Droid Cognizant Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#bd891f' }}>Variant Utility.</i></b> Your size is 1hx, 2hx, or 3hx, chosen at character creation, and you gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b>.
                  </span>
                )}
                {subspecies === "Emberfolk Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#5f2b2b' }}>Born of Fire.</i></b> You <i>Resist</i> <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>  and are <i>Immune</i> to the <b><i>Spike</i></b> condition.
                  </span>
                )}
                {subspecies === "Petran Emberfolk Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#735311' }}>Mountain's Endurance.</i></b> You <i>Resist</i> <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Demoralize</i></b> condition.
                  </span>
                )}   
                {subspecies === "Pyran Emberfolk Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8 }}>
                    <b><i style={{ color: '#b31111' }}>Blazing Leap.</i></b> You can choose to have your <b><i style={{ color: '#990000' }}>Attacks</i></b> and/or <b><i style={{ color: '#351c75' }}>Strikes</i></b> deal <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> at-will.
                  </span>
                )}     
                {subspecies === "Entomos Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#5f422b' }}>Insectoid Resistance.</i></b> You are <i>Immune</i> to the <b><i>Confuse</i></b> condition and fall damage.
                  </span>
                )}     
                {subspecies === "Apocritan Entomos Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#6d7156' }}>Swarm Tactics.</i></b> When you are 1hx away from an enemy, allies who <b><i style={{ color: '#351c75' }}>Strike</i></b> that enemy can choose to inflict the <b><i>Spike</i></b>, <b><i>Confuse</i></b> or <b><i>Restrain</i></b> condition on it. The <b><i>Spike</i></b> damage is the same as the ally's <b><i style={{ color: '#351c75' }}>Strike</i></b> damage.
                  </span>
                )}     
                {subspecies === "Dynastes Entomos Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#334592' }}>Herculean.</i></b> Your size is 3hx. You are also <i>Immune</i> to the <b><i>Slam</i></b> and <b><i>Bounce</i></b> conditions. Additionally, when you inflict the <b><i>Slam</i></b> or <b><i>Bounce</i></b> condition, increase the forced <b><i style={{ color: '#38761d' }}>Movement</i></b> by 2hx.
                  </span>
                )}     
                {subspecies === "Mantid Entomos Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#75904e' }}>Raptorial Claws.</i></b> You can <b><i style={{ color: '#351c75' }}>Strike</i></b> enemies in an adjacent hx during your <b><i style={{ color: '#38761d' }}>Move</i></b> instead of having to <b><i style={{ color: '#38761d' }}>Move</i></b> through them.
                  </span>
                )}     
                {subspecies === "Human Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#2b315f' }}>Adaptable Physique.</i></b> You <i>Resist</i> two of the following damage types:<br/>
                    <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
                    <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>Cold<img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
                    <b><u style={{ color: '#ffe700', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
                    <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
                    <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
                    <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>Neural<img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
                    <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
                  </span>
                )}
                {subspecies === "Diminutive Human Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#c3735f' }}>Out of Sight.</i></b> When you are <b><i><span style={{ color: '#990000' }}>Attacked</span></i></b> and have any Cover, you roll one additional Cover die and discard the lowest roll.
                  </span>
                )}     
                {subspecies === "Lithe Human Host" && (
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                      <b><i style={{ color: '#2b5f5f' }}>Fleet of Foot.</i></b> You ignore <i>Rough Terrain</i> and <i>Dangerous Terrain</i> and you gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b>.
                    </span>
                )}     
                {subspecies === "Massive Human Host" && (
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                      <b><i style={{ color: '#2b175f' }}>I'LL SEE YOU IN HELL!</i></b> Whenever you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you can immediately make a <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b>. Additionally, your size is 3hx.
                    </span>
                )}     
                {subspecies === "Stout Human Host" && (
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                      <b><i style={{ color: '#5f2b2b' }}>Die Hard.</i></b> The first time you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you immediately gain 1 <b><i style={{ color: '#990000' }}>Hit Point</i></b> and are not dying.
                    </span>
                )}
                {subspecies === "Lumenaren Host" && (
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                      <b><i style={{ color: '#515f2b' }}>Immutable Energy Reserves.</i></b> You are <i>Immune</i> to the <b><i>Sleep</i></b> condition, <i>Resist</i> <b><u style={{ color: '#ffe700', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and can naturally survive in the vacuum of space.
                    </span>
                )}
                {subspecies === "Infrared Lumenaren Host" && (
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                      <b><i style={{ color: '#b17fbe' }}>Infrared Tracking.</i></b> All <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> you make automatically have the Arcing keyword.
                    </span>
                )}
                {subspecies === "Radiofrequent Lumenaren Host" && (
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                      <b><i style={{ color: '#bea97f' }}>Misleading Signals.</i></b> Enemies <b><i><span style={{ color: '#990000' }}>Attacking</span></i></b> you roll an additional Crit die and discard the highest rolled.
                    </span>
                )}
                {subspecies === "X-Ray Lumenaren Host" && (
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                      <b><i style={{ color: '#7f8abe' }}>Irradiate.</i></b> Enemies starting their turn within 3hx of you suffer 2 instances of the <b><i>Spike</i></b> (<b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>) condition.
                    </span>
                )}
                {subspecies === "Praedari Host" && (
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                      <b><i style={{ color: '#5f2b5c' }}>Predator.</i></b> Whenever you <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> a creature who is not at full <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you gain +2 Crit and +1d6 Damage, the Damage type is the same as the <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage type.
                    </span>
                )}
                {subspecies === "Canid Praedari Host" && (
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                      <b><i style={{ color: '#2f8da6' }}>Inspired Hunter.</i></b> When you reduce a creature to 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you immediately gain 1 <i>Action</i>. You can only benefit from this once per turn.
                    </span>
                )}
                {subspecies === "Felid Praedari Host" && (
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                      <b><i style={{ color: '#b16326' }}>Cat’s Grace.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b> and cannot take damage from falling as long as you are conscious. Additionally, you can use the <i>Acrobatics</i> skill once per turn without using an <i>Action</i>.
                    </span>
                )}
                {subspecies === "Mustelid Praedari Host" && (
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                      <b><i style={{ color: '#699239' }}>Weasel.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Burrow Speed</i></b> and are <i>Immune</i> to the <b><i>Restrain</i></b> condition. Additionally you can use the <i>Thievery</i> skill once per turn without using an <i>Action</i>.
                    </span>
                )}
                {subspecies === "Ursid Praedari Host" && (
                    <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                      <b><i style={{ color: '#9026b1' }}>Natural Insulation.</i></b> You <i>Resist</i> <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>Cold<img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Restrain</i></b> condition. Your size is 3hx.
                    </span>
                )}
              </>
            : subspecies === "Corvid" 
              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{corvidFeatureJSX}</span>
              : subspecies === "Falcador"
                ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{falcadorFeatureJSX}</span>
                : subspecies === "Nocturne"
                  ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{nocturneFeatureJSX}</span>
                  : subspecies === "Vulturine"
                    ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{vulturineFeatureJSX}</span>
                    : subspecies === "Barkskin"
                      ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{barkskinFeatureJSX}</span>
                      : subspecies === "Carnivorous"
                        ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{carnivorousFeatureJSX}</span>
                        : subspecies === "Drifting"
                          ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{driftingFeatureJSX}</span>
                          : subspecies === "Viny"
                            ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{vinyFeatureJSX}</span>
                            : subspecies === "Android"
                              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{androidFeatureJSX}</span>
                              : subspecies === "Utility Droid"
                                ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{utilityDroidFeatureJSX}</span>
                                : subspecies === "Petran"
                                  ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{petranFeatureJSX}</span>
                                  : subspecies === "Pyran"
                                    ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{pyranFeatureJSX}</span>
                                    : subspecies === "Apocritan"
                                      ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{apocritanFeatureJSX}</span>
                                      : subspecies === "Dynastes"
                                        ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{dynastesFeatureJSX}</span>
                                        : subspecies === "Mantid"
                                          ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{mantidFeatureJSX}</span>
                                          : subspecies === "Diminutive Evolution"
                                            ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{diminutiveEvolutionFeatureJSX}</span>
                                            : subspecies === "Lithe Evolution"
                                              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{litheEvolutionFeatureJSX}</span>
                                              : subspecies === "Massive Evolution"
                                                ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{massiveEvolutionFeatureJSX}</span>
                                                : subspecies === "Stout Evolution"
                                                  ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{stoutEvolutionFeatureJSX}</span>
                                                  : subspecies === "Infrared"
                                                    ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{infraredFeatureJSX}</span>
                                                    : subspecies === "Radiofrequent"
                                                      ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{radiofrequentFeatureJSX}</span>
                                                      : subspecies === "X-Ray"
                                                        ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{xRayFeatureJSX}</span>
                                                        : subspecies === "Canid"
                                                          ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{canidFeatureJSX}</span>
                                                          : subspecies === "Felid"
                                                            ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{felidFeatureJSX}</span>
                                                            : subspecies === "Mustelid"
                                                              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{mustelidFeatureJSX}</span>
                                                              : subspecies === "Ursid"
                                                                ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{ursidFeatureJSX}</span>
                                                                : null
          }</label>
        </div>
      </div>


      <div className={styles.movementStrikeCard}>
  <h3 style={{ fontFamily: 'Arial, sans-serif' }}>Movement</h3>
        <div className={styles.cardContent}>
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}><u>Speed</u> {speed}{speed !== "0hx" ? "hx" : ""}</div>
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}>
            <u>Speed Types</u> {movement}Ground
            {sheet?.subclass === 'Air' && (sheet?.subclassProgressionDots as any)?.airMovementFlySpeedDots?.[0] ? ', Fly' : ''}
            {sheet?.subclass === 'Water' && (sheet?.subclassProgressionDots as any)?.waterMovementSwimSpeedDots?.[0] ? ', Swim' : ''}
            {sheet?.subclass === 'Aeronaut' ? ', Fly' : ''}
            {sheet?.subclass === 'Sniper' && (sheet?.subclassProgressionDots as any)?.sniperMovementClimbDots?.[0] ? ', Climb' : ''}
            {sheet?.subclass === 'Nanoboticist' && (sheet?.subclassProgressionDots as any)?.nanoboticistMovementFlightDot?.[0] ? ', Fly' : ''}
            {sheet?.species === 'Avenoch' ? ', Fly' : ''}
            {hostSpecies === 'Avenoch Host' ? ', Fly' : ''}
            {hostSpecies === 'Corvid Avenoch Host' ? ', Fly' : ''}
            {hostSpecies === 'Falcador Avenoch Host' ? ', Fly' : ''}
            {hostSpecies === 'Nocturne Avenoch Host' ? ', Fly' : ''}
            {hostSpecies === 'Vulturine Avenoch Host' ? ', Fly' : ''}
            {hostSpecies === 'Drifting Chloroptid Host' ? ', Fly' : ''}
            {subspecies === 'Drifting' ? ', Fly' : ''}
            {hostSpecies === 'Viny Chloroptid Host' ? ', Climb' : ''}
            {subspecies === 'Viny' ? ', Climb' : ''}
            {subspecies === 'Viny' && sheet?.subspeciesCardDots?.[0]?.[0] ? ', Burrow' : ''}
            {hostSpecies === 'Utility Droid Cognizant Host' ? ', Climb' : ''}
            {subspecies === 'Utility Droid' ? ', Climb' : ''}
            {subspecies === 'Utility Droid' && sheet?.subspeciesCardDots?.[0]?.[0] ? ', Swim' : ''}
            {subspecies === 'Utility Droid' && sheet?.subspeciesCardDots?.[1]?.[0] ? ', Burrow' : ''}
            {subspecies === 'Utility Droid' && sheet?.subspeciesCardDots?.[2]?.[0] ? ', Fly' : ''}
            {hostSpecies === 'Lithe Human Host' ? ', Climb' : ''}
            {subspecies === 'Lithe Evolution' ? ', Climb' : ''}
            {hostSpecies === 'Felid Praedari Host' ? ', Climb' : ''}
            {subspecies === 'Felid' ? ', Climb' : ''}
            {hostSpecies === 'Mustelid Praedari Host' ? ', Burrow' : ''}
            {subspecies === 'Mustelid' ? ', Burrow' : ''}
            {sheet?.species === 'Praedari' && sheet?.speciesCardDots?.[7]?.[0] ? ', Climb' : ''}
            {sheet?.species === 'Entomos' && sheet?.speciesCardDots?.[6]?.[0] ? ', Fly' : ''}
          </div>
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}>
            <u>Speed Effects</u> {
              subspecies === 'Lithe Evolution'
                ? <span style={{ fontWeight: 'normal', color: '#000' }}>Ignore <i>Rough Terrain</i> & <i>Dangerous Terrain</i></span>
                : subclass === 'Naturalist'
                ? (() => {
                    const hasDangerousTerrain = (sheet?.subclassProgressionDots as any)?.naturalistFeatureDangerousDots?.[0];
                    return (
                      <span style={{ fontWeight: 'normal', color: '#000' }}>
                        Ignore <i>Obstacles</i>, <i>Rough Terrain</i>{hasDangerousTerrain ? ' & ' : ''}{hasDangerousTerrain ? <i>Dangerous Terrain</i> : ''}
                      </span>
                    );
                  })()
                : subclass === 'Tactician'
                ? <span style={{ fontWeight: 'normal', color: '#000' }}>Ignore <i>Rough Terrain</i></span>
                : subclass === 'Chaos' 
                ? (() => {
                    const chaosFeatureMoveDots = (sheet?.subclassProgressionDots as any)?.chaosFeatureMoveDots || [false, false, false];
                    const moveDistance = 2 + chaosFeatureMoveDots.filter(Boolean).length;
                    return (
                      <span style={{ fontWeight: 'normal', color: '#000' }}>
                        Immediately <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{moveDistance}]</b>hx after taking Damage
                      </span>
                    );
                  })()
                : subclass === 'Pistoleer'
                ? (() => {
                    const pistoleerFeatureMoveDots = (sheet?.subclassProgressionDots as any)?.pistoleerFeatureMoveDots || [false, false];
                    const moveDistance = 1 + pistoleerFeatureMoveDots.filter(Boolean).length;
                    return (
                      <span style={{ fontWeight: 'normal', color: '#000' }}>
                        When you Damage an enemy, <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{moveDistance}]</b>hx
                      </span>
                    );
                  })()
                : sheet?.species === 'Avenoch'
                ? (() => {
                    const moveAfterCritDots = sheet?.speciesCardDots?.[0] || [false, false, false];
                    const moveWhenHitDots = sheet?.speciesCardDots?.[1] || [false, false, false];
                    const moveAfterCrit = 2 + moveAfterCritDots.filter(Boolean).length * 2;
                    const moveWhenHit = moveWhenHitDots.filter(Boolean).length;
                    const hasWhenHit = moveWhenHit > 0;
                    
                    return (
                      <span style={{ fontWeight: 'normal', color: '#000' }}>
                        <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{moveAfterCrit}]</b>hx after a Crit on an <b><i style={{ color: '#990000' }}>Attack</i></b>
                        {hasWhenHit && (
                          <>
                            ; <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{moveWhenHit}]</b>hx when hit by a <b><i style={{ color: '#351c75' }}>Strike</i></b>
                          </>
                        )}
                      </span>
                    );
                  })()
                : hostSpecies === 'Avenoch Host'
                ? <span style={{ fontWeight: 'normal', color: '#000' }}>
                    <b><i style={{ color: '#38761d' }}>Move</i></b> 2hx after a Crit on an <b><i style={{ color: '#990000' }}>Attack</i></b>
                  </span>
                : hostSpecies === 'Drifting Chloroptid Host'
                ? <span style={{ fontWeight: 'normal', color: '#000' }}>
                    <b><i style={{ color: '#38761d' }}>Move</i></b> 1hx after you take any Damage
                  </span>
                : subspecies === 'Drifting'
                ? (() => {
                    const driftingMoveDots = sheet?.subspeciesCardDots?.[0] || [];
                    const moveDistance = 1 + driftingMoveDots.filter(Boolean).length;
                    return (
                      <span style={{ fontWeight: 'normal', color: '#000' }}>
                        <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{moveDistance}]</b>hx after you take any Damage
                      </span>
                    );
                  })()
                : subspecies === 'Felid'
                ? (() => {
                    const hasCreatureJump = sheet?.subspeciesCardDots?.[6]?.[0];
                    const jumpDamageCount = sheet?.subspeciesCardDots?.[9]?.filter(Boolean).length || 0;
                    return hasCreatureJump && jumpDamageCount > 0 ? (
                      <span style={{ fontWeight: 'normal', color: '#000' }}>
                        +<b>[{jumpDamageCount}]</b>d6 <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage on <b><i style={{ color: '#38761d' }}>Jump</i></b> target(s)
                      </span>
                    ) : null;
                  })()
                : hostSpecies === 'Lithe Human Host'
                ? <span style={{ fontWeight: 'normal', color: '#000' }}>
                    Ignore <i>Rough Terrain</i> and <i>Dangerous Terrain</i>
                  </span>
                : resistances
            }
          </div>
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}><u>Jump Amount</u> {kineticJumpAmountBonus > 0 ? kineticJumpAmountBonus : mercurialJumpAmountBonus > 0 ? mercurialJumpAmountBonus : pyranJumpAmountBonus > 0 ? pyranJumpAmountBonus : mantidJumpAmountBonus > 0 ? mantidJumpAmountBonus : felidJumpAmountBonus > 0 ? felidJumpAmountBonus : mustelidJumpAmountBonus > 0 ? mustelidJumpAmountBonus : "0"}</div>
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}><u>Jump Speed</u> {(kineticJumpSpeedBonus > 0 ? kineticJumpSpeedBonus : mercurialJumpSpeedBonus > 0 ? mercurialJumpSpeedBonus : pyranJumpSpeedBonus > 0 ? pyranJumpSpeedBonus : mantidJumpSpeedBonus > 0 ? mantidJumpSpeedBonus : felidJumpSpeedBonus > 0 ? felidJumpSpeedBonus : mustelidJumpSpeedBonus > 0 ? mustelidJumpSpeedBonus : "") + (kineticJumpSpeedBonus > 0 || mercurialJumpSpeedBonus > 0 || pyranJumpSpeedBonus > 0 || mantidJumpSpeedBonus > 0 || felidJumpSpeedBonus > 0 || mustelidJumpSpeedBonus > 0 ? "hx" : "0hx")}</div>
        </div>
      </div>

      <div className={styles.strikeCard}>
  <h3 style={{ fontFamily: 'Arial, sans-serif' }}>Strike</h3>
        <div className={styles.cardContent}>
          <div className={styles.horizontalLabel} style={{ color: '#351c75', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#351c75', marginRight: 4 }}><u>Strike Damage</u></span>
            {charClass === 'Technician' ? (
              (() => {
                const strikeDots = sheet?.classCardDots?.[11] || [];
                const numDice = 1 + strikeDots.filter(Boolean).length;
                return (
                  <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                    {numDice}d6&nbsp;
                    <span style={{ color: '#d5d52a', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
                      Electric
                      <img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  </span>
                );
              })()
            ) : charClass === 'Chemist' ? (
              <span style={{ fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateChemistStrikeJSX(sheet?.classCardDots, 'charactersheet')}
              </span>
            ) : charClass === 'Commander' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateCommanderStrikeJSX(
                  sheet?.classCardDots, 
                  'charactersheet',
                  (sheet?.subclassProgressionDots as any)?.galvanicStrikeDamageDots,
                  (sheet?.subclassProgressionDots as any)?.tyrantStrikeDamageDots
                )}
                {subclass === 'Beguiler' && (
                  <>
                    &nbsp;
                    <span style={{ color: '#a929ff', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
                      Neural
                      <img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  </>
                )}
                {subclass === 'Galvanic' && (
                  <>
                    &nbsp;
                    <span style={{ color: '#808080', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
                      Slashing
                      <img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  </>
                )}
                  {subclass === 'Tactician' && (
                    <>
                      &nbsp;
                      <span style={{ color: '#a6965f', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
                        Piercing
                        <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                      </span>
                    </>
                  )}
                  {subclass === 'Tyrant' && (
                    <>
                      &nbsp;
                      <span style={{ color: '#915927', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
                        Bludgeoning
                        <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                      </span>
                    </>
                  )}
              </span>
            ) : subclass === 'Naturalist' ? (
              generateNaturalistStrikeJSX(sheet)
            ) : subclass === 'Technologist' ? (
              generateTechnologistStrikeJSX(sheet)
            ) : subclass === 'Divinist' ? (
              <span style={{ fontWeight: 'normal', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                1d6&nbsp;
                <span style={{ color: '#a929ff', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
                  Neural
                  <img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              </span>
            ) : subclass === 'Coercive' ? (
              <span style={{ fontWeight: 'normal', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                1d6&nbsp;
                <span style={{ color: '#a929ff', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
                  Neural
                  <img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              </span>
            ) : subclass === 'Inertial' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateInertialStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Kinetic' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateKineticStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Mercurial' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateMercurialStrikeDamageJSX(sheet)}&nbsp;<span style={{ fontWeight: 'normal' }}>(equipped <i style={{ color: '#941c6c' }}>Mercurial Discipline</i> Damage type)</span>
              </span>
            ) : subclass === 'Vectorial' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4 }}>
                {generateVectorialStrikeDamageJSX(sheet)} <span style={{ fontWeight: 'normal' }}>(equipped <i style={{ color: '#116372' }}>Focus</i> Damage Type)</span>
              </span>
            ) : subclass === 'Astral' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateAstralStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Chaos' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateChaosStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Order' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateOrderStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Void' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateVoidStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Air' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateAirStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Earth' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateEarthStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Fire' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateFireStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Water' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateWaterStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Aeronaut' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateAeronautStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Brawler' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateBrawlerStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Dreadnaught' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateDreadnaughtStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Spectre' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateSpectreStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Ammo Coder' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateAmmoCoderStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Ordnancer' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateOrdnancerStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Pistoleer' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generatePistoleerStrikeDamageJSX(sheet)}
              </span>
            ) : subclass === 'Sniper' ? (
              <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                {generateSniperStrikeDamageJSX(sheet)}
              </span>
            ) : <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4 }}>{strikeDamage}</span>}
            {species === 'Cerebronych' && sheet?.subspeciesCardDots?.[0]?.[0] && (
              <span style={{ fontWeight: 'normal', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
                or&nbsp;<b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>
              </span>
            )}
          </div>
          <div className={styles.horizontalLabel} style={{ color: '#351c75', fontWeight: 'bold' }}><u>Multi Strike</u> <span style={{ color: '#000' }}>{
            (() => {
              // Calculate base multiStrike (default is 1, not shown)
              let calculatedMultiStrike = 1;
              
              // Add Mantid +1 Strike bonus
              if (subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[0]?.[0]) {
                calculatedMultiStrike += 1;
              }
              
              // Check for class/subclass bonuses that override or add
              if (charClass === 'Contemplative') {
                calculatedMultiStrike = 2 + (sheet?.classCardDots?.[1]?.[0] ? 1 : 0) + ((sheet?.subclassProgressionDots as any)?.kineticStrikeMultiStrikeDots?.[0] ? 1 : 0) + ((sheet?.subclassProgressionDots as any)?.mercurialStrikeMultiStrikeDots?.[0] ? 1 : 0) + ((sheet?.subclassProgressionDots as any)?.vectorialStrikeMultiStrikeDots?.[0] ? 1 : 0);
                // Add Mantid bonus to Contemplative
                if (subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[0]?.[0]) {
                  calculatedMultiStrike += 1;
                }
              } else if (subclass === 'Beguiler' && sheet?.subclassProgressionDots?.beguilerStrikeStrikeDots?.[0]) {
                calculatedMultiStrike = 2;
                if (subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[0]?.[0]) {
                  calculatedMultiStrike += 1;
                }
              } else if (subclass === 'Galvanic' && (sheet?.subclassProgressionDots as any)?.galvanicStrikeStrikeDots?.[0]) {
                calculatedMultiStrike = 2;
                if (subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[0]?.[0]) {
                  calculatedMultiStrike += 1;
                }
              } else if (subclass === 'Tactician' && (sheet?.subclassProgressionDots as any)?.tacticianStrikeStrikeDots?.[0]) {
                calculatedMultiStrike = 2;
                if (subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[0]?.[0]) {
                  calculatedMultiStrike += 1;
                }
              } else if (subclass === 'Chaos' && (sheet?.subclassProgressionDots as any)?.chaosStrikeMultiStrikeDots?.[0]) {
                calculatedMultiStrike = 2;
                if (subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[0]?.[0]) {
                  calculatedMultiStrike += 1;
                }
              } else if (subclass === 'Air' && ((sheet?.subclassProgressionDots as any)?.airStrikeMultiStrikeDots?.filter(Boolean).length || 0) > 0) {
                calculatedMultiStrike = 1 + ((sheet?.subclassProgressionDots as any)?.airStrikeMultiStrikeDots?.filter(Boolean).length || 0);
                if (subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[0]?.[0]) {
                  calculatedMultiStrike += 1;
                }
              } else if (subclass === 'Fire' && ((sheet?.subclassProgressionDots as any)?.fireStrikeExtraStrikeDots?.filter(Boolean).length || 0) > 0) {
                calculatedMultiStrike = 1 + ((sheet?.subclassProgressionDots as any)?.fireStrikeExtraStrikeDots?.filter(Boolean).length || 0);
                if (subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[0]?.[0]) {
                  calculatedMultiStrike += 1;
                }
              } else if (subclass === 'Aeronaut' && (sheet?.subclassProgressionDots as any)?.aeronautStrikeExtraDots?.[0]) {
                calculatedMultiStrike = 2;
                if (subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[0]?.[0]) {
                  calculatedMultiStrike += 1;
                }
              } else if (subclass === 'Brawler' && (sheet?.subclassProgressionDots as any)?.brawlerStrikeExtraDots?.[0]) {
                calculatedMultiStrike = 2;
                if (subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[0]?.[0]) {
                  calculatedMultiStrike += 1;
                }
              } else if (subclass === 'Spectre' && (sheet?.subclassProgressionDots as any)?.spectreStrikeExtraDots?.[0]) {
                calculatedMultiStrike = 2;
                if (subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[0]?.[0]) {
                  calculatedMultiStrike += 1;
                }
              } else if (subclass === 'Pistoleer' && ((sheet?.subclassProgressionDots as any)?.pistoleerStrikeDots?.filter(Boolean).length || 0) > 0) {
                calculatedMultiStrike = 1 + ((sheet?.subclassProgressionDots as any)?.pistoleerStrikeDots?.filter(Boolean).length || 0);
                if (subspecies === 'Mantid' && sheet?.subspeciesCardDots?.[0]?.[0]) {
                  calculatedMultiStrike += 1;
                }
              }
              
              // Only show if >= 2
              return calculatedMultiStrike >= 2 ? calculatedMultiStrike : <span style={{ visibility: 'hidden' }}>0</span>;
            })()
          }</span></div>
          <div className={styles.horizontalLabel} style={{ color: '#351c75', fontWeight: 'bold' }}>
              <u>Strike Effects</u> {
                charClass === 'Contemplative' && sheet?.classCardDots?.[2]?.[0]
                  ? <span style={{ color: '#000', fontWeight: 'normal' }}>Can <span style={{ color: '#351c75' }}><b><i>Strike</i></b></span> a single target multiple times</span>
                  : (subclass === 'Naturalist' && sheet?.subclassProgressionDots?.naturalistStrikeDrainDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Drain</i></b></span>
                  : (subclass === 'Technologist' && sheet?.subclassProgressionDots?.technologistStrikeRestrainDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Restrain</i></b></span>
                  : (subclass === 'Divinist' && sheet?.subclassProgressionDots?.divinistStrikeCritDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}>+2 Crit on next <span style={{ color: '#990000' }}><b><i>Attack</i></b></span></span>
                  : (subclass === 'Anatomist' && sheet?.subclassProgressionDots?.anatomistStrikeDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}>Can choose to heal <span style={{ color: '#351c75' }}><b><i>Strike</i></b></span> amount</span>
                  : (subclass === 'Grenadier' && (sheet?.subclassProgressionDots?.grenadierStrikeDots?.filter(Boolean).length || 0) > 0)
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b>[{sheet?.subclassProgressionDots?.grenadierStrikeDots?.filter(Boolean).length}]</b>hx-radius <i>AoE</i></span>
                  : (subclass === 'Coercive' && sheet?.subclassProgressionDots?.coerciveStrikeMesmerizeDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Mesmerize</i></b></span>
                  : (subclass === 'Beguiler' && sheet?.subclassProgressionDots?.beguilerStrikeMesmerizeDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Mesmerize</i></b></span>
                  : (subspecies === 'Corvid' && sheet?.subspeciesCardDots?.[4]?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Blind</i></b></span>
                  : (subspecies === 'Falcador')
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
      Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b><b>)</b></span>
                  : (subspecies === 'Nocturne' && sheet?.subspeciesCardDots?.[4]?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Mesmerize</i></b></span>
                  : (subspecies === 'Vulturine' && sheet?.subspeciesCardDots?.[3]?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#38761d', display: 'inline-flex', alignItems: 'center' }}>
      Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b><b>)</b></span>
                  : (subspecies === 'Carnivorous')
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}>
                        <b><i>Drain</i></b>
                        {sheet?.subspeciesCardDots?.[3]?.[0] && (
                          <span>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
                            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
                          </u></b><b>)</b></span>
                        )}
                      </span>
                  : (subspecies === 'Viny' && (sheet?.subspeciesCardDots?.[4]?.[0] || sheet?.subspeciesCardDots?.[5]?.[0]))
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}>
                        {sheet?.subspeciesCardDots?.[4]?.[0] && (
                          <span>Can deal <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
                            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
                          </u></b> instead</span>
                        )}
                        {sheet?.subspeciesCardDots?.[5]?.[0] && (
                          <span>{sheet?.subspeciesCardDots?.[4]?.[0] ? ', ' : ''}<b><i>Sleep</i></b></span>
                        )}
                      </span>
                  : (subspecies === 'Infrared' && sheet?.subspeciesCardDots?.[3]?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><b>)</b></span>
                  : (subspecies === 'Radiofrequent' && sheet?.subspeciesCardDots?.[4]?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Confuse</i></b></span>
                  : (subspecies === 'Pyran' && sheet?.subspeciesCardDots?.[11]?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><b>)</b></span>
                  : (subspecies === 'Petran' && sheet?.subspeciesCardDots?.[10]?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Restrain</i></b></span>
                  : (subspecies === 'Apocritan' && sheet?.subspeciesCardDots?.[11]?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Restrain</i></b></span>
                  : (subspecies === 'Dynastes')
                    ? (() => {
                        const sizeBonus = (sheet?.subspeciesCardDots?.[0]?.filter(Boolean).length || 0) * 2;
                        return <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Bounce</i></b> <b>[{5 + sizeBonus}]</b>hx</span>;
                      })()
                  : (subspecies === 'Mantid')
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}>Can <b><i style={{ color: '#351c75' }}>Strike</i></b> adjacent creatures</span>
                  : (hostSpecies === 'Vulturine Avenoch Host')
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}>+2d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b> if target is reduced to 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
                  : (subspecies === 'Vulturine')
                    ? (() => {
                        const healingBonus = sheet?.subspeciesCardDots?.[0]?.filter(Boolean).length ?? 0;
                        const totalDice = 2 + healingBonus * 2;
                        return (
                          <span style={{ color: '#000', fontWeight: 'normal' }}>
                            +<b>[{totalDice}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b> if target is reduced to 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b>
                          </span>
                        );
                      })()
                  : (hostSpecies === 'Mantid Entomos Host')
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}>Can <b><i style={{ color: '#351c75' }}>Strike</i></b> in adjacent hx instead of <b><i style={{ color: '#38761d' }}>Moving</i></b> through</span>
                  : (subclass === 'Galvanic' && ((sheet?.subclassProgressionDots as any)?.galvanicStrikeAoEDots?.filter(Boolean).length || 0) > 0)
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><i>AoE</i> <b>[{((sheet?.subclassProgressionDots as any)?.galvanicStrikeAoEDots?.filter(Boolean).length || 0)}]</b>hx-Radius</span>
                  : (subclass === 'Tyrant' && (sheet?.subclassProgressionDots as any)?.tyrantStrikeDemorizeDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Demoralize</i></b></span>
                  : (sheet?.species === 'Praedari' && sheet?.speciesCardDots?.[8]?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#888', display: 'inline-flex', alignItems: 'center' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><b>)</b></span>
                  : (subclass === 'Inertial')
                    ? generateInertialStrikeEffectsJSX(sheet) || strikeEffects
                  : (subclass === 'Kinetic')
                    ? generateKineticStrikeEffectsJSX(sheet) || strikeEffects
                  : (subclass === 'Mercurial')
                    ? generateMercurialStrikeEffectsJSX(sheet) || strikeEffects
                  : (subclass === 'Vectorial')
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b>[{generateVectorialStrikeRangeJSX(sheet)}]</b>hx <b><i style={{ color: '#351c75' }}>Strike</i></b> Range</span>
                  : (subclass === 'Void' && (sheet?.subclassProgressionDots as any)?.voidStrikeInflictDrainDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Drain</i></b></span>
                  : (subclass === 'Air' && (sheet?.subclassProgressionDots as any)?.airStrikeInflictSlamDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Slam</i></b> 3hx</span>
                  : (subclass === 'Earth' && (sheet?.subclassProgressionDots as any)?.earthStrikeInflictRestrainDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Restrain</i></b></span>
                  : (subclass === 'Fire' && (sheet?.subclassProgressionDots as any)?.fireStrikeInflictSpikeDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
      Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b><b>)</b></span>
                  : (subclass === 'Water' && (sheet?.subclassProgressionDots as any)?.waterStrikeInflictDemoralizeDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Demoralize</i></b></span>
                  : (subclass === 'Brawler')
                    ? generateBrawlerStrikeEffectsJSX(sheet) || strikeEffects
                  : (subclass === 'Hacker' && (sheet?.subclassProgressionDots as any)?.hackerStrikeForcedTeleportationDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}>Forced <b><i style={{ color: '#38761d' }}>Teleportation</i></b> to hx adjacent to <i>Drone</i> against 3hx or smaller enemy</span>
                  : (species === 'Cerebronych' && sheet?.subspeciesCardDots?.[1]?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}>
                        <b><i style={{ color: '#5f5e2b' }}>Infest.</i></b> When you destroy a creature with a <b><i style={{ color: '#351c75' }}>Strike</i></b> using <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
                          Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
                        </u></b> Damage, the creature instead stays at 1 <b><i style={{ color: '#990000' }}>Hit Point</i></b> and is under your complete control until the end of the encounter. If the creature dies, you lose control. After the battle, you can choose to inhabit the creature and abandon your current host, as long as that creature is a playable species. If you choose not to take on the new host, the creature you infest dies. Consult your DM for more information.
                      </span>
                  : (subspecies === 'X-Ray' && sheet?.subspeciesCardDots?.[4]?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Blind</i></b></span>
                    : strikeEffects
              }
          </div>
        </div>
      </div>

      {/* Damage Interactions Section */}
      <div className={styles.damageInteractionsCard}>
  <h3 style={{ fontFamily: 'Arial, sans-serif' }}>Damage Interactions</h3>
        <div className={styles.cardContent}>
            <div style={{ fontWeight: 'bold', marginBottom: 6, fontFamily: 'Arial, sans-serif', color: '#666666', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              <u>Resistances</u>
              {charClass === 'Exospecialist' && (
                <span style={{ marginLeft: 8, display: 'inline-flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', color: '#915927', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Bludgeoning</u> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', color: '#a6965f', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Piercing</u> <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', color: '#808080', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Slashing</u> <img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                </span>
              )}
              {subclass === 'Inertial' && (
                <span style={{ marginLeft: 8, fontStyle: 'normal', color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  all Damage (when not suffering <i>Sleep</i>)
                </span>
              )}
              {charClass === 'Contemplative' && !(sheet?.classCardDots?.[0]?.[0]) && (
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#a929ff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Neural</u> <img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              )}
              {subclass === 'Poisoner' && (
                <span style={{ marginLeft: 8, display: 'inline-flex', gap: 8, flexWrap: 'wrap' }}>
                  {!sheet?.subclassProgressionDots?.poisonerChemicalImmunityDots?.[0] && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#de7204', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Chemical</u> <img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                  {!sheet?.subclassProgressionDots?.poisonerToxicImmunityDots?.[0] && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#02b900', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Toxic</u> <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                </span>
              )}
              {subclass === 'Air' && (
                <span style={{ marginLeft: 8, display: 'inline-flex', gap: 8, flexWrap: 'wrap' }}>
                  {!(sheet?.subclassProgressionDots as any)?.airFeatureForceImmunityDots?.[0] && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#516fff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Force</u> <img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                  {(sheet?.subclassProgressionDots as any)?.airFeatureElectricResistanceDots?.[0] && !(sheet?.subclassProgressionDots as any)?.airFeatureElectricImmunityDots?.[0] && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#d5d52a', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Electric</u> <img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                </span>
              )}
              {subclass === 'Earth' && (
                <span style={{ marginLeft: 8, display: 'inline-flex', gap: 8, flexWrap: 'wrap' }}>
                  {!(sheet?.subclassProgressionDots as any)?.earthFeatureBludgeoningImmunityDots?.[0] && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#915927', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Bludgeoning</u> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                  {(sheet?.subclassProgressionDots as any)?.earthFeatureSlashingResistanceDots?.[0] && !(sheet?.subclassProgressionDots as any)?.earthFeatureSlashingImmunityDots?.[0] && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#808080', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Slashing</u> <img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                </span>
              )}
              {subclass === 'Fire' && (
                <span style={{ marginLeft: 8, display: 'inline-flex', gap: 8, flexWrap: 'wrap' }}>
                  {!(sheet?.subclassProgressionDots as any)?.fireFeatureFireImmunityDots?.[0] && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#f90102', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Fire</u> <img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                  {(sheet?.subclassProgressionDots as any)?.fireFeatureChemicalResistanceDots?.[0] && !(sheet?.subclassProgressionDots as any)?.fireFeatureChemicalImmunityDots?.[0] && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#de7204', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Chemical</u> <img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                </span>
              )}
              {subclass === 'Water' && (
                <span style={{ marginLeft: 8, display: 'inline-flex', gap: 8, flexWrap: 'wrap' }}>
                  {!(sheet?.subclassProgressionDots as any)?.waterFeatureColdImmunityDots?.[0] && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#3ebbff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Cold</u> <img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                  {(sheet?.subclassProgressionDots as any)?.waterFeatureToxicResistanceDots?.[0] && !(sheet?.subclassProgressionDots as any)?.waterFeatureToxicImmunityDots?.[0] && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#02b900', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Toxic</u> <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                </span>
              )}
              {species === 'Cerebronych' && (
                <span style={{ marginLeft: 8, display: 'inline-flex', gap: 8, flexWrap: 'wrap' }}>
                  {!sheet?.speciesCardDots?.[2]?.[0] && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#de7204', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Chemical</u> <img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                  {!sheet?.speciesCardDots?.[1]?.[0] && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#02b900', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Toxic</u> <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                </span>
              )}
              {hostSpecies === 'Viny Chloroptid Host' && (
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#a6965f', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Piercing</u> <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              )}
              {subspecies === 'Viny' && (
                <span style={{ marginLeft: 8, display: 'inline-flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', color: '#a6965f', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Piercing</u> <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                  {sheet?.subspeciesCardDots?.[1]?.[0] && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#915927', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Bludgeoning</u> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                </span>
              )}
              {species === 'Cognizant' && !sheet?.speciesCardDots?.[0]?.[0] && (
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#02b900', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Toxic</u> <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              )}
              {subspecies === 'Android' && sheet?.subspeciesCardDots?.[0]?.[0] && !sheet?.subspeciesCardDots?.[1]?.[0] && (
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#a929ff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Neural</u> <img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              )}
              {hostSpecies === 'Cognizant Host' && (
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#02b900', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Toxic</u> <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              )}
              {species === 'Emberfolk' && !sheet?.speciesCardDots?.[0]?.[0] && (
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#f90102', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Fire</u> <img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              )}
              {hostSpecies === 'Emberfolk Host' && (
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#f90102', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Fire</u> <img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              )}
              {subspecies === 'Petran' && !sheet?.subspeciesCardDots?.[0]?.[0] && (
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#915927', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Bludgeoning</u> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              )}
              {subspecies === 'Petran' && sheet?.subspeciesCardDots?.[1]?.[0] && (
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#a6965f', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Piercing</u> <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              )}
              {subspecies === 'Petran' && sheet?.subspeciesCardDots?.[2]?.[0] && (
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#808080', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Slashing</u> <img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              )}
              {hostSpecies === 'Petran Emberfolk Host' && (
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#915927', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Bludgeoning</u> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              )}
              {hostSpecies === 'Human Host' && sheet?.humanHostDamageTypes && sheet.humanHostDamageTypes.length > 0 && (
                <>
                  {sheet.humanHostDamageTypes.map((type, index) => {
                    const damageTypeColors: { [key: string]: string } = {
                      'Chemical': '#de7204',
                      'Cold': '#3ebbff',
                      'Electric': '#d5d52a',
                      'Fire': '#f90102',
                      'Force': '#516fff',
                      'Neural': '#a929ff',
                      'Toxic': '#02b900'
                    };
                    const damageTypeIcons: { [key: string]: string } = {
                      'Chemical': '/Chemical.png',
                      'Cold': '/Cold.png',
                      'Electric': '/Electric.png',
                      'Fire': '/Fire.png',
                      'Force': '/Force.png',
                      'Neural': '/Neural.png',
                      'Toxic': '/Toxic.png'
                    };
                    return (
                      <span key={index} style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: damageTypeColors[type], wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        <u>{type}</u> <img src={damageTypeIcons[type]} alt={type} style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                      </span>
                    );
                  })}
                </>
              )}
              {species === 'Human' && sheet?.humanDamageTypes && sheet.humanDamageTypes.length > 0 && (
                <>
                  {sheet.humanDamageTypes.map((type, index) => {
                    const damageTypeColors: { [key: string]: string } = {
                      'Chemical': '#de7204',
                      'Cold': '#3ebbff',
                      'Electric': '#d5d52a',
                      'Fire': '#f90102',
                      'Force': '#516fff',
                      'Neural': '#a929ff',
                      'Toxic': '#02b900'
                    };
                    const damageTypeIcons: { [key: string]: string } = {
                      'Chemical': '/Chemical.png',
                      'Cold': '/Cold.png',
                      'Electric': '/Electric.png',
                      'Fire': '/Fire.png',
                      'Force': '/Force.png',
                      'Neural': '/Neural.png',
                      'Toxic': '/Toxic.png'
                    };
                    return (
                      <span key={index} style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: damageTypeColors[type], wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        <u>{type}</u> <img src={damageTypeIcons[type]} alt={type} style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                      </span>
                    );
                  })}
                </>
              )}
              {subspecies === 'Stout Evolution' && sheet?.subspeciesCardDots?.[1]?.[0] && !sheet?.subspeciesCardDots?.[2]?.[0] && (
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#02b900', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Toxic</u> <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              )}
              {species === 'Lumenaren' && !sheet?.speciesCardDots?.[0]?.[0] && !sheet?.speciesCardDots?.[1]?.[0] && (
                <>
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#d5d52a', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Electric</u> <img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#516fff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Force</u> <img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                </>
              )}
              {hostSpecies === 'Lumenaren Host' && (
                <>
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#d5d52a', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Electric</u> <img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#516fff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Force</u> <img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                </>
              )}
              {hostSpecies === 'Ursid Praedari Host' && (
                <>
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#3ebbff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Cold</u> <img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#915927', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Bludgeoning</u> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                </>
              )}
              {subspecies === 'Ursid' && (
                <>
                  {!sheet?.subspeciesCardDots?.[1]?.[0] && (
                    <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#3ebbff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Cold</u> <img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                  {!sheet?.subspeciesCardDots?.[0]?.[0] && (
                    <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#915927', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Bludgeoning</u> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                  {sheet?.subspeciesCardDots?.[2]?.[0] && !sheet?.subspeciesCardDots?.[3]?.[0] && (
                    <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#d5d52a', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Electric</u> <img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                  {sheet?.subspeciesCardDots?.[4]?.[0] && !sheet?.subspeciesCardDots?.[5]?.[0] && (
                    <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#f90102', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                      <u>Fire</u> <img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                    </span>
                  )}
                </>
              )}
            </div>
          <div style={{ fontWeight: 'bold', marginBottom: 2, fontFamily: 'Arial, sans-serif', color: '#666666', wordBreak: 'break-word', overflowWrap: 'break-word' }}><u>Immunities</u>
            {species === 'Cerebronych' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Confuse</i>
                </span>
                {sheet?.speciesCardDots?.[0]?.[0] && (
                  <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <i>Mesmerize</i>
                  </span>
                )}
                {sheet?.speciesCardDots?.[2]?.[0] && (
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#de7204', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Chemical</u> <img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                )}
                {sheet?.speciesCardDots?.[1]?.[0] && (
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#02b900', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Toxic</u> <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                )}
              </>
            )}
            {hostSpecies === 'Corvid Avenoch Host' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Confuse</i>
                </span>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Mesmerize</i>
                </span>
              </>
            )}
            {hostSpecies === 'Nocturne Avenoch Host' && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Blind</i>
              </span>
            )}
            {species === 'Lumenaren' && sheet?.speciesCardDots?.[0]?.[0] && !sheet?.speciesCardDots?.[1]?.[0] && (
              <>
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#d5d52a', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Electric</u> <img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#516fff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Force</u> <img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              </>
            )}
            {subspecies === 'Barkskin' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Slam</i>
                </span>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Bounce</i>
                </span>
                {sheet?.subspeciesCardDots?.[0]?.[0] && (
                  <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <i>Mesmerize</i>
                  </span>
                )}
              </>
            )}
            {subspecies === 'Dynastes' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Slam</i>
                </span>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Bounce</i>
                </span>
              </>
            )}
            {subspecies === 'Lithe Evolution' && sheet?.subspeciesCardDots?.[0]?.[0] && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Restrain</i>
              </span>
            )}
            {subspecies === 'Radiofrequent' && sheet?.subspeciesCardDots?.[0]?.[0] && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Crits</i>
              </span>
            )}
            {subspecies === 'Stout Evolution' && sheet?.subspeciesCardDots?.[0]?.[0] && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Sleep</i>
              </span>
            )}
            {subspecies === 'Stout Evolution' && sheet?.subspeciesCardDots?.[2]?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#02b900', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Toxic</u> <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {hostSpecies === 'Barkskin Chloroptid Host' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Slam</i>
                </span>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Bounce</i>
                </span>
              </>
            )}
            {species === 'Cognizant' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Drain</i>
                </span>
                {sheet?.speciesCardDots?.[0]?.[0] && (
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#02b900', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Toxic</u> <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                )}
                {sheet?.speciesCardDots?.[1]?.[0] && (
                  <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <i>Sleep</i>
                  </span>
                )}
              </>
            )}
            {hostSpecies === 'Cognizant Host' && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Drain</i>
              </span>
            )}
            {hostSpecies === 'Android Cognizant Host' && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Confuse</i>
              </span>
            )}
            {subspecies === 'Android' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Confuse</i>
                </span>
                {sheet?.subspeciesCardDots?.[1]?.[0] && (
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#a929ff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Neural</u> <img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                )}
                {sheet?.subspeciesCardDots?.[2]?.[0] && (
                  <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <i>Mesmerize</i>
                  </span>
                )}
              </>
            )}
            {subspecies === 'Felid' && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Fall Damage</i>
              </span>
            )}
            {subspecies === 'Mustelid' && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Restrain</i>
              </span>
            )}
            {subspecies === 'Ursid' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Restrain</i>
                </span>
                {sheet?.subspeciesCardDots?.[1]?.[0] && (
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#3ebbff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Cold</u> <img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                )}
                {sheet?.subspeciesCardDots?.[0]?.[0] && (
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#915927', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Bludgeoning</u> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                )}
                {sheet?.subspeciesCardDots?.[3]?.[0] && (
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#d5d52a', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Electric</u> <img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                )}
                {sheet?.subspeciesCardDots?.[5]?.[0] && (
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#f90102', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Fire</u> <img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                )}
              </>
            )}
            {species === 'Emberfolk' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Spike</i>
                </span>
                {sheet?.speciesCardDots?.[0]?.[0] && !sheet?.speciesCardDots?.[1]?.[0] && (
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#f90102', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Fire</u> <img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                )}
              </>
            )}
            {hostSpecies === 'Emberfolk Host' && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Spike</i>
              </span>
            )}
            {subspecies === 'Petran' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Demoralize</i>
                </span>
                {sheet?.subspeciesCardDots?.[0]?.[0] && (
                  <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#915927', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <u>Bludgeoning</u> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                  </span>
                )}
                {sheet?.subspeciesCardDots?.[3]?.[0] && (
                  <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <i>Drain</i>
                  </span>
                )}
              </>
            )}
            {hostSpecies === 'Petran Emberfolk Host' && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Demoralize</i>
              </span>
            )}
            {species === 'Entomos' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Confuse</i>
                </span>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Fall Damage</i>
                </span>
                {sheet?.speciesCardDots?.[0]?.[0] && (
                  <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <i>Mesmerize</i>
                  </span>
                )}
                {sheet?.speciesCardDots?.[1]?.[0] && (
                  <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <i>Sleep</i>
                  </span>
                )}
              </>
            )}
            {hostSpecies === 'Entomos Host' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Confuse</i>
                </span>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Fall Damage</i>
                </span>
              </>
            )}
            {hostSpecies === 'Dynastes Entomos Host' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Slam</i>
                </span>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Bounce</i>
                </span>
              </>
            )}
            {hostSpecies === 'Lumenaren Host' && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Sleep</i>
              </span>
            )}
            {hostSpecies === 'Felid Praedari Host' && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Fall Damage</i>
              </span>
            )}
            {hostSpecies === 'Mustelid Praedari Host' && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Restrain</i>
              </span>
            )}
            {hostSpecies === 'Ursid Praedari Host' && (
              <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Restrain</i>
              </span>
            )}
            {subclass === 'Poisoner' && sheet?.subclassProgressionDots?.poisonerToxicImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#02b900', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Toxic</u> <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {charClass === 'Contemplative' && sheet?.classCardDots?.[0]?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#a929ff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Neural</u> <img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Poisoner' && sheet?.subclassProgressionDots?.poisonerChemicalImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#de7204', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Chemical</u> <img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Tyrant' && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Demoralize</i>
              </span>
            )}
            {subclass === 'Tyrant' && sheet?.subclassProgressionDots?.tyrantFeatureConfuseImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Confuse</i>
              </span>
            )}
            {subclass === 'Tyrant' && sheet?.subclassProgressionDots?.tyrantFeatureMesmerizeImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Mesmerize</i>
              </span>
            )}
            {subclass === 'Coercive' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Confuse</i>
                </span>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Mesmerize</i>
                </span>
              </>
            )}
            {subspecies === 'Corvid' && (
              <>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Confuse</i>
                </span>
                <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <i>Mesmerize</i>
                </span>
                {sheet?.subspeciesCardDots?.[0]?.[0] && (
                  <span style={{ marginLeft: 8, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <i>Demoralize</i>
                  </span>
                )}
              </>
            )}
            {subclass === 'Air' && (sheet?.subclassProgressionDots as any)?.airFeatureForceImmunityDots?.[0] && !(sheet?.subclassProgressionDots as any)?.airFeatureForceAbsorptionDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#516fff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Force</u> <img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Air' && (sheet?.subclassProgressionDots as any)?.airFeatureElectricImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#d5d52a', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Electric</u> <img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Air' && (sheet?.subclassProgressionDots as any)?.airFeatureRestrainImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Restrain</i>
              </span>
            )}
            {subclass === 'Earth' && (sheet?.subclassProgressionDots as any)?.earthFeatureBludgeoningImmunityDots?.[0] && !(sheet?.subclassProgressionDots as any)?.earthFeatureBludgeoningAbsorptionDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#915927', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Bludgeoning</u> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Earth' && (sheet?.subclassProgressionDots as any)?.earthFeatureSlashingImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#808080', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Slashing</u> <img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Earth' && (sheet?.subclassProgressionDots as any)?.earthFeatureSlamImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Slam</i>
              </span>
            )}
            {subclass === 'Fire' && (sheet?.subclassProgressionDots as any)?.fireFeatureFireImmunityDots?.[0] && !(sheet?.subclassProgressionDots as any)?.fireFeatureFireAbsorptionDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#f90102', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Fire</u> <img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Fire' && (sheet?.subclassProgressionDots as any)?.fireFeatureChemicalImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#de7204', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Chemical</u> <img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Fire' && (sheet?.subclassProgressionDots as any)?.fireFeatureDemoralizeImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Demoralize</i>
              </span>
            )}
            {subclass === 'Water' && (sheet?.subclassProgressionDots as any)?.waterFeatureColdImmunityDots?.[0] && !(sheet?.subclassProgressionDots as any)?.waterFeatureColdAbsorptionDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#3ebbff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Cold</u> <img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Water' && (sheet?.subclassProgressionDots as any)?.waterFeatureToxicImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#02b900', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Toxic</u> <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Water' && (sheet?.subclassProgressionDots as any)?.waterFeatureSpikeImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Spike</i>
              </span>
            )}
            {subclass === 'Dreadnaught' && (sheet?.subclassProgressionDots as any)?.dreadnaughtFeatureBounceImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Bounce</i>
              </span>
            )}
            {subclass === 'Dreadnaught' && (sheet?.subclassProgressionDots as any)?.dreadnaughtFeatureMesmerizeImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Mesmerize</i>
              </span>
            )}
            {subclass === 'Dreadnaught' && (sheet?.subclassProgressionDots as any)?.dreadnaughtFeatureRestrainImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Restrain</i>
              </span>
            )}
            {subclass === 'Dreadnaught' && (sheet?.subclassProgressionDots as any)?.dreadnaughtFeatureSlamImmunityDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <i>Slam</i>
              </span>
            )}
          </div>
          <div style={{ fontWeight: 'bold', marginBottom: 2, fontFamily: 'Arial, sans-serif', color: '#666666', wordBreak: 'break-word', overflowWrap: 'break-word' }}><u>Absorptions</u>
            {species === 'Lumenaren' && sheet?.speciesCardDots?.[1]?.[0] && (
              <>
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#d5d52a', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Electric</u> <img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#516fff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Force</u> <img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              </>
            )}
            {species === 'Emberfolk' && sheet?.speciesCardDots?.[1]?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#f90102', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Fire</u> <img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Air' && (sheet?.subclassProgressionDots as any)?.airFeatureForceAbsorptionDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#516fff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Force</u> <img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Earth' && (sheet?.subclassProgressionDots as any)?.earthFeatureBludgeoningAbsorptionDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#915927', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Bludgeoning</u> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Fire' && (sheet?.subclassProgressionDots as any)?.fireFeatureFireAbsorptionDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#f90102', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Fire</u> <img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
            {subclass === 'Water' && (sheet?.subclassProgressionDots as any)?.waterFeatureColdAbsorptionDots?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#3ebbff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Cold</u> <img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
          </div>
        </div>
      </div>


      <CharacterSheetInventory
        sheet={sheet}
        charClass={charClass}
        subclass={subclass}
        pendingAttack={pendingAttack}
        setPendingAttack={setPendingAttack}
        pendingSecondaryAttack={pendingSecondaryAttack}
        setPendingSecondaryAttack={setPendingSecondaryAttack}
        getAvailablePrimaryAttacks={getAvailablePrimaryAttacks}
        getAvailableSecondaryAttacks={getAvailableSecondaryAttacks}
        handleAttackPurchase={handleAttackPurchase}
        handleAttackAdd={handleAttackAdd}
        handleSecondaryAttackPurchase={handleSecondaryAttackPurchase}
        handleSecondaryAttackAdd={handleSecondaryAttackAdd}
        handleAutoSave={handleAutoSave}
      />


      {/* Background card: row 4, column 4 */}
      <div className={styles.backgroundCard}>
  <h3 style={{ marginTop: 0, textDecoration: 'underline', fontFamily: 'Arial, sans-serif' }}>Background</h3>
        <div className={styles.cardContent}>
          <CharacterSheetBackground sheet={sheet} />
        </div>
      </div>

      <CharacterSheetPerks
        sheet={sheet}
        charClass={charClass}
        subclass={subclass}
        subspecies={subspecies}
      />

      {/* Portrait card */}
      <div className={styles.portraitCard}>
  <h3 style={{ marginTop: 0, textDecoration: 'underline', fontFamily: 'Arial, sans-serif' }}>Portrait</h3>
        <div className={styles.cardContent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 100 }}>
          {portraitUrl ? (
            <div style={{ position: 'relative', width: '95%' }}>
              <img 
                src={portraitUrl} 
                alt="Character Portrait" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  margin: '0 auto 12px auto', 
                  display: 'block', 
                  borderRadius: 8, 
                  border: '1px solid #ccc',
                  cursor: 'pointer'
                }}
                onClick={() => setShowPortraitOptions(!showPortraitOptions)}
              />
              {showPortraitOptions && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  padding: '10px',
                  display: 'flex',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  <button
                    style={{ 
                      padding: '8px 16px', 
                      fontSize: '0.9em', 
                      borderRadius: 4, 
                      border: '1px solid #888', 
                      background: '#f0f0f0', 
                      cursor: 'pointer', 
                      fontFamily: 'Arial, sans-serif' 
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPortraitOptions(false);
                      portraitInputRef.current && portraitInputRef.current.click();
                    }}
                  >
                    Change
                  </button>
                  <button
                    style={{ 
                      padding: '8px 16px', 
                      fontSize: '0.9em', 
                      borderRadius: 4, 
                      border: '1px solid #c00', 
                      background: '#fff0f0', 
                      color: '#c00', 
                      cursor: 'pointer', 
                      fontFamily: 'Arial, sans-serif' 
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPortraitOptions(false);
                      setPortraitUrl(null);
                      handleAutoSave({ portrait: undefined });
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ) : null}
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={portraitInputRef}
            onChange={e => {
              const file = e.target.files && e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = ev => {
                  const newPortraitUrl = ev.target?.result as string;
                  setPortraitUrl(newPortraitUrl);
                  handleAutoSave({ portrait: newPortraitUrl });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          {!portraitUrl && (
            <button
              style={{ padding: '10px 20px', fontSize: '1em', borderRadius: 6, border: '1px solid #888', background: '#f0f0f0', cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}
              onClick={() => portraitInputRef.current && portraitInputRef.current.click()}
            >
              Add Character Portrait
            </button>
          )}
        </div>
      </div>
      </div> {/* End characterSheetGrid */}

      {/* Floating Navigation Button */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        {/* Navigation Menu (expanded state) */}
        {isNavExpanded && (
          <div ref={menuRef} style={{
            position: 'absolute',
            top: '60px',
            right: '0px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <button
              onClick={onHome}
              style={{
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 20px',
                fontWeight: 'bold',
                fontSize: '0.9em',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              🏠 Home
            </button>
            
            <button
              disabled
              style={{
                background: '#e9ecef',
                color: '#6c757d',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 20px',
                fontWeight: 'bold',
                fontSize: '0.9em',
                cursor: 'not-allowed',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap',
                opacity: 0.6
              }}
            >
              👤 Character Sheet
            </button>

            <button
              onClick={onCards}
              style={{
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 20px',
                fontWeight: 'bold',
                fontSize: '0.9em',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              🃏 Cards
            </button> 

            <button
              onClick={onLevelUp}
              style={{
                background: '#fd7e14',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 20px',
                fontWeight: 'bold',
                fontSize: '0.9em',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              ⬆️ Level Up
            </button>

          </div>
        )}
        
        {/* Main Waffle Button */}
        <button
          ref={waffleRef}
          className={styles.blueWaffleButton}
          onClick={() => setIsNavExpanded((open) => !open)}
          style={{
            width: '51px',
            height: '51px',
            borderRadius: '50%',
            backgroundColor: '#1976d2',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3em',
            transition: 'all 0.3s ease',
            transform: isNavExpanded ? 'rotate(45deg)' : 'rotate(0deg)'
          }}
          onMouseEnter={(e) => {
            if (!isNavExpanded) {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.backgroundColor = '#1976d2';
              e.currentTarget.style.background = '#1976d2';
            }
          }}
          onMouseLeave={(e) => {
            if (!isNavExpanded) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = '#1976d2';
              e.currentTarget.style.background = '#1976d2';
            }
          }}
        >
          <span style={{ color: 'white', fontSize: '1.3em', lineHeight: 1 }}>{isNavExpanded ? '✕' : '⊞'}</span>
        </button>
      </div>

      {/* XP/SP Summary Button */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999
      }}>
        {/* XP/SP Menu (expanded state) */}
        {isXpSpMenuExpanded && (
          <div ref={xpSpMenuRef} style={{
            position: 'absolute',
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'white',
            border: '2px solid #ccc',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '280px',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* XP Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>xp Total:</span>
                <button
                  className={styles.redMinusButton}
                  onClick={() => {
                    const newValue = Math.max(0, xpTotal - 1);
                    setXpTotal(newValue);
                    handleAutoSave({ xpTotal: newValue });
                  }}
                >
                  −
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={xpTotal}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    const newValue = Math.max(0, parseInt(val) || 0);
                    setXpTotal(newValue);
                    handleAutoSave({ xpTotal: newValue });
                  }}
                  style={{
                    minWidth: '32px',
                    width: '48px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '4px'
                  }}
                />
                <button
                  className={styles.greenPlusButton}
                  onClick={() => {
                    const newValue = xpTotal + 1;
                    setXpTotal(newValue);
                    handleAutoSave({ xpTotal: newValue });
                  }}
                >
                  +
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>xp Spent:</span>
                <span style={{ minWidth: '40px', textAlign: 'center' }}>{sheet?.xpSpent ?? 0}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>Remaining xp:</span>
                <span style={{ minWidth: '40px', textAlign: 'center', color: xpTotal - (sheet?.xpSpent ?? 0) < 0 ? '#d32f2f' : '#000' }}>{xpTotal - (sheet?.xpSpent ?? 0)}</span>
              </div>

              <hr style={{ margin: '8px 0', border: '1px solid #eee' }} />

              {/* SP Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>sp Total:</span>
                <button
                  className={styles.redMinusButton}
                  onClick={() => {
                    const newValue = Math.max(0, spTotal - 1);
                    setSpTotal(newValue);
                    handleAutoSave({ spTotal: newValue });
                  }}
                >
                  −
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={spTotal}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    const newValue = Math.max(0, parseInt(val) || 0);
                    setSpTotal(newValue);
                    handleAutoSave({ spTotal: newValue });
                  }}
                  style={{
                    minWidth: '32px',
                    width: '48px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '4px'
                  }}
                />
                <button
                  className={styles.greenPlusButton}
                  onClick={() => {
                    const newValue = spTotal + 1;
                    setSpTotal(newValue);
                    handleAutoSave({ spTotal: newValue });
                  }}
                >
                  +
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>sp Spent:</span>
                <span style={{ minWidth: '40px', textAlign: 'center' }}>{spSpent}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>Remaining sp:</span>
                <span style={{ minWidth: '40px', textAlign: 'center', color: spTotal - spSpent < 0 ? '#d32f2f' : '#000' }}>{spTotal - spSpent}</span>
              </div>
            </div>
          </div>
        )}

        {/* Main XP/SP Button */}
        <button
          ref={xpSpButtonRef}
          className={styles.xpSpButton}
          onClick={() => setIsXpSpMenuExpanded((open) => !open)}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            transform: isXpSpMenuExpanded ? 'scale(1.05)' : 'scale(1)'
          }}
          onMouseEnter={(e) => {
            if (!isXpSpMenuExpanded) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isXpSpMenuExpanded) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }
          }}
        >
          xp: {xpTotal - (sheet?.xpSpent ?? 0)}/{xpTotal} | sp: {spTotal - spSpent}/{spTotal}
        </button>
      </div>

      {/* Credits Summary Button */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 999
      }}>
        {/* Credits Menu (expanded state) */}
        {isCreditsMenuExpanded && (
          <div ref={creditsMenuRef} style={{
            position: 'absolute',
            bottom: '50px',
            left: '0px',
            background: 'white',
            border: '2px solid #ccc',
            borderRadius: '12px',
            padding: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '280px',
            maxWidth: 'calc(100vw - 40px)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Current Credits Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px', fontSize: '16px' }}>Credits:</span>
                <button
                  className={styles.redMinusButton}
                  style={{ width: '26px', height: '26px', fontSize: '14px' }}
                  onClick={() => {
                    const newValue = Math.max(0, credits - 1);
                    setCredits(newValue);
                    handleAutoSave({ credits: newValue });
                  }}
                >
                  −
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={credits}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    const newValue = Math.max(0, parseInt(val) || 0);
                    setCredits(newValue);
                    handleAutoSave({ credits: newValue });
                  }}
                  style={{
                    width: '50px',
                    textAlign: 'center',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '4px 6px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                />
                <button
                  className={styles.greenPlusButton}
                  style={{ width: '26px', height: '26px', fontSize: '14px' }}
                  onClick={() => {
                    const newValue = credits + 1;
                    setCredits(newValue);
                    handleAutoSave({ credits: newValue });
                  }}
                >
                  +
                </button>
              </div>

              <hr style={{ margin: '8px 0', border: '1px solid #eee' }} />

              {/* Bulk Credits Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 'bold', minWidth: '80px' }}>Add/Subtract:</span>
                <button
                  className={styles.redMinusButton}
                  style={{ width: '48px', height: '24px', fontSize: '12px', padding: '0' }}
                  onClick={() => {
                    if (!creditsDelta) return;
                    const newValue = Math.max(0, credits - creditsDelta);
                    setCredits(newValue);
                    handleAutoSave({ credits: newValue });
                  }}
                  title="Subtract from Credits"
                >
                  -
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min="1"
                  max="999"
                  value={creditsDelta || ''}
                  onChange={e => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setCreditsDelta(val ? parseInt(val) : 0);
                  }}
                  style={{ width: '40px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '2px 4px' }}
                  placeholder="#"
                />
                <button
                  className={styles.greenPlusButton}
                  style={{ width: '48px', height: '24px', fontSize: '12px', padding: '0' }}
                  onClick={() => {
                    if (!creditsDelta) return;
                    const newValue = credits + creditsDelta;
                    setCredits(newValue);
                    handleAutoSave({ credits: newValue });
                  }}
                  title="Add to Credits"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          ref={creditsButtonRef}
          className={styles.creditsButton}
          onClick={() => setIsCreditsMenuExpanded((open) => !open)}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            transform: isCreditsMenuExpanded ? 'scale(1.05)' : 'scale(1)'
          }}
          onMouseEnter={(e) => {
            if (!isCreditsMenuExpanded) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isCreditsMenuExpanded) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }
          }}
        >
          c: {credits}
        </button>
      </div>

      {/* HP Summary Button */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999
      }}>
        {/* HP Menu (expanded state) */}
        {isHpMenuExpanded && (
          <div ref={hpMenuRef} style={{
            position: 'absolute',
            bottom: '50px',
            right: '0px',
            background: 'white',
            border: '2px solid #ccc',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '280px',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Current HP Section - Top Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Current Hit Points:</span>
                  <button
                    className={styles.redMinusButton}
                    style={{ width: '26px', height: '26px', fontSize: '14px' }}
                    onClick={() => {
                      const newValue = Math.max(0, currentHitPoints - 1);
                      setCurrentHitPoints(newValue);
                      handleAutoSave({ currentHitPoints: newValue });
                    }}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={currentHitPoints}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      const newValue = Math.max(0, parseInt(val) || 0);
                      setCurrentHitPoints(newValue);
                      handleAutoSave({ currentHitPoints: newValue });
                    }}
                    style={{
                      minWidth: '40px',
                      width: '50px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '4px',
                      MozAppearance: 'textfield',
                    }}
                    autoComplete="off"
                  />
                  <button
                    className={styles.greenPlusButton}
                    style={{ width: '26px', height: '26px', fontSize: '14px' }}
                    onClick={() => {
                      const newValue = currentHitPoints + 1;
                      setCurrentHitPoints(newValue);
                      handleAutoSave({ currentHitPoints: newValue });
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Add/Subtract Section - Top Right */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="1"
                    max="999"
                    value={hpDelta || ''}
                    onChange={e => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setHpDelta(val ? parseInt(val) : 0);
                    }}
                    style={{ width: '40px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '2px 4px' }}
                    placeholder="#"
                  />
                  <button
                    className={styles.redMinusButton}
                    style={{ width: '24px', height: '24px', fontSize: '12px', padding: '0' }}
                    onClick={() => {
                      if (!hpDelta) return;
                      const newValue = Math.max(0, currentHitPoints - hpDelta);
                      setCurrentHitPoints(newValue);
                      handleAutoSave({ currentHitPoints: newValue });
                    }}
                    title="Subtract from HP"
                  >
                    -
                  </button>
                  <button
                    className={styles.greenPlusButton}
                    style={{ width: '24px', height: '24px', fontSize: '12px', padding: '0' }}
                    onClick={() => {
                      if (!hpDelta) return;
                      const newValue = currentHitPoints + hpDelta;
                      setCurrentHitPoints(newValue);
                      handleAutoSave({ currentHitPoints: newValue });
                    }}
                    title="Add to HP"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Max HP Section - Bottom Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Max Hit Points:</span>
                  <span style={{ minWidth: '40px', textAlign: 'center' }}>
                    {charClass === "Exospecialist" 
                      ? maxHitPoints + 20 + aeronautHitPointsBonus + brawlerHitPointsBonus + dreadnaughtHitPointsBonus + spectreHitPointsBonus + avenochHitPointsBonus + cerebronychHitPointsBonus + chloroptidHitPointsBonus + lumenarenHitPointsBonus + barkskinHitPointsBonus + petranHitPointsBonus + pyranHitPointsBonus + apocritanHitPointsBonus + dynastesHitPointsBonus + mantidHitPointsBonus + diminutiveEvolutionHitPointsBonus + litheEvolutionHitPointsBonus + massiveEvolutionHitPointsBonus + stoutEvolutionHitPointsBonus + canidHitPointsBonus + mustelidHitPointsBonus + ursidHitPointsBonus
                      : maxHitPoints + avenochHitPointsBonus + cerebronychHitPointsBonus + chloroptidHitPointsBonus + lumenarenHitPointsBonus + barkskinHitPointsBonus + petranHitPointsBonus + pyranHitPointsBonus + apocritanHitPointsBonus + dynastesHitPointsBonus + mantidHitPointsBonus + diminutiveEvolutionHitPointsBonus + litheEvolutionHitPointsBonus + massiveEvolutionHitPointsBonus + stoutEvolutionHitPointsBonus + canidHitPointsBonus + mustelidHitPointsBonus + ursidHitPointsBonus}
                  </span>
                </div>
                <button
                  className={styles.greenPlusButton}
                  style={{ padding: '6px 36px', fontSize: '14px', whiteSpace: 'nowrap' }}
                  onClick={() => {
                    const maxHP = charClass === "Exospecialist" 
                      ? maxHitPoints + 20 + aeronautHitPointsBonus + brawlerHitPointsBonus + dreadnaughtHitPointsBonus + spectreHitPointsBonus + avenochHitPointsBonus + cerebronychHitPointsBonus + chloroptidHitPointsBonus + lumenarenHitPointsBonus + barkskinHitPointsBonus + petranHitPointsBonus + pyranHitPointsBonus + apocritanHitPointsBonus + dynastesHitPointsBonus + mantidHitPointsBonus + diminutiveEvolutionHitPointsBonus + litheEvolutionHitPointsBonus + massiveEvolutionHitPointsBonus + stoutEvolutionHitPointsBonus + canidHitPointsBonus + mustelidHitPointsBonus + ursidHitPointsBonus
                      : maxHitPoints + avenochHitPointsBonus + cerebronychHitPointsBonus + chloroptidHitPointsBonus + lumenarenHitPointsBonus + barkskinHitPointsBonus + petranHitPointsBonus + pyranHitPointsBonus + apocritanHitPointsBonus + dynastesHitPointsBonus + mantidHitPointsBonus + diminutiveEvolutionHitPointsBonus + litheEvolutionHitPointsBonus + massiveEvolutionHitPointsBonus + stoutEvolutionHitPointsBonus + canidHitPointsBonus + mustelidHitPointsBonus + ursidHitPointsBonus;
                    setCurrentHitPoints(maxHP);
                    handleAutoSave({ currentHitPoints: maxHP });
                  }}
                  title="Full Heal"
                >
                  Full Heal
                </button>
              </div>

              <hr style={{ margin: '0px 0', border: '1px solid #eee' }} />

            {/* Death Count Section - Centered, in black bar, white font, dots turn black when selected */}
            <div style={{
              backgroundColor: 'black',
              borderRadius: '16px',
              padding: '16px 12px 12px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '8px',
              marginBottom: '8px'
            }}>
              <span style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2em',
                textAlign: 'center',
                marginBottom: '4px',
                letterSpacing: '0.5px'
              }}>Death Count</span>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '2px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((dotNumber) => (
                  <div key={dotNumber} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold', marginBottom: '2px' }}>
                      {dotNumber}+
                    </span>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: deathCount >= dotNumber ? 'black' : 'white',
                        border: '2px solid white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => {
                        const newValue = deathCount >= dotNumber ? dotNumber - 1 : dotNumber;
                        setDeathCount(newValue);
                        handleAutoSave({ deathCount: newValue });
                      }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          ref={hpButtonRef}
          className={styles.hpButton}
          onClick={() => setIsHpMenuExpanded((open) => !open)}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            transform: isHpMenuExpanded ? 'scale(1.05)' : 'scale(1)'
          }}
          onMouseEnter={(e) => {
            if (!isHpMenuExpanded) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isHpMenuExpanded) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }
          }}
        >
          hp: {currentHitPoints}/{charClass === "Exospecialist" 
            ? maxHitPoints + 20 + aeronautHitPointsBonus + brawlerHitPointsBonus + dreadnaughtHitPointsBonus + spectreHitPointsBonus + avenochHitPointsBonus + cerebronychHitPointsBonus + chloroptidHitPointsBonus + barkskinHitPointsBonus + petranHitPointsBonus + pyranHitPointsBonus + apocritanHitPointsBonus + dynastesHitPointsBonus + mantidHitPointsBonus + diminutiveEvolutionHitPointsBonus + litheEvolutionHitPointsBonus + massiveEvolutionHitPointsBonus + stoutEvolutionHitPointsBonus + canidHitPointsBonus + mustelidHitPointsBonus + ursidHitPointsBonus
            : maxHitPoints + avenochHitPointsBonus + cerebronychHitPointsBonus + chloroptidHitPointsBonus + barkskinHitPointsBonus + petranHitPointsBonus + pyranHitPointsBonus + apocritanHitPointsBonus + dynastesHitPointsBonus + mantidHitPointsBonus + diminutiveEvolutionHitPointsBonus + litheEvolutionHitPointsBonus + massiveEvolutionHitPointsBonus + stoutEvolutionHitPointsBonus + canidHitPointsBonus + mustelidHitPointsBonus + ursidHitPointsBonus}
        </button>
      </div>

      {/* Chem Tokens Button (only for Chemist class) */}
      {charClass === 'Chemist' && (
        <div style={{
          position: 'fixed',
          bottom: '60px',
          right: '20px',
          zIndex: 999
        }}>
          {/* Chem Tokens Menu (expanded state) */}
          {isChemTokensMenuExpanded && (
            <div ref={chemTokensMenuRef} style={{
              position: 'absolute',
              bottom: '50px',
              right: '0px',
              background: 'white',
              border: '2px solid #721131',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              minWidth: '260px',
              animation: 'fadeIn 0.2s ease-out'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 'bold', minWidth: '120px', fontSize: '16px' }}>Chem Tokens:</span>
                  <button
                    className={styles.redMinusButton}
                    style={{ width: '26px', height: '26px', fontSize: '14px' }}
                    onClick={() => {
                      const newValue = Math.max(0, chemTokens - 1);
                      setChemTokens(newValue);
                      handleAutoSave({ chemTokens: newValue });
                    }}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={chemTokens}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      const { chemTokenMax } = calculateChemistFeatureData(sheet?.classCardDots);
                      const newValue = val ? Math.max(0, Math.min(chemTokenMax, parseInt(val))) : 0;
                      setChemTokens(newValue);
                      handleAutoSave({ chemTokens: newValue });
                    }}
                    style={{
                      width: '60px',
                      textAlign: 'center',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '16px'
                    }}
                  />
                  <button
                    className={styles.greenPlusButton}
                    style={{ width: '26px', height: '26px', fontSize: '14px' }}
                    onClick={() => {
                      const { chemTokenMax } = calculateChemistFeatureData(sheet?.classCardDots);
                      if (chemTokens >= chemTokenMax) {
                        setNotice("Chem Token maximum reached!");
                        return;
                      }
                      const newValue = Math.min(chemTokenMax, chemTokens + 1);
                      setChemTokens(newValue);
                      handleAutoSave({ chemTokens: newValue });
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            ref={chemTokensButtonRef}
            className={styles.chemTokensButton}
            onClick={() => setIsChemTokensMenuExpanded((open) => !open)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              transform: isChemTokensMenuExpanded ? 'scale(1.05)' : 'scale(1)',
              background: '#721131',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              if (!isChemTokensMenuExpanded) {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isChemTokensMenuExpanded) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }
            }}
          >
          <img src="/Chem Token.png" alt="Chem Token" style={{ height: '1.2em', verticalAlign: 'top', marginLeft: '0px', marginRight: '2px' }}/>: {chemTokens}
          </button>
        </div>
      )}

      {/* Summon HP Button (only for Elementalist and Technician classes) */}
      {(charClass === 'Elementalist' || charClass === 'Technician') && (
        <div style={{
          position: 'fixed',
          bottom: '60px',
          right: '20px',
          zIndex: 999
        }}>
          {/* Summon HP Menu (expanded state) */}
          {isSummonHpMenuExpanded && (
            <div ref={summonHpMenuRef} style={{
              position: 'absolute',
              bottom: '50px',
              right: '0px',
              background: 'white',
              border: `2px solid ${charClass === 'Elementalist' ? '#231172' : '#724811'}`,
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              minWidth: '320px',
              animation: 'fadeIn 0.2s ease-out'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 'bold', minWidth: '145px', fontSize: '16px' }}>Summon Hit Points:</span>
                  <button
                    className={styles.redMinusButton}
                    style={{ width: '26px', height: '26px', fontSize: '14px' }}
                    onClick={() => {
                      const newValue = Math.max(0, currentSummonHp - 1);
                      setCurrentSummonHp(newValue);
                      handleAutoSave({ currentSummonHp: newValue });
                    }}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={currentSummonHp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      const newValue = Math.max(0, parseInt(val) || 0);
                      setCurrentSummonHp(newValue);
                      handleAutoSave({ currentSummonHp: newValue });
                    }}
                    style={{
                      width: '60px',
                      textAlign: 'center',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '16px'
                    }}
                  />
                  <button
                    className={styles.greenPlusButton}
                    style={{ width: '26px', height: '26px', fontSize: '14px' }}
                    onClick={() => {
                      const newValue = currentSummonHp + 1;
                      setCurrentSummonHp(newValue);
                      handleAutoSave({ currentSummonHp: newValue });
                    }}
                  >
                    +
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 'bold', minWidth: '145px' }}>Max Hit Points:</span>
                  <span style={{ minWidth: '40px', textAlign: 'center' }}>{maxSummonHp}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 'bold', minWidth: '145px', fontSize: '14px' }}>Add/Subtract:</span>
                  <button
                    className={styles.redMinusButton}
                    style={{ width: '26px', height: '26px', fontSize: '14px' }}
                    onClick={() => {
                      if (!summonHpDelta) return;
                      const newValue = Math.max(0, currentSummonHp - summonHpDelta);
                      setCurrentSummonHp(newValue);
                      handleAutoSave({ currentSummonHp: newValue });
                    }}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={summonHpDelta || ''}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setSummonHpDelta(val ? parseInt(val) : 0);
                    }}
                    style={{
                      width: '60px',
                      textAlign: 'center',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '16px'
                    }}
                    placeholder="#"
                  />
                  <button
                    className={styles.greenPlusButton}
                    style={{ width: '26px', height: '26px', fontSize: '14px' }}
                    onClick={() => {
                      if (!summonHpDelta) return;
                      const newValue = currentSummonHp + summonHpDelta;
                      setCurrentSummonHp(newValue);
                      handleAutoSave({ currentSummonHp: newValue });
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            ref={summonHpButtonRef}
            className={styles.summonHpButton}
            data-class={charClass}
            onClick={() => setIsSummonHpMenuExpanded((open) => !open)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              transform: isSummonHpMenuExpanded ? 'scale(1.05)' : 'scale(1)'
            }}
            onMouseEnter={(e) => {
              if (!isSummonHpMenuExpanded) {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSummonHpMenuExpanded) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }
            }}
          >
          <img src="/Summon.PNG" alt="Summon" style={{ height: '1.2em', verticalAlign: 'top', marginLeft: '0px', marginRight: '2px' }}/> hp: {currentSummonHp}/{maxSummonHp}
          </button>
        </div>
      )}

      {/* Notice Display */}
      {notice && (
        <div className={styles.standardNotice}>
          {notice}
        </div>
      )}

    </div>
  );
};

export default CharacterSheetComponent;
