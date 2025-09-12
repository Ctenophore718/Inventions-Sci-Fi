import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { saveCharacterSheet } from "../utils/storage";
import { generateChemicalReactionJSX } from "../utils/chemistFeatures";

type LevelUpChemistProps = {
  sheet: CharacterSheet | null;
  subclass: string;
  onXpSpChange?: (xpDelta: number, spDelta: number) => void;
  xpTotal: number;
  spTotal: number;
  xpSpent: number;
  spSpent: number;
  setXpSpent: (xp: number) => void;
  setSpSpent: (sp: number) => void;
  setNotice: (notice: string) => void;
};

const LevelUpChemist: React.FC<LevelUpChemistProps> = ({ 
  sheet, 
  subclass, 
  onXpSpChange,
  xpTotal,
  spTotal, 
  xpSpent,
  spSpent,
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
  const [classCardDots, setClassCardDots] = useState<boolean[][]>(() => {
    if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && sheet.classCardDots.length > 0) {
      return sheet.classCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    return defaultChemistDots.map(row => [...row]);
  });

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
  
  // Independent state for Anatomist dots - completely separate from any other component
  const [anatomistFeatureDots, setAnatomistFeatureDots] = useState<boolean[]>([false]); // 1 dot for Feature
  const [anatomistTechniqueRangeDots, setAnatomistTechniqueRangeDots] = useState<boolean[]>([false, false, false]); // 3 dots for +1hx
  const [anatomistTechniqueStrikeDamageDots, setAnatomistTechniqueStrikeDamageDots] = useState<boolean[]>([false]); // 1 dot for +1d6 Strike Damage per Token
  const [anatomistTechniqueStrikeDots, setAnatomistTechniqueStrikeDots] = useState<boolean[]>([false]); // 1 dot for +1 Strike per Token
  const [anatomistTechniqueCooldownDots, setAnatomistTechniqueCooldownDots] = useState<boolean[]>([false, false]); // 2 dots for -1 Cooldown
  const [anatomistAttackDamageDots, setAnatomistAttackDamageDots] = useState<boolean[]>([false, false, false]); // 3 dots for +1 Damage die
  const [anatomistAttackCritDots, setAnatomistAttackCritDots] = useState<boolean[]>([false, false, false]); // 3 dots for +1 Crit
  const [anatomistAttackCooldownDots, setAnatomistAttackCooldownDots] = useState<boolean[]>([false, false]); // 2 dots for -1 Cooldown
  const [anatomistStrikeDots, setAnatomistStrikeDots] = useState<boolean[]>([false]); // 1 dot for heal Strike amount
  const [anatomistSurgeonDots, setAnatomistSurgeonDots] = useState<boolean[]>([false]); // 1 dot for Surgeon perk

  // Helper function to handle dot clicking with sequential requirement
  const handleDotClick = (
    currentArray: boolean[], 
    setArray: React.Dispatch<React.SetStateAction<boolean[]>>, 
    index: number, 
    xpCosts: number[]
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
      setArray(newArray);
      onXpSpChange?.(xpDelta, 0);
    }
  };

  // Helper function to handle SP dots (for Surgeon perk)
  const handleSpDotClick = (
    currentArray: boolean[], 
    setArray: React.Dispatch<React.SetStateAction<boolean[]>>, 
    index: number, 
    spCosts: number[]
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
    
    setArray(newArray);
    onXpSpChange?.(0, spDelta);
  };
  
  return (
    <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      {/* Main Chemist Class Content */}
      <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
        {/* Feature header */}
        <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
          <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateChemicalReactionJSX(sheet?.classCardDots)}
            </span>
          </span>
        </div>
        {/* XP progression table - interactive dots */}
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
            {/* Row 1: XP header */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
            <span></span>
            {/* Row 2: +1 Chem Token max dots (interactive) */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 <i>Chem Token</i> max</span>
            {[0,1].map(idx => {
                const arr = safeGetDotsArray(0);
              // Add null check to prevent crashes
              if (!arr || !Array.isArray(arr) || arr.length === 0) {
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      border: '2px solid #ddd',
                      background: '#fff',
                      cursor: 'not-allowed'
                    }}></span>
                  </span>
                );
              }
              const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
              const rightmostChecked = arr.lastIndexOf(true);
              const canUncheck = arr[idx] && idx === rightmostChecked;
              // XP cost for each dot (3xp, 5xp)
              const xpCosts = [3, 5];
              return (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => {
                      if (!arr[idx] && canCheck) {
                        const newDots = safeCloneClassCardDots();
                        for (let j = 0; j <= idx; ++j) newDots[0][j] = true;
                        let delta = 0;
                        for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                        persistClassCardDots(newDots, 0, delta);
                      } else if (arr[idx] && canUncheck) {
                        const newDots = safeCloneClassCardDots();
                        for (let j = idx; j < arr.length; ++j) newDots[0][j] = false;
                        let delta = 0;
                        for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                        persistClassCardDots(newDots, 0, delta);
                      }
                    }}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: arr[idx] ? '#000' : '#fff',
                      cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              );
            })}
            <span></span>
            {/* Row 3: XP header (5xp 8xp 11xp) */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>
            {/* Row 4: +2 Crit dots (interactive) */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+2 Crit</span>
            {[0,1,2].map(idx => {
              const arr = safeGetDotsArray(1);
              const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
              const rightmostChecked = arr.lastIndexOf(true);
              const canUncheck = arr[idx] && idx === rightmostChecked;
              // XP cost for each dot (5xp, 8xp, 11xp)
              const xpCosts = [5, 8, 11];
              return (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => {
                      if (!arr[idx] && canCheck) {
                        const newDots = safeCloneClassCardDots();
                        for (let j = 0; j <= idx; ++j) newDots[1][j] = true;
                        let delta = 0;
                        for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                        persistClassCardDots(newDots, 0, delta);
                      } else if (arr[idx] && canUncheck) {
                        const newDots = safeCloneClassCardDots();
                        for (let j = idx; j < arr.length; ++j) newDots[1][j] = false;
                        let delta = 0;
                        for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                        persistClassCardDots(newDots, 0, delta);
                      }
                    }}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: arr[idx] ? '#000' : '#fff',
                      cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              );
            })}
            <span></span>
            <span></span>
          </div>
        </div>
        {/* Technique section */}
        <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <b><i style={{ color: '#721131', fontSize: '1em' }}>Volatile Experiments</i></b> <i style={{ color: '#721131', fontSize: '1em' }}>(Cooldown 4).</i> You spend any number of <i>Chem Tokens</i>. After doing so, you and allies within 3hx of you gain +2 to Crit rolls on <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> for each Token spent until the start of the next round.
          </div>
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            {/* Technique XP/dot grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(10, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              {/* Row 2: +1hx dots (interactive) */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx</span>
              {[0,1,2].map(idx => {
                const arr = safeGetDotsArray(2);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                // XP cost for each dot (3xp, 6xp, 9xp)
                const xpCosts = [3, 6, 9];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[2][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[2][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              {/* Row 3: XP header (7xp in col 2) */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              <span></span>
              {/* Row 4: +1d6 Chemical per Token dot (dot in col 2) */}
              <span style={{ fontSize: '0.98em', color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  +1d6&nbsp;
                  <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
                    Chemical
                    <img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
                  </u></b>
                  &nbsp;per&nbsp;<i>Token</i>
                </span>
              </span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                {(() => {
                  const arr = safeGetDotsArray(3);
                  const idx = 0;
                  const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                  const rightmostChecked = arr.lastIndexOf(true);
                  const canUncheck = arr[idx] && idx === rightmostChecked;
                  // XP cost for this dot (7xp)
                  const xpCosts = [7];
                  return (
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[3][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[3][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  );
                })()}
              </span>
              <span></span>
              <span></span>
              {/* Row 5: XP header (6xp in col 2) */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span></span>
              <span></span>
              {/* Row 6: +1hx Range per Token dot (dot in col 2) */}
              <span style={{ fontSize: '0.98em', color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                +1hx Range per <i>Token</i>
              </span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                {(() => {
                  const arr = safeGetDotsArray(4);
                  const idx = 0;
                  const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                  const rightmostChecked = arr.lastIndexOf(true);
                  const canUncheck = arr[idx] && idx === rightmostChecked;
                  // XP cost for this dot (6xp)
                  const xpCosts = [6];
                  return (
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[4][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[4][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  );
                })()}
              </span>
              <span></span>
              <span></span>
              {/* Row 7: XP header (5xp col 2, 8xp col 3) */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span></span>
              {/* Row 8: -1 Cooldown dots (dot in col 2 and col 3) */}
              <span style={{ fontSize: '0.98em', color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                -1 <i>Cooldown</i>
              </span>
              {[0,1].map(idx => {
                const arr = safeGetDotsArray(5);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                // XP cost for each dot (5xp, 8xp)
                const xpCosts = [5, 8];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[5][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[5][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              <span></span>
            </div>
          </div>
        </div>
        {/* Attack section */}
        <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b>.<br/>
            <i>Dart Guns.</i> 8hx Range, Single Target, 18+ Crit, 1d6 Damage.
          </div>
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
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
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              {/* Row 2: Increase die size dots (interactive) */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>Increase die size</span>
              {[0,1,2].map(idx => {
                const arr = safeGetDotsArray(6);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                // XP cost for each dot
                const xpCosts = [5, 8, 12];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[6][j] = true;
                          // Add up all xp costs for newly checked dots
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[6][j] = false;
                          // Subtract all xp costs for unchecked dots
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              {/* Row 3: XP header (3xp, 5xp, 7xp) */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              {/* Row 4: +1 Crit dots (interactive) */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
              {[0,1,2].map(idx => {
                const arr = safeGetDotsArray(7);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                // XP cost for each dot
                const xpCosts = [3, 5, 7];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[7][j] = true;
                          // Add up all xp costs for newly checked dots
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[7][j] = false;
                          // Subtract all xp costs for unchecked dots
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        {/* Strike section */}
        <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <b><i><span style={{ color: '#351c75' }}>Strike</span> Damage.</i></b> 1d6 <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
              Chemical
              <img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
            </u></b>.
          </div>
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>18xp</span>
              {/* Row 2: +1 Damage die dots (interactive, with xpSpent) */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Damage die</span>
              {[0,1,2].map(idx => {
                const arr = safeGetDotsArray(8);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                // XP cost for each dot
                const xpCosts = [6, 10, 18];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[8][j] = true;
                          // Add up all xp costs for newly checked dots
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneClassCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[8][j] = false;
                          // Subtract all xp costs for unchecked dots
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistClassCardDots(newDots, 0, delta);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        {/* Perks section */}
        <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Investigation</i> +2
          </div>
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
                <b><i style={{ color: '#721131' }}>Chemical Concoctions.</i></b> You can create myriad concoctions. When doing so, choose a skill. Upon drinking a concoction, the imbiber gains an advantage on the next skill roll of your choice. You can create up to 3 concoctions per day which each last until the end of the day.
              </span>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '24px',
                gridTemplateRows: 'repeat(2, auto)',
                alignItems: 'start',
                justifyItems: 'center',
                minWidth: '24px',
                marginLeft: '4px'
              }}>
                {/* Row 1: 10sp */}
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10sp</span>
                {/* Row 2: dot (interactive) */}
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                  {(() => {
                    const arr = safeGetDotsArray(9);
                    const idx = 0;
                    const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                    const rightmostChecked = arr.lastIndexOf(true);
                    const canUncheck = arr[idx] && idx === rightmostChecked;
                    return (
                      <span
                        onClick={() => {
                          if (!arr[idx] && canCheck) {
                            const newDots = safeCloneClassCardDots();
                            for (let j = 0; j <= idx; ++j) newDots[9][j] = true;
                            persistClassCardDots(newDots, 10);
                          } else if (arr[idx] && canUncheck) {
                            const newDots = safeCloneClassCardDots();
                            for (let j = idx; j < arr.length; ++j) newDots[9][j] = false;
                            persistClassCardDots(newDots, -10);
                          }
                        }}
                        style={{
                          width: '15px',
                          height: '15px',
                          border: '2px solid #000',
                          borderRadius: '50%',
                          display: 'block',
                          background: arr[idx] ? '#000' : '#fff',
                          cursor: (canCheck && !arr[idx]) || canUncheck ? 'pointer' : 'not-allowed',
                          transition: 'background 0.2s'
                        }}
                      ></span>
                    );
                  })()}
                </span>
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          </div>
        </div>
      </div>
      
      {/* Anatomist Subclass Content */}
      {subclass === 'Anatomist' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header - Chemist style */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                <b><i style={{ color: '#66cf00', fontSize: '1em' }}>Anatomical Precision.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>You and all allies within 3hx of you ignore any Damage Resistances and/or Immunities.</span>
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
                onClick={() => handleDotClick(anatomistFeatureDots, setAnatomistFeatureDots, 0, [6])}
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
          </div>

          {/* Technique Section - Chemist style */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i style={{ color: '#66cf00', fontSize: '1em' }}>The "Good Stuff"</i></b> <i style={{ color: '#66cf00', fontSize: '1em' }}>(Cooldown 4).</i> You spend any number of <i>Chem Tokens</i>. After doing so, you and allies within 1hx of you gain +1d6 Strike Damage and can Move +2hx for each Chem Token spent until the start of the next round.
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '8px', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>14xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistTechniqueRangeDots, setAnatomistTechniqueRangeDots, idx, [5, 9, 14])}
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
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: '8px', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>18xp</span>
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d6 Strike Damage per Token</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(anatomistTechniqueStrikeDamageDots, setAnatomistTechniqueStrikeDamageDots, 0, [18])}
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
              <span></span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: '8px', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>18xp</span>
              <span></span>
              <span></span>
              <span></span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Strike per Token</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(anatomistTechniqueStrikeDots, setAnatomistTechniqueStrikeDots, 0, [18])}
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
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', alignItems: 'center', marginBottom: '1rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistTechniqueCooldownDots, setAnatomistTechniqueCooldownDots, idx, [4, 7])}
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
              <b><i>Secondary <span style={{ color: '#990000' }}>Attack.</span></i></b> <br /> <i>Super Serum.</i> 1hx Range, Single Target, 18+ Crit, 1d8 Damage, Auto <b><i>Confuse</i></b>, <i>Chem Token</i>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '8px', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Damage die</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistAttackDamageDots, setAnatomistAttackDamageDots, idx, [4, 6, 9])}
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
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '8px', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>2xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistAttackCritDots, setAnatomistAttackCritDots, idx, [2, 4, 6])}
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
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', alignItems: 'center', marginBottom: '1rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(anatomistAttackCooldownDots, setAnatomistAttackCooldownDots, idx, [3, 5])}
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
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', alignItems: 'center', marginBottom: '1rem' }}>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>14xp</span>

              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Can choose to heal <i><b><span style={{ color: '#351c75' }}>Strike</span></b></i> amount</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(anatomistStrikeDots, setAnatomistStrikeDots, 0, [14])}
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
          <div>
            <div style={{ fontSize: '1em', color: '#000', fontWeight: 'bold', marginBottom: '0.5rem' }}>Perks</div>
            <div style={{ marginBottom: '1rem', fontSize: '0.9em', lineHeight: 1.4 }}>
              <i><b>Skills.</b> Medicine</i> +2
            </div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
                  <b><i style={{ color: '#66cf00' }}>Surgeon.</i></b> You can perform surgery and potentially save a life on the brink of death or otherwise ensure an enemy will be incapacitated for life in a way of your choice. Gain an advantage on related skill rolls to perform the surgery.
                </span>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '24px',
                  gridTemplateRows: 'repeat(1, auto)',
                  alignItems: 'start',
                  marginLeft: '4px'
                }}>
                  <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8sp</span>
                  <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleSpDotClick(anatomistSurgeonDots, setAnatomistSurgeonDots, 0, [8])}
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
        </div>
      )}
      
      {/* TODO: Add other Chemist subclasses (Grenadier, Necro, Poisoner) here */}
      {subclass === 'Grenadier' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          <div style={{ color: '#cf0000', fontSize: '1.2em', fontWeight: 'bold', textAlign: 'center', padding: '20px' }}>
            Grenadier subclass content coming soon...
          </div>
        </div>
      )}
      
      {subclass === 'Necro' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          <div style={{ color: '#0033cf', fontSize: '1.2em', fontWeight: 'bold', textAlign: 'center', padding: '20px' }}>
            Necro subclass content coming soon...
          </div>
        </div>
      )}
      
      {subclass === 'Poisoner' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          <div style={{ color: '#cf7600', fontSize: '1.2em', fontWeight: 'bold', textAlign: 'center', padding: '20px' }}>
            Poisoner subclass content coming soon...
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelUpChemist;
