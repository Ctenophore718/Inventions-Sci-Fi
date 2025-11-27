import { generateFlagellationJSX, generateFlagellationCardStatsJSX } from "../utils/devoutTechnique";
import { generateBenefactionCardJSX } from "../utils/astralTechnique";
import { generateSavageryCardJSX } from "../utils/chaosTechnique";
import { generateWingsOfAirCardJSX } from "../utils/airTechnique";
import { generateEarthenWallCardJSX } from "../utils/earthTechnique";
import { generateFirestormCardJSX } from "../utils/fireTechnique";
import { generateCleansingWatersCardJSX } from "../utils/waterTechnique";
import { generateBulwarkCardJSX } from "../utils/orderTechnique";
import { generateWeakenCardJSX } from "../utils/voidTechnique";
import { generateTargetLockDescriptionJSX } from "../utils/exospecialistTechnique";
import { generateDiveBombCardJSX } from "../utils/aeronautTechnique";
import { generateTheOlOneTwoCardJSX } from "../utils/brawlerTechnique";
import { generateBarrageCardJSX } from "../utils/dreadnaughtTechnique";
import { generateStealthModeCardJSX } from "../utils/spectreTechnique";
import { generateQuickShotCardJSX } from "../utils/gunslingerTechnique";
import { generateDoubleTapCardJSX } from "../utils/gunslingerSecondaryAttack";
import { generateEncodeWeaknessCardJSX } from "../utils/ammocoderTechnique";
import { generateArtilleryStrikeCardJSX } from "../utils/ordnancerTechnique";
import { generateBleedinBulletsCardJSX } from "../utils/pistoleerTechnique";
import { generateLayLowCardJSX } from "../utils/sniperTechnique";
import { generateTrapmakerCardJSX } from "../utils/technicianTechnique";
import { generatePortalSwapCardJSX } from "../utils/HackerTechnique";
import { generateDetonateCardJSX } from "../utils/junkerTechnique";
import { generateVersatileSwarmCardJSX } from "../utils/nanoboticistTechnique";
import { generateBulletMagnetCardJSX } from "../utils/tankerTechnique";
import { generateAvianGazeCardJSX, calculateAvianGazeData } from "../utils/avenochTechnique";
import { generateMemoryManifestCardJSX, generateLimitPushCardJSX, calculateMemoryManifestData, calculateLimitPushData } from "../utils/cerebronychTechnique";
import { generateUnusualGrowthCardJSX, calculateUnusualGrowthData } from "../utils/chloroptidTechnique";
import { generateDarkenedDisplacerCardJSX } from "../utils/corvidTechnique";
import { generateFalconDiveCardJSX } from "../utils/falcadorTechnique";
import { generateDarknessDescendingCardJSX } from "../utils/nocturneTechnique";
import { generateFleshEaterCardJSX } from "../utils/vulturineTechnique";
import { generateOakenshieldCardJSX, calculateOakenshieldData } from "../utils/barkskinTechnique";
import { generatePoisonousBarbsCardJSX, calculatePoisonousBarbsData } from "../utils/carnivorousTechnique";
import { generateGlimpseTheMatrixCardJSX } from "../utils/androidTechnique";
import { generateTechInterferenceCardJSX } from "../utils/utilitydroidTechnique";
import { generateCottonGuardCardJSX } from "../utils/driftingTechnique";
import { generateRootboundCardJSX } from "../utils/vinyTechnique";
import { generateLocalAreaNetworkCardJSX } from "../utils/cognizantTechnique";
import { generateOppressiveHeatCardJSX } from "../utils/emberfolkTechnique";
import { generateStonyRestorationCardJSX } from "../utils/petranTechnique";
import React from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { loadSheetById, saveCharacterSheet } from "../utils/storage";
import styles from "./CharacterSheet.module.css";
import { generateVolatileExperimentsDescriptionJSX, calculateChemistTechniqueData } from "../utils/chemistTechnique";
import { generateTheGoodStuffDescriptionJSX, calculateAnatomistTechniqueData } from "../utils/anatomistTechnique";
import { generateTheBigOneJSX } from "../utils/grenadierTechnique";
import { generateGraspOfTheGraveJSX, calculateNecroTechniqueData } from "../utils/necroTechnique";
import { generateToxicTakedownJSX } from "../utils/poisonerTechnique";
import { generateReflectionScriptDescriptionJSX } from "../utils/coderTechnique";
import { generateEnemiesOnAllSidesCardJSX } from "../utils/coerciveTechnique";
import { generateFateReaderJSX } from "../utils/divinistTechnique";
import { generateBedOfRejuvenationCardJSX } from "../utils/naturalistTechnique";
import { generateForceFieldCardJSX } from "../utils/technologistTechnique";
import { generateCombatDelegationCardJSX } from "../utils/commanderTechnique";
import { generateSeduceDescriptionJSX } from "../utils/beguilerTechnique";
import { generateBolsteringOratoryDescriptionJSX, calculateGalvanicTechniqueData } from "../utils/galvanicTechnique";
import { calculateTacticianTechniqueData } from "../utils/tacticianTechnique";
import { generateTyrannizeDescriptionJSX, calculateTyrantTechniqueData } from "../utils/tyrantTechnique";
import { generateSwiftReactionDescriptionJSX } from "../utils/contemplativeTechnique";
import { generateGravityWellCardJSX } from "../utils/inertialTechnique";
import { generateGrandSlamCardJSX } from "../utils/kineticTechnique";
import { generateHasteCardJSX } from "../utils/mercurialTechnique";
import { generateVectorCloneCardJSX } from "../utils/vectorialTechnique";
import { CardsChemistAttacks } from "./CardsChemistAttacks";
import { CardsCoderAttacks } from "./CardsCoderAttacks";
import { CardsCommanderAttacks } from "./CardsCommanderAttacks";
import { CardsContemplativeAttacks } from "./CardsContemplativeAttacks";
import { CardsDevoutAttacks } from "./CardsDevoutAttacks";
import { CardsElementalistAttacks } from "./CardsElementalistAttacks";
import { CardsElementalistSecondaryAttacks } from "./CardsElementalistSecondaryAttacks";
import { CardsExospecialistAttacks } from "./CardsExospecialistAttacks";
import { CardsGunslingerAttacks } from "./CardsGunslingerAttacks";
import { CardsTechnicianSecondaryAttacks } from "./CardsTechnicianSecondaryAttacks";
import { CardsTechnicianPrimaryAttacks } from "./CardsTechnicianPrimaryAttacks";
import { calculateChemistFeatureData } from "../utils/chemistFeature";

type CardsProps = {
  sheet: CharacterSheet | null;
  onBack: () => void;
  onLevelUp: () => void;
  onHome: () => void;
  onAutoSave?: (updates: Partial<CharacterSheet>) => void;
  charClass: string;
  subclass: string;
};

