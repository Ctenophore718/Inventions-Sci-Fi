import React, { useState, useEffect, memo, useCallback, useRef } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateImmutableEnergyReservesJSX } from "../utils/lumenarenFeature";
import { generateLightspeedJSX } from "../utils/lumenarenTechnique";
import { generateInfraredTrackingJSX } from "../utils/infraredFeature";
import { generateHeatSinkJSX } from "../utils/infraredTechnique";

type LevelUpSpeciesLumenarenProps = {
  sheet: CharacterSheet | null;
  species: string;
  subspecies?: string;
  contentType?: 'species' | 'subspecies';
  onAutoSave?: (updates: Partial<CharacterSheet>) => void;
  xpTotal: number;
  spTotal: number;
  xpSpent: number;
  spSpent: number;
  setXpSpent: (xp: number) => void;
  setSpSpent: (sp: number) => void;
  setNotice: (notice: string) => void;
};

const LevelUpSpeciesLumenaren: React.FC<LevelUpSpeciesLumenarenProps> = ({ 
  sheet, 
  species,
  subspecies,
  contentType = 'species',
  onAutoSave,
  xpTotal,
  spTotal, 
  xpSpent,
  spSpent,
  setXpSpent,
  setSpSpent,
  setNotice
}) => {
  
  // Lumenaren species card dots default structure
  const defaultLumenarenDots = [ 
    [false],               // Feature: Electric and Force Immunity (10xp)
    [false],               // Feature: Electric and Force Absorption (16xp)
    [false, false, false], // Technique: +5hx range (5xp, 9xp, 14xp)
    [false, false],        // Technique: -1 Cooldown (5xp, 10xp)
    [false, false, false], // Hit Points: +5 (3xp, 4xp, 6xp)
    [false, false],        // Hit Points: +10 (7xp, 10xp)
    [false],               // Hit Points: +15 (14xp)
    [false],               // Movement: +1 Speed (6xp)
    [false],               // Perk: Natural Battery (13sp)
  ];

  // Infrared subspecies card dots default structure
  const defaultInfraredDots = [
    [false, false, false], // Technique: +1hx range (3xp, 6xp, 9xp)
    [false],               // Technique: Resist damage taken (18xp)
    [false, false],        // Technique: -1 Cooldown (5xp, 8xp)
    [false],               // Strike: Inflict Spike (Fire) (12xp)
    [false],               // Perk: Visions of Calefaction (8sp)
  ];

  // Local state for species card dots
  const [speciesCardDots, setSpeciesCardDots] = useState<boolean[][]>(() => {
    if (sheet?.speciesCardDots && Array.isArray(sheet.speciesCardDots) && sheet.speciesCardDots.length > 0) {
      return sheet.speciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    return defaultLumenarenDots.map(row => [...row]);
  });

  // Helper function to safely access speciesCardDots array
  const safeGetDotsArray = (index: number): boolean[] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || index >= speciesCardDots.length) {
      return defaultLumenarenDots[index] || [];
    }
    return speciesCardDots[index] || [];
  };

  // Helper function to safely clone speciesCardDots array
  const safeCloneSpeciesCardDots = (): boolean[][] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || speciesCardDots.length === 0) {
      return defaultLumenarenDots.map(row => [...row]);
    }
    return speciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
  };

  // Use ref for sheet to avoid stale closures and unnecessary re-renders
  const sheetRef = useRef(sheet);
  useEffect(() => {
    sheetRef.current = sheet;
  }, [sheet]);

  // Save to sheet and localStorage
  const persistSpeciesCardDots = useCallback((newDots: boolean[][], spSpentDelta: number = 0, xpSpentDelta: number = 0) => {
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
    
    const currentSheet = sheetRef.current;
    if (currentSheet && onAutoSave) {
      onAutoSave({ 
        speciesCardDots: newDots, 
        spSpent: newSpSpent, 
        xpSpent: newXpSpent
      });
    }
  }, [spSpent, xpSpent, xpTotal, spTotal, onAutoSave, setSpSpent, setXpSpent, setNotice]);

  // Local state for subspecies card dots
  const [subspeciesCardDots, setSubspeciesCardDots] = useState<boolean[][]>(() => {
    if (sheet?.subspeciesCardDots && Array.isArray(sheet.subspeciesCardDots) && sheet.subspeciesCardDots.length > 0) {
      return sheet.subspeciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    // Return appropriate default based on subspecies
    return defaultInfraredDots.map(row => [...row]);
  });

  // Helper function to safely access subspeciesCardDots array
  const safeGetSubspeciesDotsArray = (index: number): boolean[] => {
    if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots) || index >= subspeciesCardDots.length) {
      return defaultInfraredDots[index] || [];
    }
    return subspeciesCardDots[index] || [];
  };

  // Helper function to safely clone subspeciesCardDots array
  const safeCloneSubspeciesCardDots = (): boolean[][] => {
    if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots) || subspeciesCardDots.length === 0) {
      return defaultInfraredDots.map(row => [...row]);
    }
    return subspeciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
  };

  // Save subspecies dots to sheet and localStorage
  const persistSubspeciesCardDots = (newDots: boolean[][], spSpentDelta: number = 0, xpSpentDelta: number = 0) => {
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
    
    setSubspeciesCardDots(newDots);
    newSpSpent = Math.max(0, newSpSpent);
    newXpSpent = Math.max(0, newXpSpent);
    setSpSpent(newSpSpent);
    setXpSpent(newXpSpent);
    
    if (sheet && onAutoSave) {
      onAutoSave({ 
        subspeciesCardDots: newDots, 
        spSpent: newSpSpent, 
        xpSpent: newXpSpent
      });
    }
  };

  // Sync state if sheet.speciesCardDots changes externally (only if different)
  useEffect(() => {
    if (sheet?.speciesCardDots && Array.isArray(sheet.speciesCardDots)) {
      // Check if the dots are actually different before updating
      const sheetsDotsStr = JSON.stringify(sheet.speciesCardDots);
      const localDotsStr = JSON.stringify(speciesCardDots);
      
      if (sheetsDotsStr !== localDotsStr) {
        const expectedLength = defaultLumenarenDots.length;
        if (sheet.speciesCardDots.length !== expectedLength) {
          const correctedDots = defaultLumenarenDots.map((defaultRow, idx) => 
            sheet.speciesCardDots && sheet.speciesCardDots[idx] 
              ? [...sheet.speciesCardDots[idx]] 
              : [...defaultRow]
          );
          setSpeciesCardDots(correctedDots);
        } else {
          setSpeciesCardDots(sheet.speciesCardDots.map(row => Array.isArray(row) ? [...row] : []));
        }
      }
    }
  }, [sheet?.speciesCardDots]);

  return (
    <div style={{ width: '100%', fontSize: '1em' }}>
      {/* Lumenaren Species Card */}
      {species === "Lumenaren" && contentType === 'species' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateImmutableEnergyReservesJSX(
                safeGetDotsArray(0)[0] || false,
                safeGetDotsArray(1)[0] || false
              )}
            </span>
          </div>

          {/* Feature Upgrades Table */}
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
              {/* Row 1: XP header for Electric and Force Immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Electric and Force Immunity */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <i>Immunity</i></span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(0);
                const xpCosts = [10];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx]) {
                          newDots[0][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
                          newDots[0][idx] = false;
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

              {/* Row 3: Arrow and XP header for Electric and Force Absorption */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
              {/* Row 4: Electric and Force Absorption */}
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <i>Absorption</i></span>
              <span style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', color: '#000' }}>⤷</span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(1);
                const xpCosts = [16];
                const canSelect = safeGetDotsArray(0)[0];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!canSelect && !arr[idx]) return;
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx]) {
                          newDots[1][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
                          newDots[1][idx] = false;
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
                        cursor: (canSelect || arr[idx]) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Technique Section */}
          <div style={{ color: '#bf9000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateLightspeedJSX(
                3 - safeGetDotsArray(3).filter(Boolean).length,
                10 + (safeGetDotsArray(2).filter(Boolean).length * 5)
              )}
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
              {/* Row 1: XP header for +5hx range */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>14xp</span>
              {/* Row 2: +5hx range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5hx</span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetDotsArray(2);
                const xpCosts = [5, 9, 14];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[2][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
                          newDots[2][idx] = false;
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 3: XP header for -1 Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              <span></span>
              {/* Row 4: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0, 1].map(idx => {
                const arr = safeGetDotsArray(3);
                const xpCosts = [5, 10];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[3][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
                          newDots[3][idx] = false;
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Hit Points Section */}
          <div style={{ fontSize: '1em', color: '#990000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Hit Points</u></div>
          </div>

          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Starting</b></i> <i><b style={{ color: '#990000' }}>Hit Points.</b></i> 30 + <b>[{
              (speciesCardDots[4]?.filter(Boolean).length || 0) * 5 +
              (speciesCardDots[5]?.filter(Boolean).length || 0) * 10 +
              (speciesCardDots[6]?.[0] ? 15 : 0)
            }]</b> <i><b style={{ color: '#990000' }}>Hit Points.</b></i>
          </div>

          {/* Hit Points Upgrades */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              {/* Row 2: +5 HP dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 <i><b style={{ color: '#990000' }}>Hit Points</b></i></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetDotsArray(4);
                const xpCosts = [3, 4, 6];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[4][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 3: XP header for +10 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              <span></span>
              {/* Row 4: +10 HP dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <i><b style={{ color: '#990000' }}>Hit Points</b></i></span>
              {[0, 1].map(idx => {
                const arr = safeGetDotsArray(5);
                const xpCosts = [7, 10];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[5][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
                          newDots[5][idx] = false;
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 5: XP header for +15 HP */}
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>14xp</span>
              <span></span>
              <span></span>
              {/* Row 6: +15 HP dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+15 <i><b style={{ color: '#990000' }}>Hit Points</b></i></span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(6);
                const xpCosts = [14];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx]) {
                          newDots[6][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
                          newDots[6][idx] = false;
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
            </div>
          </div>

          {/* Movement Section */}
          <div style={{ fontSize: '1em', color: '#016f32', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#016f32', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
          </div>

          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Starting</b></i> <i><b style={{ color: '#016f32' }}>Speed.</b></i> 5hx + <b>[{safeGetDotsArray(7).filter(Boolean).length}]</b>hx <i><b style={{ color: '#016f32' }}>Speed</b></i>.
          </div>

          {/* Movement Upgrades */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for +1 Speed */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span></span>
              {/* Row 2: +1 Speed dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <i><b style={{ color: '#016f32' }}>Speed</b></i></span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(7);
                const xpCosts = [6];
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
            </div>
          </div>

          {/* Perks Section */}
          <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', marginBottom: '8px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          </div>

          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b></i> <i>Stealth</i> +2
          </div>

          <div style={{ fontSize: '1em', color: '#000', marginBottom: '-12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Languages.</b></i> Lumenaren, Choose 1
            
            {/* Language Dropdown */}
            <div style={{ marginTop: '8px', marginLeft: '24px' }}>
              <select
                value=""
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && onAutoSave) {
                    onAutoSave({ lumenarenLanguage: val });
                  }
                }}
                disabled={!!sheet?.lumenarenLanguage}
                style={{
                  fontSize: '1em',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  background: sheet?.lumenarenLanguage ? '#eee' : '#fff',
                  textAlign: 'left',
                  minWidth: '200px',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontWeight: 'bold',
                  color: '#000',
                  cursor: sheet?.lumenarenLanguage ? 'not-allowed' : 'pointer'
                }}
              >
                <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                  {sheet?.lumenarenLanguage ? 'Language Selected' : 'Languages'}
                </option>
                {!sheet?.lumenarenLanguage && sheet?.species !== 'Avenoch' && (
                  <option value="Avenoch" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Avenoch</option>
                )}
                {!sheet?.lumenarenLanguage && (
                  <option value="Binary" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Binary</option>
                )}
                {!sheet?.lumenarenLanguage && (
                  <option value="Body Language" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Body Language</option>
                )}
                {!sheet?.lumenarenLanguage && sheet?.species !== 'Cerebronych' && (
                  <option value="Cerebronych" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Cerebronych</option>
                )}
                {!sheet?.lumenarenLanguage && sheet?.species !== 'Chloroptid' && (
                  <option value="Chloroptid" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Chloroptid</option>
                )}
                {!sheet?.lumenarenLanguage && (
                  <option value="Defteran" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Defteran</option>
                )}
                {!sheet?.lumenarenLanguage && sheet?.species !== 'Entomos' && (
                  <option value="Entomos" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Entomos</option>
                )}
                {!sheet?.lumenarenLanguage && (
                  <option value="Hycryptice" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Hycryptice</option>
                )}
                {!sheet?.lumenarenLanguage && (
                  <option value="Galactapol Jargon" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Galactapol Jargon</option>
                )}
                {!sheet?.lumenarenLanguage && (
                  <option value="Lux" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lux</option>
                )}
                {!sheet?.lumenarenLanguage && sheet?.charClass !== 'Coder' && (
                  <option value="Oikovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Oikovox</option>
                )}
                {!sheet?.lumenarenLanguage && (
                  <option value="Praedari" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Praedari</option>
                )}
                {!sheet?.lumenarenLanguage && sheet?.charClass !== 'Elementalist' && (
                  <option value="Xenoelemental" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenoelemental</option>
                )}
                {!sheet?.lumenarenLanguage && sheet?.charClass !== 'Devout' && (
                  <option value="Xenovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenovox</option>
                )}
              </select>

              {/* Display selected language */}
              {sheet?.lumenarenLanguage && (
                <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#000', fontWeight: 'bold' }}>
                    {sheet.lumenarenLanguage}
                  </span>
                  <button
                    onClick={() => {
                      if (onAutoSave) {
                        onAutoSave({ lumenarenLanguage: undefined });
                      }
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#cc0000',
                      fontSize: '1.2em',
                      cursor: 'pointer',
                      padding: 0,
                      lineHeight: 1
                    }}
                    title="Remove language"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Perks Upgrades */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '-12px', marginBottom: '16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px',
            gridTemplateRows: 'auto auto',
            columnGap: '6px',
            rowGap: '2px',
            alignItems: 'start',
            marginTop: '8px',
            marginBottom: '2px',
            width: '100%',
            paddingLeft: '4px'
          }}>
              {/* Row 1: SP header for Natural Battery */}
              <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>14sp</span>
   
              {/* Row 2: Natural Battery dot */}

              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}><b><i style={{ color: '#515f2b' }}>Natural Battery.</i></b> You are a creature of pure energy and light, and can thus charge any adjacent technologic device up to 7hx in size to full power in seconds, from a simple stopwatch to a ship's engine.</span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(8);
                const spCosts = [13];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx]) {
                          newDots[8][idx] = true;
                          persistSpeciesCardDots(newDots, spCosts[idx], 0);
                        } else {
                          newDots[8][idx] = false;
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

      {/* Infrared Subspecies Content */}
      {subspecies === "Infrared" && contentType === 'subspecies' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateInfraredTrackingJSX()}
            </span>
          </div>

          {/* Technique Section */}
          <div style={{ color: '#bf9000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateHeatSinkJSX(
                4 - safeGetSubspeciesDotsArray(2).filter(Boolean).length,
                3 + safeGetSubspeciesDotsArray(0).filter(Boolean).length,
                safeGetSubspeciesDotsArray(1)[0] || false
              )}
            </span>
          </div>

          {/* Technique Upgrades Table */}
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
              {/* Row 1: XP header for +1hx */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              {/* Row 2: +1hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(0);
                const xpCosts = [3, 6, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[0][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
                          newDots[0][idx] = false;
                          persistSubspeciesCardDots(newDots, 0, -xpCosts[idx]);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 3: XP header for Resist damage taken */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>18xp</span>
              <span></span>
              <span></span>
              {/* Row 4: Resist damage taken dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><i>Resist</i> Damage taken</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(1);
                const xpCosts = [18];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[1][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
                          newDots[1][idx] = false;
                          persistSubspeciesCardDots(newDots, 0, -xpCosts[idx]);
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

              {/* Row 5: XP header for -1 Cooldown */}
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span></span>
              {/* Row 6: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(2);
                const xpCosts = [5, 8];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[2][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
                          newDots[2][idx] = false;
                          persistSubspeciesCardDots(newDots, 0, -xpCosts[idx]);
                        }
                      }}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: arr[idx] ? '#000' : '#fff',
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Strike Section */}
          <div style={{ fontSize: '1em', color: '#351c75', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Enhanced</i></b> <b><i style={{ color: '#351c75' }}>Strike</i></b> <b><i>Effects.</i></b> {safeGetSubspeciesDotsArray(3)[0] ? <><b><i>Spike</i></b> (<b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>)</> : null}
            </span>
          </div>

          {/* Strike Upgrades Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for Inflict Spike (Fire) */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              <span></span>
              {/* Row 2: Inflict Spike (Fire) dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Spike</i></b> (<b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>)</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(3);
                const xpCosts = [12];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[3][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
                          newDots[3][idx] = false;
                          persistSubspeciesCardDots(newDots, 0, -xpCosts[idx]);
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

          {/* Perks Section */}
          <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', marginBottom: '8px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          </div>

          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b></i> <i>Performance</i> +2
          </div>

          {/* Perks Upgrades */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '-12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px',
              gridTemplateRows: 'auto auto',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: SP header for Visions of Calefaction */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8sp</span>
              
              {/* Row 2: Visions of Calefaction dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}><b><i style={{ color: '#b17fbe' }}>Visions of Calefaction.</i></b> Your natural infrared vision allows you to see easily in the dark, and you can spot any heat signatures from upwards of miles away. Gain an advantage on related skill rolls.</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(4);
                const spCosts = [8];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[4][idx] = true;
                          persistSubspeciesCardDots(newDots, spCosts[idx], 0);
                        } else {
                          newDots[4][idx] = false;
                          persistSubspeciesCardDots(newDots, -spCosts[idx], 0);
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

export default memo(LevelUpSpeciesLumenaren);
