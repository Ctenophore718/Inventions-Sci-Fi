import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateBulletCodeJSX } from "../utils/ammocoderFeature";
import { generateEncodeWeaknessJSX } from "../utils/ammocoderTechnique";
import { generateAmmoCoderStrikeJSX } from "../utils/ammocoderStrike";

type LevelUpSubclassesGunslingerProps = {
  sheet: CharacterSheet | null;
  charClass: string;
  subclass: string;
  onAutoSave?: (fieldUpdates: Partial<CharacterSheet>) => void;
  xpTotal: number;
  spTotal: number;
  xpSpent: number;
  spSpent: number;
  setXpSpent: (xp: number) => void;
  setSpSpent: (sp: number) => void;
  setNotice: (notice: string) => void;
};

const LevelUpSubclassesGunslinger: React.FC<LevelUpSubclassesGunslingerProps> = ({ 
  sheet, 
  subclass, 
  onAutoSave,
  xpTotal,
  spTotal, 
  xpSpent,
  spSpent,
  setXpSpent,
  setSpSpent,
  setNotice
}) => {
  
  // Independent state for Ammo Coder dots
  const [ammocoderFeatureIncludesStrikesDots, setAmmocoderFeatureIncludesStrikesDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.ammocoderFeatureIncludesStrikesDots || [false]
  );
  const [ammocoderTechniqueCritDots, setAmmocoderTechniqueCritDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.ammocoderTechniqueCritDots || [false, false, false]
  );
  const [ammocoderTechniqueVulnerabilityDots, setAmmocoderTechniqueVulnerabilityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.ammocoderTechniqueVulnerabilityDots || [false]
  );
  const [ammocoderTechniqueCooldownDots, setAmmocoderTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.ammocoderTechniqueCooldownDots || [false, false]
  );
  const [ammocoderAttackChainAoEDots, setAmmocoderAttackChainAoEDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.ammocoderAttackChainAoEDots || [false, false, false]
  );
  const [ammocoderAttackDieSizeDots, setAmmocoderAttackDieSizeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.ammocoderAttackDieSizeDots || [false, false, false]
  );
  const [ammocoderAttackCritDots, setAmmocoderAttackCritDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.ammocoderAttackCritDots || [false, false, false]
  );
  const [ammocoderMovementSpeedDots, setAmmocoderMovementSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.ammocoderMovementSpeedDots || [false]
  );
  const [ammocoderPerksSkillsDots, setAmmocoderPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.ammocoderPerksSkillsDots || [false]
  );

  // State for Coder Carbines dropdown
  const [selectedCoderCarbines, setSelectedCoderCarbines] = useState<string[]>(() => {
    return sheet?.coderCarbines || [];
  });
  const [pendingCoderCarbine, setPendingCoderCarbine] = useState("");

  // Sync selectedCoderCarbines with sheet data when it changes
  React.useEffect(() => {
    if (sheet?.coderCarbines) {
      setSelectedCoderCarbines(sheet.coderCarbines);
    }
  }, [sheet?.coderCarbines]);

  // Helper function to get weapon cost
  const getCoderCarbineCost = (weapon: string): number => {
    switch (weapon) {
      case 'Arcane Railgun': return 175;
      case 'Space Vaporizer': return 165;
      default: return 0;
    }
  };

  // Helper function to handle XP dot clicking with sequential requirement
  const handleDotClick = (
    currentArray: boolean[], 
    setArray: React.Dispatch<React.SetStateAction<boolean[]>>, 
    index: number, 
    xpCosts: number[],
    dotType?: string
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
      // Enforce XP/SP cannot exceed total
      const newXpSpent = xpSpent + xpDelta;
      if (newXpSpent > xpTotal) {
        setNotice("Not enough xp!");
        return;
      }
      
      // Update state first
      setArray(newArray);
      setXpSpent(Math.max(0, newXpSpent));
      
      // Include progression dots in the XP change communication to prevent race conditions
      if (dotType && onAutoSave) {
        const progressionDots = {
          ...sheet?.subclassProgressionDots,
          [dotType]: newArray
        };
        onAutoSave({
          subclassProgressionDots: progressionDots,
          xpSpent: Math.max(0, newXpSpent)
        });
      }
    }
  };

  // Helper function to handle SP dots (single selection)
  const handleSpDotClick = (
    currentArray: boolean[], 
    setArray: React.Dispatch<React.SetStateAction<boolean[]>>, 
    index: number, 
    spCosts: number[],
    dotType?: string
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
    
    if (spDelta !== 0) {
      // Enforce XP/SP cannot exceed total
      const newSpSpent = spSpent + spDelta;
      if (newSpSpent > spTotal) {
        setNotice("Not enough sp!");
        return;
      }
      
      // Update state first
      setArray(newArray);
      setSpSpent(Math.max(0, newSpSpent));
      
      // Include progression dots in the SP change communication to prevent race conditions
      if (dotType && onAutoSave) {
        const progressionDots = {
          ...sheet?.subclassProgressionDots,
          [dotType]: newArray
        };
        onAutoSave({
          subclassProgressionDots: progressionDots,
          spSpent: Math.max(0, newSpSpent)
        });
      }
    }
  };

  return (
    <div>
      {subclass === 'Ammo Coder' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateBulletCodeJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px 24px 24px',
            gridTemplateRows: 'auto',
            columnGap: '6px',
            rowGap: '2px',
            alignItems: 'start',
            marginBottom: '2px',
            width: '100%',
            paddingLeft: '4px'
          }}>
            {/* Row 1: XP header */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span></span>
            <span></span>
            {/* Row 2: Includes Strikes */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Includes <b><i style={{ color: '#351c75' }}>Strikes</i></b></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(ammocoderFeatureIncludesStrikesDots, setAmmocoderFeatureIncludesStrikesDots, 0, [5], 'ammocoderFeatureIncludesStrikesDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: ammocoderFeatureIncludesStrikesDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            <span></span>
          </div>

          <hr style={{ margin: '16px 0', border: 0, borderTop: '1px solid #ddd' }} />

          {/* Technique header */}
          <div style={{ color: '#bf9000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateEncodeWeaknessJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Technique XP progression table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px 24px 24px',
            columnGap: '6px',
            rowGap: '2px',
            alignItems: 'start',
            marginBottom: '2px',
            width: '100%',
            paddingLeft: '4px'
          }}>
            {/* Row 1: XP headers */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>2xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
            {/* Row 2: +1 Crit against target */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit against Target</span>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(ammocoderTechniqueCritDots, setAmmocoderTechniqueCritDots, i, [2, 4, 6], 'ammocoderTechniqueCritDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: ammocoderTechniqueCritDots[i] ? '#000' : '#fff',
                    cursor: (i === 0 || ammocoderTechniqueCritDots[i - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 3: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
            <span></span>
            <span></span>
            {/* Row 4: Target suffers vulnerability */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Target suffers <i>Vulnerability</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(ammocoderTechniqueVulnerabilityDots, setAmmocoderTechniqueVulnerabilityDots, 0, [11], 'ammocoderTechniqueVulnerabilityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: ammocoderTechniqueVulnerabilityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            <span></span>

            {/* Row 5: XP headers */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
            <span></span>
            {/* Row 6: -1 Cooldown */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
            {[0, 1].map(i => (
              <span key={i} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(ammocoderTechniqueCooldownDots, setAmmocoderTechniqueCooldownDots, i, [4, 7], 'ammocoderTechniqueCooldownDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: ammocoderTechniqueCooldownDots[i] ? '#000' : '#fff',
                    cursor: (i === 0 || ammocoderTechniqueCooldownDots[i - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>
          </div>

          <hr style={{ margin: '16px 0', border: 0, borderTop: '1px solid #ddd' }} />

          {/* Strike header */}
          <div style={{ color: '#990000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
            
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <div style={{ marginBottom: '8px' }}>
                <b><i style={{ color: '#990000' }}>Primary Attack.</i></b>
              </div>
              
              {/* Coder Carbines dropdown */}
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
                defaultValue="Coder Carbines"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value !== "Coder Carbines") {
                    setPendingCoderCarbine(value);
                    e.target.value = "Coder Carbines"; // Reset dropdown
                  }
                }}
              >
                <option disabled style={{ fontWeight: 'bold' }}>Coder Carbines</option>
                <option style={{ fontWeight: 'bold' }}>Arcane Railgun</option>
                <option style={{ fontWeight: 'bold' }}>Space Vaporizer</option>
              </select>

              {/* Buy/Add dialog for Coder Carbine selection */}
              {pendingCoderCarbine && (
                <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontWeight: 'bold' }}>
                    {pendingCoderCarbine}
                    <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                      {getCoderCarbineCost(pendingCoderCarbine)}c
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        const cost = getCoderCarbineCost(pendingCoderCarbine);
                        const currentCredits = sheet?.credits || 0;
                        if (currentCredits < cost) {
                          setNotice('Not enough credits!');
                          return;
                        }
                        const newCoderCarbines = [...selectedCoderCarbines, pendingCoderCarbine];
                        const newCredits = currentCredits - cost;
                        setSelectedCoderCarbines(newCoderCarbines);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            coderCarbines: newCoderCarbines,
                            credits: newCredits
                          });
                        }
                        
                        setPendingCoderCarbine("");
                      }}
                    >Buy</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        const newCoderCarbines = [...selectedCoderCarbines, pendingCoderCarbine];
                        setSelectedCoderCarbines(newCoderCarbines);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            coderCarbines: newCoderCarbines,
                            credits: sheet?.credits || 0
                          });
                        }
                        
                        setPendingCoderCarbine("");
                      }}
                    >Add</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => setPendingCoderCarbine("")}
                    >Cancel</button>
                  </div>
                </div>
              )}

              {/* List of selected Coder Carbines */}
              <div style={{ marginTop: '2px' }}>
                {selectedCoderCarbines.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                    {selectedCoderCarbines.map((weapon, idx) => (
                      <span key={weapon + idx} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                        {weapon}
                        <button
                          style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                          title={`Remove ${weapon}`}
                          onClick={() => {
                            const newCoderCarbines = selectedCoderCarbines.filter((_, i) => i !== idx);
                            setSelectedCoderCarbines(newCoderCarbines);
                            
                            if (sheet && onAutoSave) {
                              onAutoSave({
                                coderCarbines: newCoderCarbines
                              });
                            }
                          }}
                        >×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Attack stats */}
              <div style={{ fontSize: '1em', marginTop: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span><b><u>Range</u></b> 10hx</span>
                  <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{18 - ammocoderAttackCritDots.filter(Boolean).length}]</b>+</span>
                </div>
                <div>
                  <b><u>Target</u></b> AoE <b>[{1 + (ammocoderAttackChainAoEDots.filter(Boolean).length * 2)}]</b>hx-Chain
                </div>
                <div>
                  <b><u>Damage</u></b> 1d<b>[{6 + (ammocoderAttackDieSizeDots.filter(Boolean).length * 2)}]</b>
                </div>
                <div>
                  <b><u>Crit Effect</u></b> 1d<b>[{6 + (ammocoderAttackDieSizeDots.filter(Boolean).length * 2)}]</b>, status effect
                </div>
              </div>
            </div>
          </div>

          {/* Attack XP progression table */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>15xp</span>
            {/* Row 2: +2hx-Chain AoE */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2hx-Chain AoE</span>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(ammocoderAttackChainAoEDots, setAmmocoderAttackChainAoEDots, i, [5, 8, 15], 'ammocoderAttackChainAoEDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: ammocoderAttackChainAoEDots[i] ? '#000' : '#fff',
                    cursor: (i === 0 || ammocoderAttackChainAoEDots[i - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 3: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
            {/* Row 4: Increase die size */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Increase die size</span>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(ammocoderAttackDieSizeDots, setAmmocoderAttackDieSizeDots, i, [5, 8, 12], 'ammocoderAttackDieSizeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: ammocoderAttackDieSizeDots[i] ? '#000' : '#fff',
                    cursor: (i === 0 || ammocoderAttackDieSizeDots[i - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 5: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>2xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
            {/* Row 6: +1 Crit */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit</span>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(ammocoderAttackCritDots, setAmmocoderAttackCritDots, i, [2, 4, 6], 'ammocoderAttackCritDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: ammocoderAttackCritDots[i] ? '#000' : '#fff',
                    cursor: (i === 0 || ammocoderAttackCritDots[i - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          <hr style={{ margin: '16px 0', border: 0, borderTop: '1px solid #ddd' }} />

          {/* Strike header */}
          <div style={{ color: '#351c75', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateAmmoCoderStrikeJSX(sheet)}
              </span>
            </span>
          </div>

          <hr style={{ margin: '16px 0', border: 0, borderTop: '1px solid #ddd' }} />

          {/* Movement header */}
          <div style={{ color: '#38761d', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                <b><i>Enhanced <span style={{ color: '#38761d' }}>Movement</span> Effects.</i></b>
              </span>
            </span>
          </div>

          {/* Movement XP progression table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px 24px 24px',
            columnGap: '6px',
            rowGap: '2px',
            alignItems: 'start',
            marginBottom: '2px',
            width: '100%',
            paddingLeft: '4px'
          }}>
            {/* Row 1: XP headers */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
            <span></span>
            <span></span>
            {/* Row 2: +1 Speed */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(ammocoderMovementSpeedDots, setAmmocoderMovementSpeedDots, 0, [6], 'ammocoderMovementSpeedDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: ammocoderMovementSpeedDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            <span></span>
          </div>

          <hr style={{ margin: '12px', border: 0, borderTop: '1px solid #ddd' }} />

          {/* Perks header */}
          <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Oikomagic</i> +2
          </div>

          {/* Perks SP progression table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px 24px 24px',
            gridTemplateRows: 'auto auto',
            columnGap: '6px',
            rowGap: '2px',
            alignItems: 'start',
            marginTop: '-12px',
            marginBottom: '2px',
            width: '100%',
            paddingLeft: '4px'
          }}>
            {/* Row 1: Empty cells and 7sp header */}
            <span></span>
            <span></span>
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7sp</span>
            {/* Row 2: Minor Magician text and dot */}
            <div style={{ 
              fontSize: '1em', 
              fontFamily: 'Arial, Helvetica, sans-serif', 
              textAlign: 'left',
              paddingRight: '8px',
              lineHeight: '1.2',
              gridColumn: '1 / 4'
            }}>
              <b><i style={{ color: '#112972', fontSize: '1em' }}>Minor Magician.</i></b> You've picked up some rudimentary <i>Oikomagic</i> skills that you can use in a variety of small but useful ways, such as creating bits of light, noises, or otherwise minor sensory effects. Consult your DM for specifics.
            </div>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <span
                onClick={() => handleSpDotClick(ammocoderPerksSkillsDots, setAmmocoderPerksSkillsDots, 0, [7], 'ammocoderPerksSkillsDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: ammocoderPerksSkillsDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelUpSubclassesGunslinger;
