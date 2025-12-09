import React, { useState, useEffect, useRef, useCallback } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateBloodTradeJSX } from "../utils/devoutFeature";
import { generateFlagellationJSX } from "../utils/devoutTechnique";
import { generateDevoutPrimaryAttackStatsJSX, getIncantationCost } from "../utils/devoutPrimaryAttack";
import { generateDevoutSecondaryAttackStatsJSX, getRelicCost } from "../utils/devoutSecondaryAttack";


type LevelUpClassDevoutProps = {
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

// Default Devout dots structure: 11 rows, each with the correct number of dots
const defaultDevoutDots: boolean[][] = [
  [false, false],      // +1d6 Damage
  [false],             // +1hx Attack Range
  [false],             // +1d6 Attack Damage
  [false, false],      // -1 Cooldown
  [false, false, false], // Increase die size
  [false, false, false], // +1 Crit
  [false, false, false], // +1 Damage die
  [false, false, false], // +1hx-Cone AoE
  [false, false, false], // Secondary Attack +1 Crit
  [false, false],      // Secondary Attack -1 Cooldown
  [false],             // Higher Power (Perk, SP)
];

const LevelUpClassDevout: React.FC<LevelUpClassDevoutProps> = ({ 
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
  
    // Local state for class card dots (Devout)
    const [classCardDots, setClassCardDots] = useState<boolean[][]>(() => {
      if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && sheet.classCardDots.length > 0) {
        return sheet.classCardDots.map(row => Array.isArray(row) ? [...row] : []);
      }
      return defaultDevoutDots.map(row => [...row]);
    });

    // Local state for selected incantations (primary attacks)
    const [selectedIncantations, setSelectedIncantations] = useState<string[]>(() => {
      return sheet?.incantations || [];
    });
    // Local state for pending incantation selection
    const [pendingIncantation, setPendingIncantation] = useState<string>("");

    // Local state for selected relics (secondary attacks)
    const [selectedRelics, setSelectedRelics] = useState<string[]>(() => {
      return sheet?.relics || [];
    });
    // Local state for pending relic selection
    const [pendingRelic, setPendingRelic] = useState<string>("");

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

    // Sync selectedIncantations with sheet data when it changes
    useEffect(() => {
      if (sheet?.incantations) {
        setSelectedIncantations(sheet.incantations);
      }
    }, [sheet?.incantations]);

    // Sync selectedRelics with sheet data when it changes
    useEffect(() => {
      if (sheet?.relics) {
        setSelectedRelics(sheet.relics);
      }
    }, [sheet?.relics]);
  
    // Helper function to safely access classCardDots array
    const safeGetDotsArray = (index: number): boolean[] => {
      if (!classCardDots || !Array.isArray(classCardDots) || index >= classCardDots.length) {
        return defaultDevoutDots[index] || [];
      }
      return classCardDots[index] || [];
    };
  
    // Helper function to safely clone classCardDots array
    const safeCloneClassCardDots = (): boolean[][] => {
      if (!classCardDots || !Array.isArray(classCardDots) || classCardDots.length === 0) {
        return defaultDevoutDots.map(row => [...row]);
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
            {/* Feature information when Devout is selected */}
            {charClass === "Devout" && (
              <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {/* Feature header */}
                <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
                    {generateBloodTradeJSX(classCardDots)}
                  </span>
                </div>
                {/* XP progression table - interactive dots */}
                <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 24px 24px',
                    gridTemplateRows: 'repeat(2, auto)',
                    columnGap: '6px',
                    rowGap: '2px',
                    alignItems: 'start',
                    marginBottom: '2px',
                    width: '100%',
                    paddingLeft: '4px'
                  }}>
                    {/* Row 1: XP costs */}
                    <span></span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
                    {/* Row 2: +1d6 Damage dots (interactive, with xpSpent) */}
                    <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1d6 Damage</span>
                    {[0,1].map(idx => {
                      const arr = safeGetDotsArray(0);
                      const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                      const rightmostChecked = arr.lastIndexOf(true);
                      const canUncheck = arr[idx] && idx === rightmostChecked;
                      const xpCosts = [8, 10];
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
                  </div>
                </div>

                {/* Technique section */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    {generateFlagellationJSX(classCardDots)}
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
                      {/* Row 1: 10xp header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
                      <span></span>
                      <span></span>
                      {/* Row 2: +1hx Attack Range dot */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx <b><i style={{ color: '#990000' }}>Attack</i></b> Range for each die</span>
                      {(() => {
                        const arr = safeGetDotsArray(1);
                        const idx = 0;
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        return (
                          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = 0; j <= idx; ++j) newDots[1][j] = true;
                                  persistClassCardDots(newDots, 0, 10);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = idx; j < arr.length; ++j) newDots[1][j] = false;
                                  persistClassCardDots(newDots, 0, -10);
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
                          </span>
                        );
                      })()}
                      {/* Row 3: 20xp header */}
                      <span></span>
                      <span></span>
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>20xp</span>
                      {/* Row 4: +1d6 Attack Damage dot */}
                      <span></span>
                      <span></span>
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1d6 <b><i style={{ color: '#990000' }}>Attack</i></b> Damage for each die</span>
                      {(() => {
                        const arr = safeGetDotsArray(2);
                        const idx = 0;
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        return (
                          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = 0; j <= idx; ++j) newDots[2][j] = true;
                                  persistClassCardDots(newDots, 0, 20);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = safeCloneClassCardDots();
                                  for (let j = idx; j < arr.length; ++j) newDots[2][j] = false;
                                  persistClassCardDots(newDots, 0, -20);
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
                          </span>
                        );
                      })()}
                      {/* Row 5: 4xp 7xp header */}
                      <span></span>
                      <span></span>
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
                      {/* Row 6: -1 Cooldown dots */}
                      <span></span>
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>-1 Cooldown</span>
                      
                      {(() => {
                        const arr = safeGetDotsArray(3);
                        const idx = 0;
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [4, 7];
                        return (
                          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
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
                      })()}
                      {(() => {
                        const arr = safeGetDotsArray(3);
                        const idx = 1;
                        const canCheck = arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [4, 7];
                        return (
                          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
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
                      })()}

                    </div>
                  </div>
                </div>

                {/* Attack section */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
                  
                  {/* Primary Attack */}
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
                        defaultValue="Incantations"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value !== "Incantations") {
                            setPendingIncantation(value);
                            e.target.value = "Incantations"; // Reset dropdown
                          }
                        }}
                      >
                        <option disabled style={{ fontWeight: 'bold' }}>Incantations</option>
                        {_subclass === 'Astral' && (
                          <>
                            <option style={{ fontWeight: 'bold' }}>Cleanse</option>
                            <option style={{ fontWeight: 'bold' }}>Enlighten</option>
                          </>
                        )}
                        {_subclass === 'Order' && (
                          <>
                            <option style={{ fontWeight: 'bold' }}>Comply</option>
                            <option style={{ fontWeight: 'bold' }}>Detain</option>
                          </>
                        )}
                        {_subclass === 'Chaos' && (
                          <>
                            <option style={{ fontWeight: 'bold' }}>Rampage</option>
                            <option style={{ fontWeight: 'bold' }}>Terrify</option>
                          </>
                        )}
                        {_subclass === 'Void' && (
                          <>
                            <option style={{ fontWeight: 'bold' }}>Erase</option>
                            <option style={{ fontWeight: 'bold' }}>Exhaust</option>
                          </>
                        )}
                      </select>
                      {/* Buy/Add dialog for Incantation selection */}
                      {pendingIncantation && (
                        <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ fontWeight: 'bold' }}>
                            {pendingIncantation}
                            <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                              {getIncantationCost(pendingIncantation)}c
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => {
                                // Determine cost
                                const cost = getIncantationCost(pendingIncantation);
                                // Check credits
                                if (credits < cost) {
                                  setNotice('Not enough credits!');
                                  return;
                                }
                                // Atomic operation: update both incantations and credits
                                const newIncantations = [...selectedIncantations, pendingIncantation];
                                const newCredits = credits - cost;
                                setSelectedIncantations(newIncantations);
                                
                                if (sheet && onAutoSave) {
                                  onAutoSave({ 
                                    incantations: newIncantations,
                                    credits: newCredits
                                  });
                                }
                                
                                // Update the LevelUp component's credits state
                                onCreditsChange?.(-cost);
                                setPendingIncantation("");
                              }}
                            >Buy</button>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => {
                                const newIncantations = [...selectedIncantations, pendingIncantation];
                                setSelectedIncantations(newIncantations);
                                
                                if (sheet && onAutoSave) {
                                  onAutoSave({ 
                                    incantations: newIncantations,
                                    credits: credits // Preserve current credits
                                  });
                                }
                                
                                setPendingIncantation("");
                              }}
                            >Add</button>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => setPendingIncantation("")}
                            >Cancel</button>
                          </div>
                        </div>
                      )}
                      <div style={{ marginTop: '2px' }}>
                        {selectedIncantations.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                            {selectedIncantations.map((incantation, idx) => (
                              <span key={incantation + idx} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                                {incantation}
                                <button
                                  style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                                  title={`Remove ${incantation}`}
                                  onClick={() => {
                                    const newIncantations = selectedIncantations.filter((_, i) => i !== idx);
                                    setSelectedIncantations(newIncantations);
                                    
                                    if (sheet && onAutoSave) {
                                      onAutoSave({ 
                                        incantations: newIncantations
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
                    
                    {/* Base stats display - always visible */}
                    <div style={{ fontSize: '1em', marginTop: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span><b><u>Range</u></b> 10hx</span>
                        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{18 - (safeGetDotsArray(5)?.filter(Boolean).length || 0)}]</b>+</span>
                      </div>
                      <div>
                        <b><u>Target</u></b> Single, Arcing
                      </div>
                      <div>
                        <b><u>Damage</u></b> 1d<b>[{6 + (safeGetDotsArray(4)?.filter(Boolean).length || 0) * 2}]</b>
                      </div>
                      <div>
                        <b><u>Crit Effect</u></b> 1d<b>[{6 + (safeGetDotsArray(4)?.filter(Boolean).length || 0) * 2}]</b>
                      </div>
                    </div>
                  </div>
                  
                  {/* XP progression table for Primary Attack */}
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
                      {/* Row 1: 5xp 8xp 12xp header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
                      {/* Row 2: Increase die size dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>Increase die size</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(4);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [5, 8, 12];
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
                      {/* Row 3: 2xp 4xp 6xp header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>2xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                      {/* Row 4: +1 Crit dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(5);
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
                  
                  {/* Secondary Attack */}
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', marginTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ marginBottom: '4px' }}>
                      <b><i><span style={{ color: '#000' }}>Secondary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> <i>(Cooldown <b>[{4 - (safeGetDotsArray(9)?.filter(Boolean).length || 0)}]</b>)</i>.
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
                        defaultValue="Relics"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value !== "Relics") {
                            setPendingRelic(value);
                            e.target.value = "Relics"; // Reset dropdown
                          }
                        }}
                      >
                        <option disabled style={{ fontWeight: 'bold' }}>Relics</option>
                        {/* Astral subclass relics */}
                        {sheet?.subclass === "Astral" && (
                          <>
                            <option style={{ fontWeight: 'bold' }}>Aktinovo's Lantern</option>
                            <option style={{ fontWeight: 'bold' }}>Agathe's Halo</option>
                          </>
                        )}
                        {/* Chaos subclass relics */}
                        {sheet?.subclass === "Chaos" && (
                          <>
                            <option style={{ fontWeight: 'bold' }}>Entropos' Maw</option>
                            <option style={{ fontWeight: 'bold' }}>Kako's Bloodshot Eye</option>
                            <option style={{ fontWeight: 'bold' }}>Storvald's Rimehold Hand</option>
                          </>
                        )}
                        {/* Order subclass relics */}
                        {sheet?.subclass === "Order" && (
                          <>
                            <option style={{ fontWeight: 'bold' }}>Scepter of Ethos</option>
                            <option style={{ fontWeight: 'bold' }}>Fylakas' Censor</option>
                          </>
                        )}
                        {/* Void subclass relics */}
                        {sheet?.subclass === "Void" && (
                          <>
                            <option style={{ fontWeight: 'bold' }}>Kenos' Scythe</option>
                            <option style={{ fontWeight: 'bold' }}>Orb of Mitra</option>
                          </>
                        )}
                      </select>
                      {/* Buy/Add dialog for Relic selection */}
                      {pendingRelic && (
                        <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ fontWeight: 'bold' }}>
                            {pendingRelic}
                            <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                              {getRelicCost(pendingRelic)}c
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => {
                                // Determine cost using the helper function
                                const cost = getRelicCost(pendingRelic);
                                // Check credits
                                if (credits < cost) {
                                  setNotice('Not enough credits!');
                                  return;
                                }
                                // Atomic operation: update both relics and credits
                                const newRelics = [...selectedRelics, pendingRelic];
                                const newCredits = credits - cost;
                                setSelectedRelics(newRelics);
                                
                                if (sheet && onAutoSave) {
                                  onAutoSave({ 
                                    relics: newRelics,
                                    credits: newCredits
                                  });
                                }
                                
                                // Update the LevelUp component's credits state
                                onCreditsChange?.(-cost);
                                setPendingRelic("");
                              }}
                            >Buy</button>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => {
                                const newRelics = [...selectedRelics, pendingRelic];
                                setSelectedRelics(newRelics);
                                
                                if (sheet && onAutoSave) {
                                  onAutoSave({ 
                                    relics: newRelics,
                                    credits: credits // Preserve current credits
                                  });
                                }
                                
                                setPendingRelic("");
                              }}
                            >Add</button>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => setPendingRelic("")}
                            >Cancel</button>
                          </div>
                        </div>
                      )}
                      <div style={{ marginTop: '2px' }}>
                        {selectedRelics.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                            {selectedRelics.map((relic, idx) => (
                              <span key={relic + idx} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                                {relic}
                                <button
                                  style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                                  title={`Remove ${relic}`}
                                  onClick={() => {
                                    const newRelics = selectedRelics.filter((_, i) => i !== idx);
                                    setSelectedRelics(newRelics);
                                    
                                    if (sheet && onAutoSave) {
                                      onAutoSave({ 
                                        relics: newRelics
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
                    {generateDevoutSecondaryAttackStatsJSX(classCardDots)}
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
                      {/* Row 1: 5xp 8xp 15xp header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>15xp</span>
                      {/* Row 2: +1 Damage die dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Damage die</span>
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
                      {/* Row 3: 5xp 8xp 15xp header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>15xp</span>
                      {/* Row 4: +1hx-Cone AoE dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx-Cone <i>AoE</i></span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(7);
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
                      {/* Row 5: 3xp 5xp 8xp header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      {/* Row 6: +1 Crit dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(8);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [3, 5, 8];
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
                      {/* Row 7: 5xp 6xp header */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                      <span></span>
                      {/* Row 8: -1 Cooldown dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>-1 Cooldown</span>
                      {[0,1].map(idx => {
                        const arr = safeGetDotsArray(9);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [5, 6];
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
                      <span></span>
                    </div>
                  </div>
                </div>

                {/* Perks section */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <i><b>Skills.</b> Xenomagic</i> +2
                  </div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <i><b>Languages.</b> Xenovox</i>
                  </div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
                        <b><i style={{ color: '#6b1172' }}>Higher Power.</i></b> You draw your energy and abilities from a divine entity. Gain an advantage on related skill rolls when you give homage to your deity and choose the transrational option.
                      </span>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '24px',
                        gridTemplateRows: 'repeat(2, auto)',
                        alignItems: 'start',
                        marginLeft: '4px'
                      }}>
                        {/* Row 1: 10sp */}
                        <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10sp</span>
                        {/* Row 2: dot (interactive) */}
                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                          {(() => {
                            const arr = safeGetDotsArray(10);
                            const idx = 0;
                            const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                            const rightmostChecked = arr.lastIndexOf(true);
                            const canUncheck = arr[idx] && idx === rightmostChecked;
                            return (
                              <span
                                onClick={() => {
                                  if (!arr[idx] && canCheck) {
                                    const newDots = safeCloneClassCardDots();
                                    if (newDots[10]) {
                                      for (let j = 0; j <= idx; ++j) newDots[10][j] = true;
                                    }
                                    persistClassCardDots(newDots, 10);
                                  } else if (arr[idx] && canUncheck) {
                                    const newDots = safeCloneClassCardDots();
                                    if (newDots[10]) {
                                      for (let j = idx; j < arr.length; ++j) newDots[10][j] = false;
                                    }
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

export default LevelUpClassDevout;