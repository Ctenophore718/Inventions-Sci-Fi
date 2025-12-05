import React, { useState, useEffect } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateAdaptablePhysiqueJSX } from "../utils/humanFeature";
import { generateActionSurgeJSX } from "../utils/humanTechnique";
import { generateOutOfSightJSX } from "../utils/diminutiveFeature";
import { generateSizeMattersJSX } from "../utils/diminutiveTechnique";
import { generateFleetOfFootJSX } from "../utils/litheFeature";
import { generateSharedWisdomJSX } from "../utils/litheTechnique";
import { generateILLSEEYOUINHELLJSX } from "../utils/massiveFeature";
import { generateWarCryJSX } from "../utils/massiveTechnique";
import { generateDieHardJSX } from "../utils/stoutFeature";
import { generateComeatMeBroJSX } from "../utils/stoutTechnique";

type LevelUpSpeciesHumanProps = {
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

const LevelUpSpeciesHuman: React.FC<LevelUpSpeciesHumanProps> = ({ 
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
  
  // Human species card dots default structure
  const defaultHumanDots = [ 
    [false, false, false], // Feature: +1 resistance type (3xp, 4xp, 6xp)
    [false, false, false], // Technique: +1hx range (3xp, 6xp, 9xp)
    [false, false],        // Technique: -1 Cooldown (6xp, 8xp)
    [false, false],        // Movement: +1 Speed (6xp, 9xp)
    [false],               // Perk: Jack of All Trades (14sp)
  ];

  // Diminutive Evolution subspecies card dots default structure
  const defaultDiminutiveDots = [
    [false],               // Feature: +1 Cover die (10xp)
    [false, false, false], // Technique: Move +1hx (3xp, 6xp, 9xp)
    [false, false],        // Technique: -1 Cooldown (6xp, 10xp)
    [false, false, false], // Hit Points: +5 (3xp, 4xp, 5xp)
    [false, false],        // Hit Points: +10 (7xp, 9xp)
    [false],               // Hit Points: +15 (16xp)
    [false],               // Perk: Half-Sized Humor (9sp)
  ];

  // Lithe Evolution subspecies card dots default structure
  const defaultLitheDots = [
    [false],               // Feature: Restrain immunity (5xp)
    [false, false, false], // Technique: +1hx range (3xp, 6xp, 9xp)
    [false],               // Technique: Remove all conditions (7xp)
    [false, false],        // Technique: -1 Cooldown (5xp, 9xp)
    [false, false],        // Hit Points: +5 (3xp, 4xp)
    [false, false],        // Hit Points: +10 (7xp, 9xp)
    [false],               // Hit Points: +15 (16xp)
    [false, false, false], // Movement: +1 Speed (6xp, 9xp, 12xp)
    [false],               // Perk: Elven Alacrity (9sp)
  ];

  // Massive Evolution subspecies card dots default structure
  const defaultMassiveDots = [
    [false],               // Feature: Double damage dice (7xp)
    [false],               // Feature: Triple damage dice (12xp)
    [false, false],        // Feature: +1 to death die (5xp, 7xp)
    [false, false, false], // Technique: +1hx range (3xp, 6xp, 9xp)
    [false, false, false], // Technique: +1d6 damage (5xp, 8xp, 12xp)
    [false],               // Technique: Remove all conditions (8xp)
    [false],               // Technique: Next two times (7xp)
    [false],               // Technique: Next three times (11xp)
    [false, false],        // Technique: -1 Cooldown (5xp, 8xp)
    [false, false, false], // Hit Points: +5 (2xp, 3xp, 4xp)
    [false, false, false], // Hit Points: +10 (5xp, 7xp, 10xp)
    [false, false, false], // Hit Points: +15 (11xp, 14xp, 17xp)
    [false],               // Perk: Ogre Spirit (9sp)
  ];

  // Stout Evolution subspecies card dots default structure
  const defaultStoutDots = [
    [false],               // Feature: Sleep immunity (5xp)
    [false],               // Feature: Toxic resistance (3xp)
    [false],               // Feature: Toxic immunity (5xp)
    [false, false],        // Technique: +1d6 Strike damage (5xp, 8xp)
    [false],               // Technique: Resist all damage (8xp)
    [false],               // Technique: Immune to all conditions (7xp)
    [false, false],        // Technique: -1 Cooldown (4xp, 7xp)
    [false, false, false], // Hit Points: +5 (3xp, 4xp, 5xp)
    [false, false],        // Hit Points: +10 (7xp, 9xp)
    [false, false],        // Hit Points: +15 (16xp, 19xp)
    [false],               // Perk: Dwarven Resilience (8sp)
  ];

  // Local state for species card dots
  const [speciesCardDots, setSpeciesCardDots] = useState<boolean[][]>(() => {
    if (sheet?.speciesCardDots && Array.isArray(sheet.speciesCardDots) && sheet.speciesCardDots.length > 0) {
      return sheet.speciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    return defaultHumanDots.map(row => [...row]);
  });

  // Helper function to safely access speciesCardDots array
  const safeGetDotsArray = (index: number): boolean[] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || index >= speciesCardDots.length) {
      return defaultHumanDots[index] || [];
    }
    return speciesCardDots[index] || [];
  };

  // Helper function to safely clone speciesCardDots array
  const safeCloneSpeciesCardDots = (): boolean[][] => {
    if (!speciesCardDots || !Array.isArray(speciesCardDots) || speciesCardDots.length === 0) {
      return defaultHumanDots.map(row => [...row]);
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

  // Local state for subspecies card dots
  const [subspeciesCardDots, setSubspeciesCardDots] = useState<boolean[][]>(() => {
    if (sheet?.subspeciesCardDots && Array.isArray(sheet.subspeciesCardDots) && sheet.subspeciesCardDots.length > 0) {
      return sheet.subspeciesCardDots.map(row => Array.isArray(row) ? [...row] : []);
    }
    // Return appropriate default based on subspecies
    if (subspecies === 'Lithe Evolution') {
      return defaultLitheDots.map(row => [...row]);
    } else if (subspecies === 'Massive Evolution') {
      return defaultMassiveDots.map(row => [...row]);
    } else if (subspecies === 'Stout Evolution') {
      return defaultStoutDots.map(row => [...row]);
    }
    return defaultDiminutiveDots.map(row => [...row]);
  });

  // Helper function to safely access subspeciesCardDots array
  const safeGetSubspeciesDotsArray = (index: number): boolean[] => {
    if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots) || index >= subspeciesCardDots.length) {
      // Return appropriate default based on subspecies
      if (subspecies === 'Lithe Evolution') {
        return defaultLitheDots[index] || [];
      } else if (subspecies === 'Massive Evolution') {
        return defaultMassiveDots[index] || [];
      } else if (subspecies === 'Stout Evolution') {
        return defaultStoutDots[index] || [];
      }
      return defaultDiminutiveDots[index] || [];
    }
    return subspeciesCardDots[index] || [];
  };

  // Helper function to safely clone subspeciesCardDots array
  const safeCloneSubspeciesCardDots = (): boolean[][] => {
    if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots) || subspeciesCardDots.length === 0) {
      // Return appropriate default based on subspecies
      if (subspecies === 'Lithe Evolution') {
        return defaultLitheDots.map(row => [...row]);
      } else if (subspecies === 'Massive Evolution') {
        return defaultMassiveDots.map(row => [...row]);
      } else if (subspecies === 'Stout Evolution') {
        return defaultStoutDots.map(row => [...row]);
      }
      return defaultDiminutiveDots.map(row => [...row]);
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

  // Reset subspeciesCardDots when subspecies changes
  useEffect(() => {
    if (contentType === 'subspecies' && subspecies) {
      // Check if we need to reinitialize the dots structure
      const currentLength = subspeciesCardDots?.length || 0;
      const expectedLength = subspecies === 'Lithe Evolution' 
        ? defaultLitheDots.length 
        : subspecies === 'Massive Evolution'
        ? defaultMassiveDots.length
        : subspecies === 'Stout Evolution'
        ? defaultStoutDots.length
        : defaultDiminutiveDots.length;
      
      if (currentLength !== expectedLength) {
        // Reinitialize with the correct default structure
        const newDefault = subspecies === 'Lithe Evolution' 
          ? defaultLitheDots.map(row => [...row])
          : subspecies === 'Massive Evolution'
          ? defaultMassiveDots.map(row => [...row])
          : subspecies === 'Stout Evolution'
          ? defaultStoutDots.map(row => [...row])
          : defaultDiminutiveDots.map(row => [...row]);
        setSubspeciesCardDots(newDefault);
      }
    }
  }, [subspecies, contentType]);

  return (
    <div>
      {/* Human Species Content */}
      {species === "Human" && contentType === 'species' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateAdaptablePhysiqueJSX(2 + safeGetDotsArray(0).filter(Boolean).length)}
            </span>
            {/* Damage Types Dropdown */}
            <div style={{ marginTop: '8px', marginLeft: '0px' }}>
              <select
                value=""
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && onAutoSave) {
                    const currentTypes = sheet?.humanDamageTypes || [];
                    const maxTypes = 2 + safeGetDotsArray(0).filter(Boolean).length;
                    if (!currentTypes.includes(val) && currentTypes.length < maxTypes) {
                      onAutoSave({ humanDamageTypes: [...currentTypes, val] });
                    }
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
                  Damage Types
                </option>
                {(() => {
                  const maxTypes = 2 + safeGetDotsArray(0).filter(Boolean).length;
                  const currentLength = sheet?.humanDamageTypes?.length || 0;
                  return (
                    <>
                      {(currentLength < maxTypes) && !sheet?.humanDamageTypes?.includes('Chemical') && (
                        <option value="Chemical" style={{ color: '#de7204', backgroundColor: 'white', fontWeight: 'bold' }}>Chemical</option>
                      )}
                      {(currentLength < maxTypes) && !sheet?.humanDamageTypes?.includes('Cold') && (
                        <option value="Cold" style={{ color: '#3ebbff', backgroundColor: 'white', fontWeight: 'bold' }}>Cold</option>
                      )}
                      {(currentLength < maxTypes) && !sheet?.humanDamageTypes?.includes('Electric') && (
                        <option value="Electric" style={{ color: '#d5d52a', backgroundColor: 'white', fontWeight: 'bold' }}>Electric</option>
                      )}
                      {(currentLength < maxTypes) && !sheet?.humanDamageTypes?.includes('Fire') && (
                        <option value="Fire" style={{ color: '#e20e0e', backgroundColor: 'white', fontWeight: 'bold' }}>Fire</option>
                      )}
                      {(currentLength < maxTypes) && !sheet?.humanDamageTypes?.includes('Force') && (
                        <option value="Force" style={{ color: '#516fff', backgroundColor: 'white', fontWeight: 'bold' }}>Force</option>
                      )}
                      {(currentLength < maxTypes) && !sheet?.humanDamageTypes?.includes('Neural') && (
                        <option value="Neural" style={{ color: '#a929ff', backgroundColor: 'white', fontWeight: 'bold' }}>Neural</option>
                      )}
                      {(currentLength < maxTypes) && !sheet?.humanDamageTypes?.includes('Toxic') && (
                        <option value="Toxic" style={{ color: '#02b900', backgroundColor: 'white', fontWeight: 'bold' }}>Toxic</option>
                      )}
                    </>
                  );
                })()}
              </select>

              {/* Display selected damage types */}
              {sheet?.humanDamageTypes && sheet.humanDamageTypes.length > 0 && (
                <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '0px' }}>
                  {sheet.humanDamageTypes.map((type, index) => {
                    const damageTypeColors: { [key: string]: string } = {
                      'Chemical': '#de7204',
                      'Cold': '#3ebbff',
                      'Electric': '#d5d52a',
                      'Fire': '#e20e0e',
                      'Force': '#516fff',
                      'Neural': '#a929ff',
                      'Toxic': '#02b900'
                    };
                    const damageTypeIcons: { [key: string]: string } = {
                      'Chemical': '/Chemical.png',
                      'Cold': '/Cold.png',
                      'Electric': '/Electric.png',
                      'Fire': '/Fire.png',
                      'Force': '/Force.png',
                      'Neural': '/Neural.png',
                      'Toxic': '/Toxic.png'
                    };
                    return (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', color: damageTypeColors[type], fontWeight: 'bold' }}>
                          <u>{type}</u>
                          <img src={damageTypeIcons[type]} alt={type} style={{ width: 16, height: 16, marginLeft: 4, verticalAlign: 'middle' }} />
                        </span>
                        <button
                          onClick={() => {
                            if (onAutoSave) {
                              const newTypes = sheet.humanDamageTypes?.filter((_, i) => i !== index) || [];
                              onAutoSave({ humanDamageTypes: newTypes });
                            }
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#cc0000',
                            fontSize: '1.2em',
                            cursor: 'pointer',
                            padding: '0 4px',
                            fontWeight: 'bold'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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
              {/* Row 1: XP header for +1 resistance type */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              {/* Row 2: +1 resistance type dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <i>Resistance</i> type</span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetDotsArray(0);
                const xpCosts = [3, 4, 6];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[0][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
              {(() => {
                const cooldown = 5 - safeGetDotsArray(2).filter(Boolean).length;
                const range = 3 + safeGetDotsArray(1).filter(Boolean).length;
                return generateActionSurgeJSX(cooldown, range);
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
              {/* Row 1: XP header for +1hx range */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              {/* Row 2: +1hx range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetDotsArray(1);
                const xpCosts = [3, 6, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSpeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[1][idx] = true;
                          persistSpeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 4: XP header for -1 Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                <span></span>
              {/* Row 6: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0, 1].map(idx => {
                const arr = safeGetDotsArray(2);
                const xpCosts = [6, 8];
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
            </div>
          </div>

          {/* Movement Section */}
          <div style={{ color: '#38761d', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Starting</i></b> <b><i style={{ color: '#38761d' }}>Speed.</i></b> 6hx.{safeGetDotsArray(3).filter(Boolean).length > 0 && <> +<b>[{safeGetDotsArray(3).filter(Boolean).length}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b>. </>}
            </span>
          </div>

          {/* Movement Upgrades Table */}
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
              {/* Row 1: XP header for +1 Speed */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
                <span></span>
              {/* Row 3: +1 Speed label */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0, 1].map(idx => {
                const arr = safeGetDotsArray(3);
                const xpCosts = [6, 9];
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

          {/* Perks Section */}
          <div style={{ color: '#000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          </div>

          {/* Skills */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '2px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Culture</i> +2
          </div>

          {/* Languages */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '-12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Languages.</b> Choose 2</i>
            
            {/* Language Dropdown */}
            <div style={{ marginTop: '8px', marginLeft: '24px' }}>
              <select
                value=""
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && onAutoSave) {
                    const currentLanguages = sheet?.humanLanguages || [];
                    if (!currentLanguages.includes(val) && currentLanguages.length < 2) {
                      onAutoSave({ humanLanguages: [...currentLanguages, val] });
                    }
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
                {((sheet?.humanLanguages?.length || 0) < 2) && sheet?.species !== 'Avenoch' && !sheet?.humanLanguages?.includes('Avenoch') && (
                  <option value="Avenoch" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Avenoch</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && !sheet?.humanLanguages?.includes('Binary') && (
                  <option value="Binary" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Binary</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && !sheet?.humanLanguages?.includes('Body Language') && (
                  <option value="Body Language" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Body Language</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && sheet?.species !== 'Cerebronych' && !sheet?.humanLanguages?.includes('Cerebronych') && (
                  <option value="Cerebronych" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Cerebronych</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && sheet?.species !== 'Chloroptid' && !sheet?.humanLanguages?.includes('Chloroptid') && (
                  <option value="Chloroptid" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Chloroptid</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && !sheet?.humanLanguages?.includes('Defteran') && (
                  <option value="Defteran" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Defteran</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && sheet?.species !== 'Entomos' && !sheet?.humanLanguages?.includes('Entomos') && (
                  <option value="Entomos" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Entomos</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && !sheet?.humanLanguages?.includes('Hycryptice') && (
                  <option value="Hycryptice" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Hycryptice</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && !sheet?.humanLanguages?.includes('Galactapol Jargon') && (
                  <option value="Galactapol Jargon" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Galactapol Jargon</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && !sheet?.humanLanguages?.includes('Lumenaren') && (
                  <option value="Lumenaren" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lumenaren</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && !sheet?.humanLanguages?.includes('Lux') && (
                  <option value="Lux" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Lux</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && sheet?.charClass !== 'Coder' && !sheet?.humanLanguages?.includes('Oikovox') && (
                  <option value="Oikovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Oikovox</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && !sheet?.humanLanguages?.includes('Praedari') && (
                  <option value="Praedari" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Praedari</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && sheet?.charClass !== 'Elementalist' && !sheet?.humanLanguages?.includes('Xenoelemental') && (
                  <option value="Xenoelemental" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenoelemental</option>
                )}
                {((sheet?.humanLanguages?.length || 0) < 2) && sheet?.charClass !== 'Devout' && !sheet?.humanLanguages?.includes('Xenovox') && (
                  <option value="Xenovox" style={{ color: 'black', backgroundColor: 'white', fontWeight: 'bold' }}>Xenovox</option>
                )}
              </select>

              {/* Display selected languages */}
              {sheet?.humanLanguages && sheet.humanLanguages.length > 0 && (
                <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {sheet.humanLanguages.map((lang, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#000', fontWeight: 'bold' }}>
                        {lang}
                      </span>
                      <button
                        onClick={() => {
                          if (onAutoSave) {
                            const newLanguages = sheet.humanLanguages?.filter((_, i) => i !== index) || [];
                            onAutoSave({ humanLanguages: newLanguages });
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
                  ))}
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
            marginTop: '8px',
            marginBottom: '2px',
            width: '100%',
            paddingLeft: '4px'
          }}>
            {/* Row 1: SP header for Jack of All Trades */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>14sp</span>
            
            {/* Row 2: Jack of All Trades */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'left', paddingRight: '8px' }}>
              <b><i style={{ color: '#2b315f' }}>Jack of All Trades.</i></b> Your human determination and adaptability allow you to have a better chance at succeeding in any skill. Your minimum skill level for all skills becomes 14+.
            </span>
            {(() => {
              const arr = safeGetDotsArray(4);
              return (
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => {
                      const newDots = safeCloneSpeciesCardDots();
                      if (!arr[0]) {
                        newDots[4][0] = true;
                        persistSpeciesCardDots(newDots, 14, 0);
                      } else {
                        newDots[4][0] = false;
                        persistSpeciesCardDots(newDots, -14, 0);
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

      {/* Diminutive Evolution Subspecies Content */}
      {subspecies === "Diminutive Evolution" && contentType === 'subspecies' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateOutOfSightJSX(1 + (safeGetSubspeciesDotsArray(0)[0] ? 1 : 0))}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              <span></span>
              <span></span>
              {/* Row 2: +1 Cover die dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Cover die, discard next lowest</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(0);
                const xpCosts = [10];
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
              {generateSizeMattersJSX(
                3 - safeGetSubspeciesDotsArray(2).filter(Boolean).length,
                3 + safeGetSubspeciesDotsArray(1).filter(Boolean).length
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
              {/* Row 1: XP header for Move +1hx */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              {/* Row 2: Move +1hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i style={{ color: '#38761d' }}>Move</i></b> +1hx</span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(1);
                const xpCosts = [3, 6, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[1][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 5: XP header for -1 Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              <span></span>
              {/* Row 6: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(2);
                const xpCosts = [6, 10];
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

          {/* Hit Points Section */}
          <div style={{ color: '#990000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Hit Points</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Starting</i></b> <b><i style={{ color: '#990000' }}>Hit Points.</i></b> 40{(() => {
                const hp5Bonus = safeGetSubspeciesDotsArray(3).filter(Boolean).length * 5;
                const hp10Bonus = safeGetSubspeciesDotsArray(4).filter(Boolean).length * 10;
                const hp15Bonus = safeGetSubspeciesDotsArray(5)[0] ? 15 : 0;
                const totalBonus = hp5Bonus + hp10Bonus + hp15Bonus;
                return totalBonus > 0 ? <> + <b>[{totalBonus}]</b></> : <> + <b>[0]</b></>;
              })()} <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
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
              {/* Row 1: XP header for +5 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              {/* Row 2: +5 HP dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(3);
                const xpCosts = [3, 4, 5];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[3][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 5: XP header for +10 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span></span>
              {/* Row 6: +10 HP dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(4);
                const xpCosts = [7, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[4][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* +15 HP Section */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '-18px', marginBottom: '16px' }}>
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
              {/* Row 1: XP header for +15 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
              <span></span>
              <span></span>
              {/* Row 2: +15 HP dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+15 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(5);
                const xpCosts = [16];
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
            </div>
          </div>

          {/* Perks Section */}
          <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          </div>

          {/* Skills Section */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Thievery +2</i>
          </div>

          {/* Half-Sized Humor */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '-12px', marginBottom: '16px' }}>
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
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9sp</span>
              {/* Row 2: Half-Sized Humor */}
              <div style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', paddingRight: '8px' }}>
                <i><b style={{ color: '#c3735f' }}>Half-Sized Humor.</b></i> You are quick with a joke and others find you pleasing to be around. As such, you are often seen as funny and non-threatening in most situations. Gain an advantage on related skill rolls when being friendly with other people.
              </div>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(6);
                const spCosts = [9];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[6][idx] = true;
                          persistSubspeciesCardDots(newDots, spCosts[idx], 0);
                        } else {
                          newDots[6][idx] = false;
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

      {/* Lithe Evolution Subspecies Content */}
      {subspecies === "Lithe Evolution" && contentType === 'subspecies' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateFleetOfFootJSX(safeGetSubspeciesDotsArray(0)[0] || false)}
            </span>
          </div>

          {/* Feature Upgrades Table */}
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
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              {/* Row 2: Restrain immunity */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Restrain</i></b> <i>Immunity</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(0);
                const xpCosts = [5];
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
              {generateSharedWisdomJSX(
                3 - safeGetSubspeciesDotsArray(3).filter(Boolean).length,
                3 + safeGetSubspeciesDotsArray(1).filter(Boolean).length,
                safeGetSubspeciesDotsArray(2)[0] || false
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
              {/* Row 1: XP header for +1hx */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              {/* Row 2: +1hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(1);
                const xpCosts = [3, 6, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[1][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 5: XP header for Remove all conditions */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              <span></span>
              {/* Row 6: Remove all conditions dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Remove all conditions</span>
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

              {/* Row 7: XP header for -1 Cooldown */}
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span></span>
              {/* Row 8: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(3);
                const xpCosts = [5, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[3][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
              <b><i>Starting</i></b> <b><i style={{ color: '#990000' }}>Hit Points.</i></b> 40{(() => {
                const hp5Bonus = safeGetSubspeciesDotsArray(4).filter(Boolean).length * 5;
                const hp10Bonus = safeGetSubspeciesDotsArray(5).filter(Boolean).length * 10;
                const hp15Bonus = safeGetSubspeciesDotsArray(6)[0] ? 15 : 0;
                const totalBonus = hp5Bonus + hp10Bonus + hp15Bonus;
                return totalBonus > 0 ? <> + <b>[{totalBonus}]</b> </> : <> + <b>[0]</b> </>;
              })()} <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
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
              {/* Row 1: XP header for +5 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span></span>
              {/* Row 2: +5 HP dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(4);
                const xpCosts = [3, 4];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[4][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 5: XP header for +10 HP */}
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span></span>
              {/* Row 6: +10 HP dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(5);
                const xpCosts = [7, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[5][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* +15 HP Section */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '-18px', marginBottom: '16px' }}>
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
              {/* Row 1: XP header for +15 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
              <span></span>
              <span></span>
              {/* Row 2: +15 HP dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+15 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(6);
                const xpCosts = [16];
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

          {/* Movement Section */}
          <div style={{ color: '#38761d', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <b><i>Enhanced</i></b> <b><i style={{ color: '#38761d' }}>Movement</i></b> <b><i>Effects.</i></b>{(() => {
                const speedBonus = safeGetSubspeciesDotsArray(7).filter(Boolean).length;
                return speedBonus > 0 ? <> +<b>[{speedBonus}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b>.</> : '';
              })()}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(7);
                const xpCosts = [6, 9, 12];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[7][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Perks Section */}
          <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          </div>

          {/* Skills Section */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Acrobatics +2</i>
          </div>

          {/* Elven Alacrity */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '-12px', marginBottom: '16px' }}>
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
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9sp</span>
              {/* Row 2: Elven Alacrity */}
              <div style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', paddingRight: '8px' }}>
                <i><b style={{ color: '#2b5f5f' }}>Elven Alacrity.</b></i> You are both wise and sharp witted, being able to pick up on much subtler situations and understand the truth behind others' words and actions. Gain an advantage on related skill rolls.
              </div>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(8);
                const spCosts = [9];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[8][idx] = true;
                          persistSubspeciesCardDots(newDots, spCosts[idx], 0);
                        } else {
                          newDots[8][idx] = false;
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

      {/* Massive Evolution Subspecies Content */}
      {subspecies === "Massive Evolution" && contentType === 'subspecies' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateILLSEEYOUINHELLJSX(
                safeGetSubspeciesDotsArray(1)[0] ? 'triple' : safeGetSubspeciesDotsArray(0)[0] ? 'double' : '-',
                safeGetSubspeciesDotsArray(2).filter(Boolean).length
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
              {/* Row 1: XP header for Double damage dice */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Double damage dice */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Double Damage dice</span>
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

              {/* Row 5: XP header for Triple damage dice */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              <span></span>
              {/* Row 6: Triple damage dice */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Triple Damage dice</span>
              <span style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', color: '#000' }}>⤷</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(1);
                const xpCosts = [12];
                const canSelect = safeGetSubspeciesDotsArray(0)[0];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!canSelect && !arr[idx]) return;
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
                        cursor: (canSelect || arr[idx]) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 7: XP header for +1 to death die */}
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              {/* Row 8: +1 to death die dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 to death die</span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(2);
                const xpCosts = [5, 7];
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

          {/* Technique Section */}
          <div style={{ color: '#bf9000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateWarCryJSX(
                4 - safeGetSubspeciesDotsArray(8).filter(Boolean).length,
                3 + safeGetSubspeciesDotsArray(3).filter(Boolean).length,
                1 + safeGetSubspeciesDotsArray(4).filter(Boolean).length,
                safeGetSubspeciesDotsArray(5)[0] || false,
                1 + (safeGetSubspeciesDotsArray(6)[0] ? 1 : 0) + (safeGetSubspeciesDotsArray(7)[0] ? 1 : 0)
              )}
            </span>
          </div>

          {/* Technique Upgrades Table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px', marginBottom: '16px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(14, auto)',
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
                const arr = safeGetSubspeciesDotsArray(3);
                const xpCosts = [3, 6, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[3][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 4: XP header for +1d6 damage */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
              {/* Row 5: +1d6 damage dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d6 damage</span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(4);
                const xpCosts = [5, 8, 12];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[4][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 7: XP header for Remove all conditions */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span></span>
              <span></span>
              {/* Row 8: Remove all conditions dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Remove all conditions</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(5);
                const xpCosts = [8];
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

              {/* Row 11: XP header for Next two times */}
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              <span></span>
              
              {/* Row 12: Next two times dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Next two times you roll Damage</span>
              
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(6);
                const xpCosts = [7];
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

              {/* Row 14: XP header for Next three times */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>
              <span></span>
              {/* Row 15: Next three times dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Next three times you roll Damage</span>
              <span style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', color: '#000' }}>⤷</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(7);
                const xpCosts = [11];
                const canSelect = safeGetSubspeciesDotsArray(6)[0];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!canSelect && !arr[idx]) return;
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
                        cursor: (canSelect || arr[idx]) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Cooldown Reduction Section */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '-18px', marginBottom: '16px' }}>
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
              {/* Row 1: XP header for -1 Cooldown */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span></span>
              {/* Row 2: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(8);
                const xpCosts = [5, 8];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[8][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
              <b><i>Starting</i></b> <b><i style={{ color: '#990000' }}>Hit Points.</i></b> 45{(() => {
                const hp5Bonus = safeGetSubspeciesDotsArray(9).filter(Boolean).length * 5;
                const hp10Bonus = safeGetSubspeciesDotsArray(10).filter(Boolean).length * 10;
                const hp15Bonus = safeGetSubspeciesDotsArray(11).filter(Boolean).length * 15;
                const totalBonus = hp5Bonus + hp10Bonus + hp15Bonus;
                return totalBonus > 0 ? <> + <b>[{totalBonus}]</b></> : <> + <b>[0]</b> </>;
              })()} <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
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
              {/* Row 1: XP header for +5 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>2xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              {/* Row 2: +5 HP dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(9);
                const xpCosts = [2, 3, 4];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[9][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}


              {/* Row 4: XP header for +10 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              {/* Row 5: +10 HP dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(10);
                const xpCosts = [5, 7, 10];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[10][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Spacing row */}
              <span></span><span></span><span></span><span></span>
            </div>
          </div>

          {/* +15 HP Section */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '-18px', marginBottom: '16px' }}>
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
              {/* Row 1: XP header for +15 HP */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>14xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>17xp</span>
              {/* Row 2: +15 HP dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+15 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(11);
                const xpCosts = [11, 14, 17];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[11][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Perks Section */}
          <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          </div>

          {/* Skills Section */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Athletics +2</i>
          </div>

          {/* Ogre Spirit */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '-12px', marginBottom: '16px' }}>
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
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9sp</span>
              {/* Row 2: Ogre Spirit */}
              <div style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', paddingRight: '8px' }}>
                <i><b style={{ color: '#2b175f' }}>Ogre Spirit.</b></i> Your ogre-like nature has led you to possess incredible strength and endurance in all things physical. You are also quite large and can lift heavy objects and reach high places. Gain an advantage on related skill rolls.
              </div>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(12);
                const spCosts = [9];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[12][idx] = true;
                          persistSubspeciesCardDots(newDots, spCosts[idx], 0);
                        } else {
                          newDots[12][idx] = false;
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

      {/* Stout Evolution Subspecies Content */}
      {subspecies === "Stout Evolution" && contentType === 'subspecies' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          
          {/* Feature Section */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '16px' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              {generateDieHardJSX(
                safeGetSubspeciesDotsArray(2)[0] ? 'Immune' : safeGetSubspeciesDotsArray(1)[0] ? 'Resistant' : '-',
                safeGetSubspeciesDotsArray(0)[0] || false
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
              {/* Row 1: XP header for Sleep immunity */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Sleep immunity */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Sleep</i></b> <i>Immunity</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(0);
                const xpCosts = [5];
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

              {/* Row 3: XP header for Toxic resistance */}
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span></span>
              <span></span>
              {/* Row 4: Toxic resistance */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <i>Resistance</i></span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(1);
                const xpCosts = [3];
                const toxicImmunitySelected = safeGetSubspeciesDotsArray(2)[0];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (toxicImmunitySelected && arr[idx]) return;
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
                        cursor: (toxicImmunitySelected && arr[idx]) ? 'not-allowed' : 'pointer',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 5: Arrow and XP header for Toxic immunity */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              {/* Row 6: Toxic immunity */}
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <i>Immunity</i></span>
              <span style={{ textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold', color: '#000' }}>⤷</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(2);
                const xpCosts = [5];
                const canSelect = safeGetSubspeciesDotsArray(1)[0];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        if (!canSelect && !arr[idx]) return;
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
              {generateComeatMeBroJSX(
                4 - safeGetSubspeciesDotsArray(6).filter(Boolean).length,
                safeGetSubspeciesDotsArray(3).filter(Boolean).length,
                safeGetSubspeciesDotsArray(4)[0] || false,
                safeGetSubspeciesDotsArray(5)[0] || false
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
              {/* Row 1: XP header for +1d6 Strike damage */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span></span>
              {/* Row 2: +1d6 Strike damage dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d6 <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage</span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(3);
                const xpCosts = [5, 8];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[3][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}

              {/* Row 3: XP header for Resist all damage */}
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
              <span></span>
              <span></span>
              {/* Row 4: Resist all damage */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><i>Resist</i> all Damage</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(4);
                const xpCosts = [8];
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

              {/* Row 5: XP header for Immune to all conditions */}
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              {/* Row 6: Immune to all conditions */}
              <span></span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><i>Immune</i> to all conditions</span>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(5);
                const xpCosts = [7];
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

              {/* Row 7: XP header for -1 Cooldown */}
              <span></span>
              <span></span>
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
              <span></span>
              {/* Row 8: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(6);
                const xpCosts = [4, 7];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[6][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
            <i><b>Starting</b></i> <i><b style={{ color: '#990000' }}>Hit Points.</b></i> 40 + <b>[{(safeGetSubspeciesDotsArray(7).filter(Boolean).length * 5) + (safeGetSubspeciesDotsArray(8).filter(Boolean).length * 10) + (safeGetSubspeciesDotsArray(9).filter(Boolean).length * 15)}]</b> <i><b style={{ color: '#990000' }}>Hit Points</b></i>.
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              {/* Row 2: +5 HP dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 <i><b style={{ color: '#990000' }}>Hit Points</b></i></span>
              {[0, 1, 2].map(idx => {
                const arr = safeGetSubspeciesDotsArray(7);
                const xpCosts = [3, 4, 5];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[7][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span></span>
              {/* Row 4: +10 HP dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <i><b style={{ color: '#990000' }}>Hit Points</b></i></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(8);
                const xpCosts = [7, 9];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[8][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>16xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>19xp</span>
              <span></span>
              {/* Row 6: +15 HP dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+15 <i><b style={{ color: '#990000' }}>Hit Points</b></i></span>
              {[0, 1].map(idx => {
                const arr = safeGetSubspeciesDotsArray(9);
                const xpCosts = [16, 19];
                const canSelect = idx === 0 || arr[idx - 1];
                const canUncheck = !arr.slice(idx + 1).some(Boolean);
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx] && canSelect) {
                          newDots[9][idx] = true;
                          persistSubspeciesCardDots(newDots, 0, xpCosts[idx]);
                        } else if (arr[idx] && canUncheck) {
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
                        cursor: ((canSelect && !arr[idx]) || (canUncheck && arr[idx])) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Perks Section */}
          <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', marginBottom: '12px', marginTop: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          </div>

          {/* Skills Section */}
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Survival +2</i>
          </div>

          {/* Dwarven Resilience */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '-12px', marginBottom: '16px' }}>
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
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8sp</span>
              {/* Row 2: Dwarven Resilience */}
              <div style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', paddingRight: '8px' }}>
                <i><b style={{ color: '#5f2b2b' }}>Dwarven Resilience.</b></i> Your dwarf-like nature allows you to thrive in underground and/or dark environments as well as stomach hefty amounts of intoxication and poisoning. Gain an advantage on related skills.
              </div>
              {[0].map(idx => {
                const arr = safeGetSubspeciesDotsArray(10);
                const spCosts = [8];
                return (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => {
                        const newDots = safeCloneSubspeciesCardDots();
                        if (!arr[idx]) {
                          newDots[10][idx] = true;
                          persistSubspeciesCardDots(newDots, spCosts[idx], 0);
                        } else {
                          newDots[10][idx] = false;
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

export default LevelUpSpeciesHuman;
