import React, { useState, useEffect, useRef, useCallback } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateSubtleMagicJSX } from "../utils/coderFeature";
import { generateReflectionScriptJSX } from "../utils/coderTechnique";

type LevelUpClassCoderProps = {
  sheet: CharacterSheet | null;
  charClass: string;
  subclass: string;
  _onXpSpChange?: (xpDelta: number, spDelta: number) => void;
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

const defaultCoderDots: boolean[][] = [
  [false],           // Ignore 100% Cover (1 dot)
  [false, false, false], // +1 Crit (3 dots)
  [false, false, false], // +1d6 Damage (3 dots)
  [false],           // Resist all Damage (1 dot)
  [false],           // Damage Immunity (1 dot)
  [false, false],    // -1 Cooldown (2 dots)
  [false, false, false], // Increase die size (3 dots)
  [false, false, false], // +1 Crit (3 dots)
  [false, false, false], // +3hx-chain AoE (3 dots)
  [false, false, false], // +1 Damage die (3 dots)
  [false, false, false], // +1 Crit (3 dots)
  [false, false],        // -1 Cooldown (2 dots)
  [false],               // Code Reader Perk (1 dot)
];

const LevelUpClassCoder: React.FC<LevelUpClassCoderProps> = ({ 
  sheet, 
  charClass,
  subclass, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onXpSpChange,
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


    // Local state for class card dots (Coder)
    const [classCardDots, setClassCardDots] = useState<boolean[][]>(() => {
      if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && sheet.classCardDots.length > 0) {
        return sheet.classCardDots.map(row => Array.isArray(row) ? [...row] : []);
      }
      return defaultCoderDots.map(row => [...row]);
    });

    // Local state for Lenses
    const [selectedLenses, setSelectedLenses] = useState<string[]>(sheet?.lenses || []);
    const [pendingLens, setPendingLens] = useState<string>("");
    const prevLensesRef = useRef<string[]>([]);

    // Local state for Algorithms
    const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>(sheet?.algorithms || []);
    const [pendingAlgorithm, setPendingAlgorithm] = useState<string>("");
    const prevAlgorithmsRef = useRef<string[]>([]);

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

    // Sync selectedLenses when sheet prop changes
    useEffect(() => {
      const currentLenses = sheet?.lenses || [];
      const prevLenses = prevLensesRef.current || [];
      
      // Only update if the lenses array has actually changed
      if (JSON.stringify(currentLenses) !== JSON.stringify(prevLenses)) {
        setSelectedLenses([...currentLenses]);
        prevLensesRef.current = [...currentLenses];
      }
    }, [sheet?.lenses]);

    // Sync selectedAlgorithms when sheet prop changes
    useEffect(() => {
      const currentAlgorithms = sheet?.algorithms || [];
      const prevAlgorithms = prevAlgorithmsRef.current || [];
      
      // Only update if the algorithms array has actually changed
      if (JSON.stringify(currentAlgorithms) !== JSON.stringify(prevAlgorithms)) {
        setSelectedAlgorithms([...currentAlgorithms]);
        prevAlgorithmsRef.current = [...currentAlgorithms];
      }
    }, [sheet?.algorithms]);
  
    // Helper function to safely access classCardDots array
    const safeGetDotsArray = (index: number): boolean[] => {
      if (!classCardDots || !Array.isArray(classCardDots) || index >= classCardDots.length) {
        return defaultCoderDots[index] || [];
      }
      return classCardDots[index] || [];
    };
  
    // Helper function to safely clone classCardDots array
    const safeCloneClassCardDots = (): boolean[][] => {
      if (!classCardDots || !Array.isArray(classCardDots) || classCardDots.length === 0) {
        return defaultCoderDots.map(row => [...row]);
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
    

      return (
        <div>
{/* Feature information when Coder is selected */}
            {charClass === "Coder" && (
              <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {/* Feature header */}
                <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
                    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                      {generateSubtleMagicJSX(classCardDots)}
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
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>20xp</span>
                    <span></span>
                    <span></span>
                    {/* Row 2: Ignore 100% Cover dot (interactive) */}
                    <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>Ignore 100% Cover</span>
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
                        // XP cost for this dot (20xp)
                        const xpCosts = [20];
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
                    <span></span>
                    <span></span>
                    {/* Row 3: XP header (2xp, 5xp, 8xp) */}
                    <span></span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>2xp</span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                    {/* Row 4: +1 Crit dots (interactive) */}
                    <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
                    {[0,1,2].map(idx => {
                      const arr = safeGetDotsArray(1);
                      const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                      const rightmostChecked = arr.lastIndexOf(true);
                      const canUncheck = arr[idx] && idx === rightmostChecked;
                      // XP cost for each dot (2xp, 5xp, 8xp)
                      const xpCosts = [2, 5, 8];
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
                  </div>
                </div>
                {/* Technique section */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    {generateReflectionScriptJSX(classCardDots)}
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
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
                      {/* Row 2: +1d6 Damage dots (interactive) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1d6 Damage</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(2);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot (5xp, 8xp, 12xp)
                        const xpCosts = [5, 8, 12];
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
                      {/* Row 3: XP header (16xp) */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
                      <span></span>
                      <span></span>
                      {/* Row 4: Resist all Damage dot (interactive, col 2) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}><i>Resist</i> all Damage</span>
                      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                        {(() => {
                          const arr = safeGetDotsArray(3);
                          const idx = 0;
                          const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                          const rightmostChecked = arr.lastIndexOf(true);
                          const canUncheck = arr[idx] && idx === rightmostChecked;
                          // XP cost for this dot (16xp)
                          const xpCosts = [16];
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
                      {/* Row 5: Arrow and connection */}
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      {/* Row 6: XP header (32xp) */}
                      <span></span>
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>32xp</span>
                      <span></span>
                      {/* Row 7: Damage immunity dot (interactive, col 2) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>Damage <i>Immunity</i></span>
                      <span style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', color: '#666' }}>⤷</span>
                      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                        {(() => {
                          const arr = safeGetDotsArray(4);
                          const idx = 0;
                          // Require Resist all Damage (row 3, idx 0) to be checked first
                          const resistAllArr = safeGetDotsArray(3);
                          const resistAllChecked = resistAllArr[0];
                          const canCheck = ((idx === 0 || arr.slice(0, idx).every(Boolean)) && resistAllChecked);
                          const rightmostChecked = arr.lastIndexOf(true);
                          const canUncheck = arr[idx] && rightmostChecked === idx;
                          // XP cost for this dot (32xp)
                          const xpCosts = [32];
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
                              title={resistAllChecked ? undefined : 'Requires Resist all Damage'}
                            ></span>
                          );
                        })()}
                      </span>
                      <span></span>
                      {/* Row 8: XP header (4xp, 7xp) */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
                      <span></span>
                      {/* Row 9: -1 Cooldown dots (dot in col 2 and col 3) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>-1 Cooldown</span>
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


                  {/* Lenses Dropdown */}
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
                      defaultValue="Lenses"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value !== "Lenses") {
                          setPendingLens(value);
                          e.target.value = "Lenses"; // Reset dropdown
                        }
                      }}
                    >
                      <option disabled style={{ fontWeight: 'bold' }}>Lenses</option>
                      <option style={{ fontWeight: 'bold' }}>Hodge Podge</option>
                      <option style={{ fontWeight: 'bold' }}>Time Stutter</option>
                    </select>
                    {/* Buy/Add dialog for Lens selection */}
                    {pendingLens && (
                      <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ fontWeight: 'bold' }}>
                          {pendingLens}
                          <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>150c</span>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <button
                            style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={() => {
                              const cost = 150;
                              // Check credits
                              if (credits < cost) {
                                setNotice('Not enough credits!');
                                return;
                              }
                              // Atomic operation: update both lenses and credits
                              const newLenses = [...selectedLenses, pendingLens];
                              setSelectedLenses(newLenses);
                              
                              if (sheet && onAutoSave) {
                                onAutoSave({ 
                                  lenses: newLenses,
                                  credits: credits - cost
                                });
                              }
                              
                              // Update the LevelUp component's credits state (no auto-save)
                              onCreditsChange?.(-cost);
                              setPendingLens("");
                            }}
                          >Buy</button>
                          <button
                            style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={() => {
                              const newLenses = [...selectedLenses, pendingLens];
                              setSelectedLenses(newLenses);
                              
                              if (sheet && onAutoSave) {
                                onAutoSave({ 
                                  lenses: newLenses,
                                  credits: credits // Preserve current credits
                                });
                              }
                              
                              setPendingLens("");
                            }}
                          >Add</button>
                          <button
                            style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={() => setPendingLens("")}
                          >Cancel</button>
                        </div>
                      </div>
                    )}
                    <div style={{ marginTop: '2px' }}>
                      {(selectedLenses && selectedLenses.length > 0) && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                          {selectedLenses.map((lens, idx) => (
                            <span key={lens + idx + 'lens'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                              {lens}
                              <button
                                style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                                title={`Remove ${lens}`}
                                onClick={() => {
                                  const newLenses = selectedLenses.filter((_, i) => i !== idx);
                                  setSelectedLenses(newLenses);
                                  if (sheet && onAutoSave) {
                                    onAutoSave({ lenses: newLenses });
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
                  {subclass === 'Divinist' ? (
                    <>
                      <b><u>Range</u></b> <b>[{10 + ((sheet?.subclassProgressionDots as any)?.divinistFeatureRangeDots?.filter(Boolean).length || 0)}]</b>hx <br />
                    </>
                  ) : (
                    <>
                      <b><u>Range</u></b> 10hx <br />
                    </>
                  )}
                </span>
                  <span style={{ textAlign: 'right', minWidth: '80px' }}>
                    {/* Calculate Crit value based on +1 Crit dots in Primary Attack section (index 7) and Subtle Magic feature section (index 1) */}
                    {(() => {
                      const critDotsPrimary = safeGetDotsArray(7).filter(Boolean).length;
                      const critDotsFeature = safeGetDotsArray(1).filter(Boolean).length;
                      const critValue = 18 - critDotsPrimary - critDotsFeature;
                      return <><b><u>Crit</u></b> <b>[{critValue}]</b>+</>;
                    })()}
                  </span>
              </div>
              {/* Dynamically show [100%] if Ignore 100% Cover dot is selected */}
              {/* Calculate die size for Damage and Crit Effect based on Increase die size dots */}
              {(() => {
                const dieSizeDots = safeGetDotsArray(6);
                const numDieSizeDots = dieSizeDots.filter(Boolean).length;
                const dieSize = 6 + numDieSizeDots * 2;
                return (
                  <>
                    <b><u>Target</u></b> Single, ignore <b>[{safeGetDotsArray(0)[0] ? '100%' : '50%'}]</b> Cover<br />
                    <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <br />
                    <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b>
                  </>
                );
              })()}


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
                      {/* Row 3: XP header (2xp, 4xp, 6xp) */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>2xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                      {/* Row 4: +1 Crit dots (interactive) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(7);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot
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
                  
                  {/* Secondary Attack */}
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', marginTop: '16px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ marginBottom: '4px' }}>
                      {/* Calculate cooldown value: base 4 - 1 per -1 Cooldown dot */}
                      {(() => {
                        const cooldownDots = safeGetDotsArray(11).filter(Boolean).length;
                        const cooldownValue = 4 - cooldownDots;
                        return (
                          <><b><i><span style={{ color: '#000' }}>Secondary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> <i>(Cooldown</i> <b>[{cooldownValue}]</b><i>).</i></>
                        );
                      })()}
                    </div>

                    {/* Algorithms Dropdown */}
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
                        defaultValue="Algorithms"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value !== "Algorithms") {
                            setPendingAlgorithm(value);
                            e.target.value = "Algorithms"; // Reset dropdown
                          }
                        }}
                      >
                        <option disabled style={{ fontWeight: 'bold' }}>Algorithms</option>
                        <option style={{ fontWeight: 'bold' }}>Digital Wave</option>
                        <option style={{ fontWeight: 'bold' }}>Soul Tracer</option>
                      </select>
                      {/* Buy/Add dialog for Algorithm selection */}
                      {pendingAlgorithm && (
                        <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ fontWeight: 'bold' }}>
                            {pendingAlgorithm}
                            <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                              {pendingAlgorithm === 'Digital Wave' ? '205c' : pendingAlgorithm === 'Soul Tracer' ? '240c' : '0c'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => {
                                const cost = pendingAlgorithm === 'Digital Wave' ? 205 : pendingAlgorithm === 'Soul Tracer' ? 240 : 0;
                                // Check credits
                                if (credits < cost) {
                                  setNotice('Not enough credits!');
                                  return;
                                }
                                // Atomic operation: update both algorithms and credits
                                const newAlgorithms = [...selectedAlgorithms, pendingAlgorithm];
                                setSelectedAlgorithms(newAlgorithms);
                                
                                if (sheet && onAutoSave) {
                                  onAutoSave({ 
                                    algorithms: newAlgorithms,
                                    credits: credits - cost
                                  });
                                }
                                
                                // Update the LevelUp component's credits state (no auto-save)
                                onCreditsChange?.(-cost);
                                setPendingAlgorithm("");
                              }}
                            >Buy</button>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => {
                                const newAlgorithms = [...selectedAlgorithms, pendingAlgorithm];
                                setSelectedAlgorithms(newAlgorithms);
                                
                                if (sheet && onAutoSave) {
                                  onAutoSave({ 
                                    algorithms: newAlgorithms,
                                    credits: credits // Preserve current credits
                                  });
                                }
                                
                                setPendingAlgorithm("");
                              }}
                            >Add</button>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => setPendingAlgorithm("")}
                            >Cancel</button>
                          </div>
                        </div>
                      )}
                      <div style={{ marginTop: '2px' }}>
                        {(selectedAlgorithms && selectedAlgorithms.length > 0) && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                            {selectedAlgorithms.map((algorithm, idx) => (
                              <span key={algorithm + idx + 'algorithm'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                                {algorithm}
                                <button
                                  style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                                  title={`Remove ${algorithm}`}
                                  onClick={() => {
                                    const newAlgorithms = selectedAlgorithms.filter((_, i) => i !== idx);
                                    setSelectedAlgorithms(newAlgorithms);
                                    if (sheet && onAutoSave) {
                                      onAutoSave({ algorithms: newAlgorithms });
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
                  {subclass === 'Divinist' ? (
                    <>
                      <b><u>Range</u></b> <b>[{6 + ((sheet?.subclassProgressionDots as any)?.divinistFeatureRangeDots?.filter(Boolean).length || 0)}]</b>hx <br />
                    </>
                  ) : (
                    <>
                      <b><u>Range</u></b> 6hx <br />
                    </>
                  )}
                </span>
                  <span style={{ textAlign: 'right', minWidth: '80px' }}>
                    {/* Calculate Crit value based on +1 Crit dots in Secondary Attack section (index 10) and Subtle Magic feature section (index 1) */}
                    {(() => {
                      const critDotsSecondary = safeGetDotsArray(10).filter(Boolean).length;
                      const critDotsFeature = safeGetDotsArray(1).filter(Boolean).length;
                      const critValue = 18 - critDotsSecondary - critDotsFeature;
                      return <><b><u>Crit</u></b> <b>[{critValue}]</b>+</>;
                    })()}
                  </span>
              </div>
              {/* Dynamically show [100%] if Ignore 100% Cover dot is selected */}
              {/* Calculate die size for Damage and Crit Effect based on Increase die size dots */}
              {(() => {
                // Calculate AoE size: base 6 + 3 per +3hx-chain AoE dot
                const aoeDots = safeGetDotsArray(8);
                const numAoeDots = aoeDots.filter(Boolean).length;
                const aoeSize = 6 + numAoeDots * 3;
                // Calculate +1 Damage die dots (index 9)
                const damageDieDots = safeGetDotsArray(9);
                const numDamageDieDots = damageDieDots.filter(Boolean).length;
                const damageDieValue = 1 + numDamageDieDots;
                return (
                  <>
                    <b><u>Target</u></b> <i>AoE</i> <b>[{aoeSize}]</b>hx-chain, ignore <b>[{safeGetDotsArray(0)[0] ? '100%' : '50%'}]</b> Cover<br />
                    <b><u>Damage</u></b> <b>[{damageDieValue}]</b>d6, <i>Dangerous Terrain</i> <br />
                    <b><u>Crit Effect</u></b> <b>[{damageDieValue}]</b>d6
                  </>
                );
              })()}
            </div>
                  </div>
                  <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
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
                      {/* Row 1: XP header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
                      {/* Row 2: +3hx-chain AoE dots (interactive) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+3hx-chain AoE</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(8);
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
                      {/* Row 3: XP header (5xp, 8xp, 15xp) */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>15xp</span>
                      {/* Row 4: +1 Damage die dots (interactive) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Damage die</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(9);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot
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
                      {/* Row 5: XP header (3xp, 5xp, 8xp) */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      {/* Row 6: +1 Crit dots (interactive) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(10);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot
                        const xpCosts = [3, 5, 8];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = safeCloneClassCardDots();
                                  if (newDots[10]) {
                                    for (let j = 0; j <= idx; ++j) newDots[10][j] = true;
                                  }
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = safeCloneClassCardDots();
                                  if (newDots[10]) {
                                    for (let j = idx; j < arr.length; ++j) newDots[10][j] = false;
                                  }
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
                      {/* Row 7: XP header (4xp, 6xp) */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                      <span></span>
                      {/* Row 8: -1 Cooldown dots (dot in col 2 and col 3) */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>-1 Cooldown</span>
                      {[0,1].map(idx => {
                        const arr = safeGetDotsArray(11);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        // XP cost for each dot (4xp, 6xp)
                        const xpCosts = [4, 6];
                        return (
                          <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = safeCloneClassCardDots();
                                  if (newDots[11]) {
                                    for (let j = 0; j <= idx; ++j) newDots[11][j] = true;
                                  }
                                  let delta = 0;
                                  for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                                  persistClassCardDots(newDots, 0, delta);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = safeCloneClassCardDots();
                                  if (newDots[11]) {
                                    for (let j = idx; j < arr.length; ++j) newDots[11][j] = false;
                                  }
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
                {/* Perks section */}
                <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <i><b>Skills.</b> Oikomagic</i> +2<br/>
                    <i><b>Languages.</b> Oikovox</i>
                  </div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
                        <b><i style={{ color: '#112972' }}>Code Reader.</i></b> You easily see the inherent logic of the natural world around you, including the Oikomagic infused in it, giving you an edge when inspecting magical or rationality-based subjects and objects. Gain an advantage on related skill rolls.
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
                        {/* Row 1: 8sp */}
                        <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8sp</span>
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
                                    persistClassCardDots(newDots, 8);
                                  } else if (arr[idx] && canUncheck) {
                                    const newDots = safeCloneClassCardDots();
                                    if (newDots[12]) {
                                      for (let j = idx; j < arr.length; ++j) newDots[12][j] = false;
                                    }
                                    persistClassCardDots(newDots, -8);
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
            )}


          </div>
        
      );
};

export default LevelUpClassCoder;