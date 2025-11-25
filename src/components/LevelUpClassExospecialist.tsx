import React, { useState, useEffect } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateExosuitJSX } from "../utils/exospecialistFeature";
import { generateTargetLockJSX } from "../utils/exospecialistTechnique";


// Default dots array for Exospecialist progression (12 rows, each with appropriate number of dots)
const defaultExospecialistDots: boolean[][] = [
  [false, false, false], // +1hx
  [false, false, false], // +2 Crit
  [false],               // Ignore 100% Cover
  [false, false],        // -1 Cooldown
  [false, false, false], // +2 Damage dice
  [false, false, false], // +1 Crit
  [false, false, false], // +1hx Damage die
  [false, false],        // Repeat +1
  [false, false, false], // +3hx Range
  [false, false, false], // +1 Crit
  [false, false],        // -1 Cooldown
  [false],               // Man in the Machine perk (SP)
];

type LevelUpClassExospecialistProps = {
  sheet: CharacterSheet | null;
  charClass: string;
  _subclass: string;
  onXpSpChange?: (xpDelta: number, spDelta: number) => void;
  onAutoSave?: (updates: Partial<CharacterSheet>) => void;
  xpTotal: number;
  spTotal: number;
  xpSpent: number;
  spSpent: number;
  setXpSpent: (xp: number) => void;
  setSpSpent: (sp: number) => void;
  setNotice: (notice: string) => void;
};

