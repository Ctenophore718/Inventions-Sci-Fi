import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { saveCharacterSheet, loadSheetById } from "../utils/storage";
import styles from "./CharacterSheet.module.css";
import LevelUpClassChemist from "./LevelUpClassChemist";
import LevelUpClassCoder from "./LevelUpClassCoder";
import LevelUpClassCommander from "./LevelUpClassCommander";
import LevelUpClassContemplative from "./LevelUpClassContemplative";
import LevelUpClassDevout from "./LevelUpClassDevout";
import LevelUpClassElementalist from "./LevelUpClassElementalist";
import LevelUpClassExospecialist from "./LevelUpClassExospecialist";
import LevelUpClassGunslinger from "./LevelUpClassGunslinger";
import LevelUpClassTechnician from "./LevelUpClassTechnician";
import LevelUpSubclassesChemist from "./LevelUpSubclassesChemist";
import LevelUpSubclassesCoder from "./LevelUpSubclassesCoder";
import LevelUpSubclassesCommander from "./LevelUpSubclassesCommander";
import LevelUpSubclassesContemplative from "./LevelUpSubclassesContemplative";
import LevelUpSubclassesDevout from "./LevelUpSubclassesDevout";
import LevelUpSubclassesElementalist from "./LevelUpSubclassesElementalist";
import LevelUpSubclassesExospecialist from "./LevelUpSubclassesExospecialist";
import LevelUpSubclassesGunslinger from "./LevelUpSubclassesGunslinger";
import LevelUpSubclassesTechnician from "./LevelUpSubclassesTechnician";
import LevelUpSpeciesAvenoch from "./LevelUpSpeciesAvenoch";
import LevelUpSpeciesCerebronych from "./LevelUpSpeciesCerebronych";
import LevelUpSpeciesChloroptid from "./LevelUpSpeciesChloroptid";
import LevelUpSpeciesCognizant from "./LevelUpSpeciesCognizant";
import LevelUpSpeciesEmberfolk from "./LevelUpSpeciesEmberfolk";
import LevelUpSpeciesEntomos from "./LevelUpSpeciesEntomos";
import LevelUpSpeciesHuman from "./LevelUpSpeciesHuman";
import LevelUpSpeciesLumenaren from "./LevelUpSpeciesLumenaren";
import LevelUpSpeciesPraedari from "./LevelUpSpeciesPraedari";
import LevelUpBackground from "./LevelUpBackground";
import { calculateChemistFeatureData } from "../utils/chemistFeature";


type LevelUpProps = {
  sheet: CharacterSheet | null;
  onBack: () => void;
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
};


