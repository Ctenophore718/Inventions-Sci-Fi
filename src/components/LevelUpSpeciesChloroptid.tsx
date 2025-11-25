import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateRapidRegenerationJSX } from "../utils/chloroptidFeature";
import { generateUnusualGrowthJSX } from "../utils/chloroptidTechnique";
import { generateDeepRootsJSX } from "../utils/barkskinFeature";
import { generateOakenshieldJSX } from "../utils/barkskinTechnique";
import { generateSapSuckerJSX } from "../utils/carnivorousFeature";
import { generatePoisonousBarbsJSX, calculatePoisonousBarbsData } from "../utils/carnivorousTechnique";
import { generateLeafOnTheWindJSX } from "../utils/driftingFeature";
import { generateCottonGuardJSX } from "../utils/driftingTechnique";

type LevelUpSpeciesChloroptidProps = {
  sheet: CharacterSheet | null;
  species: string;
  subspecies: string;
  contentType?: 'species' | 'subspecies'; // New prop to control which content to show
  onAutoSave?: (updates: Partial<CharacterSheet>) => void;
  xpTotal: number;
  spTotal: number;
  xpSpent: number;
  spSpent: number;
  setXpSpent: (xp: number) => void;
  setSpSpent: (sp: number) => void;
  setNotice: (notice: string) => void;
};

