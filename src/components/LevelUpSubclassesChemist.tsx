import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";

type LevelUpSubclassesChemistProps = {
  sheet: CharacterSheet | null;
  charClass: string;
  subclass: string;
  onCreditsChange?: (creditsDelta: number) => void;
  onAutoSave?: (fieldUpdates: Partial<CharacterSheet>) => void;
  xpTotal: number;
  spTotal: number;
  xpSpent: number;
  spSpent: number;
  credits: number;
  setXpSpent: (xp: number) => void;
  setSpSpent: (sp: number) => void;
  setNotice: (notice: string) => void;
};

const LevelUpSubclassesChemist: React.FC<LevelUpSubclassesChemistProps> = ({ 
  sheet, 
  subclass, 
  onCreditsChange,
  onAutoSave,
  xpTotal,
  spTotal, 
  xpSpent,
  spSpent,
  credits,
  setXpSpent,
  setSpSpent,
  setNotice
}) => {
  
  // Chemist class card dots default structure
  const defaultChemistDots = [ 
    [false, false], // Feature: +1 Chem Token max (2 dots)
    [false, false, false], // Feature: +2 Crit (3 dots)
    [false, false, false], // Technique: +1hx (3 dots)
    [false],        // Technique: +1d6 Chemical per Token (1 dot)
    [false],        // Technique: +1hx Range per Token (1 dot)
    [false, false], // Technique: -1 Cooldown (2 dots)
    [false, false, false], // Attack: Increase die size (3 dots)
    [false, false, false], // Attack: +1 Crit (3 dots)
    [false, false, false], // Strike: +1 Damage die (3 dots)
    [false],        // Perks: Chemical Concoctions (1 dot)
  ];

  // Local state for class card dots (Chemist)
  const [_classCardDots, _setClassCardDots] = useState<boolean[][]>(() => {
    if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && sheet.classCardDots.length > 0) {
      return sheet.classCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    return defaultChemistDots.map(row => [...row]);
  });

  /* Unused helper functions - commenting out to fix build
  // Helper function to safely access classCardDots array
  const safeGetDotsArray = (index: number): boolean[] => {
    if (!classCardDots || !Array.isArray(classCardDots) || index >= classCardDots.length) {
      return defaultChemistDots[index] || [];
    }
    return classCardDots[index] || [];
  };

  // Helper function to safely clone classCardDots array
  const safeCloneClassCardDots = (): boolean[][] => {
    if (!classCardDots || !Array.isArray(classCardDots) || classCardDots.length === 0) {
      return defaultChemistDots.map(row => [...row]);
    }
    return classCardDots.map(row => Array.isArray(row) ? [...row] : []);
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
    }
  };
  */
  
  // Independent state for Grenadier dots - completely separate from any other component
  const [_grenadierFeatureDots, _setGrenadierFeatureDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.grenadierFeatureDots || [false]
  );
  const [grenadierFeatureIncludesAlliesDots, setGrenadierFeatureIncludesAlliesDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.grenadierFeatureIncludesAlliesDots || [false]
  );
  const [grenadierFeatureAoEDots, setGrenadierFeatureAoEDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.grenadierFeatureAoEDots || [false, false]
  );
  const [grenadierFeatureImmunityDots, setGrenadierFeatureImmunityDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.grenadierFeatureImmunityDots || [false]
  );
  const [grenadierTechniqueDieSizeDots, setGrenadierTechniqueDieSizeDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.grenadierTechniqueDieSizeDots || [false]
  );
  const [grenadierTechniqueRangeDots, setGrenadierTechniqueRangeDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.grenadierTechniqueRangeDots || [false]
  );
  const [grenadierTechniqueCooldownDots, setGrenadierTechniqueCooldownDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.grenadierTechniqueCooldownDots || [false, false]
  );
  const [grenadierAttackAoEDots, setGrenadierAttackAoEDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.grenadierAttackAoEDots || [false, false, false]
  );
  const [grenadierAttackDamageDots, setGrenadierAttackDamageDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.grenadierAttackDamageDots || [false, false, false]
  );
  const [grenadierAttackCritDots, setGrenadierAttackCritDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.grenadierAttackCritDots || [false, false, false]
  );
  const [grenadierAttackCooldownDots, setGrenadierAttackCooldownDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.grenadierAttackCooldownDots || [false, false]
  );
  const [grenadierStrikeDots, setGrenadierStrikeDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.grenadierStrikeDots || [false, false, false]
  );
  const [grenadierExplosiveTemperDots, setGrenadierExplosiveTemperDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.grenadierExplosiveTemperDots || [false]
  );

  // Local state for selected grenades (Grenadier only)
  const [selectedGrenades, setSelectedGrenades] = useState<string[]>(() => {
    return sheet?.grenades || [];
  });
  // Local state for pending grenade selection (Grenadier only)
  const [pendingGrenade, setPendingGrenade] = useState<string>("");

  /* Unused save functions - commenting out to fix build
  // Save grenades to sheet (Grenadier only)
  const saveGrenades = (newGrenades: string[]) => {
    setSelectedGrenades(newGrenades);
    if (sheet) {
      const updatedSheet = { 
        ...sheet, 
        grenades: newGrenades,
        // Preserve current credits to avoid race conditions
        credits: credits
      };
      saveCharacterSheet(updatedSheet);
    }
  };
  */

  // Independent state for Anatomist dots - completely separate from any other component
  const [anatomistFeatureDots, setAnatomistFeatureDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.anatomistFeatureDots || [false]
  );
  const [anatomistPrecisionHxDots, setAnatomistPrecisionHxDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.anatomistPrecisionHxDots || [false, false, false]
  );
  const [anatomistTechniqueRangeDots, setAnatomistTechniqueRangeDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.anatomistTechniqueRangeDots || [false, false, false]
  );
  const [anatomistTechniqueStrikeDamageDots, setAnatomistTechniqueStrikeDamageDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.anatomistTechniqueStrikeDamageDots || [false]
  );
  const [anatomistTechniqueStrikeDots, setAnatomistTechniqueStrikeDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.anatomistTechniqueStrikeDots || [false]
  );
  const [anatomistTechniqueCooldownDots, setAnatomistTechniqueCooldownDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.anatomistTechniqueCooldownDots || [false, false]
  );
  const [anatomistAttackDamageDots, setAnatomistAttackDamageDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.anatomistAttackDamageDots || [false, false, false]
  );
  const [anatomistAttackCritDots, setAnatomistAttackCritDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.anatomistAttackCritDots || [false, false, false]
  );
  const [anatomistAttackCooldownDots, setAnatomistAttackCooldownDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.anatomistAttackCooldownDots || [false, false]
  );
  const [anatomistStrikeDots, setAnatomistStrikeDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.anatomistStrikeDots || [false]
  );
  const [anatomistSurgeonDots, setAnatomistSurgeonDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.anatomistSurgeonDots || [false]
  );

  // Independent state for Necro dots
  const [necroFeatureDots, setNecroFeatureDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.necroFeatureDots || [false, false, false]
  );
  const [necroIgnoreDamageDots, setNecroIgnoreDamageDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.necroIgnoreDamageDots || [false]
  );
  const [necroTechniqueRangeDots, setNecroTechniqueRangeDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.necroTechniqueRangeDots || [false, false, false]
  );
  const [necroTechniqueInflictBlindDots, setNecroTechniqueInflictBlindDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.necroTechniqueInflictBlindDots || [false]
  );
  const [necroTechniqueCooldownDots, setNecroTechniqueCooldownDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.necroTechniqueCooldownDots || [false, false]
  );
  const [necroAttackSpeedDots, setNecroAttackSpeedDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.necroAttackSpeedDots || [false, false, false]
  );
  const [necroAttackDamageDots, setNecroAttackDamageDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.necroAttackDamageDots || [false, false, false]
  );
  const [necroAttackCritDots, setNecroAttackCritDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.necroAttackCritDots || [false, false, false]
  );
  const [necroAttackCooldownDots, setNecroAttackCooldownDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.necroAttackCooldownDots || [false, false]
  );
  const [necroPerksSkillsDots, setNecroPerksSkillsDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.necroPerksSkillsDots || [false]
  );

  // Independent state for Poisoner dots - completely separate from any other component
  const [_poisonerFeatureDots, _setPoisonerFeatureDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerFeatureDots || [false]
  );
  const [poisonerSpikeInflictToxicDots, setPoisonerSpikeInflictToxicDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerSpikeInflictToxicDots || [false]
  );
  const [poisonerChemicalImmunityDots, setPoisonerChemicalImmunityDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerChemicalImmunityDots || [false]
  );
  const [poisonerToxicImmunityDots, setPoisonerToxicImmunityDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerToxicImmunityDots || [false]
  );
  const [poisonerTechniqueExtraSpikeReroll5Dots, setPoisonerTechniqueExtraSpikeReroll5Dots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerTechniqueExtraSpikeReroll5Dots || [false]
  );
  const [poisonerTechniqueExtraSpikeReroll4Dots, setPoisonerTechniqueExtraSpikeReroll4Dots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerTechniqueExtraSpikeReroll4Dots || [false]
  );
  const [poisonerTechniqueSameEffectMultipleDots, setPoisonerTechniqueSameEffectMultipleDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerTechniqueSameEffectMultipleDots || [false]
  );
  const [poisonerTechnique2EffectsPerTokenDots, setPoisonerTechnique2EffectsPerTokenDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerTechnique2EffectsPerTokenDots || [false]
  );
  const [poisonerTechniqueCooldownDots, setPoisonerTechniqueCooldownDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerTechniqueCooldownDots || [false, false]
  );
  const [poisonerAttackAoEDots, setPoisonerAttackAoEDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerAttackAoEDots || [false]
  );
  const [poisonerAttackDamageDots, setPoisonerAttackDamageDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerAttackDamageDots || [false, false]
  );
  const [poisonerAttackCritDots, setPoisonerAttackCritDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerAttackCritDots || [false, false, false]
  );
  const [poisonerAttackCooldownDots, setPoisonerAttackCooldownDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerAttackCooldownDots || [false, false]
  );
  const [poisonerVenomMasterDots, setPoisonerVenomMasterDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.poisonerVenomMasterDots || [false]
  );

  // Local state for selected chem zombies (Necro only)
  const [selectedChemZombies, setSelectedChemZombies] = useState<string[]>(() => {
    return sheet?.chemZombies || [];
  });
  // Local state for pending chem zombie selection (Necro only)
  const [pendingChemZombie, setPendingChemZombie] = useState<string>("");

  /* Unused save functions - commenting out to fix build
  // Save chem zombies to sheet (Necro only)
  const saveChemZombies = (newChemZombies: string[]) => {
    setSelectedChemZombies(newChemZombies);
    if (sheet) {
      const updatedSheet = { 
        ...sheet, 
        chemZombies: newChemZombies,
        // Preserve current credits to avoid race conditions
        credits: credits
      };
      saveCharacterSheet(updatedSheet);
    }
  };
  */

  // Local state for selected super serums (Anatomist only)
  const [selectedSuperSerums, setSelectedSuperSerums] = useState<string[]>(() => {
    return sheet?.superSerums || [];
  });
  // Local state for pending super serum selection (Anatomist only)
  const [pendingSuperSerum, setPendingSuperSerum] = useState<string>("");

  /* Unused save functions - commenting out to fix build
  // Save super serums to sheet (Anatomist only)
  const saveSuperSerums = (newSuperSerums: string[]) => {
    setSelectedSuperSerums(newSuperSerums);
    if (sheet) {
      const updatedSheet = { 
        ...sheet, 
        superSerums: newSuperSerums,
        // Preserve current credits to avoid race conditions
        credits: credits
      };
      saveCharacterSheet(updatedSheet);
    }
  };
  */

  // Local state for selected noxious fumes (Poisoner only)
  const [selectedNoxiousFumes, setSelectedNoxiousFumes] = useState<string[]>(() => {
    return sheet?.noxiousFumes || [];
  });
  // Local state for pending noxious fume selection (Poisoner only)
  const [pendingNoxiousFume, setPendingNoxiousFume] = useState<string>("");

  /* Unused save functions - commenting out to fix build
  // Save noxious fumes to sheet (Poisoner only)
  const saveNoxiousFumes = (newNoxiousFumes: string[]) => {
    setSelectedNoxiousFumes(newNoxiousFumes);
    if (sheet) {
      const updatedSheet = { 
        ...sheet, 
        noxiousFumes: newNoxiousFumes,
        // Preserve current credits to avoid race conditions
        credits: credits
      };
      saveCharacterSheet(updatedSheet);
    }
  };
  */

  // Helper function to handle dot clicking with sequential requirement
  const handleDotClick = (
    currentArray: boolean[], 
    setArray: React.Dispatch<React.SetStateAction<boolean[]>>, 
    index: number, 
    xpCosts: number[],
    dotType?: string
  ) => {
    const newArray = [...currentArray];
    const rightmostChecked = currentArray.lastIndexOf(true);
    const canCheck = index === 0 || currentArray.slice(0, index).every(Boolean);
    const canUncheck = currentArray[index] && index === rightmostChecked;
    
    let xpDelta = 0;
    
    if (!currentArray[index] && canCheck) {
      // Checking dots - fill from start to current index
      for (let j = 0; j <= index; j++) {
        if (!currentArray[j]) {
          newArray[j] = true;
          xpDelta += xpCosts[j] || 0;
        }
      }
    } else if (currentArray[index] && canUncheck) {
      // Unchecking dots - clear from current index to end
      for (let j = index; j < currentArray.length; j++) {
        if (currentArray[j]) {
          newArray[j] = false;
          xpDelta -= xpCosts[j] || 0;
        }
      }
    }
    
    if (xpDelta !== 0) {
      // Check if spending would exceed totals
      const newXpSpent = xpSpent + xpDelta;
      if (newXpSpent > xpTotal) {
        setNotice("Not enough xp!");
        return;
      }
      
      setArray(newArray);
      
      // Include progression dots in the XP change communication to prevent race conditions
      if (dotType && onAutoSave) {
        const progressionDots = {
          ...sheet?.subclassProgressionDots,
          [dotType]: newArray
        };
        // Save both XP change AND progression dots in one operation
        const newXpSpent = xpSpent + xpDelta;
        const newSpSpent = spSpent;
        setXpSpent(newXpSpent);
        setSpSpent(newSpSpent);
        onAutoSave({
          xpSpent: newXpSpent,
          spSpent: newSpSpent,
          subclassProgressionDots: progressionDots
        });
      }
    }
  };

  // Helper function to handle SP dots (for Surgeon perk)
  const handleSpDotClick = (
    currentArray: boolean[], 
    setArray: React.Dispatch<React.SetStateAction<boolean[]>>, 
    index: number, 
    spCosts: number[],
    dotType?: string
  ) => {
    const newArray = [...currentArray];
    let spDelta = 0;
    
    if (!currentArray[index]) {
      newArray[index] = true;
      spDelta += spCosts[index] || 0;
    } else {
      newArray[index] = false;
      spDelta -= spCosts[index] || 0;
    }
    
    // Check if spending would exceed totals
    const newSpSpent = spSpent + spDelta;
    if (newSpSpent > spTotal) {
      setNotice("Not enough sp!");
      return;
    }
    
    setArray(newArray);
    
    // Include progression dots in the SP change communication to prevent race conditions
    if (dotType && onAutoSave) {
      const progressionDots = {
        ...sheet?.subclassProgressionDots,
        [dotType]: newArray
      };
      // Save both SP change AND progression dots in one operation
      const newXpSpent = xpSpent;
      const newSpSpent = spSpent + spDelta;
      setXpSpent(newXpSpent);
      setSpSpent(newSpSpent);
      onAutoSave({
        xpSpent: newXpSpent,
        spSpent: newSpSpent,
        spRemaining: spTotal - newSpSpent,
        subclassProgressionDots: progressionDots
      });
    }
  };
    
  return (


    
    <div style={{ width: '100%', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      {/* Anatomist Subclass Content */}
      {subclass === 'Anatomist' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header - Chemist style */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
                <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                  <b><i style={{ color: '#66cf00', fontSize: '1em' }}>Anatomical Precision.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>You and all allies within <b>[{3 + anatomistPrecisionHxDots.filter(Boolean).length}]</b>hx of you ignore any Damage and <b>[{anatomistFeatureDots[0] ? 'condition' : ' - '}]</b> <i>Resistances</i> and/or <i>Immunities</i>.</span>
                </span>
            </span>
          </div>
          {/* Feature XP progression table - now interactive */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '8px', alignItems: 'center', marginBottom: '1rem' }}>
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
            <span></span>
            <span></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Ignore condition Immunities</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(anatomistFeatureDots, setAnatomistFeatureDots, 0, [6], 'anatomistFeatureDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: anatomistFeatureDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            <span></span>
            {/* New row for +1hx dots */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>14xp</span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(anatomistPrecisionHxDots, setAnatomistPrecisionHxDots, idx, [5, 9, 14], 'anatomistPrecisionHxDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: anatomistPrecisionHxDots[idx] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Technique Section - Chemist style */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i style={{ color: '#66cf00', fontSize: '1em' }}>The "Good Stuff"</i></b> <i style={{ color: '#66cf00', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{4 - anatomistTechniqueCooldownDots.filter(Boolean).length}]</b>).</i> You spend any number of <i>Chem Tokens</i>. After doing so, you and allies within <b>[{1 + anatomistTechniqueRangeDots.filter(Boolean).length}]</b>hx of you gain +<b>[{1 + anatomistTechniqueStrikeDamageDots.filter(Boolean).length}]</b>d6 <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage, +<b>[{0 + anatomistTechniqueStrikeDots.filter(Boolean).length}]</b> <b><i style={{ color: '#351c75' }}>Strikes</i></b> and can <b><i style={{ color: '#38761d' }}>Move</i></b> +2hx for each <i>Chem Token</i> spent until the start of the next round.
            </div>
            
                    <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 24px 24px 24px',
                        gridTemplateRows: 'repeat(5, auto)',
                        columnGap: '6px',
                        rowGap: '2px',
                        alignItems: 'start',
                        marginBottom: '2px',
                        width: '100%',
                        paddingLeft: '4px'
                      }}>
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>14xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistTechniqueRangeDots, setAnatomistTechniqueRangeDots, idx, [5, 9, 14], 'anatomistTechniqueRangeDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: anatomistTechniqueRangeDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
            </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 24px 24px 24px',
                        columnGap: '6px',
                        rowGap: '2px',
                        alignItems: 'start',
                        marginBottom: '2px',
                        width: '100%',
                        paddingLeft: '4px'
                      }}>
                        <span></span>
                        <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>18xp</span>
                        <span></span>
                        <span></span>
                        <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d6 <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage per <i>Token</i></span>
                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <span
                            onClick={() => handleDotClick(anatomistTechniqueStrikeDamageDots, setAnatomistTechniqueStrikeDamageDots, 0, [18], 'anatomistTechniqueStrikeDamageDots')}
                            style={{
                              width: '15px',
                              height: '15px',
                              border: '2px solid #000',
                              borderRadius: '50%',
                              display: 'block',
                              background: anatomistTechniqueStrikeDamageDots[0] ? '#000' : '#fff',
                              cursor: 'pointer',
                              transition: 'background 0.2s'
                            }}
                          ></span>
                        </span>
                        <span></span>
                      </div>
            
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 24px 24px 24px',
                        columnGap: '6px',
                        rowGap: '2px',
                        alignItems: 'start',
                        marginBottom: '2px',
                        width: '100%',
                        paddingLeft: '4px'
                      }}>
                        <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>18xp</span>
                <span></span>
                <span></span>

              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#351c75' }}>Strike</i></b> per <i>Token</i></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(anatomistTechniqueStrikeDots, setAnatomistTechniqueStrikeDots, 0, [18], 'anatomistTechniqueStrikeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: anatomistTechniqueStrikeDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 24px 24px 24px',
                        columnGap: '6px',
                        rowGap: '2px',
                        alignItems: 'start',
                        marginBottom: '2px',
                        width: '100%',
                        paddingLeft: '4px'
                      }}>              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistTechniqueCooldownDots, setAnatomistTechniqueCooldownDots, idx, [4, 7], 'anatomistTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: anatomistTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
          </div>
          
          {/* Attack Section */}

          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ marginBottom: '4px' }}>
                <b><i><span style={{ color: '#000' }}>Secondary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> <i>(Cooldown</i> <b>[{4 - anatomistAttackCooldownDots.filter(Boolean).length}]</b><i>).</i>
              </div>
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
                  defaultValue="Super Serums"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== "Super Serums") {
                      setPendingSuperSerum(value);
                      e.target.value = "Super Serums"; // Reset dropdown
                    }
                  }}
                >
                  <option disabled style={{ fontWeight: 'bold' }}>Super Serums</option>
                  <option style={{ fontWeight: 'bold' }}>Jacob's Ladder</option>
                  <option style={{ fontWeight: 'bold' }}>Vampirismagoria</option>
                </select>
                {/* Buy/Add dialog for Super Serum selection */}
                {pendingSuperSerum && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {pendingSuperSerum}
                      <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                        {pendingSuperSerum === 'Jacob\'s Ladder' && '215c'}
                        {pendingSuperSerum === 'Vampirismagoria' && '185c'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        // Determine cost
                        let cost = 0;
                        if (pendingSuperSerum === 'Jacob\'s Ladder') cost = 215;
                        else if (pendingSuperSerum === 'Vampirismagoria') cost = 185;
                        // Check credits
                        if (credits < cost) {
                          setNotice('Not enough credits!');
                          return;
                        }
                        // Atomic operation: update both super serums and credits
                        const newSuperSerums = [...selectedSuperSerums, pendingSuperSerum];
                        const newCredits = credits - cost;
                        setSelectedSuperSerums(newSuperSerums);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            superSerums: newSuperSerums,
                            credits: newCredits
                          });
                        }
                        
                        // Update the LevelUp component's credits state (no auto-save)
                        onCreditsChange?.(-cost);
                        setPendingSuperSerum("");
                      }}
                    >Buy</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        const newSuperSerums = [...selectedSuperSerums, pendingSuperSerum];
                        setSelectedSuperSerums(newSuperSerums);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            superSerums: newSuperSerums
                          });
                        }
                        
                        setPendingSuperSerum("");
                      }}
                    >Add</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => setPendingSuperSerum("")}
                    >Cancel</button>
                    </div>
                  </div>
                )}
                <div style={{ marginTop: '2px' }}>
                  {selectedSuperSerums.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {selectedSuperSerums.map((serum, idx) => (
                        <span key={serum + idx} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {serum}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${serum}`}
                            onClick={() => {
                              const newSuperSerums = selectedSuperSerums.filter((_, i) => i !== idx);
                              setSelectedSuperSerums(newSuperSerums);
                              
                              if (sheet && onAutoSave) {
                                onAutoSave({
                                  superSerums: newSuperSerums
                                });
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span>
                  <b><u>Range</u></b> 1hx
                </span>
                  <span style={{ textAlign: 'right', minWidth: '80px' }}>
                    <b><u>Crit</u></b> <b>[{18 - anatomistAttackCritDots.filter(Boolean).length}]</b>+
                  </span>
              </div>
              <b><u>Target</u></b> Single <br />
              <b><u>Chem Token</u></b> <br />
              <b><u>Damage</u></b> <b>[{1 + anatomistAttackDamageDots.filter(Boolean).length}]</b>d8, <b><i>Confuse</i></b> <br />
              <b><u>Crit Effect</u></b> <b>[{1 + anatomistAttackDamageDots.filter(Boolean).length}]</b>d8
            </div>
            
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 24px 24px 24px',
                        columnGap: '6px',
                        rowGap: '2px',
                        alignItems: 'start',
                        marginBottom: '2px',
                        width: '100%',
                        paddingLeft: '4px'
                      }}>                 
                      <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Damage die</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistAttackDamageDots, setAnatomistAttackDamageDots, idx, [4, 6, 9], 'anatomistAttackDamageDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: anatomistAttackDamageDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
            
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 24px 24px 24px',
                        columnGap: '6px',
                        rowGap: '2px',
                        alignItems: 'start',
                        marginBottom: '2px',
                        width: '100%',
                        paddingLeft: '4px'
                      }}>   
                                    <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>2xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistAttackCritDots, setAnatomistAttackCritDots, idx, [2, 4, 6], 'anatomistAttackCritDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: anatomistAttackCritDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
            
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 24px 24px 24px',
                        columnGap: '6px',
                        rowGap: '2px',
                        alignItems: 'start',
                        marginBottom: '2px',
                        width: '100%',
                        paddingLeft: '4px'
                      }}>                
                      <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistAttackCooldownDots, setAnatomistAttackCooldownDots, idx, [3, 5], 'anatomistAttackCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: anatomistAttackCooldownDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
                
              ))}
            </div>
          </div>
          
          
          {/* Strike Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i>Enhanced <span style={{ color: '#351c75' }}>Strike</span> Effects.</i></b>
            </div>
            
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 24px',
                        columnGap: '6px',
                        rowGap: '2px',
                        alignItems: 'start',
                        marginBottom: '2px',
                        width: '100%',
                        paddingLeft: '4px'
                      }}>                 <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>14xp</span>

              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Can choose to heal <i><b><span style={{ color: '#351c75' }}>Strike</span></b></i> amount</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(anatomistStrikeDots, setAnatomistStrikeDots, 0, [14], 'anatomistStrikeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: anatomistStrikeDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            </div>
          </div>
          
          {/* Perks Section */}
            <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
                <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <i><b>Skills.</b> Medicine</i> +2
                </div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 24px 24px 24px',
                gridTemplateRows: 'auto auto',
                columnGap: '6px',
                rowGap: '2px',
                alignItems: 'start',
                marginTop: '-12px',
                marginBottom: '2px',
                width: '100%',
                paddingLeft: '4px'
              }}>
                {/* Row 1: Empty cells and 8sp header */}
                <span></span>
                <span></span>
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8sp</span>
                {/* Row 2: Surgeon text and dot */}
                <div style={{ 
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left',
                  paddingRight: '8px',
                  lineHeight: '1.2',
                  gridColumn: '1 / 4'
                }}>
                  <b><i style={{ color: '#66cf00' }}>Surgeon.</i></b> You can perform surgery and potentially save a life on the brink of death or otherwise ensure an enemy will be incapacitated for life in a way of your choice. Gain an advantage on related skill rolls to perform the surgery.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(anatomistSurgeonDots, setAnatomistSurgeonDots, 0, [8], 'anatomistSurgeonDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: anatomistSurgeonDots[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Grenadier Subclass Content */}
      {subclass === 'Grenadier' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header - Chemist style */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
                <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                  <b><i style={{ color: '#cf0000', fontSize: '1em' }}>Blaster Master.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>You and all allies within <b>[{grenadierFeatureIncludesAlliesDots[0] ? 3 + grenadierFeatureAoEDots.filter(Boolean).length : 0}]</b>hx are <b>[</b><i>{grenadierFeatureImmunityDots[0] ? 'Immune' : 'Resistant'}</i><b>]</b> to all Damage from <i>AoE</i> <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b>. In addition, your <b><i>Primary</i></b> <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> Target becomes an <i>AoE</i> 1hx-radius.</span>
                </span>
            </span>
          </div>
          {/* Feature XP progression table - now interactive */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(4, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>            
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
            <span></span>
            <span></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Includes allies within 3hx</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(grenadierFeatureIncludesAlliesDots, setGrenadierFeatureIncludesAlliesDots, 0, [7], 'grenadierFeatureIncludesAlliesDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: grenadierFeatureIncludesAlliesDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            {/* New row for +1hx dots */}
            <span></span>
            <span></span>
                        <span></span>

            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
            
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right' }}>+1hx</span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷</span>
            {[0,1].map(idx => {
              const arr = grenadierFeatureAoEDots;
              const rightmostChecked = arr.lastIndexOf(true);
              // Special dependency: +1hx dots require "Includes allies within 3hx" to be selected first
              const includesAlliesSelected = grenadierFeatureIncludesAlliesDots[0];
              const canCheck = includesAlliesSelected && (idx === 0 || arr.slice(0, idx).every(Boolean));
              const canUncheck = arr[idx] && idx === rightmostChecked;
              
              return (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(grenadierFeatureAoEDots, setGrenadierFeatureAoEDots, idx, [6, 10], 'grenadierFeatureAoEDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: grenadierFeatureAoEDots[idx] ? '#000' : '#fff',
                      cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              );
            })}
            <span></span>
            {/* New row for AoE Attack Immunity */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>22xp</span>
            <span></span>

            <span></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><i>AoE</i> <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> <i>Immunity</i></span>
            
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(grenadierFeatureImmunityDots, setGrenadierFeatureImmunityDots, 0, [22], 'grenadierFeatureImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: grenadierFeatureImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Technique Section - Chemist style */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i style={{ color: '#cf0000', fontSize: '1em' }}>The "Big One"</i></b> <i style={{ color: '#cf0000', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{4 - grenadierTechniqueCooldownDots.filter(Boolean).length}]</b>).</i> You spend any number of <i>Chem Tokens</i> and choose yourself or an adjacent ally. The next <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> you or your ally makes gets a +1hx-radius <i>AoE</i> and +1d<b>[{10 + 2 * grenadierTechniqueDieSizeDots.filter(Boolean).length}]</b> Damage and +<b>[{grenadierTechniqueRangeDots[0] ? 1 : 0}]</b>hx Range per <i>Chem Token</i> spent.
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>    
              <span></span>          

              
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              <span></span>
              <span></span>

              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Increase die size</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(grenadierTechniqueDieSizeDots, setGrenadierTechniqueDieSizeDots, 0, [10], 'grenadierTechniqueDieSizeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: grenadierTechniqueDieSizeDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>                
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span></span>
              <span></span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx Range</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(grenadierTechniqueRangeDots, setGrenadierTechniqueRangeDots, 0, [8], 'grenadierTechniqueRangeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: grenadierTechniqueRangeDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>                <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span></span>

              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0,1].map(idx => {
                const arr = grenadierTechniqueCooldownDots;
                const rightmostChecked = arr.lastIndexOf(true);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span
                      onClick={() => handleDotClick(grenadierTechniqueCooldownDots, setGrenadierTechniqueCooldownDots, idx, [5, 8], 'grenadierTechniqueCooldownDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: grenadierTechniqueCooldownDots[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>
          
          {/* Attack Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ marginBottom: '4px' }}>
                <b><i><span style={{ color: '#000' }}>Secondary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> <i>(Cooldown</i> <b>[{4 - grenadierAttackCooldownDots.filter(Boolean).length}]</b><i>).</i>
              </div>
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
                  defaultValue="Grenades"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== "Grenades") {
                      setPendingGrenade(value);
                      e.target.value = "Grenades"; // Reset dropdown
                    }
                  }}
                >
                  <option disabled style={{ fontWeight: 'bold' }}>Grenades</option>
                  <option style={{ fontWeight: 'bold' }}>Amethyst Blast</option>
                  <option style={{ fontWeight: 'bold' }}>Void Grenade</option>
                </select>
                {/* Buy/Add dialog for Grenade selection */}
                {pendingGrenade && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {pendingGrenade}
                      <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                        {pendingGrenade === 'Amethyst Blast' && '220c'}
                        {pendingGrenade === 'Void Grenade' && '200c'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        // Determine cost
                        let cost = 0;
                        if (pendingGrenade === 'Amethyst Blast') cost = 220;
                        else if (pendingGrenade === 'Void Grenade') cost = 200;
                        // Check credits
                        if (credits < cost) {
                          setNotice('Not enough credits!');
                          return;
                        }
                        // Atomic operation: update both grenades and credits
                        const newGrenades = [...selectedGrenades, pendingGrenade];
                        const newCredits = credits - cost;
                        setSelectedGrenades(newGrenades);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            grenades: newGrenades,
                            credits: newCredits
                          });
                        }
                        
                        // Update the LevelUp component's credits state (no auto-save)
                        onCreditsChange?.(-cost);
                        setPendingGrenade("");
                      }}
                    >Buy</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        const newGrenades = [...selectedGrenades, pendingGrenade];
                        setSelectedGrenades(newGrenades);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            grenades: newGrenades
                          });
                        }
                        
                        setPendingGrenade("");
                      }}
                    >Add</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => setPendingGrenade("")}
                    >Cancel</button>
                    </div>
                  </div>
                )}
                <div style={{ marginTop: '2px' }}>
                  {selectedGrenades.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {selectedGrenades.map((grenade, idx) => (
                        <span key={grenade + idx} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {grenade}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${grenade}`}
                            onClick={() => {
                              const newGrenades = selectedGrenades.filter((_, i) => i !== idx);
                              setSelectedGrenades(newGrenades);
                              
                              if (sheet && onAutoSave) {
                                onAutoSave({
                                  grenades: newGrenades
                                });
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span>
                  <b><u>Range</u></b> 6hx
                </span>
                  <span style={{ textAlign: 'right', minWidth: '80px' }}>
                    <b><u>Crit</u></b> <b>[{18 - grenadierAttackCritDots.filter(Boolean).length}]</b>+
                  </span>
              </div>
              <b><u>Target</u></b> <i>AoE</i> <b>[{2 + grenadierAttackAoEDots.filter(Boolean).length}]</b>hx-radius <br />
              <b><u>Damage</u></b> 1d<b>[{6 + 2 * grenadierAttackDamageDots.filter(Boolean).length}]</b>, <b><i>Slam</i></b> 3hx <br />
              <b><u>Crit Effect</u></b> 1d<b>[{6 + 2 * grenadierAttackDamageDots.filter(Boolean).length}]</b>
              </div>
            </div>
            
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 24px 24px 24px',
                        columnGap: '6px',
                        rowGap: '2px',
                        alignItems: 'start',
                        marginBottom: '2px',
                        width: '100%',
                        paddingLeft: '4px'
                      }}>              
                      <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>18xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx-radius AoE</span>
              {[0,1,2].map(idx => {
                const arr = grenadierAttackAoEDots;
                const rightmostChecked = arr.lastIndexOf(true);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span
                      onClick={() => handleDotClick(grenadierAttackAoEDots, setGrenadierAttackAoEDots, idx, [6, 12, 18], 'grenadierAttackAoEDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: grenadierAttackAoEDots[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
            
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 24px 24px 24px',
                        columnGap: '6px',
                        rowGap: '2px',
                        alignItems: 'start',
                        marginBottom: '2px',
                        width: '100%',
                        paddingLeft: '4px'
                      }}>              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>15xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Increase die size</span>
              {[0,1,2].map(idx => {
                const arr = grenadierAttackDamageDots;
                const rightmostChecked = arr.lastIndexOf(true);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span
                      onClick={() => handleDotClick(grenadierAttackDamageDots, setGrenadierAttackDamageDots, idx, [5, 8, 15], 'grenadierAttackDamageDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: grenadierAttackDamageDots[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
            
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 24px 24px 24px',
                        columnGap: '6px',
                        rowGap: '2px',
                        alignItems: 'start',
                        marginBottom: '2px',
                        width: '100%',
                        paddingLeft: '4px'
                      }}>              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit</span>
              {[0,1,2].map(idx => {
                const arr = grenadierAttackCritDots;
                const rightmostChecked = arr.lastIndexOf(true);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span
                      onClick={() => handleDotClick(grenadierAttackCritDots, setGrenadierAttackCritDots, idx, [3, 5, 8], 'grenadierAttackCritDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: grenadierAttackCritDots[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
            
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 24px 24px 24px',
                        columnGap: '6px',
                        rowGap: '2px',
                        alignItems: 'start',
                        marginBottom: '2px',
                        width: '100%',
                        paddingLeft: '4px'
                      }}>              
                      <span></span>
                      
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0,1].map(idx => {
                const arr = grenadierAttackCooldownDots;
                const rightmostChecked = arr.lastIndexOf(true);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span
                      onClick={() => handleDotClick(grenadierAttackCooldownDots, setGrenadierAttackCooldownDots, idx, [4, 6], 'grenadierAttackCooldownDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: grenadierAttackCooldownDots[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>
          
          {/* Strike Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i>Enhanced <span style={{ color: '#351c75' }}>Strike</span> Effects.</i></b> {grenadierStrikeDots.filter(Boolean).length > 0 && (
                <>
                  <b>[{grenadierStrikeDots.filter(Boolean).length}]</b>hx-radius <i>AoE</i>
                </>
              )}
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>                  <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>13xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>18xp</span>

              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx-radius <i>AoE</i></span>
              {[0,1,2].map(idx => {
                const arr = grenadierStrikeDots;
                const rightmostChecked = arr.lastIndexOf(true);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span
                      onClick={() => handleDotClick(grenadierStrikeDots, setGrenadierStrikeDots, idx, [8, 13, 18], 'grenadierStrikeDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: grenadierStrikeDots[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>
          
          {/* Perks Section */}
          <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <i><b>Skills.</b> Intimidation</i> +2
            </div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 24px 24px 24px',
                gridTemplateRows: 'auto auto',
                columnGap: '6px',
                rowGap: '2px',
                alignItems: 'start',
                marginTop: '-12px',
                marginBottom: '2px',
                width: '100%',
                paddingLeft: '4px'
              }}>
                {/* Row 1: Empty cells and 8sp header */}
                <span></span>
                <span></span>
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8sp</span>
                {/* Row 2: Explosive Temper text and dot */}
                <div style={{ 
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left',
                  paddingRight: '8px',
                  lineHeight: '1.2',
                  gridColumn: '1 / 4'
                }}>
                  <b><i style={{ color: '#cf0000' }}>Explosive Temper.</i></b> You are fearless to the point of recklessness, and are lucky enough to have survived so many explosions that were too close for comfort. Gain an advantage on related skill rolls when acting brash and impetuous.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(grenadierExplosiveTemperDots, setGrenadierExplosiveTemperDots, 0, [8], 'grenadierExplosiveTemperDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: grenadierExplosiveTemperDots[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {subclass === 'Necro' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
                <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                  <b><i style={{ color: '#0033cf', fontSize: '1em' }}>Bodysnatcher.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>Whenever a creature dies within <b>[{5 + necroFeatureDots.filter(Boolean).length}]</b>hx of you, you gain a <i>Chem Token</i>. Additionally, when you take Damage, you can spend a <i>Chem Token</i> to <b>[{necroIgnoreDamageDots[0] ? 'ignore' : 'halve'}]</b> that Damage.</span>
                </span>
            </span>
          </div>

          {/* Feature XP progression table */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>                <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>14xp</span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(necroFeatureDots, setNecroFeatureDots, idx, [5, 9, 14], 'necroFeatureDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: necroFeatureDots[idx] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}

            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>15xp</span>
            <span></span>
            <span></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Ignore Damage</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(necroIgnoreDamageDots, setNecroIgnoreDamageDots, 0, [15], 'necroIgnoreDamageDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: necroIgnoreDamageDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            <span></span>
          </div>

          {/* Technique Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ color: '#000', fontWeight: 400, fontSize: '1em', marginBottom: '8px' }}>
              <b><i style={{ color: '#0033cf', fontSize: '1em' }}>Grasp of the Grave</i></b> <i style={{ color: '#0033cf', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{4 - necroTechniqueCooldownDots.filter(Boolean).length}]</b>).</i> Enemies within <b>[{5 + necroTechniqueRangeDots.filter(Boolean).length}]</b>hx of you suffer the <i><b>Mesmerize</b></i> and <b>[<i>{necroTechniqueInflictBlindDots[0] ? 'Blind' : ' - '}</i>]</b> condition(s). At the end of their <b><i>Mesmerize</i></b> <b><i style={{ color: '#38761d', fontSize: '1em' }}>Movement</i></b>, they then suffer the <i><b>Restrain</b></i> condition.
            </div>

            {/* Technique XP progression table */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>                  <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(necroTechniqueRangeDots, setNecroTechniqueRangeDots, idx, [3, 6, 9], 'necroTechniqueRangeDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: necroTechniqueRangeDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}

              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              <span></span>
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict Blind</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(necroTechniqueInflictBlindDots, setNecroTechniqueInflictBlindDots, 0, [10], 'necroTechniqueInflictBlindDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: necroTechniqueInflictBlindDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>

              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(necroTechniqueCooldownDots, setNecroTechniqueCooldownDots, idx, [5, 8], 'necroTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: necroTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>
          </div>

          {/* Attack Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ marginBottom: '4px' }}>
                <b><i><span style={{ color: '#000' }}>Secondary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> <i>(Cooldown</i> <b>[{4 - necroAttackCooldownDots.filter(Boolean).length}]</b><i>).</i>
              </div>
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
                  defaultValue="Chem Zombies"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== "Chem Zombies") {
                      setPendingChemZombie(value);
                      e.target.value = "Chem Zombies"; // Reset dropdown
                    }
                  }}
                >
                  <option disabled style={{ fontWeight: 'bold' }}>Chem Zombies</option>
                  <option style={{ fontWeight: 'bold' }}>Synthetic Corpse</option>
                </select>
                {/* Buy/Add dialog for Chem Zombie selection */}
                {pendingChemZombie && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {pendingChemZombie}
                      <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                        {pendingChemZombie === 'Synthetic Corpse' && '200c'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        // Determine cost
                        let cost = 0;
                        if (pendingChemZombie === 'Synthetic Corpse') cost = 200;
                        // Check credits
                        if (credits < cost) {
                          setNotice('Not enough credits!');
                          return;
                        }
                        // Atomic operation: update both chem zombies and credits
                        const newChemZombies = [...selectedChemZombies, pendingChemZombie];
                        const newCredits = credits - cost;
                        setSelectedChemZombies(newChemZombies);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            chemZombies: newChemZombies,
                            credits: newCredits
                          });
                        }
                        
                        // Update the LevelUp component's credits state (no auto-save)
                        onCreditsChange?.(-cost);
                        setPendingChemZombie("");
                      }}
                    >Buy</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        const newChemZombies = [...selectedChemZombies, pendingChemZombie];
                        setSelectedChemZombies(newChemZombies);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            chemZombies: newChemZombies
                          });
                        }
                        
                        setPendingChemZombie("");
                      }}
                    >Add</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => setPendingChemZombie("")}
                    >Cancel</button>
                    </div>
                  </div>
                )}
                <div style={{ marginTop: '2px' }}>
                  {selectedChemZombies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {selectedChemZombies.map((chemZombie, idx) => (
                        <span key={chemZombie + idx} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {chemZombie}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${chemZombie}`}
                            onClick={() => {
                              const newChemZombies = selectedChemZombies.filter((_, i) => i !== idx);
                              setSelectedChemZombies(newChemZombies);
                              
                              if (sheet && onAutoSave) {
                                onAutoSave({
                                  chemZombies: newChemZombies
                                });
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
            
              <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span>
                  <b><u>Summon</u></b> 1 <b><i style={{ color: '#990000', fontSize: '1em' }}>Hit Point</i></b> <br />
                </span>
                  <span style={{ textAlign: 'right', minWidth: '80px' }}>
                    <b><u>Crit</u></b> <b>[{18 - necroAttackCritDots.filter(Boolean).length}]</b>+
                  </span>
              </div>
              <b><u>Chem Token</u></b> 2, create +1 <i>Chem Zombie</i> <br />
              <b><u><i><span style={{ color: '#38761d' }}>Speed</span></i></u></b> 4+<b>[{0 + necroAttackSpeedDots.filter(Boolean).length}]</b>hx <br />
              <b><u>Range</u></b> 1hx <br />
              <b><u>Target</u></b> <i>AoE</i> 3hx-cone <br />
              <b><u>Damage</u></b> <b>[{1 + necroAttackDamageDots.filter(Boolean).length}]</b>d6, Self-Destruct <br />
              <b><u>Crit Effect</u></b> <b>[{1 + necroAttackDamageDots.filter(Boolean).length}]</b>d6
              </div>
            
            
            
            
            </div>

            {/* Attack XP progression table */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>                  <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>15xp</span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i><span style={{ color: '#38761d' }}>Speed</span></i></b></span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(necroAttackSpeedDots, setNecroAttackSpeedDots, idx, [5, 8, 15], 'necroAttackSpeedDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: necroAttackSpeedDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}

              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>13xp</span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Damage die</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(necroAttackDamageDots, setNecroAttackDamageDots, idx, [5, 8, 13], 'necroAttackDamageDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: necroAttackDamageDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}

              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(necroAttackCritDots, setNecroAttackCritDots, idx, [3, 5, 8], 'necroAttackCritDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: necroAttackCritDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}

              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(necroAttackCooldownDots, setNecroAttackCooldownDots, idx, [4, 6], 'necroAttackCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: necroAttackCooldownDots[idx] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>

          {/* Perks Section */}
          <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <i><b>Skills.</b> Survival</i> +2
            </div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 24px 24px 24px',
                gridTemplateRows: 'auto auto',
                columnGap: '6px',
                rowGap: '2px',
                alignItems: 'start',
                marginTop: '-12px',
                marginBottom: '2px',
                width: '100%',
                paddingLeft: '4px'
              }}>
                {/* Row 1: Empty cells and 7sp header */}
                <span></span>
                <span></span>
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7sp</span>
                {/* Row 2: Mortician text and dot */}
                <div style={{ 
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left',
                  paddingRight: '8px',
                  lineHeight: '1.2',
                  gridColumn: '1 / 4'
                }}>
                  <b><i style={{ color: '#0033cf', fontSize: '1em' }}>Mortician.</i></b> You have spent a lot of time around corpses and remains of the living. As such, you have a good intuition about the various causes of death and other topics that include the deceased. Gain an advantage on related skill rolls.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(necroPerksSkillsDots, setNecroPerksSkillsDots, 0, [7], 'necroPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: necroPerksSkillsDots[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {subclass === 'Poisoner' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature Section */}
          <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <span>
              <b><i style={{ color: '#cf7600', fontSize: '1em' }}>Backstabber.</i></b> You are <b>[</b><i>{poisonerChemicalImmunityDots[0] ? 'Immune' : 'Resistant'}</i><b>]</b> to <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
                Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
              </u></b> and <b>[</b><i>{poisonerToxicImmunityDots[0] ? 'Immune' : 'Resistant'}</i><b>]</b> to <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}> 
                Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
              </u></b>. Additionally, when you <b><i style={{ color: '#351c75' }}>Strike</i></b> against a target's <i>Rear Arc</i>, you inflict <b>[</b>
                {poisonerSpikeInflictToxicDots[0] ? (
                  <span>
                    <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#02b900', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center' }}>
                      Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
                    </u></b><b>)</b>
                  </span>
                ) : <b> - </b>}<b>] </b>
                and gain +1d6 Damage for each <i>Chem Token</i> you have.
            </span>
          </div>
          
          {/* Feature XP progression table */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>              
              <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span></span>
            <span></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <i><b>Spike</b></i> <b>(<u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
              Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u>)</b></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(poisonerSpikeInflictToxicDots, setPoisonerSpikeInflictToxicDots, 0, [5], 'poisonerSpikeInflictToxicDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: poisonerSpikeInflictToxicDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            <span></span>
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span></span>
            <span></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
              Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Immunity</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(poisonerChemicalImmunityDots, setPoisonerChemicalImmunityDots, 0, [5], 'poisonerChemicalImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: poisonerChemicalImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            <span></span>
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span></span>
            <span></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
              Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Immunity</i></span>
            
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(poisonerToxicImmunityDots, setPoisonerToxicImmunityDots, 0, [5], 'poisonerToxicImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: poisonerToxicImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i style={{ color: '#cf7600', fontSize: '1em' }}>Toxic Takedown</i></b> <i style={{ color: '#cf7600', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{4 - poisonerTechniqueCooldownDots.filter(Boolean).length}]</b>).</i> You spend any number of <i>Chem Tokens</i> and choose an adjacent creature. You inflict <b>[{poisonerTechnique2EffectsPerTokenDots[0] ? '2' : '1'}]</b> of the following conditions for each <i>Chem Token</i> spent: <b><i>Blind</i></b>, <i><b>Spike</b></i> <b>(</b><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
                Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
              </u></b><b>)</b> <i>(reroll on a </i><b>[{poisonerTechniqueExtraSpikeReroll4Dots[0] ? '4' : poisonerTechniqueExtraSpikeReroll5Dots[0] ? '5' : '6'}]</b>+<i>)</i>, <i><b>Confuse</b></i>, <i><b>Mesmerize</b></i>, <i><b>Restrain</b></i>. You can choose the same effect <b>[{poisonerTechniqueSameEffectMultipleDots[0] ? 'multiple' : '1'}]</b> time(s).
            </div>
            
            <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>  
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
                <span></span>
                <span></span>
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Extra <i><b>Spike</b></i> Damage reroll on 5+</span>
                
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => {
                      if (poisonerTechniqueExtraSpikeReroll5Dots[0] && poisonerTechniqueExtraSpikeReroll4Dots[0]) {
                        setNotice("Cannot unselect reroll on 5+ while reroll on 4+ is selected!");
                        return;
                      }
                      handleDotClick(poisonerTechniqueExtraSpikeReroll5Dots, setPoisonerTechniqueExtraSpikeReroll5Dots, 0, [7], 'poisonerTechniqueExtraSpikeReroll5Dots');
                    }}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: poisonerTechniqueExtraSpikeReroll5Dots[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              </div>
              
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>  
              <span></span>
              <span></span>
                              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
<span></span>
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', paddingLeft: '30px' }}> Extra <i><b>Spike</b></i> Damage reroll on 4+</span>            
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷</span>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => {
                      if (!poisonerTechniqueExtraSpikeReroll5Dots[0]) {
                        setNotice("Must get reroll on 5+ first!");
                        return;
                      }
                      handleDotClick(poisonerTechniqueExtraSpikeReroll4Dots, setPoisonerTechniqueExtraSpikeReroll4Dots, 0, [12], 'poisonerTechniqueExtraSpikeReroll4Dots');
                    }}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: poisonerTechniqueExtraSpikeReroll4Dots[0] ? '#000' : '#fff',
                      cursor: poisonerTechniqueExtraSpikeReroll5Dots[0] ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              </div>
              
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                <span></span>
                <span></span>
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Same effect multiple times</span>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(poisonerTechniqueSameEffectMultipleDots, setPoisonerTechniqueSameEffectMultipleDots, 0, [8], 'poisonerTechniqueSameEffectMultipleDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: poisonerTechniqueSameEffectMultipleDots[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              </div>
              
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>18xp</span>
                <span></span>
                <span></span>
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>2 effects per <i>Chem Token</i></span>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(poisonerTechnique2EffectsPerTokenDots, setPoisonerTechnique2EffectsPerTokenDots, 0, [18], 'poisonerTechnique2EffectsPerTokenDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: poisonerTechnique2EffectsPerTokenDots[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              </div>
              
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                <span></span>
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
                {[0,1].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span
                      onClick={() => handleDotClick(poisonerTechniqueCooldownDots, setPoisonerTechniqueCooldownDots, idx, [5, 8], 'poisonerTechniqueCooldownDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: poisonerTechniqueCooldownDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || poisonerTechniqueCooldownDots[0]) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Attack Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ marginBottom: '4px' }}>
                <b><i><span style={{ color: '#000' }}>Secondary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> <i>(Cooldown</i> <b>[{4 - poisonerAttackCooldownDots.filter(Boolean).length}]</b><i>).</i>
              </div>
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
                  defaultValue="Noxious Fumes"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== "Noxious Fumes") {
                      setPendingNoxiousFume(value);
                      e.target.value = "Noxious Fumes"; // Reset dropdown
                    }
                  }}
                >
                  <option disabled style={{ fontWeight: 'bold' }}>Noxious Fumes</option>
                  <option style={{ fontWeight: 'bold' }}>Brainstorm</option>
                  <option style={{ fontWeight: 'bold' }}>Color Spray</option>
                </select>
                {/* Buy/Add dialog for Noxious Fume selection */}
                {pendingNoxiousFume && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {pendingNoxiousFume}
                      <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                        {pendingNoxiousFume === 'Brainstorm' && '200c'}
                        {pendingNoxiousFume === 'Color Spray' && '220c'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        // Determine cost
                        let cost = 0;
                        if (pendingNoxiousFume === 'Brainstorm') cost = 200;
                        else if (pendingNoxiousFume === 'Color Spray') cost = 220;
                        // Check credits
                        if (credits < cost) {
                          setNotice('Not enough credits!');
                          return;
                        }
                        // Atomic operation: update both noxious fumes and credits
                        const newNoxiousFumes = [...selectedNoxiousFumes, pendingNoxiousFume];
                        const newCredits = credits - cost;
                        setSelectedNoxiousFumes(newNoxiousFumes);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            noxiousFumes: newNoxiousFumes,
                            credits: newCredits
                          });
                        }
                        
                        // Update the LevelUp component's credits state (no auto-save)
                        onCreditsChange?.(-cost);
                        setPendingNoxiousFume("");
                      }}
                    >Buy</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        const newNoxiousFumes = [...selectedNoxiousFumes, pendingNoxiousFume];
                        setSelectedNoxiousFumes(newNoxiousFumes);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            noxiousFumes: newNoxiousFumes
                          });
                        }
                        
                        setPendingNoxiousFume("");
                      }}
                    >Add</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => setPendingNoxiousFume("")}
                    >Cancel</button>
                    </div>
                  </div>
                )}
                <div style={{ marginTop: '2px' }}>
                  {selectedNoxiousFumes.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                      {selectedNoxiousFumes.map((fume, index) => (
                        <span key={fume + index} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {fume}
                          <button
                            onClick={() => {
                              const newNoxiousFumes = selectedNoxiousFumes.filter((_, i) => i !== index);
                              setSelectedNoxiousFumes(newNoxiousFumes);
                              if (sheet && onAutoSave) {
                                onAutoSave({
                                  noxiousFumes: newNoxiousFumes
                                });
                              }
                            }}
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${fume}`}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>


              <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span>
                  <b><u>Range</u></b> Self <br />
                </span>
                  <span style={{ textAlign: 'right', minWidth: '80px' }}>
                    <b><u>Crit</u></b> <b>[{18 - poisonerAttackCritDots.filter(Boolean).length}]</b>+
                  </span>
              </div>
              <b><u>Target</u></b> <i>AoE</i> <b>[{2 + poisonerAttackAoEDots.filter(Boolean).length}]</b>hx-radius <br />
              <b><u>Damage</u></b> <b>[{1 + poisonerAttackDamageDots.filter(Boolean).length}]</b>d4, <i>Dangerous Terrain</i> <i>(affects <b><span style={{ color: '#38761d' }}>Fly</span></b>)</i> <br />
              <b><u>Crit Effect</u></b> <b>[{1 + poisonerAttackDamageDots.filter(Boolean).length}]</b>d4
              </div>




            </div>
            
            <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                <span></span>
                <span></span>
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx-radius <i>AoE</i></span>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(poisonerAttackAoEDots, setPoisonerAttackAoEDots, 0, [6], 'poisonerAttackAoEDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: poisonerAttackAoEDots[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              </div>
              
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                <span></span>
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Damage die</span>
                {[0,1].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span
                      onClick={() => handleDotClick(poisonerAttackDamageDots, setPoisonerAttackDamageDots, idx, [5, 8], 'poisonerAttackDamageDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: poisonerAttackDamageDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || poisonerAttackDamageDots[0]) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
              </div>
              
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit</span>
                {[0,1,2].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span
                      onClick={() => handleDotClick(poisonerAttackCritDots, setPoisonerAttackCritDots, idx, [3, 5, 8], 'poisonerAttackCritDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: poisonerAttackCritDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || (idx === 1 && poisonerAttackCritDots[0]) || (idx === 2 && poisonerAttackCritDots[1])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
              </div>
              
           <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px ',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
              }}>
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                <span></span>
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
                {[0,1].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span
                      onClick={() => handleDotClick(poisonerAttackCooldownDots, setPoisonerAttackCooldownDots, idx, [4, 6], 'poisonerAttackCooldownDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: poisonerAttackCooldownDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || poisonerAttackCooldownDots[0]) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Perks Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ marginBottom: '8px' }}>
                <b>Skills.</b> <i>Thievery</i> +2
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 24px 24px 24px',
                gridTemplateRows: 'auto auto',
                columnGap: '6px',
                rowGap: '2px',
                alignItems: 'start',
                marginTop: '-12px',
                marginBottom: '2px',
                width: '100%',
                paddingLeft: '4px'
              }}>
                {/* Row 1: Empty cells and 9sp header */}
                <span></span>
                <span></span>
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9sp</span>
                {/* Row 2: Venom Master text and dot */}
                <div style={{ 
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left',
                  paddingRight: '8px',
                  lineHeight: '1.2',
                  gridColumn: '1 / 4'
                }}>
                  <b><i style={{ color: '#cf7600', fontSize: '1em' }}>Venom Master.</i></b> You excel in the art of poisoning, and can create a multitude of poisons from the basic to the rare and exotic. Gain an <i>advantage</i> on skill rolls related to finding, identifying, creating and using poisons.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(poisonerVenomMasterDots, setPoisonerVenomMasterDots, 0, [9], 'poisonerVenomMasterDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: poisonerVenomMasterDots[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelUpSubclassesChemist;