const LevelUp: React.FC<LevelUpProps> = ({ sheet, onBack, onCards, onHome, onAutoSave, charClass, setCharClass, subclass, setSubclass, species, setSpecies, subspecies, setSubspecies }) => {
  
  // Debounce timer for auto-save
  const saveTimeoutRef = useRef<number | null>(null);
  
  // Ref to track pending updates - prevents race conditions with cross-window sync
  const hasPendingUpdatesRef = useRef(false);
  
  // Use ref for sheet to avoid stale closures in debounced callbacks
  const sheetRef = useRef(sheet);
  useEffect(() => {
    sheetRef.current = sheet;
  }, [sheet]);
  
  // Auto-save helper function with debouncing
  const handleAutoSave = useCallback((fieldUpdates: Partial<CharacterSheet>) => {
    if (onAutoSave) {
      // Mark that we have pending updates
      hasPendingUpdatesRef.current = true;
      
      // Clear any pending save
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      // Debounce the save by 150ms to batch rapid changes
      saveTimeoutRef.current = setTimeout(() => {
        const currentSheet = sheetRef.current;
        if (currentSheet) {
          // Update existing sheet - use ref to get latest sheet state
          const updatedSheet = { ...currentSheet, ...fieldUpdates };
          onAutoSave(updatedSheet);
        } else {
          // Create new sheet with updates - this handles new character creation
          onAutoSave(fieldUpdates);
        }
        // Clear pending flag after save completes
        hasPendingUpdatesRef.current = false;
      }, 150);
    }
  }, [onAutoSave]);
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Handler for Credits changes without auto-save (for atomic operations)
  const handleCreditsChangeNoSave = (creditsDelta: number) => {
    const newCredits = credits + creditsDelta;
    
    setCredits(newCredits);
    setCreditsDelta(prev => prev + creditsDelta);
    // Don't call handleAutoSave - let the caller handle persistence
  };

  // Local state for XP/SP totals (mirroring CharacterSheet)
  const [xpTotal, setXpTotal] = useState(sheet?.xpTotal ?? 0);
  const [spTotal, setSpTotal] = useState(sheet?.spTotal ?? 0);
  const [maxHitPoints, setMaxHitPoints] = useState(sheet?.maxHitPoints ?? 0);
  // Optionally, update local state if sheet changes
  const [spSpent, setSpSpent] = useState(sheet?.spSpent ?? 0);
  const [xpSpent, setXpSpent] = useState(sheet?.xpSpent ?? 0);

  // Refs to track latest xpSpent/spSpent values (avoids stale closures in skill dot handlers)
  const xpSpentRef = useRef(xpSpent);
  const spSpentRef = useRef(spSpent);
  
  // Keep refs in sync with state
  useEffect(() => {
    xpSpentRef.current = xpSpent;
  }, [xpSpent]);
  
  useEffect(() => {
    spSpentRef.current = spSpent;
  }, [spSpent]);

  // Add skillDots state for LevelUp (mirroring CharacterSheet)
  const skillList = [
    "Acrobatics",
    "Athletics", 
    "Awareness",
    "Computers",
    "Culture",
    "Deception",
    "Diplomacy",
    "Intimidation",
    "Investigation",
    "Medicine",
    "Oikomagic",
    "Performance",
    "Piloting",
    "Stealth",
    "Survival",
    "Technology",
    "Thievery",
    "Xenomagic"
  ];

  const [skillDots, setSkillDots] = useState<{ [key: string]: boolean[] }>(() => {
    if (sheet?.skillDots && sheet?.hasFreeSkillStarterDots) {
      return sheet.skillDots;
    } else {
      // For new characters, start with empty dots - will be filled by useEffect
      return Object.fromEntries(skillList.map(skill => [skill, Array(10).fill(false)]));
    }
  });
  
  // Initialize skillDots for new characters with starter dots
  useEffect(() => {
    // Check if this is a new character that hasn't had starter dots set yet
    const isNewCharacter = !sheet || !sheet.hasFreeSkillStarterDots;
    
    if (isNewCharacter) {
      // Determine which skills have anti-boosters (lose the 18+ auto-dot)
      const antiBoosterSkills: string[] = [];
      if (sheet?.background === "Adherent of the Pollen Collective") {
        antiBoosterSkills.push("Investigation", "Technology");
      }
      if (sheet?.background === "Anti-Deft Secessionist") {
        antiBoosterSkills.push("Diplomacy", "Intimidation");
      }
      if (sheet?.background === "Awakened Machine") {
        antiBoosterSkills.push("Culture", "Performance");
      }

      // Create skill dots with first two columns filled, except for anti-booster skills which only get first column
      const newSkillDots = Object.fromEntries(
        skillList.map(skill => {
          const hasAntiBooster = antiBoosterSkills.includes(skill);
          // Anti-booster skills: [true, false, ...], normal skills: [true, true, ...]
          return [skill, hasAntiBooster 
            ? [true, false, false, false, false, false, false, false, false, false]
            : [true, true, false, false, false, false, false, false, false, false]
          ];
        })
      );
      
      const skillUpdates = {
        hasFreeSkillStarterDots: true,
        skillDots: newSkillDots,
        spSpent: (sheet?.spSpent || 0)
      };
      
      // Update local state
      setSkillDots(newSkillDots);
      
      // Auto-save the updates
      handleAutoSave(skillUpdates);
    }
  }, [sheet?.id, sheet?.hasFreeSkillStarterDots]);
  
  // Update skill dots when background changes to handle anti-booster effects
  useEffect(() => {
    if (!sheet || !sheet.skillDots) return;
    
    // Determine which skills should have anti-boosters
    const antiBoosterSkills: string[] = [];
    if (sheet.background === "Adherent of the Pollen Collective") {
      antiBoosterSkills.push("Investigation", "Technology");
    }
    if (sheet.background === "Anti-Deft Secessionist") {
      antiBoosterSkills.push("Diplomacy", "Intimidation");
    }
    if (sheet.background === "Awakened Machine") {
      antiBoosterSkills.push("Culture", "Performance");
    }
    
    // Check if we need to update any skill dots
    let needsUpdate = false;
    const updatedSkillDots = { ...sheet.skillDots };
    
    antiBoosterSkills.forEach(skill => {
      if (updatedSkillDots[skill] && updatedSkillDots[skill][1] === true) {
        // This anti-booster skill still has the 18+ dot filled - remove it
        updatedSkillDots[skill] = [...updatedSkillDots[skill]];
        updatedSkillDots[skill][1] = false;
        needsUpdate = true;
      }
    });
    
    if (needsUpdate) {
      setSkillDots(updatedSkillDots);
      handleAutoSave({ skillDots: updatedSkillDots });
    }
  }, [sheet?.background]);
  
  // Local state for HP functionality
  const [currentHitPoints, setCurrentHitPoints] = useState<number>(sheet?.currentHitPoints ?? sheet?.maxHitPoints ?? 0);
  const [deathCount, setDeathCount] = useState(sheet?.deathCount || 0);
  
  const [notice, setNotice] = useState("");
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isXpSpMenuExpanded, setIsXpSpMenuExpanded] = useState(false);
  const [isHpMenuExpanded, setIsHpMenuExpanded] = useState(false);
  const [isCreditsMenuExpanded, setIsCreditsMenuExpanded] = useState(false);
  const [isChemTokensMenuExpanded, setIsChemTokensMenuExpanded] = useState(false);
  const [isSummonHpMenuExpanded, setIsSummonHpMenuExpanded] = useState(false);
  // For add/subtract HP section
  const [hpDelta, setHpDelta] = useState<number>(0);
  // Credits management
  const [credits, setCredits] = useState<number>(sheet?.credits ?? 0);
  const [creditsDelta, setCreditsDelta] = useState<number>(0);
  // Chem Tokens management (for Chemist class)
  const [chemTokens, setChemTokens] = useState<number>(sheet?.chemTokens ?? 0);
  
  // Summon HP management (for Elementalist and Technician classes)
  const [currentSummonHp, setCurrentSummonHp] = useState<number>(sheet?.currentSummonHp ?? 0);
  const [maxSummonHp, setMaxSummonHp] = useState<number>(sheet?.maxSummonHp ?? 0);
  const [summonHpDelta, setSummonHpDelta] = useState<number>(0);
  
  // Calculate effective Max Hit Points (base + class bonuses)
  const calculateEffectiveMaxHP = (baseHP: number, charClass: string): number => {
    let effectiveHP = baseHP;
    
    // Add Cerebronych species bonus
    if (sheet?.species === 'Cerebronych') {
      const speciesDots = sheet?.speciesCardDots || [];
      const hp5Dots = speciesDots[9] || [];
      const hp10Dots = speciesDots[10] || [];
      const hp15Dots = speciesDots[11] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = (hp15Dots[0] ? 15 : 0);
      
      effectiveHP += 30 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Avenoch species bonus
    if (sheet?.species === 'Avenoch') {
      const speciesDots = sheet?.speciesCardDots || [];
      const hp5Dots = speciesDots[4] || [];
      const hp10Dots = speciesDots[5] || [];
      const hp15Dots = speciesDots[6] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = (hp15Dots[0] ? 15 : 0);
      
      effectiveHP += 35 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Chloroptid species bonus
    if (sheet?.species === 'Chloroptid') {
      const speciesDots = sheet?.speciesCardDots || [];
      const hp5Dots = speciesDots[4] || [];
      const hp10Dots = speciesDots[5] || [];
      const hp15Dots = speciesDots[6] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = (hp15Dots[0] ? 15 : 0);
      
      effectiveHP += 40 + hp5Bonus + hp10Bonus + hp15Bonus;
      
      // Add Barkskin subspecies HP bonus
      if (sheet?.subspecies === 'Barkskin') {
        const subspeciesDots = sheet?.subspeciesCardDots || [];
        const barkskinHitPointsBonus = (subspeciesDots[7]?.filter(Boolean).length || 0) * 10;
        effectiveHP += barkskinHitPointsBonus;
      }
    }
    
    // Add Lumenaren species bonus
    if (sheet?.species === 'Lumenaren') {
      const speciesDots = sheet?.speciesCardDots || [];
      const hp5Dots = speciesDots[4] || [];
      const hp10Dots = speciesDots[5] || [];
      const hp15Dots = speciesDots[6] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = (hp15Dots[0] ? 15 : 0);
      
      effectiveHP += 30 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Petran subspecies bonus
    if (sheet?.subspecies === 'Petran') {
      const subspeciesDots = sheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[7] || [];
      const hp10Dots = subspeciesDots[8] || [];
      const hp15Dots = subspeciesDots[9] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
      
      effectiveHP += 50 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Pyran subspecies bonus
    if (sheet?.subspecies === 'Pyran') {
      const subspeciesDots = sheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[5] || [];
      const hp10Dots = subspeciesDots[6] || [];
      const hp15Dots = subspeciesDots[7] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
      
      effectiveHP += 40 + hp5Bonus + hp10Bonus + hp15Bonus;
    }

    // Add Apocritan subspecies bonus
    if (sheet?.subspecies === 'Apocritan') {
      const subspeciesDots = sheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[7] || [];
      const hp10Dots = subspeciesDots[8] || [];
      const hp15Dots = subspeciesDots[9] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
      
      effectiveHP += 40 + hp5Bonus + hp10Bonus + hp15Bonus;
    }

    // Add Dynastes subspecies bonus
    if (sheet?.subspecies === 'Dynastes') {
      const subspeciesDots = sheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[6] || [];
      const hp10Dots = subspeciesDots[7] || [];
      const hp15Dots = subspeciesDots[8] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
      
      effectiveHP += 45 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Ursid subspecies bonus
    if (sheet?.subspecies === 'Ursid') {
      const subspeciesDots = sheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[9] || [];
      const hp10Dots = subspeciesDots[10] || [];
      const hp15Dots = subspeciesDots[11] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
      
      effectiveHP += 45 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Mantid subspecies bonus
    if (sheet?.subspecies === 'Mantid') {
      const subspeciesDots = sheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[5] || [];
      const hp10Dots = subspeciesDots[6] || [];
      const hp15Dots = subspeciesDots[7] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
      
      effectiveHP += 35 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Diminutive Evolution subspecies bonus
    if (sheet?.subspecies === 'Diminutive Evolution') {
      const subspeciesDots = sheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[3] || [];
      const hp10Dots = subspeciesDots[4] || [];
      const hp15Dots = subspeciesDots[5] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = (hp15Dots[0] ? 15 : 0);
      
      effectiveHP += 40 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Lithe Evolution subspecies bonus
    if (sheet?.subspecies === 'Lithe Evolution') {
      const subspeciesDots = sheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[4] || [];
      const hp10Dots = subspeciesDots[5] || [];
      const hp15Dots = subspeciesDots[6] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = (hp15Dots[0] ? 15 : 0);
      
      effectiveHP += 40 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Massive Evolution subspecies bonus
    if (sheet?.subspecies === 'Massive Evolution') {
      const subspeciesDots = sheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[9] || [];
      const hp10Dots = subspeciesDots[10] || [];
      const hp15Dots = subspeciesDots[11] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
      
      effectiveHP += 45 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Stout Evolution subspecies bonus
    if (sheet?.subspecies === 'Stout Evolution') {
      const subspeciesDots = sheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[7] || [];
      const hp10Dots = subspeciesDots[8] || [];
      const hp15Dots = subspeciesDots[9] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
      
      effectiveHP += 40 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Canid subspecies bonus
    if (sheet?.subspecies === 'Canid') {
      const subspeciesDots = sheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[6] || [];
      const hp10Dots = subspeciesDots[7] || [];
      const hp15Dots = subspeciesDots[8] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
      
      effectiveHP += 40 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Felid subspecies bonus
    if (sheet?.subspecies === 'Felid') {
      const subspeciesDots = sheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[2] || [];
      const hp10Dots = subspeciesDots[3] || [];
      const hp15Dots = subspeciesDots[4] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = (hp15Dots[0] ? 15 : 0);
      
      effectiveHP += 35 + hp5Bonus + hp10Bonus + hp15Bonus;
    }

    // Add Mustelid subspecies bonus
    if (sheet?.subspecies === 'Mustelid') {
      const subspeciesDots = sheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[4] || [];
      const hp10Dots = subspeciesDots[5] || [];
      const hp15Dots = subspeciesDots[6] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = (hp15Dots[0] ? 15 : 0);
      
      effectiveHP += 30 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Cognizant species bonus
    if (sheet?.species === 'Cognizant') {
      const speciesDots = sheet?.speciesCardDots || [];
      const hp5Dots = speciesDots[5] || [];
      const hp10Dots = speciesDots[6] || [];
      const hp15Dots = speciesDots[7] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = (hp15Dots[0] ? 15 : 0);
      
      effectiveHP += 40 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Exospecialist gets +20 Max Hit Points
    if (charClass === "Exospecialist") {
      effectiveHP += 20;
      
      // Aeronaut subclass gets +5 Hit Points per dot
      if (sheet?.subclass === 'Aeronaut') {
        const aeronautHitPointsBonus = ((sheet?.subclassProgressionDots as any)?.aeronautHitPointsDots?.filter(Boolean).length || 0) * 5;
        effectiveHP += aeronautHitPointsBonus;
      }
      
      // Brawler subclass gets +10 Hit Points per dot
      if (sheet?.subclass === 'Brawler') {
        const brawlerHitPointsBonus = ((sheet?.subclassProgressionDots as any)?.brawlerHitPointsDots?.filter(Boolean).length || 0) * 10;
        effectiveHP += brawlerHitPointsBonus;
      }
      
      // Dreadnaught subclass gets +10 Hit Points per dot, plus +20 for extra dot
      if (sheet?.subclass === 'Dreadnaught') {
        const dreadnaughtHitPointsBonus = ((sheet?.subclassProgressionDots as any)?.dreadnaughtHitPointsDots?.filter(Boolean).length || 0) * 10 + (((sheet?.subclassProgressionDots as any)?.dreadnaughtHitPointsExtraDots?.[0]) ? 20 : 0);
        effectiveHP += dreadnaughtHitPointsBonus;
      }
      
      // Spectre subclass gets +10 Hit Points per dot
      if (sheet?.subclass === 'Spectre') {
        const spectreHitPointsBonus = ((sheet?.subclassProgressionDots as any)?.spectreHitPointsDots?.filter(Boolean).length || 0) * 10;
        effectiveHP += spectreHitPointsBonus;
      }
    }
    
    // Inertial subclass gets +5 Hit Points per dot (already included in baseHP/maxHitPoints)
    // No need to add here as it's updated directly in maxHitPoints when dots are selected
    
    return effectiveHP;
  };

  const effectiveMaxHP = calculateEffectiveMaxHP(maxHitPoints, charClass);
  
  // Background state
  const [background, setBackground] = useState(sheet?.background || "");
  
  // Mobile responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Background options
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

  // Sync state when sheet identity changes (i.e., switching to a different character)
  // This effect should ONLY run on sheet.id change, not on every prop change
  const prevSheetIdRef = useRef<string | undefined>(sheet?.id);
  React.useEffect(() => {
    // Only run full sync when switching to a different character
    if (sheet?.id !== prevSheetIdRef.current) {
      prevSheetIdRef.current = sheet?.id;
      
      setXpTotal(sheet?.xpTotal ?? 0);
      setSpTotal(sheet?.spTotal ?? 0);
      setMaxHitPoints(sheet?.maxHitPoints ?? 0);
      setSpSpent(sheet?.spSpent ?? 0);
      setXpSpent(sheet?.xpSpent ?? 0);
      setCurrentHitPoints(sheet?.currentHitPoints ?? sheet?.maxHitPoints ?? 0);
      setCredits(sheet?.credits ?? 0);
      setChemTokens(sheet?.chemTokens ?? 0);
      setCurrentSummonHp(sheet?.currentSummonHp ?? 0);
      setMaxSummonHp(sheet?.maxSummonHp ?? 0);
      setDeathCount(sheet?.deathCount || 0);
      setBackground(sheet?.background || "");
      // Update skillDots when sheet changes
      if (sheet?.skillDots) {
        setSkillDots(sheet.skillDots);
      } else {
        // Initialize with default empty state
        setSkillDots(Object.fromEntries(skillList.map(skill => [skill, Array(10).fill(false)])));
      }
    }
  }, [sheet?.id]);

  // Auto-dismiss notice after 2.5 seconds
  React.useEffect(() => {
    if (notice) {
      const timeout = setTimeout(() => setNotice("") , 2500);
      return () => clearTimeout(timeout);
    }
  }, [notice]);

  // Function to reset all XP/SP expenditures when foundational choices change
  const resetAllExpenditures = () => {
    if (!sheet) return null;

    // Reset all dot arrays to empty/false
    const resetSheet = {
      ...sheet,
      // Reset XP/SP spending
      xpSpent: 0,
      spSpent: 0,
      xpRemaining: sheet.xpTotal || 0,
      spRemaining: sheet.spTotal || 0,
      
      // Reset all progression dots
      classCardDots: Array(10).fill(false),
      chemistProgressionDots: Array(10).fill(false),
      coderProgressionDots: Array(10).fill(false),
      commanderProgressionDots: Array(10).fill(false),
      contemplativeProgressionDots: Array(10).fill(false),
      devoutProgressionDots: Array(10).fill(false),
      elementalistProgressionDots: Array(10).fill(false),
      exospecialistProgressionDots: Array(10).fill(false),
      gunslingerProgressionDots: Array(10).fill(false),
      technicianProgressionDots: Array(10).fill(false),
      
      // Reset subclass-specific progression dots
      subclassProgressionDots: {
        // Anatomist subclass progression
        anatomistFeatureDots: Array(10).fill(false),
        anatomistPrecisionHxDots: Array(10).fill(false),
        anatomistTechniqueRangeDots: Array(10).fill(false),
        anatomistTechniqueStrikeDamageDots: Array(10).fill(false),
        anatomistTechniqueStrikeDots: Array(10).fill(false),
        anatomistTechniqueCooldownDots: Array(10).fill(false),
        anatomistAttackDamageDots: Array(10).fill(false),
        anatomistAttackCritDots: Array(10).fill(false),
        anatomistAttackCooldownDots: Array(10).fill(false),
        anatomistStrikeDots: Array(10).fill(false),
        anatomistSurgeonDots: Array(10).fill(false),
        // Grenadier subclass progression
        grenadierFeatureDots: Array(10).fill(false),
        grenadierFeatureIncludesAlliesDots: Array(10).fill(false),
        grenadierFeatureAoEDots: Array(10).fill(false),
        grenadierFeatureImmunityDots: Array(10).fill(false),
        grenadierTechniqueDieSizeDots: Array(10).fill(false),
        grenadierTechniqueRangeDots: Array(10).fill(false),
        grenadierTechniqueCooldownDots: Array(10).fill(false),
        grenadierAttackAoEDots: Array(10).fill(false),
        grenadierAttackDamageDots: Array(10).fill(false),
        grenadierAttackCritDots: Array(10).fill(false),
        grenadierAttackCooldownDots: Array(10).fill(false),
        grenadierStrikeDots: Array(10).fill(false),
        grenadierExplosiveTemperDots: Array(10).fill(false),
        // Necro subclass progression
        necroFeatureDots: Array(10).fill(false),
        necroIgnoreDamageDots: Array(10).fill(false),
        necroTechniqueRangeDots: Array(10).fill(false),
        necroTechniqueInflictBlindDots: Array(10).fill(false),
        necroTechniqueCooldownDots: Array(10).fill(false),
        necroAttackSpeedDots: Array(10).fill(false),
        necroAttackDamageDots: Array(10).fill(false),
        necroAttackCritDots: Array(10).fill(false),
        necroAttackCooldownDots: Array(10).fill(false),
        necroPerksSkillsDots: Array(10).fill(false),
      },
      
      // Reset skill dots (keep only free starter dots)
      skillDots: sheet.hasFreeSkillStarterDots ? 
        Object.keys(sheet.skillDots || {}).reduce((acc, skill) => {
          acc[skill] = [true, true, ...Array(8).fill(false)]; // Only first two dots
          return acc;
        }, {} as { [key: string]: boolean[] }) : 
        {},
        
      // Reset any other progression systems that cost XP/SP
      // (Add more fields here as needed based on your character sheet structure)
    };

    return resetSheet;
  };

  // Wrapper functions for foundational choice changes with confirmation
  const handleCharClassChange = (newClass: string) => {
    if (!newClass || newClass === charClass) {
      setCharClass(newClass);
      return;
    }

    // Only show confirmation if XP or SP has been spent
    const hasExpenditures = (xpSpent > 0) || (spSpent > 0);
    
    if (hasExpenditures) {
      const confirmed = window.confirm(
        `Are you sure you want to change your class? Doing so will remove all selections that cost xp/sp!`
      );
      
      if (!confirmed) {
        return; // User cancelled, don't make the change
      }
    }

    // Make the change (with reset if there were expenditures)
    if (hasExpenditures) {
      const resetSheet = resetAllExpenditures();
      if (resetSheet) {
        const updatedSheet = { ...resetSheet, charClass: newClass, subclass: "" }; // Reset subclass too
        saveCharacterSheet(updatedSheet);
        
        // Update local state
        setXpSpent(0);
        setSpSpent(0);
        setClassCardDots(Array(10).fill(false));
        setSkillDots(resetSheet.skillDots);
        setSubclass("");
      }
    } else {
      // No expenditures, just update the class and reset subclass
      setSubclass(""); // Reset subclass when class changes
      handleAutoSave({ charClass: newClass, subclass: "" });
    }
    
    setCharClass(newClass);
  };

  const handleSubclassChange = (newSubclass: string) => {
    if (!newSubclass || newSubclass === subclass) {
      setSubclass(newSubclass);
      return;
    }

    // Subclass-to-class mapping for auto-populating class when subclass is selected first
    const subclassToClassMap: { [key: string]: string } = {
      // Chemist subclasses
      'Anatomist': 'Chemist', 'Grenadier': 'Chemist', 'Necro': 'Chemist', 'Poisoner': 'Chemist',
      // Coder subclasses
      'Coercive': 'Coder', 'Divinist': 'Coder', 'Naturalist': 'Coder', 'Technologist': 'Coder',
      // Commander subclasses
      'Beguiler': 'Commander', 'Galvanic': 'Commander', 'Tactician': 'Commander', 'Tyrant': 'Commander',
      // Contemplative subclasses
      'Inertial': 'Contemplative', 'Kinetic': 'Contemplative', 'Mercurial': 'Contemplative', 'Vectorial': 'Contemplative',
      // Devout subclasses
      'Astral': 'Devout', 'Chaos': 'Devout', 'Order': 'Devout', 'Void': 'Devout',
      // Elementalist subclasses
      'Air': 'Elementalist', 'Earth': 'Elementalist', 'Fire': 'Elementalist', 'Water': 'Elementalist',
      // Exospecialist subclasses
      'Aeronaut': 'Exospecialist', 'Brawler': 'Exospecialist', 'Dreadnaught': 'Exospecialist', 'Spectre': 'Exospecialist',
      // Gunslinger subclasses
      'Ammo Coder': 'Gunslinger', 'Ordnancer': 'Gunslinger', 'Pistoleer': 'Gunslinger', 'Sniper': 'Gunslinger',
      // Technician subclasses
      'Hacker': 'Technician', 'Junker': 'Technician', 'Nanoboticist': 'Technician', 'Tanker': 'Technician',
    };
    
    // Auto-populate class if not already set
    const correspondingClass = subclassToClassMap[newSubclass];

    // Only show confirmation if XP or SP has been spent
    const hasExpenditures = (xpSpent > 0) || (spSpent > 0);
    
    if (hasExpenditures) {
      const confirmed = window.confirm(
        `Are you sure you want to change your subclass? Doing so will remove all selections that cost xp/sp!`
      );
      
      if (!confirmed) {
        return; // User cancelled, don't make the change
      }
    }

    // Make the change (with reset if there were expenditures)
    if (hasExpenditures) {
      const resetSheet = resetAllExpenditures();
      if (resetSheet) {
        const updatedSheet = { 
          ...resetSheet, 
          subclass: newSubclass,
          // Auto-populate class if not set
          charClass: charClass || correspondingClass || resetSheet.charClass
        };
        saveCharacterSheet(updatedSheet);
        
        // Update local state
        setXpSpent(0);
        setSpSpent(0);
        setClassCardDots(Array(10).fill(false));
        setSkillDots(resetSheet.skillDots);
        
        // Auto-populate class if not set
        if (!charClass && correspondingClass) {
          setCharClass(correspondingClass);
        }
      }
    } else {
      // No expenditures, just update the subclass (and auto-populate class if needed)
      const updates: Partial<CharacterSheet> = { subclass: newSubclass };
      if (!charClass && correspondingClass) {
        updates.charClass = correspondingClass;
        setCharClass(correspondingClass);
      }
      handleAutoSave(updates);
    }
    
    setSubclass(newSubclass);
  };

  const handleSpeciesChange = (newSpecies: string) => {
    if (!newSpecies || newSpecies === species) {
      setSpecies(newSpecies);
      if (newSpecies !== species) {
        // Auto-set Cerebronych (cont.) when Cerebronych is selected
        const newSubspecies = newSpecies === "Cerebronych" ? "Cerebronych (cont.)" : "";
        setSubspecies(newSubspecies);
      }
      return;
    }

    // Only show confirmation if XP or SP has been spent
    const hasExpenditures = (xpSpent > 0) || (spSpent > 0);
    
    if (hasExpenditures) {
      const confirmed = window.confirm(
        `Are you sure you want to change your species? Doing so will remove all selections that cost xp/sp!`
      );
      
      if (!confirmed) {
        return; // User cancelled, don't make the change
      }
    }

    // Make the change (with reset if there were expenditures)
    if (hasExpenditures) {
      const resetSheet = resetAllExpenditures();
      if (resetSheet) {
        // Auto-set Cerebronych (cont.) when Cerebronych is selected
        const newSubspecies = newSpecies === "Cerebronych" ? "Cerebronych (cont.)" : "";
        const updatedSheet = { ...resetSheet, species: newSpecies, subspecies: newSubspecies };
        saveCharacterSheet(updatedSheet);
        
        // Update local state
        setXpSpent(0);
        setSpSpent(0);
        setClassCardDots(Array(10).fill(false));
        setSkillDots(resetSheet.skillDots);
        // Auto-set Cerebronych (cont.) when Cerebronych is selected
        const finalSubspecies = newSpecies === "Cerebronych" ? "Cerebronych (cont.)" : "";
        setSubspecies(finalSubspecies);
      }
    } else {
      // No expenditures, just update the species and reset subspecies
      // Auto-set Cerebronych (cont.) when Cerebronych is selected
      const newSubspecies = newSpecies === "Cerebronych" ? "Cerebronych (cont.)" : "";
      setSubspecies(newSubspecies);
      handleAutoSave({ species: newSpecies, subspecies: newSubspecies });
    }
    
    setSpecies(newSpecies);
    // Auto-set Cerebronych (cont.) when Cerebronych is selected
    const finalSubspecies = newSpecies === "Cerebronych" ? "Cerebronych (cont.)" : "";
    setSubspecies(finalSubspecies);
  };

  const handleSubspeciesChange = (newSubspecies: string) => {
    if (!newSubspecies || newSubspecies === subspecies) {
      setSubspecies(newSubspecies);
      return;
    }

    // Subspecies-to-species mapping for auto-populating species when subspecies is selected first
    const subspeciesToSpeciesMap: { [key: string]: string } = {
      // Avenoch subspecies
      'Corvid': 'Avenoch', 'Falcador': 'Avenoch', 'Nocturne': 'Avenoch', 'Vulturine': 'Avenoch',
      // Cerebronych subspecies
      'Cerebronych (cont.)': 'Cerebronych',
      // Chloroptid subspecies
      'Barkskin': 'Chloroptid', 'Carnivorous': 'Chloroptid', 'Drifting': 'Chloroptid', 'Viny': 'Chloroptid',
      // Cognizant subspecies
      'Android': 'Cognizant', 'Utility Droid': 'Cognizant',
      // Emberfolk subspecies
      'Petran': 'Emberfolk', 'Pyran': 'Emberfolk',
      // Entomos subspecies
      'Apocritan': 'Entomos', 'Dynastes': 'Entomos', 'Mantid': 'Entomos',
      // Human subspecies
      'Diminutive Evolution': 'Human', 'Lithe Evolution': 'Human', 'Massive Evolution': 'Human', 'Stout Evolution': 'Human',
      // Lumenaren subspecies
      'Infrared': 'Lumenaren', 'Radiofrequent': 'Lumenaren', 'X-Ray': 'Lumenaren',
      // Praedari subspecies
      'Canid': 'Praedari', 'Felid': 'Praedari', 'Mustelid': 'Praedari', 'Ursid': 'Praedari',
    };
    
    // Auto-populate species if not already set
    const correspondingSpecies = subspeciesToSpeciesMap[newSubspecies];

    // Only show confirmation if XP or SP has been spent
    const hasExpenditures = (xpSpent > 0) || (spSpent > 0);
    
    if (hasExpenditures) {
      const confirmed = window.confirm(
        `Are you sure you want to change your subspecies? Doing so will remove all selections that cost xp/sp!`
      );
      
      if (!confirmed) {
        return; // User cancelled, don't make the change
      }
    }

    // Make the change (with reset if there were expenditures)
    if (hasExpenditures) {
      const resetSheet = resetAllExpenditures();
      if (resetSheet) {
        const updatedSheet = { 
          ...resetSheet, 
          subspecies: newSubspecies,
          // Auto-populate species if not set
          species: species || correspondingSpecies || resetSheet.species
        };
        saveCharacterSheet(updatedSheet);
        
        // Update local state
        setXpSpent(0);
        setSpSpent(0);
        setClassCardDots(Array(10).fill(false));
        setSkillDots(resetSheet.skillDots);
        
        // Auto-populate species if not set
        if (!species && correspondingSpecies) {
          setSpecies(correspondingSpecies);
        }
      }
    } else {
      // No expenditures, just update the subspecies (and auto-populate species if needed)
      const updates: Partial<CharacterSheet> = { subspecies: newSubspecies };
      if (!species && correspondingSpecies) {
        updates.species = correspondingSpecies;
        setSpecies(correspondingSpecies);
      }
      handleAutoSave(updates);
    }
    
    setSubspecies(newSubspecies);
  };

  const handleBackgroundChange = (newBackground: string) => {
    if (!newBackground || newBackground === background) {
      setBackground(newBackground);
      return;
    }

    // Only show confirmation if XP or SP has been spent
    const hasExpenditures = (xpSpent > 0) || (spSpent > 0);
    
    if (hasExpenditures) {
      const confirmed = window.confirm(
        `Are you sure you want to change your background? Doing so will remove all selections that cost xp/sp!`
      );
      
      if (!confirmed) {
        return; // User cancelled, don't make the change
      }
    }

    // Make the change (with reset if there were expenditures)
    if (hasExpenditures) {
      const resetSheet = resetAllExpenditures();
      if (resetSheet) {
        const updatedSheet = { ...resetSheet, background: newBackground };
        saveCharacterSheet(updatedSheet);
        
        // Update local state
        setXpSpent(0);
        setSpSpent(0);
        setClassCardDots(Array(10).fill(false));
        setSkillDots(resetSheet.skillDots);
      }
    } else {
      // No expenditures, just update the background
      handleAutoSave({ background: newBackground });
    }
    
    setBackground(newBackground);
  };

  // Cross-window synchronization for this character (optimized)
  React.useEffect(() => {
    const sheetId = sheet?.id;
    
    const handleStorageChange = (e: StorageEvent) => {
      // Skip if we have pending local updates
      if (hasPendingUpdatesRef.current) return;
      
      if (e.key === "rpg-character-sheets" && sheetId) {
        // Reload the current character from storage
        const updatedSheet = loadSheetById(sheetId);
        if (updatedSheet) {
          // Update state with latest values
          setXpTotal(updatedSheet.xpTotal ?? 0);
          setSpTotal(updatedSheet.spTotal ?? 0);
          setMaxHitPoints(updatedSheet.maxHitPoints ?? 0);
          setXpSpent(updatedSheet.xpSpent ?? 0);
          setSpSpent(updatedSheet.spSpent ?? 0);
          setCredits(updatedSheet.credits ?? 0);
          setChemTokens(updatedSheet.chemTokens ?? 0);
          
          // Update dot states
          if (updatedSheet.classCardDots) {
            setClassCardDots(updatedSheet.classCardDots.map((row: boolean[]) => [...row]));
          }
          
          // Update skillDots
          if (updatedSheet.skillDots) {
            setSkillDots(updatedSheet.skillDots);
          }
          
          // Update character details
          setCharClass(updatedSheet.charClass || "");
          setSubclass(updatedSheet.subclass || "");
          setSpecies(updatedSheet.species || "");
          setSubspecies(updatedSheet.subspecies || "");
        }
      }
    };

    const handleCharacterUpdate = (e: CustomEvent<{ sheet: CharacterSheet }>) => {
      // Skip if we have pending local updates
      if (hasPendingUpdatesRef.current) return;
      
      if (sheetId && e.detail.sheet.id === sheetId) {
        const updatedSheet = e.detail.sheet;
        // Update state with latest values
        setXpTotal(updatedSheet.xpTotal ?? 0);
        setSpTotal(updatedSheet.spTotal ?? 0);
        setMaxHitPoints(updatedSheet.maxHitPoints ?? 0);
        setXpSpent(updatedSheet.xpSpent ?? 0);
        setSpSpent(updatedSheet.spSpent ?? 0);
        setCredits(updatedSheet.credits ?? 0);
        setChemTokens(updatedSheet.chemTokens ?? 0);
        
        // Update dot states
        if (updatedSheet.classCardDots) {
          setClassCardDots(updatedSheet.classCardDots.map((row: boolean[]) => [...row]));
        }
        
        // Update skillDots
        if (updatedSheet.skillDots) {
          setSkillDots(updatedSheet.skillDots);
        }
        
        // Update character details
        setCharClass(updatedSheet.charClass || "");
        setSubclass(updatedSheet.subclass || "");
        setSpecies(updatedSheet.species || "");
        setSubspecies(updatedSheet.subspecies || "");
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
  }, [sheet?.id, setCharClass, setSubclass, setSpecies, setSubspecies]);

  // Auto-save when XP/SP totals change (debounced)
  const xpSpSaveTimeoutRef = useRef<number | null>(null);
  React.useEffect(() => {
    if (sheet && (sheet.xpTotal !== xpTotal || sheet.spTotal !== spTotal)) {
      // Clear any pending save
      if (xpSpSaveTimeoutRef.current) {
        clearTimeout(xpSpSaveTimeoutRef.current);
      }
      
      // Debounce the save by 300ms for typing
      xpSpSaveTimeoutRef.current = setTimeout(() => {
        const updatedSheet = { ...sheet, xpTotal, spTotal };
        saveCharacterSheet(updatedSheet);
      }, 300);
    }
    
    return () => {
      if (xpSpSaveTimeoutRef.current) {
        clearTimeout(xpSpSaveTimeoutRef.current);
      }
    };
  }, [xpTotal, spTotal, sheet]);

  // Auto-save skillDots when they change (but not on initial load, debounced)
  const skillDotsSaveTimeoutRef = useRef<number | null>(null);
  React.useEffect(() => {
    if (sheet && sheet.skillDots && JSON.stringify(sheet.skillDots) !== JSON.stringify(skillDots)) {
      // Clear any pending save
      if (skillDotsSaveTimeoutRef.current) {
        clearTimeout(skillDotsSaveTimeoutRef.current);
      }
      
      // Debounce the save by 200ms
      skillDotsSaveTimeoutRef.current = setTimeout(() => {
        const updatedSheet = {
          ...sheet,
          skillDots,
          spRemaining: spTotal - spSpent
        };
        saveCharacterSheet(updatedSheet);
      }, 200);
    }
    
    return () => {
      if (skillDotsSaveTimeoutRef.current) {
        clearTimeout(skillDotsSaveTimeoutRef.current);
      }
    };
  }, [skillDots, sheet, spTotal, spSpent]);

  // Sync classCardDots state when sheet or charClass changes
  React.useEffect(() => {
    if (!sheet?.classCardDots || !Array.isArray(sheet.classCardDots) || sheet.classCardDots.length === 0) {
      return; // No saved dots to sync
    }

    // Helper to normalize loaded dots to match the default structure
    function normalizeDots(loaded: boolean[][], def: boolean[][]) {
      const result: boolean[][] = [];
      for (let i = 0; i < def.length; ++i) {
        if (Array.isArray(loaded?.[i]) && loaded[i].length === def[i].length) {
          result.push([...loaded[i]]);
        } else {
          // If missing or wrong length, use default
          result.push([...def[i]]);
        }
      }
      return result;
    }

    // Get the appropriate default dots for the current class
    let defaultDots: boolean[][] = [];
    if (charClass === "Contemplative") {
      defaultDots = [
        [false], // Feature: Neural immunity (1 dot)
        [false], // Feature: +1 Strike (1 dot)
        [false], // Technique: Healing (1 dot)
        [false], // Technique: +1 Target (1 dot)
        [false], // Technique: +1 Range (1 dot)
        [false], // Attack: Increase die size (1 dot)
        [false], // Attack: +1 Crit (1 dot)
        [false, false, false], // Strike: +1 Damage die (3 dots)
        [false] // Perks: Relaxation (1 dot)
      ];
    } else if (charClass === "Chemist") {
      defaultDots = [
        [false, false], // Feature: +1 Chem Token max (2 dots)
        [false, false, false], // Feature: +2 Crit (3 dots)
        [false, false, false], // Technique: +1hx (3 dots)
        [false], // Technique: +1d6 Chemical per Token (1 dot)
        [false], // Technique: +1hx Range per Token (1 dot)
        [false, false], // Technique: -1 Cooldown (2 dots)
        [false, false, false], // Attack: Increase die size (3 dots)
        [false, false, false], // Attack: +1 Crit (3 dots)
        [false, false, false], // Strike: +1 Damage die (3 dots)
        [false] // Perks: Chemical Concoctions (1 dot)
      ];
    }
    // Add other classes as needed...

    if (defaultDots.length > 0) {
      const normalizedDots = normalizeDots(sheet.classCardDots, defaultDots);
      setClassCardDots(normalizedDots);
    }
  }, [sheet?.classCardDots, charClass]);

  // Mobile responsive effect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Persistent state for class card dots
  const defaultChemistDots = [ 
    [false, false], // Feature: +1 Chem Token max (2 dots)
    [false],        // Feature: +2 Crit (1 dot)
    [false, false, false], // Technique: +1hx (3 dots)
    [false],        // Technique: +1d6 Chemical per Token (1 dot)
    [false],        // Technique: +1hx Range per Token (1 dot)
    [false, false], // Technique: -1 Cooldown (2 dots)
    [false, false, false], // Attack: Increase die size (3 dots)
    [false, false, false], // Attack: +1 Crit (3 dots)
    [false, false, false], // Strike: +1 Damage die (3 dots)
    [false]         // Perks: Chemical Concoctions (1 dot)
  ];

  // Coder dots structure: Feature(4), Technique(5), Attack(11), Perks(1)
  const defaultCoderDots = [
    [false],                // Feature: Ignore 100% Cover (1 dot)
    [false, false, false],  // Feature: +1 Crit (3 dots)
    [false, false, false],  // Technique: +1d6 Damage (3 dots)
    [false],                // Technique: Resist all Damage (1 dot)
    [false],                // Technique: Damage immunity (1 dot)
    [false, false],         // Technique: -1 Cooldown (2 dots)
    [false, false, false],  // Primary Attack: Increase die size (3 dots)
    [false, false, false],  // Primary Attack: +1 Crit (3 dots)
    [false, false, false],  // Secondary Attack: +3hx-chain AoE (3 dots)
    [false, false, false],  // Secondary Attack: +1 Damage die (3 dots)
    [false, false, false],  // Secondary Attack: +1 Crit (3 dots)
    [false, false],         // Secondary Attack: -1 Cooldown (2 dots)
    [false]                 // Perks: Code Reader (1 dot)
  ];

  // Contemplative dots structure: Feature, Technique, Attack, Perks
  const defaultContemplativeDots = [
    [false],                // Feature: Neural immunity (1 dot)
    [false],                // Feature: +1 Strike (1 dot)
    [false],                // Feature: Can Strike single target multiple times (1 dot)
    [false, false, false],  // Technique: +1hx (3 dots)
    [false, false],         // Technique: -1 Cooldown (2 dots)
    [false, false, false],  // Primary Attack: Repeat +1 (3 dots)
    [false, false, false],  // Primary Attack: Increase die size (3 dots)
    [false, false, false],  // Primary Attack: +1 Crit (3 dots)
    [false, false],         // Secondary Attack: Increase die size (2 dots)
    [false, false, false],  // Secondary Attack: +1 Damage die (3 dots)
    [false, false, false],  // Secondary Attack: +1 Crit (3 dots)
    [false, false],         // Secondary Attack: -1 Cooldown (2 dots)
    [false]                 // Perks: Inherent Telepath (1 dot)
  ];
  const defaultCommanderDots = [
    [false, false, false], // Feature: +1hx (3 dots)
    [false],               // Feature: Includes Attacks (1 dot)
    [false],               // Feature: 10xp (1 dot)
    [false, false, false], // Technique: +1hx (3 dots)
    [false, false, false], // Technique: +1 ally (3 dots)
    [false, false],        // Technique: -1 Cooldown (2 dots)
    [false, false, false], // Attack: +1 Damage die (3 dots)
    [false, false, false], // Attack: +1 Crit (3 dots)
    [false, false],        // Strike: +1 Damage die (2 dots)
    [false]                // Perks: Natural Leader (1 dot)
  ];
  // Devout dots structure: Feature, Technique, Primary Attack, Secondary Attack, Perks
  const defaultDevoutDots = [
    [false, false],         // Feature: +1d6 Damage (2 dots)
    [false],                // Technique: +1hx Attack Range for each point (1 dot)
    [false],                // Technique: +1d6 Attack Damage for each point (1 dot)
    [false, false],         // Technique: -1 Cooldown (2 dots)
    [false, false, false],  // Primary Attack: Increase die size (3 dots)
    [false, false, false],  // Primary Attack: +1 Crit (3 dots)
    [false, false, false],  // Secondary Attack: +1 Damage die (3 dots)
    [false, false, false],  // Secondary Attack: +1hx-Cone AoE (3 dots)
    [false, false, false],  // Secondary Attack: +1 Crit (3 dots)
    [false, false],         // Secondary Attack: -1 Cooldown (2 dots)
    [false]                 // Perks: Higher Power (1 dot)
  ];
  // Elementalist dots structure: Feature, Technique, Primary Attack, Secondary Attack, Perks
  const defaultElementalistDots = [
    [false, false, false],  // Feature: +1hx (3 dots)
    [false, false, false],  // Feature: Deal +1d6 or  on next Attack or Strike (3 dots)
    [false],                // Technique: Triple Damage dice (1 dot)
    [false, false],         // Technique: -1 Cooldown (2 dots)
    [false, false, false],  // Primary Attack: +2 Damage dice (3 dots)
    [false, false, false],  // Primary Attack: +2hx Range (3 dots)
    [false, false, false],  // Primary Attack: +1 Crit (3 dots)
    [false, false, false],  // Secondary Attack: +1hx Range (3 dots)
    [false, false],         // Secondary Attack: Repeat +1 (2 dots)
    [false, false, false],  // Secondary Attack: +2hx Speed (3 dots)
    [false, false, false],  // Secondary Attack: +1 Crit (3 dots)
    [false, false, false],  // Secondary Attack: Summon +5 Hit Points (3 dots)
    [false, false],         // Secondary Attack: -1 Cooldown (2 dots)
    [false]                 // Perks: Elemental Detection (1 dot)
  ];
  // Exospecialist dots structure: Technique, Primary Attack, Secondary Attack, Perks
  const defaultExospecialistDots = [
    [false, false, false],  // Technique: +1hx (3 dots)
    [false, false, false],  // Technique: +2 Crit (3 dots)
    [false],                // Technique: Ignore 100% Cover (1 dot)
    [false, false],         // Technique: -1 Cooldown (2 dots)
    [false, false, false],  // Primary Attack: +2 Damage dice (3 dots)
    [false, false, false],  // Primary Attack: +1 Crit (3 dots)
    [false, false, false],  // Secondary Attack: +1 Damage die (3 dots)
    [false, false],         // Secondary Attack: Repeat +1 (2 dots)
    [false, false, false],  // Secondary Attack: +3hx Range (3 dots)
    [false, false, false],  // Secondary Attack: +1 Crit (3 dots)
    [false, false],         // Secondary Attack: -1 Cooldown (2 dots)
    [false]                 // Perks: Man in the Machine (1 dot)
  ];
  // Gunslinger dots structure: Feature, Technique, Secondary Attack, Perks
  const defaultGunslingerDots = [
    [false, false, false],  // Feature: +1 Crit (3 dots)
    [false, false, false],  // Feature: +1hx Attack Range (3 dots)
    [false, false, false],  // Technique: +1 Attack (3 dots)
    [false, false],         // Technique: +1 Creature (2 dots)
    [false, false],         // Technique: -1 Cooldown (2 dots)
    [false],                // Secondary Attack: Fire three times (1 dot)
    [false, false],         // Secondary Attack: -1 Cooldown (2 dots)
    [false]                 // Perks: Gunslinger's Grit (1 dot)
  ];
  // Technician dots structure: Feature(2), Technique(5), Attack(4), Strike(1), Perks(1)
  const defaultTechnicianDots = [
    [false, false, false],  // Feature: +1hx (3 dots)
    [false, false, false],  // Feature: +1d6 Hit Points (3 dots)
    [false, false, false],  // Technique: +2hx-chain AoE (3 dots)
    [false],                // Technique: Includes Sleep (1 dot)
    [false],                // Technique: Affects Fly (1 dot)
    [false],                // Technique: +1 condition (1 dot)
    [false, false],         // Technique: -1 Cooldown (2 dots)
    [false, false, false],  // Attack: +1hx AoE (3 dots)
    [false],                // Attack: Optional Range: Drone Self (1 dot)
    [false, false, false],  // Attack: +1 Crit (3 dots)
    [false, false],         // Attack: -1 Cooldown (2 dots)
    [false, false],         // Strike: +1 Damage die (2 dots)
    [false]                 // Perks: Machinist (1 dot)
  ];
  const [classCardDots, setClassCardDots] = useState<boolean[][]>(() => {
    // Helper to normalize loaded dots to match the default structure
    function normalizeDots(loaded: boolean[][], def: boolean[][]) {
      const result: boolean[][] = [];
      for (let i = 0; i < def.length; ++i) {
        if (Array.isArray(loaded?.[i]) && loaded[i].length === def[i].length) {
          result.push([...loaded[i]]);
        } else {
          // If missing or wrong length, use default
          result.push([...def[i]]);
        }
      }
      return result;
    }
    if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && sheet.classCardDots.length > 0) {
      if (charClass === "Contemplative") {
        return normalizeDots(sheet.classCardDots, defaultContemplativeDots);
      }
      if (charClass === "Commander") {
        return normalizeDots(sheet.classCardDots, defaultCommanderDots);
      }
      if (charClass === "Coder") {
        return normalizeDots(sheet.classCardDots, defaultCoderDots);
      }
      if (charClass === "Devout") {
        return normalizeDots(sheet.classCardDots, defaultDevoutDots);
      }
      if (charClass === "Elementalist") {
        return normalizeDots(sheet.classCardDots, defaultElementalistDots);
      }
      if (charClass === "Exospecialist") {
        return normalizeDots(sheet.classCardDots, defaultExospecialistDots);
      }
      if (charClass === "Technician") {
        return normalizeDots(sheet.classCardDots, defaultTechnicianDots);
      }
      if (charClass === "Chemist") {
        return normalizeDots(sheet.classCardDots, defaultChemistDots);
      }
      if (charClass === "Gunslinger") {
        return normalizeDots(sheet.classCardDots, defaultGunslingerDots);
      }
    }
    // Default based on current class
    if (charClass === "Coder") {
      return defaultCoderDots.map(row => [...row]);
    }
    if (charClass === "Commander") {
      return defaultCommanderDots.map(row => [...row]);
    }
    if (charClass === "Contemplative") {
      return defaultContemplativeDots.map(row => [...row]);
    }
    if (charClass === "Devout") {
      return defaultDevoutDots.map(row => [...row]);
    }
    if (charClass === "Elementalist") {
      return defaultElementalistDots.map(row => [...row]);
    }
    if (charClass === "Exospecialist") {
      return defaultExospecialistDots.map(row => [...row]);
    }
    if (charClass === "Technician") {
      return defaultTechnicianDots.map(row => [...row]);
    }
    if (charClass === "Chemist") {
      return defaultChemistDots.map(row => [...row]);
    }
    // Default fallback - return empty array if no class matches
    return [];
  });

  // Class options (copied from CharacterEditor)
  const classOptions = [
    { label: "Chemist", value: "Chemist", color: "#721131" },
    { label: "Coder", value: "Coder", color: "#112972" },
    { label: "Commander", value: "Commander", color: "#717211" },
    { label: "Contemplative", value: "Contemplative", color: "#116372" },
    { label: "Devout", value: "Devout", color: "#6b1172" },
    { label: "Elementalist", value: "Elementalist", color: "#231172" },
    { label: "Exospecialist", value: "Exospecialist", color: "#117233" },
    { label: "Gunslinger", value: "Gunslinger", color: "#4e7211" },
    { label: "Technician", value: "Technician", color: "#724811" }
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
    Cerebronych: [
      { label: "Cerebronych (cont.)", value: "Cerebronych (cont.)", color: "#5f5e2b", species: "Cerebronych" },
    ],
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
  const subspeciesOptions = subspeciesOptionsMap[species] || [];


  return (
    <div style={{ padding: "1rem" }}>
  {/* Level Up header moved to App.tsx for right alignment */}
      
      {/* 4-column, 2-row CSS grid, outer grey box removed */}
  <div className={styles.characterSheetGrid} style={{ 
    marginTop: '0.5rem',
    marginBottom: '2rem',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
    gap: isMobile ? '1rem' : '1.2rem'
  }}>
        
    
        {/* Class Card */}
        <div style={{ background: '#fff', border: '2px solid #333', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: 80, padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', marginBottom: 6 }}>Class</div>
            <div className={styles.selectWrapper} style={{ width: '100%' }}>
              <select
                value={charClass}
                onChange={e => {
                  handleCharClassChange(e.target.value);
                  handleAutoSave({ charClass: e.target.value });
                }}
                className={styles.colorSelect + ' ' + styles.selectedClassColor}
                style={{
                  '--selected-class-color': (charClass && classOptions.find(opt => opt.value === charClass)?.color) || '#000',
                  fontWeight: 'bold',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  textAlign: 'center',
                  color: `${(charClass && classOptions.find(opt => opt.value === charClass)?.color) || '#000'} !important`,
                  minWidth: '120px',
                  background: 'white',
                  width: '100%',
                  fontSize: '1.3em'
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

            {/* Class Content - Use specific component based on class */}
            {charClass && (
              <>
                {charClass === "Chemist" ? (
                  <LevelUpClassChemist
                    sheet={sheet}
                    charClass={charClass}
                    subclass={subclass}
                    onCreditsChange={handleCreditsChangeNoSave}
                    onAutoSave={handleAutoSave}
                    xpTotal={xpTotal}
                    spTotal={spTotal}
                    xpSpent={xpSpent}
                    spSpent={spSpent}
                    credits={credits}
                    setXpSpent={setXpSpent}
                    setSpSpent={setSpSpent}
                    setNotice={setNotice}
                  />
                ) : charClass === "Coder" ? (
                  <LevelUpClassCoder
                    sheet={sheet}
                    charClass={charClass}
                    subclass={subclass}
                    onCreditsChange={handleCreditsChangeNoSave}
                    onAutoSave={handleAutoSave}
                    xpTotal={xpTotal}
                    spTotal={spTotal}
                    xpSpent={xpSpent}
                    spSpent={spSpent}
                    credits={credits}
                    setXpSpent={setXpSpent}
                    setSpSpent={setSpSpent}
                    setNotice={setNotice}
                  />
                ) : charClass === "Commander" ? (
                  <LevelUpClassCommander
                    sheet={sheet}
                    charClass={charClass}
                    _subclass={subclass}
                    onAutoSave={handleAutoSave}
                    xpTotal={xpTotal}
                    spTotal={spTotal}
                    xpSpent={xpSpent}
                    spSpent={spSpent}
                    setXpSpent={setXpSpent}
                    setSpSpent={setSpSpent}
                    setNotice={setNotice}
                    onCreditsChange={handleCreditsChangeNoSave}
                    credits={credits}
                  />
                ) : charClass === "Contemplative" ? (
                  <LevelUpClassContemplative
                    sheet={sheet}
                    charClass={charClass}
                    _subclass={subclass}
                    onCreditsChange={handleCreditsChangeNoSave}
                    onAutoSave={handleAutoSave}
                    xpTotal={xpTotal}
                    spTotal={spTotal}
                    xpSpent={xpSpent}
                    spSpent={spSpent}
                    credits={credits}
                    setXpSpent={setXpSpent}
                    setSpSpent={setSpSpent}
                    setNotice={setNotice}
                  />
                ) : charClass === "Devout" ? (
                  <LevelUpClassDevout
                    sheet={sheet}
                    charClass={charClass}
                    _subclass={subclass}
                    onCreditsChange={handleCreditsChangeNoSave}
                    onAutoSave={handleAutoSave}
                    xpTotal={xpTotal}
                    spTotal={spTotal}
                    xpSpent={xpSpent}
                    spSpent={spSpent}
                    credits={credits}
                    setXpSpent={setXpSpent}
                    setSpSpent={setSpSpent}
                    setNotice={setNotice}
                  />
                ) : charClass === "Elementalist" ? (
                  <LevelUpClassElementalist
                    sheet={sheet}
                    charClass={charClass}
                    subclass={subclass}
                    onCreditsChange={handleCreditsChangeNoSave}
                    onAutoSave={handleAutoSave}
                    xpTotal={xpTotal}
                    spTotal={spTotal}
                    xpSpent={xpSpent}
                    spSpent={spSpent}
                    credits={credits}
                    setXpSpent={setXpSpent}
                    setSpSpent={setSpSpent}
                    setNotice={setNotice}
                  />
                ) : charClass === "Exospecialist" ? (
                  <LevelUpClassExospecialist
                    sheet={sheet}
                    charClass={charClass}
                    _subclass={subclass}
                    onAutoSave={handleAutoSave}
                    xpTotal={xpTotal}
                    spTotal={spTotal}
                    xpSpent={xpSpent}
                    spSpent={spSpent}
                    setXpSpent={setXpSpent}
                    setSpSpent={setSpSpent}
                    setNotice={setNotice}
                  />
                ) : charClass === "Gunslinger" ? (
                  <LevelUpClassGunslinger
                    sheet={sheet}
                    charClass={charClass}
                    _subclass={subclass}
                    onAutoSave={handleAutoSave}
                    xpTotal={xpTotal}
                    spTotal={spTotal}
                    xpSpent={xpSpent}
                    spSpent={spSpent}
                    setXpSpent={setXpSpent}
                    setSpSpent={setSpSpent}
                    setNotice={setNotice}
                  />
                ) : charClass === "Technician" ? (
                  <LevelUpClassTechnician
                    sheet={sheet}
                    charClass={charClass}
                    _subclass={subclass}
                    onAutoSave={handleAutoSave}
                    onCreditsChange={handleCreditsChangeNoSave}
                    xpTotal={xpTotal}
                    spTotal={spTotal}
                    xpSpent={xpSpent}
                    spSpent={spSpent}
                    setXpSpent={setXpSpent}
                    setSpSpent={setSpSpent}
                    setNotice={setNotice}
                  />
                ) : null}
              </>
            )}
        </div>


        {/* Subclass Card */}
        <div style={{ background: '#fff', border: '2px solid #333', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: 80, padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', marginBottom: 6 }}>Subclass</div>
            <div className={styles.selectWrapper} style={{ width: '100%' }}>
              <select
                value={subclass}
                onChange={e => {
                  const val = e.target.value;
                  handleSubclassChange(val);
                  if (!charClass && val) {
                    const found = allSubclassOptions.find(opt => opt.value === val);
                    if (found) {
                      handleCharClassChange(found.class);
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
                  background: 'white',
                  width: '100%',
                  fontSize: '1.3em'
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

            {/* Chemist Subclass Content */}
            {charClass === "Chemist" && subclass && (
              <LevelUpSubclassesChemist
                sheet={sheet}
                charClass={charClass}
                subclass={subclass} 
                onCreditsChange={handleCreditsChangeNoSave}
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                credits={credits}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Coder Subclass Content */}
            {charClass === "Coder" && subclass && (
              <LevelUpSubclassesCoder
                sheet={sheet}
                charClass={charClass}
                subclass={subclass}
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Commander Subclass Content */}
            {charClass === "Commander" && subclass && (
              <LevelUpSubclassesCommander
                sheet={sheet}
                charClass={charClass}
                subclass={subclass}
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Contemplative Subclass Content */}
            {charClass === "Contemplative" && subclass && (
              <LevelUpSubclassesContemplative
                sheet={sheet}
                charClass={charClass}
                subclass={subclass}
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Devout Subclass Content */}
            {charClass === "Devout" && subclass && (
              <LevelUpSubclassesDevout
                sheet={sheet}
                charClass={charClass}
                subclass={subclass}
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Elementalist Subclass Content */}
            {charClass === "Elementalist" && subclass && (
              <LevelUpSubclassesElementalist
                sheet={sheet}
                charClass={charClass}
                subclass={subclass}
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Exospecialist Subclass Content */}
            {charClass === "Exospecialist" && subclass && (
              <LevelUpSubclassesExospecialist
                sheet={sheet}
                charClass={charClass}
                subclass={subclass}
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Gunslinger Subclass Content */}
            {charClass === "Gunslinger" && subclass && (
              <LevelUpSubclassesGunslinger
                sheet={sheet}
                charClass={charClass}
                subclass={subclass}
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Technician Subclass Content */}
            {charClass === "Technician" && subclass && (
              <LevelUpSubclassesTechnician
                sheet={sheet}
                charClass={charClass}
                subclass={subclass}
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                credits={credits}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
        </div>


        {/* Species Card */}
        <div style={{ background: '#fff', border: '2px solid #333', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: 80, padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', marginBottom: 6 }}>Species</div>
            <div className={styles.selectWrapper} style={{ width: '100%' }}>
              <select
                value={species}
                onChange={e => {
                  handleSpeciesChange(e.target.value);
                  // Don't call handleAutoSave here - handleSpeciesChange handles it
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
                  background: 'white',
                  width: '100%',
                  fontSize: '1.3em'
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

            {/* Avenoch Species Content */}
            {species === "Avenoch" && (
              <LevelUpSpeciesAvenoch
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="species"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Cerebronych Species Content */}
            {species === "Cerebronych" && (
              <LevelUpSpeciesCerebronych
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="species"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Chloroptid Species Content */}
            {species === "Chloroptid" && (
              <LevelUpSpeciesChloroptid
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="species"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Emberfolk Species Content */}
            {species === "Emberfolk" && (
              <LevelUpSpeciesEmberfolk
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="species"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Entomos Species Content */}
            {species === "Entomos" && (
              <LevelUpSpeciesEntomos
                sheet={sheet}
                species={species}
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Lumenaren Species Content */}
            {species === "Lumenaren" && (
              <LevelUpSpeciesLumenaren
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="species"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Human Species Content */}
            {species === "Human" && (
              <LevelUpSpeciesHuman
                sheet={sheet}
                species={species}
                contentType="species"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Cognizant Species Content */}
            {species === "Cognizant" && (
              <LevelUpSpeciesCognizant
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="species"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Praedari Species Content */}
            {species === "Praedari" && (
              <LevelUpSpeciesPraedari
                sheet={sheet}
                species={species}
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
        </div>
        {/* Subspecies Card */}
        <div style={{ background: '#fff', border: '2px solid #333', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: 80, padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', marginBottom: 6 }}>Subspecies</div>
            
            {/* Cerebronych shows static text instead of dropdown */}
            {species === "Cerebronych" ? (
              <div className={styles.selectWrapper} style={{ width: '100%' }}>
                <div 
                  className={styles.colorSelect + ' ' + styles.selectedSubspeciesColor}
                  style={{
                    '--selected-subspecies-color': '#5f5e2b',
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    color: '#5f5e2b !important',
                    minWidth: '120px',
                    background: 'white',
                    width: '100%',
                    fontSize: '1.3em',
                    fontFamily: 'Arial, Helvetica, sans-serif'
                  } as React.CSSProperties}
                >
                  Cerebronych (cont.)
                </div>
              </div>
            ) : (
              <div className={styles.selectWrapper} style={{ width: '100%' }}>
                <select
                  value={subspecies}
                  onChange={e => {
                    const val = e.target.value;
                    handleSubspeciesChange(val);
                    if (!species && val) {
                      const found = allSubspeciesOptions.find(opt => opt.value === val);
                      if (found) {
                        handleSpeciesChange(found.species);
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
                    background: 'white',
                    width: '100%',
                    fontSize: '1.3em'
                  } as React.CSSProperties}
                >
                  <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                    Select Subspecies
                  </option>
                  {(species ? subspeciesOptions : allSubspeciesOptions).map(opt => (
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
            )}
            
            {/* Corvid Subspecies Content */}
            {subspecies === "Corvid" && (
              <LevelUpSpeciesAvenoch
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Falcador Subspecies Content */}
            {subspecies === "Falcador" && (
              <LevelUpSpeciesAvenoch
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Nocturne Subspecies Content */}
            {subspecies === "Nocturne" && (
              <LevelUpSpeciesAvenoch
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Vulturine Subspecies Content */}
            {subspecies === "Vulturine" && (
              <LevelUpSpeciesAvenoch
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Barkskin Subspecies Content */}
            {subspecies === "Barkskin" && (
              <LevelUpSpeciesChloroptid
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Carnivorous Subspecies Content */}
            {subspecies === "Carnivorous" && (
              <LevelUpSpeciesChloroptid
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Drifting Subspecies Content */}
            {subspecies === "Drifting" && (
              <LevelUpSpeciesChloroptid
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Viny Subspecies Content */}
            {subspecies === "Viny" && (
              <LevelUpSpeciesChloroptid
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Android Subspecies Content */}
            {subspecies === "Android" && (
              <LevelUpSpeciesCognizant
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Utility Droid Subspecies Content */}
            {subspecies === "Utility Droid" && (
              <LevelUpSpeciesCognizant
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Petran Subspecies Content */}
            {subspecies === "Petran" && (
              <LevelUpSpeciesEmberfolk
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Pyran Subspecies Content */}
            {subspecies === "Pyran" && (
              <LevelUpSpeciesEmberfolk
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Apocritan Subspecies Content */}
            {subspecies === "Apocritan" && (
              <LevelUpSpeciesEntomos
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Dynastes Subspecies Content */}
            {subspecies === "Dynastes" && (
              <LevelUpSpeciesEntomos
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {subspecies === "Mantid" && (
              <LevelUpSpeciesEntomos
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Diminutive Evolution Subspecies Content */}
            {subspecies === "Diminutive Evolution" && (
              <LevelUpSpeciesHuman
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Lithe Evolution Subspecies Content */}
            {subspecies === "Lithe Evolution" && (
              <LevelUpSpeciesHuman
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Massive Evolution Subspecies Content */}
            {subspecies === "Massive Evolution" && (
              <LevelUpSpeciesHuman
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Stout Evolution Subspecies Content */}
            {subspecies === "Stout Evolution" && (
              <LevelUpSpeciesHuman
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Infrared Subspecies Content */}
            {subspecies === "Infrared" && (
              <LevelUpSpeciesLumenaren
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Radiofrequent Subspecies Content */}
            {subspecies === "Radiofrequent" && (
              <LevelUpSpeciesLumenaren
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* X-Ray Subspecies Content */}
            {subspecies === "X-Ray" && (
              <LevelUpSpeciesLumenaren
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Canid Subspecies Content */}
            {subspecies === "Canid" && (
              <LevelUpSpeciesPraedari
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Felid Subspecies Content */}
            {subspecies === "Felid" && (
              <LevelUpSpeciesPraedari
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Mustelid Subspecies Content */}
            {subspecies === "Mustelid" && (
              <LevelUpSpeciesPraedari
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}

            {/* Ursid Subspecies Content */}
            {subspecies === "Ursid" && (
              <LevelUpSpeciesPraedari
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
            
            {/* Cerebronych (cont.) Subspecies Content */}
            {species === "Cerebronych" && (
              <LevelUpSpeciesCerebronych
                sheet={sheet}
                species={species}
                subspecies={subspecies}
                contentType="subspecies"
                onAutoSave={handleAutoSave}
                xpTotal={xpTotal}
                spTotal={spTotal}
                xpSpent={xpSpent}
                spSpent={spSpent}
                setXpSpent={setXpSpent}
                setSpSpent={setSpSpent}
                setNotice={setNotice}
              />
            )}
        </div>


        {/* Background Card */}
        <div style={{ background: '#fff', border: '2px solid #000', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: 80, padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', marginBottom: 6 }}>Background</div>
            <div className={styles.selectWrapper} style={{ width: '100%', marginBottom: '1rem' }}>
            <select
              value={background}
              onChange={e => {
                const newBackground = e.target.value;
                // Check prerequisite for Awakened Machine
                if (newBackground === "Awakened Machine" && species !== "Cognizant") {
                  if (setNotice) setNotice("Prerequisite: Species must be Cognizant");
                  return;
                }
                handleBackgroundChange(newBackground);
                handleAutoSave({ background: newBackground });
              }}
              className={styles.colorSelect + ' ' + styles.selectedBackgroundColor}
              style={{
                '--selected-background-color': (background && backgroundOptions.find(opt => opt.value === background)?.color) || '#000',
                fontWeight: 'bold',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                textAlign: 'center',
                color: `${(background && backgroundOptions.find(opt => opt.value === background)?.color) || '#000'} !important`,
                minWidth: '180px',
                background: 'white',
                width: '100%',
                fontSize: '1.3em',
                appearance: 'none',
                MozAppearance: 'none',
                WebkitAppearance: 'none',
                boxShadow: 'none'
              } as React.CSSProperties}
            >
              <option value="" style={{ color: 'black', backgroundColor: 'white' }}>Select Background</option>
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
            
            {/* Background Details */}
            <LevelUpBackground
              sheet={sheet}
              onAutoSave={handleAutoSave}
              xpTotal={xpTotal}
              spTotal={spTotal}
              xpSpent={xpSpent}
              spSpent={spSpent}
              setXpSpent={setXpSpent}
              setSpSpent={setSpSpent}
              setNotice={setNotice}
            />
        </div>


        {/* Skills Card */}
    <div style={{ 
      background: '#fff', 
      border: '2px solid #333', 
      borderRadius: 8, 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
      minHeight: 80, 
      padding: '0.5rem', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gridColumn: isMobile ? 'auto' : 'span 2'
    }}>
            <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.5em', marginBottom: 6 }}>Skills Grid</div>
            <div style={{ width: '100%', position: 'relative', maxWidth: '100vw', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                  borderCollapse: 'collapse', 
                  minWidth: isMobile ? '320px' : '360px', 
                  width: '100%', 
                  maxWidth: '100vw',
                  fontSize: isMobile ? '0.85em' : '1em'
                }}>
                  <thead>
                    <tr>
                      <th style={{ 
                        textAlign: 'left', 
                        fontWeight: 'bold', 
                        padding: isMobile ? '2px 1px' : '4px 4px', 
                        fontFamily: 'Arial, sans-serif', 
                        width: '20%'
                      }}></th>
                      {[20, 18, 16, 14, 12, 10, 8, 6, 4, 2].map((val) => (
                        <th key={val} style={{ 
                          textAlign: 'center', 
                          fontWeight: 'bold', 
                          textDecoration: 'underline',
                          padding: isMobile ? '2px 1px' : '4px 4px', 
                          fontFamily: 'Arial, sans-serif', 
                          width: '8%',
                          minWidth: isMobile ? '20px' : '8%',
                          maxWidth: isMobile ? '20px' : '8%'
                        }}>{val}+</th>
                      ))}
                    </tr>
                    <tr>
                      <th style={{ width: '20%' }}></th>
                      {["1sp", "1sp", "2sp", "2sp", "3sp", "4sp", "5sp", "6sp", "8sp", "10sp"].map((sp, idx) => (
                        <th key={sp + idx} style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: '#888',
                          fontSize: isMobile ? '0.75em' : '0.85em',
                          fontFamily: 'Arial, sans-serif',
                          width: '8%',
                          minWidth: isMobile ? '20px' : '8%',
                          maxWidth: isMobile ? '20px' : '8%'
                        }}>{sp}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
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
                        if (subclass === "Tyrant" && skillName === "Intimidation") sources.push({ type: 'subclass', color: "rgba(206,31,31,0.5)" });
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
                        if (species === "Avenoch" && skillName === "Awareness") sources.push({ type: 'species', color: "rgba(43,95,89,0.5)" });
                        if (species === "Cerebronych" && skillName === "Deception") sources.push({ type: 'species', color: "rgba(95,94,43,0.5)" });
                        if (species === "Cerebronych" && skillName === "Intimidation") sources.push({ type: 'species', color: "rgba(95,94,43,0.5)" });
                        if (species === "Chloroptid" && skillName === "Awareness") sources.push({ type: 'species', color: "rgba(49,95,43,0.5)" });
                        if (species === "Cognizant" && skillName === "Technology") sources.push({ type: 'species', color: "rgba(43,59,95,0.5)" });
                        if (species === "Emberfolk" && skillName === "Xenomagic") sources.push({ type: 'species', color: "rgba(95,43,43,0.5)" });
                        if (species === "Entomos" && skillName === "Athletics") sources.push({ type: 'species', color: "rgba(95,66,43,0.5)" });
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
                      
                      return skillList && skillList.map(skill => {
                        const boosterPositions = getBoosterPositions(skill);
                        
                        return (
                      <tr key={skill}>
                        <td style={{ 
                          fontSize: '0.92em', 
                          fontWeight: 'bold', 
                          padding: isMobile ? '2px 1px' : '4px 4px', 
                          whiteSpace: 'nowrap', 
                          fontFamily: 'Arial, sans-serif', 
                          width: '20%', 
                          textAlign: 'right' 
                          }}>{skill}</td>
                        {(skillDots[skill] || Array(10).fill(false)).map((checked, i) => {
                          const skillDotsForSkill = skillDots[skill] || Array(10).fill(false);
                          const antiBoosterSkills = getAntiBoosterSkills();
                          const hasAntiBooster = antiBoosterSkills.includes(skill);
                          
                          // CRITICAL FIX: Force first two columns to always be checked
                          // These are the free starter dots that all characters get automatically
                          // This ensures they display immediately, even before useEffect completes
                          // EXCEPTION: If skill has anti-booster, only fill column 0 (20+), not column 1 (18+)
                          const isFirstTwoColumns = i === 0 || (i === 1 && !hasAntiBooster);
                          if (isFirstTwoColumns) {
                            checked = true;
                          }
                          
                          // Check if this position has a booster dot (handles overlaps)
                          const boosterAtThisPosition = boosterPositions.find(bp => bp.position === i);
                          // Only auto-fill booster dots at position 2 or higher
                          // Position 1 boosters (from anti-booster skills) should NOT be auto-filled
                          if (boosterAtThisPosition && i >= 2) {
                            checked = true;
                          }
                          
                          // Check for Jack of All Trades (Human perk)
                          // If selected, fills in columns 2 and 3 (16+ and 14+) for all skills not already filled by default or boosters
                          const jackOfAllTradesDots = sheet?.species === "Human" && sheet?.speciesCardDots && sheet.speciesCardDots[4] && sheet.speciesCardDots[4][0];
                          const isJackOfAllTrades = jackOfAllTradesDots && (i === 2 || i === 3);
                          if (isJackOfAllTrades) {
                            checked = true;
                          }
                          
                          // Legacy individual booster checks (kept for compatibility with color function below)
                          // These are now superseded by the boosterPositions logic above
                          // Check for class-based automatic skill dots
                          const isChemistInvestigation = charClass === "Chemist" && skill === "Investigation" && i === 2;
                          const isCoderOikomagic = charClass === "Coder" && skill === "Oikomagic" && i === 2;
                          const isContemplativeAwareness = charClass === "Contemplative" && skill === "Awareness" && i === 2;
                          const isDevoutXenomagic = charClass === "Devout" && skill === "Xenomagic" && i === 2;
                          const isElementalistXenomagic = charClass === "Elementalist" && skill === "Xenomagic" && i === 2;
                          const isExospecialistAthletics = charClass === "Exospecialist" && skill === "Athletics" && i === 2;
                          const isGunslingerDeception = charClass === "Gunslinger" && skill === "Deception" && i === 2;
                          const isCommanderDiplomacy = charClass === "Commander" && skill === "Diplomacy" && i === 2;
                          const isTechnicianTechnology = charClass === "Technician" && skill === "Technology" && i === 2;
                          
                          // Check for subclass-based automatic skill dots (Anatomist Medicine booster)
                          // Anatomist Medicine booster always goes at position 2, same as class boosters
                          const isAnatomistMedicine = subclass === "Anatomist" && skill === "Medicine" && i === 2;
                          
                          // Check for Grenadier Intimidation booster dot
                          // Grenadier Intimidation booster always goes at position 2, same as class boosters
                          const isGrenadierIntimidation = subclass === "Grenadier" && skill === "Intimidation" && i === 2;
                          
                          // Check for Necro Survival booster dot
                          // Necro Survival booster always goes at position 2, same as class boosters
                          const isNecroSurvival = subclass === "Necro" && skill === "Survival" && i === 2;

                            // Check for Necro Survival booster dot
                          // Necro Survival booster always goes at position 2, same as class boosters
                          const isPoisonerThievery = subclass === "Poisoner" && skill === "Thievery" && i === 2;

                          // Check for Coercive Deception booster dot
                          // Coercive Deception booster always goes at position 2, same as class boosters
                          const isCoerciveDeception = subclass === "Coercive" && skill === "Deception" && i === 2;

                          // Check for Beguiler Deception booster dot
                          // Beguiler Deception booster always goes at position 2, same as class boosters
                          const isBeguilerDeception = subclass === "Beguiler" && skill === "Deception" && i === 2;

                          // Check for Divinist Investigation booster dot
                          // Divinist Investigation booster always goes at position 2, same as class boosters
                          const isDivinistInvestigation = subclass === "Divinist" && skill === "Investigation" && i === 2;

                          // Check for Naturalist Survival booster dot
                          // Naturalist Survival booster always goes at position 2, same as class boosters
                          const isNaturalistSurvival = subclass === "Naturalist" && skill === "Survival" && i === 2;

                          // Check for Technologist Technology booster dot
                          // Technologist Technology booster always goes at position 2, same as class boosters
                          const isTechnologistTechnology = subclass === "Technologist" && skill === "Technology" && i === 2;

                          // Check for Galvanic Athletics booster dot
                          // Galvanic Athletics booster always goes at position 2, same as class boosters
                          const isGalvanicAthletics = subclass === "Galvanic" && skill === "Athletics" && i === 2;

                          // Check for Tactician Awareness booster dot
                          // Tactician Awareness booster always goes at position 2, same as class boosters
                          const isTacticianAwareness = subclass === "Tactician" && skill === "Awareness" && i === 2;

                          // Check for Tyrant Intimidation booster dot
                          // Tyrant Intimidation booster always goes at position 2, same as class boosters
                          const isTyrantIntimidation = subclass === "Tyrant" && skill === "Intimidation" && i === 2;

                          // Check for Inertial Diplomacy booster dot
                          // Inertial Diplomacy booster always goes at position 2, same as class boosters
                          const isInertialDiplomacy = subclass === "Inertial" && skill === "Diplomacy" && i === 2;

                          // Check for Kinetic Athletics booster dot
                          // Kinetic Athletics booster always goes at position 2, same as class boosters
                          const isKineticAthletics = subclass === "Kinetic" && skill === "Athletics" && i === 2;

                          // Check for Mercurial Acrobatics booster dot
                          // Mercurial Acrobatics booster always goes at position 2, same as class boosters
                          const isMercurialAcrobatics = subclass === "Mercurial" && skill === "Acrobatics" && i === 2;

                          // Check for Vectorial Piloting booster dot
                          // Vectorial Piloting booster always goes at position 2, same as class boosters
                          const isVectorialPiloting = subclass === "Vectorial" && skill === "Piloting" && i === 2;

                          // Check for Astral Medicine booster dot
                          // Astral Medicine booster always goes at position 2, same as class boosters
                          const isAstralMedicine = subclass === "Astral" && skill === "Medicine" && i === 2;

                          // Check for Chaos Intimidation booster dot
                          // Chaos Intimidation booster always goes at position 2, same as class boosters
                          const isChaosIntimidation = subclass === "Chaos" && skill === "Intimidation" && i === 2;

                          // Check for Order Culture booster dot
                          // Order Culture booster always goes at position 2, same as class boosters
                          const isOrderCulture = subclass === "Order" && skill === "Culture" && i === 2;
                          const isHumanCulture = species === "Human" && skill === "Culture" && i === 2;

                          // Check for Void Stealth booster dot
                          // Void Stealth booster always goes at position 2, same as class boosters
                          const isVoidStealth = subclass === "Void" && skill === "Stealth" && i === 2;

                          // Check for Air Acrobatics booster dot
                          // Air Acrobatics booster always goes at position 2, same as class boosters
                          const isAirAcrobatics = subclass === "Air" && skill === "Acrobatics" && i === 2;

                          // Check for Earth Survival booster dot
                          // Earth Survival booster always goes at position 2, same as class boosters
                          const isEarthSurvival = subclass === "Earth" && skill === "Survival" && i === 2;

                          // Check for Fire Intimidation booster dot
                          // Fire Intimidation booster always goes at position 2, same as class boosters
                          const isFireIntimidation = subclass === "Fire" && skill === "Intimidation" && i === 2;

                          // Check for Water Medicine booster dot
                          // Water Medicine booster always goes at position 2, same as class boosters
                          const isWaterMedicine = subclass === "Water" && skill === "Medicine" && i === 2;

                          // Check for Aeronaut Piloting booster dot
                          // Aeronaut Piloting booster always goes at position 2, same as class boosters
                          const isAeronautPiloting = subclass === "Aeronaut" && skill === "Piloting" && i === 2;

                          // Check for Brawler Survival booster dot
                          // Brawler Survival booster always goes at position 2, same as class boosters
                          const isBrawlerSurvival = subclass === "Brawler" && skill === "Survival" && i === 2;

                          // Check for Dreadnaught Intimidation booster dot
                          // Dreadnaught Intimidation booster always goes at position 2, same as class boosters
                          const isDreadnaughtIntimidation = subclass === "Dreadnaught" && skill === "Intimidation" && i === 2;

                          // Check for Spectre Stealth booster dot
                          // Spectre Stealth booster always goes at position 2, same as class boosters
                          const isSpectreStealth = subclass === "Spectre" && skill === "Stealth" && i === 2;

                          // Check for Ammo Coder Oikomagic booster dot
                          // Ammo Coder Oikomagic booster always goes at position 2, same as class boosters
                          const isAmmoCoderOikomagic = subclass === "Ammo Coder" && skill === "Oikomagic" && i === 2;

                          // Check for Ordnancer Athletics booster dot
                          // Ordnancer Athletics booster always goes at position 2, same as class boosters
                          const isOrdnancerAthletics = subclass === "Ordnancer" && skill === "Athletics" && i === 2;
                          const isUrsidAthletics = subspecies === "Ursid" && skill === "Athletics" && i === 2;

                          // Check for Pistoleer Thievery booster dot
                          // Pistoleer Thievery booster always goes at position 2, same as class boosters
                          const isPistoleerThievery = subclass === "Pistoleer" && skill === "Thievery" && i === 2;

                          // Check for Sniper Stealth booster dot
                          // Sniper Stealth booster always goes at position 2, same as class boosters
                          const isSniperStealth = subclass === "Sniper" && skill === "Stealth" && i === 2;

                          // Check for Hacker Computers booster dot
                          // Hacker Computers booster always goes at position 2, same as class boosters
                          const isHackerComputers = subclass === "Hacker" && skill === "Computers" && i === 2;

                          // Check for Junker Thievery booster dot
                          // Junker Thievery booster always goes at position 2, same as class boosters
                          const isJunkerThievery = subclass === "Junker" && skill === "Thievery" && i === 2;

                          // Check for Nanoboticist Acrobatics booster dot
                          // Nanoboticist Acrobatics booster always goes at position 2, same as class boosters
                          const isNanoboticistAcrobatics = subclass === "Nanoboticist" && skill === "Acrobatics" && i === 2;

                          // Check for Tanker Piloting booster dot
                          // Tanker Piloting booster always goes at position 2, same as class boosters
                          const isTankerPiloting = subclass === "Tanker" && skill === "Piloting" && i === 2;

                          // Check for Avenoch Awareness species booster dot
                          // Avenoch Awareness booster always goes at position 2, same as class boosters
                          const isAvenochAwareness = species === "Avenoch" && skill === "Awareness" && i === 2;

                          // Check for Chloroptid Awareness species booster dot
                          // Chloroptid Awareness booster always goes at position 2, same as class boosters
                          const isChloroptidAwareness = species === "Chloroptid" && skill === "Awareness" && i === 2;

                          // Check for Barkskin Survival subspecies booster dot
                          // Barkskin Survival booster always goes at position 2, same as class boosters
                          const isBarkskinSurvival = subspecies === "Barkskin" && skill === "Survival" && i === 2;

                          // Check for Petran Survival subspecies booster dot
                          // Petran Survival booster always goes at position 2, same as class boosters
                          const isPetranSurvival = subspecies === "Petran" && skill === "Survival" && i === 2;

                          // Check for Pyran Performance subspecies booster dot
                          // Pyran Performance booster always goes at position 2, same as class boosters
                          const isPyranPerformance = subspecies === "Pyran" && skill === "Performance" && i === 2;

                          // Legacy auto-fill logic for boosters at position 2
                          // DO NOT auto-fill if this skill has an anti-booster (booster shifted to position 1)
                          if (!hasAntiBooster && (isChemistInvestigation || isCoderOikomagic || isCommanderDiplomacy || isContemplativeAwareness || isDevoutXenomagic || isElementalistXenomagic || isExospecialistAthletics || isGunslingerDeception || isTechnicianTechnology || isAnatomistMedicine || isGrenadierIntimidation || isNecroSurvival || isPoisonerThievery || isCoerciveDeception || isBeguilerDeception || isDivinistInvestigation || isNaturalistSurvival || isTechnologistTechnology || isGalvanicAthletics || isTacticianAwareness || isTyrantIntimidation || isInertialDiplomacy || isKineticAthletics || isMercurialAcrobatics || isVectorialPiloting || isAstralMedicine || isChaosIntimidation || isOrderCulture || isVoidStealth || isAirAcrobatics || isEarthSurvival || isFireIntimidation || isWaterMedicine || isAeronautPiloting || isBrawlerSurvival || isDreadnaughtIntimidation || isSpectreStealth || isAmmoCoderOikomagic || isOrdnancerAthletics || isUrsidAthletics || isPistoleerThievery || isSniperStealth || isHackerComputers || isJunkerThievery || isNanoboticistAcrobatics || isTankerPiloting || isAvenochAwareness || isChloroptidAwareness || isBarkskinSurvival || isPetranSurvival || isPyranPerformance || isHumanCulture)) {
                            checked = true; // Force third dot to be filled for class booster dots (unless skill has anti-booster)
                          }

                          // Define class-specific colors for automatic skill dots
                          const getClassBoostColor = () => {
                            if (isChemistInvestigation) return "rgba(114,17,49,0.5)";
                            if (isCoderOikomagic) return "rgba(17,33,114,0.5)";
                            if (isCommanderDiplomacy) return "rgba(113,114,17,0.5)";
                            if (isContemplativeAwareness) return "rgba(17,99,114,0.5)";
                            if (isDevoutXenomagic) return "rgba(107,17,114,0.5)";
                            if (isElementalistXenomagic) return "rgba(35,17,114,0.5)";
                            if (isExospecialistAthletics) return "rgba(17,114,51,0.5)";
                            if (isGunslingerDeception) return "rgba(78,114,17,0.5)";
                            if (isTechnicianTechnology) return "rgba(114,72,17,0.5)";
                            if (isAnatomistMedicine) return "rgba(102,207,0,0.5)";
                            if (isGrenadierIntimidation) return "rgba(207,0,0,0.5)";
                            if (isNecroSurvival) return "rgba(0,51,207,0.5)";
                            if (isPoisonerThievery) return "rgba(207,118,0,0.5)";
                            if (isCoerciveDeception) return "rgba(67,201,255,0.5)";
                            if (isBeguilerDeception) return "rgba(31,33,206,0.5)";
                            if (isDivinistInvestigation) return "rgba(255,67,67,0.5)";
                            if (isNaturalistSurvival) return "rgba(102,207,0,0.5)";
                            if (isTechnologistTechnology) return "rgba(140,67,255,0.5)";
                            if (isGalvanicAthletics) return "rgba(111,206,31,0.5)";
                            if (isTacticianAwareness) return "rgba(206,195,31,0.5)";
                            if (isTyrantIntimidation) return "rgba(206,31,31,0.5)";
                            if (isInertialDiplomacy) return "rgba(28,148,94,0.5)";
                            if (isKineticAthletics) return "rgba(123,148,28,0.5)";
                            if (isMercurialAcrobatics) return "rgba(148,28,108,0.5)";
                            if (isVectorialPiloting) return "rgba(83,28,148,0.5)";
                            if (isAstralMedicine) return "rgba(91,177,175,0.5)";
                            if (isChaosIntimidation) return "rgba(177,91,108,0.5)";
                            if (isOrderCulture) return "rgba(174,177,91,0.5)";
                            if (isVoidStealth) return "rgba(91,115,177,0.5)";
                            if (isAirAcrobatics) return "rgba(14,226,223,0.5)";
                            if (isEarthSurvival) return "rgba(226,185,14,0.5)";
                            if (isFireIntimidation) return "rgba(226,14,14,0.5)";
                            if (isWaterMedicine) return "rgba(14,66,226,0.5)";
                            if (isAeronautPiloting) return "rgba(61,161,216,0.5)";
                            if (isBrawlerSurvival) return "rgba(216,165,61,0.5)";
                            if (isDreadnaughtIntimidation) return "rgba(216,61,160,0.5)";
                            if (isSpectreStealth) return "rgba(106,61,216,0.5)";
                            if (isAmmoCoderOikomagic) return "rgba(10,57,145,0.5)";
                            if (isOrdnancerAthletics) return "rgba(145,10,10,0.5)";
                            if (isUrsidAthletics) return "rgba(144,38,177,0.5)";
                            if (isPistoleerThievery) return "rgba(90,145,10,0.5)";
                            if (isSniperStealth) return "rgba(10,111,145,0.5)";
                            if (isHackerComputers) return "rgba(92,87,184,0.5)";
                            if (isJunkerThievery) return "rgba(109,184,87,0.5)";
                            if (isNanoboticistAcrobatics) return "rgba(87,184,176,0.5)";
                            if (isTankerPiloting) return "rgba(184,87,139,0.5)";
                            if (isAvenochAwareness) return "rgba(43,95,89,0.5)";
                            if (isChloroptidAwareness) return "rgba(49,95,43,0.5)";
                            if (isBarkskinSurvival) return "rgba(95,45,43,0.5)";
                            if (isPetranSurvival) return "rgba(115,83,17,0.5)";
                            if (isPyranPerformance) return "rgba(179,17,17,0.5)";
                            if (isHumanCulture) return "rgba(43,49,95,0.5)";
                            if (isJackOfAllTrades) return "rgba(43,49,95,0.25)"; // Jack of All Trades - Human color with 0.25 transparency
                            // Add other class colors here in the future
                            return "#d0d0d0"; // fallback color
                          };
                          const classBoostColor = getClassBoostColor();
                          
                          const rightmostChecked = skillDotsForSkill.lastIndexOf(true);
                          
                          // Account for booster dots when checking if previous dots are filled
                          // Allow clicking any unfilled dot to the right of the rightmost checked dot
                          const canCheck = !checked && i > rightmostChecked;
                          const canUncheck = checked && i === rightmostChecked;
                          
                          // Calculate the SP cost if this dot were clicked (for cursor and tooltip)
                          let spCostForThisDot = 0;
                          if (canCheck) {
                            // Check if this is an anti-booster skill
                            const antiBoosterSkills = getAntiBoosterSkills();
                            const isAntiBoosterSkill = antiBoosterSkills.includes(skill);
                            
                            // Check if position 1 has a booster (for anti-booster skills, booster shifts to position 1)
                            const hasBoosterAtPosition1 = isAntiBoosterSkill && boosterPositions.some(bp => bp.position === 1);
                            
                            for (let j = 0; j <= i; j++) {
                              // Position j is free if:
                              // - j is 0 (20+ always free), OR
                              // - j is 1 and NOT anti-booster skill (18+ free for normal skills), OR
                              // - j is 1 and has a booster at position 1 (booster makes it free even for anti-booster skills), OR
                              // - j is 2 and is a booster position for non-anti-booster skills
                              const isFreePosition = (j === 0 || 
                                (j === 1 && (!isAntiBoosterSkill || hasBoosterAtPosition1)) ||
                                (j === 2 && !isAntiBoosterSkill && (
                                  (charClass === "Chemist" && skill === "Investigation") ||
                                  (charClass === "Coder" && skill === "Oikomagic") ||
                                  (charClass === "Exospecialist" && skill === "Athletics") ||
                                  (charClass === "Commander" && skill === "Diplomacy") ||
                                  (charClass === "Contemplative" && skill === "Awareness") ||
                                  (charClass === "Devout" && skill === "Xenomagic") ||
                                  (charClass === "Elementalist" && skill === "Xenomagic") ||
                                  (charClass === "Gunslinger" && skill === "Deception") ||
                                  (charClass === "Technician" && skill === "Technology") ||
                                  (subclass === "Anatomist" && skill === "Medicine") ||
                                  (subclass === "Grenadier" && skill === "Intimidation") ||
                                  (subclass === "Necro" && skill === "Survival") ||
                                  (subclass === "Poisoner" && skill === "Thievery") ||
                                  (subclass === "Coercive" && skill === "Deception") ||
                                  (subclass === "Beguiler" && skill === "Deception") ||
                                  (subclass === "Divinist" && skill === "Investigation") ||
                                  (subclass === "Naturalist" && skill === "Survival") ||
                                  (subclass === "Technologist" && skill === "Technology") ||
                                  (subclass === "Galvanic" && skill === "Athletics") ||
                                  (subclass === "Tactician" && skill === "Awareness") ||
                                  (subclass === "Tyrant" && skill === "Intimidation") ||
                                  (subclass === "Inertial" && skill === "Diplomacy") ||
                                  (subclass === "Kinetic" && skill === "Athletics") ||
                                  (subclass === "Mercurial" && skill === "Acrobatics") ||
                                  (subclass === "Vectorial" && skill === "Piloting") ||
                                  (subclass === "Astral" && skill === "Medicine") ||
                                  (subclass === "Chaos" && skill === "Intimidation") ||
                                  (subclass === "Order" && skill === "Culture") ||
                                  (subclass === "Void" && skill === "Stealth") ||
                                  (subclass === "Air" && skill === "Acrobatics") ||
                                  (subclass === "Earth" && skill === "Survival") ||
                                  (subclass === "Fire" && skill === "Intimidation") ||
                                  (subclass === "Water" && skill === "Medicine") ||
                                  (subclass === "Aeronaut" && skill === "Piloting") ||
                                  (subclass === "Brawler" && skill === "Survival") ||
                                  (subclass === "Dreadnaught" && skill === "Intimidation") ||
                                  (subclass === "Spectre" && skill === "Stealth") ||
                                  (subclass === "Ammo Coder" && skill === "Oikomagic") ||
                                  (subclass === "Ordnancer" && skill === "Athletics") ||
                                  (subclass === "Pistoleer" && skill === "Thievery") ||
                                  (subclass === "Sniper" && skill === "Stealth") ||
                                  (subclass === "Hacker" && skill === "Computers") ||
                                  (subclass === "Junker" && skill === "Thievery") ||
                                  (subclass === "Nanoboticist" && skill === "Acrobatics") ||
                                  (subclass === "Tanker" && skill === "Piloting") ||
                                  (species === "Avenoch" && skill === "Awareness") ||
                                  (species === "Chloroptid" && skill === "Awareness") ||
                                  (species === "Human" && skill === "Culture") ||
                                  (subspecies === "Barkskin" && skill === "Survival") ||
                                  (subspecies === "Petran" && skill === "Survival") ||
                                  (subspecies === "Pyran" && skill === "Performance")
                                ))
                              );
                              
                              if (!skillDotsForSkill[j] && !isFreePosition) {
                                spCostForThisDot += [1, 1, 2, 2, 3, 4, 5, 6, 8, 10][j];
                              }
                            }
                          } else if (canUncheck) {
                            // Calculate refund amount for unchecking
                            // Check if this is an anti-booster skill
                            const antiBoosterSkills = getAntiBoosterSkills();
                            const isAntiBoosterSkill = antiBoosterSkills.includes(skill);
                            
                            // Check if position 1 has a booster (for anti-booster skills, booster shifts to position 1)
                            const hasBoosterAtPosition1 = isAntiBoosterSkill && boosterPositions.some(bp => bp.position === 1);
                            
                            for (let j = i; j < skillDotsForSkill.length; j++) {
                              // Position j is free if:
                              // - j is 0 (20+ always free), OR
                              // - j is 1 and NOT anti-booster skill (18+ free for normal skills), OR
                              // - j is 1 and has a booster at position 1 (booster makes it free even for anti-booster skills), OR
                              // - j is 2 and is a booster position for non-anti-booster skills
                              const isFreePosition = (j === 0 || 
                                (j === 1 && (!isAntiBoosterSkill || hasBoosterAtPosition1)) ||
                                (j === 2 && !isAntiBoosterSkill && (
                                  (charClass === "Chemist" && skill === "Investigation") ||
                                  (charClass === "Coder" && skill === "Oikomagic") ||
                                  (charClass === "Exospecialist" && skill === "Athletics") ||
                                  (charClass === "Commander" && skill === "Diplomacy") ||
                                  (charClass === "Contemplative" && skill === "Awareness") ||
                                  (charClass === "Devout" && skill === "Xenomagic") ||
                                  (charClass === "Elementalist" && skill === "Xenomagic") ||
                                  (charClass === "Gunslinger" && skill === "Deception") ||
                                  (charClass === "Technician" && skill === "Technology") ||
                                  (subclass === "Anatomist" && skill === "Medicine") ||
                                  (subclass === "Grenadier" && skill === "Intimidation") ||
                                  (subclass === "Necro" && skill === "Survival") ||
                                  (subclass === "Poisoner" && skill === "Thievery") ||
                                  (subclass === "Coercive" && skill === "Deception") ||
                                  (subclass === "Beguiler" && skill === "Deception") ||
                                  (subclass === "Divinist" && skill === "Investigation") ||
                                  (subclass === "Naturalist" && skill === "Survival") ||
                                  (subclass === "Technologist" && skill === "Technology") ||
                                  (subclass === "Galvanic" && skill === "Athletics") ||
                                  (subclass === "Tactician" && skill === "Awareness") ||
                                  (subclass === "Tyrant" && skill === "Intimidation") ||
                                  (subclass === "Inertial" && skill === "Diplomacy") ||
                                  (subclass === "Kinetic" && skill === "Athletics") ||
                                  (subclass === "Mercurial" && skill === "Acrobatics") ||
                                  (subclass === "Vectorial" && skill === "Piloting") ||
                                  (subclass === "Astral" && skill === "Medicine") ||
                                  (subclass === "Chaos" && skill === "Intimidation") ||
                                  (subclass === "Order" && skill === "Culture") ||
                                  (subclass === "Void" && skill === "Stealth") ||
                                  (subclass === "Air" && skill === "Acrobatics") ||
                                  (subclass === "Earth" && skill === "Survival") ||
                                  (subclass === "Fire" && skill === "Intimidation") ||
                                  (subclass === "Water" && skill === "Medicine") ||
                                  (subclass === "Aeronaut" && skill === "Piloting") ||
                                  (subclass === "Brawler" && skill === "Survival") ||
                                  (subclass === "Dreadnaught" && skill === "Intimidation") ||
                                  (subclass === "Spectre" && skill === "Stealth") ||
                                  (subclass === "Ammo Coder" && skill === "Oikomagic") ||
                                  (subclass === "Ordnancer" && skill === "Athletics") ||
                                  (subclass === "Pistoleer" && skill === "Thievery") ||
                                  (subclass === "Sniper" && skill === "Stealth") ||
                                  (subclass === "Hacker" && skill === "Computers") ||
                                  (subclass === "Junker" && skill === "Thievery") ||
                                  (subclass === "Nanoboticist" && skill === "Acrobatics") ||
                                  (subclass === "Tanker" && skill === "Piloting") ||
                                  (species === "Avenoch" && skill === "Awareness") ||
                                  (species === "Chloroptid" && skill === "Awareness") ||
                                  (species === "Human" && skill === "Culture") ||
                                  (subspecies === "Barkskin" && skill === "Survival") ||
                                  (subspecies === "Petran" && skill === "Survival") ||
                                  (subspecies === "Pyran" && skill === "Performance")
                                ))
                              );
                              
                              if (skillDotsForSkill[j] && !isFreePosition) {
                                spCostForThisDot += [1, 1, 2, 2, 3, 4, 5, 6, 8, 10][j];
                              }
                            }
                          }
                          
                          const hasEnoughSP = spSpent + spCostForThisDot <= (sheet?.spTotal || 0);
                          const canAffordCheck = canCheck && hasEnoughSP;
                          const hasFreeDots = sheet?.hasFreeSkillStarterDots;
                          const isLockedColumn = hasFreeDots && isFirstTwoColumns;
                          
                          return (
                            <td key={i} style={{
                              textAlign: 'center',
                              padding: isMobile ? '1px 1px' : '2px 2px',
                              width: '8%',
                              minWidth: isMobile ? '20px' : '8%',
                              maxWidth: isMobile ? '20px' : '8%'
                            }}>
                              <span
                                onClick={() => {
                                  // Prevent clicking on locked columns for new characters
                                  if (isLockedColumn) return;
                                  
                                  // Prevent clicking on booster dots (handles all boosters including overlaps)
                                  if (boosterAtThisPosition) return;

                                  // SP costs for each skill dot position: [1sp, 1sp, 2sp, 2sp, 3sp, 4sp, 5sp, 6sp, 8sp, 10sp]
                                  const spCosts = [1, 1, 2, 2, 3, 4, 5, 6, 8, 10];
                                  const currentSkillDots = skillDots[skill] || Array(10).fill(false);
                                  
                                  // Helper function to check if a position is a free dot (starter or booster)
                                  const isFreeDot = (skillName: string, position: number) => {
                                    // Check for anti-booster skills
                                    const antiBoosterSkills = getAntiBoosterSkills();
                                    const hasAntiBooster = antiBoosterSkills.includes(skillName);
                                    
                                    // Position 0 (20+) is always free for all skills
                                    if (position === 0) {
                                      return true;
                                    }
                                    
                                    // Check if this position has a booster dot (handles overlaps)
                                    const skillBoosterPositions = getBoosterPositions(skillName);
                                    const hasBoosterAtThisPosition = skillBoosterPositions.some(bp => bp.position === position);
                                    
                                    // Position 1 (18+) is free for normal skills OR if it has a booster (even for anti-booster skills)
                                    if (position === 1) {
                                      return !hasAntiBooster || hasBoosterAtThisPosition;
                                    }
                                    
                                    // Positions 2 and 3 are free if Jack of All Trades is selected (Human perk)
                                    const jackOfAllTradesDots = sheet?.species === "Human" && sheet?.speciesCardDots && sheet.speciesCardDots[4] && sheet.speciesCardDots[4][0];
                                    if ((position === 2 || position === 3) && jackOfAllTradesDots) {
                                      return true;
                                    }
                                    
                                    // Any other position with a booster is free
                                    return hasBoosterAtThisPosition;
                                  };
                                  
                                  const rightmostChecked = currentSkillDots.lastIndexOf(true);
                                  const canCheckThisDot = !currentSkillDots[i] && i > rightmostChecked;
                                  const canUncheck = currentSkillDots[i] && i === rightmostChecked;
                                  
                                  let spDelta = 0;

                                  // Calculate SP cost/refund before attempting changes
                                  if (canCheckThisDot) {
                                    // Filling dots: calculate SP cost for new dots being filled (excluding free dots)
                                    console.log(`Attempting to fill ${skill} at index ${i} (column ${[20, 18, 16, 14, 12, 10, 8, 6, 4, 2][i]}+)`);

                                    console.log(`Current SP spent: ${spSpentRef.current}, Total SP: ${sheet?.spTotal || 0}, Remaining: ${(sheet?.spTotal || 0) - spSpentRef.current}`);
                                    
                                    for (let j = 0; j <= i; j++) {
                                      const isFree = isFreeDot(skill, j);
                                      const isFilled = currentSkillDots[j];

                                      if (!currentSkillDots[j] && !isFreeDot(skill, j)) {
                                        spDelta += spCosts[j];
                                        console.log(`    Adding ${spCosts[j]}sp to spDelta (now ${spDelta})`);
                                      }
                                    }

                                    // Check if user has enough SP (use ref for latest value)
                                    if (spSpentRef.current + spDelta > (sheet?.spTotal || 0)) {

                                      setNotice("Not enough sp!");
                                      return;
                                    }
                                  } else if (currentSkillDots[i] && canUncheck) {
                                    // Unfilling dots: calculate SP to be refunded (excluding free dots)
                                    for (let j = i; j < currentSkillDots.length; j++) {
                                      if (currentSkillDots[j] && !isFreeDot(skill, j)) {
                                        spDelta -= spCosts[j];
                                      }
                                    }
                                  } else {
                                    // No valid action
                                    return;
                                  }

                                  setSkillDots(prev => {
                                    const currentSkillDots = prev[skill] || Array(10).fill(false);
                                    let newSkillDots = [...currentSkillDots];
                                    
                                    // Handle dot clicking logic
                                    if (canCheckThisDot) {
                                      // Fill dots from left to right up to and including clicked position
                                      for (let j = 0; j <= i; j++) {
                                        newSkillDots[j] = true;
                                      }
                                    } else if (canUncheck) {
                                      // Unfill dots from clicked position to the right
                                      for (let j = i; j < newSkillDots.length; j++) {
                                        newSkillDots[j] = false;
                                      }
                                    } else {
                                      // No valid action, return unchanged
                                      return prev;
                                    }
                                    
                                    // Create the updated skill dots object
                                    const updatedSkillDots = { ...prev, [skill]: newSkillDots };

                                    return updatedSkillDots;
                                  });

                                  // Update SP spent after skill dots are updated (use ref for latest value)
                                  const newSpSpent = spSpentRef.current + spDelta;
                                  spSpentRef.current = newSpSpent; // Update ref immediately for rapid clicks
                                  setSpSpent(newSpSpent);
                                  
                                  // Auto-save the changes using the consistent pattern
                                  if (sheet) {
                                    const currentSkillDots = skillDots[skill] || Array(10).fill(false);
                                    let newSkillDots = [...currentSkillDots];
                                    
                                    if (canCheckThisDot) {
                                      for (let j = 0; j <= i; j++) {
                                        newSkillDots[j] = true;
                                      }
                                    } else if (canUncheck) {
                                      for (let j = i; j < newSkillDots.length; j++) {
                                        newSkillDots[j] = false;
                                      }
                                    }
                                    
                                    const updatedSkillDots = { ...skillDots, [skill]: newSkillDots };
                                    
                                    handleAutoSave({
                                      skillDots: updatedSkillDots,
                                      spSpent: newSpSpent,
                                      spRemaining: (sheet.spTotal || 0) - newSpSpent
                                    });
                                  }
                                }}
                                style={{
                                  display: 'inline-block',
                                  width: isMobile ? 14 : 18,
                                  height: isMobile ? 14 : 18,
                                  borderRadius: '50%',
                                  border: (boosterAtThisPosition || isLockedColumn || isJackOfAllTrades) ? `2px solid ${boosterAtThisPosition ? boosterAtThisPosition.color : (isJackOfAllTrades ? 'rgba(43,49,95,0.25)' : '#666')}` : '2px solid #000',
                                  background: boosterAtThisPosition ? boosterAtThisPosition.color : (checked ? (isJackOfAllTrades ? 'rgba(43,49,95,0.25)' : (isLockedColumn ? '#666' : '#000')) : (isLockedColumn ? '#666' : '#fff')),
                                  cursor: (isLockedColumn || boosterAtThisPosition || isJackOfAllTrades) ? 'not-allowed' : (canAffordCheck || canUncheck ? 'pointer' : 'not-allowed'),
                                  opacity: (isLockedColumn || boosterAtThisPosition || isJackOfAllTrades) ? 1 : (canAffordCheck || canUncheck ? 1 : 0.4),
                                }}
                                title={
                                  isJackOfAllTrades
                                    ? 'Jack of All Trades skill dot (cannot be changed)'
                                    : boosterAtThisPosition
                                    ? `${boosterAtThisPosition.type.charAt(0).toUpperCase() + boosterAtThisPosition.type.slice(1)} bonus skill dot (cannot be changed)`
                                    : isLockedColumn 
                                    ? 'Starting skill dots (cannot be changed)'
                                    : (!checked && canCheck)
                                    ? (hasEnoughSP ? `Click to fill up to here (Total cost: ${spCostForThisDot}sp)` : `Not enough SP (Need ${spCostForThisDot}sp, have ${(sheet?.spTotal || 0) - spSpent}sp)`)
                                    : (canUncheck ? `Click to unfill from here (Refund: ${spCostForThisDot}sp)` : `Already filled or blocked`)
                                }
                              />
                            </td>
                          );
                        })}
                      </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
        </div>


      </div>    


    {/* XP/SP Notice */}
    {notice && (
      <div className={styles.standardNotice}>
        {notice}
      </div>
    )}

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
            onClick={onBack}
            style={{
              background: '#6c757d',
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
              <span style={{ minWidth: '40px', textAlign: 'center' }}>{xpSpent}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 'bold', minWidth: '80px' }}>Remaining xp:</span>
              <span style={{ minWidth: '40px', textAlign: 'center', color: xpTotal - xpSpent < 0 ? '#d32f2f' : '#000' }}>{xpTotal - xpSpent}</span>
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
        xp: {xpTotal - xpSpent}/{xpTotal} | sp: {spTotal - spSpent}/{spTotal}
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
                  onAutoSave({ credits: newValue });
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
                  onAutoSave({ credits: newValue });
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
                  onAutoSave({ credits: newValue });
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
                style={{ width: '24px', height: '24px', fontSize: '12px', padding: '0' }}
                onClick={() => {
                  if (!creditsDelta) return;
                  const newValue = Math.max(0, credits - creditsDelta);
                  setCredits(newValue);
                  onAutoSave({ credits: newValue });
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
                style={{ width: '24px', height: '24px', fontSize: '12px', padding: '0' }}
                onClick={() => {
                  if (!creditsDelta) return;
                  const newValue = credits + creditsDelta;
                  setCredits(newValue);
                  onAutoSave({ credits: newValue });
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
                <span style={{ minWidth: '40px', textAlign: 'center' }}>{effectiveMaxHP}</span>
              </div>
              <button
                className={styles.greenPlusButton}
                style={{ padding: '6px 36px', fontSize: '14px', whiteSpace: 'nowrap' }}
                onClick={() => {
                  setCurrentHitPoints(effectiveMaxHP);
                  handleAutoSave({ currentHitPoints: effectiveMaxHP });
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
        hp: {currentHitPoints}/{effectiveMaxHP}
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

    </div>
  );
};

export default LevelUp;
