import React, { useState } from "react";
import styles from './CharacterSheet.module.css';

import type { CharacterSheet } from "../types/CharacterSheet";
import { saveCharacterSheet, loadSheetById } from "../utils/storage";
import { generateChemicalReactionJSX, calculateChemistFeatureData } from "../utils/chemistFeature";
import { generateChemistStrikeJSX } from "../utils/chemistStrike";
import { generateAnatomicalPrecisionJSX } from "../utils/anatomistFeature";
import { generateBlasterMasterJSX } from "../utils/grenadierFeature";
import { generateBodySnatcherJSX } from "../utils/necroFeature";


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


const CharacterSheet: React.FC<Props> = ({ sheet, onLevelUp, onCards, onHome, onAutoSave, charClass, setCharClass, subclass, setSubclass, species, setSpecies, subspecies, setSubspecies, isNewCharacter = false }) => {
  
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
  const [backgroundDescription, setBackgroundDescription] = useState(sheet?.backgroundDescription || "");

  // Sync local state when sheet prop changes
  React.useEffect(() => {
    if (sheet) {
      setPlayerName(sheet.playerName || "");
      setName(sheet.name || "");
      setBackground(sheet.background || "");
      setBackgroundDescription(sheet.backgroundDescription || "");
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
      setSubclassFeature(sheet.subclassFeature || "");
      setSpeciesFeature(sheet.speciesFeature || "");
      setSubspeciesFeature(sheet.subspeciesFeature || "");
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
  const commanderHx = charClass === "Commander" ? (sheet?.classCardDots?.[0]?.filter(Boolean).length ?? 0) : 0;
  
  let commanderIncludesAttacks = 0;
  if (charClass === "Commander" && sheet?.classCardDots?.[1]) {
    commanderIncludesAttacks = sheet.classCardDots[1].filter(Boolean).length;
  }
  const commanderIncludesAttacksDot = charClass === "Commander" && sheet?.classCardDots?.[1]?.[0];
  const commanderFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#717211' }}>Stay Sharp.</i></b> At the beginning of the round, you and allies within <b>[{3 + commanderHx}]</b>hx of you can remove an additional <i>Cooldown Token</i> from one <i>inactive</i> <b><i><span style={{ color: '#bf9000' }}>Technique</span></i></b> or <b>[{commanderIncludesAttacksDot ? <i style={{ fontWeight: 'bold', color: '#990000' }}>Attacks</i> : " - "}]</b> of their choice.
    </span>
  );
  const contemplativeFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#116372' }}>Psychosomatic Harmony.</i></b> You are <b>[resistant]</b> to <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
        Neural
        <img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b> and can <b><i style={{ color: '#351c75' }}>Strike</i></b> <b>[{sheet?.classCardDots?.[1]?.[0] ? 2 : 1}]</b> extra time per turn.
    </span>
  );
  const devoutFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#6b1172' }}>Blood Trade.</i></b> Whenever you take Damage, you gain +<b>[{1 + (charClass === 'Devout' && sheet?.classCardDots?.[0] ? sheet.classCardDots[0].filter(Boolean).length : 0)}]</b>d6 Damage on your next <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b> or <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>. The Damage type matches your next <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b>  or <b><i><span style={{ color:'#990000' }}>Attack</span></i></b> and doesn’t stack if you are Damaged multiple times.   
    </span>
  );  
  const elementalistFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#231172' }}>Elemental Excitement.</i></b> When another creature within <b>[{3 + (charClass === 'Elementalist' && sheet?.classCardDots?.[0] ? sheet.classCardDots[0].filter(Boolean).length : 0)}]</b>hx of you takes {
        subclass === "Air" ? (
          <><b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> Damage</>
        ) : subclass === "Earth" ? (
          <><b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> Damage</>
        ) : subclass === "Fire" ? (
          <><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> Damage</>
        ) : subclass === "Water" ? (
          <><b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>Cold<img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> Damage</>
        ) : (
          "Damage associated with your subclass"
        )
      }, you may remove a <i>Cooldown Token</i> from any of your <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> or <b><i><span style={{ color: '#bf9000' }}>Techniques</span></i></b> and deal +<b>[{0 + (charClass === 'Elementalist' && sheet?.classCardDots?.[0] ? sheet.classCardDots[1].filter(Boolean).length : 0)}]</b>d6 {
        subclass === "Air" ? (
          <><b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> Damage</>
        ) : subclass === "Earth" ? (
          <><b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> Damage</>
        ) : subclass === "Fire" ? (
          <><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> Damage</>
        ) : subclass === "Water" ? (
          <><b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>Cold<img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> Damage</>
        ) : (
          "Damage associated with your subclass"
        )
      } on your next <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> or <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b>.
    </span>
  );  
  const exospecialistFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#117233' }}>Exosuit.</i></b> You <i>Resist</i> <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
        Bludgeoning
        <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b>, <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
        Piercing
        <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b> and <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
        Slashing
        <img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b> Damage and have an additional 20 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
    </span>
  );


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
  const [subclassFeature, setSubclassFeature] = useState(sheet?.subclassFeature || "");
  const [speciesFeature, setSpeciesFeature] = useState(sheet?.speciesFeature || "");
  const [subspeciesFeature, setSubspeciesFeature] = useState(sheet?.subspeciesFeature || "");
  // Removed unused XP/SP fields

  // Combat fields
  const [speed, setSpeed] = useState(sheet?.speed || "");
  const [strikeDamage, setStrikeDamage] = useState(sheet?.strikeDamage || "");
  const [maxHitPoints, setMaxHitPoints] = useState(sheet?.maxHitPoints || 0);
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
  }, [sheet?.id, charClass, subclass, species, subspecies]);

  // Auto-save when critical fields change (debounced for performance)
  React.useEffect(() => {
    if (!sheet || !sheet.id) return;
    
    const hasChanges = (
      sheet.playerName !== playerName ||
      sheet.name !== name ||
      sheet.background !== background ||
      sheet.classFeature !== classFeature ||
      sheet.resistances !== resistances ||
      sheet.immunities !== immunities ||
      sheet.absorptions !== absorptions ||
      sheet.movement !== movement ||
      sheet.strike !== strike ||
      sheet.xpTotal !== xpTotal ||
      sheet.spTotal !== spTotal ||
      sheet.portrait !== portraitUrl
    );

    if (hasChanges) {
      // Debounce saves to prevent excessive storage writes
      const timeoutId = setTimeout(() => {
        const updatedSheet: CharacterSheet = {
          ...sheet,
          playerName,
          name,
          background,
          classFeature,
          resistances,
          immunities,
          absorptions,
          movement,
          strike,
          xpTotal,
          spTotal,
          portrait: portraitUrl || undefined,
          xpRemaining: xpTotal - (sheet.xpSpent ?? 0),
          spRemaining: spTotal - spSpent,
          spSpent,
        };
        saveCharacterSheet(updatedSheet);
      }, 300); // 300ms debounce for text fields

      return () => clearTimeout(timeoutId);
    }
  }, [playerName, name, background, classFeature, resistances, immunities, absorptions, movement, strike, xpTotal, spTotal, portraitUrl, sheet, spSpent]);

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
  const poisonerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#cf7600' }}>Backstabber.</i></b> You <i>Resist</i> <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
        Chemical
        <img src="/Chemical.png" alt="Chemical" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b> and <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
        Toxic
        <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b>. Additionally, when you <b><i style={{ color: '#351c75' }}>Strike</i></b> against a target's <i>Rear Arc</i>, you gain +1d6 Damage for each <i>Chem Token</i> you have.
    </span>
  );

  // Add after poisonerFeatureJSX
  const coerciveFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#43c9ff' }}>Field of Coercion.</i></b> You and allies within <b>[5]</b>hx are <i>Immune</i> to <b><i>Confuse</i></b> and <b><i>Mesmerize</i></b>. Additionally, enemies within <b>[5]</b>hx cannot benefit from <b><i>Confuse</i></b> or <b><i>Mesmerize</i></b> <i>Immunity</i>.
    </span>
  );

  // Add after coerciveFeatureJSX
  const divinistFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#ff4343' }}>Aura of Luck.</i></b> You and allies within <b>[3]</b>hx of you can roll an additional +<b>[1]</b> Crit die and drop the lowest roll when making <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b>.
    </span>
  );

  // Add after divinistFeatureJSX
  const naturalistFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#66cf00' }}>Boughbender.</i></b> You and allies within <b>[5]</b>hx may ignore <i>Obstacles</i> and <i>Rough Terrain</i> when <b><i style={{ color: '#38761d' }}>Moving</i></b>. Additionally, enemies treat <i>Terrain</i> within <b>[5]</b>hx of you as <i>Rough Terrain</i>.
    </span>
  );

  // Add after naturalistFeatureJSX
  const technologistFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#8c43ff' }}>Tech Manipulation.</i></b> Enemies within <b>[5]</b>hx of you cannot Crit on <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b>. In addition, when you or an ally within <b>[5]</b>hx of you removes a <i>Cooldown Token</i> from an <i>Item</i>, they can remove one additional <i>Cooldown Token</i>.
    </span>
  );

  // Add after technologistFeatureJSX
  const beguilerFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#1f21ce' }}>Loyal Servants.</i></b> You control allies within <b>[3]</b>hx of you when they suffer the <b><i>Confuse</i></b> or <b><i>Mesmerize</i></b> condition. Additionally, whenever you're targeted by an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>, an ally of your choice within <b>[3]</b>hx of you is targeted instead and suffers the <b><i>Confuse</i></b> condition.
    </span>
  );

  // Add after beguilerFeatureJSX
  const galvanicFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#6fce1f' }}>Inspiring Presence.</i></b> Allies within <b>[3]</b>hx of you at the beginning of the round gain +<b>[1]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
    </span>
  );

  // Add after galvanicFeatureJSX
  const tacticianFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#cec31f' }}>Tactical Offensive.</i></b> At the beginning of the round, you and allies within <b>[3]</b>hx of you ignore <i>Rough Terrain</i>, gain +<b>[1]</b> to Crit rolls and +<b>[1]</b> <b><i style={{ color: '#38761d' }}>Speed</i></b> until the end of their turn.
    </span>
  );

  // Add after tacticianFeatureJSX
  const tyrantFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#ce1f1f' }}>Fearless.</i></b> You are <i>Immune</i> to the <b><i>Demoralize</i></b> condition, and so are any allies while they are within <b>[3]</b>hx of you.
    </span>
  );

  // Add after tyrantFeatureJSX
  const inertialFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#1c945e' }}>Telekinetic Shield.</i></b> You <i>Resist</i> all Damage while you are not suffering the <b><i>Sleep</i></b> condition.
    </span>
  );

  // Add after inertialFeatureJSX
  const kineticFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#7b941c' }}>Final Fists.</i></b> Whenever you reach 0 <b><i style={{ color: '#990000' }}>Hit Points</i></b> in a battle, you can immediately <b><i style={{ color: '#38761d' }}>Move</i></b> up to your <b><i style={{ color: '#38761d' }}>Speed</i></b> and <b><i style={{ color: '#351c75' }}>Strike</i></b> up to your <b><i style={{ color: '#351c75' }}>Strike</i></b> amount before falling unconscious.
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
      <b><i style={{ color: '#531c94' }}>Unreasonable Accuracy.</i></b> You treat 100% Cover as 50% Cover when making <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b>. Additionally, all your <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> have a +<b>[6]</b>hx Range.
    </span>
  );

  // Add after vectorialFeatureJSX
  const astralFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5bb1af' }}>Martyr.</i></b> Whenever you take Damage, <b>[1]</b> ally within <b>[5]</b>hx gains <b>[2]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
    </span>
  );

  // Add after astralFeatureJSX
  const chaosFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#b15b6c' }}>Aggression.</i></b> Whenever you take Damage, you can immediately <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[2]</b>hx.
    </span>
  );

  // Add after chaosFeatureJSX
  const orderFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#aeb15b' }}>Armored Guard.</i></b> Whenever an ally within <b>[3]</b>hx of you takes Damage, you can immediately <b><i style={{ color: '#38761d' }}>Move</i></b> to a hx adjacent to the ally and take the Damage instead.
    </span>
  );

  // Add after orderFeatureJSX
  const voidFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5b73b1' }}>Fatigue.</i></b> Whenever you take Damage, you inflict the <b><i>Demoralize</i></b> condition to one creature within <b>[8]</b>hx.
    </span>
  );

  // Add after voidFeatureJSX
  const airFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#0ee2df' }}>Air Armor.</i></b> You <i>Resist</i> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
        Force
        <img src="/Force.png" alt="Force" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b> Damage
    </span>
  );

  // Add after airFeatureJSX
  const earthFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#e2b90e' }}>Earth Armor.</i></b> You <i>Resist</i> <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
        Bludgeoning
        <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b> Damage
    </span>
  );

  // Add after earthFeatureJSX
  const fireFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#e20e0e' }}>Fire Armor.</i></b> You <i>Resist</i> <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
        Fire
        <img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b> Damage
    </span>
  );

  const waterFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#0e42e2' }}>Water Armor.</i></b> You <i>Resist</i> <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
        Cold
        <img src="/Cold.png" alt="Cold" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b> Damage
    </span>
  );

  const aeronautFeatureJSX = (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#3da1d8' }}>Steel Wings.</i></b> You have a <b><i style={{ color: '#38761d' }}>Flight Speed</i></b> and an additional +<b>[2]</b> <b><i style={{ color: '#38761d' }}>Speed</i></b>.
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
    
    return attacks;
  };

  const getAvailableSecondaryAttacks = () => {
    const attacks: { name: string; type: string; cost: number }[] = [];
    
    // Add Super Serums for Anatomist subclass
    if (subclass === 'Anatomist') {
      attacks.push(
        { name: 'Jacob\'s Ladder', type: 'Super Serum', cost: 215 },
        { name: 'Vampirismagoria', type: 'Super Serum', cost: 185 }
      );
    }
    
    return attacks;
  };

  // Keep the original function for backward compatibility
  const getAvailableAttacks = () => {
    return [...getAvailablePrimaryAttacks(), ...getAvailableSecondaryAttacks()];
  };

  const handleAttackPurchase = (attackName: string, cost: number, type: string) => {
    if (credits < cost) {
      // You could add a notice system here similar to the Level Up page
      return;
    }
    
    if (sheet) {
      let updatedSheet: CharacterSheet;
      if (type === 'Dart Gun') {
        const newDartGuns = [...(sheet.dartGuns || []), attackName];
        updatedSheet = { 
          ...sheet, 
          dartGuns: newDartGuns,
          credits: credits - cost
        };
      } else if (type === 'Super Serum') {
        const newSuperSerums = [...(sheet.superSerums || []), attackName];
        updatedSheet = { 
          ...sheet, 
          superSerums: newSuperSerums,
          credits: credits - cost
        };
      } else {
        return;
      }
      
      handleAutoSave(updatedSheet);
    }
    setPendingAttack("");
  };

  const handleAttackAdd = (attackName: string, type: string) => {
    if (sheet) {
      let updatedSheet: CharacterSheet;
      if (type === 'Dart Gun') {
        const newDartGuns = [...(sheet.dartGuns || []), attackName];
        updatedSheet = { 
          ...sheet, 
          dartGuns: newDartGuns
        };
      } else if (type === 'Super Serum') {
        const newSuperSerums = [...(sheet.superSerums || []), attackName];
        updatedSheet = { 
          ...sheet, 
          superSerums: newSuperSerums
        };
      } else {
        return;
      }
      
      handleAutoSave(updatedSheet);
    }
    setPendingAttack("");
  };

  const handleSecondaryAttackPurchase = (attackName: string, cost: number, type: string) => {
    if (credits < cost) {
      // You could add a notice system here similar to the Level Up page
      return;
    }
    
    if (sheet) {
      let updatedSheet: CharacterSheet;
      if (type === 'Super Serum') {
        const newSuperSerums = [...(sheet.superSerums || []), attackName];
        updatedSheet = { 
          ...sheet, 
          superSerums: newSuperSerums,
          credits: credits - cost
        };
      } else {
        return;
      }
      
      handleAutoSave(updatedSheet);
    }
    setPendingSecondaryAttack("");
  };

  const handleSecondaryAttackAdd = (attackName: string, type: string) => {
    if (sheet) {
      let updatedSheet: CharacterSheet;
      if (type === 'Super Serum') {
        const newSuperSerums = [...(sheet.superSerums || []), attackName];
        updatedSheet = { 
          ...sheet, 
          superSerums: newSuperSerums
        };
      } else {
        return;
      }
      
      handleAutoSave(updatedSheet);
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
                  
                  let value;
                  if (isNewCharacter) {
                    // For new characters, check if they have a class that gives a booster dot for this skill
                    const hasClassBooster = (charClass === "Chemist" && skill === "Investigation") ||
                                          (charClass === "Coder" && skill === "Oikomagic") ||
                                          (charClass === "Commander" && skill === "Diplomacy") ||
                                          (charClass === "Contemplative" && skill === "Awareness") ||
                                          (charClass === "Devout" && skill === "Xenomagic") ||
                                          (charClass === "Elementalist" && skill === "Xenomagic") ||
                                          (charClass === "Exospecialist" && skill === "Athletics") ||
                                          (charClass === "Gunslinger" && skill === "Deception") ||
                                          (charClass === "Technician" && skill === "Technology");
                    
                    // New characters default to 18+ (first two columns), but class boosters add a third column (16+)
                    value = hasClassBooster ? "16+" : "18+";
                  } else {
                    // For existing characters, find the rightmost selected dot
                    let idx = dots.lastIndexOf(true);
                    
                    // Check if this skill should have a class booster dot that might not be in the saved data
                    const hasClassBooster = (charClass === "Chemist" && skill === "Investigation") ||
                                          (charClass === "Coder" && skill === "Oikomagic") ||
                                          (charClass === "Commander" && skill === "Diplomacy") ||
                                          (charClass === "Contemplative" && skill === "Awareness") ||
                                          (charClass === "Devout" && skill === "Xenomagic") ||
                                          (charClass === "Elementalist" && skill === "Xenomagic") ||
                                          (charClass === "Exospecialist" && skill === "Athletics") ||
                                          (charClass === "Gunslinger" && skill === "Deception") ||
                                          (charClass === "Technician" && skill === "Technology");
                    
                    // If class booster exists and we have at least the first two dots, ensure minimum of index 2 (16+)
                    if (hasClassBooster && idx >= 1) {
                      idx = Math.max(idx, 2);
                    }
                    
                    // If no dots, show "-"
                    value = idx >= 0 ? skillColumnValues[idx] + "+" : "-";
                  }
                  
                  return (
                    <li key={skill} style={{ display: 'flex', alignItems: 'center', marginBottom: 2, fontFamily: 'Arial, sans-serif', fontSize: '1em' }}>
                      <span style={{ fontWeight: 'bold', minWidth: 120 }}>{skill}</span>
                      <span style={{ marginLeft: 8, fontWeight: 'bold', color: '#000', fontSize: '1em' }}>{value}</span>
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
                ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{beguilerFeatureJSX}</span>
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
                              ? <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32 }}>{poisonerFeatureJSX}</span>
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
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}>Speed {speed}</div>
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}>Speed Types {movement}</div>
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}>Jump Speed {strike}</div>
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}>Jump Amount </div>
          <div className={styles.horizontalLabel} style={{ color: '#38761d', fontWeight: 'bold' }}>Speed Effects {resistances}</div>
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
              (() => {
                const damageDots = sheet?.classCardDots?.[8] || [];
                const numDice = 1 + damageDots.filter(Boolean).length;
                return (
                  <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 0, display: 'flex', alignItems: 'center' }}>
                    {numDice}d6&nbsp;
                  </span>
                );
              })()
            ) : <span style={{ fontWeight: 'bold', fontFamily: 'inherit', color: '#000', marginLeft: 4 }}>{strikeDamage}</span>}
          </div>
          <div className={styles.horizontalLabel} style={{ color: '#351c75', fontWeight: 'bold' }}>Multi Strike <span style={{ color: '#000' }}>{charClass === 'Contemplative' ? (2 + (sheet?.classCardDots?.[1]?.[0] ? 1 : 0)) : (multiStrike > 0 ? multiStrike : <span style={{ visibility: 'hidden' }}>0</span>)}</span></div>
          <div className={styles.horizontalLabel} style={{ color: '#351c75', fontWeight: 'bold' }}>
              Strike Effects {
                charClass === 'Contemplative' && sheet?.classCardDots?.[2]?.[0]
                  ? <span style={{ color: '#000', fontWeight: 'normal' }}>Can <span style={{ color: '#351c75' }}><b><i>Strike</i></b></span> a single target multiple times</span>
                  : (subclass === 'Anatomist' && sheet?.subclassProgressionDots?.anatomistStrikeDots?.[0])
                    ? <span style={{ color: '#000', fontWeight: 'normal' }}>Can choose to heal <span style={{ color: '#351c75' }}><b><i>Strike</i></b></span> amount</span>
                    : (subclass === 'Grenadier' && sheet?.subclassProgressionDots?.grenadierStrikeDots?.filter(Boolean).length > 0)
                      ? <span style={{ color: '#000', fontWeight: 'normal' }}><b>[{sheet?.subclassProgressionDots?.grenadierStrikeDots?.filter(Boolean).length}]</b>hx-radius <i>AoE</i></span>
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
              {charClass === 'Contemplative' && !(sheet?.classCardDots?.[0]?.[0]) && (
                <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#a929ff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  <u>Neural</u> <img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
                </span>
              )}
            </div>
          <div style={{ fontWeight: 'bold', marginBottom: 2, fontFamily: 'Arial, sans-serif', color: '#666666', wordBreak: 'break-word', overflowWrap: 'break-word' }}>Immunities
            {charClass === 'Contemplative' && sheet?.classCardDots?.[0]?.[0] && (
              <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', color: '#a929ff', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <u>Neural</u> <img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
              </span>
            )}
          </div>
          <div style={{ fontWeight: 'bold', marginBottom: 2, fontFamily: 'Arial, sans-serif', color: '#666666', wordBreak: 'break-word', overflowWrap: 'break-word' }}>Absorptions</div>
        </div>
      </div>


      {/* Perks card */}
      <div className={styles.perksCard}>
  <h3 style={{ marginTop: 0, textDecoration: 'underline', fontFamily: 'Arial, sans-serif' }}>Languages & Perks</h3>
        <div className={styles.cardContent}>
          <div style={{ fontWeight: 'bold', marginBottom: 6, fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>Languages</span>
            {charClass === 'Coder' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Oikovox
              </span>
            )}
            {charClass === 'Devout' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Xenovox
              </span>
            )}
            {charClass === 'Elementalist' && (
              <span style={{ fontWeight: 'normal', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', color: '#000' }}>
                Xenoelemental
              </span>
            )}
          </div>
          {/* Class Perk segment, visible if Class Perk dot is selected */}
          {charClass === 'Chemist' && sheet?.classCardDots?.[9]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#721131' }}>Chemical Concoctions.</i></b> <span style={{ color: '#000' }}>You can create myriad concoctions. When doing so, choose a skill. Upon drinking a concoction, the imbiber gains an advantage on the next skill roll of your choice. You can create up to 3 concoctions per day which each last until the end of the day.</span>
              </span>
            </div>
          )}
          {charClass === 'Coder' && sheet?.classCardDots?.[12]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#112972' }}>Code Reader.</i></b> <span style={{ color: '#000' }}>You easily see the inherent logic of the natural world around you, including the Oikomagic infused in it, giving you an edge when inspecting magical or rationality-based subjects and objects. Gain an advantage on related skill rolls.</span>
              </span>
            </div>
          )}
          {charClass === 'Commander' && sheet?.classCardDots?.[9]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#717211' }}>Natural Leader.</i></b> <span style={{ color: '#000' }}>You are inherently adept at leading others and getting them to both trust and follow you. Gain an advantage on related skill rolls.</span>
              </span>
            </div>
          )}
          {charClass === 'Contemplative' && sheet?.classCardDots?.[12]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#116372' }}>Inherent Telepath.</i></b> <span style={{ color: '#000' }}>You can communicate telepathically one-way with any language-speaking creature within 10hx of you.</span>
              </span>
            </div>
          )}
          {charClass === 'Devout' && sheet?.classCardDots?.[10]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#6b1172' }}>Higher Power.</i></b> <span style={{ color: '#000' }}>You draw your energy and abilities from a divine entity. Gain an advantage on related skill rolls when you give homage to your deity and choose the transrational option.</span>
              </span>
            </div>
          )}
          {charClass === 'Elementalist' && sheet?.classCardDots?.[13]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#231172' }}>Elemental Detection.</i></b> <span style={{ color: '#000' }}>You can sense the presence of any elemental entity or substance within 10hx of you - namely earth, air, water and fire.</span>
              </span>
            </div>
          )}
          {charClass === 'Exospecialist' && sheet?.classCardDots?.[11]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#117233' }}>Man in the Machine.</i></b> <span style={{ color: '#000' }}>Your specialized armor provides the capability of withstanding a multitude of extreme environments, including heat, cold, underwater, very high altitudes and the vacuum of space.</span>
              </span>
            </div>
          )}
          {charClass === 'Gunslinger' && sheet?.classCardDots?.[7]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#4e7211' }}>Gunslinger's Grit.</i></b> <span style={{ color: '#000' }}>You’ve been in sticky situations enough times to see what’s coming around the bend. Gain an advantage on related skills when identifying potentially dangerous social situations or defending yours or your companions’ reputations.</span>
              </span>
            </div>
          )}
          {charClass === 'Technician' && sheet?.classCardDots?.[12]?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#724811' }}>Machinist.</i></b> <span style={{ color: '#000' }}>You are a whiz when it comes to machinery of all kinds. While repairing, rewiring, reprogramming, building or dismantling various machines, gain an advantage on related skill rolls.</span>
              </span>
            </div>
          )}
          
          {/* Subclass Perks */}
          {subclass === 'Necro' && sheet?.subclassProgressionDots?.necroPerksSkillsDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#0033cf' }}>Mortician.</i></b> <span style={{ color: '#000' }}>You have spent a lot of time around corpses and remains of the living. As such, you have a good intuition about the various causes of death and other topics that include the deceased. Gain an advantage on related skill rolls.</span>
              </span>
            </div>
          )}
          {subclass === 'Anatomist' && sheet?.subclassProgressionDots?.anatomistSurgeonDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#66cf00' }}>Surgeon.</i></b> <span style={{ color: '#000' }}>You can perform surgery and potentially save a life on the brink of death or otherwise ensure an enemy will be incapacitated for life in a way of your choice. Gain an advantage on related skill rolls to perform the surgery.</span>
              </span>
            </div>
          )}
          {subclass === 'Grenadier' && sheet?.subclassProgressionDots?.grenadierExplosiveTemperDots?.[0] && (
            <div style={{ marginBottom: 2, marginTop: 4, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <span>
                <b><i style={{ color: '#cf0000' }}>Explosive Temper.</i></b> <span style={{ color: '#000' }}>You are fearless to the point of recklessness, and are lucky enough to have survived so many explosions that were too close for comfort. Gain an advantage on related skill rolls when acting brash and impetuous.</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Inventory card: rows 3-4, column 3 */}
      <div className={styles.inventoryCard}>
  <h3 style={{ marginTop: 0, textDecoration: 'underline', color: '#bf9000', fontFamily: 'Arial, sans-serif' }}>Inventory</h3>
        <div className={styles.cardContent}>
          <div style={{ marginBottom: '16px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            {/* Primary Attacks Section */}
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.06em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <u><span style={{ color: '#000' }}>Primary</span> Attacks</u>
            </div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '16px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ marginBottom: '4px', textAlign: 'left' }}>
                <select
                  style={{
                    fontSize: '1em',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    background: '#fff',
                    color: '#222',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    textAlign: 'left',
                    minWidth: '180px'
                  }}
                  value={pendingAttack || (charClass === 'Chemist' ? 'Dart Guns' : 'Select Primary Attack')}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== 'Dart Guns' && value !== 'Select Primary Attack') {
                      setPendingAttack(value);
                    }
                  }}
                >
                  {charClass === 'Chemist' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Dart Guns</option>
                      <option style={{ fontWeight: 'bold' }}>Chem Gun</option>
                      <option style={{ fontWeight: 'bold' }}>Happy Pill Pusher</option>
                      <option style={{ fontWeight: 'bold' }}>Sour Juicer</option>
                      <option style={{ fontWeight: 'bold' }}>Prickly Goo</option>
                    </>
                  )}
                  {charClass !== 'Chemist' && (
                    <option disabled style={{ fontWeight: 'bold' }}>Select Primary Attack</option>
                  )}
                </select>
                
                {pendingAttack && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {pendingAttack}
                      <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                        {(() => {
                          const selectedAttack = getAvailablePrimaryAttacks().find(attack => attack.name === pendingAttack);
                          return selectedAttack ? `${selectedAttack.cost}c` : '';
                        })()}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => {
                          const selectedAttack = getAvailablePrimaryAttacks().find(attack => attack.name === pendingAttack);
                          if (selectedAttack) {
                            handleAttackPurchase(selectedAttack.name, selectedAttack.cost, selectedAttack.type);
                          }
                        }}
                      >
                        Buy
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => {
                          const selectedAttack = getAvailablePrimaryAttacks().find(attack => attack.name === pendingAttack);
                          if (selectedAttack) {
                            handleAttackAdd(selectedAttack.name, selectedAttack.type);
                          }
                        }}
                      >
                        Add
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => setPendingAttack("")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                
                <div style={{ marginTop: '2px' }}>
                  {(sheet?.dartGuns && sheet.dartGuns.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.dartGuns?.map((gun, idx) => (
                        <span key={gun + idx + 'dart'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {gun}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${gun}`}
                            onClick={() => {
                              if (sheet) {
                                const newDartGuns = sheet.dartGuns?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  dartGuns: newDartGuns
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Secondary Attacks Section */}
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.06em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <u><span style={{ color: '#000' }}>Secondary</span> Attacks</u>
            </div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ marginBottom: '4px', textAlign: 'left' }}>
                <select
                  style={{
                    fontSize: '1em',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    background: '#fff',
                    color: '#222',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    textAlign: 'left',
                    minWidth: '180px'
                  }}
                  value={pendingSecondaryAttack || (subclass === 'Anatomist' ? 'Super Serums' : 'Select Secondary Attack')}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== 'Super Serums' && value !== 'Select Secondary Attack') {
                      setPendingSecondaryAttack(value);
                    }
                  }}
                >
                  {subclass === 'Anatomist' && (
                    <>
                      <option disabled style={{ fontWeight: 'bold' }}>Super Serums</option>
                      <option style={{ fontWeight: 'bold' }}>Jacob's Ladder</option>
                      <option style={{ fontWeight: 'bold' }}>Vampirismagoria</option>
                    </>
                  )}
                  {subclass !== 'Anatomist' && (
                    <option disabled style={{ fontWeight: 'bold' }}>Select Secondary Attack</option>
                  )}
                </select>
                
                {pendingSecondaryAttack && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {pendingSecondaryAttack}
                      <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                        {(() => {
                          const selectedAttack = getAvailableSecondaryAttacks().find(attack => attack.name === pendingSecondaryAttack);
                          return selectedAttack ? `${selectedAttack.cost}c` : '';
                        })()}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => {
                          const selectedAttack = getAvailableSecondaryAttacks().find(attack => attack.name === pendingSecondaryAttack);
                          if (selectedAttack) {
                            handleSecondaryAttackPurchase(selectedAttack.name, selectedAttack.cost, selectedAttack.type);
                          }
                        }}
                      >
                        Buy
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => {
                          const selectedAttack = getAvailableSecondaryAttacks().find(attack => attack.name === pendingSecondaryAttack);
                          if (selectedAttack) {
                            handleSecondaryAttackAdd(selectedAttack.name, selectedAttack.type);
                          }
                        }}
                      >
                        Add
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => setPendingSecondaryAttack("")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                
                <div style={{ marginTop: '2px' }}>
                  {(sheet?.superSerums && sheet.superSerums.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {sheet?.superSerums?.map((serum, idx) => (
                        <span key={serum + idx + 'serum'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {serum}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${serum}`}
                            onClick={() => {
                              if (sheet) {
                                const newSuperSerums = sheet.superSerums?.filter((_, i) => i !== idx) || [];
                                const updatedSheet = { 
                                  ...sheet, 
                                  superSerums: newSuperSerums
                                };
                                handleAutoSave(updatedSheet);
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background card: row 4, column 4 */}
      <div className={styles.backgroundCard}>
  <h3 style={{ marginTop: 0, textDecoration: 'underline', fontFamily: 'Arial, sans-serif' }}>Background</h3>
        <div className={styles.cardContent}></div>
      </div>

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
                  setPortraitUrl(ev.target?.result as string);
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

export default CharacterSheet;