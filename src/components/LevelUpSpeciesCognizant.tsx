import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateGearsAndCogsJSX } from "../utils/cognizantFeature";
import { generateLocalAreaNetworkJSX } from "../utils/cognizantTechnique";
import { generateEncryptedCerebralCortexJSX } from "../utils/androidFeature";
import { generateGlimpseTheMatrixJSX } from "../utils/androidTechnique";
import { generateVariantUtilityJSX } from "../utils/utilitydroidFeature";
import { generateTechInterferenceJSX } from "../utils/utilitydroidTechnique";

type LevelUpSpeciesCognizantProps = {
  sheet: CharacterSheet | null;
  species: string;
  subspecies: string;
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

const LevelUpSpeciesCognizant: React.FC<LevelUpSpeciesCognizantProps> = ({ 
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
  
  // Cognizant species card dots default structure
  const defaultCognizantDots = [ 
    [false],               // Feature: Toxic immunity (5xp)
    [false],               // Feature: Sleep immunity (7xp)
    [false, false, false], // Technique: +1hx Range (3xp, 6xp, 9xp)
    [false],               // Technique: -1 Technique Cooldown (12xp)
    [false, false],        // Technique: -1 Cooldown (5xp, 9xp)
    [false, false, false], // Hit Points: +5 (3xp, 4xp, 5xp)
    [false, false, false], // Hit Points: +10 (7xp, 9xp, 12xp)
    [false],               // Hit Points: +15 (16xp)
    [false, false],        // Movement: +1 Speed (6xp, 10xp)
    [false],               // Perk: Machine Learning (9sp)
  ];

  // Android subspecies card dots default structure
  const defaultAndroidDots = [
    [false],               // Feature: Neural resistance (3xp)
    [false],               // Feature: Neural immunity (7xp)
    [false],               // Feature: Mesmerize immunity (7xp)
    [false, false],        // Technique: +1 ally gains benefit (12xp, 25xp)
    [false, false],        // Technique: -1 Cooldown (5xp, 9xp)
    [false],               // Perk: Translate Bot (12sp)
  ];

  // Utility Droid subspecies card dots default structure
  const defaultUtilityDroidDots = [
    [false],               // Feature: Swim Speed (6xp)
    [false],               // Feature: Burrow Speed (10xp)
    [false],               // Feature: Flight Speed (13xp)
    [false, false, false], // Technique: +2hx Range (4xp, 7xp, 10xp)
    [false, false, false], // Technique: Inflict Spike (Electric) (4xp, 8xp, 12xp)
    [false, false],        // Technique: -1 Cooldown (4xp, 7xp)
    [false],               // Perk: Adaptable Utility (10sp)
  ];

  // Local state for species card dots
  const [speciesCardDots, setSpeciesCardDots] = useState<boolean[][]>(() => {
    if (sheet?.speciesCardDots && Array.isArray(sheet.speciesCardDots) && sheet.speciesCardDots.length > 0) {
      return sheet.speciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    return defaultCognizantDots.map(row => [...row]);
  });

  // Helper function to safely access speciesCardDots array
  const safeGetDotsArray = (index: number): boolean[] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || index >= speciesCardDots.length) {
      return defaultCognizantDots[index] || [];
    }
    return speciesCardDots[index] || [];
  };

  // Helper function to safely clone speciesCardDots array
  const safeCloneSpeciesCardDots = (): boolean[][] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || speciesCardDots.length === 0) {
      return defaultCognizantDots.map(row => [...row]);
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
      onAutoSave({ 
        speciesCardDots: newDots, 
        spSpent: newSpSpent, 
        xpSpent: newXpSpent
      });
    }
  };

  // Local state for subspecies card dots (Android/Utility Droid)
  const [subspeciesCardDots, setSubspeciesCardDots] = useState<boolean[][]>(() => {
    if (sheet?.subspeciesCardDots && Array.isArray(sheet.subspeciesCardDots) && sheet.subspeciesCardDots.length > 0) {
      return sheet.subspeciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    if (subspecies === 'Utility Droid') {
      return defaultUtilityDroidDots.map(row => [...row]);
    }
    return defaultAndroidDots.map(row => [...row]);
  });

  // Helper function to safely access subspeciesCardDots array
  const safeGetSubspeciesDotsArray = (index: number): boolean[] => {
    if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots) || index >= subspeciesCardDots.length) {
      if (subspecies === 'Utility Droid') {
        return defaultUtilityDroidDots[index] || [];
      }
      return defaultAndroidDots[index] || [];
    }
    return subspeciesCardDots[index] || [];
  };

  // Helper function to safely clone subspeciesCardDots array
  const safeCloneSubspeciesCardDots = (): boolean[][] => {
    if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots) || subspeciesCardDots.length === 0) {
      if (subspecies === 'Utility Droid') {
        return defaultUtilityDroidDots.map(row => [...row]);
      }
      return defaultAndroidDots.map(row => [...row]);
    }
    return subspeciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
  };

  // Save subspecies card dots to sheet and localStorage
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

  return (
    <div>
      {/* Cognizant Species Content */}
      {contentType === 'species' && species === "Cognizant" && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateGearsAndCogsJSX(
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
              {/* Row 1: XP header for Toxic immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Toxic immunity dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#02b900' }}>Toxic</u></b> <img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle' }} /> <i>Immunity</i></span>
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
              <span></span>
              <span></span>

              {/* Row 3: XP header for Sleep immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              <span></span>
              {/* Row 4: Sleep immunity dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Sleep</i></b> <i>Immunity</i></span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(1);
                const xpCosts = [7];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
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
              {generateLocalAreaNetworkJSX(
                3 - safeGetDotsArray(4).filter(Boolean).length,
                3 + safeGetDotsArray(2).filter(Boolean).length,
                safeGetDotsArray(3)[0] ? 1 : 0
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
              {/* Row 1: XP header for +1hx Range */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              {/* Row 2: +1hx Range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetDotsArray(2);
                const xpCosts = [3, 6, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canSelect) {
                          const newDots = safeCloneSpeciesCardDots();
                          if (!arr[idx]) {
                            newDots[2][idx] = true;
                            persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[2][idx] = false;
                            persistSpeciesCardDots(newDots, 0, -xpCosts[idx]);
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
                        cursor: canSelect ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 3: XP header for -1 Technique Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              <span></span>
              <span></span>
              {/* Row 4: -1 Technique Cooldown dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <b><i style={{ color: '#bf9000' }}>Technique</i></b> <i>Cooldown</i></span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(3);
                const xpCosts = [12];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx]) {
                          newDots[3][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
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
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              <span></span>
              <span></span>

              {/* Row 5: XP header for -1 Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span></span>
              {/* Row 6: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0, 1].map(idx => {
                const arr = safeGetDotsArray(4);
                const xpCosts = [5, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canSelect) {
                          const newDots = safeCloneSpeciesCardDots();
                          if (!arr[idx]) {
                            newDots[4][idx] = true;
                            persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[4][idx] = false;
                            persistSpeciesCardDots(newDots, 0, -xpCosts[idx]);
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
                        cursor: canSelect ? 'pointer' : 'not-allowed',
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
              <b><i>Starting </i></b><b><i style={{ color: '#990000' }}>Hit Points</i></b><b><i>.</i></b> 40 +<b>[{(
                5 * safeGetDotsArray(5).filter(Boolean).length +
                10 * safeGetDotsArray(6).filter(Boolean).length +
                15 * safeGetDotsArray(7).filter(Boolean).length
              )}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b>. 
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              {/* Row 2: +5 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetDotsArray(5);
                const xpCosts = [3, 4, 5];
                const canSelect = idx === 0 || arr[idx - 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canSelect) {
                          const newDots = safeCloneSpeciesCardDots();
                          if (!arr[idx]) {
                            newDots[5][idx] = true;
                            persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[5][idx] = false;
                            persistSpeciesCardDots(newDots, 0, -xpCosts[idx]);
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
                        cursor: canSelect ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 3: XP header for +10 Hit Points */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              {/* Row 4: +10 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetDotsArray(6);
                const xpCosts = [7, 9, 12];
                const canSelect = idx === 0 || arr[idx - 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canSelect) {
                          const newDots = safeCloneSpeciesCardDots();
                          if (!arr[idx]) {
                            newDots[6][idx] = true;
                            persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[6][idx] = false;
                            persistSpeciesCardDots(newDots, 0, -xpCosts[idx]);
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
                        cursor: canSelect ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 5: XP header for +15 Hit Points */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
              <span></span>
              <span></span>
              {/* Row 6: +15 Hit Points dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+15 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
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
            </div>
          </div>

          {/* Movement Section */}
          <div style={{ color: '#38761d', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Starting </i></b><b><i style={{ color: '#38761d' }}>Speed</i></b><b><i>.</i></b> 6hx +<b>[{safeGetDotsArray(8).filter(Boolean).length}]</b>hx.
            </span>
          </div>

          {/* Movement Upgrades Table */}
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
              {/* Row 1: XP header for +1 Speed */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              <span></span>
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0, 1].map(idx => {
                const arr = safeGetDotsArray(8);
                const xpCosts = [6, 10];
                const canSelect = idx === 0 || arr[idx - 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canSelect) {
                          const newDots = safeCloneSpeciesCardDots();
                          if (!arr[idx]) {
                            newDots[8][idx] = true;
                            persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                          } else {
                            newDots[8][idx] = false;
                            persistSpeciesCardDots(newDots, 0, -xpCosts[idx]);
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
                        cursor: canSelect ? 'pointer' : 'not-allowed',
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
            <i><b>Skills.</b> Technology</i> +2
          </div>

          {/* Languages */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Languages.</b> Binary, Choose</i> 1
            
            {/* Language Dropdown */}
            <div style={{ marginTop: '8px', marginLeft: '24px' }}>
              <select
                value=""
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && onAutoSave) {
                    onAutoSave({ cognizantLanguage: val });
                  }
                }}
                style={{
                  fontSize: '1em',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  background: '#fff',
                  textAlign: 'left',
                  minWidth: '200px',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontWeight: 'bold',
                  color: '#000'
                }}
              >
                <option value="" style={{ color: 'black', backgroundColor: 'white' }}>
                  Languages
                </option>
                {sheet?.species !== 'Avenoch' && sheet?.cognizantLanguage !== 'Avenoch' && (
                  <option value="Avenoch" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Avenoch</option>
                )}
                {sheet?.cognizantLanguage !== 'Body Language' && (
                  <option value="Body Language" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Body Language</option>
                )}
                {sheet?.species !== 'Cerebronych' && sheet?.cognizantLanguage !== 'Cerebronych' && (
                  <option value="Cerebronych" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Cerebronych</option>
                )}
                {sheet?.species !== 'Chloroptid' && sheet?.cognizantLanguage !== 'Chloroptid' && (
                  <option value="Chloroptid" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Chloroptid</option>
                )}
                {sheet?.cognizantLanguage !== 'Defteran' && (
                  <option value="Defteran" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Defteran</option>
                )}
                {sheet?.cognizantLanguage !== 'Entomos' && (
                  <option value="Entomos" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Entomos</option>
                )}
                {sheet?.cognizantLanguage !== 'Hycryptice' && (
                  <option value="Hycryptice" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Hycryptice</option>
                )}
                {sheet?.cognizantLanguage !== 'Galactapol Jargon' && (
                  <option value="Galactapol Jargon" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Galactapol Jargon</option>
                )}
                {sheet?.cognizantLanguage !== 'Lumenaren' && (
                  <option value="Lumenaren" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lumenaren</option>
                )}
                {sheet?.cognizantLanguage !== 'Lux' && (
                  <option value="Lux" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lux</option>
                )}
                {sheet?.charClass !== 'Coder' && sheet?.cognizantLanguage !== 'Oikovox' && (
                  <option value="Oikovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Oikovox</option>
                )}
                {sheet?.cognizantLanguage !== 'Praedari' && (
                  <option value="Praedari" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Praedari</option>
                )}
                {sheet?.charClass !== 'Elementalist' && sheet?.cognizantLanguage !== 'Xenoelemental' && (
                  <option value="Xenoelemental" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenoelemental</option>
                )}
                {sheet?.charClass !== 'Devout' && sheet?.cognizantLanguage !== 'Xenovox' && (
                  <option value="Xenovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenovox</option>
                )}
              </select>

              {/* Display selected language */}
              {sheet?.cognizantLanguage && (
                <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#000', fontWeight: 'bold' }}>
                    {sheet.cognizantLanguage}
                  </span>
                  <button
                    onClick={() => {
                      if (onAutoSave) {
                        onAutoSave({ cognizantLanguage: undefined });
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

          {/* Perks SP progression table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px',
            gridTemplateRows: 'auto auto',
            columnGap: '6px',
            rowGap: '2px',
            alignItems: 'start',
            marginTop: '-12px',
            marginBottom: '2px',
            width: '100%',
            paddingLeft: '4px'
          }}>
            {/* Row 1: SP header for Machine Learning */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9sp</span>
            
            {/* Row 2: Machine Learning */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}>
              <b><i style={{ color: '#2b3b5f' }}>Machine Learning.</i></b> You are capable of learning mathematical equations, grammatical combinations and other such patterns with ease. Gain an advantage on related skills after learning such a skill.
            </span>
            {(() => {
              const arr = safeGetDotsArray(9);
              return (
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => {
                      const newDots = safeCloneSpeciesCardDots();
                      if (!arr[0]) {
                        newDots[9][0] = true;
                        persistSpeciesCardDots(newDots, 9, 0);
                      } else {
                        newDots[9][0] = false;
                        persistSpeciesCardDots(newDots, -9, 0);
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

      {/* Android Subspecies Content */}
      {contentType === 'subspecies' && subspecies === "Android" && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateEncryptedCerebralCortexJSX(
                safeGetSubspeciesDotsArray(0)[0] ?? false,
                safeGetSubspeciesDotsArray(1)[0] ?? false,
                safeGetSubspeciesDotsArray(2)[0] ?? false
              )}
            </span>
          </div>

          {/* Feature Upgrades Table */}
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
              {/* Row 1: XP header for Neural resistance */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Neural resistance dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>Neural<img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <i>Resistance</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(0);
                const immunityArr = safeGetSubspeciesDotsArray(1);
                const xpCosts = [3];
                const hasImmunity = immunityArr[0];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!hasImmunity) {
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
                        cursor: hasImmunity ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              <span></span>
              <span></span>

              {/* Row 3: XP header for Neural immunity */}
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              
              <span></span>
              {/* Row 4: Neural immunity dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>Neural<img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <i>Immunity</i></span>
              <span style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', color: '#000' }}>⤷</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(1);
                const resistanceArr = safeGetSubspeciesDotsArray(0);
                const xpCosts = [7];
                const hasResistance = resistanceArr[0];
                const canSelect = hasResistance;
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canSelect) {
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
                        cursor: canSelect ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              <span></span>

              {/* Row 5: XP header for Mesmerize immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              <span></span>
              {/* Row 6: Mesmerize immunity dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Mesmerize</i></b> <i>Immunity</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(2);
                const xpCosts = [7];
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
            </div>
          </div>

          {/* Technique Section */}
          <div style={{ color: '#bf9000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateGlimpseTheMatrixJSX(
                3 - safeGetSubspeciesDotsArray(4).filter(Boolean).length,
                safeGetSubspeciesDotsArray(3).filter(Boolean).length
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
              {/* Row 1: XP header for +1 ally gains benefit */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>25xp</span>
              <span></span>
              {/* Row 2: +1 ally gains benefit dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 ally also gains this benefit</span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(3);
                const xpCosts = [12, 25];
                const canSelect = idx === 0 || arr[idx - 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canSelect) {
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
                        cursor: canSelect ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              <span></span>

              {/* Row 3: XP header for -1 Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span></span>
              {/* Row 4: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(4);
                const xpCosts = [5, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (canSelect) {
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
                        cursor: canSelect ? 'pointer' : 'not-allowed',
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
            <i><b>Skills.</b> Diplomacy</i> +2
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
            {/* Row 1: SP header for Translate Bot */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12sp</span>
            
            {/* Row 2: Translate Bot */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}>
              <b><i style={{ color: '#581fbd' }}>Translate Bot.</i></b> You can speak, read, and write any language that you spend at least 2 minutes learning.
            </span>
            {(() => {
              const arr = safeGetSubspeciesDotsArray(5);
              return (
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => {
                      const newDots = safeCloneSubspeciesCardDots();
                      if (!arr[0]) {
                        newDots[5][0] = true;
                        persistSubspeciesCardDots(newDots, 12, 0);
                      } else {
                        newDots[5][0] = false;
                        persistSubspeciesCardDots(newDots, -12, 0);
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

      {/* Utility Droid Subspecies Content */}
      {contentType === 'subspecies' && subspecies === "Utility Droid" && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateVariantUtilityJSX(
                safeGetSubspeciesDotsArray(0)[0] ?? false,
                safeGetSubspeciesDotsArray(1)[0] ?? false,
                safeGetSubspeciesDotsArray(2)[0] ?? false
              )}
            </span>
          </div>

          {/* Feature Upgrades Table */}
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
              {/* Row 1: XP header for Swim Speed */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Swim Speed dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i style={{ color: '#38761d' }}>Swim Speed</i></b></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(0);
                const burrowArr = safeGetSubspeciesDotsArray(1);
                const flightArr = safeGetSubspeciesDotsArray(2);
                const xpCosts = [6];
                const canUnselect = !burrowArr[0] && !flightArr[0];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[0][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (canUnselect) {
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

              {/* Row 3: XP header for Burrow Speed */}
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              <span></span>
              {/* Row 4: Burrow Speed dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i style={{ color: '#38761d' }}>Burrow Speed</i></b></span>
              <span style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', color: '#000' }}>⤷</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(1);
                const swimArr = safeGetSubspeciesDotsArray(0);
                const xpCosts = [10];
                const hasSwim = swimArr[0];
                const canSelect = hasSwim;
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canSelect) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[1][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx]) {
                          const newDots = safeCloneSubspeciesCardDots();
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
                        cursor: (arr[idx] || canSelect) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s',
                      }}
                    ></span>
                  </span>
                );
              })}
              {/* Row 5: XP header for Flight Speed */}
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>13xp</span>
              {/* Row 6: Flight Speed dot */}
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i style={{ color: '#38761d' }}>Fly Speed</i></b></span>
              <span style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', color: '#000' }}>⤷</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(2);
                const swimArr = safeGetSubspeciesDotsArray(0);
                const xpCosts = [13];
                const hasSwim = swimArr[0];
                const canSelect = hasSwim;
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canSelect) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[2][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx]) {
                          const newDots = safeCloneSubspeciesCardDots();
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
              {generateTechInterferenceJSX(
                4 - safeGetSubspeciesDotsArray(5).filter(Boolean).length,
                safeGetSubspeciesDotsArray(3).filter(Boolean).length * 2,
                safeGetSubspeciesDotsArray(4).filter(Boolean).length
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
              {/* Row 1: XP header for +2hx Range */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              {/* Row 2: +2hx Range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2hx</span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(3);
                const xpCosts = [4, 7, 10];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUnselect = !arr[idx + 1];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canSelect) {
                          const newDots = safeCloneSubspeciesCardDots();
                          newDots[3][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUnselect) {
                          const newDots = safeCloneSubspeciesCardDots();
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
                        cursor: (arr[idx] && canUnselect) || (!arr[idx] && canSelect) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}  

              {/* Row 3: XP header for Inflict Spike */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              {/* Row 4: Inflict Spike dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> in <i>AoE</i></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(4);
                const xpCosts = [4, 8, 12];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUnselect = !arr[idx + 1];
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

              {/* Row 5: XP header for -1 Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              {/* Row 6: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(5);
                const xpCosts = [4, 7];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUnselect = !arr[idx + 1];
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
            </div>
          </div>

          {/* Perks Section */}
          <div style={{ color: '#000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          </div>

          {/* Skills */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Computers</i> +2
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
            {/* Row 1: SP header for Adaptable Utility */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10sp</span>
            
            {/* Row 2: Adaptable Utility */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}>
              <b><i style={{ color: '#bd891f' }}>Adaptable Utility.</i></b> You always have the right tool on hand for whatever simple task you need to complete. This is limited to handheld-sized tools that would fit into a toolbox. Examples include a drill, magnifying glass, lockpicks, hammer, welder, binoculars, etc.
            </span>
            {(() => {
              const arr = safeGetSubspeciesDotsArray(6);
              return (
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => {
                      const newDots = safeCloneSubspeciesCardDots();
                      if (!arr[0]) {
                        newDots[6][0] = true;
                        persistSubspeciesCardDots(newDots, 10, 0);
                      } else {
                        newDots[6][0] = false;
                        persistSubspeciesCardDots(newDots, -10, 0);
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

export default LevelUpSpeciesCognizant;