const LevelUpClassExospecialist: React.FC<LevelUpClassExospecialistProps> = ({ 
  sheet, 
  charClass,
  _subclass, 
  onXpSpChange,
  onAutoSave,
  xpTotal,
  spTotal, 
  xpSpent,
  spSpent,
  setXpSpent,
  setSpSpent,
  setNotice,
  onCreditsChange
}: LevelUpClassExospecialistProps & { onCreditsChange?: (delta: number) => void }) => {
  
    // Local state for class card dots (Exospecialist)
    const [classCardDots, setClassCardDots] = useState<boolean[][]>(() => {
      if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && sheet.classCardDots.length > 0) {
        return sheet.classCardDots.map(row => Array.isArray(row) ? [...row] : []);
      }
      return defaultExospecialistDots.map(row => [...row]);
    });

    // State for purchased weapons
    const [selectedIntegratedBlasters, setSelectedIntegratedBlasters] = useState<string[]>(() => {
      return sheet?.integratedBlasters || [];
    });
    const [selectedSmartMissiles, setSelectedSmartMissiles] = useState<string[]>(() => {
      return sheet?.smartMissiles || [];
    });

    // State for pending weapon purchases
    const [pendingPrimaryWeapon, setPendingPrimaryWeapon] = useState<string>("");
    const [pendingSecondaryWeapon, setPendingSecondaryWeapon] = useState<string>("");

    // Get current credits
    const credits = sheet?.credits || 0;

    // Sync selectedIntegratedBlasters with sheet data when it changes
    useEffect(() => {
      if (sheet?.integratedBlasters) {
        setSelectedIntegratedBlasters(sheet.integratedBlasters);
      }
    }, [sheet?.integratedBlasters]);
    
    // Sync selectedSmartMissiles with sheet data when it changes
    useEffect(() => {
      if (sheet?.smartMissiles) {
        setSelectedSmartMissiles(sheet.smartMissiles);
      }
    }, [sheet?.smartMissiles]);

    // Helper function to get weapon cost
    const getIntegratedBlasterCost = (weapon: string): number => {
      switch (weapon) {
        case 'Boomstick': return 170;
        case 'Firestarter': return 160;
        case 'Sleepytime': return 170;
        default: return 0;
      }
    };

    const getSmartMissileCost = (weapon: string): number => {
      switch (weapon) {
        case 'Neutron Torpedo': return 215;
        case 'Pulsar Cannon': return 225;
        case 'Razor Rain': return 250;
        default: return 0;
      }
    };
  
    // Helper function to safely access classCardDots array
    const safeGetDotsArray = (index: number): boolean[] => {
      if (!classCardDots || !Array.isArray(classCardDots) || index >= classCardDots.length) {
        return defaultExospecialistDots[index] || [];
      }
      return classCardDots[index] || [];
    };
  
    // Helper function to safely clone classCardDots array
    const safeCloneClassCardDots = (): boolean[][] => {
      if (!classCardDots || !Array.isArray(classCardDots) || classCardDots.length === 0) {
        return defaultExospecialistDots.map(row => [...row]);
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
      if (sheet && onAutoSave) {
        onAutoSave({ classCardDots: newDots, spSpent: newSpSpent, xpSpent: newXpSpent });
      }
    };
    
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
            {/* Feature information when Exospecialist is selected */}
            {charClass === "Exospecialist" && (
              <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {/* Feature header */}
                <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
                    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                      {generateExosuitJSX()}
                    </span>
                  </span>
                </div>

                {/* Technique section */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    {generateTargetLockJSX(classCardDots)}
                  </div>
                {/* Feature XP progression table */}
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
                    {/* Row 1: XP costs */}
                    <span></span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
                    {/* Row 2: +5 Hit Points dots */}
                    <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx</span>
                    {[0,1,2].map(idx => {
                      const arr = safeGetDotsArray(0);
                      const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                      const rightmostChecked = arr.lastIndexOf(true);
                      const canUncheck = arr[idx] && idx === rightmostChecked;
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
                    {/* Row 1: XP costs */}
                    <span></span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>
                    {/* Row 2: +1 Armor dots */}
                    <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+2 Crit</span>
                    {[0,1,2].map(idx => {
                      const arr = safeGetDotsArray(1);
                      const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                      const rightmostChecked = arr.lastIndexOf(true);
                      const canUncheck = arr[idx] && idx === rightmostChecked;
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

                    {/* Row 1: XP costs */}
                    <span></span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>
                    <span></span>
                    <span></span>
                    {/* Row 2: +15 Power Levels dot */}
                    <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>Ignore 100% Cover</span>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                        {(() => {
                          const arr = safeGetDotsArray(2);
                          const idx = 0;
                          const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                          const rightmostChecked = arr.lastIndexOf(true);
                          const canUncheck = arr[idx] && idx === rightmostChecked;
                          return (
                            <span
                              onClick={() => {
                                if (!arr[idx] && canCheck) {
                                  const newDots = safeCloneClassCardDots();
                                  if (newDots[2]) {
                                    for (let j = 0; j <= idx; ++j) newDots[2][j] = true;
                                  }
                                  persistClassCardDots(newDots, 0, 11);
                                } else if (arr[idx] && canUncheck) {
                                  const newDots = safeCloneClassCardDots();
                                  if (newDots[2]) {
                                    for (let j = idx; j < arr.length; ++j) newDots[2][j] = false;
                                  }
                                  persistClassCardDots(newDots, 0, -11);
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
                    <span></span>
                    <span></span>
                      {/* Row 1: XP costs */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
                      <span></span>
                      {/* Row 2: -1 Cooldown dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>-1 <i>Cooldown</i></span>
                      {[0,1].map(idx => {
                        const arr = safeGetDotsArray(3);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [5, 10];
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
                      <span></span>
                    </div>
                  </div>
                </div>

                {/* Primary Attack section */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
                  
                  {/* Primary Attack Details */}
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
                        defaultValue="Integrated Blasters"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value !== "Integrated Blasters") {
                            setPendingPrimaryWeapon(value);
                            e.target.value = "Integrated Blasters";
                          }
                        }}
                      >
                        <option disabled style={{ fontWeight: 'bold' }}>Integrated Blasters</option>
                        <option style={{ fontWeight: 'bold' }}>Boomstick</option>
                        <option style={{ fontWeight: 'bold' }}>Firestarter</option>
                        <option style={{ fontWeight: 'bold' }}>Sleepytime</option>
                      </select>
                      
                      {/* Buy/Add dialog for Primary Weapon */}
                      {pendingPrimaryWeapon && (
                        <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ fontWeight: 'bold' }}>
                            {pendingPrimaryWeapon}
                            <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                              {getIntegratedBlasterCost(pendingPrimaryWeapon)}c
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => {
                                const cost = getIntegratedBlasterCost(pendingPrimaryWeapon);
                                if (credits < cost) {
                                  setNotice('Not enough credits!');
                                  return;
                                }
                                const newWeapons = [...selectedIntegratedBlasters, pendingPrimaryWeapon];
                                const newCredits = credits - cost;
                                setSelectedIntegratedBlasters(newWeapons);
                                
                                if (sheet && onAutoSave) {
                                  onAutoSave({ 
                                    integratedBlasters: newWeapons,
                                    credits: newCredits
                                  });
                                }
                                
                                onCreditsChange?.(-cost);
                                setPendingPrimaryWeapon("");
                              }}
                            >Buy</button>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => {
                                const newWeapons = [...selectedIntegratedBlasters, pendingPrimaryWeapon];
                                setSelectedIntegratedBlasters(newWeapons);
                                
                                if (sheet && onAutoSave) {
                                  onAutoSave({ 
                                    integratedBlasters: newWeapons,
                                    credits: credits
                                  });
                                }
                                
                                setPendingPrimaryWeapon("");
                              }}
                            >Add</button>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => setPendingPrimaryWeapon("")}
                            >Cancel</button>
                          </div>
                        </div>
                      )}
                      <div style={{ marginTop: '2px' }}>
                        {selectedIntegratedBlasters.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                            {selectedIntegratedBlasters.map((weapon, idx) => (
                              <span key={weapon + idx} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                                {weapon}
                                <button
                                  style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                                  title={`Remove ${weapon}`}
                                  onClick={() => {
                                    const newWeapons = selectedIntegratedBlasters.filter((_, i) => i !== idx);
                                    setSelectedIntegratedBlasters(newWeapons);
                                    
                                    if (sheet && onAutoSave) {
                                      onAutoSave({ 
                                        integratedBlasters: newWeapons
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
                        <span><b><u>Range</u></b> 1hx</span>
                        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{18 - safeGetDotsArray(5).filter(Boolean).length}]</b>+</span>
                      </div>
                      <div>
                        <b><u>Target</u></b> <i>AoE</i> 4hx-Cone
                      </div>
                      <div>
                        <b><u>Damage</u></b> <b>[{2 + (safeGetDotsArray(4).filter(Boolean).length * 2)}]</b>d6
                      </div>
                      <div>
                        <b><u>Crit Effect</u></b> <b>[{2 + (safeGetDotsArray(4).filter(Boolean).length * 2)}]</b>d6, status effect
                      </div>
                    </div>
                  </div>

                  {/* Primary Attack XP progression */}
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
                      {/* Row 1: XP costs */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>13xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>21xp</span>
                      {/* Row 2: +2 Damage dice dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+2 Damage dice</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(4);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [8, 13, 21];
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
                      {/* Row 1: XP costs */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      {/* Row 2: +1 Crit dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(5);
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

                {/* Secondary Attack section */}
                <div style={{ marginTop: '8px' }}>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ marginBottom: '4px' }}>
                      <b><i>Secondary <span style={{ color: '#990000' }}>Attack</span></i></b> (Cooldown <b>[{Math.max(2, 4 - safeGetDotsArray(10).filter(Boolean).length)}]</b>).
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
                        defaultValue="Smart Missiles"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value !== "Smart Missiles") {
                            setPendingSecondaryWeapon(value);
                            e.target.value = "Smart Missiles";
                          }
                        }}
                      >
                        <option disabled style={{ fontWeight: 'bold' }}>Smart Missiles</option>
                        <option style={{ fontWeight: 'bold' }}>Neutron Torpedo</option>
                        <option style={{ fontWeight: 'bold' }}>Pulsar Cannon</option>
                        <option style={{ fontWeight: 'bold' }}>Razor Rain</option>
                      </select>
                      
                      {/* Buy/Add dialog for Secondary Weapon */}
                      {pendingSecondaryWeapon && (
                        <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ fontWeight: 'bold' }}>
                            {pendingSecondaryWeapon}
                            <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                              {getSmartMissileCost(pendingSecondaryWeapon)}c
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => {
                                const cost = getSmartMissileCost(pendingSecondaryWeapon);
                                if (credits < cost) {
                                  setNotice('Not enough credits!');
                                  return;
                                }
                                const newWeapons = [...selectedSmartMissiles, pendingSecondaryWeapon];
                                const newCredits = credits - cost;
                                setSelectedSmartMissiles(newWeapons);
                                
                                if (sheet && onAutoSave) {
                                  onAutoSave({ 
                                    smartMissiles: newWeapons,
                                    credits: newCredits
                                  });
                                }
                                
                                onCreditsChange?.(-cost);
                                setPendingSecondaryWeapon("");
                              }}
                            >Buy</button>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => {
                                const newWeapons = [...selectedSmartMissiles, pendingSecondaryWeapon];
                                setSelectedSmartMissiles(newWeapons);
                                
                                if (sheet && onAutoSave) {
                                  onAutoSave({ 
                                    smartMissiles: newWeapons,
                                    credits: credits
                                  });
                                }
                                
                                setPendingSecondaryWeapon("");
                              }}
                            >Add</button>
                            <button
                              style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                              onClick={() => setPendingSecondaryWeapon("")}
                            >Cancel</button>
                          </div>
                        </div>
                      )}
                      <div style={{ marginTop: '2px' }}>
                        {selectedSmartMissiles.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                            {selectedSmartMissiles.map((weapon, idx) => (
                              <span key={weapon + idx} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                                {weapon}
                                <button
                                  style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                                  title={`Remove ${weapon}`}
                                  onClick={() => {
                                    const newWeapons = selectedSmartMissiles.filter((_, i) => i !== idx);
                                    setSelectedSmartMissiles(newWeapons);
                                    
                                    if (sheet && onAutoSave) {
                                      onAutoSave({ 
                                        smartMissiles: newWeapons
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
                        <span><b><u>Range</u></b> <b>[{12 + (safeGetDotsArray(8).filter(Boolean).length * 3)}]</b>hx</span>
                        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{18 - safeGetDotsArray(9).filter(Boolean).length}]</b>+</span>
                      </div>
                      <div>
                        <b><u>Target</u></b> Single, Arcing, Repeat <b>[{1 + safeGetDotsArray(7).filter(Boolean).length}]</b>
                      </div>
                      <div>
                        <b><u>Damage</u></b> <b>[{1 + safeGetDotsArray(6).filter(Boolean).length}]</b>d4
                      </div>
                      <div>
                        <b><u>Crit Effect</u></b> <b>[{1 + safeGetDotsArray(6).filter(Boolean).length}]</b>d4, status effect
                      </div>
                    </div>
                  </div>
                
                  {/* Secondary Attack XP progression */}
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
                    </div>
                  </div>

                  {/* Secondary Attack XP progression */}
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
                      {/* Row 1: XP costs */}
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
                      {/* Row 1: XP costs */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>21xp</span>
                      <span></span>
                      {/* Row 2: Repeat +1 dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>Repeat +1</span>
                      {[0,1].map(idx => {
                        const arr = safeGetDotsArray(7);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [12, 21];
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
                      <span></span>
                      {/* Row 1: XP costs */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
                      {/* Row 2: +1d6 Damage dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+3hx Range</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(8);
                        const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                        const rightmostChecked = arr.lastIndexOf(true);
                        const canUncheck = arr[idx] && idx === rightmostChecked;
                        const xpCosts = [4, 8, 12];
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
                      {/* Row 1: XP costs */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                      {/* Row 2: +1 Crit dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
                      {[0,1,2].map(idx => {
                        const arr = safeGetDotsArray(9);
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
                      {/* Row 1: XP costs */}
                      <span></span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                      <span></span>
                      {/* Row 2: -1 Cooldown dots */}
                      <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>-1 <i>Cooldown</i></span>
                      {[0,1].map(idx => {
                        const arr = safeGetDotsArray(10);
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
                      <span></span>
                    </div>
                  </div>
                </div>

                {/* Perks section */}
                <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <i><b>Skills.</b> Athletics</i> +2
                  </div>
                  <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ display: 'inline-block', maxWidth: 'calc(100% - 40px)' }}>
                        <b><i style={{ color: '#117233' }}>Man in the Machine.</i></b> Your specialized armor provides the capability of withstanding a multitude of extreme environments, including heat, cold, underwater, very high altitudes and the vacuum of space. 
                      </span>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '24px',
                        gridTemplateRows: 'repeat(2, auto)',
                        alignItems: 'start',
                        marginLeft: '4px'
                      }}>
                      {/* Row 1: 7sp */}
                        <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7sp</span>
                      {/* Row 2: dot (interactive) */}
                      <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px', width: '100%' }}>
                          {(() => {
                            const arr = safeGetDotsArray(11);
                            const idx = 0;
                            const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                            const rightmostChecked = arr.lastIndexOf(true);
                            const canUncheck = arr[idx] && idx === rightmostChecked;
                            return (
                              <span
                                onClick={() => {
                                  if (!arr[idx] && canCheck) {
                                    const newDots = safeCloneClassCardDots();
                                    if (newDots[11]) {
                                      for (let j = 0; j <= idx; ++j) newDots[11][j] = true;
                                    }
                                    persistClassCardDots(newDots, 7, 0);
                                  } else if (arr[idx] && canUncheck) {
                                    const newDots = safeCloneClassCardDots();
                                    if (newDots[11]) {
                                      for (let j = idx; j < arr.length; ++j) newDots[11][j] = false;
                                    }
                                    persistClassCardDots(newDots, -7, 0);
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
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            )}
    

          </div>
        
      );
};

export default LevelUpClassExospecialist;