const LevelUpSpeciesChloroptid: React.FC<LevelUpSpeciesChloroptidProps> = ({ 
  sheet, 
  species,
  subspecies,
  contentType = 'species', // Default to species content
  onAutoSave,
  xpTotal,
  spTotal, 
  xpSpent,
  spSpent,
  setXpSpent,
  setSpSpent,
  setNotice
}) => {
  
  // Chloroptid species card dots default structure
  const defaultChloroptidDots = [ 
    [false],               // Feature: +1d4 Hit Points (8xp)
    [false, false],        // Technique: +2hx-Chain AoE (8xp, 16xp)
    [false, false, false], // Technique: +1hx away (6xp, 10xp, 16xp)
    [false, false],        // Technique: -1 Cooldown (5xp, 8xp)
    [false, false, false], // Hit Points: +5 (3xp, 4xp, 5xp)
    [false, false, false], // Hit Points: +10 (7xp, 9xp, 12xp)
    [false],               // Hit Points: +15 (16xp)
    [false, false],        // Movement: +1 Speed (6xp, 10xp)
    [false],               // Perk: Natural Camouflage (10sp)
  ];

  // Barkskin subspecies card dots default structure
  const defaultBarkskinDots = [
    [false],               // Feature: Mesmerize immunity (7xp)
    [false, false],        // Technique: +1hx Range (8xp, 16xp)
    [false],               // Feature: Bounce immunity (5xp)
    [false, false],        // Technique: -1 Cooldown (5xp, 8xp)
    [false],               // Feature: Slam immunity (5xp)
    [false],               // Technique: Resist all damage (17xp)
    [false],               // Technique: Bludgeoning, Piercing and Slashing immunity (17xp)
    [false, false, false], // Hit Points: +10 (7xp, 9xp, 12xp)
    [false],               // Perk: Thick Skinned (8sp)
  ];

  // Carnivorous subspecies card dots default structure
  const defaultCarnivorousDots = [
    [false],               // Feature: Heal double Drain damage (7xp)
    [false, false, false], // Technique: +1d6 Piercing to the Striker (5xp, 8xp, 13xp)
    [false],               // Technique: Includes Attacks (17xp)
    [false],               // Strike: Inflict Spike (Toxic) (6xp)
    [false, false],        // Technique: -1 Cooldown (5xp, 8xp)
    [false],               // Perk: pH Sensitive (7sp)
  ];

  // Drifting subspecies card dots default structure
  const defaultDriftingDots = [
    [false, false],        // Feature: +1hx Move after Damage (4xp, 7xp)
    [false, false, false], // Technique: +1hx AoE Range (4xp, 8xp, 12xp)
    [false],               // Technique: Gain 100% Cover (16xp)
    [false, false],        // Technique: -1 Cooldown (4xp, 7xp)
    [false, false],        // Movement: +1 Speed (5xp, 9xp)
    [false],               // Perk: Easy Glider (9sp)
  ];

  // Local state for species card dots
  const [speciesCardDots, setSpeciesCardDots] = useState<boolean[][]>(() => {
    if (sheet?.speciesCardDots && Array.isArray(sheet.speciesCardDots) && sheet.speciesCardDots.length > 0) {
      return sheet.speciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    return defaultChloroptidDots.map(row => [...row]);
  });

  // Local state for subspecies card dots (Barkskin/Carnivorous/Drifting)
  const [subspeciesCardDots, setSubspeciesCardDots] = useState<boolean[][]>(() => {
    if (sheet?.subspeciesCardDots && Array.isArray(sheet.subspeciesCardDots) && sheet.subspeciesCardDots.length > 0) {
      return sheet.subspeciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    // Return appropriate default based on subspecies
    if (subspecies === 'Carnivorous') {
      return defaultCarnivorousDots.map(row => [...row]);
    } else if (subspecies === 'Drifting') {
      return defaultDriftingDots.map(row => [...row]);
    }
    return defaultBarkskinDots.map(row => [...row]);
  });

  // Helper function to safely access speciesCardDots array
  const safeGetDotsArray = (index: number): boolean[] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || index >= speciesCardDots.length) {
      return defaultChloroptidDots[index] || [];
    }
    return speciesCardDots[index] || [];
  };

  // Helper function to safely clone speciesCardDots array
  const safeCloneSpeciesCardDots = (): boolean[][] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || speciesCardDots.length === 0) {
      return defaultChloroptidDots.map(row => [...row]);
    }
    return speciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
  };

  // Helper function to safely access subspeciesCardDots array
  const safeGetSubspeciesDotsArray = (index: number): boolean[] => {
    if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots) || index >= subspeciesCardDots.length) {
      if (subspecies === 'Carnivorous') {
        return defaultCarnivorousDots[index] || [];
      } else if (subspecies === 'Drifting') {
        return defaultDriftingDots[index] || [];
      }
      return defaultBarkskinDots[index] || [];
    }
    return subspeciesCardDots[index] || [];
  };

  // Helper function to safely clone subspeciesCardDots array
  const safeCloneSubspeciesCardDots = (): boolean[][] => {
    if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots) || subspeciesCardDots.length === 0) {
      if (subspecies === 'Carnivorous') {
        return defaultCarnivorousDots.map(row => [...row]);
      } else if (subspecies === 'Drifting') {
        return defaultDriftingDots.map(row => [...row]);
      }
      return defaultBarkskinDots.map(row => [...row]);
    }
    return subspeciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
  };

  // Helper function to calculate HP bonus from dots
  const calculateHPBonus = (dots: boolean[][]): number => {
    const hp5Dots = dots[4] || [];
    const hp10Dots = dots[5] || [];
    const hp15Dots = dots[6] || [];
    
    const hp5Bonus = hp5Dots.filter(Boolean).length * 5;
    const hp10Bonus = hp10Dots.filter(Boolean).length * 10;
    const hp15Bonus = (hp15Dots[0] ? 15 : 0);
    
    return hp5Bonus + hp10Bonus + hp15Bonus;
  };

  // Helper function to calculate Speed bonus from dots
  const calculateSpeedBonus = (dots: boolean[][]): number => {
    const speedDots = dots[7] || [];
    return speedDots.filter(Boolean).length;
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
      {/* Chloroptid Species Content */}
      {contentType === 'species' && species === "Chloroptid" && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateRapidRegenerationJSX({
                hitPointsDice: 1 + safeGetDotsArray(0).filter(Boolean).length,
              })}
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
              {/* Row 1: XP header for +1d4 Hit Points */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span></span>
              <span></span>
              {/* Row 2: +1d4 Hit Points dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d4 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(0);
                const xpCosts = [8];
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
            </div>
          </div>

          {/* Technique Section */}
          <div style={{ color: '#bf9000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateUnusualGrowthJSX(sheet?.speciesCardDots)}
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
              {/* Row 1: XP header for +2hx-Chain AoE */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
              <span></span>
              
              {/* Row 2: +2hx-Chain AoE dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2hx-Chain <i>AoE</i></span>
              {[0,1].map(idx => {
                const arr = safeGetDotsArray(1);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [8, 16];
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

              {/* Row 3: Spacer */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 4: XP header for +1hx away */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
              
              {/* Row 5: +1hx away dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx away</span>
              {[0,1,2].map(idx => {
                const arr = safeGetDotsArray(2);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [6, 10, 16];
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

              {/* Row 6: Spacer */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 7: XP header for -1 Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span></span>
              
              {/* Row 8: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0,1].map(idx => {
                const arr = safeGetDotsArray(3);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [5, 8];
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
              <span></span>
            </div>
          </div>

          {/* Hit Points Section */}
          <div style={{ color: '#990000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Hit Points</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Starting <span style={{ color: '#990000' }}>Hit Points.</span></i></b> 40 +<b>[{calculateHPBonus(speciesCardDots)}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
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
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0,1,2].map(idx => {
                const arr = safeGetDotsArray(4);
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
                          for (let j = 0; j <= idx; ++j) newDots[4][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[4][j] = false;
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              
              {/* Row 4: +10 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0,1,2].map(idx => {
                const arr = safeGetDotsArray(5);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [7, 9, 12];
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

              {/* Row 5: XP header for +15 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
              <span></span>
              <span></span>
              
              {/* Row 6: +15 Hit Points dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+15 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0].map(idx => {
                const arr = safeGetDotsArray(6);
                const xpCosts = [16];
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
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Movement Section */}
          <div style={{ color: '#38761d', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px', marginTop: '24px' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            
            {/* Starting Speed */}
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Starting</i></b> <b><i style={{ color: '#38761d' }}>Speed</i></b>. 6hx +<b>[{calculateSpeedBonus(speciesCardDots)}]</b>hx.
            </div>
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
              {/* Row 1: XP header for Speed */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              <span></span>
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0,1].map(idx => {
                const arr = safeGetDotsArray(7);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [6, 10];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[7][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSpeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSpeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[7][j] = false;
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
          </div>

          {/* Skills */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Awareness</i> +2
          </div>

          {/* Languages */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Languages.</b> Chloroptid</i>
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
            {/* Row 1: SP header for Natural Camouflage */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10sp</span>
            
            {/* Row 2: Natural Camouflage */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}>
              <b><i style={{ color: '#38761d' }}>Natural Camouflage.</i></b> You resemble normal plants, shrubbery, vines, and/or trees so closely that others can hardly tell you apart from the foliage while you remain still. Gain an advantage on related skill rolls.
            </span>
            {(() => {
              const arr = safeGetDotsArray(8);
              const canCheck = !arr[0];
              const canUncheck = arr[0];
              return (
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => {
                      if (canCheck) {
                        const newDots = safeCloneSpeciesCardDots();
                        newDots[8][0] = true;
                        persistSpeciesCardDots(newDots, 10, 0);
                      } else if (canUncheck) {
                        const newDots = safeCloneSpeciesCardDots();
                        newDots[8][0] = false;
                        persistSpeciesCardDots(newDots, -10, 0);
                      }
                    }}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: arr[0] ? '#000' : '#fff',
                      cursor: canCheck || canUncheck ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              );
            })()}
          </div>

        </div>
      )}

      {/* Barkskin Subspecies Content */}
      {contentType === 'subspecies' && subspecies === "Barkskin" && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateDeepRootsJSX({ mesmerizeImmunity: safeGetSubspeciesDotsArray(0)[0] })}
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
              {/* Row 1: XP header for Mesmerize immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Mesmerize immunity dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Mesmerize</i></b> <i>Immunity</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(0);
                const xpCosts = [7];
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
            </div>
          </div>

          {/* Technique Section */}
          <div style={{ color: '#bf9000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateOakenshieldJSX({
                aoeRange: 3 + safeGetSubspeciesDotsArray(1).filter(Boolean).length,
                cooldown: 4 - safeGetSubspeciesDotsArray(3).filter(Boolean).length,
                resistAll: safeGetSubspeciesDotsArray(5)[0],
                immuneToBPS: safeGetSubspeciesDotsArray(6)[0],
                bounceImmunity: safeGetSubspeciesDotsArray(2)[0],
                slamImmunity: safeGetSubspeciesDotsArray(4)[0]
              })}
            </span>
          </div>

          {/* Technique Upgrades Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(12, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header for Range */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
              <span></span>
              
              {/* Row 2: +1hx Range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0,1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(1);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [8, 16];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSubspeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[1][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSubspeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSubspeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[1][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSubspeciesCardDots(newDots, 0, delta);
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

              {/* Row 3: XP header for Bounce immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span></span>
              <span></span>
              
              {/* Row 4: Bounce immunity dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Bounce</i></b> <i>Immunity</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(2);
                const xpCosts = [5];
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

              {/* Row 5: XP header for Slam immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span></span>
              <span></span>
              
              {/* Row 6: Slam immunity dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Slam</i></b> <i>Immunity</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(4);
                const xpCosts = [5];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[4][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
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
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              <span></span>
              <span></span>

              {/* Empty row */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Row 7: XP header for Resist all */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>17xp</span>
              <span></span>
              <span></span>
              
              {/* Row 8: Resist all damage dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><i>Resist</i> all Damage</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(5);
                const xpCosts = [17];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[5][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
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
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              <span></span>
              <span></span>

              {/* Row 10: XP header for BPS immunity */}
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>17xp</span>
              <span></span>
              
              {/* Row 11: BPS immunity dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#915927' }}>Bludgeoning</u></b> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, verticalAlign: 'middle' }} />, <b><u style={{ color: '#a6965f' }}>Piercing</u></b> <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, verticalAlign: 'middle' }} /> and <b><u style={{ color: '#808080' }}>Slashing</u></b> <img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, verticalAlign: 'middle' }} /> <i>Immunity</i></span>
              <span style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', color: '#000' }}>⤷</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(6);
                const resistAllArr = safeGetSubspeciesDotsArray(5);
                const isResistAllSelected = resistAllArr[0];
                const xpCosts = [17];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!isResistAllSelected) return;
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
                        cursor: isResistAllSelected ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
              
              <span></span>

              {/* Row 12: XP header for Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span></span>
              
              {/* Row 13: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0,1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(3);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [5, 8];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSubspeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[3][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSubspeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSubspeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[3][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSubspeciesCardDots(newDots, 0, delta);
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

          {/* Hit Points Section */}
          <div style={{ color: '#990000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Hit Points</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Extra <span style={{ color: '#990000' }}>Hit Points.</span></i></b>
              {(() => {
                const hpDots = safeGetSubspeciesDotsArray(7).filter(Boolean).length;
                if (hpDots > 0) {
                  return (
                    <>
                      {' '}<b>+[{hpDots * 10}]</b> <b><i style={{ color: '#990000' }}>Hit Points.</i></b>
                    </>
                  );
                }
                return null;
              })()}
            </span>
          </div>

          {/* Hit Points Table */}
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
              {/* Row 1: XP header for +10 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              
              {/* Row 2: +10 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0,1,2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(7);
                const canCheck = idx === 0 || arr.slice(0, idx).every(Boolean);
                const rightmostChecked = arr.lastIndexOf(true);
                const canUncheck = arr[idx] && idx === rightmostChecked;
                const xpCosts = [7, 9, 12];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!arr[idx] && canCheck) {
                          const newDots = safeCloneSubspeciesCardDots();
                          for (let j = 0; j <= idx; ++j) newDots[7][j] = true;
                          let delta = 0;
                          for (let j = 0; j <= idx; ++j) if (!arr[j]) delta += xpCosts[j];
                          persistSubspeciesCardDots(newDots, 0, delta);
                        } else if (arr[idx] && canUncheck) {
                          const newDots = safeCloneSubspeciesCardDots();
                          for (let j = idx; j < arr.length; ++j) newDots[7][j] = false;
                          let delta = 0;
                          for (let j = idx; j < arr.length; ++j) if (arr[j]) delta -= xpCosts[j];
                          persistSubspeciesCardDots(newDots, 0, delta);
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
            marginTop: '-12px',
            marginBottom: '2px',
            width: '100%',
            paddingLeft: '4px'
          }}>
            {/* Row 1: SP header for Thick Skinned */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8sp</span>
            
            {/* Row 2: Thick Skinned */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}>
              <b><i style={{ color: '#5f2d2b' }}>Thick Skinned.</i></b> Your tree-like nature makes you capable of keeping a level head and a willingness to bend and not break in both social and emotional situations when the going gets tough. Gain an advantage on related skill rolls.
            </span>
            {(() => {
              const arr = safeGetSubspeciesDotsArray(8);
              const canCheck = !arr[0];
              const canUncheck = arr[0];
              return (
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => {
                      if (canCheck) {
                        const newDots = safeCloneSubspeciesCardDots();
                        newDots[8][0] = true;
                        persistSubspeciesCardDots(newDots, 8, 0);
                      } else if (canUncheck) {
                        const newDots = safeCloneSubspeciesCardDots();
                        newDots[8][0] = false;
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
                      cursor: canCheck || canUncheck ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              );
            })()}
          </div>

        </div>
      )}

      {/* Carnivorous Subspecies Content */}
      {contentType === 'subspecies' && subspecies === "Carnivorous" && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateSapSuckerJSX(safeGetSubspeciesDotsArray(0)[0])}
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
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Heal double Drain damage dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Heal double <b><i>Drain</i></b> damage</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(0);
                const xpCosts = [7];
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
            </div>
          </div>

          {/* Technique Section */}
          <div style={{ color: '#bf9000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {(() => {
                const data = calculatePoisonousBarbsData(subspeciesCardDots);
                const inflictSpikeToxic = safeGetSubspeciesDotsArray(3)[0];
                return generatePoisonousBarbsJSX(data.cooldown, data.piercingDamage, data.includesAttacks, inflictSpikeToxic);
              })()}
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
              {/* Row 1: XP header for Piercing damage */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>13xp</span>
              
              
              {/* Row 2: +1d6 Piercing dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d6 <b><u style={{ color: '#a6965f' }}>Piercing</u></b> <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, verticalAlign: 'middle' }} /> to the Damager</span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(1);
                const xpCosts = [5, 8, 13];
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

              {/* Row 3: Empty row */}
              
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>17xp</span>
              <span></span>
              <span></span>
              {/* Row 4: Includes Attacks dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Includes <b><i style={{ color: '#990000' }}>Attacks</i></b></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(2);
                const xpCosts = [17];
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

              {/* Row 5: XP header for Cooldown */}
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span></span>

              {/* Row 6: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(4);
                const xpCosts = [5, 8];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[4][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
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
                        cursor: 'pointer',
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
              <b><i>Enhanced </i></b><b><i style={{ color: '#351c75' }}>Strike</i></b> <b><i>Effects</i></b>. <b><i>Drain</i></b>{safeGetSubspeciesDotsArray(3)[0] && <span>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
        Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b><b>)</b></span>}.
            </span>
          </div>

          {/* Strike Upgrades Table */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Inflict Spike (Toxic) dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
        Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b><b>)</b></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(3);
                const xpCosts = [6];
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
          <div style={{ color: '#000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                <b><i>Skills.</i></b> <i>Intimidation</i> +2
              </span>
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
            {/* Row 1: SP header for pH Sensitive */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7sp</span>
            
            {/* Row 2: pH Sensitive */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}>
              <b><i style={{ color: '#2b2d5f' }}>pH Sensitive.</i></b> You are very sensitive to chemical levels and acidity balances and can sniff out toxins, poisons and other chemicals and substances whenever you smell, taste or touch them. Gain an advantage on related skill rolls.
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
                        persistSubspeciesCardDots(newDots, 7, 0);
                      } else {
                        newDots[5][0] = false;
                        persistSubspeciesCardDots(newDots, -7, 0);
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

      {/* Drifting Subspecies Content */}
      {contentType === 'subspecies' && subspecies === "Drifting" && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateLeafOnTheWindJSX(1 + safeGetSubspeciesDotsArray(0).filter(Boolean).length)}
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
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              {/* Row 2: +1hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(0);
                const xpCosts = [4, 7];
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
            </div>
          </div>

          {/* Technique Section */}
          <div style={{ color: '#bf9000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateCottonGuardJSX(
                4 - safeGetSubspeciesDotsArray(3).filter(Boolean).length,
                3 + safeGetSubspeciesDotsArray(1).filter(Boolean).length,
                safeGetSubspeciesDotsArray(2)[0]
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              {/* Row 2: +1hx Range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(1);
                const xpCosts = [4, 8, 12];
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
              <span></span>
              <span></span>
              {/* Row 3: XP header for Gain 100% Cover */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
              <span></span>
              <span></span>
              {/* Row 4: Gain 100% Cover dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Gain <b>100%</b> <i>Cover</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(2);
                const xpCosts = [16];
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
              <span></span>
              <span></span>
              {/* Row 5: XP header for -1 Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              {/* Row 6: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(3);
                const xpCosts = [4, 7];
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

          {/* Movement Section */}
          <div style={{ color: '#38761d', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                <b><i>Enhanced Movement Effects.</i></b>
              </span>
            </div>
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
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span></span>
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Speed</span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(4);
                const xpCosts = [5, 9];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[4][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else {
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
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                <b><i>Skills.</i></b> <i>Piloting</i> +2
              </span>
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
            {/* Row 1: SP header for Easy Glider */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9sp</span>
            
            {/* Row 2: Easy Glider */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}>
              <b><i style={{ color: '#5f8a5f' }}>Easy Glider.</i></b> You are generally very go-with-the-flow. As such, you're naturally adept at picking up signs and signals of various kinds, such as air currents, tracks in the ground or nonverbal communication. Gain an advantage on related skill rolls.
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
                        persistSubspeciesCardDots(newDots, 9, 0);
                      } else {
                        newDots[5][0] = false;
                        persistSubspeciesCardDots(newDots, -9, 0);
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

export default LevelUpSpeciesChloroptid;
