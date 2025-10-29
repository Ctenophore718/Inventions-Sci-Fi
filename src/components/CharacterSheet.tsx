import React, { useState } from "react";
import styles from './CharacterSheet.module.css';

import type { CharacterSheet } from "../types/CharacterSheet";
import { saveCharacterSheet, loadSheetById } from "../utils/storage";
import { generateChemicalReactionJSX, calculateChemistFeatureData } from "../utils/chemistFeature";
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
import { generateTelekineticShieldJSX } from "../utils/inertialFeature";
import { generateInertialStrikeJSX, generateInertialStrikeDamageJSX, generateInertialStrikeEffectsJSX } from "../utils/inertialStrike";
import { generateFinalFistsJSX } from "../utils/kineticFeature";
import { generateKineticStrikeJSX, generateKineticStrikeDamageJSX, generateKineticStrikeEffectsJSX } from "../utils/kineticStrike";
import { generateMercurialStrikeDamageJSX, generateMercurialStrikeEffectsJSX } from "../utils/mercurialStrike";
import { generateUnreasonableAccuracyJSX } from "../utils/vectorialFeature";
import { generateVectorialStrikeDamageJSX, generateVectorialStrikeRangeJSX } from "../utils/vectorialStrike";

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

import { generateMartyrJSX } from "../utils/astralFeature";
import { generateAstralStrikeDamageJSX } from "../utils/astralStrike";
import { generateAggressionJSX } from "../utils/chaosFeature";
import { generateChaosStrikeDamageJSX } from "../utils/chaosStrike";
import { generateOrderStrikeDamageJSX } from "../utils/orderStrike";
import { generateArmoredGuardJSX } from "../utils/orderFeature";
import { generateElementalExcitementJSX } from "../utils/elementalistFeature";
import { generateExosuitJSX } from "../utils/exospecialistFeature";

import CharacterSheetInventory from "./CharacterSheetInventory";
import CharacterSheetPerks from "./CharacterSheetPerks";

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
  isNewCharacter?: boolean;
};