const Cards: React.FC<CardsProps> = ({ sheet, onBack, onLevelUp, onHome, onAutoSave, charClass, subclass }) => {
  const [localSheet, setLocalSheet] = React.useState<CharacterSheet | null>(sheet);
  const [isNavExpanded, setIsNavExpanded] = React.useState(false);
  const [isXpSpMenuExpanded, setIsXpSpMenuExpanded] = React.useState(false);
  const [isHpMenuExpanded, setIsHpMenuExpanded] = React.useState(false);
  const [isCreditsMenuExpanded, setIsCreditsMenuExpanded] = React.useState(false);
  const [isChemTokensMenuExpanded, setIsChemTokensMenuExpanded] = React.useState(false);
  const [isSummonHpMenuExpanded, setIsSummonHpMenuExpanded] = React.useState(false);
  const [notice, setNotice] = React.useState("");
  const menuRef = React.useRef<HTMLDivElement>(null);
  const waffleRef = React.useRef<HTMLButtonElement>(null);
  const xpSpMenuRef = React.useRef<HTMLDivElement>(null);
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
        xpSpMenuRef.current && !xpSpMenuRef.current.contains(e.target as Node)
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
  }, [notice]);

  // Local state for HP/XP/SP management
  const [currentHitPoints, setCurrentHitPoints] = React.useState<number>(localSheet?.currentHitPoints ?? localSheet?.maxHitPoints ?? 0);
  // For add/subtract HP section
  const [hpDelta, setHpDelta] = React.useState<number>(0);
  // Credits management
  const [credits, setCredits] = React.useState<number>(localSheet?.credits ?? 0);
  const [creditsDelta, setCreditsDelta] = React.useState<number>(0);
  // Chem Tokens management (for Chemist class)
  const [chemTokens, setChemTokens] = React.useState<number>(localSheet?.chemTokens ?? 0);
  
  // Summon HP management (for Elementalist and Technician classes)
  const [currentSummonHp, setCurrentSummonHp] = React.useState<number>(localSheet?.currentSummonHp ?? 0);
  const [maxSummonHp, setMaxSummonHp] = React.useState<number>(localSheet?.maxSummonHp ?? 0);
  const [summonHpDelta, setSummonHpDelta] = React.useState<number>(0);
  const [deathCount, setDeathCount] = React.useState(localSheet?.deathCount || 0);
  const [xpTotal, setXpTotal] = React.useState(localSheet?.xpTotal || 0);
  const [spTotal, setSpTotal] = React.useState(localSheet?.spTotal || 0);

  // Auto-save functionality with debouncing
  const autoSaveTimeoutRef = React.useRef<number>(0);
  const pendingUpdatesRef = React.useRef<Partial<CharacterSheet>>({});
  
  const handleAutoSave = React.useCallback((updates: Partial<CharacterSheet>) => {
    if (!localSheet) return;

    // Merge with pending updates
    pendingUpdatesRef.current = { ...pendingUpdatesRef.current, ...updates };

    clearTimeout(autoSaveTimeoutRef.current);
    autoSaveTimeoutRef.current = window.setTimeout(() => {
      if (onAutoSave) {
        // Use the parent's auto-save function (goes through App's updateCurrentSheet)
        const updatedSheet = { ...localSheet, ...pendingUpdatesRef.current };
        onAutoSave(updatedSheet);
        setLocalSheet(updatedSheet);
      } else {
        // Fallback to direct save if onAutoSave not provided
        const updatedSheet = { ...localSheet, ...pendingUpdatesRef.current };
        saveCharacterSheet(updatedSheet);
        setLocalSheet(updatedSheet);
        
        // Notify other windows of the update
        window.dispatchEvent(new CustomEvent('characterUpdate', {
          detail: { sheet: updatedSheet }
        }));
      }
      
      // Clear pending updates after save
      pendingUpdatesRef.current = {};
    }, 300);
  }, [localSheet, onAutoSave]);

  // Cleanup effect: flush any pending saves when component unmounts or before navigation
  React.useEffect(() => {
    return () => {
      // Clear any pending timeout
      clearTimeout(autoSaveTimeoutRef.current);
      
      // If there are pending updates, save them immediately
      if (Object.keys(pendingUpdatesRef.current).length > 0 && localSheet) {
        if (onAutoSave) {
          // Use the parent's auto-save function
          const updatedSheet = { ...localSheet, ...pendingUpdatesRef.current };
          onAutoSave(updatedSheet);
        } else {
          // Fallback to direct save
          const updatedSheet = { ...localSheet, ...pendingUpdatesRef.current };
          saveCharacterSheet(updatedSheet);
          
          // Notify other windows of the update
          window.dispatchEvent(new CustomEvent('characterUpdate', {
            detail: { sheet: updatedSheet }
          }));
        }
        pendingUpdatesRef.current = {};
      }
    };
  }, [localSheet, onAutoSave]);

  // Sync local state when localSheet changes
  React.useEffect(() => {
    if (localSheet) {
      setCurrentHitPoints(localSheet.currentHitPoints ?? localSheet.maxHitPoints ?? 0);
      setCredits(localSheet.credits ?? 0);
      setChemTokens(localSheet.chemTokens ?? 0);
      setCurrentSummonHp(localSheet.currentSummonHp ?? 0);
      setMaxSummonHp(localSheet.maxSummonHp ?? 0);
      setDeathCount(localSheet.deathCount || 0);
      setXpTotal(localSheet.xpTotal || 0);
      setSpTotal(localSheet.spTotal || 0);
    }
  }, [localSheet]);

  // Update local sheet when prop changes
  React.useEffect(() => {
    setLocalSheet(sheet);
  }, [sheet]);

  // Cross-window synchronization for character display (optimized)
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "rpg-character-sheets" && sheet?.id) {
        const updatedSheet = loadSheetById(sheet.id);
        if (updatedSheet && JSON.stringify(updatedSheet) !== JSON.stringify(localSheet)) {
          setLocalSheet(updatedSheet);
        }
      }
    };

    const handleCharacterUpdate = (e: CustomEvent<{ sheet: CharacterSheet }>) => {
      if (sheet?.id && e.detail.sheet.id === sheet.id) {
        // Only update if the sheet has actually changed
        if (JSON.stringify(e.detail.sheet) !== JSON.stringify(localSheet)) {
          setLocalSheet(e.detail.sheet);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('character-updated', handleCharacterUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('character-updated', handleCharacterUpdate as EventListener);
    };
  }, [sheet?.id, localSheet]);

  // Calculate effective max HP with class bonuses
  const calculateEffectiveMaxHP = (): number => {
    const baseHP = localSheet?.maxHitPoints ?? 0;
    let effectiveHP = baseHP;
    
    // Add Cerebronych species bonus
    if (localSheet?.species === 'Cerebronych') {
      const speciesDots = localSheet?.speciesCardDots || [];
      const hp5Dots = speciesDots[9] || [];
      const hp10Dots = speciesDots[10] || [];
      const hp15Dots = speciesDots[11] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = (hp15Dots[0] ? 15 : 0);
      
      effectiveHP += 30 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Avenoch species bonus
    if (localSheet?.species === 'Avenoch') {
      const speciesDots = localSheet?.speciesCardDots || [];
      const hp5Dots = speciesDots[4] || [];
      const hp10Dots = speciesDots[5] || [];
      const hp15Dots = speciesDots[6] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = (hp15Dots[0] ? 15 : 0);
      
      effectiveHP += 35 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Chloroptid species bonus
    if (localSheet?.species === 'Chloroptid') {
      const speciesDots = localSheet?.speciesCardDots || [];
      const hp5Dots = speciesDots[4] || [];
      const hp10Dots = speciesDots[5] || [];
      const hp15Dots = speciesDots[6] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = (hp15Dots[0] ? 15 : 0);
      
      effectiveHP += 40 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add Barkskin subspecies bonus
    if (localSheet?.subspecies === 'Barkskin') {
      const subspeciesDots = localSheet?.subspeciesCardDots || [];
      const hp10Dots = subspeciesDots[7] || [];
      
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      
      effectiveHP += hp10Bonus;
    }
    
    // Add Petran subspecies bonus
    if (localSheet?.subspecies === 'Petran') {
      const subspeciesDots = localSheet?.subspeciesCardDots || [];
      const hp5Dots = subspeciesDots[7] || [];
      const hp10Dots = subspeciesDots[8] || [];
      const hp15Dots = subspeciesDots[9] || [];
      
      const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
      const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
      const hp15Bonus = hp15Dots.filter(Boolean).length * 15;
      
      effectiveHP += 50 + hp5Bonus + hp10Bonus + hp15Bonus;
    }
    
    // Add class-specific bonuses
    if (localSheet?.charClass === 'Exospecialist') {
      effectiveHP += 20;
      
      // Aeronaut subclass gets +5 Hit Points per dot
      if (localSheet?.subclass === 'Aeronaut') {
        const aeronautHitPointsBonus = ((localSheet?.subclassProgressionDots as any)?.aeronautHitPointsDots?.filter(Boolean).length || 0) * 5;
        effectiveHP += aeronautHitPointsBonus;
      }
      
      // Brawler subclass gets +10 Hit Points per dot
      if (localSheet?.subclass === 'Brawler') {
        const brawlerHitPointsBonus = ((localSheet?.subclassProgressionDots as any)?.brawlerHitPointsDots?.filter(Boolean).length || 0) * 10;
        effectiveHP += brawlerHitPointsBonus;
      }
      
      // Dreadnaught subclass gets +10 Hit Points per dot (3 dots) and +20 Hit Points (1 dot)
      if (localSheet?.subclass === 'Dreadnaught') {
        const dreadnaughtHitPointsBonus = ((localSheet?.subclassProgressionDots as any)?.dreadnaughtHitPointsDots?.filter(Boolean).length || 0) * 10;
        const dreadnaughtHitPointsExtraBonus = ((localSheet?.subclassProgressionDots as any)?.dreadnaughtHitPointsExtraDots?.[0]) ? 20 : 0;
        effectiveHP += dreadnaughtHitPointsBonus + dreadnaughtHitPointsExtraBonus;
      }
      
      // Spectre subclass gets +10 Hit Points per dot
      if (localSheet?.subclass === 'Spectre') {
        const spectreHitPointsBonus = ((localSheet?.subclassProgressionDots as any)?.spectreHitPointsDots?.filter(Boolean).length || 0) * 10;
        effectiveHP += spectreHitPointsBonus;
      }
    }
    
    return effectiveHP;
  };

  const effectiveMaxHP = calculateEffectiveMaxHP();

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div style={{ padding: "1rem" }}>
  {/* Cards header moved to App.tsx for right alignment */}
      
      {/* Responsive card grid with fixed card sizes (240px ? 336px) - optimized for 3 cards on iPad */}
      <div style={{ 
        marginTop: '0.5rem', 
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        padding: '0 0.5rem' // Reduced padding to fit 3 cards on iPad
      }}>
        {/* Technique Cards */}
        <div style={{ 
          width: '240px', 
          height: '336px', 
          background: '#fff', 
          border: '5px solid #bf9000', 
          borderRadius: 8, 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
          padding: '1.2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
            <div style={{
              position: 'absolute',
              top: -4,
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end', // align by bottom
              padding: '0 10px',
              boxSizing: 'border-box',
              minHeight: '2.1em' // ensure enough height for both lines
            }}>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold',
                fontSize: 'clamp(0.8em, 4vw, 1.25em)',
                color: charClass === 'Chemist' ? '#721131' : charClass === 'Coder' ? '#112972' : charClass === 'Commander' ? '#717211' : charClass === 'Contemplative' ? '#116372' : charClass === 'Devout' ? '#6b1172' : charClass === 'Elementalist' ? '#231172' : charClass === 'Exospecialist' ? '#117233' : charClass === 'Gunslinger' ? '#4e7211' : charClass === 'Technician' ? '#724811' : 'black',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                {charClass === 'Chemist' ? 'Volatile Experiments'
                  : charClass === 'Coder' ? 'Reflection Script'
                  : charClass === 'Commander' ? 'Combat Delegation'
                  : charClass === 'Contemplative' ? 'Swift Reaction'
                  : charClass === 'Devout' ? 'Flagellation'
                  : charClass === 'Elementalist' ? 'Commune'
                  : charClass === 'Exospecialist' ? 'Target Lock'
                  : charClass === 'Gunslinger' ? 'Quick Shot'
                  : charClass === 'Technician' ? 'Trapmaker'
                  : 'Class Card Name'}
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em', // 10% smaller than 0.85em
                color: charClass === 'Chemist' ? '#721131' : charClass === 'Coder' ? '#112972' : charClass === 'Commander' ? '#717211' : charClass === 'Contemplative' ? '#116372' : charClass === 'Devout' ? '#6b1172' : charClass === 'Elementalist' ? '#231172' : charClass === 'Exospecialist' ? '#117233' : charClass === 'Gunslinger' ? '#4e7211' : charClass === 'Technician' ? '#724811' : 'black',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '78px',
                display: 'inline-block',
                textAlign: 'right',
                marginRight: '0px'
              }}>{charClass === 'Chemist' ? 'Chemist'
                : charClass === 'Coder' ? 'Coder'
                : charClass === 'Commander' ? 'Commander'
                : charClass === 'Contemplative' ? 'Contemplative'
                : charClass === 'Devout' ? 'Devout'
                : charClass === 'Elementalist' ? 'Elementalist'
                : charClass === 'Exospecialist' ? 'Exospecialist'
                : charClass === 'Gunslinger' ? 'Gunslinger'
                : charClass === 'Technician' ? 'Technician'
                : 'Class'}</span>
            </div>
            {/* Conditional image based on class */}
            <img 
              src={charClass === 'Devout' ? "/Flagellation.png"
                : charClass === 'Chemist' ? "/Volatile Experiments.png"
                : charClass === 'Coder' ? "/Reflection Script.png"
                : charClass === 'Commander' ? "/Combat Delegation.png"
                : charClass === 'Contemplative' ? "/Swift Reaction.png"
                : charClass === 'Elementalist' ? "/Commune.png"
                : charClass === 'Exospecialist' ? "/Target Lock.png"
                : charClass === 'Gunslinger' ? "/Quick Shot.png"
                : charClass === 'Technician' ? "/Trapmaker.png"
                : charClass === 'Ensnaring Hand Warps' ? "/Ensnaring Hand Warps.png"
                : charClass === 'Mala of Mind Darts' ? "/Mala of Mind Darts.png"
                : charClass === 'Singing Bowl' ? "/Singing Bowl.png"
                : charClass === 'Telekinetic Knuckles' ? "/Telekinetic Knuckles.png"
                : charClass === 'Viperfang Ring' ? "/Viperfang Ring.png"
                : charClass === 'Asana of Heaviness' ? "/Asana of Heaviness.png"
                : charClass === 'Passive Asana' ? "/Passive Asana.png"
                : charClass === 'Empty Mudra' ? "/Empty Mudra.png"
                : charClass === 'Mudra of Brilliance' ? "/Mudra of Brilliance.png"
                : charClass === 'Way of Quicksilver' ? "/Way of Quicksilver.png"
                : charClass === 'Way of Sublimation' ? "/Way of Sublimation.png"
                : charClass === 'Bane Prana' ? "/Bane Prana.png"
                : charClass === 'Night Prana' ? "/Night Prana.png"
                : "/Blank Card.png"}
              alt={charClass === 'Devout' ? "Flagellation"
                : charClass === 'Chemist' ? "Volatile Experiments"
                : charClass === 'Coder' ? "Reflection Script"
                : charClass === 'Commander' ? "Combat Delegation"
                : charClass === 'Contemplative' ? "Swift Reaction"
                : charClass === 'Elementalist' ? "Commune"
                : charClass === 'Exospecialist' ? "Target Lock"
                : charClass === 'Gunslinger' ? "Quick Shot"
                : charClass === 'Technician' ? "Trapmaker"
                : "Blank Card"}
              style={{
                position: 'absolute',
                top: 35,
                left: 10,
                right: 10,
                width: 'calc(100% - 20px)',
                height: 'calc(50% - 55px)',
                objectFit: 'cover',
                zIndex: 1,
                borderRadius: 8
              }}
            />
            {/* Technique and Cooldown - absolutely positioned and locked */}
            <div style={{
              position: 'absolute',
              top: 'calc(50% - 15px)',
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              zIndex: 3
            }}>
              <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>Technique</span>
              <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                {charClass === 'Exospecialist' ? (
                  (() => {
                    let cooldown = 3;
                    // -1 Cooldown dots are in classCardDots[3]
                    if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[3])) {
                      cooldown = 3 - localSheet.classCardDots[3].filter(Boolean).length;
                      if (cooldown < 1) cooldown = 1;
                    }
                    return <span>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{cooldown}]</span></span>;
                  })()
                ) : charClass === 'Devout' ? (() => {
                  let cooldown = 4;
                  if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[3])) {
                    const selected = localSheet.classCardDots[3].filter(Boolean).length;
                    if (selected === 1) cooldown = 3;
                    if (selected === 2) cooldown = 2;
                  }
                  return (<span>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{cooldown}]</span></span>);
                })() : charClass === 'Elementalist' ? (() => {
                  let cooldown = 4;
                  if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[3])) {
                    const selected = localSheet.classCardDots[3].filter(Boolean).length;
                    cooldown = 4 - selected;
                    if (cooldown < 1) cooldown = 1;
                  }
                  return (<span>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{cooldown}]</span></span>);
                })() : (
                  <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>
                    [{charClass === 'Chemist' ? (() => {
                      const { cooldown } = calculateChemistTechniqueData(localSheet?.classCardDots);
                      return cooldown;
                    })() : charClass === 'Coder' ? (() => {
                      let cooldown = 4;
                      if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[5])) {
                        cooldown = 4 - localSheet.classCardDots[5].filter(Boolean).length;
                        if (cooldown < 1) cooldown = 1;
                      }
                      return cooldown;
                    })() : charClass === 'Commander' ? (() => {
                      let cooldown = 4;
                      if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[5])) {
                        cooldown = 4 - localSheet.classCardDots[5].filter(Boolean).length;
                        if (cooldown < 1) cooldown = 1;
                      }
                      return cooldown;
                    })() : charClass === 'Contemplative' ? (() => {
                      let cooldown = 4;
                      if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[4])) {
                        cooldown = 4 - localSheet.classCardDots[4].filter(Boolean).length;
                        if (cooldown < 1) cooldown = 1;
                      }
                      return cooldown;
                    })() : charClass === 'Gunslinger' ? (() => {
                      let cooldown = 4;
                      if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[4])) {
                        cooldown = 4 - localSheet.classCardDots[4].filter(Boolean).length;
                        if (cooldown < 1) cooldown = 1;
                      }
                      return cooldown;
                    })() : charClass === 'Technician' ? (() => {
                      let cooldown = 4;
                      if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[4])) {
                        cooldown = 4 - localSheet.classCardDots[6].filter(Boolean).length;
                        if (cooldown < 1) cooldown = 1;
                      }
                      return cooldown;
                    })() : '#'}]
                  </span></>
                )}
              </span>
            </div>
            
            {/* Card stats - positioned with 10px gaps and fixed readable font size */}
            <div style={{
              position: 'absolute',
              top: 'calc(50% + 10px)',
              left: 10,
              right: 10,
              bottom: 45,
              color: '#000',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 400,
              overflow: 'auto',
              wordWrap: 'break-word',
              display: 'flex',
              alignItems: 'flex-start',
              zIndex: 2,
              lineHeight: 1.2
            }}>
              <div style={{
                fontSize: '0.875em', // Fixed size, no responsive scaling
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>
                {charClass === 'Gunslinger'
                  ? (() => {
                      return generateQuickShotCardJSX(localSheet?.classCardDots);
                    })()
                  : charClass === 'Devout' ? (
                    generateFlagellationCardStatsJSX(localSheet?.classCardDots)
                  ) : charClass === 'Exospecialist' ? (
                    generateTargetLockDescriptionJSX(localSheet?.classCardDots)
                  ) : charClass === 'Chemist' ? (
                    <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      {generateVolatileExperimentsDescriptionJSX(localSheet?.classCardDots)}
                    </div>
                  ) : charClass === 'Coder' ? (
                    <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      {generateReflectionScriptDescriptionJSX(localSheet?.classCardDots)}
                    </div>
                  ) : charClass === 'Commander' ? (
                    <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      {generateCombatDelegationCardJSX(localSheet?.classCardDots)}
                    </div>
                  ) : charClass === 'Contemplative' ? (
                    <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      {generateSwiftReactionDescriptionJSX(localSheet?.classCardDots)}
                    </div>
                  ) : charClass === 'Elementalist' ? (() => {
                    // Elementalist Commune card logic
                    // If classCardDots[2][0] (Triple Damage dice) is selected, show [triple] instead of [double]
                    const triple = Array.isArray(localSheet?.classCardDots?.[2]) && localSheet.classCardDots[2][0];
                    return (
                      <>
                        You deal <b>[{triple ? 'triple' : 'double'}]</b> Damage dice with your next <b><i style={{ color: '#990000' }}>Attack</i></b>.
                      </>
                    );
                  })()
                   : charClass === 'Technician' ? (() => {
                    // Technician Trapmaker card logic
                    return generateTrapmakerCardJSX(localSheet?.classCardDots);
                  })()
                  : 'Card stats.'}
              </div>
            </div>
            {/* Flavor text - absolutely positioned and locked */}
            <div style={{
              position: 'absolute',
              top: 330,
              bottom: 5,
              left: 10,
              right: 10,
              color: '#000',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.7em',
              fontWeight: 400,
              zIndex: 3,
              textAlign: 'left'
            }}>
              {charClass === 'Devout' ? (
                <span>"Sacrifice is a necessary cost of any spiritual power. The most devout sacrifice their own flesh." <br />--Theodora de la Fe, Defteran Devout</span>
              ) : charClass === 'Chemist' ? 
                'With the right concoctions, any spell or weapon becomes even more volatile than before.' 
                : charClass === 'Coder' ?
                (<span>"Although it’s a universal script, the math behind reflecting energetic material is quite complex." --Luminova, X-Ray Naturalist</span>)
                : charClass === 'Commander' ? (
                  <span style={{ fontSize: '0.89em' }}>"...That's 'cause I got people with me, people who trust each other, who do for each other and ain't always looking for the advantage." --Mal, Human Captain of Serenity</span>
                ) : charClass === 'Contemplative' ? (
                  <span>"One must always be responsive at a moment’s notice to fight not only another day, but another instant." --Master Li Ren, Felid Contemplative</span>
                ) : charClass === 'Elementalist' ? (
                  <span>A little prayer with your Xenomagical elemental sprite can go a long way.</span>
                ) : charClass === 'Exospecialist' ? (
                  <span>Aim at your target without distractions. Focus on one target. Hit your goal and move on to the next one. Focus is your friend.</span>
                ) : charClass === 'Gunslinger' ? (
                  <span>"I always keep my finger on the trigger, right at the brink of firing. Don’t even blink at me wrong or you’ll get a hole in ya." --Anonymous</span>
                ) : charClass === 'Technician' ? (
                  <span>"Really changes the meaning of 'trip-mine' when it causes psychedelic visions to anyone who steps on it." --Jackdaw Nightswain, Corvid Technician</span>
                ) : 'Flavor text.'}
            </div>
            </div>
            
        <div style={{ 
          width: '240px', 
          height: '336px', 
          background: '#fff', 
          border: '5px solid #bf9000', 
          borderRadius: 8, 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
          padding: '1.2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
            <div style={{
              position: 'absolute',
              top: -4,
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              padding: '0 10px',
              boxSizing: 'border-box',
              minHeight: '2.1em'
            }}>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold',
                fontSize: 'clamp(0.8em, 4vw, 1.25em)',
                color: localSheet?.subclass === 'Anatomist' ? '#66cf00' : localSheet?.subclass === 'Grenadier' ? '#cf0000' : localSheet?.subclass === 'Necro' ? '#0033cf' : localSheet?.subclass === 'Poisoner' ? '#cf7600' : localSheet?.subclass === 'Coercive' ? '#43c9ff' : localSheet?.subclass === 'Divinist' ? '#ff4343' : localSheet?.subclass === 'Naturalist' ? '#66cf00' : localSheet?.subclass === 'Technologist' ? '#8c43ff' : localSheet?.subclass === 'Beguiler' ? '#1f21ce' : localSheet?.subclass === 'Galvanic' ? '#6fce1f' : localSheet?.subclass === 'Tactician' ? '#cec31f' : localSheet?.subclass === 'Tyrant' ? '#ce1f1f' : localSheet?.subclass === 'Inertial' ? '#1c945e' : localSheet?.subclass === 'Kinetic' ? '#7b941c' : localSheet?.subclass === 'Mercurial' ? '#941c6c' : localSheet?.subclass === 'Vectorial' ? '#531c94' : localSheet?.subclass === 'Astral' ? '#5bb1af' : localSheet?.subclass === 'Chaos' ? '#b15b6c' : localSheet?.subclass === 'Order' ? '#aeb15b' : localSheet?.subclass === 'Void' ? '#5b73b1' : localSheet?.subclass === 'Aeronaut' ? '#3da1d8' : localSheet?.subclass === 'Brawler' ? '#d8a53d' : localSheet?.subclass === 'Dreadnaught' ? '#d83da0' : localSheet?.subclass === 'Spectre' ? '#6a3dd8' : localSheet?.subclass === 'Ammo Coder' ? '#112972' : localSheet?.subclass === 'Ordnancer' ? '#910a0a' : 'black',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                {localSheet?.subclass === 'Anatomist' ? 'The "Good Stuff"' : localSheet?.subclass === 'Grenadier' ? 'The "Big One"' : localSheet?.subclass === 'Necro' ? 'Grasp of the Grave' : localSheet?.subclass === 'Poisoner' ? 'Toxic Takedown' : localSheet?.subclass === 'Coercive' ? 'Enemies On All Sides' : localSheet?.subclass === 'Divinist' ? 'Fate Reader' : localSheet?.subclass === 'Naturalist' ? 'Bed of Rejuvenation' : localSheet?.subclass === 'Technologist' ? 'Force Field' : localSheet?.subclass === 'Beguiler' ? 'Seduce' : localSheet?.subclass === 'Galvanic' ? 'Bolstering Oratory' : localSheet?.subclass === 'Tactician' ? 'Strategery' : localSheet?.subclass === 'Tyrant' ? 'Tyrannize' : localSheet?.subclass === 'Inertial' ? 'Gravity Well' : localSheet?.subclass === 'Kinetic' ? <span style={{ color: '#7b941c' }}>Grand Slam</span> : localSheet?.subclass === 'Mercurial' ? <span style={{ color: '#941c6c' }}>Haste</span> : localSheet?.subclass === 'Vectorial' ? <span style={{ color: '#531c94' }}>Vector Clone</span> : localSheet?.subclass === 'Astral' ? 'Benefaction' : localSheet?.subclass === 'Chaos' ? 'Savagery' : localSheet?.subclass === 'Order' ? 'Bulwark' : localSheet?.subclass === 'Void' ? 'Weaken' : localSheet?.subclass === 'Air' ? <span style={{ color: '#0ee2df' }}>Wings of Air</span> : localSheet?.subclass === 'Earth' ? <span style={{ color: '#e2b90e' }}>Earthen Wall</span> : localSheet?.subclass === 'Fire' ? <span style={{ color: '#e25d0e' }}>Firestorm</span> : localSheet?.subclass === 'Water' ? <span style={{ color: '#0e42e2' }}>Cleansing Waters</span> : localSheet?.subclass === 'Aeronaut' ? 'Dive Bomb' : localSheet?.subclass === 'Brawler' ? 'The Ol\' One-Two' : localSheet?.subclass === 'Dreadnaught' ? 'Barrage' : localSheet?.subclass === 'Spectre' ? 'Stealth Mode' : localSheet?.subclass === 'Ammo Coder' ? 'Encode Weakness' : localSheet?.subclass === 'Ordnancer' ? 'Artillery Strike' : localSheet?.subclass === 'Pistoleer' ? <span style={{ color: '#5a910a' }}>Bleedin' Bullets</span> : localSheet?.subclass === 'Sniper' ? <span style={{ color: '#0a6f91' }}>Lay Low</span> : localSheet?.subclass === 'Hacker' ? 'Portal Swap' : localSheet?.subclass === 'Junker' ? <span style={{ color: '#6db857' }}>Detonate</span> : localSheet?.subclass === 'Nanoboticist' ? <span style={{ color: '#57b8b0' }}>Versatile Swarm</span> : localSheet?.subclass === 'Tanker' ? <span style={{ color: '#808080' }}>Bullet Magnet</span> : 'Subclass Card Name'}
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: localSheet?.subclass === 'Anatomist' ? '#66cf00' : localSheet?.subclass === 'Grenadier' ? '#cf0000' : localSheet?.subclass === 'Necro' ? '#0033cf' : localSheet?.subclass === 'Poisoner' ? '#cf7600' : localSheet?.subclass === 'Coercive' ? '#43c9ff' : localSheet?.subclass === 'Divinist' ? '#ff4343' : localSheet?.subclass === 'Naturalist' ? '#66cf00' : localSheet?.subclass === 'Technologist' ? '#8c43ff' : localSheet?.subclass === 'Beguiler' ? '#1f21ce' : localSheet?.subclass === 'Galvanic' ? '#6fce1f' : localSheet?.subclass === 'Tactician' ? '#cec31f' : localSheet?.subclass === 'Tyrant' ? '#ce1f1f' : localSheet?.subclass === 'Inertial' ? '#1c945e' : localSheet?.subclass === 'Kinetic' ? '#6A0D91' : localSheet?.subclass === 'Mercurial' ? '#941c6c' : localSheet?.subclass === 'Vectorial' ? '#531c94' : localSheet?.subclass === 'Astral' ? '#5bb1af' : localSheet?.subclass === 'Chaos' ? '#b15b6c' : localSheet?.subclass === 'Order' ? '#aeb15b' : localSheet?.subclass === 'Void' ? '#5b73b1' : localSheet?.subclass === 'Earth' ? '#8B4513' : localSheet?.subclass === 'Fire' ? '#e25d0e' : localSheet?.subclass === 'Aeronaut' ? '#3da1d8' : localSheet?.subclass === 'Brawler' ? '#d8a53d' : localSheet?.subclass === 'Dreadnaught' ? '#d83da0' : localSheet?.subclass === 'Spectre' ? '#6a3dd8' : localSheet?.subclass === 'Ammo Coder' ? '#112972' : localSheet?.subclass === 'Ordnancer' ? '#910a0a' : localSheet?.subclass === 'Pistoleer' ? '#5a910a' : localSheet?.subclass === 'Hacker' ? '#1c6f8c' : localSheet?.subclass === 'Junker' ? '#6db857' : localSheet?.subclass === 'Tanker' ? '#808080' : 'black',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '72px',
                display: 'inline-block',
                textAlign: 'right'
              }}>{localSheet?.subclass === 'Air' ? <span style={{ color: '#0ee2df', fontWeight: 'bold' }}>Air</span> : localSheet?.subclass === 'Earth' ? <span style={{ color: '#e2b90e', fontWeight: 'bold' }}>Earth</span> : localSheet?.subclass === 'Fire' ? <span style={{ color: '#e25d0e', fontWeight: 'bold' }}>Fire</span> : localSheet?.subclass === 'Water' ? <span style={{ color: '#0e42e2', fontWeight: 'bold' }}>Water</span> : localSheet?.subclass === 'Anatomist' ? 'Anatomist' : localSheet?.subclass === 'Grenadier' ? 'Grenadier' : localSheet?.subclass === 'Necro' ? 'Necro' : localSheet?.subclass === 'Poisoner' ? 'Poisoner' : localSheet?.subclass === 'Coercive' ? 'Coercive' : localSheet?.subclass === 'Divinist' ? 'Divinist' : localSheet?.subclass === 'Naturalist' ? 'Naturalist' : localSheet?.subclass === 'Technologist' ? 'Technologist' : localSheet?.subclass === 'Beguiler' ? 'Beguiler' : localSheet?.subclass === 'Galvanic' ? 'Galvanic' : localSheet?.subclass === 'Tactician' ? 'Tactician' : localSheet?.subclass === 'Tyrant' ? 'Tyrant' : localSheet?.subclass === 'Inertial' ? 'Inertial' : localSheet?.subclass === 'Kinetic' ? <span style={{ color: '#7b941c' }}>Kinetic</span> : localSheet?.subclass === 'Mercurial' ? <span style={{ color: '#941c6c' }}>Mercurial</span> : localSheet?.subclass === 'Vectorial' ? <span style={{ color: '#531c94' }}>Vectorial</span> : localSheet?.subclass === 'Astral' ? 'Astral' : localSheet?.subclass === 'Chaos' ? 'Chaos' : localSheet?.subclass === 'Order' ? 'Order' : localSheet?.subclass === 'Void' ? 'Void' : localSheet?.subclass === 'Aeronaut' ? 'Aeronaut' : localSheet?.subclass === 'Brawler' ? 'Brawler' : localSheet?.subclass === 'Dreadnaught' ? 'Dreadnaught' : localSheet?.subclass === 'Spectre' ? 'Spectre' : localSheet?.subclass === 'Ammo Coder' ? <span>Ammo<br />Coder</span> : localSheet?.subclass === 'Ordnancer' ? 'Ordnancer' : localSheet?.subclass === 'Pistoleer' ? 'Pistoleer' : localSheet?.subclass === 'Sniper' ? <span style={{ color: '#0a6f91' }}>Sniper</span> : localSheet?.subclass === 'Hacker' ? 'Hacker' : localSheet?.subclass === 'Junker' ? 'Junker' : localSheet?.subclass === 'Nanoboticist' ? <span style={{ color: '#57b8b0' }}>Nanoboticist</span> : localSheet?.subclass === 'Tanker' ? <span style={{ color: '#808080' }}>Tanker</span> : 'Subclass'}</span>
            </div>
            <img 
              src={localSheet?.subclass === 'Anatomist' ? "/The Good Stuff.png" : localSheet?.subclass === 'Grenadier' ? "/The Big One.png" : localSheet?.subclass === 'Necro' ? "/Grasp of the Grave.png" : localSheet?.subclass === 'Poisoner' ? "/Toxic Takedown.png" : localSheet?.subclass === 'Coercive' ? "/Enemies On All Sides.png" : localSheet?.subclass === 'Divinist' ? "/Fate Reader.png" : localSheet?.subclass === 'Naturalist' ? "/Bed of Rejuvenation.png" : localSheet?.subclass === 'Technologist' ? "/Force Field.png" : localSheet?.subclass === 'Beguiler' ? "/Seduce.png" : localSheet?.subclass === 'Galvanic' ? "/Bolstering Oratory.png" : localSheet?.subclass === 'Tactician' ? "/Strategery.png" : localSheet?.subclass === 'Tyrant' ? "/Tyrannize.png" : localSheet?.subclass === 'Inertial' ? "/Gravity Well.png" : localSheet?.subclass === 'Kinetic' ? "/Grand Slam.png" : localSheet?.subclass === 'Mercurial' ? "/Haste.png" : localSheet?.subclass === 'Vectorial' ? "/Vector Clone.png" : localSheet?.subclass === 'Astral' ? "/Benefaction.png" : localSheet?.subclass === 'Chaos' ? "/Savagery.png" : localSheet?.subclass === 'Order' ? "/Bulwark.png" : localSheet?.subclass === 'Void' ? "/Weaken.png" : localSheet?.subclass === 'Air' ? "/Wings of Air.png" : localSheet?.subclass === 'Earth' ? "/Earthen Wall.png" : localSheet?.subclass === 'Fire' ? "/Firestorm.png" : localSheet?.subclass === 'Water' ? "/Cleansing Waters.png" : localSheet?.subclass === 'Aeronaut' ? "/Dive Bomb.png" : localSheet?.subclass === 'Brawler' ? "/The Ol' One-Two.png" : localSheet?.subclass === 'Dreadnaught' ? "/Barrage.png" : localSheet?.subclass === 'Spectre' ? "/Stealth Mode.png" : localSheet?.subclass === 'Ammo Coder' ? "/Encode Weakness.png" : localSheet?.subclass === 'Ordnancer' ? "/Artillery Strike.png" : localSheet?.subclass === 'Pistoleer' ? "/Bleedin' Bullets.png" : localSheet?.subclass === 'Sniper' ? "/Lay Low.png" : localSheet?.subclass === 'Hacker' ? "/Portal Swap.png" : localSheet?.subclass === 'Junker' ? "/Detonate.png" : localSheet?.subclass === 'Nanoboticist' ? "/Versatile Swarm.png" : localSheet?.subclass === 'Tanker' ? "/Bullet Magnet.png" : "/Blank Card.png"}
              alt={localSheet?.subclass === 'Anatomist' ? "The Good Stuff" : localSheet?.subclass === 'Grenadier' ? "The Big One" : localSheet?.subclass === 'Necro' ? "Grasp of the Grave" : localSheet?.subclass === 'Poisoner' ? "Toxic Takedown" : localSheet?.subclass === 'Coercive' ? "Enemies On All Sides" : localSheet?.subclass === 'Divinist' ? "Fate Reader" : localSheet?.subclass === 'Naturalist' ? "Bed of Rejuvenation" : localSheet?.subclass === 'Technologist' ? "Force Field" : localSheet?.subclass === 'Beguiler' ? "Seduce" : localSheet?.subclass === 'Galvanic' ? "Bolstering Oratory" : localSheet?.subclass === 'Tactician' ? "Strategery" : localSheet?.subclass === 'Tyrant' ? "Tyrannize" : localSheet?.subclass === 'Inertial' ? "Gravity Well" : localSheet?.subclass === 'Kinetic' ? "Grand Slam" : localSheet?.subclass === 'Mercurial' ? "Haste" : localSheet?.subclass === 'Vectorial' ? "Vector Clone" : localSheet?.subclass === 'Astral' ? "Benefaction" : localSheet?.subclass === 'Chaos' ? "Savagery" : localSheet?.subclass === 'Order' ? "Bulwark" : localSheet?.subclass === 'Void' ? "Weaken" : localSheet?.subclass === 'Air' ? "Wings of Air" : localSheet?.subclass === 'Earth' ? "Earthen Wall" : localSheet?.subclass === 'Fire' ? "Firestorm" : localSheet?.subclass === 'Water' ? "Cleansing Waters" : localSheet?.subclass === 'Aeronaut' ? "Dive Bomb" : localSheet?.subclass === 'Brawler' ? "The Ol' One-Two" : localSheet?.subclass === 'Dreadnaught' ? "Barrage" : localSheet?.subclass === 'Spectre' ? "Stealth Mode" : localSheet?.subclass === 'Ammo Coder' ? "Encode Weakness" : localSheet?.subclass === 'Ordnancer' ? "Artillery Strike" : localSheet?.subclass === 'Pistoleer' ? "Bleedin' Bullets" : localSheet?.subclass === 'Sniper' ? "Lay Low" : localSheet?.subclass === 'Hacker' ? "Portal Swap" : localSheet?.subclass === 'Junker' ? "Detonate" : localSheet?.subclass === 'Nanoboticist' ? "Blank Card" : localSheet?.subclass === 'Tanker' ? "Bullet Magnet" : "Blank Card"}
              style={{
                position: 'absolute',
                top: 35,
                left: 10,
                right: 10,
                width: 'calc(100% - 20px)',
                height: 'calc(50% - 55px)',
                objectFit: 'cover',
                zIndex: 1,
                borderRadius: 8
              }}
            />
            <div style={{
              position: 'absolute',
              top: 'calc(50% - 15px)',
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              zIndex: 3
            }}>
              <span style={{ color: localSheet?.subclass === 'Grenadier' ? '#bf9000' : '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>Technique</span>
              <span style={{ color: localSheet?.subclass === 'Grenadier' ? '#bf9000' : '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                {localSheet?.subclass === 'Grenadier'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - (localSheet?.subclassProgressionDots?.grenadierTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Necro'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{calculateNecroTechniqueData({
                      necroTechniqueRangeDots: localSheet?.subclassProgressionDots?.necroTechniqueRangeDots,
                      necroTechniqueInflictBlindDots: localSheet?.subclassProgressionDots?.necroTechniqueInflictBlindDots,
                      necroTechniqueCooldownDots: localSheet?.subclassProgressionDots?.necroTechniqueCooldownDots
                    }).cooldown}]</span></>
                  : localSheet?.subclass === 'Poisoner'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - (localSheet?.subclassProgressionDots?.poisonerTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Coercive'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - (localSheet?.subclassProgressionDots?.coerciveTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Divinist'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.divinistTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Naturalist'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.naturalistTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Technologist'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{3 - ((localSheet?.subclassProgressionDots as any)?.technologistTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Beguiler'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.beguilerTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Galvanic'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{calculateGalvanicTechniqueData(
                      (localSheet?.subclassProgressionDots as any)?.galvanicTechniqueHxDots,
                      (localSheet?.subclassProgressionDots as any)?.galvanicTechniqueCritDots,
                      (localSheet?.subclassProgressionDots as any)?.galvanicTechniqueHpDots,
                      (localSheet?.subclassProgressionDots as any)?.galvanicTechniqueCooldownDots
                    ).cooldown}]</span></>
                  : localSheet?.subclass === 'Tactician'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{calculateTacticianTechniqueData(
                      (localSheet?.subclassProgressionDots as any)?.tacticianTechniqueRangeHxDots,
                      (localSheet?.subclassProgressionDots as any)?.tacticianTechniqueDamageDiceDots,
                      (localSheet?.subclassProgressionDots as any)?.tacticianTechniqueCooldownDots
                    ).cooldown}]</span></>
                  : localSheet?.subclass === 'Tyrant'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{calculateTyrantTechniqueData(
                      (localSheet?.subclassProgressionDots as any)?.tyrantTechniqueHxDots,
                      (localSheet?.subclassProgressionDots as any)?.tyrantTechniqueMoveDots,
                      (localSheet?.subclassProgressionDots as any)?.tyrantTechniqueCooldownDots
                    ).cooldown}]</span></>
                  : localSheet?.subclass === 'Inertial'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.inertialTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Kinetic'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.kineticTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Mercurial'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.mercurialTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Vectorial'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.vectorialTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Astral'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.astralTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Chaos'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.chaosTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Order'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.orderTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Void'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.voidTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Air'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.airTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Earth'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.earthTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Fire'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.fireTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Water'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.waterTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Aeronaut'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{3 - ((localSheet?.subclassProgressionDots as any)?.aeronautTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Brawler'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.brawlerTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Dreadnaught'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.dreadnaughtTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Spectre'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{3 - ((localSheet?.subclassProgressionDots as any)?.spectreTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Ammo Coder'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.ammocoderTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Ordnancer'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.ordnancerTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Pistoleer'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.pistoleerTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Sniper'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{3 - ((localSheet?.subclassProgressionDots as any)?.sniperTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Hacker'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{3 - ((localSheet?.subclassProgressionDots as any)?.hackerTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Junker'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{3 - ((localSheet?.subclassProgressionDots as any)?.junkerTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Nanoboticist'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.nanoboticistTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : localSheet?.subclass === 'Tanker'
                  ? <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.tankerTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span></>
                  : <>Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{localSheet?.subclass === 'Anatomist' ? calculateAnatomistTechniqueData(localSheet?.subclassProgressionDots).cooldown : '#'}]</span></>}
              </span>
            </div>
            
            <div style={{
              position: 'absolute',
              top: 'calc(50% + 10px)',
              left: 10,
              right: 10,
              bottom: 45,
              color: '#000',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 400,
              overflow: 'auto',
              wordWrap: 'break-word',
              display: 'flex',
              alignItems: 'flex-start',
              zIndex: 2,
              lineHeight: 1.2
            }}>
              <div style={{
                fontSize: '0.875em',
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>
                {localSheet?.subclass === 'Grenadier'
                  ? generateTheBigOneJSX({
                      grenadierTechniqueCooldownDots: localSheet?.subclassProgressionDots?.grenadierTechniqueCooldownDots,
                      grenadierTechniqueDieSizeDots: localSheet?.subclassProgressionDots?.grenadierTechniqueDieSizeDots,
                      grenadierTechniqueRangeDots: localSheet?.subclassProgressionDots?.grenadierTechniqueRangeDots,
                    })
                  : localSheet?.subclass === 'Necro'
                  ? generateGraspOfTheGraveJSX({
                      necroTechniqueRangeDots: localSheet?.subclassProgressionDots?.necroTechniqueRangeDots,
                      necroTechniqueInflictBlindDots: localSheet?.subclassProgressionDots?.necroTechniqueInflictBlindDots,
                      necroTechniqueCooldownDots: localSheet?.subclassProgressionDots?.necroTechniqueCooldownDots
                    })
                  : localSheet?.subclass === 'Anatomist'
                  ? generateTheGoodStuffDescriptionJSX(localSheet?.subclassProgressionDots)
                  : localSheet?.subclass === 'Poisoner'
                  ? generateToxicTakedownJSX({
                      _poisonerTechniqueCooldownDots: localSheet?.subclassProgressionDots?.poisonerTechniqueCooldownDots || [false, false],
                      poisonerTechnique2EffectsPerTokenDots: localSheet?.subclassProgressionDots?.poisonerTechnique2EffectsPerTokenDots || [false],
                      poisonerTechniqueSameEffectMultipleDots: localSheet?.subclassProgressionDots?.poisonerTechniqueSameEffectMultipleDots || [false],
                      poisonerTechniqueExtraSpikeReroll5Dots: localSheet?.subclassProgressionDots?.poisonerTechniqueExtraSpikeReroll5Dots || [false],
                      poisonerTechniqueExtraSpikeReroll4Dots: localSheet?.subclassProgressionDots?.poisonerTechniqueExtraSpikeReroll4Dots || [false]
                    })
                  : localSheet?.subclass === 'Coercive'
                  ? generateEnemiesOnAllSidesCardJSX(localSheet)
                  : localSheet?.subclass === 'Divinist'
                  ? generateFateReaderJSX({
                      divinistTechniqueDots: (localSheet?.subclassProgressionDots as any)?.divinistTechniqueDots || [false, false, false],
                      divinistTechniqueCoverDots: (localSheet?.subclassProgressionDots as any)?.divinistTechniqueCoverDots || [false],
                      divinistTechniqueCooldownDots: (localSheet?.subclassProgressionDots as any)?.divinistTechniqueCooldownDots || [false, false]
                    })
                  : localSheet?.subclass === 'Naturalist'
                  ? generateBedOfRejuvenationCardJSX(localSheet)
                  : localSheet?.subclass === 'Technologist'
                  ? generateForceFieldCardJSX(localSheet)
                  : localSheet?.subclass === 'Beguiler'
                  ? generateSeduceDescriptionJSX(localSheet?.subclassProgressionDots)
                  : localSheet?.subclass === 'Galvanic'
                  ? generateBolsteringOratoryDescriptionJSX(
                      (localSheet?.subclassProgressionDots as any)?.galvanicTechniqueHxDots,
                      (localSheet?.subclassProgressionDots as any)?.galvanicTechniqueCritDots,
                      (localSheet?.subclassProgressionDots as any)?.galvanicTechniqueHpDots,
                      (localSheet?.subclassProgressionDots as any)?.galvanicTechniqueCooldownDots
                    )
                  : localSheet?.subclass === 'Tactician'
                  ? (() => {
                      const { range, damageDice } = calculateTacticianTechniqueData(
                        (localSheet?.subclassProgressionDots as any)?.tacticianTechniqueRangeHxDots,
                        (localSheet?.subclassProgressionDots as any)?.tacticianTechniqueDamageDiceDots,
                        (localSheet?.subclassProgressionDots as any)?.tacticianTechniqueCooldownDots
                      );
                      return <>You and allies within <b>[{range}]</b>hx gain +<b>[{damageDice}]</b> Damage dice on their next <span style={{ color: '#351c75' }}><b><i>Strike</i></b></span> or <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> and are also considered to have at least 50% Cover until the beginning of the next round.</>;
                    })()
                  : localSheet?.subclass === 'Tyrant'
                  ? generateTyrannizeDescriptionJSX(
                      (localSheet?.subclassProgressionDots as any)?.tyrantTechniqueHxDots,
                      (localSheet?.subclassProgressionDots as any)?.tyrantTechniqueMoveDots
                    )
                  : localSheet?.subclass === 'Inertial'
                  ? generateGravityWellCardJSX(localSheet)
                  : localSheet?.subclass === 'Kinetic'
                  ? generateGrandSlamCardJSX(localSheet)
                  : localSheet?.subclass === 'Mercurial'
                  ? generateHasteCardJSX(localSheet)
                  : localSheet?.subclass === 'Vectorial'
                  ? generateVectorCloneCardJSX(localSheet)
                  : localSheet?.subclass === 'Astral'
                  ? generateBenefactionCardJSX(localSheet)
                  : localSheet?.subclass === 'Chaos'
                  ? generateSavageryCardJSX(localSheet)
                  : localSheet?.subclass === 'Order'
                  ? generateBulwarkCardJSX(localSheet)
                  : localSheet?.subclass === 'Void'
                  ? generateWeakenCardJSX(localSheet)
                  : localSheet?.subclass === 'Air'
                  ? generateWingsOfAirCardJSX(localSheet)
                  : localSheet?.subclass === 'Earth'
                  ? generateEarthenWallCardJSX(localSheet)
                  : localSheet?.subclass === 'Fire'
                  ? generateFirestormCardJSX(localSheet)
                  : localSheet?.subclass === 'Water'
                  ? generateCleansingWatersCardJSX(localSheet)
                  : localSheet?.subclass === 'Aeronaut'
                  ? generateDiveBombCardJSX(localSheet)
                  : localSheet?.subclass === 'Brawler'
                  ? generateTheOlOneTwoCardJSX(localSheet)
                  : localSheet?.subclass === 'Dreadnaught'
                  ? generateBarrageCardJSX(localSheet)
                  : localSheet?.subclass === 'Spectre'
                  ? generateStealthModeCardJSX(localSheet)
                  : localSheet?.subclass === 'Ammo Coder'
                  ? generateEncodeWeaknessCardJSX(localSheet?.subclassProgressionDots)
                  : localSheet?.subclass === 'Ordnancer'
                  ? generateArtilleryStrikeCardJSX(localSheet)
                  : localSheet?.subclass === 'Pistoleer'
                  ? generateBleedinBulletsCardJSX(localSheet)
                  : localSheet?.subclass === 'Sniper'
                  ? generateLayLowCardJSX(localSheet)
                  : localSheet?.subclass === 'Hacker'
                  ? generatePortalSwapCardJSX(localSheet)
                  : localSheet?.subclass === 'Junker'
                  ? generateDetonateCardJSX(localSheet)
                  : localSheet?.subclass === 'Nanoboticist'
                  ? generateVersatileSwarmCardJSX(localSheet)
                  : localSheet?.subclass === 'Tanker'
                  ? generateBulletMagnetCardJSX(localSheet)
                  : 'Card stats.'}
              </div>
            </div>
            <div style={{
              position: 'absolute',
              top: 330,
              bottom: 5,
              left: 10,
              right: 10,
              color: '#000',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: localSheet?.subclass === 'Grenadier' ? '0.69em' : localSheet?.subclass === 'Anatomist' ? '0.69em' : localSheet?.subclass === 'Necro' ? '0.69em' : localSheet?.subclass === 'Poisoner' ? '0.69em' : localSheet?.subclass === 'Coercive' ? '0.69em' : localSheet?.subclass === 'Divinist' ? '0.69em' : localSheet?.subclass === 'Naturalist' ? '0.69em' : localSheet?.subclass === 'Technologist' ? '0.69em' : localSheet?.subclass === 'Beguiler' ? '0.69em' : localSheet?.subclass === 'Galvanic' ? '0.69em' : localSheet?.subclass === 'Tactician' ? '0.69em' : localSheet?.subclass === 'Tyrant' ? '0.69em' : localSheet?.subclass === 'Inertial' ? '0.69em' : localSheet?.subclass === 'Kinetic' ? '0.69em' : localSheet?.subclass === 'Mercurial' ? '0.69em' : localSheet?.subclass === 'Vectorial' ? '0.69em' : localSheet?.subclass === 'Astral' ? '0.69em' : localSheet?.subclass === 'Chaos' ? '0.69em' : localSheet?.subclass === 'Order' ? '0.69em' : localSheet?.subclass === 'Void' ? '0.69em' : localSheet?.subclass === 'Air' ? '0.69em' : localSheet?.subclass === 'Earth' ? '0.69em' : localSheet?.subclass === 'Fire' ? '0.69em' : localSheet?.subclass === 'Water' ? '0.69em' : localSheet?.subclass === 'Aeronaut' ? '0.69em' : localSheet?.subclass === 'Brawler' ? '0.69em' : localSheet?.subclass === 'Ammo Coder' ? '0.69em' : localSheet?.subclass === 'Ordnancer' ? '0.69em' : localSheet?.subclass === 'Pistoleer' ? '0.69em' : localSheet?.subclass === 'Sniper' ? '0.69em' : localSheet?.subclass === 'Hacker' ? '0.69em' : localSheet?.subclass === 'Junker' ? '0.69em' : localSheet?.subclass === 'Nanoboticist' ? '0.69em' : localSheet?.subclass === 'Tanker' ? '0.69em' : '0.70em',
              fontWeight: 400,
              zIndex: 3,
              textAlign: 'left'
            }}>
              {localSheet?.subclass === 'Grenadier'
                ? '"I thought it would be a good idea to give all my friends some bombing capabilities and boy, oh boy... was I right!" --Thed Explomb, Apocritan Grenadier'
                : localSheet?.subclass === 'Necro'
                ? '"Forgive my thralls, for they know not what they do. Their will belongs solely to me." --Grimmith Everrise, Petran Necro Chemist'
                : localSheet?.subclass === 'Anatomist'
                ? '"Every organism is capable of performing well beyond its natural limit, if you simply inject it with the right components." --Rezz, Radiofrequent Anatomist'
                : localSheet?.subclass === 'Poisoner'
                ? '"Others might wear white coats and work in a lab, while my day-to-day is finding your weak spot and pressing where it hurts." --Tox, Nocturne Poisoner'
                : localSheet?.subclass === 'Coercive'
                ? '"Pure panic shall invade your mind, so much so that you won\'t be able to trust anyone anymore, not even yourself." --Limbus Navitron, Lumenaren Coercive'
                : localSheet?.subclass === 'Divinist'
                ? 'Though luck has its role in determining the future, once you can read fate, luck quickly withers away.'
                : localSheet?.subclass === 'Naturalist'
                ? '"True, the base code of nature is mathematical, but it\'s also much, much more than that." --Yenevieve Softwind, Wandering Naturalist'
                : localSheet?.subclass === 'Technologist'
                ? '"Some use high-tech armor to defend against an attack. I use Oikomagic code to reflect back that attack fourfold." --Zin, Human Technologist'
                : localSheet?.subclass === 'Beguiler'
                ? '"Even the most headstrong succumb to my lure. In fact, the more headstrong, the easier it is to lead them astray." --Vatashya Takaya, Defteran Beguiler'
                : localSheet?.subclass === 'Galvanic'
                ? '"The most important six inches on the battlefield is between your ears." --Jim Mattis'
                : localSheet?.subclass === 'Tactician'
                ? '"You know? sometimes the best tactics come from just embracing strategery altogether. Don\'t overthink it, son.. strategery!" --Jerj Boosh, Human Tactician'
                : localSheet?.subclass === 'Tyrant'
                ? '"Fear is a powerful weapon when wielded with skill." --General Kassidar'
                : localSheet?.subclass === 'Inertial'
                ? 'Pure gravitational Oikomagic courses through your body, forcing nearby enemies ever nearer to you while also forcing their attacks to stray your way.'
                : localSheet?.subclass === 'Kinetic'
                ? '"Such a dramatic blow is not accomplished by hitting as hard as you can, but by drawing from the well of infinite energy within." --Master Kaz, Human Kinetic'
               : localSheet?.subclass === 'Mercurial'
                ? 'It\'s not so much that our bodies move faster, it\'s that the world around us moves slower.'
              : localSheet?.subclass === 'Vectorial'
                ? 'The Vectorial briefly clones herself to throw not only her punches, but her very essence into the battlefield, causing exponential havoc and chaos.'
              : localSheet?.subclass === 'Astral'
                ? '"My holy light heals those who would further all beneficent causes and blinds those who would seek their ruin." --Kalofos, Lord of Light'
              : localSheet?.subclass === 'Chaos'
                ? '"I am the violence and rage that dwells within every creature\'s heart; see how I dance." --Agria, Queen of Wrath'
              : localSheet?.subclass === 'Order'
                ? 'One of the primary tenets of civilizational order is the protection of those in need. Without such defense, order will be lost.'
              : localSheet?.subclass === 'Void'
                ? '"I am the essence of emptiness. All that feel my touch feel nothing but absolute loss." --Kenos, the Positive Nothingness'
              : localSheet?.subclass === 'Air'
                ? '"The essence of the wind lifts and guides you, allows you to fly alongside the clouds and enables you as a swift breeze." --Aeras Longsparrow, Air Elementalist'
              : localSheet?.subclass === 'Earth'
                ? '"Ain\'t there that saying about needing faith to move mountains? Hogwash! Ya just need a little stoney mote friend!" --Droogin, Stout Earth Elementalist'
              : localSheet?.subclass === 'Fire'
                ? '“Some storms are so fierce that they literally melt away any protection you thought you would\'ve had." --Flambeaux, Infrared Fire Elementalist'
              : localSheet?.subclass === 'Water'
                ? '"The life-giving power of water not only revitalizes the body but inoculates the soul from all ailments." --Thalassian, Drifting Chloroptid Water Elementalist'
              : localSheet?.subclass === 'Aeronaut'
                ? '"Like a bird of prey striking its hapless target, the more speed I gain in the dive, the more likely the death that awaits." --Shin Egoliss, Human Aeronaut'
              : localSheet?.subclass === 'Brawler'
                ? '"When your exosuit can amplify a single punch tenfold, you learn real quick that finesse beats brute force every time." --Gritt Steelhammer, Stout Brawler'
              : localSheet?.subclass === 'Dreadnaught'
                ? '“Never underestimate the firepower of a freakin\' dreadnaught, fools!" --Barristair Big\'uns, Defteran Dreadnaught'
              : localSheet?.subclass === 'Spectre'
                ? 'Holographic scales woven into a Spectre\'s armor create a mirror-like illusion that reflects the background into the foreground.'
              : localSheet?.subclass === 'Ammo Coder'
                ? '"I carefully whisper an Oikospell into my carbine right before I pull the trigger -- keeps \'em on their toes." --Brecka Mageshot, Renegade Ammo Coder'
              : localSheet?.subclass === 'Ordnancer'
                ? '"Confucius said, \'Do not use a cannon to kill a mosquito.\' I say, \'Bullshit!\'" --Brock Splosive, Petran Ordnancer'
              : localSheet?.subclass === 'Pistoleer'
                ? '"Bruh, I\'ll just poke ya so full o\' holes that you won\'t have time to plug \'em back up!" --Jerry Two-Fingers, Mustelid Pistoleer'
              : localSheet?.subclass === 'Sniper'
                ? '"I become one with my surroundings, stillness incarnate, certain none will see me now." --Roshimo Furiji, Secessionist Sniper'
              : localSheet?.subclass === 'Hacker'
                ? '"A simple portal swap isn\'t so hard to make, if ya know how to set the temporospatial coordinates just right to pull it off." --Tripp Gurkin, Rebel Hacker'
              : localSheet?.subclass === 'Junker'
                ? '"The only point of ever building something is so you can watch it blow up!" --Scraps McGee, Mustelid Junker'
              : localSheet?.subclass === 'Nanoboticist'
                ? '"Every good Nanoboticist develops an intuitive bond with their swarm, so it can deal pain in myriad ways." --Rhyssiana Whaldin, Defteran Nanoboticist'
              : localSheet?.subclass === 'Tanker'
                ? '"Come at me, bro!" --Vos "The Boss" Orangelo, Stout Tanker, moments before his untimely demise'
              : 'Flavor text.'}
            </div>
        </div>
        
        <div style={{ 
          width: '240px', 
          height: '336px', 
          background: '#fff', 
          border: '5px solid #bf9000', 
          borderRadius: 8, 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
          padding: '1.2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
            <div style={{
              position: 'absolute',
              top: -4,
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              padding: '0 10px',
              boxSizing: 'border-box',
              minHeight: '2.1em'
            }}>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold',
                fontSize: 'clamp(0.8em, 4vw, 1.25em)',
                color: localSheet?.species === 'Avenoch' ? '#2b5f59' : localSheet?.species === 'Cerebronych' ? '#5f5e2b' : localSheet?.species === 'Chloroptid' ? '#315f2b' : localSheet?.species === 'Cognizant' ? '#2b3b5f' : localSheet?.species === 'Emberfolk' ? '#5f2b2b' : 'black',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                {localSheet?.species === 'Avenoch' ? 'Avian Gaze' : localSheet?.species === 'Cerebronych' ? 'Memory Manifest' : localSheet?.species === 'Chloroptid' ? 'Unusual Growth' : localSheet?.species === 'Cognizant' ? 'Local Area Network' : localSheet?.species === 'Emberfolk' ? 'Oppressive Heat' : 'Species Card Name'}
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: localSheet?.species === 'Avenoch' ? '#2b5f59' : localSheet?.species === 'Cerebronych' ? '#5f5e2b' : localSheet?.species === 'Chloroptid' ? '#315f2b' : localSheet?.species === 'Cognizant' ? '#2b3b5f' : localSheet?.species === 'Emberfolk' ? '#5f2b2b' : 'black',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '72px',
                display: 'inline-block',
                textAlign: 'right'
              }}>{localSheet?.species === 'Avenoch' ? 'Avenoch' : localSheet?.species === 'Cerebronych' ? 'Cerebronych' : localSheet?.species === 'Chloroptid' ? 'Chloroptid' : localSheet?.species === 'Cognizant' ? 'Cognizant' : localSheet?.species === 'Emberfolk' ? 'Emberfolk' : 'Species'}</span>
            </div>
            <img 
              src={localSheet?.species === 'Avenoch' ? "/Avian Gaze.png" : localSheet?.species === 'Cerebronych' ? "/Memory Manifest.png" : localSheet?.species === 'Chloroptid' ? "/Unusual Growth.png" : localSheet?.species === 'Cognizant' ? "/Local Area Network.png" : localSheet?.species === 'Emberfolk' ? "/Oppressive Heat.png" : "/Blank Card.png"}
              alt={localSheet?.species === 'Avenoch' ? "Avian Gaze" : localSheet?.species === 'Cerebronych' ? "Memory Manifest" : localSheet?.species === 'Chloroptid' ? "Unusual Growth" : localSheet?.species === 'Cognizant' ? "Local Area Network" : localSheet?.species === 'Emberfolk' ? "Oppressive Heat" : "Blank Card"}
              style={{
                position: 'absolute',
                top: 35,
                left: 10,
                right: 10,
                width: 'calc(100% - 20px)',
                height: 'calc(50% - 55px)',
                objectFit: 'cover',
                zIndex: 1,
                borderRadius: 8
              }}
            />
            <div style={{
              position: 'absolute',
              top: 'calc(50% - 15px)',
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              zIndex: 3
            }}>
              <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>Technique</span>
              {localSheet?.species === 'Avenoch' ? (
                <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                  Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{calculateAvianGazeData(localSheet?.speciesCardDots).cooldown}]</span>
                </span>
              ) : localSheet?.species === 'Cerebronych' ? (
                <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                  Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{calculateMemoryManifestData(localSheet?.speciesCardDots).cooldown}]</span>
                </span>
              ) : localSheet?.species === 'Chloroptid' ? (
                <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                  Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{calculateUnusualGrowthData(localSheet?.speciesCardDots).cooldown}]</span>
                </span>
              ) : localSheet?.species === 'Cognizant' ? (
                <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                  Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{3 - (localSheet?.speciesCardDots?.[4]?.filter(Boolean).length || 0)}]</span>
                </span>
              ) : localSheet?.species === 'Emberfolk' ? (
                <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                  Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - (localSheet?.speciesCardDots?.[5]?.filter(Boolean).length || 0)}]</span>
                </span>
              ) : localSheet?.subclass === 'Air' ? (
                <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                  Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.airTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span>
                </span>
              ) : localSheet?.subclass === 'Earth' ? (
                <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                  Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{4 - ((localSheet?.subclassProgressionDots as any)?.earthTechniqueCooldownDots?.filter(Boolean).length || 0)}]</span>
                </span>
              ) : (
                <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                  Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[#]</span>
                </span>
              )}
            </div>
            
            <div style={{
              position: 'absolute',
              top: 'calc(50% + 10px)',
              left: 10,
              right: 10,
              bottom: 45,
              color: '#000',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 400,
              overflow: 'auto',
              wordWrap: 'break-word',
              display: 'flex',
              alignItems: 'flex-start',
              zIndex: 2,
              lineHeight: 1.2
            }}>
              <div style={{
                fontSize: '0.875em',
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>
                {localSheet?.species === 'Avenoch' ? generateAvianGazeCardJSX(localSheet?.speciesCardDots) : localSheet?.species === 'Cerebronych' ? generateMemoryManifestCardJSX(localSheet?.speciesCardDots) : localSheet?.species === 'Chloroptid' ? generateUnusualGrowthCardJSX(localSheet?.speciesCardDots) : localSheet?.species === 'Cognizant' ? generateLocalAreaNetworkCardJSX(3 - (localSheet?.speciesCardDots?.[4]?.filter(Boolean).length || 0), 3 + (localSheet?.speciesCardDots?.[2]?.filter(Boolean).length || 0), localSheet?.speciesCardDots?.[3]?.[0] ? 1 : 0) : localSheet?.species === 'Emberfolk' ? generateOppressiveHeatCardJSX(4 - (localSheet?.speciesCardDots?.[5]?.filter(Boolean).length || 0), 3 + (localSheet?.speciesCardDots?.[2]?.filter(Boolean).length || 0), 1 + (localSheet?.speciesCardDots?.[3]?.filter(Boolean).length || 0), localSheet?.speciesCardDots?.[4]?.[0] ?? false) : 'Card stats.'}
              </div>
            </div>
            <div style={{
              position: 'absolute',
              top: 330,
              bottom: 5,
              left: 10,
              right: 10,
              color: '#000',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.70em',
              fontWeight: 400,
              zIndex: 3,
              textAlign: 'left'
            }}>
              {localSheet?.species === 'Avenoch' 
                ? 'Avenochs were designed from the get-go for their accuracy and range in combat. Their eyesight is unparalleled in the creations of Dr. Hans Cripioma.' 
                : localSheet?.species === 'Cerebronych'
                  ? '"There\'s much more to mind than meets matter." --Cerebronych saying'
                  : localSheet?.species === 'Chloroptid'
                    ? 'Vines, branches, leaves and other foliage suddenly sprout out from the ground, creating nearby obstacles and landmarks.'
                    : localSheet?.species === 'Cognizant'
                      ? 'Digital networks weaved in proximity calculate optimization for a broad array of techniques, improving the probability of maximal effect.'
                      : localSheet?.species === 'Emberfolk'
                        ? 'The heat emanating from an Emberfolk\'s body can be turned up to 11, searing any sorry sap standing nearby.'
                        : 'Flavor text.'}
            </div>
        </div>
        
        <div style={{ 
          width: '240px', 
          height: '336px', 
          background: '#fff', 
          border: '5px solid #bf9000', 
          borderRadius: 8, 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
          padding: '1.2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden'
        }}>
            <div style={{
              position: 'absolute',
              top: -4,
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              padding: '0 10px',
              boxSizing: 'border-box',
              minHeight: '2.1em'
            }}>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold',
                fontSize: localSheet?.subspecies === 'Nocturne' ? '1.2em' : 'clamp(0.8em, 4vw, 1.25em)',
                color: localSheet?.species === 'Cerebronych'
                  ? '#5f5e2b'
                  : localSheet?.subspecies === 'Corvid' 
                  ? '#75904e'
                  : localSheet?.subspecies === 'Falcador'
                    ? '#6d7156'
                    : localSheet?.subspecies === 'Nocturne'
                      ? '#334592'
                      : localSheet?.subspecies === 'Vulturine'
                        ? '#a96d8c'
                        : localSheet?.subspecies === 'Drifting'
                          ? '#5f8a5f'
                          : localSheet?.subspecies === 'Viny'
                            ? '#5f5f2b'
                            : localSheet?.subspecies === 'Android'
                            ? '#581fbd'
                            : localSheet?.subspecies === 'Utility Droid'
                            ? '#bd891f'
                            : localSheet?.subspecies === 'Petran'
                            ? '#735311' 
                            : 'black',
                lineHeight: 1,
                textAlign: 'left', 
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                {localSheet?.species === 'Cerebronych'
                  ? 'Limit Push'
                  : localSheet?.subspecies === 'Corvid' 
                  ? 'Darkened Displacer' 
                  : localSheet?.subspecies === 'Falcador'
                    ? 'Falcon Dive'
                    : localSheet?.subspecies === 'Nocturne'
                      ? 'Darkness Descending'
                      : localSheet?.subspecies === 'Vulturine'
                        ? 'Flesh Eater'
                        : localSheet?.subspecies === 'Barkskin'
                          ? 'Oakenshield'
                          : localSheet?.subspecies === 'Carnivorous'
                            ? 'Poisonous Barbs'
                            : localSheet?.subspecies === 'Drifting'
                              ? 'Cotton Guard'
                              : localSheet?.subspecies === 'Viny'
                                ? 'Rootbound'
                                : localSheet?.subspecies === 'Android'
                                  ? 'Glimpse the Matrix'
                                  : localSheet?.subspecies === 'Utility Droid'
                                    ? 'Tech Interference'
                                    : localSheet?.subspecies === 'Petran'
                                      ? 'Stony Restoration'
                                      : 'Subspecies Card Name'}
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: localSheet?.species === 'Cerebronych'
                  ? '#5f5e2b'
                  : localSheet?.subspecies === 'Corvid' 
                  ? '#75904e'
                  : localSheet?.subspecies === 'Falcador'
                    ? '#6d7156'
                    : localSheet?.subspecies === 'Nocturne'
                      ? '#334592'
                      : localSheet?.subspecies === 'Vulturine'
                        ? '#a96d8c'
                        : localSheet?.subspecies === 'Barkskin'
                          ? '#5f2d2b'
                          : localSheet?.subspecies === 'Carnivorous'
                            ? '#2b2d5f'
                            : localSheet?.subspecies === 'Drifting'
                              ? '#5f8a5f'
                              : localSheet?.subspecies === 'Android'
                                ? '#581fbd'
                                : localSheet?.subspecies === 'Utility Droid'
                                  ? '#bd891f'
                                  : localSheet?.subspecies === 'Petran'
                                    ? '#735311'
                                    : 'black',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '72px',
                display: 'inline-block',
                textAlign: 'right'
              }}>{localSheet?.species === 'Cerebronych'
                  ? 'Cerebronych'
                  : localSheet?.subspecies === 'Corvid' 
                  ? 'Corvid' 
                  : localSheet?.subspecies === 'Falcador'
                    ? 'Falcador'
                    : localSheet?.subspecies === 'Nocturne'
                      ? 'Nocturne'
                      : localSheet?.subspecies === 'Vulturine'
                        ? 'Vulturine'
                        : localSheet?.subspecies === 'Barkskin'
                          ? 'Barkskin'
                          : localSheet?.subspecies === 'Carnivorous'
                            ? 'Carnivorous'
                            : localSheet?.subspecies === 'Drifting'
                              ? 'Drifting'
                              : localSheet?.subspecies === 'Viny'
                                ? 'Viny'
                                : localSheet?.subspecies === 'Android'
                                  ? 'Android'
                                  : localSheet?.subspecies === 'Utility Droid'
                                    ? (<>Utility<br/>Droid</>)
                                    : localSheet?.subspecies === 'Petran'
                                      ? 'Petran'
                                      : 'Subspecies'}</span>
            </div>
            <img 
              src={localSheet?.species === 'Cerebronych'
                ? "/Limit Push.png"
                : localSheet?.subspecies === 'Corvid' 
                ? "/Darkened Displacer.png" 
                : localSheet?.subspecies === 'Falcador'
                  ? "/Falcon Dive.png"
                  : localSheet?.subspecies === 'Nocturne'
                    ? "/Darkness Descending.png"
                    : localSheet?.subspecies === 'Vulturine'
                      ? "/Flesh Eater.png"
                      : localSheet?.subspecies === 'Barkskin'
                        ? "/Oakenshield.png"
                        : localSheet?.subspecies === 'Carnivorous'
                          ? "/Poisonous Barbs.png"
                          : localSheet?.subspecies === 'Drifting'
                            ? "/Cotton Guard.png"
                            : localSheet?.subspecies === 'Viny'
                              ? "/Rootbound.png"
                              : localSheet?.subspecies === 'Android'
                                ? "/Glimpse the Matrix.png"
                                : localSheet?.subspecies === 'Utility Droid'
                                  ? "/Tech Interference.png"
                                  : localSheet?.subspecies === 'Petran'
                                    ? "/Stony Restoration.png"
                                    : "/Blank Card.png"}
              alt={localSheet?.species === 'Cerebronych'
                ? "Limit Push"
                : localSheet?.subspecies === 'Corvid' 
                ? "Darkened Displacer" 
                : localSheet?.subspecies === 'Falcador'
                  ? "Falcon Dive"
                  : localSheet?.subspecies === 'Nocturne'
                    ? "Darkness Descending"
                    : localSheet?.subspecies === 'Vulturine'
                      ? "Flesh Eater"
                      : localSheet?.subspecies === 'Barkskin'
                        ? "Oakenshield"
                        : localSheet?.subspecies === 'Carnivorous'
                          ? "Poisonous Barbs"
                          : localSheet?.subspecies === 'Drifting'
                            ? "Cotton Guard"
                            : localSheet?.subspecies === 'Viny'
                              ? "Rootbound"
                              : localSheet?.subspecies === 'Android'
                                ? "Glimpse the Matrix"
                                : localSheet?.subspecies === 'Utility Droid'
                                  ? "Tech Interference"
                                  : localSheet?.subspecies === 'Petran'
                                    ? "Stony Restoration"
                                    : "Blank Card"}
              style={{
                position: 'absolute',
                top: 35,
                left: 10,
                right: 10,
                width: 'calc(100% - 20px)',
                height: 'calc(50% - 55px)',
                objectFit: 'cover',
                zIndex: 1,
                borderRadius: 8
              }}
            />
            <div style={{
              position: 'absolute',
              top: 'calc(50% - 15px)',
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              zIndex: 3
            }}>
              <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>Technique</span>
              <span style={{ color: '#bf9000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>
                  {localSheet?.species === 'Cerebronych'
                    ? `[${calculateLimitPushData(localSheet?.speciesCardDots).cooldown}]`
                    : localSheet?.subspecies === 'Corvid' 
                    ? `[${4 - (localSheet?.subspeciesCardDots?.[3]?.filter(Boolean).length ?? 0)}]`
                    : localSheet?.subspecies === 'Falcador'
                      ? `[${3 - (localSheet?.subspeciesCardDots?.[3]?.filter(Boolean).length ?? 0)}]`
                      : localSheet?.subspecies === 'Nocturne'
                        ? `[${4 - (localSheet?.subspeciesCardDots?.[3]?.filter(Boolean).length ?? 0)}]`
                        : localSheet?.subspecies === 'Vulturine'
                          ? `[${4 - (localSheet?.subspeciesCardDots?.[2]?.filter(Boolean).length ?? 0)}]`
                          : localSheet?.subspecies === 'Barkskin'
                            ? `[${calculateOakenshieldData(localSheet?.subspeciesCardDots).cooldown}]`
                            : localSheet?.subspecies === 'Carnivorous'
                              ? `[${calculatePoisonousBarbsData(localSheet?.subspeciesCardDots ?? []).cooldown}]`
                              : localSheet?.subspecies === 'Drifting'
                                ? `[${4 - (localSheet?.subspeciesCardDots?.[3]?.filter(Boolean).length ?? 0)}]`
                                : localSheet?.subspecies === 'Viny'
                                  ? `[${4 - (localSheet?.subspeciesCardDots?.[7]?.filter(Boolean).length ?? 0)}]`
                                  : localSheet?.subspecies === 'Android'
                                    ? `[${3 - (localSheet?.subspeciesCardDots?.[4]?.filter(Boolean).length ?? 0)}]`
                                    : localSheet?.subspecies === 'Utility Droid'
                                      ? `[${4 - (localSheet?.subspeciesCardDots?.[5]?.filter(Boolean).length ?? 0)}]`
                                      : localSheet?.subspecies === 'Petran'
                                        ? '[2]'
                                        : '[#]'}
                </span>
              </span>
            </div>
            
            <div style={{
              position: 'absolute',
              top: 'calc(50% + 10px)',
              left: 10,
              right: 10,
              bottom: 45,
              color: '#000',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 400,
              overflow: 'auto',
              wordWrap: 'break-word',
              display: 'flex',
              alignItems: 'flex-start',
              zIndex: 2,
              lineHeight: 1.2
            }}>
              <div style={{
                fontSize: '0.875em',
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>
                {localSheet?.species === 'Cerebronych'
                  ? generateLimitPushCardJSX(localSheet?.speciesCardDots)
                  : localSheet?.subspecies === 'Corvid' 
                  ? generateDarkenedDisplacerCardJSX({ 
                      range: 6 + (localSheet?.subspeciesCardDots?.[1]?.filter(Boolean).length ?? 0) * 2,
                      inflictDemoralize: localSheet?.subspeciesCardDots?.[2]?.[0] ?? false
                    })
                  : localSheet?.subspecies === 'Falcador'
                    ? generateFalconDiveCardJSX({
                        speedMultiplier: localSheet?.subspeciesCardDots?.[2]?.[0] ? 3 : 2,
                        cooldown: 3 - (localSheet?.subspeciesCardDots?.[3]?.filter(Boolean).length ?? 0)
                      })
                    : localSheet?.subspecies === 'Nocturne'
                      ? generateDarknessDescendingCardJSX({
                          rangeBonus: (localSheet?.subspeciesCardDots?.[2]?.filter(Boolean).length ?? 0) * 2,
                          cooldown: 4 - (localSheet?.subspeciesCardDots?.[3]?.filter(Boolean).length ?? 0)
                        })
                      : localSheet?.subspecies === 'Vulturine'
                        ? generateFleshEaterCardJSX({
                            rangeBonus: localSheet?.subspeciesCardDots?.[1]?.filter(Boolean).length ?? 0,
                            cooldown: 4 - (localSheet?.subspeciesCardDots?.[2]?.filter(Boolean).length ?? 0)
                          })
                        : localSheet?.subspecies === 'Barkskin'
                          ? generateOakenshieldCardJSX(calculateOakenshieldData(localSheet?.subspeciesCardDots))
                          : localSheet?.subspecies === 'Carnivorous'
                            ? generatePoisonousBarbsCardJSX(calculatePoisonousBarbsData(localSheet?.subspeciesCardDots ?? []).piercingDamage, calculatePoisonousBarbsData(localSheet?.subspeciesCardDots ?? []).includesAttacks)
                            : localSheet?.subspecies === 'Drifting'
                              ? generateCottonGuardCardJSX(
                                  3 + (localSheet?.subspeciesCardDots?.[1]?.filter(Boolean).length ?? 0),
                                  localSheet?.subspeciesCardDots?.[2]?.[0] ?? false
                                )
                              : localSheet?.subspecies === 'Viny'
                                ? generateRootboundCardJSX(
                                    3 + (localSheet?.subspeciesCardDots?.[2]?.filter(Boolean).length ?? 0),
                                    localSheet?.subspeciesCardDots?.[3]?.filter(Boolean).length ?? 0,
                                    localSheet?.subspeciesCardDots?.[6]?.[0] ?? false
                                  )
                                : localSheet?.subspecies === 'Android'
                                  ? generateGlimpseTheMatrixCardJSX(
                                      3 - (localSheet?.subspeciesCardDots?.[4]?.filter(Boolean).length ?? 0),
                                      localSheet?.subspeciesCardDots?.[3]?.filter(Boolean).length ?? 0
                                    )
                                  : localSheet?.subspecies === 'Utility Droid'
                                    ? generateTechInterferenceCardJSX(
                                        4 - (localSheet?.subspeciesCardDots?.[5]?.filter(Boolean).length ?? 0),
                                        (localSheet?.subspeciesCardDots?.[3]?.filter(Boolean).length ?? 0) * 2,
                                        localSheet?.subspeciesCardDots?.[4]?.filter(Boolean).length ?? 0
                                      )
                                    : localSheet?.subspecies === 'Petran'
                                      ? generateStonyRestorationCardJSX(
                                          2,
                                          1 + (localSheet?.subspeciesCardDots?.[4]?.filter(Boolean).length ?? 0),
                                          (localSheet?.subspeciesCardDots?.[6]?.filter(Boolean).length ?? 0) * 2
                                        )
                                      : 'Card stats.'}
              </div>
            </div>
            <div style={{
              position: 'absolute',
              top: 330,
              bottom: 5,
              left: 10,
              right: 10,
              color: '#000',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.70em',
              fontWeight: 400,
              zIndex: 3,
              textAlign: 'left'
            }}>
              {localSheet?.species === 'Cerebronych'
                ? 'Each Cerebronych contains within it the ability to imbue nearby allies with the unearthly will to fight beyond their limits.'
                : localSheet?.subspecies === 'Corvid' 
                ? '"You can hear their caws echo elsewhere, and in a flurry of black feathers, they\'re gone. And suddenly some other bloke is at your throat!" --Anonymous'
                : localSheet?.subspecies === 'Falcador'
                  ? 'A bullet through the air, the Falcador has the capability of flying faster than any other creature on the battlefield.'
                  : localSheet?.subspecies === 'Nocturne'
                    ? '"I am a creature of the night, one that can induce the supernatural night itself into the eyes of my prey." --Wisp, Nocturne Contemplative'
                    : localSheet?.subspecies === 'Vulturine'
                      ? '"Death is an acquired taste… but once you\'ve acquired it, nothing can beat it." --Trogon Ornio, Vulturine Mercenary'
                      : localSheet?.subspecies === 'Barkskin'
                        ? '"The spirit of Mother Nature emanates from my very being. You shall be protected as I am protected." --Doug Fir, Barkskin Chloroptid'
                        : localSheet?.subspecies === 'Carnivorous'
                          ? 'Barbs protrude from your plant-epidermis that are capable of sapping the energy out of anyone who touches you.'
                          : localSheet?.subspecies === 'Drifting'
                            ? 'A burst of cotton-like fluff emanates from your body, concealing you and your allies within the storm of fuzz.'
                            : localSheet?.subspecies === 'Viny'
                              ? 'Your roots surge through the earth beneath you and spring up in vines that wrap around the ankles of your enemies, holding them still.'
                              : localSheet?.subspecies === 'Android'
                                ? 'You just overlay your physical interface onto any digital substrate and exponentially enhance its potential. Easy-peasy.'
                                : localSheet?.subspecies === 'Utility Droid'
                                  ? 'Otherwise known as an electromagnetic pulse, each Utility Droid is outfitted with the ability to render equipment useless.'
                                  : localSheet?.subspecies === 'Petran'
                                    ? '"The will of stone is indomitable and unshakable. Breaking me will be very difficult." --Onyxia Stonegrit, Petran Independent'
                                    : 'Flavor text.'}
            </div>
        </div>
        
        {/* Attack Cards */}
        {/* Chemist Attack Cards */}
        {charClass === 'Chemist' && <CardsChemistAttacks sheet={localSheet} />}
        
        {/* Coder Attack Cards */}
        {charClass === 'Coder' && <CardsCoderAttacks sheet={localSheet} subclass={subclass} charClass={charClass} />}

        {/* Commander Attack Cards */}
        {charClass === 'Commander' && <CardsCommanderAttacks sheet={localSheet} subclass={subclass} />}

        {/* Contemplative Attack Cards */}
        {charClass === 'Contemplative' && <CardsContemplativeAttacks sheet={localSheet} subclass={subclass} />}

        {/* Devout Attack Cards */}
        {charClass === 'Devout' && <CardsDevoutAttacks sheet={localSheet} subclass={subclass} />}

        {/* Elementalist Attack Cards */}
        {charClass === 'Elementalist' && (
          <>
            <CardsElementalistAttacks sheet={localSheet} subclass={subclass} />
            <CardsElementalistSecondaryAttacks sheet={localSheet} />
          </>
        )}

        {/* Exospecialist Attack Cards */}
        {charClass === 'Exospecialist' && <CardsExospecialistAttacks sheet={localSheet} subclass={subclass} />}

        {/* Gunslinger Attack Cards */}
        {charClass === 'Gunslinger' && <CardsGunslingerAttacks sheet={localSheet} subclass={subclass} />}
        
        {/* Gunslinger Double-Tap Secondary Attack Card */}
        {charClass === 'Gunslinger' && (
          <div style={{ 
            width: '240px', 
            height: '336px', 
            background: '#fff', 
            border: '5px solid #990000', 
            borderRadius: 8, 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
            padding: '1.2rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: -4,
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              padding: '0 10px',
              boxSizing: 'border-box',
              minHeight: '2.1em'
            }}>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'bold',
                fontSize: 'clamp(0.8em, 4vw, 1.25em)',
                color: '#4e7211',
                lineHeight: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                maxWidth: 'calc(100% - 87px)',
                minWidth: 0,
                flexShrink: 1,
                marginRight: '5px'
              }}>
                Double-Tap
              </span>
              <span style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontStyle: 'italic',
                fontSize: '0.75em',
                color: '#4e7211',
                lineHeight: 1,
                whiteSpace: 'normal',
                wordBreak: 'keep-all',
                overflowWrap: 'anywhere',
                maxWidth: '78px',
                display: 'inline-block',
                textAlign: 'right',
                marginRight: '0px'
              }}>Gunslinger</span>
            </div>
            <img 
              src="/Double-Tap.png"
              alt="Double-Tap"
              style={{
                position: 'absolute',
                top: 35,
                left: 10,
                right: 10,
                width: 'calc(100% - 20px)',
                height: 'calc(50% - 55px)',
                objectFit: 'cover',
                zIndex: 1,
                borderRadius: 8
              }}
            />
            <div style={{
              position: 'absolute',
              top: 'calc(50% - 15px)',
              left: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              zIndex: 3
            }}>
              <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '1.1em', textAlign: 'left' }}>Secondary Attack</span>
              <span style={{ color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '0.875em', fontStyle: 'italic', marginRight: 22, whiteSpace: 'nowrap', maxWidth: 'calc(100% - 120px)', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>
                Cooldown <span style={{ fontWeight: 'bold', fontStyle: 'normal' }}>[{(() => {
                  // Calculate cooldown (4 - number of -1 Cooldown dots from classCardDots[6])
                  let cooldownDots = 0;
                  if (localSheet && Array.isArray(localSheet.classCardDots) && Array.isArray(localSheet.classCardDots[6])) {
                    cooldownDots = localSheet.classCardDots[6].filter(Boolean).length;
                  }
                  return 4 - cooldownDots;
                })()}]</span>
              </span>
            </div>
            
            <div style={{
              position: 'absolute',
              top: 'calc(50% + 10px)',
              left: 10,
              right: 10,
              bottom: 45,
              color: '#000',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 400,
              overflow: 'auto',
              wordWrap: 'break-word',
              display: 'flex',
              alignItems: 'flex-start',
              zIndex: 2,
              lineHeight: 1.2
            }}>
              <div style={{
                fontSize: '0.875em',
                width: '100%',
                height: 'fit-content',
                maxHeight: '100%',
                overflow: 'hidden'
              }}>
                {generateDoubleTapCardJSX(localSheet?.classCardDots)}
              </div>
            </div>
            <div style={{
              position: 'absolute',
              top: 330,
              bottom: 5,
              left: 10,
              right: 10,
              color: '#000',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontStyle: 'italic',
              fontSize: '0.70em',
              fontWeight: 400,
              zIndex: 3,
              textAlign: 'left'
            }}>
              If at first you don't blast 'em to smithereens... try, try again.
            </div>
          </div>
        )}

        {/* Technician Hacker Stealth Drone Primary Attack Cards */}
        {charClass === 'Technician' && localSheet?.subclass === 'Hacker' && <CardsTechnicianPrimaryAttacks sheet={localSheet} />}

        {/* Technician Junker Drone Primary Attack Cards */}
        {charClass === 'Technician' && localSheet?.subclass === 'Junker' && <CardsTechnicianPrimaryAttacks sheet={localSheet} />}

        {/* Technician Nanoboticist Nanodrone Swarm Primary Attack Cards */}
        {charClass === 'Technician' && localSheet?.subclass === 'Nanoboticist' && <CardsTechnicianPrimaryAttacks sheet={localSheet} />}

        {/* Technician Tanker Siege Drone Primary Attack Cards */}
        {charClass === 'Technician' && localSheet?.subclass === 'Tanker' && <CardsTechnicianPrimaryAttacks sheet={localSheet} />}

        {/* Technician Tech Pulse Secondary Attack Cards */}
        {charClass === 'Technician' && <CardsTechnicianSecondaryAttacks sheet={localSheet} />}

      </div>
      
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
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
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
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
              e.currentTarget.style.backgroundColor = '#1976d2';
              e.currentTarget.style.background = '#1976d2';
            }
          }}
          onMouseLeave={(e) => {
            if (!isNavExpanded) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
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
                  -
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
                <span style={{ minWidth: '40px', textAlign: 'center' }}>{localSheet?.xpSpent ?? 0}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>Remaining xp:</span>
                <span style={{ minWidth: '40px', textAlign: 'center', color: xpTotal - (localSheet?.xpSpent ?? 0) < 0 ? '#d32f2f' : '#000' }}>{xpTotal - (localSheet?.xpSpent ?? 0)}</span>
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
                  -
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
                <span style={{ minWidth: '40px', textAlign: 'center' }}>{localSheet?.spSpent ?? 0}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>Remaining sp:</span>
                <span style={{ minWidth: '40px', textAlign: 'center', color: spTotal - (localSheet?.spSpent ?? 0) < 0 ? '#d32f2f' : '#000' }}>{spTotal - (localSheet?.spSpent ?? 0)}</span>
              </div>
            </div>
          </div>
        )}

        <button
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
          xp: {xpTotal - (localSheet?.xpSpent ?? 0)}/{xpTotal} | sp: {spTotal - (localSheet?.spSpent ?? 0)}/{spTotal}
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
                  -
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
                  style={{ width: '24px', height: '24px', fontSize: '12px', padding: '0' }}
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
                  style={{ width: '24px', height: '24px', fontSize: '12px', padding: '0' }}
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
                    -
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={chemTokens}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      const { chemTokenMax } = calculateChemistFeatureData(localSheet?.classCardDots);
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
                      const { chemTokenMax } = calculateChemistFeatureData(localSheet?.classCardDots);
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
      {(localSheet?.charClass === 'Elementalist' || localSheet?.charClass === 'Technician') && (
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
              border: `2px solid ${localSheet?.charClass === 'Elementalist' ? '#231172' : '#724811'}`,
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
            data-class={localSheet?.charClass}
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

  {/* Character Card Management System section removed as requested */}
      </div>
    </>
  );
};

export default Cards;
