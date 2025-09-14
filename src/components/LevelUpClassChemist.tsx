import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { saveCharacterSheet } from "../utils/storage";
import { generateChemicalReactionJSX } from "../utils/chemistFeature";
import { generateVolatileExperimentsJSX } from "../utils/chemistTechnique";
import { generateChemistStrikeJSX } from "../utils/chemistStrike";

type LevelUpClassChemistProps = {
  sheet: CharacterSheet | null;
  charClass: string;
  subclass: string;
  onXpSpChange?: (xpDelta: number, spDelta: number) => void;
  onCreditsChange?: (creditsDelta: number) => void;
  xpTotal: number;
  spTotal: number;
  xpSpent: number;
  spSpent: number;
  credits: number;
  setXpSpent: (xp: number) => void;
  setSpSpent: (sp: number) => void;
  setNotice: (notice: string) => void;
};

const LevelUpClassChemist: React.FC<LevelUpClassChemistProps> = ({ 
  sheet, 
  charClass,
  subclass, 
  onXpSpChange,
  onCreditsChange,
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
    const [classCardDots, setClassCardDots] = useState<boolean[][]>(() => {
      if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && sheet.classCardDots.length > 0) {
        return sheet.classCardDots.map(row => Array.isArray(row) ? [...row] : []);
      }
      return defaultChemistDots.map(row => [...row]);
    });
  
  // Local state for selected dart guns
  const [selectedDartGuns, setSelectedDartGuns] = useState<string[]>(() => {
    return sheet?.dartGuns || [];
  });
  // Local state for pending dart gun selection
  const [pendingDartGun, setPendingDartGun] = useState<string>("");
  
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
        // Use current selectedDartGuns state, not captured closure value
        setSelectedDartGuns(currentDartGuns => {
          const updatedSheet = { ...sheet, classCardDots: newDots, spSpent: newSpSpent, xpSpent: newXpSpent, dartGuns: currentDartGuns };
          saveCharacterSheet(updatedSheet);
          return currentDartGuns; // Don't change the state, just use current value
        });
      }
    };

    // Save dart guns to sheet
    const saveDartGuns = (newDartGuns: string[]) => {
      setSelectedDartGuns(newDartGuns);
      if (sheet) {
        const updatedSheet = { 
          ...sheet, 
          dartGuns: newDartGuns,
          // Preserve current credits to avoid race conditions
          credits: credits
        };
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
          {/* Feature information when Chemist is selected */}
          {charClass === "Chemist" && (
            (() => {
              return (
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
                                    console.log('About to set newDots[0][j], newDots:', newDots, 'newDots[0]:', newDots[0], 'idx:', idx);
                                    for (let j = 0; j <= idx; ++j) newDots[0][j] = true;
                                    let delta = 0;
                                    for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                    persistClassCardDots(newDots, 0, delta);
                                  } else if (arr[idx] && canUncheck) {
                                    const newDots = safeCloneClassCardDots();
                                    console.log('About to set newDots[0][j] false, newDots:', newDots, 'newDots[0]:', newDots[0], 'idx:', idx);
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
                        {generateVolatileExperimentsJSX(sheet?.classCardDots)}
                      </div>
                      <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                        {/* Technique XP/dot grid */}
                        {/* 4x10 grid: alternating XP label header rows and feature text/dot rows, with correct XP/dot placement and no borders */}
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
                        <div style={{ marginBottom: '4px' }}>
                          <b><i><span style={{ color: '#000' }}>Primary</span> <span style={{ color: '#990000' }}>Attack</span></i></b>.
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
                            defaultValue="Dart Guns"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value !== "Dart Guns") {
                                setPendingDartGun(value);
                                e.target.value = "Dart Guns"; // Reset dropdown
                              }
                            }}
                          >
                            <option disabled style={{ fontWeight: 'bold' }}>Dart Guns</option>
                            <option style={{ fontWeight: 'bold' }}>Chem Gun</option>
                            <option style={{ fontWeight: 'bold' }}>Happy Pill Pusher</option>
                            <option style={{ fontWeight: 'bold' }}>Sour Juicer</option>
                            <option style={{ fontWeight: 'bold' }}>Prickly Goo</option>
                          </select>
                          {/* Buy/Add dialog for Dart Gun selection */}
                          {pendingDartGun && (
                            <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <div style={{ fontWeight: 'bold' }}>
                                {pendingDartGun}
                                <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                                  {pendingDartGun === 'Chem Gun' && '150c'}
                                  {pendingDartGun === 'Happy Pill Pusher' && '160c'}
                                  {pendingDartGun === 'Sour Juicer' && '160c'}
                                  {pendingDartGun === 'Prickly Goo' && '175c'}
                                </span>
                              </div>
                              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <button
                                style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                                onClick={() => {
                                  // Determine cost
                                  let cost = 0;
                                  if (pendingDartGun === 'Chem Gun') cost = 150;
                                  else if (pendingDartGun === 'Happy Pill Pusher') cost = 160;
                                  else if (pendingDartGun === 'Sour Juicer') cost = 160;
                                  else if (pendingDartGun === 'Prickly Goo') cost = 175;
                                  // Check credits
                                  if (credits < cost) {
                                    setNotice('Not enough credits!');
                                    return;
                                  }
                                  // Atomic operation: update both dart guns and credits
                                  const newDartGuns = [...selectedDartGuns, pendingDartGun];
                                  const newCredits = credits - cost;
                                  setSelectedDartGuns(newDartGuns);
                                  
                                  if (sheet) {
                                    const updatedSheet = { 
                                      ...sheet, 
                                      dartGuns: newDartGuns,
                                      credits: newCredits
                                    };
                                    saveCharacterSheet(updatedSheet);
                                  }
                                  
                                  // Update the LevelUp component's credits state (no auto-save)
                                  onCreditsChange?.(-cost);
                                  setPendingDartGun("");
                                }}
                              >Buy</button>
                              <button
                                style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                                onClick={() => {
                                  const newDartGuns = [...selectedDartGuns, pendingDartGun];
                                  setSelectedDartGuns(newDartGuns);
                                  
                                  if (sheet) {
                                    const updatedSheet = { 
                                      ...sheet, 
                                      dartGuns: newDartGuns,
                                      credits: credits // Preserve current credits
                                    };
                                    saveCharacterSheet(updatedSheet);
                                  }
                                  
                                  setPendingDartGun("");
                                }}
                              >Add</button>
                              <button
                                style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                                onClick={() => setPendingDartGun("")}
                              >Cancel</button>
                              </div>
                            </div>
                          )}
                          <div style={{ marginTop: '2px' }}>
                            {selectedDartGuns.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                                {selectedDartGuns.map((gun, idx) => (
                                  <span key={gun + idx} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                                    {gun}
                                    <button
                                      style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                                      title={`Remove ${gun}`}
                                      onClick={() => {
                                        const newDartGuns = selectedDartGuns.filter((_, i) => i !== idx);
                                        setSelectedDartGuns(newDartGuns);
                                        
                                        if (sheet) {
                                          const updatedSheet = { 
                                            ...sheet, 
                                            dartGuns: newDartGuns,
                                            credits: credits // Preserve current credits
                                          };
                                          saveCharacterSheet(updatedSheet);
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
                            <b><u>Range</u></b> 8hx
                          </span>
                          <span style={{ textAlign: 'right', minWidth: '80px' }}>
                            <b><u>Crit</u></b> <b>[{(() => {
                              const critDots = safeGetDotsArray(7).filter(Boolean).length;
                              return 18 - critDots;
                            })()}]</b>+
                          </span>
                        </div>
                        <b><u>Target</u></b> Single <br />
                        <b><u>Damage</u></b> 1d<b>[{(() => {
                          const dieSizeDots = safeGetDotsArray(6).filter(Boolean).length;
                          return dieSizeDots === 0 ? 6 : dieSizeDots === 1 ? 8 : dieSizeDots === 2 ? 10 : 12;
                        })()}]</b> <br />
                        <b><u>Crit Effect</u></b> 1d<b>[{(() => {
                          const dieSizeDots = safeGetDotsArray(6).filter(Boolean).length;
                          return dieSizeDots === 0 ? 6 : dieSizeDots === 1 ? 8 : dieSizeDots === 2 ? 10 : 12;
                        })()}]</b>
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
                        <b><i><span style={{ color: '#351c75' }}>Strike</span> Damage.</i></b> {generateChemistStrikeJSX(sheet?.classCardDots, 'levelup')}.
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
                );
              })()
            )}
    

          </div>
        
      );
};

export default LevelUpClassChemist;