const CharacterSheetComponent: React.FC<Props> = ({ sheet, onLevelUp, onCards, onHome, onAutoSave, charClass, setCharClass, subclass, setSubclass, species, setSpecies, subspecies, setSubspecies }) => {
  
  console.log('CharacterSheet render started, sheet:', sheet ? `ID: ${sheet.id}` : 'NULL');
  
  // Auto-save helper function
  const handleAutoSave = (fieldUpdates: Partial<CharacterSheet>) => {
    onAutoSave(fieldUpdates);
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
      <b><i style={{ color: '#4e7211' }}>Sharpshooter.</i></b> You gain a +<b>[{2 + (charClass === 'Gunslinger' && sheet?.classCardDots?.[0] ? sheet.classCardDots[0].filter(Boolean).length : 0)}]</b> to Crit rolls and a +<b>[{0 + (charClass === 'Gunslinger' && sheet?.classCardDots?.[1] ? sheet.classCardDots[1].filter(Boolean).length : 0)}]</b>hx Range on all <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b>.
    </span>
  );  

  const technicianFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
  <b><i style={{ color: '#724811' }}>Master Mechanic.</i></b> Friendly <i>Drones</i>, <i style={{ color: '#2b3b5f' }}>Cognizants</i>, and <i style={{ color: '#117233' }}>Exospecialists</i> that start their turn within <b>[{3 + (charClass === 'Technician' && sheet?.classCardDots?.[0] ? sheet.classCardDots[0].filter(Boolean).length : 0)}]</b>hx of you gain <b>[{1 + (charClass === 'Technician' && sheet?.classCardDots?.[1] ? sheet.classCardDots[1].filter(Boolean).length : 0)}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
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
    ? 2 + ((sheet?.subclassProgressionDots as any)?.aeronautFeatureSpeedDots?.filter(Boolean).length || 0) * 2
    : 0;
  const totalSpeed = baseSpeed + tacticianSpeedBonus + kineticSpeedBonus + mercurialSpeedBonus + airSpeedBonus + fireSpeedBonus + waterSpeedBonus + aeronautSpeedBonus;
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
  
  const strikeDamage = sheet?.strikeDamage || "";
  const maxHitPoints = sheet?.maxHitPoints || 0;
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
  
  // Notice state
  const [notice, setNotice] = useState<string>("");

  // Cross-window synchronization for this character
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "rpg-character-sheets" && sheet?.id) {
        // Reload the current character from storage
        const updatedSheet = loadSheetById(sheet.id);
        if (updatedSheet) {
        // Update all local state to match the stored character (only if changed)
        if (updatedSheet.playerName !== playerName) setPlayerName(updatedSheet.playerName || "");
        if (updatedSheet.name !== name) setName(updatedSheet.name || "");
        if (updatedSheet.background !== background) setBackground(updatedSheet.background || "");
        if (updatedSheet.resistances !== resistances) setResistances(updatedSheet.resistances || "");
        if (updatedSheet.immunities !== immunities) setImmunities(updatedSheet.immunities || "");
        if (updatedSheet.absorptions !== absorptions) setAbsorptions(updatedSheet.absorptions || "");
        if (updatedSheet.movement !== movement) setMovement(updatedSheet.movement || "");
        if (updatedSheet.strike !== strike) setStrike(updatedSheet.strike || "");
        if (updatedSheet.xpTotal !== xpTotal) setXpTotal(updatedSheet.xpTotal || 0);
        if (updatedSheet.spTotal !== spTotal) setSpTotal(updatedSheet.spTotal || 0);
        if (updatedSheet.credits !== credits) setCredits(updatedSheet.credits ?? 0);
        if (updatedSheet.chemTokens !== chemTokens) setChemTokens(updatedSheet.chemTokens ?? 0);
        if (updatedSheet.classFeature !== classFeature) setClassFeature(updatedSheet.classFeature || "");
        if (updatedSheet.portrait !== portraitUrl) setPortraitUrl(updatedSheet.portrait || null);
        if (updatedSheet.spSpent !== spSpent) setSpSpent(updatedSheet.spSpent ?? 0);
        if (JSON.stringify(updatedSheet.deathDots) !== JSON.stringify(deathDots)) setDeathDots(updatedSheet.deathDots || Array(10).fill(false));
        if (updatedSheet.multiStrike !== multiStrike) setMultiStrike(updatedSheet.multiStrike || 0);
        if (updatedSheet.strikeEffects !== strikeEffects) setStrikeEffects(updatedSheet.strikeEffects || "");          // Update character details if they've changed
          if (updatedSheet.charClass !== charClass) setCharClass(updatedSheet.charClass || "");
          if (updatedSheet.subclass !== subclass) setSubclass(updatedSheet.subclass || "");
          if (updatedSheet.species !== species) setSpecies(updatedSheet.species || "");
          if (updatedSheet.subspecies !== subspecies) setSubspecies(updatedSheet.subspecies || "");
        }
      }
    };

    const handleCharacterUpdate = (e: CustomEvent<{ sheet: CharacterSheet }>) => {
      if (sheet?.id && e.detail.sheet.id === sheet.id) {
        const updatedSheet = e.detail.sheet;
        // Update all local state to match the updated character (only if changed)
        if (updatedSheet.playerName !== playerName) setPlayerName(updatedSheet.playerName || "");
        if (updatedSheet.name !== name) setName(updatedSheet.name || "");
        if (updatedSheet.background !== background) setBackground(updatedSheet.background || "");
        if (updatedSheet.resistances !== resistances) setResistances(updatedSheet.resistances || "");
        if (updatedSheet.immunities !== immunities) setImmunities(updatedSheet.immunities || "");
        if (updatedSheet.absorptions !== absorptions) setAbsorptions(updatedSheet.absorptions || "");
        if (updatedSheet.movement !== movement) setMovement(updatedSheet.movement || "");
        if (updatedSheet.strike !== strike) setStrike(updatedSheet.strike || "");
        if (updatedSheet.xpTotal !== xpTotal) setXpTotal(updatedSheet.xpTotal || 0);
        if (updatedSheet.spTotal !== spTotal) setSpTotal(updatedSheet.spTotal || 0);
        if (updatedSheet.credits !== credits) setCredits(updatedSheet.credits ?? 0);
        if (updatedSheet.chemTokens !== chemTokens) setChemTokens(updatedSheet.chemTokens ?? 0);
        if (updatedSheet.classFeature !== classFeature) setClassFeature(updatedSheet.classFeature || "");
        if (updatedSheet.portrait !== portraitUrl) setPortraitUrl(updatedSheet.portrait || null);
        if (updatedSheet.spSpent !== spSpent) setSpSpent(updatedSheet.spSpent ?? 0);
        if (JSON.stringify(updatedSheet.deathDots) !== JSON.stringify(deathDots)) setDeathDots(updatedSheet.deathDots || Array(10).fill(false));
        if (updatedSheet.multiStrike !== multiStrike) setMultiStrike(updatedSheet.multiStrike || 0);
        if (updatedSheet.strikeEffects !== strikeEffects) setStrikeEffects(updatedSheet.strikeEffects || "");
        
        // Update character details if they've changed
        if (updatedSheet.charClass !== charClass) setCharClass(updatedSheet.charClass || "");
        if (updatedSheet.subclass !== subclass) setSubclass(updatedSheet.subclass || "");
        if (updatedSheet.species !== species) setSpecies(updatedSheet.species || "");
        if (updatedSheet.subspecies !== subspecies) setSubspecies(updatedSheet.subspecies || "");
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
  }, [sheet?.id, charClass, subclass, species, subspecies, credits, chemTokens]);

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
      {
        label: "Nocturne", value: "Nocturne", color: "#334592",
        species: ""
      },
      {
        label: "Vulturine", value: "Vulturine", color: "#a96d8c",
        species: ""
      },
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
      {
        label: "Infrared", value: "Infrared", color: "#b17fbe",
        species: ""
      },
      {
        label: "Radiofrequent", value: "Radiofrequent", color: "#bea97f",
        species: ""
      },
      {
        label: "X-Ray", value: "X-Ray", color: "#7f8abe",
        species: ""
      },
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

  const backgroundOptions = [
    { label: "Adherent of the Pollen Collective", value: "Adherent of the Pollen Collective", color: "#666666" },
    { label: "Anti-Deft Secessionist", value: "Anti-Deft Secessionist", color: "#666666" },
    { label: "Awakened Machine", value: "Awakened Machine", color: "#666666" },
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

  const brawlerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#d8a53d' }}>Fightin' Dirty.</i></b> When you <b><i style={{ color: '#351c75' }}>Strike</i></b> an enemy, you inflict <b>[1]</b> of the following conditions: <b><i>Blind</i></b>, <b><i>Spike</i></b> (<b><u style={{ color: '#915927' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>), or <b><i>Restrain</i></b>.
    </span>
  );

  const dreadnaughtFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#d83da0' }}>Towering Defense.</i></b> When resolving <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b>, other creatures treat you as 100% Cover. Additionally, while wearing your <i>Exosuit</i>, your size is 3hx.
    </span>
  );

  const spectreFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#6a3dd8' }}>Holo-Field.</i></b> You roll <b>[1]</b> additional Cover die when a creature <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> you, and discard the lowest roll. Additionally, you can use the <i>Stealth</i> skill once per turn without using an <i>Action</i>.
    </span>
  );

  const ammoCoderFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#0a3991' }}>Bullet Code.</i></b> Whenever you make an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>, you can change the Damage type of your <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> to any of the following:<br/>
      <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
      <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>Cold<img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
      <b><u style={{ color: '#ffe700', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
      <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
      <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
      <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>Neural<img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
      <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
    </span>
  );

  const ordnancerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#910a0a' }}>Excessive Display.</i></b> You and all allies within <b>[3]</b>hx deal +1d6 Damage to all <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b>. The Damage type is the same as the <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> used.
    </span>
  );

  const pistoleerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5a910a' }}>Harry.</i></b> When you deal Damage to an enemy, you can immediately <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[1]</b>hx.
    </span>
  );

  const sniperFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#0a6f91' }}>Targeteer.</i></b> When you Crit, in addition to rolling extra Damage dice and dealing an effect, you can choose to inflict <b>[1]</b> of the following conditions: <b><i>Blind</i></b>, <b><i>Demoralized</i></b>, <b><i>Spike</i></b> (weapon Damage type), or <b><i>Restrained</i></b>.
    </span>
  );

  const hackerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5c57b8' }}>Mobile Gate.</i></b> Your allies can use you and your <i>Drone</i> as a pair of <i style={{ color: '#38761d' }}>Teleportation Gates</i>.
    </span>
  );

  const junkerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#6db857' }}>Salvage.</i></b> Your <i>Drone</i> gains the Crit effect of a <b>[1]</b> ally's <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> within <b>[3]</b>hx of it.
    </span>
  );

  const nanoboticistFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#57b8b0' }}>Protective Swarm.</i></b> While your <i>Drone</i> is <b>[1]</b>hx away from you, any <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> that targets you automatically targets your <i>Drone</i> instead.
    </span>
  );

  const tankerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#b8578b' }}>Ironclad.</i></b> Your <i>Drone</i> has the <i>Mount</i> keyword. While <i>Mounting</i> the <i>Drone</i>, the <i>Rider</i> cannot be directly targeted by <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> or <b><i style={{ color: '#351c75' }}>Strikes</i></b>.
    </span>
  );

  const avenochFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b5f59' }}>First in Flight.</i></b> You have a <b><i style={{ color: '#38761d' }}>Flight Speed</i></b>. Additionally, you can <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[2]</b>hx whenever you Crit on an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>.
    </span>
  );

  const cerebronychFeatureJSX = (
    <span style={{ color: '#000', fontWeight:  400 }}>
      <b><i style={{ color: '#5f5e2b' }}>Parasitic Composure.</i></b> You are <i>Immune</i> to the <b><i>Confuse</i></b> condition and have <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
        Toxic
        <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b> <i>Resistance</i>.
    </span>
  );

  const chloroptidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#315f2b' }}>Rapid Regeneration.</i></b> You gain 1d4 <b><i style={{ color: '#990000' }}>Hit Points</i></b> at the start of your turn. Additionally, your size is 1hx, 2hx, or 3hx, which is chosen at character creation.
    </span>
  );

  const cognizantFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b3b5f' }}>Gears & Cogs.</i></b> You <i>Resist</i> <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> damage and are <i>Immune</i> to the <b><i>Drain</i></b> condition and can naturally survive in the vacuum of space.
    </span>
  );

  const emberfolkFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f2b2b' }}>Born of Fire.</i></b> You <i>Resist</i> <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> damage and are <i>Immune</i> to the <b><i>Spike</i></b> condition.
    </span>
  );

  const entomosFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f422b' }}>Insectoid Resistance.</i></b> You are <i>Immune</i> to the <b><i>Confuse</i></b> condition and fall damage.
    </span>
  );

  const humanFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b315f' }}>Adaptable Physique.</i></b> You <i>Resist</i> <b>[2]</b> of the following damage types:<br/>
    <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
    <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>Cold<img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
    <b><u style={{ color: '#ffe700', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
    <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
    <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
    <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>Neural<img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,&nbsp;
    <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
    </span>
  );

  const lumenarenFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#515f2b' }}>Immutable Energy Reserves.</i></b> You are <i>Immune</i> to the <b><i>Sleep</i></b> condition, <i>Resist</i> <b><u style={{ color: '#ffe700', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and can naturally survive in the vacuum of space.
    </span>
  );

  const praedariFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f2b5c' }}>Predator.</i></b> Whenever you <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> a creature who is not at full <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you gain +<b>[2]</b> Crit and +<b>[1]</b>d6 Damage, the Damage type is the same as the <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage type.
    </span>
  );

  const corvidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#75904e' }}>Crow's Cunning.</i></b> You are <i>Immune</i> to the <b><i>Confuse</i></b> and <b><i>Mesmerize</i></b> conditions.
    </span>
  );

  const falcadorFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#6d7156' }}>Rending Talons.</i></b> When you roll for <b><i>Spike</i></b> damage on <b><i style={{ color: '#351c75' }}>Strikes</i></b>, the <b><i>Spike</i></b> effect triggers on a roll of <b>[5]</b>+.
    </span>
  );

  const nocturneFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#334592' }}>Eyes of the Night.</i></b> You are <i>Immune</i> to the <b><i>Blind</i></b> condition and don't have a <i>Rear Arc</i>. Additionally, whenever you Crit on an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>, you inflict the <b><i>Mesmerize</i></b> condition.
    </span>
  );

  const vulturineFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#a96d8c' }}>Carrion Gorge.</i></b> When you destroy an enemy using a <b><i style={{ color: '#351c75' }}>Strike</i></b>, you immediately gain <b>[2]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
    </span>
  );

  const hostMimicFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f5e2b' }}>Host Mimic.</i></b> Choose a starting <b><i style={{ color: '#0b5394' }}>Feature</i></b> available to any other <i>Species</i> or <i>Subspecies</i> by selecting a <i>Host</i> from the <i>Subspecies</i> dropdown. You cannot upgrade this <b><i style={{ color: '#0b5394' }}>Feature</i></b>.
    </span>
  );

  const barkskinFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f2d2b' }}>Deep Roots.</i></b> You are <i>Immune</i> to the <b><i>Slam</i></b> and <b><i>Bounce</i></b> conditions.
    </span>
  );

  const carnivorousFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b2d5f' }}>Sap Sucker.</i></b> Whenever you heal as a result of the <b><i>Drain</i></b> condition, you heal all of the amount of Damage done instead of half.
    </span>
  );

  const driftingFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f8a5f' }}>Leaf on the Wind.</i></b> You have a <b><i style={{ color: '#38761d' }}>Flight Speed</i></b>. Additionally, you can <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[1]</b>hx after you take any Damage.
    </span>
  );

  const vinyFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f5f2b' }}>Climbing Creeper.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b> and <i>Resist</i> <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>.
    </span>
  );

  const androidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#581fbd' }}>Encrypted Cerebral Cortex.</i></b> You are <i>Immune</i> to the <b><i>Confuse</i></b> condition.
    </span>
  );

  const utilityDroidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#bd891f' }}>Variant Utility.</i></b> Your size is 1hx, 2hx, or 3hx, chosen at character creation, and you gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b>.
    </span>
  );

  const petranFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#735311' }}>Mountain's Endurance.</i></b> You <i>Resist</i> <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Demoralize</i></b> condition.
    </span>
  );

  const pyranFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#b31111' }}>Ignition.</i></b> You can choose to have your <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> and/or <b><i style={{ color: '#351c75' }}>Strikes</i></b> deal <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> Damage at-will.
    </span>
  );

  const apocritanFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#6d7156' }}>Swarm Tactics.</i></b> When you are <b>[1]</b>hx away from an enemy, allies who <b><i style={{ color: '#351c75' }}>Strike</i></b> that enemy can choose to inflict the <b><i>Spike</i></b>, <b><i>Confuse</i></b> or <b><i>Restrain</i></b> condition on it. The <b><i>Spike</i></b> damage is the same as the ally's <b><i style={{ color: '#351c75' }}>Strike</i></b> damage.
    </span>
  );

  const dynastesFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#334592' }}>Herculean.</i></b> Your size is 3hx. You are also <i>Immune</i> to the <b><i>Slam</i></b> and <b><i>Bounce</i></b> conditions. Additionally, when you inflict the <b><i>Slam</i></b> or <b><i>Bounce</i></b> condition, increase the forced <b><i style={{ color: '#38761d' }}>Movement</i></b> by <b>[2]</b>hx.
    </span>
  );

  const mantidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#75904e' }}>Raptorial Claws.</i></b> You can <b><i style={{ color: '#351c75' }}>Strike</i></b> enemies in an adjacent hx during your <b><i style={{ color: '#38761d' }}>Move</i></b> instead of having to <b><i style={{ color: '#38761d' }}>Move</i></b> through them.
    </span>
  );

  const diminutiveEvolutionFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#c3735f' }}>Out of Sight.</i></b> When you are <b><i><span style={{ color: '#990000' }}>Attacked</span></i></b> and have any Cover, you roll <b>[1]</b> additional Cover die and discard the lowest roll.
    </span>
  );

  const litheEvolutionFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b5f5f' }}>Fleet of Foot.</i></b> You ignore <i>Rough Terrain</i> and <i>Dangerous Terrain</i> and you gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b>.
    </span>
  );

  const massiveEvolutionFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b175f' }}>I'LL SEE YOU IN HELL!</i></b> Whenever you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you can immediately make a <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b>. Additionally, your size is 3hx.
    </span>
  );

  const stoutEvolutionFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f2b2b' }}>Die Hard.</i></b> The first time you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you immediately gain 1 <b><i style={{ color: '#990000' }}>Hit Point</i></b> and are not dying.
    </span>
  );

  const infraredFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#b17fbe' }}>Infrared Tracking.</i></b> All <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> you make automatically have the Arcing keyword.
    </span>
  );

  const radiofrequentFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#bea97f' }}>Misleading Signals.</i></b> Enemies <b><i><span style={{ color: '#990000' }}>Attacking</span></i></b> you roll an additional Crit die and discard the highest rolled.
    </span>
  );

  const xRayFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#7f8abe' }}>Irradiate.</i></b> Enemies starting their turn within <b>[3]</b>hx of you suffer <b>[2]</b> instances of the <b><i>Spike</i></b> (<b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>) condition.
    </span>
  );

  const canidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2f8da6' }}>Inspired Hunter.</i></b> When you reduce a creature to 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b>, you immediately gain 1 <i>Action</i>. You can only benefit from this once per turn.
    </span>
  );

  const felidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#b16326' }}>Cat’s Grace.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Climb Speed</i></b> and cannot take damage from falling as long as you are conscious. Additionally, you can use the <i>Acrobatics</i> skill once per turn without using an <i>Action</i>.
    </span>
  );
  
  const mustelidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#699239' }}>Weasel.</i></b> You gain a <b><i style={{ color: '#38761d' }}>Burrow Speed</i></b> and are <i>Immune</i> to the <b><i>Restrain</i></b> condition. Additionally you can use the <i>Thievery</i> skill once per turn without using an <i>Action</i>.
    </span>
  );
  
  const ursidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#9026b1' }}>Natural Insulation.</i></b> You <i>Resist</i> <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>Cold<img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Restrain</i></b> condition. Your size is 3hx.
    </span>
  );

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
                
                return skillList.map(skill => {
                  const dots = sheet?.skillDots?.[skill] || [];
                  
                  // Helper to get booster dot color
                  const getBoosterColor = (skill: string) => {
                    // Class booster colors
                    if (charClass === "Chemist" && skill === "Investigation") return "rgba(114,17,49,0.5)";
                    if (charClass === "Coder" && skill === "Oikomagic") return "rgba(17,33,114,0.5)";
                    if (charClass === "Commander" && skill === "Diplomacy") return "rgba(113,114,17,0.5)";
                    if (charClass === "Contemplative" && skill === "Awareness") return "rgba(17,99,114,0.5)";
                    if (charClass === "Devout" && skill === "Xenomagic") return "rgba(107,17,114,0.5)";
                    if (charClass === "Elementalist" && skill === "Xenomagic") return "rgba(35,17,114,0.5)";
                    if (charClass === "Exospecialist" && skill === "Athletics") return "rgba(17,114,51,0.5)";
                    if (charClass === "Gunslinger" && skill === "Deception") return "rgba(78,114,17,0.5)";
                    if (charClass === "Technician" && skill === "Technology") return "rgba(114,72,17,0.5)";
                    
                    // Subclass booster colors
                    if (subclass === "Anatomist" && skill === "Medicine") return "rgba(102,207,0,0.5)";
                    if (subclass === "Grenadier" && skill === "Intimidation") return "rgba(207,0,0,0.5)";
                    if (subclass === "Necro" && skill === "Survival") return "rgba(0,51,207,0.5)";
                    if (subclass === "Poisoner" && skill === "Thievery") return "rgba(207,118,0,0.5)";
                    if (subclass === "Coercive" && skill === "Deception") return "rgba(67,201,255,0.5)";
                    if (subclass === "Divinist" && skill === "Investigation") return "rgba(255,67,67,0.5)";
                    if (subclass === "Naturalist" && skill === "Survival") return "rgba(102,207,0,0.5)";
                    if (subclass === "Technologist" && skill === "Technology") return "rgba(140,67,255,0.5)";
                    if (subclass === "Beguiler" && skill === "Deception") return "rgba(31,33,206,0.5)";
                    if (subclass === "Galvanic" && skill === "Athletics") return "rgba(111,206,31,0.5)";
                    if (subclass === "Tactician" && skill === "Awareness") return "rgba(206,195,31,0.5)";
                    if (subclass === "Tyrant" && skill === "Intimidation") return "rgba(206,31,195,0.5)";
                    if (subclass === "Inertial" && skill === "Diplomacy") return "rgba(28,148,94,0.5)";
                    if (subclass === "Kinetic" && skill === "Athletics") return "rgba(123,148,28,0.5)";
                    if (subclass === "Mercurial" && skill === "Acrobatics") return "rgba(148,28,108,0.5)";
                    if (subclass === "Vectorial" && skill === "Piloting") return "rgba(83,28,148,0.5)";
                    if (subclass === "Astral" && skill === "Medicine") return "rgba(91,177,175,0.5)";
                    if (subclass === "Chaos" && skill === "Intimidation") return "rgba(177,91,108,0.5)";
                    if (subclass === "Order" && skill === "Culture") return "rgba(174,177,91,0.5)";
                    if (subclass === "Void" && skill === "Stealth") return "rgba(91,115,177,0.5)";
                    if (subclass === "Air" && skill === "Acrobatics") return "rgba(14,226,223,0.5)";
                    if (subclass === "Earth" && skill === "Survival") return "rgba(226,185,14,0.5)";
                    if (subclass === "Fire" && skill === "Intimidation") return "rgba(226,14,14,0.5)";
                    if (subclass === "Water" && skill === "Medicine") return "rgba(14,66,226,0.5)";
                    return null;
                  };
                  
                  // Check if this skill has a booster dot at position 2
                  const boosterColor = getBoosterColor(skill);
                  const hasBooster = boosterColor !== null;
                  
                  let value;
                  let displayDots = [];
                  
                  if (isNewCharacter) {
                    // New characters default to first two dots, plus booster if applicable
                    displayDots = [true, true];
                    if (hasBooster) {
                      displayDots.push(true);
                      value = "16+";
                    } else {
                      value = "18+";
                    }
                  } else {
                    // For existing characters, ensure first two dots are always present
                    displayDots = [...dots];
                    
                    // Ensure we have at least the first two starter dots
                    while (displayDots.length < 2) {
                      displayDots.push(false);
                    }
                    // Force first two dots to always be true (starter dots)
                    displayDots[0] = true;
                    displayDots[1] = true;
                    
                    // Ensure booster dot is shown if applicable
                    if (hasBooster) {
                      // Make sure we have at least 3 elements
                      while (displayDots.length < 3) {
                        displayDots.push(false);
                      }
                      // Force the booster dot (index 2) to be true
                      displayDots[2] = true;
                    }
                    
                    let idx = displayDots.lastIndexOf(true);
                    value = idx >= 0 ? skillColumnValues[idx] + "+" : "-";
                  }
                  
                  // Render visual dots
                  const dotElements = displayDots.map((isFilled, dotIndex) => {
                    if (!isFilled) return null;
                    
                    // Check if this is the booster dot
                    const isBoosterDot = hasBooster && dotIndex === 2;
                    const dotColor = isBoosterDot ? boosterColor : '#666';
                    
                    return (
                      <span
                        key={dotIndex}
                        style={{
                          display: 'inline-block',
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: dotColor,
                          marginRight: 2
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
                <select 
                  value={background} 
                  onChange={e => {
                    setBackground(e.target.value);
                    handleAutoSave({ background: e.target.value });
                  }} 
                  className={styles.colorSelect}
                  style={{ 
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    color: backgroundOptions.find(opt => opt.value === background)?.color || '#000',
                    textAlign: 'center',
                    minWidth: '120px',
                    background: 'white'
                  }}
                >
                  <option value="" style={{ color: 'black', backgroundColor: 'white',  }}>Select Background</option>
                  {backgroundOptions.map(opt => (
                    <option 
                      key={opt.value} 
                      value={opt.value} 
                      style={{ 
                        color: opt.color,
                        backgroundColor: 'white',
                        fontWeight: 'bold'
                      }}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>
          
          {/* Row 2: Class, Subclass, Species, Subspecies */}
          <div className={styles.identityRow}>
            <label>
              <span style={{ fontFamily: 'Arial, sans-serif' }}>Class</span>
              <div className={styles.selectWrapper}>
                <select 
                  value={charClass}
                  onChange={e => {
                    setCharClass(e.target.value);
                    setSubclass(""); 
                    handleAutoSave({ charClass: e.target.value, subclass: "" });
                  }} 
                  className={styles.colorSelect + ' ' + styles.selectedClassColor}
                  style={{ 
                    '--selected-class-color': classOptions.find(opt => opt.value === charClass)?.color || '#000',
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: `${classOptions.find(opt => opt.value === charClass)?.color || '#000'} !important`,
                    minWidth: '120px',
                    background: 'white'
                  } as React.CSSProperties}
                >
                  <option value="" style={{ color: 'black', backgroundColor: 'white' }}>Select Class</option>
                  {classOptions.map(opt => (
                    <option 
                      key={opt.value} 
                      value={opt.value} 
                      style={{ 
                        color: opt.color,
                        backgroundColor: 'white',
                        fontWeight: 'bold'
                      }}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label>
              <span style={{ fontFamily: 'Arial, sans-serif' }}>Subclass</span>
              <div className={styles.selectWrapper}>
                <select 
                  value={subclass} 
                  onChange={e => {
                    const val = e.target.value;
                    setSubclass(val);
                    if (!charClass && val) {
                      const found = allSubclassOptions.find(opt => opt.value === val);
                      if (found) {
                        setCharClass(found.class);
                        handleAutoSave({ subclass: val, charClass: found.class });
                      } else {
                        handleAutoSave({ subclass: val });
                      }
                    } else {
                      handleAutoSave({ subclass: val });
                    }
                  }}
                  className={styles.colorSelect + ' ' + styles.selectedSubclassColor}
                  style={{ 
                    '--selected-subclass-color': subclassOptions.find(opt => opt.value === subclass)?.color || '#000',
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: `${(subclassOptions.find(opt => opt.value === subclass) || allSubclassOptions.find(opt => opt.value === subclass))?.color || '#000'} !important`,
                    minWidth: '120px',
                    background: 'white'
                  } as React.CSSProperties}
                >
                  <option value="" style={{ color: 'black', backgroundColor: 'white' }}>Select Subclass</option>
                  {(charClass ? subclassOptions : allSubclassOptions).map(opt => (
                    <option 
                      key={opt.value} 
                      value={opt.value} 
                      style={{ 
                        color: opt.color,
                        backgroundColor: 'white',
                        fontWeight: 'bold'
                      }}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label>
              <span style={{ fontFamily: 'Arial, sans-serif' }}>Species</span>
              <div className={styles.selectWrapper}>
                <select 
                  value={species} 
                  onChange={e => {
                    setSpecies(e.target.value);
                    setSubspecies("");
                    handleAutoSave({ species: e.target.value, subspecies: "" });
                  }}
                  className={styles.colorSelect + ' ' + styles.selectedSpeciesColor}
                  style={{ 
                    '--selected-species-color': speciesOptions.find(opt => opt.value === species)?.color || '#000',
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: `${(speciesOptions.find(opt => opt.value === species)) || allSubspeciesOptions.find(opt => opt.value === species)?.color || '#000'} !important`,
                    minWidth: '120px',
                    background: 'white'
                  } as React.CSSProperties}
                >
                  <option value="" style={{ color: 'black', backgroundColor: 'white' }}>Select Species</option>
                  {speciesOptions.map(opt => (
                    <option 
                      key={opt.value} 
                      value={opt.value} 
                      style={{ 
                        color: opt.color,
                        backgroundColor: 'white',
                        fontWeight: 'bold'
                      }}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label>
              <span style={{ fontFamily: 'Arial, sans-serif' }}>Subspecies</span>
              <div className={styles.selectWrapper}>
                <select 
                  value={subspecies} 
                  onChange={e => {
                    const val = e.target.value;
                    setSubspecies(val);
                    // Special case: Nocturne and Vulturine should always set species to Avenoch
                    if (val === "Nocturne" || val === "Vulturine") {
                      setSpecies("Avenoch");
                      handleAutoSave({ subspecies: val, species: "Avenoch" });
                    } else if ((val === "Infrared" || val === "Radiofrequent" || val === "X-Ray") && !species) {
                      setSpecies("Lumenaren");
                      handleAutoSave({ subspecies: val, species: "Lumenaren" });
                    } else if (!species && val) {
                      const found = allSubspeciesOptions.find(opt => opt.value === val);
                      if (found && found.species) {
                        setSpecies(found.species);
                        handleAutoSave({ subspecies: val, species: found.species });
                      } else {
                        handleAutoSave({ subspecies: val });
                      }
                    } else {
                      handleAutoSave({ subspecies: val });
                    }
                  }}
                  className={styles.colorSelect + ' ' + styles.selectedSubspeciesColor}
                  style={{ 
                    '--selected-subspecies-color': (subspeciesOptions.find(opt => opt.value === subspecies) || allSubspeciesOptions.find(opt => opt.value === subspecies))?.color || '#000',
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: `${(subspeciesOptions.find(opt => opt.value === subspecies) || allSubspeciesOptions.find(opt => opt.value === subspecies))?.color || '#000'} !important`,
                    minWidth: '120px',
                    background: 'white'
                  } as React.CSSProperties}
                >
                  <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                    {species === "Cerebronych" ? "Select Host" : "Select Subspecies"}
                  </option>
                  {(species === "Cerebronych"
                    ? hostOptions
                    : (species ? subspeciesOptions : allSubspeciesOptions)
                  ).map(opt => (
                    <option 
                      key={opt.value} 
                      value={opt.value} 
                      style={{ 
                        color: opt.color,
                        backgroundColor: 'white',
                        fontWeight: 'bold'
                      }}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
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
                {subspecies === "Avenoch Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#2b5f59' }}>First in Flight.</i></b> You have a <b><i style={{ color: '#38761d' }}>Flight Speed</i></b>. Additionally, you can <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[2]</b>hx whenever you Crit on an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>.
                  </span>
                )}
                {subspecies === "Corvid Avenoch Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#75904e' }}>Crow's Cunning.</i></b> You are <i>Immune</i> to the <b><i>Confuse</i></b> and <b><i>Mesmerize</i></b> conditions.
                  </span>
                )}
                {subspecies === "Falcador Avenoch Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#6d7156' }}>Rending Talons.</i></b> When you roll for <b><i>Spike</i></b> damage on <b><i style={{ color: '#351c75' }}>Strikes</i></b>, the <b><i>Spike</i></b> effect triggers on a roll of 5+.
                  </span>
                )}
                {subspecies === "Nocturne Avenoch Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#334592' }}>Eyes of the Night.</i></b> You are <i>Immune</i> to the <b><i>Blind</i></b> condition and don't have a <i>Rear Arc</i>. Additionally, whenever you Crit on an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>, you inflict the <b><i>Mesmerize</i></b> condition.
                  </span>
                )}
                {subspecies === "Vulturine Avenoch Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#a96d8c' }}>Carrion Gorge.</i></b> When you destroy an enemy using a <b><i style={{ color: '#351c75' }}>Strike</i></b>, you immediately gain 2d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
                  </span>
                )}
                {subspecies === "Chloroptid Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#315f2b' }}>Rapid Regeneration.</i></b> You gain 1d4 <b><i style={{ color: '#990000' }}>Hit Points</i></b> at the start of your turn. Additionally, your size is 1hx, 2hx, or 3hx, which is chosen at character creation.
                  </span>
                )}
                {subspecies === "Barkskin Chloroptid Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#5f2d2b' }}>Deep Roots.</i></b> You are <i>Immune</i> to the <b><i>Slam</i></b> and <b><i>Bounce</i></b> conditions.
                  </span>
                )}
                {subspecies === "Carnivorous Chloroptid Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#2b2d5f' }}>Sap Sucker.</i></b> Whenever you heal as a result of the <b><i>Drain</i></b> condition, you heal all of the amount of Damage done instead of half.
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
                    <b><i style={{ color: '#5f2b2b' }}>Born of Fire.</i></b> You <i>Resist</i> <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> damage and are <i>Immune</i> to the <b><i>Spike</i></b> condition.
                  </span>
                )}
                {subspecies === "Petran Emberfolk Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#735311' }}>Mountain's Endurance.</i></b> You <i>Resist</i> <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and are <i>Immune</i> to the <b><i>Demoralize</i></b> condition.
                  </span>
                )}   
                {subspecies === "Pyran Emberfolk Host" && (
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, marginTop: 8, color: '#000', fontWeight: 400 }}>
                    <b><i style={{ color: '#b31111' }}>Ignition.</i></b> You can choose to have your <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> and/or <b><i style={{ color: '#351c75' }}>Strikes</i></b> deal <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> Damage at-will.
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
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}>Speed {speed}{speed !== "0hx" ? "hx" : ""}</div>
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}>
            Speed Types {movement}Ground
            {sheet?.subclass === 'Air' && (sheet?.subclassProgressionDots as any)?.airMovementFlySpeedDots?.[0] ? ', Fly' : ''}
            {sheet?.subclass === 'Water' && (sheet?.subclassProgressionDots as any)?.waterMovementSwimSpeedDots?.[0] ? ', Swim' : ''}
            {sheet?.subclass === 'Aeronaut' ? ', Fly' : ''}
          </div>
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}>Jump Speed {(kineticJumpSpeedBonus > 0 ? kineticJumpSpeedBonus : mercurialJumpSpeedBonus > 0 ? mercurialJumpSpeedBonus : "") + (kineticJumpSpeedBonus > 0 || mercurialJumpSpeedBonus > 0 ? "hx" : "0hx")}</div>
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}>Jump Amount {kineticJumpAmountBonus > 0 ? kineticJumpAmountBonus : mercurialJumpAmountBonus > 0 ? mercurialJumpAmountBonus : "0"}</div>
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}>
            Speed Effects {
              subclass === 'Chaos' 
                ? (() => {
                    const chaosFeatureMoveDots = (sheet?.subclassProgressionDots as any)?.chaosFeatureMoveDots || [false, false, false];
                    const moveDistance = 2 + chaosFeatureMoveDots.filter(Boolean).length;
                    return (
                      <span style={{ fontWeight: 'normal', color: '#000' }}>
                        Immediately <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{moveDistance}]</b>hx after taking Damage
                      </span>
                    );
                  })()
                : resistances
            }
          </div>
        </div>
      </div>

      <div className={styles.strikeCard}>
  <h3 style={{ fontFamily: 'Arial, sans-serif' }}>Strike</h3>
        <div className={styles.cardContent}>
          <div className={styles.horizontalLabel} style={{ color: '#351c75', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#351c75', marginRight: 4 }}>Strike Damage</span>
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
            ) : <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4 }}>{strikeDamage}</span>}
          </div>
          <div className={styles.horizontalLabel} style={{ color: '#351c75', fontWeight: 'bold' }}>Multi Strike <span style={{ color: '#000' }}>{
            charClass === 'Contemplative'
              ? (2 + (sheet?.classCardDots?.[1]?.[0] ? 1 : 0) + ((sheet?.subclassProgressionDots as any)?.kineticStrikeMultiStrikeDots?.[0] ? 1 : 0) + ((sheet?.subclassProgressionDots as any)?.mercurialStrikeMultiStrikeDots?.[0] ? 1 : 0) + ((sheet?.subclassProgressionDots as any)?.vectorialStrikeMultiStrikeDots?.[0] ? 1 : 0))
              : (subclass === 'Beguiler' && sheet?.subclassProgressionDots?.beguilerStrikeStrikeDots?.[0])
                ? 2
                : (subclass === 'Galvanic' && (sheet?.subclassProgressionDots as any)?.galvanicStrikeStrikeDots?.[0])
                  ? 2
                  : (subclass === 'Tactician' && (sheet?.subclassProgressionDots as any)?.tacticianStrikeStrikeDots?.[0])
                    ? 2
                    : (subclass === 'Chaos' && (sheet?.subclassProgressionDots as any)?.chaosStrikeMultiStrikeDots?.[0])
                      ? 2
                      : (subclass === 'Air' && ((sheet?.subclassProgressionDots as any)?.airStrikeMultiStrikeDots?.filter(Boolean).length || 0) > 0)
                        ? (1 + ((sheet?.subclassProgressionDots as any)?.airStrikeMultiStrikeDots?.filter(Boolean).length || 0))
                        : (subclass === 'Fire' && ((sheet?.subclassProgressionDots as any)?.fireStrikeExtraStrikeDots?.filter(Boolean).length || 0) > 0)
                          ? (1 + ((sheet?.subclassProgressionDots as any)?.fireStrikeExtraStrikeDots?.filter(Boolean).length || 0))
                          : (multiStrike > 0 ? multiStrike : <span style={{ visibility: 'hidden' }}>0</span>)
          }</span></div>
          <div className={styles.horizontalLabel} style={{ color: '#351c75', fontWeight: 'bold' }}>
              Strike Effects {
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
                  : (subclass === 'Galvanic' && ((sheet?.subclassProgressionDots as any)?.galvanicStrikeAoEDots?.filter(Boolean).length || 0) > 0)
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><i>AoE</i> <b>[{((sheet?.subclassProgressionDots as any)?.galvanicStrikeAoEDots?.filter(Boolean).length || 0)}]</b>hx-Radius</span>
                  : (subclass === 'Tyrant' && (sheet?.subclassProgressionDots as any)?.tyrantStrikeDemorizeDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Demoralize</i></b></span>
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
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#e20e0e', display: 'inline-flex', alignItems: 'center' }}>
      Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b><b>)</b></span>
                  : (subclass === 'Water' && (sheet?.subclassProgressionDots as any)?.waterStrikeInflictDemoralizeDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}><b><i>Demoralize</i></b></span>
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
              Resistances
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
                    <span style={{ display: 'inline-flex', alignItems: 'center', color: '#e20e0e', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
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
            </div>
          <div style={{ fontWeight: 'bold', marginBottom: 2, fontFamily: 'Arial, sans-serif', color: '#666666', wordBreak: 'break-word', overflowWrap: 'break-word' }}>Immunities
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
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#e20e0e', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
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
          </div>
          <div style={{ fontWeight: 'bold', marginBottom: 2, fontFamily: 'Arial, sans-serif', color: '#666666', wordBreak: 'break-word', overflowWrap: 'break-word' }}>Absorptions
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
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#e20e0e', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
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
        <div className={styles.cardContent}></div>
      </div>

      <CharacterSheetPerks
        sheet={sheet}
        charClass={charClass}
        subclass={subclass}
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
              {/* Current HP Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 'bold', minWidth: '120px', fontSize: '14px' }}>Current Hit Points:</span>
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

                {/* Add/Subtract Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginLeft: '8px' }}>
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '120px' }}>Max Hit Points:</span>
                <span style={{ minWidth: '40px', textAlign: 'center' }}>{charClass === "Exospecialist" ? maxHitPoints + 20 : maxHitPoints}</span>
              </div>

              <hr style={{ margin: '8px 0', border: '1px solid #eee' }} />

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
          hp: {currentHitPoints}/{charClass === "Exospecialist" ? maxHitPoints + 20 : maxHitPoints}
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
