import React from "react";
import { useState, useEffect } from "react";
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
  
  // Auto-save helper function
  const handleAutoSave = (fieldUpdates: Partial<CharacterSheet>) => {
    console.log("handleAutoSave called with:", fieldUpdates);
    if (onAutoSave) {
      if (sheet) {
        // Update existing sheet
        const updatedSheet = { ...sheet, ...fieldUpdates };
        onAutoSave(updatedSheet);
        console.log("Auto-save completed for existing sheet");
      } else {
        // Create new sheet with updates - this handles new character creation
        console.log("Auto-save for new character creation");
        onAutoSave(fieldUpdates);
      }
    } else {
      console.log("Auto-save failed - missing onAutoSave function");
    }
  };

  // Handler for Anatomist XP/SP changes (independent from other systems)
  const handleAnatomistXpSpChange = (xpDelta: number, spDelta: number) => {
    const newXpSpent = xpSpent + xpDelta;
    const newSpSpent = spSpent + spDelta;
    
    setXpSpent(newXpSpent);
    setSpSpent(newSpSpent);
    
    handleAutoSave({ 
      xpSpent: newXpSpent, 
      spSpent: newSpSpent 
    });
  };

  // Handler for Credits changes (similar to XP/SP)
  const handleCreditsChange = (creditsDelta: number) => {
    const newCredits = credits + creditsDelta;
    
    setCredits(newCredits);
    setCreditsDelta(prev => prev + creditsDelta);
    
    handleAutoSave({ 
      credits: newCredits,
      // Preserve dart guns when credits change
      dartGuns: sheet?.dartGuns || []
    });
  };

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
  // Optionally, update local state if sheet changes
  const [spSpent, setSpSpent] = useState(sheet?.spSpent ?? 0);
  const [xpSpent, setXpSpent] = useState(sheet?.xpSpent ?? 0);

  // Skills-related state and constants
  const skillSpCosts = [1,1,2,2,3,4,5,6,8,10];

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
      console.log("Setting up new character with starter skill dots");
      
      // Create skill dots with first two columns filled
      const newSkillDots = Object.fromEntries(skillList.map(skill => [skill, [true, true, false, false, false, false, false, false, false, false]]));
      
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
  
  // Local state for HP functionality
  const [currentHitPoints, setCurrentHitPoints] = useState<number>(sheet?.currentHitPoints ?? sheet?.maxHitPoints ?? 0);
  const [deathCount, setDeathCount] = useState(sheet?.deathCount || 0);
  
  const [notice, setNotice] = useState("");
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isXpSpMenuExpanded, setIsXpSpMenuExpanded] = useState(false);
  const [isHpMenuExpanded, setIsHpMenuExpanded] = useState(false);
  const [isCreditsMenuExpanded, setIsCreditsMenuExpanded] = useState(false);
  const [isChemTokensMenuExpanded, setIsChemTokensMenuExpanded] = useState(false);
  // For add/subtract HP section
  const [hpDelta, setHpDelta] = useState<number>(0);
  // Credits management
  const [credits, setCredits] = useState<number>(sheet?.credits ?? 0);
  const [creditsDelta, setCreditsDelta] = useState<number>(0);
  // Chem Tokens management (for Chemist class)
  const [chemTokens, setChemTokens] = useState<number>(sheet?.chemTokens ?? 0);
  
  // Calculate effective Max Hit Points (base + class bonuses)
  const calculateEffectiveMaxHP = (baseHP: number, charClass: string): number => {
    let effectiveHP = baseHP;
    
    // Exospecialist gets +20 Max Hit Points
    if (charClass === "Exospecialist") {
      effectiveHP += 20;
    }
    
    return effectiveHP;
  };

  const effectiveMaxHP = calculateEffectiveMaxHP(sheet?.maxHitPoints ?? 0, charClass);
  
  // Background state
  const [background, setBackground] = useState(sheet?.background || "");
  
  // Mobile responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Background options
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

  React.useEffect(() => {
    setXpTotal(sheet?.xpTotal ?? 0);
    setSpTotal(sheet?.spTotal ?? 0);
    setSpSpent(sheet?.spSpent ?? 0);
    setXpSpent(sheet?.xpSpent ?? 0);
    setCurrentHitPoints(sheet?.currentHitPoints ?? sheet?.maxHitPoints ?? 0);
    setCredits(sheet?.credits ?? 0);
    setChemTokens(sheet?.chemTokens ?? 0);
    setDeathCount(sheet?.deathCount || 0);
    setBackground(sheet?.background || "");
    // Update skillDots when sheet changes
    if (sheet?.skillDots) {
      setSkillDots(sheet.skillDots);
    } else {
      // Initialize with default empty state
      setSkillDots(Object.fromEntries(skillList.map(skill => [skill, Array(10).fill(false)])));
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
        const updatedSheet = { ...resetSheet, subclass: newSubclass };
        saveCharacterSheet(updatedSheet);
        
        // Update local state
        setXpSpent(0);
        setSpSpent(0);
        setClassCardDots(Array(10).fill(false));
        setSkillDots(resetSheet.skillDots);
      }
    } else {
      // No expenditures, just update the subclass
      handleAutoSave({ subclass: newSubclass });
    }
    
    setSubclass(newSubclass);
  };

  const handleSpeciesChange = (newSpecies: string) => {
    if (!newSpecies || newSpecies === species) {
      setSpecies(newSpecies);
      if (newSpecies !== species) setSubspecies(""); // Reset subspecies when species changes
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
        const updatedSheet = { ...resetSheet, species: newSpecies, subspecies: "" }; // Reset subspecies too
        saveCharacterSheet(updatedSheet);
        
        // Update local state
        setXpSpent(0);
        setSpSpent(0);
        setClassCardDots(Array(10).fill(false));
        setSkillDots(resetSheet.skillDots);
        setSubspecies("");
      }
    } else {
      // No expenditures, just update the species and reset subspecies
      setSubspecies(""); // Reset subspecies when species changes
      handleAutoSave({ species: newSpecies, subspecies: "" });
    }
    
    setSpecies(newSpecies);
    setSubspecies("");
  };

  const handleSubspeciesChange = (newSubspecies: string) => {
    if (!newSubspecies || newSubspecies === subspecies) {
      setSubspecies(newSubspecies);
      return;
    }

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
        const updatedSheet = { ...resetSheet, subspecies: newSubspecies };
        saveCharacterSheet(updatedSheet);
        
        // Update local state
        setXpSpent(0);
        setSpSpent(0);
        setClassCardDots(Array(10).fill(false));
        setSkillDots(resetSheet.skillDots);
      }
    } else {
      // No expenditures, just update the subspecies
      handleAutoSave({ subspecies: newSubspecies });
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
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "rpg-character-sheets" && sheet?.id) {
        // Reload the current character from storage
        const updatedSheet = loadSheetById(sheet.id);
        if (updatedSheet) {
          // Only update state if values have actually changed
          if (updatedSheet.xpTotal !== xpTotal) setXpTotal(updatedSheet.xpTotal ?? 0);
          if (updatedSheet.spTotal !== spTotal) setSpTotal(updatedSheet.spTotal ?? 0);
          if (updatedSheet.xpSpent !== xpSpent) setXpSpent(updatedSheet.xpSpent ?? 0);
          if (updatedSheet.spSpent !== spSpent) setSpSpent(updatedSheet.spSpent ?? 0);
          if (updatedSheet.credits !== credits) setCredits(updatedSheet.credits ?? 0);
          if (updatedSheet.chemTokens !== chemTokens) setChemTokens(updatedSheet.chemTokens ?? 0);
          
          // Update dot states only if they've changed
          if (updatedSheet.classCardDots && JSON.stringify(updatedSheet.classCardDots) !== JSON.stringify(classCardDots)) {
            setClassCardDots(updatedSheet.classCardDots.map((row: boolean[]) => [...row]));
          }
          
          // Update skillDots only if they've changed
          if (updatedSheet.skillDots && JSON.stringify(updatedSheet.skillDots) !== JSON.stringify(skillDots)) {
            setSkillDots(updatedSheet.skillDots);
          }
          
          // Update character details only if they've changed
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
        // Only update state if values have actually changed
        if (updatedSheet.xpTotal !== xpTotal) setXpTotal(updatedSheet.xpTotal ?? 0);
        if (updatedSheet.spTotal !== spTotal) setSpTotal(updatedSheet.spTotal ?? 0);
        if (updatedSheet.xpSpent !== xpSpent) setXpSpent(updatedSheet.xpSpent ?? 0);
        if (updatedSheet.spSpent !== spSpent) setSpSpent(updatedSheet.spSpent ?? 0);
        if (updatedSheet.credits !== credits) setCredits(updatedSheet.credits ?? 0);
        if (updatedSheet.chemTokens !== chemTokens) setChemTokens(updatedSheet.chemTokens ?? 0);
        
        // Update dot states only if they've changed
        if (updatedSheet.classCardDots && JSON.stringify(updatedSheet.classCardDots) !== JSON.stringify(classCardDots)) {
          setClassCardDots(updatedSheet.classCardDots.map((row: boolean[]) => [...row]));
        }
        
        // Update skillDots only if they've changed
        if (updatedSheet.skillDots && JSON.stringify(updatedSheet.skillDots) !== JSON.stringify(skillDots)) {
          setSkillDots(updatedSheet.skillDots);
        }
        
        // Update character details only if they've changed
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
  }, [sheet?.id, charClass, subclass, species, subspecies, xpTotal, spTotal, xpSpent, spSpent, credits, chemTokens, skillDots]);

  // Auto-save when XP/SP totals change
  React.useEffect(() => {
    if (sheet && (sheet.xpTotal !== xpTotal || sheet.spTotal !== spTotal)) {
      const updatedSheet = { ...sheet, xpTotal, spTotal };
      saveCharacterSheet(updatedSheet);
    }
  }, [xpTotal, spTotal, sheet]);

  // Auto-save skillDots when they change (but not on initial load)
  React.useEffect(() => {
    if (sheet && sheet.skillDots && JSON.stringify(sheet.skillDots) !== JSON.stringify(skillDots)) {
      const updatedSheet = {
        ...sheet,
        skillDots,
        spRemaining: spTotal - spSpent
      };
      saveCharacterSheet(updatedSheet);
    }
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

  // Helper function to safely access classCardDots array
  const safeGetDotsArray = (index: number): boolean[] => {
    // Always normalize for Elementalist
    if (charClass === "Elementalist") {
      // Defensive: ensure array is exactly as long as defaultElementalistDots
      if (classCardDots.length !== defaultElementalistDots.length) {
        for (let i = classCardDots.length; i < defaultElementalistDots.length; ++i) {
          classCardDots[i] = Array(defaultElementalistDots[i].length).fill(false);
        }
        if (classCardDots.length > defaultElementalistDots.length) {
          classCardDots.length = defaultElementalistDots.length;
        }
      }
      // Defensive: ensure each row is exactly as long as defaultElementalistDots[i]
      for (let i = 0; i < defaultElementalistDots.length; ++i) {
        if (!classCardDots[i]) classCardDots[i] = Array(defaultElementalistDots[i].length).fill(false);
        if (classCardDots[i].length !== defaultElementalistDots[i].length) {
          classCardDots[i] = [
            ...classCardDots[i].slice(0, defaultElementalistDots[i].length),
            ...Array(Math.max(0, defaultElementalistDots[i].length - classCardDots[i].length)).fill(false)
          ];
        }
      }
      return classCardDots[index] || [];
    }
    // Fallback for other classes
    if (!classCardDots || !Array.isArray(classCardDots) || index >= classCardDots.length) {
      if (charClass === "Coder") {
        return defaultCoderDots[index] || [];
      }
      if (charClass === "Commander") {
        return defaultCommanderDots[index] || [];
      }
      if (charClass === "Contemplative") {
        return defaultContemplativeDots[index] || [];
      }
      if (charClass === "Devout") {
        return defaultDevoutDots[index] || [];
      }
      if (charClass === "Exospecialist") {
        return defaultExospecialistDots[index] || [];
      }
      if (charClass === "Technician") {
        return defaultTechnicianDots[index] || [];
      }
      if (charClass === "Chemist") {
        return defaultChemistDots[index] || [];
      }
      if (charClass === "Gunslinger") {
        return defaultGunslingerDots[index] || [];
      }
    }
    return classCardDots[index] || [];
  };

  // Helper function to safely clone classCardDots array
  const safeCloneClassCardDots = (): boolean[][] => {
    console.log('safeCloneClassCardDots called:', {
      classCardDots,
      charClass,
      classCardDotsLength: classCardDots?.length,
      isArray: Array.isArray(classCardDots)
    });
    
    if (!classCardDots || !Array.isArray(classCardDots) || classCardDots.length === 0) {
      console.warn('classCardDots is not properly initialized, returning default for class:', charClass);
      if (charClass === "Coder") {
        const result = defaultCoderDots.map(row => [...row]);
        console.log('Returning default Coder dots:', result);
        return result;
      }
      if (charClass === "Commander") {
        const result = defaultCommanderDots.map(row => [...row]);
        console.log('Returning default Commander dots:', result);
        return result;
      }
      if (charClass === "Contemplative") {
        const result = defaultContemplativeDots.map(row => [...row]);
        console.log('Returning default Contemplative dots:', result);
        return result;
      }
      if (charClass === "Devout") {
        const result = defaultDevoutDots.map(row => [...row]);
        console.log('Returning default Devout dots:', result);
        return result;
      }
      if (charClass === "Elementalist") {
        const result = defaultElementalistDots.map(row => [...row]);
        console.log('Returning default Elementalist dots:', result);
        return result;
      }
      if (charClass === "Exospecialist") {
        const result = defaultExospecialistDots.map(row => [...row]);
        console.log('Returning default Exospecialist dots:', result);
        return result;
      }
      if (charClass === "Technician") {
        const result = defaultTechnicianDots.map(row => [...row]);
        console.log('Returning default Technician dots:', result);
        return result;
      }
      if (charClass === "Chemist") {
        const result = defaultChemistDots.map(row => [...row]);
        console.log('Returning default Chemist dots:', result);
        return result;
      }
      if (charClass === "Gunslinger") {
        const result = defaultGunslingerDots.map(row => [...row]);
        console.log('Returning default Gunslinger dots:', result);
        return result;      
      }
    }
    
    const result = classCardDots.map(row => Array.isArray(row) ? [...row] : []);
    console.log('Returning cloned classCardDots:', result);
    return result;
  };

  // Save to sheet and localStorage
  const persistClassCardDots = (newDots: boolean[][], spSpentDelta: number = 0, xpSpentDelta: number = 0) => {
    let newSpSpent = spSpent + spSpentDelta;
    let newXpSpent = xpSpent + xpSpentDelta;
    // Enforce XP/SP cannot exceed total
    if (newXpSpent > xpTotal) {
      setNotice("Not enough xp!");
      return;
    }
    if (newSpSpent > spTotal) {
      setNotice("Not enough sp!");
      return;
    }
    setClassCardDots(newDots);
    newSpSpent = Math.max(0, newSpSpent);
    newXpSpent = Math.max(0, newXpSpent);
    setSpSpent(newSpSpent);
    setXpSpent(newXpSpent);
    if (sheet) {
      const updatedSheet = { ...sheet, classCardDots: newDots, spSpent: newSpSpent, xpSpent: newXpSpent };
      saveCharacterSheet(updatedSheet);
      // Remove duplicate call to handleAutoSave since saveCharacterSheet already handles the save
      // and the storage change effect will sync the data
    }
  };
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
      { label: "Nocturne", value: "Nocturne", color: "#334592", species: "" },
      { label: "Vulturine", value: "Vulturine", color: "#a96d8c", species: "" },
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
      { label: "Infrared", value: "Infrared", color: "#b17fbe", species: "" },
      { label: "Radiofrequent", value: "Radiofrequent", color: "#bea97f", species: "" },
      { label: "X-Ray", value: "X-Ray", color: "#7f8abe", species: "" },
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
                    onXpSpChange={handleAnatomistXpSpChange}
                    onCreditsChange={handleCreditsChangeNoSave}
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
                    onXpSpChange={handleAnatomistXpSpChange}
                    onCreditsChange={handleCreditsChangeNoSave}
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
                    subclass={subclass}
                    xpTotal={xpTotal}
                    spTotal={spTotal}
                    xpSpent={xpSpent}
                    spSpent={spSpent}
                    setXpSpent={setXpSpent}
                    setSpSpent={setSpSpent}
                    setNotice={setNotice}
                  />
                ) : charClass === "Contemplative" ? (
                  <LevelUpClassContemplative
                    sheet={sheet}
                    charClass={charClass}
                    subclass={subclass}
                    xpTotal={xpTotal}
                    spTotal={spTotal}
                    xpSpent={xpSpent}
                    spSpent={spSpent}
                    setXpSpent={setXpSpent}
                    setSpSpent={setSpSpent}
                    setNotice={setNotice}
                  />
                ) : charClass === "Devout" ? (
                  <LevelUpClassDevout
                    sheet={sheet}
                    charClass={charClass}
                    subclass={subclass}
                    xpTotal={xpTotal}
                    spTotal={spTotal}
                    xpSpent={xpSpent}
                    spSpent={spSpent}
                    setXpSpent={setXpSpent}
                    setSpSpent={setSpSpent}
                    setNotice={setNotice}
                  />
                ) : charClass === "Elementalist" ? (
                  <LevelUpClassElementalist
                    sheet={sheet}
                    charClass={charClass}
                    subclass={subclass}
                    xpTotal={xpTotal}
                    spTotal={spTotal}
                    xpSpent={xpSpent}
                    spSpent={spSpent}
                    setXpSpent={setXpSpent}
                    setSpSpent={setSpSpent}
                    setNotice={setNotice}
                  />
                ) : charClass === "Exospecialist" ? (
                  <LevelUpClassExospecialist
                    sheet={sheet}
                    charClass={charClass}
                    subclass={subclass}
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
                    subclass={subclass}
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
                    subclass={subclass}
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
                onXpSpChange={handleAnatomistXpSpChange}
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
        </div>






















        {/* Species Card */}
        <div style={{ background: '#fff', border: '2px solid #333', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: 80, padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', marginBottom: 6 }}>Species</div>
            <div className={styles.selectWrapper} style={{ width: '100%' }}>
              <select
                value={species}
                onChange={e => {
                  handleSpeciesChange(e.target.value);
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
        </div>
        {/* Subspecies Card */}
        <div style={{ background: '#fff', border: '2px solid #333', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: 80, padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', marginBottom: 6 }}>Subspecies</div>
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
        </div>






































        {/* Background Card */}
        <div style={{ background: '#fff', border: '2px solid #333', borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: 80, padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', color: 'black', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1.1em', marginBottom: 6 }}>Background</div>
            <div className={styles.selectWrapper} style={{ width: '100%' }}>
            <select
              value={background}
              onChange={e => {
                handleBackgroundChange(e.target.value);
                handleAutoSave({ background: e.target.value });
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
                    {skillList && skillList.map(skill => (
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

                          if (isChemistInvestigation || isCoderOikomagic || isCommanderDiplomacy || isContemplativeAwareness || isDevoutXenomagic || isElementalistXenomagic || isExospecialistAthletics || isGunslingerDeception || isTechnicianTechnology || isAnatomistMedicine || isGrenadierIntimidation || isNecroSurvival || isPoisonerThievery) {
                            checked = true; // Force third dot to be filled for class booster dots
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
                            // Add other class colors here in the future
                            return "#d0d0d0"; // fallback color
                          };
                          const classBoostColor = getClassBoostColor();
                          
                          // Account for booster dots when checking if previous dots are filled
                          const canCheck = i === 0 || skillDotsForSkill.slice(0, i).every((dotFilled, dotIndex) => {
                            // Check if this position has a booster dot
                            const isBoosterDot = (charClass === "Chemist" && skill === "Investigation" && dotIndex === 2) ||
                                               (charClass === "Coder" && skill === "Oikomagic" && dotIndex === 2) ||
                                               (charClass === "Exospecialist" && skill === "Athletics" && dotIndex === 2) ||
                                               (charClass === "Commander" && skill === "Diplomacy" && dotIndex === 2) ||
                                               (charClass === "Contemplative" && skill === "Awareness" && dotIndex === 2) ||
                                               (charClass === "Devout" && skill === "Xenomagic" && dotIndex === 2) ||
                                               (charClass === "Elementalist" && skill === "Xenomagic" && dotIndex === 2) ||
                                               (charClass === "Gunslinger" && skill === "Deception" && dotIndex === 2) ||
                                               (charClass === "Technician" && skill === "Technology" && dotIndex === 2) ||
                                               (subclass === "Anatomist" && skill === "Medicine" && dotIndex === 2) ||
                                               (subclass === "Grenadier" && skill === "Intimidation" && dotIndex === 2) ||
                                               (subclass === "Necro" && skill === "Survival" && dotIndex === 2) ||
                                               (subclass === "Poisoner" && skill === "Thievery" && dotIndex === 2);
                            return dotFilled || isBoosterDot;
                          });
                          const rightmostChecked = skillDotsForSkill.lastIndexOf(true);
                          const canUncheck = checked && i === rightmostChecked;
                          const isFirstTwoColumns = i === 0 || i === 1;
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
                                  
                                  // Prevent clicking on class-based automatic skill dots
                                  if (isChemistInvestigation || isCoderOikomagic || isContemplativeAwareness || isDevoutXenomagic || isElementalistXenomagic || isExospecialistAthletics || isCommanderDiplomacy || isGunslingerDeception || isTechnicianTechnology || isAnatomistMedicine || isGrenadierIntimidation || isNecroSurvival || isPoisonerThievery) return;

                                  // SP costs for each skill dot position: [1sp, 1sp, 2sp, 2sp, 3sp, 4sp, 5sp, 6sp, 8sp, 10sp]
                                  const spCosts = [1, 1, 2, 2, 3, 4, 5, 6, 8, 10];
                                  const currentSkillDots = skillDots[skill] || Array(10).fill(false);
                                  
                                  // Helper function to check if a position is a booster dot (free)
                                  const isBoosterDot = (skillName: string, position: number) => {
                                    // All booster dots are at position 2
                                    if (position === 2) {
                                      // Class booster dots
                                      if (charClass === "Chemist" && skillName === "Investigation") return true;
                                      if (charClass === "Coder" && skillName === "Oikomagic") return true;
                                      if (charClass === "Contemplative" && skillName === "Awareness") return true;
                                      if (charClass === "Devout" && skillName === "Xenomagic") return true;
                                      if (charClass === "Elementalist" && skillName === "Xenomagic") return true;
                                      if (charClass === "Exospecialist" && skillName === "Athletics") return true;
                                      if (charClass === "Gunslinger" && skillName === "Deception") return true;
                                      if (charClass === "Commander" && skillName === "Diplomacy") return true;
                                      if (charClass === "Technician" && skillName === "Technology") return true;
                                      
                                      // Subclass booster dots
                                      if (subclass === "Anatomist" && skillName === "Medicine") return true;
                                      if (subclass === "Grenadier" && skillName === "Intimidation") return true;
                                      if (subclass === "Necro" && skillName === "Survival") return true;
                                      if (subclass === "Poisoner" && skillName === "Thievery") return true;
                                    }
                                    
                                    return false;
                                  };
                                  
                                  let spDelta = 0;

                                  // Calculate SP cost/refund before attempting changes
                                  if (!currentSkillDots[i] && canCheck) {
                                    // Filling dots: calculate SP cost for new dots being filled (excluding booster dots)
                                    for (let j = 0; j <= i; j++) {
                                      if (!currentSkillDots[j] && !isBoosterDot(skill, j)) {
                                        spDelta += spCosts[j];
                                      }
                                    }
                                    
                                    // Check if user has enough SP
                                    if (spSpent + spDelta > (sheet?.spTotal || 0)) {
                                      setNotice("Not enough sp!");
                                      return;
                                    }
                                  } else if (currentSkillDots[i] && canUncheck) {
                                    // Unfilling dots: calculate SP to be refunded (excluding booster dots)
                                    for (let j = i; j < currentSkillDots.length; j++) {
                                      if (currentSkillDots[j] && !isBoosterDot(skill, j)) {
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
                                    if (!currentSkillDots[i] && canCheck) {
                                      // Fill dots from left to right up to and including clicked position
                                      for (let j = 0; j <= i; j++) {
                                        newSkillDots[j] = true;
                                      }
                                    } else if (currentSkillDots[i] && canUncheck) {
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
                                    
                                    console.log(`Skill dots updated for ${skill}:`, newSkillDots, `SP change: ${spDelta}, New SP spent: ${spSpent + spDelta}`);
                                    
                                    return updatedSkillDots;
                                  });

                                  // Update SP spent after skill dots are updated
                                  const newSpSpent = spSpent + spDelta;
                                  setSpSpent(newSpSpent);
                                  
                                  // Auto-save the changes
                                  if (sheet) {
                                    const updatedSkillDots = { ...skillDots, [skill]: (() => {
                                      const currentSkillDots = skillDots[skill] || Array(10).fill(false);
                                      let newSkillDots = [...currentSkillDots];
                                      
                                      if (!currentSkillDots[i] && canCheck) {
                                        for (let j = 0; j <= i; j++) {
                                          newSkillDots[j] = true;
                                        }
                                      } else if (currentSkillDots[i] && canUncheck) {
                                        for (let j = i; j < newSkillDots.length; j++) {
                                          newSkillDots[j] = false;
                                        }
                                      }
                                      
                                      return newSkillDots;
                                    })() };
                                    
                                    const updatedSheet = {
                                      ...sheet,
                                      skillDots: updatedSkillDots,
                                      spSpent: newSpSpent,
                                      spRemaining: (sheet.spTotal || 0) - newSpSpent
                                    };
                                    saveCharacterSheet(updatedSheet);
                                  }
                                }}
                                style={{
                                  display: 'inline-block',
                                  width: isMobile ? 14 : 18,
                                  height: isMobile ? 14 : 18,
                                  borderRadius: '50%',
                                  border: (isChemistInvestigation || isCoderOikomagic || isContemplativeAwareness || isDevoutXenomagic || isElementalistXenomagic || isExospecialistAthletics || isCommanderDiplomacy || isGunslingerDeception || isTechnicianTechnology || isAnatomistMedicine || isGrenadierIntimidation || isNecroSurvival || isPoisonerThievery) ? `2px solid ${classBoostColor}` : (isLockedColumn ? '2px solid #666' : '2px solid #000'),
                                  background: checked ? ((isChemistInvestigation || isCoderOikomagic || isContemplativeAwareness || isDevoutXenomagic || isElementalistXenomagic || isExospecialistAthletics || isCommanderDiplomacy || isGunslingerDeception || isTechnicianTechnology || isAnatomistMedicine || isGrenadierIntimidation || isNecroSurvival || isPoisonerThievery) ? classBoostColor : (isLockedColumn ? '#666' : '#000')) : '#fff',
                                  cursor: (isLockedColumn || isChemistInvestigation || isCoderOikomagic || isContemplativeAwareness || isDevoutXenomagic || isElementalistXenomagic || isExospecialistAthletics || isCommanderDiplomacy || isGunslingerDeception || isTechnicianTechnology || isAnatomistMedicine || isGrenadierIntimidation || isNecroSurvival || isPoisonerThievery) ? 'not-allowed' : ((canCheck && !checked) || canUncheck ? 'pointer' : 'not-allowed'),
                                  opacity: (isLockedColumn || isChemistInvestigation || isCoderOikomagic || isContemplativeAwareness || isDevoutXenomagic || isElementalistXenomagic || isExospecialistAthletics || isCommanderDiplomacy || isGunslingerDeception || isTechnicianTechnology || isAnatomistMedicine || isGrenadierIntimidation || isNecroSurvival || isPoisonerThievery) ? 0.6 : ((canCheck && !checked) || canUncheck ? 1 : 0.4),
                                }}
                                title={
                                  isChemistInvestigation || isCoderOikomagic || isCommanderDiplomacy || isContemplativeAwareness || isDevoutXenomagic || isElementalistXenomagic || isExospecialistAthletics || isGunslingerDeception || isTechnicianTechnology || isAnatomistMedicine || isGrenadierIntimidation || isNecroSurvival || isPoisonerThievery
                                    ? 'Class bonus skill dot (cannot be changed)'
                                    : isLockedColumn 
                                    ? 'Starting skill dots (cannot be changed)'
                                    : (!checked && canCheck)
                                    ? `Click to fill (Cost: ${[1, 1, 2, 2, 3, 4, 5, 6, 8, 10][i]}sp)`
                                    : (canUncheck ? `Click to unfill (Refund: ${[1, 1, 2, 2, 3, 4, 5, 6, 8, 10][i]}sp)` : `Must uncheck rightmost first`)
                                }
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Current HP Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 'bold', minWidth: '20px' }}>Current Hit Points:</span>
              <button
                className={styles.redMinusButton}
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
                  width: '60px',
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
                onClick={() => {
                  const newValue = currentHitPoints + 1;
                  setCurrentHitPoints(newValue);
                  handleAutoSave({ currentHitPoints: newValue });
                }}
              >
                +
              </button>

              {/* Add/Subtract Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '16px' }}>
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
                  style={{ width: '48px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '4px', padding: '2px 4px' }}
                  placeholder="#"
                />
                <button
                  className={styles.redMinusButton}
                  style={{ minWidth: 28, padding: '2px 8px' }}
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
                  style={{ minWidth: 28, padding: '2px 8px' }}
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
              <span style={{ minWidth: '40px', textAlign: 'center' }}>{effectiveMaxHP}</span>
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

    </div>
  );
};

export default LevelUp;
