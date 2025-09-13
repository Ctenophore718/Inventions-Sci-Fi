import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { saveCharacterSheet } from "../utils/storage";

// Default Commander Dots structure: 10 arrays for each progression row
const defaultCommanderDots: boolean[][] = [
  [false, false, false], // +1hx (class card)
  [false],               // Includes Attacks (class card)
  [],                    // (unused row for class card)
  [false, false, false], // +1hx (technique)
  [false, false, false], // +1 ally (technique)
  [false, false],        // -1 Cooldown (technique)
  [false, false, false], // +1 Damage die (attack)
  [false, false, false], // +1 Crit (attack)
  [false, false],        // +1 Damage die (strike)
  [false],               // Natural Leader (perk)
];

type LevelUpClassCommanderProps = {
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

const LevelUpClassCommander: React.FC<LevelUpClassCommanderProps> = ({ 
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
  
    // Local state for class card dots (Commander)
    const [classCardDots, setClassCardDots] = useState<boolean[][]>(() => {
      if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && sheet.classCardDots.length > 0) {
        return sheet.classCardDots.map(row => Array.isArray(row) ? [...row] : []);
      }
      return defaultCommanderDots.map(row => [...row]);
    });
  
    // Helper function to safely access classCardDots array
    const safeGetDotsArray = (index: number): boolean[] => {
      if (!classCardDots || !Array.isArray(classCardDots) || index >= classCardDots.length) {
        return defaultCommanderDots[index] || [];
      }
      return classCardDots[index] || [];
    };
  
    // Helper function to safely clone classCardDots array
    const safeCloneClassCardDots = (): boolean[][] => {
      if (!classCardDots || !Array.isArray(classCardDots) || classCardDots.length === 0) {
        return defaultCommanderDots.map(row => [...row]);
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
            {/* Feature information when Commander is selected */}
            {charClass === "Commander" && (
              <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {/* Feature header */}
                <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
                    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                      <b><i style={{ color: '#717211', fontSize: '1em' }}>Stay Sharp.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>At the beginning of the round, you and allies within 3hx of you can remove an additional <i>Cooldown Token</i> from one <i>inactive</i> <b><i style={{ color: '#bf9000' }}>Technique</i></b> of their choice.</span>
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
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
                    {/* Row 2: +1hx dots (interactive) */}
                    <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx</span>
                    {[0,1,2].map(idx => {
                      const arr = safeGetDotsArray(0);
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
                      // XP cost for each dot (3xp, 6xp, 9xp)
                      const xpCosts = [3, 6, 9];
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
                    {/* Row 3: 10xp header (styled like other XP headers) */}
                    <span></span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
                    <span></span>
                    <span></span>
                    {/* Row 4: Includes Attacks label and dot (dot under 3xp) */}
                    <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>Includes <b><i style={{ color: '#990000' }}>Attacks</i></b></span>
                    {[0].map(idx => {
                      const arr = safeGetDotsArray(1);
                      const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                      // Only allow unchecking the rightmost checked dot
                      // XP cost for this dot (10xp)
                      const xpCosts = [10];
                      const rightmostChecked = arr.lastIndexOf(true);
                      const canUncheck = arr[idx] && idx === rightmostChecked;
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
                    <i style={{ color: '#717211' }}><b>Combat Delegation</b> (Cooldown 4).</i> One ally within 5hx that can see and/or hear you gains an extra <i>Action</i>.
                  </div>
                  {/* XP progression table for Technique */}
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
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      {/* Row 2: +1hx dots (interactive) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(3);
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
                        // XP cost for each dot (3xp, 5xp, 8xp)
                        const xpCosts = [3, 5, 8];
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
                      {/* Row 3: XP header for +1 ally */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>14xp</span>
                      {/* Row 3: +1 ally dots (interactive) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 ally</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(4);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot (6xp, 10xp, 14xp)
                        const xpCosts = [6, 10, 14];
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
                      {/* Row 4: -1 Cooldown dots (interactive) */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
                      <span></span>
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>-1 <i>Cooldown</i></span>
                      {[0,1].map(idx => {
                        const arr = safeGetDotsArray(5);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot (4xp, 7xp)
                        const xpCosts = [4, 7];
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
                    </div>
                  </div>
                </div>
                {/* Attack section */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <b><i>Primary <span style={{ color: '#990000' }}>Attack</span>.</i></b><br /> <i>Rifles.</i> 10hx Range, single target, 18+ Crit, 1d6 Damage.
                  </div>
                  {/* XP progression table for Attack */}
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
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>15xp</span>
                      {/* Row 2: +1 Damage die dots (interactive) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Damage die</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(6);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot (5xp, 8xp, 15xp)
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
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>2xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                      {/* Row 3: +1 Crit dots (interactive) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(7);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot (2xp, 4xp, 6xp)
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
                </div>
                {/* Strike section */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <b><i><span style={{ color: '#351c75' }}>Strike</span> Damage.</i></b> 1d6.
                  </div>
                  {/* XP progression table for Strike */}
                  <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 24px 24px',
                      gridTemplateRows: 'repeat(3, auto)',
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
                      {/* Row 2: +1 Damage die dots (interactive) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Damage die</span>
                      {[0,1].map(idx => {
                        const arr = safeGetDotsArray(8);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot (6xp, 10xp)
                        const xpCosts = [6, 10];
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
                    </div>
                  </div>
                </div>
                {/* Perks section */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <i><b>Skills.</b> Diplomacy</i> +2
                  </div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
                        <b><i style={{ color: '#717211' }}>Natural Leader.</i></b> You are inherently adept at leading others and getting them to both trust and follow you. Gain an advantage on related skill rolls.
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
                        {/* Row 1: 9sp */}
                        <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9sp</span>
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
                                    if (newDots[9]) {
                                      for (let j = 0; j <= idx; ++j) newDots[9][j] = true;
                                    }
                                    persistClassCardDots(newDots, 9);
                                  } else if (arr[idx] && canUncheck) {
                                    const newDots = safeCloneClassCardDots();
                                    if (newDots[9]) {
                                      for (let j = idx; j < arr.length; ++j) newDots[9][j] = false;
                                    }
                                    persistClassCardDots(newDots, -9);
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

export default LevelUpClassCommander;