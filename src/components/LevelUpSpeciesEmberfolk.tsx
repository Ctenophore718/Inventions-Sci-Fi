import React, { useState, useCallback, useRef, useEffect } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateBornOfFireJSX } from "../utils/emberfolkFeature";
import { generateOppressiveHeatJSX } from "../utils/emberfolkTechnique";
import { generateMountainsEnduranceJSX } from "../utils/petranFeature";
import { generateStonyRestorationJSX } from "../utils/petranTechnique";
import { generateIgnitionJSX } from "../utils/pyranFeature";
import { generateBlazingLeapJSX } from "../utils/pyranTechnique";

type LevelUpSpeciesEmberfolkProps = {
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

const LevelUpSpeciesEmberfolk: React.FC<LevelUpSpeciesEmberfolkProps> = ({ 
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
  
  // Emberfolk species card dots default structure
  const defaultEmberfolkDots = [ 
    [false],               // Feature: Fire immunity (5xp)
    [false],               // Feature: Fire absorption (15xp)
    [false, false, false], // Technique: +1hx Range (4xp, 7xp, 11xp)
    [false, false, false], // Technique: +1 Spike (Fire) (8xp, 12xp, 18xp)
    [false],               // Technique: Inflict Demoralize (7xp)
    [false, false],        // Technique: -1 Cooldown (5xp, 9xp)
    [false, false],        // Movement: +1 Speed (5xp, 9xp)
    [false],               // Perk: Molten Fortitude (7sp)
  ];

  // Petran subspecies card dots default structure
  const defaultPetranDots = [
    [false],               // Feature: Bludgeoning immunity (6xp)
    [false],               // Feature: Piercing resistance (4xp)
    [false],               // Feature: Slashing resistance (4xp)
    [false],               // Feature: Drain immunity (4xp)
    [false, false, false], // Technique: +1d6 Hit Points (4xp, 7xp, 11xp)
    [false, false],        // Technique: +1 Speed this turn (4xp, 7xp)
    [false],               // Technique: -1 Cooldown (11xp)
    [false, false, false], // Hit Points: +5 (2xp, 3xp, 5xp)
    [false, false, false], // Hit Points: +10 (5xp, 8xp, 12xp)
    [false, false, false], // Hit Points: +15 (13xp, 18xp, 23xp)
    [false],               // Strike: Inflict Restrain (6xp)
    [false],               // Perk: Stone Artisan (8sp)
  ];

  // Pyran subspecies card dots default structure
  const defaultPyranDots = [
    [false, false],        // Feature: +1 Spike (Fire) (11xp, 16xp)
    [false, false, false], // Technique: +1hx range (4xp, 7xp, 11xp)
    [false, false, false], // Technique: +1d6 Fire (5xp, 8xp, 12xp)
    [false, false],        // Technique: Repeat Fire and Teleport (11xp, 20xp)
    [false, false],        // Technique: -1 Cooldown (5xp, 9xp)
    [false, false, false], // Hit Points: +5 (3xp, 4xp, 5xp)
    [false, false, false], // Hit Points: +10 (7xp, 9xp, 12xp)
    [false],               // Hit Points: +15 (16xp)
    [false, false],        // Movement: +1 Speed (5xp, 9xp)
    [false],               // Movement: Creature Jump 3hx (5xp)
    [false, false],        // Movement: +1 Jump Speed (4xp, 6xp)
    [false],               // Strike: Inflict Spike (Fire) (6xp)
    [false],               // Perk: Fiery Creations (8sp)
  ];

  // Local state for species card dots
  const [speciesCardDots, setSpeciesCardDots] = useState<boolean[][]>(() => {
    if (sheet?.speciesCardDots && Array.isArray(sheet.speciesCardDots) && sheet.speciesCardDots.length > 0) {
      return sheet.speciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    return defaultEmberfolkDots.map(row => [...row]);
  });

  // Helper function to safely access speciesCardDots array
  const safeGetDotsArray = (index: number): boolean[] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || index >= speciesCardDots.length) {
      return defaultEmberfolkDots[index] || [];
    }
    return speciesCardDots[index] || [];
  };

  // Helper function to safely clone speciesCardDots array
  const safeCloneSpeciesCardDots = (): boolean[][] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || speciesCardDots.length === 0) {
      return defaultEmberfolkDots.map(row => [...row]);
    }
    return speciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
  };

  // Refs to always have the latest prop values (avoids race conditions with async auto-save)
  const xpSpentRef = useRef(xpSpent);
  const spSpentRef = useRef(spSpent);
  const hasPendingUpdatesRef = useRef(false);
  const sheetRef = useRef(sheet);

  // Keep refs in sync with props
  useEffect(() => {
    if (hasPendingUpdatesRef.current) return;
    xpSpentRef.current = xpSpent;
  }, [xpSpent]);

  useEffect(() => {
    if (hasPendingUpdatesRef.current) return;
    spSpentRef.current = spSpent;
  }, [spSpent]);

  useEffect(() => {
    sheetRef.current = sheet;
  }, [sheet]);

  // Save to sheet and localStorage
  const persistSpeciesCardDots = useCallback((newDots: boolean[][], spSpentDelta: number = 0, xpSpentDelta: number = 0) => {
    hasPendingUpdatesRef.current = true;
    let newSpSpent = spSpentRef.current + spSpentDelta;
    let newXpSpent = xpSpentRef.current + xpSpentDelta;
    
    // Enforce XP/SP cannot exceed total
    if (newXpSpent > xpTotal) {
      setNotice("Not enough xp!");
      hasPendingUpdatesRef.current = false;
      return;
    }
    if (newSpSpent > spTotal) {
      setNotice("Not enough sp!");
      hasPendingUpdatesRef.current = false;
      return;
    }
    
    setSpeciesCardDots(newDots);
    newSpSpent = Math.max(0, newSpSpent);
    newXpSpent = Math.max(0, newXpSpent);
    spSpentRef.current = newSpSpent;
    xpSpentRef.current = newXpSpent;
    setSpSpent(newSpSpent);
    setXpSpent(newXpSpent);
    
    if (sheetRef.current && onAutoSave) {
      onAutoSave({ 
        speciesCardDots: newDots, 
        spSpent: newSpSpent, 
        xpSpent: newXpSpent
      });
    }
    hasPendingUpdatesRef.current = false;
  }, [xpTotal, spTotal, setNotice, setSpSpent, setXpSpent, onAutoSave]);

  // Local state for subspecies card dots (Petran)
  const [subspeciesCardDots, setSubspeciesCardDots] = useState<boolean[][]>(() => {
    if (sheet?.subspeciesCardDots && Array.isArray(sheet.subspeciesCardDots) && sheet.subspeciesCardDots.length > 0) {
      return sheet.subspeciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    // Use the correct default based on subspecies
    if (subspecies === 'Pyran') {
      return defaultPyranDots.map(row => [...row]);
    }
    return defaultPetranDots.map(row => [...row]);
  });

  // Helper function to safely access subspeciesCardDots array
  const safeGetSubspeciesDotsArray = (index: number): boolean[] => {
    if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots) || index >= subspeciesCardDots.length) {
      if (subspecies === 'Pyran') {
        return defaultPyranDots[index] || [];
      }
      return defaultPetranDots[index] || [];
    }
    return subspeciesCardDots[index] || [];
  };

  // Helper function to safely clone subspeciesCardDots array
  const safeCloneSubspeciesCardDots = (): boolean[][] => {
    if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots) || subspeciesCardDots.length === 0) {
      if (subspecies === 'Pyran') {
        return defaultPyranDots.map(row => [...row]);
      }
      return defaultPetranDots.map(row => [...row]);
    }
    return subspeciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
  };

  // Save subspecies dots to sheet and localStorage
  const persistSubspeciesCardDots = useCallback((newDots: boolean[][], spSpentDelta: number = 0, xpSpentDelta: number = 0) => {
    hasPendingUpdatesRef.current = true;
    let newSpSpent = spSpentRef.current + spSpentDelta;
    let newXpSpent = xpSpentRef.current + xpSpentDelta;
    
    // Enforce XP/SP cannot exceed total
    if (newXpSpent > xpTotal) {
      setNotice("Not enough xp!");
      hasPendingUpdatesRef.current = false;
      return;
    }
    if (newSpSpent > spTotal) {
      setNotice("Not enough sp!");
      hasPendingUpdatesRef.current = false;
      return;
    }
    
    setSubspeciesCardDots(newDots);
    newSpSpent = Math.max(0, newSpSpent);
    newXpSpent = Math.max(0, newXpSpent);
    spSpentRef.current = newSpSpent;
    xpSpentRef.current = newXpSpent;
    setSpSpent(newSpSpent);
    setXpSpent(newXpSpent);
    
    if (sheetRef.current && onAutoSave) {
      onAutoSave({ 
        subspeciesCardDots: newDots, 
        spSpent: newSpSpent, 
        xpSpent: newXpSpent
      });
    }
    hasPendingUpdatesRef.current = false;
  }, [xpTotal, spTotal, setNotice, setSpSpent, setXpSpent, onAutoSave]);

  // Reset subspeciesCardDots when subspecies changes between Petran and Pyran
  useEffect(() => {
    if (hasPendingUpdatesRef.current) return;
    if (subspecies === 'Pyran' && subspeciesCardDots.length !== defaultPyranDots.length) {
      setSubspeciesCardDots(defaultPyranDots.map(row => [...row]));
    } else if (subspecies === 'Petran' && subspeciesCardDots.length !== defaultPetranDots.length) {
      setSubspeciesCardDots(defaultPetranDots.map(row => [...row]));
    }
  }, [subspecies]);

  return (
    <div>
      {/* Emberfolk Species Content */}
      {contentType === 'species' && species === "Emberfolk" && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateBornOfFireJSX(
                safeGetDotsArray(0)[0] ?? false,
                safeGetDotsArray(1)[0] ?? false
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
              {/* Row 1: XP header for Fire immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Fire immunity dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <i>Immunity</i></span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(0);
                const xpCosts = [5];
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

              {/* Row 3: Empty row for spacing */}
              <span></span>
              <span></span>
              <span></span>
              {/* Row 4: Arrow and XP header for Fire absorption */}
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>15xp</span>
              <span></span>
              <span></span>
              {/* Row 5: Fire absorption dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <i>Absorption</i></span>
              <span style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', color: '#000' }}>⤷</span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(1);
                const fireImmunityArr = safeGetDotsArray(0);
                const xpCosts = [15];
                const hasFireImmunity = fireImmunityArr[0];
                const canSelect = hasFireImmunity;
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canSelect) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[1][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx]) {
                          const newDots = safeCloneSpeciesCardDots();
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
                        cursor: (arr[idx] || canSelect) ? 'pointer' : 'not-allowed',
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
              {generateOppressiveHeatJSX(
                4 - safeGetDotsArray(5).filter(Boolean).length,
                3 + safeGetDotsArray(2).filter(Boolean).length,
                1 + safeGetDotsArray(3).filter(Boolean).length,
                safeGetDotsArray(4)[0] ?? false
              )}
            </span>
          </div>

          {/* Technique Upgrades Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(8, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for +1hx Range */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>
              {/* Row 2: +1hx Range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetDotsArray(2);
                const xpCosts = [4, 7, 11];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUnselect = !arr[idx + 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canSelect) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[2][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUnselect) {
                          const newDots = safeCloneSpeciesCardDots();
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
                        cursor: (arr[idx] && canUnselect) || (!arr[idx] && canSelect) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 3: XP header for +1 Spike (Fire) */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>18xp</span>
              {/* Row 4: +1 Spike (Fire) dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetDotsArray(3);
                const xpCosts = [8, 12, 18];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUnselect = !arr[idx + 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canSelect) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[3][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUnselect) {
                          const newDots = safeCloneSpeciesCardDots();
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
                        cursor: (arr[idx] && canUnselect) || (!arr[idx] && canSelect) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 5: XP header for Inflict Demoralize */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              <span></span>
              {/* Row 6: Inflict Demoralize dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><i>Inflict</i> <b><i>Demoralize</i></b></span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(4);
                const xpCosts = [7];
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

              {/* Row 7: XP header for -1 Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span></span>
              {/* Row 8: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0, 1].map(idx => {
                const arr = safeGetDotsArray(5);
                const xpCosts = [5, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUnselect = !arr[idx + 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canSelect) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[5][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUnselect) {
                          const newDots = safeCloneSpeciesCardDots();
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
                        cursor: (arr[idx] && canUnselect) || (!arr[idx] && canSelect) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Movement Section */}
          <div style={{ color: '#38761d', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Enhanced</i></b> <b> <i style={{ color: '#38761d' }}>Movement</i></b> <b><i>Effects</i></b><b></b>. +<b>[{safeGetDotsArray(6).filter(Boolean).length}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b>.
            </span>
          </div>

          {/* Movement Upgrades Table */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0, 1].map(idx => {
                const arr = safeGetDotsArray(6);
                const xpCosts = [5, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUnselect = !arr[idx + 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canSelect) {
                          const newDots = safeCloneSpeciesCardDots();
                          newDots[6][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUnselect) {
                          const newDots = safeCloneSpeciesCardDots();
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
                        cursor: (arr[idx] && canUnselect) || (!arr[idx] && canSelect) ? 'pointer' : 'not-allowed',
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
          </div>

          {/* Skills */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Xenomagic</i> +2
          </div>

          {/* Languages */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Languages.</b> Xenoelemental</i>
          </div>

          {/* Perks SP progression table */}
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
            {/* Row 1: SP header for Molten Fortitude */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7sp</span>
            
            {/* Row 2: Molten Fortitude */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}>
              <b><i style={{ color: '#5f2b2b' }}>Molten Fortitude.</i></b> Due to your primordial nature, you are capable of withstanding the most extreme environments in the natural world. Gain an advantage on any related skill.
            </span>
            {(() => {
              const arr = safeGetDotsArray(7);
              return (
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => {
                      const newDots = safeCloneSpeciesCardDots();
                      if (!arr[0]) {
                        newDots[7][0] = true;
                        persistSpeciesCardDots(newDots, 7, 0);
                      } else {
                        newDots[7][0] = false;
                        persistSpeciesCardDots(newDots, -7, 0);
                      }
                    }}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: arr[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              );
            })()}
          </div>

        </div>
      )}

      {/* Petran Subspecies Content */}
      {contentType === 'subspecies' && subspecies === "Petran" && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateMountainsEnduranceJSX(
                safeGetSubspeciesDotsArray(0)[0] ?? false,
                safeGetSubspeciesDotsArray(1)[0] ?? false,
                safeGetSubspeciesDotsArray(2)[0] ?? false,
                safeGetSubspeciesDotsArray(3)[0] ?? false
              )}
            </span>
          </div>

          {/* Feature Upgrades Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(8, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for Bludgeoning immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Bludgeoning immunity dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <i>Immunity</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(0);
                const xpCosts = [6];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[0][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
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
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              <span></span>
              <span></span>

              {/* Row 3: XP header for Piercing resistance */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span></span>
              <span></span>
              {/* Row 4: Piercing resistance dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <i>Resistance</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(1);
                const xpCosts = [4];
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
              <span></span>
              <span></span>

              {/* Row 5: XP header for Slashing resistance */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span></span>
              <span></span>
              {/* Row 6: Slashing resistance dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <i>Resistance</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(2);
                const xpCosts = [4];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[2][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
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
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              <span></span>
              <span></span>

              {/* Row 7: XP header for Drain immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span></span>
              <span></span>
              {/* Row 8: Drain immunity dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Drain</i></b> <i>Immunity</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(3);
                const xpCosts = [4];
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

          {/* Technique Section */}
          <div style={{ color: '#bf9000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateStonyRestorationJSX(
                2 - (safeGetSubspeciesDotsArray(6)[0] ? 1 : 0),
                2 + safeGetSubspeciesDotsArray(4).filter(Boolean).length,
                safeGetSubspeciesDotsArray(5).filter(Boolean).length
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
              {/* Row 1: XP header for +1d6 Hit Points */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>
              {/* Row 2: +1d6 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(4);
                const xpCosts = [4, 7, 11];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUnselect = idx === 2 || !arr[idx + 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canSelect) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[4][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUnselect) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[4][idx] = false;
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
                        cursor: (arr[idx] && canUnselect) || (!arr[idx] && canSelect) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 3: XP header for +1 Speed this turn */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              {/* Row 4: +1 Speed this turn dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Speed</i></b> this turn</span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(5);
                const xpCosts = [4, 7];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUnselect = idx === 1 || !arr[idx + 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canSelect) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[5][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUnselect) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[5][idx] = false;
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
                        cursor: (arr[idx] && canUnselect) || (!arr[idx] && canSelect) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              <span></span>

              {/* Row 5: XP header for -1 Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>
              {/* Row 6: -1 Cooldown dot */}
              <span></span>
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(6);
                const xpCosts = [11];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[6][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
                          newDots[6][idx] = false;
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

          {/* Hit Points Section */}
          <div style={{ color: '#990000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Hit Points</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Starting</i></b> <b><i style={{ color: '#990000' }}>Hit Points.</i></b> 50 + <b>[{(() => {
                const hp5Count = safeGetSubspeciesDotsArray(7).filter(Boolean).length;
                const hp10Count = safeGetSubspeciesDotsArray(8).filter(Boolean).length;
                const hp15Count = safeGetSubspeciesDotsArray(9).filter(Boolean).length;
                return hp5Count * 5 + hp10Count * 10 + hp15Count * 15;
              })()}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
            </span>
          </div>

          {/* Hit Points Upgrades Table */}
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
              {/* Row 1: XP header for +5 Hit Points */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>2xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              {/* Row 2: +5 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(7);
                const xpCosts = [2, 3, 5];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUnselect = idx === 2 || !arr[idx + 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canSelect) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[7][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUnselect) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[7][idx] = false;
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
                        cursor: (arr[idx] && canUnselect) || (!arr[idx] && canSelect) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 3: XP header for +10 Hit Points */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              {/* Row 4: +10 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(8);
                const xpCosts = [5, 8, 12];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUnselect = idx === 2 || !arr[idx + 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canSelect) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[8][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUnselect) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[8][idx] = false;
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
                        cursor: (arr[idx] && canUnselect) || (!arr[idx] && canSelect) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 5: XP header for +15 Hit Points */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>13xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>18xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>23xp</span>
              {/* Row 6: +15 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+15 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(9);
                const xpCosts = [13, 18, 23];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUnselect = idx === 2 || !arr[idx + 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canSelect) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[9][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUnselect) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[9][idx] = false;
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
                        cursor: (arr[idx] && canUnselect) || (!arr[idx] && canSelect) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Movement Section */}
          <div style={{ color: '#38761d', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Starting</i></b> <b><i style={{ color: '#38761d' }}>Speed.</i></b> 5hx.
            </span>
          </div>

          {/* Strike Section */}
          <div style={{ color: '#351c75', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Enhanced</i></b> <b> <i style={{ color: '#351c75' }}>Strike</i></b> <b><i>Effects</i></b><b>{safeGetSubspeciesDotsArray(10)[0] ? '. Inflict Restrain' : ''}.</b>
            </span>
          </div>

          {/* Strike Upgrades Table */}
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
              {/* Row 1: XP header for Inflict Restrain */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              {/* Row 2: Inflict Restrain dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Restrain</i></b></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(10);
                const xpCosts = [6];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[10][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
                          newDots[10][idx] = false;
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
          <div style={{ color: '#000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          </div>

          {/* Skills */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Survival</i> +2
          </div>

          {/* Perks SP progression table */}
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
            {/* Row 1: SP header for Stone Artisan */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8sp</span>
            
            {/* Row 2: Stone Artisan */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}>
              <b><i style={{ color: '#735311' }}>Stone Artisan.</i></b> You can shape stone and earth with ease. As such, you can quickly and easily make a tool, key, or other small item from a handful of gravel or dirt. Consult the DM for more information.
            </span>
            {(() => {
              const arr = safeGetSubspeciesDotsArray(11);
              return (
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => {
                      const newDots = safeCloneSubspeciesCardDots();
                      if (!arr[0]) {
                        newDots[11][0] = true;
                        persistSubspeciesCardDots(newDots, 8, 0);
                      } else {
                        newDots[11][0] = false;
                        persistSubspeciesCardDots(newDots, -8, 0);
                      }
                    }}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: arr[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              );
            })()}
          </div>

        </div>
      )}

      {/* Pyran Subspecies Card */}
      {contentType === 'subspecies' && subspecies === "Pyran" && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateIgnitionJSX(safeGetSubspeciesDotsArray(0).filter(Boolean).length)}
            </span>
          </div>

          {/* Feature Upgrades Table */}
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
              {/* Row 1: XP header for +1 Spike (Fire) */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
              <span></span>
              {/* Row 2: +1 Spike (Fire) dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(0);
                const xpCosts = [11, 16];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) {
                          const newDots = safeCloneSubspeciesCardDots();
                          if (!arr[idx]) {
                            newDots[0][idx] = true;
                            persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[0][idx] = false;
                            persistSubspeciesCardDots(newDots, 0, -xpCosts[idx]);
                          }
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

          {/* Technique Section */}
          <div style={{ color: '#bf9000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateBlazingLeapJSX(
                4 - safeGetSubspeciesDotsArray(4).filter(Boolean).length,
                3 + safeGetSubspeciesDotsArray(1).filter(Boolean).length,
                1 + safeGetSubspeciesDotsArray(2).filter(Boolean).length,
                safeGetSubspeciesDotsArray(3).filter(Boolean).length
              )}
            </span>
          </div>

          {/* Technique Upgrades Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(10, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for +1hx range */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>
              {/* Row 2: +1hx range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(1);
                const xpCosts = [4, 7, 11];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) {
                          const newDots = safeCloneSubspeciesCardDots();
                          if (!arr[idx]) {
                            newDots[1][idx] = true;
                            persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[1][idx] = false;
                            persistSubspeciesCardDots(newDots, 0, -xpCosts[idx]);
                          }
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

              {/* Row 3: Empty */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 4: XP header for +1d6 Fire */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              {/* Row 5: +1d6 Fire dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(2);
                const xpCosts = [5, 8, 12];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) {
                          const newDots = safeCloneSubspeciesCardDots();
                          if (!arr[idx]) {
                            newDots[2][idx] = true;
                            persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[2][idx] = false;
                            persistSubspeciesCardDots(newDots, 0, -xpCosts[idx]);
                          }
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

              {/* Row 6: Empty */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 7: XP header for Repeat Fire and Teleport */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>20xp</span>
              <span></span>
              {/* Row 8: Repeat Fire and Teleport dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Repeat <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <b><i style={{ color: '#38761d' }}>Teleport</i></b></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(3);
                const xpCosts = [11, 20];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) {
                          const newDots = safeCloneSubspeciesCardDots();
                          if (!arr[idx]) {
                            newDots[3][idx] = true;
                            persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[3][idx] = false;
                            persistSubspeciesCardDots(newDots, 0, -xpCosts[idx]);
                          }
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
              <span></span>

              {/* Row 9: Empty */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 10: XP header for -1 Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span></span>
              {/* Row 11: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(4);
                const xpCosts = [5, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) {
                          const newDots = safeCloneSubspeciesCardDots();
                          if (!arr[idx]) {
                            newDots[4][idx] = true;
                            persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[4][idx] = false;
                            persistSubspeciesCardDots(newDots, 0, -xpCosts[idx]);
                          }
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
          <div style={{ color: '#990000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Hit Points</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Starting</i></b> <b><i style={{ color: '#990000' }}>Hit Points.</i></b> 40 + <b>[{(() => {
                const hpBonus5 = safeGetSubspeciesDotsArray(5).filter(Boolean).length * 5;
                const hpBonus10 = safeGetSubspeciesDotsArray(6).filter(Boolean).length * 10;
                const hpBonus15 = safeGetSubspeciesDotsArray(7).filter(Boolean).length * 15;
                return hpBonus5 + hpBonus10 + hpBonus15;
              })()}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
            </span>
          </div>

          {/* Hit Points Upgrades Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(8, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for +5 Hit Points */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              {/* Row 2: +5 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(5);
                const xpCosts = [3, 4, 5];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) {
                          const newDots = safeCloneSubspeciesCardDots();
                          if (!arr[idx]) {
                            newDots[5][idx] = true;
                            persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[5][idx] = false;
                            persistSubspeciesCardDots(newDots, 0, -xpCosts[idx]);
                          }
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

              {/* Row 3: Empty */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 4: XP header for +10 Hit Points */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              {/* Row 5: +10 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(6);
                const xpCosts = [7, 9, 12];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) {
                          const newDots = safeCloneSubspeciesCardDots();
                          if (!arr[idx]) {
                            newDots[6][idx] = true;
                            persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[6][idx] = false;
                            persistSubspeciesCardDots(newDots, 0, -xpCosts[idx]);
                          }
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

              {/* Row 6: Empty */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 7: XP header for +15 Hit Points */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
              <span></span>
              <span></span>
              {/* Row 8: +15 Hit Points dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+15 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(7);
                const xpCosts = [16];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[7][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
                          newDots[7][idx] = false;
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

          {/* Movement Section */}
          <div style={{ color: '#38761d', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Starting</i></b> <b><i style={{ color: '#38761d' }}>Speed.</i></b> 7hx + <b>[{safeGetSubspeciesDotsArray(8).filter(Boolean).length}]</b>hx.
              {(() => {
                const hasCreatureJump = safeGetSubspeciesDotsArray(9)[0];
                if (hasCreatureJump) {
                  const jumpSpeedBonus = safeGetSubspeciesDotsArray(10).filter(Boolean).length;
                  return <span> <b><i>Jump</i></b> <b>[{3 + jumpSpeedBonus}]</b>hx.</span>;
                }
                return null;
              })()}
            </span>
          </div>

          {/* Movement Upgrades Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(8, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for +1 Speed */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span></span>
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(8);
                const xpCosts = [5, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) {
                          const newDots = safeCloneSubspeciesCardDots();
                          if (!arr[idx]) {
                            newDots[8][idx] = true;
                            persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[8][idx] = false;
                            persistSubspeciesCardDots(newDots, 0, -xpCosts[idx]);
                          }
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
              <span></span>

              {/* Row 3: Empty */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 4: XP header for Creature Jump */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span></span>
              <span></span>
              {/* Row 5: Creature Jump dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Creature <b><i style={{ color: '#38761d' }}>Jump</i></b> 3hx</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(9);
                const xpCosts = [5];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[9][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
                          newDots[9][idx] = false;
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
              <span></span>
              <span></span>

              {/* Row 6: Indentation */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 7: XP header for +1 Jump Speed */}
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              {/* Row 8: +1 Jump Speed dots with arrow symbol */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Jump Speed</i></b></span>
              <span style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', color: '#000' }}>⤷</span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(10);
                const xpCosts = [4, 6];
                const hasCreatureJump = safeGetSubspeciesDotsArray(9)[0];
                const canSelect = (idx === 0 || arr[idx - 1]) && hasCreatureJump;
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) {
                          const newDots = safeCloneSubspeciesCardDots();
                          if (!arr[idx]) {
                            newDots[10][idx] = true;
                            persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[10][idx] = false;
                            persistSubspeciesCardDots(newDots, 0, -xpCosts[idx]);
                          }
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
          <div style={{ color: '#351c75', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Enhanced</i></b> <b> <i style={{ color: '#351c75' }}>Strike</i></b> <b><i>Effects</i></b>.
              {safeGetSubspeciesDotsArray(11)[0] && (
                <span> <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b>.</span>
              )}
            </span>
          </div>

          {/* Strike Upgrades Table */}
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
              {/* Row 1: XP header for Inflict Spike (Fire) */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              {/* Row 2: Inflict Spike (Fire) dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(11);
                const xpCosts = [6];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[11][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
                          newDots[11][idx] = false;
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
          <div style={{ color: '#000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          </div>

          {/* Skills */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '-12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Performance</i> +2
          </div>

          {/* Perks SP progression table */}
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
            {/* Row 1: SP header for Fiery Creations */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8sp</span>
            
            {/* Row 2: Fiery Creations */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}>
              <b><i style={{ color: '#b31111' }}>Fiery Creations.</i></b> Your affinity with flames and heat allow you to mold metal and burn woods with an artisanal touch. Gain an advantage on any related skill roll.
            </span>
            {(() => {
              const arr = safeGetSubspeciesDotsArray(12);
              return (
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => {
                      const newDots = safeCloneSubspeciesCardDots();
                      if (!arr[0]) {
                        newDots[12][0] = true;
                        persistSubspeciesCardDots(newDots, 8, 0);
                      } else {
                        newDots[12][0] = false;
                        persistSubspeciesCardDots(newDots, -8, 0);
                      }
                    }}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: arr[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              );
            })()}
          </div>

        </div>
      )}
    </div>
  );
};

export default LevelUpSpeciesEmberfolk;
