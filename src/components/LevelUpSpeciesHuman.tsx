import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateAdaptablePhysiqueJSX } from "../utils/humanFeature";
import { generateActionSurgeJSX } from "../utils/humanTechnique";

type LevelUpSpeciesHumanProps = {
  sheet: CharacterSheet | null;
  species: string;
  contentType?: 'species';
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
    </div>
  );
};

export default LevelUpSpeciesHuman;
