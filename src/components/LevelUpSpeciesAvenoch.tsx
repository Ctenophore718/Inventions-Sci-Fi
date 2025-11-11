import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateFirstInFlightJSX } from "../utils/avenochFeature";
import { generateAvianGazeJSX } from "../utils/avenochTechnique";

type LevelUpSpeciesAvenochProps = {
  sheet: CharacterSheet | null;
  species: string;
  onAutoSave?: (updates: Partial<CharacterSheet>) => void;
  xpTotal: number;
  spTotal: number;
  xpSpent: number;
  spSpent: number;
  setXpSpent: (xp: number) => void;
  setSpSpent: (sp: number) => void;
  setNotice: (notice: string) => void;
};

const LevelUpSpeciesAvenoch: React.FC<LevelUpSpeciesAvenochProps> = ({ 
  sheet, 
  species,
  onAutoSave,
  xpTotal,
  spTotal, 
  xpSpent,
  spSpent,
  setXpSpent,
  setSpSpent,
  setNotice
}) => {
  
  // Avenoch species card dots default structure
  const defaultAvenochDots = [ 
    [false, false, false], // Move: +2hx (3 dots)
    [false, false],        // +1 Crit (2 dots)
    [false, false, false], // Attack Range: +2hx (3 dots)
    [false, false, false], // Technique: +2hx Range (3 dots)
    [false],               // Technique: -1 Cooldown (1 dot)
    [false, false, false], // Hit Points: +5 (3 dots)
    [false, false],        // Hit Points: +10 (2 dots)
    [false],               // Hit Points: +15 (1 dot)
    [false, false, false], // Movement: +1 Speed (3 dots)
    [false],               // Perk: Keen Eyes (1 dot - 11sp)
  ];

  // Local state for species card dots (Avenoch)
  const [speciesCardDots, setSpeciesCardDots] = useState<boolean[][]>(() => {
    if (sheet?.speciesCardDots && Array.isArray(sheet.speciesCardDots) && sheet.speciesCardDots.length > 0) {
      return sheet.speciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    return defaultAvenochDots.map(row => [...row]);
  });

  // Helper function to safely access speciesCardDots array
  const safeGetDotsArray = (index: number): boolean[] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || index >= speciesCardDots.length) {
      return defaultAvenochDots[index] || [];
    }
    return speciesCardDots[index] || [];
  };

  // Helper function to safely clone speciesCardDots array
  const safeCloneSpeciesCardDots = (): boolean[][] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || speciesCardDots.length === 0) {
      return defaultAvenochDots.map(row => [...row]);
    }
    return speciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
  };

  // Save to sheet and localStorage
  const persistSpeciesCardDots = (newDots: boolean[][], spSpentDelta: number = 0, xpSpentDelta: number = 0) => {
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
    
    setSpeciesCardDots(newDots);
    newSpSpent = Math.max(0, newSpSpent);
    newXpSpent = Math.max(0, newXpSpent);
    setSpSpent(newSpSpent);
    setXpSpent(newXpSpent);
    
    if (sheet && onAutoSave) {
      onAutoSave({ speciesCardDots: newDots, spSpent: newSpSpent, xpSpent: newXpSpent });
    }
  };

  return (
    <div>
      {/* Avenoch Species Content */}
      {species === "Avenoch" && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateFirstInFlightJSX({
                crit: safeGetDotsArray(1).filter(Boolean).length,
                range: safeGetDotsArray(2).filter(Boolean).length * 2,
                move: 2 + safeGetDotsArray(0).filter(Boolean).length * 2,
              })}
            </span>
          </div>

          {/* Move and Crit Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(5, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for Move */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              
              {/* Row 2: Move +2hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i style={{ color: '#38761d' }}>Move</i></b> +2hx</span>
              {[0,1,2].map(idx => {
                const arr = safeGetDotsArray(0);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [4, 6, 10];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[0][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[0][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
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

              {/* Row 3: XP header for Crit */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span></span>
              
              {/* Row 4: +1 Crit dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit</span>
              {[0,1].map(idx => {
                const arr = safeGetDotsArray(1);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [3, 5];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[1][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[1][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
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

              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              
              {/* Row 2: +2hx Attack Range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2hx <b><i style={{ color: '#990000' }}>Attack</i></b> Range</span>
              {[0,1,2].map(idx => {
                const arr = safeGetDotsArray(2);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [4, 6, 10];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[2][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[2][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
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

          {/* Technique Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateAvianGazeJSX(sheet?.speciesCardDots)}
            </span>
          </div>

          {/* Technique Upgrades Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(4, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for Range */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              
              {/* Row 2: +2hx Range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2hx Range</span>
              {[0,1,2].map(idx => {
                const arr = safeGetDotsArray(3);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [4, 6, 10];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[3][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[3][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
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

              {/* Row 3: XP header for Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span></span>
              <span></span>
              
              {/* Row 4: -1 Cooldown dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(4);
                const xpCosts = [4];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx]) {
                          newDots[4][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
                          newDots[4][idx] = false;
                          persistSpeciesCardDots(newDots, 0, -xpCosts[idx]);
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
              })}
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Hit Points Section */}
          <div style={{ color: '#990000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Hit Points</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Starting Hit Points.</i></b> 35
            </span>
          </div>

          {/* Hit Points Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(6, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for +5 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              
              {/* Row 2: +5 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 Hit Points</span>
              {[0,1,2].map(idx => {
                const arr = safeGetDotsArray(5);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [3, 4, 5];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[5][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[5][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
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

              {/* Row 3: XP header for +10 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span></span>
              
              {/* Row 4: +10 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 Hit Points</span>
              {[0,1].map(idx => {
                const arr = safeGetDotsArray(6);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [7, 9];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[6][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[6][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
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

              {/* Row 5: XP header for +15 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
              <span></span>
              <span></span>
              
              {/* Row 6: +15 Hit Points dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+15 Hit Points</span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(7);
                const xpCosts = [16];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx]) {
                          newDots[7][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
                          newDots[7][idx] = false;
                          persistSpeciesCardDots(newDots, 0, -xpCosts[idx]);
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
              })}
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Movement Section */}
          <div style={{ color: '#38761d', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Starting Speed.</i></b> 6hx.
            </span>
          </div>

          {/* Movement Speed Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Speed</span>
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
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[8][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[8][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
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

          {/* Perks Section */}
          <div style={{ color: '#000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Skills.</i></b> Awareness +2<br/>
              <b><i>Languages.</i></b> Avenoch
            </span>
          </div>

          {/* Keen Eyes Perk */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: SP header */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left' }}>
                <b><i>Keen Eyes.</i></b> You are naturally adept at being aware of your visual surroundings, picking up on subtle patterns in the tapestry of the situation, or otherwise being highly observant. Gain an advantage on related skill rolls using your sight.
              </span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11sp</span>
              
              {/* Row 2: Keen Eyes dot */}
              <span></span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(9);
                const spCosts = [11];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx]) {
                          newDots[9][idx] = true;
                          persistSpeciesCardDots(newDots, spCosts[idx], 0);
                        } else {
                          newDots[9][idx] = false;
                          persistSpeciesCardDots(newDots, -spCosts[idx], 0);
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
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default LevelUpSpeciesAvenoch;
