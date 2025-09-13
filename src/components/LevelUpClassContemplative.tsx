import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { saveCharacterSheet } from "../utils/storage";



// Default dots structure for Contemplative class
const defaultContemplativeDots: boolean[][] = [
  [false],      // Neural Immunity (1 dot)
  [false],      // +1 Strike (1 dot)
  [false],      // Strike single target multiple times (1 dot)
  [false, false, false], // Technique +1hx (3 dots)
  [false, false],        // Technique -1 Cooldown (2 dots)
  [false, false, false], // Primary Attack Repeat +1 (3 dots)
  [false, false, false], // Primary Attack Increase die size (3 dots)
  [false, false, false], // Primary Attack +1 Crit (3 dots)
  [false, false],        // Secondary Attack Increase die size (2 dots)
  [false, false, false], // Secondary Attack +1 Damage die (3 dots)
  [false, false, false], // Secondary Attack +1 Crit (3 dots)
  [false, false],        // Secondary Attack -1 Cooldown (2 dots)
  [false],               // Perk: Inherent Telepath (1 dot)
];

type LevelUpClassContemplativeProps = {
  sheet: CharacterSheet | null;
  charClass: string;
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

const LevelUpClassContemplative: React.FC<LevelUpClassContemplativeProps> = ({ 
  sheet, 
  charClass,
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
  
    // Local state for class card dots (Contemplative)
    const [classCardDots, setClassCardDots] = useState<boolean[][]>(() => {
      if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && sheet.classCardDots.length > 0) {
        return sheet.classCardDots.map(row => Array.isArray(row) ? [...row] : []);
      }
      return defaultContemplativeDots.map(row => [...row]);
    });
  
    // Helper function to safely access classCardDots array
    const safeGetDotsArray = (index: number): boolean[] => {
      if (!classCardDots || !Array.isArray(classCardDots) || index >= classCardDots.length) {
        return defaultContemplativeDots[index] || [];
      }
      return classCardDots[index] || [];
    };
  
    // Helper function to safely clone classCardDots array
    const safeCloneClassCardDots = (): boolean[][] => {
      if (!classCardDots || !Array.isArray(classCardDots) || classCardDots.length === 0) {
        return defaultContemplativeDots.map(row => [...row]);
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
        <div>
            {/* Feature information when Contemplative is selected */}
            {charClass === "Contemplative" && (
              <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {/* Feature header */}
                <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
                    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                      <b><i style={{ color: '#116372', fontSize: '1em' }}>Psychosomatic Harmony.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>You are <i>Resistant</i> to <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>Neural<img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and can <b><i style={{ color: '#351c75' }}>Strike</i></b> one extra time per turn.</span>
                    </span>
                  </span>
                </div>
                {/* XP progression table - interactive dots */}
                <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 24px',
                    gridTemplateRows: 'repeat(6, auto)',
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
                    {/* Row 2: Neural immunity */}
                    <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                      <b><u style={{ color: '#a929ff' }}>Neural
                        <img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
                      </u></b> <i>Immunity</i>
                    </span>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                      {(() => {
                        const arr = safeGetDotsArray(0);
                        if (arr.length === 0) {
                          return (
                            <span style={{
                              width: 16,
                              height: 16,
                              borderRadius: '50%',
                              border: '2px solid #ddd',
                              background: '#fff',
                              cursor: 'not-allowed'
                            }}></span>
                          );
                        }
                        const idx = 0;
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [5];
                        return (
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
                        );
                      })()}
                    </span>
                    {/* Row 3: 10xp header */}
                    <span></span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
                    {/* Row 4: +1 Strike */}
                    <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 <b><i style={{ color: '#351c75' }}>Strike</i></b></span>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                      {(() => {
                        const arr = safeGetDotsArray(1);
                        const idx = 0;
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [10];
                        return (
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
                        );
                      })()}
                    </span>
                    {/* Row 5: 18xp header */}
                    <span></span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>18xp</span>
                    {/* Row 6: Can Strike a single target multiple times */}
                    <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>Can <b><i style={{ color: '#351c75' }}>Strike</i></b> a single target multiple times</span>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                      {(() => {
                        const arr = safeGetDotsArray(2);
                        const idx = 0;
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [18];
                        return (
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
                        );
                      })()}
                    </span>
                  </div>
                </div>
                {/* Technique section */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <i style={{ color: '#116372' }}><b>Swift Reaction</b> (Cooldown 4).</i> Until the beginning of the next round, you and all allies within 3hx can <b><i style={{ color: '#38761d' }}>Move</i></b> their <b><i style={{ color: '#38761d' }}>Speed</i></b> whenever they take Damage from an <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>. You can <b><i style={{ color: '#351c75' }}>Strike</i></b> during this <b><i style={{ color: '#38761d' }}>Movement</i></b>.
                  </div>
                  {/* XP progression table for Technique */}
                  <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
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
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                      {/* Row 2: +1hx dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(3);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [4, 5, 6];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
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
                          </span>
                        );
                      })}
                      {/* Row 3: 4xp 7xp header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
                      <span></span>
                      {/* Row 4: -1 Cooldown dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>-1 Cooldown</span>
                      {[0,1].map(idx => {
                        const arr = safeGetDotsArray(4);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [4, 7];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
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
                          </span>
                        );
                      })}
                      <span></span>
                    </div>
                  </div>
                </div>
                {/* Attack section */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <b><i>Primary <span style={{ color: '#990000' }}>Attack</span>.</i></b><br />
                    <i>Focuses.</i> 10hx Range, Single Target, 18+ Crit, 1d6 Damage.
                  </div>
                  {/* XP progression table for Primary Attack */}
                  <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 24px 24px 24px',
                      gridTemplateRows: 'repeat(6, auto)',
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
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>15xp</span>
                      {/* Row 2: Repeat +1 dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>Repeat +1</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(5);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [6, 9, 15];
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
                      {/* Row 3: 5xp 8xp 15xp header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>15xp</span>
                      {/* Row 4: Increase die size dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>Increase die size</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(6);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [5, 8, 15];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = 0; j <= idx; ++j) newDots[6][j] = true;
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = idx; j < arr.length; ++j) newDots[6][j] = false;
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
                      {/* Row 5: 2xp 4xp 6xp header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>2xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                      {/* Row 6: +1 Crit dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(7);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [2, 4, 6];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = 0; j <= idx; ++j) newDots[7][j] = true;
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = idx; j < arr.length; ++j) newDots[7][j] = false;
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
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', marginTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <b><i>Secondary <span style={{ color: '#990000' }}>Attack</span> (Cooldown 4).</i></b><br />
                    <i>Disciplines.</i> 1hx Range, Single Target, 18+ Crit, 2d8 Damage.
                  </div>
                  {/* XP progression table for Secondary Attack */}
                  <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 24px 24px 24px',
                      gridTemplateRows: 'repeat(8, auto)',
                      columnGap: '6px',
                      rowGap: '2px',
                      alignItems: 'start',
                      marginBottom: '2px',
                      width: '100%',
                      paddingLeft: '4px'
                    }}>
                      {/* Row 1: 5xp 8xp header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span></span>
                      {/* Row 2: Increase die size dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>Increase die size</span>
                      {[0,1].map(idx => {
                        const arr = safeGetDotsArray(8);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [5, 8];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = 0; j <= idx; ++j) newDots[8][j] = true;
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = idx; j < arr.length; ++j) newDots[8][j] = false;
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
                      {/* Row 3: empty row */}
                      <span></span>
                      <span></span>
                      {/* Row 4: 5xp 8xp 15xp header */}
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>15xp</span>
                      {/* Row 5: +1 Damage die header (but we'll only show 2 dots) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Damage die</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(9);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [5, 8, 15];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = 0; j <= idx; ++j) newDots[9][j] = true;
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = idx; j < arr.length; ++j) newDots[9][j] = false;
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
                      {/* Row 6: 2xp 4xp 6xp header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>2xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                      {/* Row 7: +1 Crit dots (2 dots) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(10);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [2, 4, 6];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = 0; j <= idx; ++j) newDots[10][j] = true;
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = idx; j < arr.length; ++j) newDots[10][j] = false;
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
                      {/* Row 8: 3xp 5xp header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      {/* Row 9: -1 Cooldown dots (2 dots) */}
                      <span></span>
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>-1 Cooldown</span>
                      {[0,1].map(idx => {
                        const arr = safeGetDotsArray(11);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [3, 5];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = 0; j <= idx; ++j) newDots[11][j] = true;
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = idx; j < arr.length; ++j) newDots[11][j] = false;
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
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <i><b>Skills.</b> Awareness</i> +2
                  </div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
                        <b><i style={{ color: '#116372' }}>Inherent Telepath.</i></b> You can communicate telepathically one-way with any language-speaking creature within 10hx of you.
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
                        {/* Row 1: 11sp */}
                        <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11sp</span>
                        {/* Row 2: dot (interactive) */}
                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                          {(() => {
                            const arr = safeGetDotsArray(12);
                            const idx = 0;
                            const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                            const rightmostChecked = arr.lastIndexOf(true);
                            const canUncheck = arr[idx] && idx === rightmostChecked;
                            return (
                              <span
                                onClick={() => {
                                  if (!arr[idx] && canCheck) {
                                    const newDots = safeCloneClassCardDots();
                                    if (newDots[12]) {
                                      for (let j = 0; j <= idx; ++j) newDots[12][j] = true;
                                    }
                                    persistClassCardDots(newDots, 11);
                                  } else if (arr[idx] && canUncheck) {
                                    const newDots = safeCloneClassCardDots();
                                    if (newDots[12]) {
                                      for (let j = idx; j < arr.length; ++j) newDots[12][j] = false;
                                    }
                                    persistClassCardDots(newDots, -11);
                                  }
                                }}
                                style={{
                                  width: '15px',
                                  height: '15px',
                                  border: '2px solid #000',
                                  borderRadius: '50%',
                                  display: 'block',
                                  background: arr[idx] ? '#000' : '#fff',
                                  cursor: 'pointer',
                                  transition: 'background 0.2s'
                                }}
                              ></span>
                            );
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

    

          </div>
        
      );
};

export default LevelUpClassContemplative;