import React, { useState, useEffect, useRef, useCallback } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generatePsychosomaticHarmonyJSX } from "../utils/contemplativeFeature";
import { generateSwiftReactionJSX } from "../utils/contemplativeTechnique";


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
  _subclass: string;
  onXpSpChange?: (xpDelta: number, spDelta: number) => void;
  onCreditsChange?: (creditsDelta: number) => void;
  onAutoSave?: (updates: Partial<CharacterSheet>) => void;
  xpTotal: number;
  spTotal: number;
  xpSpent: number;
  spSpent: number;
  credits: number;
  setXpSpent: (xp: number) => void;
  setSpSpent: (sp: number) => void;
  setNotice: (notice: string) => void;
};

const LevelUpClassContemplative: React.FC<LevelUpClassContemplativeProps> = ({ 
  sheet, 
  charClass,
  _subclass, 
  onXpSpChange,
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
  
    // Local state for class card dots (Contemplative)
    const [classCardDots, setClassCardDots] = useState<boolean[][]>(() => {
      if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && sheet.classCardDots.length > 0) {
        // Defensive check: Ensure the sheet belongs to this class
        // This prevents inheriting dots from a previous class if the sheet prop is stale
        if (sheet.charClass !== "Contemplative") {
          return defaultContemplativeDots.map(row => [...row]);
        }

        // Defensive check: Ensure the dots structure matches this class (13 rows)
        // This prevents "ghost dots" from persisting when switching from a class with different row count (e.g. Coder with 10 rows)
        if (sheet.classCardDots.length === defaultContemplativeDots.length) {
          return sheet.classCardDots.map(row => Array.isArray(row) ? [...row] : []);
        }
        // If length mismatch, ignore and use default
        return defaultContemplativeDots.map(row => [...row]);
      }
      return defaultContemplativeDots.map(row => [...row]);
    });

    // Local state for selected focuses
    const [selectedFocuses, setSelectedFocuses] = useState<string[]>(() => {
      return sheet?.focuses || [];
    });
    // Local state for pending focus selection
    const [pendingFocus, setPendingFocus] = useState<string>("");

    // Local state for selected disciplines (secondary attacks)
    const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>(() => {
      return sheet?.disciplines || [];
    });
    // Local state for pending discipline selection
    const [pendingDiscipline, setPendingDiscipline] = useState<string>("");

    // Refs for race condition prevention
    const xpSpentRef = useRef(xpSpent);
    const spSpentRef = useRef(spSpent);
    const hasPendingUpdatesRef = useRef(false);
    const sheetRef = useRef(sheet);

    // Sync refs with props
    useEffect(() => {
      if (!hasPendingUpdatesRef.current) {
        xpSpentRef.current = xpSpent;
      }
    }, [xpSpent]);

    useEffect(() => {
      if (!hasPendingUpdatesRef.current) {
        spSpentRef.current = spSpent;
      }
    }, [spSpent]);

    useEffect(() => {
      sheetRef.current = sheet;
    }, [sheet]);

    // Sync selectedFocuses with sheet data when it changes
    useEffect(() => {
      if (sheet?.focuses) {
        setSelectedFocuses(sheet.focuses);
      }
    }, [sheet?.focuses]);

    // Sync selectedDisciplines with sheet data when it changes
    useEffect(() => {
      if (sheet?.disciplines) {
        setSelectedDisciplines(sheet.disciplines);
      }
    }, [sheet?.disciplines]);
  
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
    const persistClassCardDots = useCallback((newDots: boolean[][], spSpentDelta: number = 0, xpSpentDelta: number = 0) => {
      let newSpSpent = spSpentRef.current + spSpentDelta;
      let newXpSpent = xpSpentRef.current + xpSpentDelta;
      // Enforce XP/SP cannot exceed total
      if (newXpSpent > xpTotal) {
        setNotice("Not enough xp!");
        return;
      }
      if (newSpSpent > spTotal) {
        setNotice("Not enough sp!");
        return;
      }
      hasPendingUpdatesRef.current = true;
      setClassCardDots(newDots);
      newSpSpent = Math.max(0, newSpSpent);
      newXpSpent = Math.max(0, newXpSpent);
      spSpentRef.current = newSpSpent;
      xpSpentRef.current = newXpSpent;
      setSpSpent(newSpSpent);
      setXpSpent(newXpSpent);
      if (sheetRef.current && onAutoSave) {
        onAutoSave({ classCardDots: newDots, spSpent: newSpSpent, xpSpent: newXpSpent });
      }
      setTimeout(() => {
        hasPendingUpdatesRef.current = false;
      }, 100);
    }, [xpTotal, spTotal, setNotice, setSpSpent, setXpSpent, onAutoSave]);
    
    // Helper function to handle dot clicking with sequential requirement
    const _handleDotClick = (
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
    const _handleSpDotClick = (
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
                    {generatePsychosomaticHarmonyJSX(classCardDots)}
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
                    {generateSwiftReactionJSX(classCardDots)}
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
                        defaultValue="Focuses"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value !== "Focuses") {
                            setPendingFocus(value);
                            e.target.value = "Focuses"; // Reset dropdown
                          }
                        }}
                      >
                        <option disabled style={{ fontWeight: 'bold' }}>Focuses</option>
                        <option style={{ fontWeight: 'bold' }}>Ensnaring Hand Wraps</option>
                        <option style={{ fontWeight: 'bold' }}>Mala of Mind Darts</option>
                        <option style={{ fontWeight: 'bold' }}>Singing Bowl</option>
                        <option style={{ fontWeight: 'bold' }}>Telekinetic Knuckles</option>
                        <option style={{ fontWeight: 'bold' }}>Viperfang Ring</option>
                      </select>
                      {/* Buy/Add dialog for Focus selection */}
                      {pendingFocus && (
                        <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ fontWeight: 'bold' }}>
                            {pendingFocus}
                            <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                              {pendingFocus === 'Ensnaring Hand Wraps' && '165c'}
                              {pendingFocus === 'Mala of Mind Darts' && '155c'}
                              {pendingFocus === 'Singing Bowl' && '165c'}
                              {pendingFocus === 'Telekinetic Knuckles' && '150c'}
                              {pendingFocus === 'Viperfang Ring' && '155c'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                            style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={() => {
                              // Determine cost
                              let cost = 0;
                              if (pendingFocus === 'Ensnaring Hand Wraps') cost = 165;
                              else if (pendingFocus === 'Mala of Mind Darts') cost = 155;
                              else if (pendingFocus === 'Singing Bowl') cost = 165;
                              else if (pendingFocus === 'Telekinetic Knuckles') cost = 150;
                              else if (pendingFocus === 'Viperfang Ring') cost = 155;
                              // Check credits
                              if (credits < cost) {
                                setNotice('Not enough credits!');
                                return;
                              }
                              // Atomic operation: update both focuses and credits
                              const newFocuses = [...selectedFocuses, pendingFocus];
                              const newCredits = credits - cost;
                              setSelectedFocuses(newFocuses);
                              
                              if (sheet && onAutoSave) {
                                onAutoSave({ 
                                  focuses: newFocuses,
                                  credits: newCredits
                                });
                              }
                              
                              // Update the LevelUp component's credits state (no auto-save)
                              onCreditsChange?.(-cost);
                              setPendingFocus("");
                            }}
                          >Buy</button>
                          <button
                            style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={() => {
                              const newFocuses = [...selectedFocuses, pendingFocus];
                              setSelectedFocuses(newFocuses);
                              
                              if (sheet && onAutoSave) {
                                onAutoSave({ 
                                  focuses: newFocuses,
                                  credits: credits // Preserve current credits
                                });
                              }
                              
                              setPendingFocus("");
                            }}
                          >Add</button>
                          <button
                            style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={() => setPendingFocus("")}
                          >Cancel</button>
                          </div>
                        </div>
                      )}
                      <div style={{ marginTop: '2px' }}>
                        {selectedFocuses.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                            {selectedFocuses.map((focus, idx) => (
                              <span key={focus + idx} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                                {focus}
                                <button
                                  style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                                  title={`Remove ${focus}`}
                                  onClick={() => {
                                    const newFocuses = selectedFocuses.filter((_, i) => i !== idx);
                                    setSelectedFocuses(newFocuses);
                                    
                                    if (sheet && onAutoSave) {
                                      onAutoSave({ 
                                        focuses: newFocuses
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
                    <div style={{ fontSize: '1em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                          <b><u>Range</u></b> {_subclass === 'Vectorial' ? (
                            <>
                              <b>[{10 + 6 + ((sheet?.subclassProgressionDots as any)?.vectorialFeatureRangeDots?.filter(Boolean).length || 0)}]</b>hx
                            </>
                          ) : '10hx'}
                        </span>
                        <span style={{ textAlign: 'right', minWidth: '80px' }}>
                          <b><u>Crit</u></b> <b>[{18 - safeGetDotsArray(7).filter(Boolean).length - (_subclass === 'Vectorial' ? ((sheet?.subclassProgressionDots as any)?.vectorialFeatureCritDots?.filter(Boolean).length || 0) : 0)}]</b>+
                        </span>
                      </div>
                    </div>
                    <b><u>Target</u></b> Single, Repeat <b>[{safeGetDotsArray(5).filter(Boolean).length}]</b>
                    {_subclass === 'Vectorial' && (
                      <>
                        {((sheet?.subclassProgressionDots as any)?.vectorialFeatureIgnoreCoverDots?.[0]) 
                          ? <>, treat <b>[all]</b> Cover as <b>[no]</b> Cover</> 
                          : <>, treat <b>[100%]</b> Cover as <b>[50%]</b> Cover</>}
                      </>
                    )}
                    <br />
                    <b><u>Damage</u></b> 1d<b>[{6 + (safeGetDotsArray(6).filter(Boolean).length * 2)}]</b><br />
                    <b><u>Crit Effect</u></b> 1d<b>[{6 + (safeGetDotsArray(6).filter(Boolean).length * 2)}]</b>
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
                    <div style={{ marginBottom: '4px' }}>
                      <b><i><span style={{ color: '#000' }}>Secondary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> <i>(Cooldown </i><b>[{4 - safeGetDotsArray(11).filter(Boolean).length}]</b><i>)</i>.
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
                        defaultValue="Disciplines"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value !== "Disciplines") {
                            setPendingDiscipline(value);
                            e.target.value = "Disciplines"; // Reset dropdown
                          }
                        }}
                      >
                        <option disabled style={{ fontWeight: 'bold' }}>Disciplines</option>
                        {_subclass === 'Kinetic' && (
                          <>
                            <option style={{ fontWeight: 'bold' }}>Empty Mudra</option>
                            <option style={{ fontWeight: 'bold' }}>Mudra of Brilliance</option>
                          </>
                        )}
                        {_subclass === 'Mercurial' && (
                          <>
                            <option style={{ fontWeight: 'bold' }}>Way of Quicksilver</option>
                            <option style={{ fontWeight: 'bold' }}>Way of Sublimation</option>
                          </>
                        )}
                        {_subclass === 'Inertial' && (
                          <>
                            <option style={{ fontWeight: 'bold' }}>Asana of Heaviness</option>
                            <option style={{ fontWeight: 'bold' }}>Passive Asana</option>
                          </>
                        )}
                        {_subclass === 'Vectorial' && (
                          <>
                            <option style={{ fontWeight: 'bold' }}>Bane Prana</option>
                            <option style={{ fontWeight: 'bold' }}>Night Prana</option>
                          </>
                        )}
                      </select>
                      {/* Buy/Add dialog for Discipline selection */}
                      {pendingDiscipline && (
                        <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ fontWeight: 'bold' }}>
                            {pendingDiscipline}
                            <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                              {(pendingDiscipline === 'Empty Mudra' || pendingDiscipline === 'Mudra of Brilliance' || 
                                pendingDiscipline === 'Asana of Heaviness' || pendingDiscipline === 'Passive Asana') && '210c'}
                              {(pendingDiscipline === 'Way of Sublimation') && '235c'}
                              {(pendingDiscipline === 'Way of Quicksilver' || pendingDiscipline === 'Bane Prana' || 
                                pendingDiscipline === 'Night Prana') && '240c'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                            style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={() => {
                              // Determine cost
                              let cost = 0;
                              if (pendingDiscipline === 'Empty Mudra' || pendingDiscipline === 'Mudra of Brilliance' || 
                                  pendingDiscipline === 'Asana of Heaviness' || pendingDiscipline === 'Passive Asana') {
                                cost = 210;
                              } else if (pendingDiscipline === 'Way of Sublimation') {
                                cost = 235;
                              } else if (pendingDiscipline === 'Way of Quicksilver' || pendingDiscipline === 'Bane Prana' || 
                                         pendingDiscipline === 'Night Prana') {
                                cost = 240;
                              }
                              // Check credits
                              if (credits < cost) {
                                setNotice('Not enough credits!');
                                return;
                              }
                              // Atomic operation: update both disciplines and credits
                              const newDisciplines = [...selectedDisciplines, pendingDiscipline];
                              const newCredits = credits - cost;
                              setSelectedDisciplines(newDisciplines);
                              
                              if (sheet && onAutoSave) {
                                onAutoSave({ 
                                  disciplines: newDisciplines,
                                  credits: newCredits
                                });
                              }
                              
                              // Update the LevelUp component's credits state (no auto-save)
                              onCreditsChange?.(-cost);
                              setPendingDiscipline("");
                            }}
                          >Buy</button>
                          <button
                            style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={() => {
                              const newDisciplines = [...selectedDisciplines, pendingDiscipline];
                              setSelectedDisciplines(newDisciplines);
                              
                              if (sheet && onAutoSave) {
                                onAutoSave({ 
                                  disciplines: newDisciplines,
                                  credits: credits // Preserve current credits
                                });
                              }
                              
                              setPendingDiscipline("");
                            }}
                          >Add</button>
                          <button
                            style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={() => setPendingDiscipline("")}
                          >Cancel</button>
                          </div>
                        </div>
                      )}
                      <div style={{ marginTop: '2px' }}>
                        {selectedDisciplines.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                            {selectedDisciplines.map((discipline, idx) => (
                              <span key={discipline + idx} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                                {discipline}
                                <button
                                  style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                                  title={`Remove ${discipline}`}
                                  onClick={() => {
                                    const newDisciplines = selectedDisciplines.filter((_, i) => i !== idx);
                                    setSelectedDisciplines(newDisciplines);
                                    
                                    if (sheet && onAutoSave) {
                                      onAutoSave({ 
                                        disciplines: newDisciplines
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


                    <div style={{ fontSize: '1em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                          <b><u>Range</u></b> {_subclass === 'Vectorial' && (selectedDisciplines.includes('Bane Prana') || selectedDisciplines.includes('Night Prana')) ? (
                            <>
                              <b>[{1 + 6 + ((sheet?.subclassProgressionDots as any)?.vectorialFeatureRangeDots?.filter(Boolean).length || 0)}]</b>hx
                            </>
                          ) : '1hx'}
                        </span>
                        <span style={{ textAlign: 'right', minWidth: '80px' }}>
                          <b><u>Crit</u></b> <b>[{18 - safeGetDotsArray(10).filter(Boolean).length - (_subclass === 'Vectorial' ? ((sheet?.subclassProgressionDots as any)?.vectorialFeatureCritDots?.filter(Boolean).length || 0) : 0)}]</b>+
                        </span>
                      </div>
                    </div>
                    <u><b>Target</b></u> Single
                    {_subclass === 'Vectorial' && (
                      <>
                        {((sheet?.subclassProgressionDots as any)?.vectorialFeatureIgnoreCoverDots?.[0]) 
                          ? <>, treat <b>[all]</b> Cover as <b>[no]</b> Cover</> 
                          : <>, treat <b>[100%]</b> Cover as <b>[50%]</b> Cover</>}
                      </>
                    )}
                    <br />
                    <u><b>Damage</b></u> <b>[{2 + safeGetDotsArray(9).filter(Boolean).length}]</b>d<b>[{8 + (safeGetDotsArray(8).filter(Boolean).length * 2)}]</b>, status effect<br />
                    <u><b>Crit Effect</b></u> <b>[{2 + safeGetDotsArray(9).filter(Boolean).length}]</b>d<b>[{8 + (safeGetDotsArray(8).filter(Boolean).length * 2)}]</b>
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