import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateMobileGateJSX } from "../utils/HackerFeature";
import { generatePortalSwapJSX } from "../utils/HackerTechnique";
import { generateStealthDroneJSX, getStealthDroneCost } from "../utils/hackerPrimaryAttack";
import { generateForcedTeleportationJSX } from "../utils/hackerStrike";
import { generateSalvageJSX } from "../utils/junkerFeature";
import { generateDetonateJSX } from "../utils/junkerTechnique";
import { generateJunkerDroneJSX, getJunkerDroneCost } from "../utils/junkerPrimaryAttack";

type LevelUpSubclassesTechnicianProps = {
  sheet: CharacterSheet | null;
  charClass: string;
  subclass: string;
  onAutoSave?: (fieldUpdates: Partial<CharacterSheet>) => void;
  xpTotal: number;
  spTotal: number;
  xpSpent: number;
  spSpent: number;
  credits?: number;
  setXpSpent: (xp: number) => void;
  setSpSpent: (sp: number) => void;
  setNotice: (notice: string) => void;
};

const LevelUpSubclassesTechnician: React.FC<LevelUpSubclassesTechnicianProps> = ({ 
  sheet, 
  subclass, 
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
  
  // Independent state for Hacker dots
  const [hackerTechniqueHitPointsDots, setHackerTechniqueHitPointsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.hackerTechniqueHitPointsDots || [false, false, false]
  );
  const [hackerTechniqueSpikeDots, setHackerTechniqueSpikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.hackerTechniqueSpikeDots || [false, false, false]
  );
  const [hackerTechniqueCooldownDots, setHackerTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.hackerTechniqueCooldownDots || [false, false]
  );
  const [hackerPrimaryAttackDieSizeDots, setHackerPrimaryAttackDieSizeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackDieSizeDots || [false, false, false]
  );
  const [hackerPrimaryAttackSpeedDots, setHackerPrimaryAttackSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackSpeedDots || [false, false, false]
  );
  const [hackerPrimaryAttackCritDots, setHackerPrimaryAttackCritDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackCritDots || [false, false, false]
  );
  const [hackerPrimaryAttackHitPointsDots, setHackerPrimaryAttackHitPointsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.hackerPrimaryAttackHitPointsDots || [false, false, false]
  );
  const [hackerStrikeForcedTeleportationDots, setHackerStrikeForcedTeleportationDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.hackerStrikeForcedTeleportationDots || [false]
  );
  const [hackerPerksSkillsDots, setHackerPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.hackerPerksSkillsDots || [false]
  );

  // State for Stealth Drone dropdown
  const [pendingStealthDrone, setPendingStealthDrone] = useState<string>("");
  const [selectedStealthDrones, setSelectedStealthDrones] = useState<string[]>(
    sheet?.stealthDrones || []
  );

  // State for Junker Drone dropdown
  const [pendingJunkerDrone, setPendingJunkerDrone] = useState<string>("");
  const [selectedJunkerDrones, setSelectedJunkerDrones] = useState<string[]>(
    sheet?.junkerDrones || []
  );

  // Independent state for Junker dots
  const [junkerFeatureRangeDots, setJunkerFeatureRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.junkerFeatureRangeDots || [false, false, false]
  );
  const [junkerFeatureAllyDots, setJunkerFeatureAllyDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.junkerFeatureAllyDots || [false, false, false]
  );
  const [junkerFeatureCritDamageDot, setJunkerFeatureCritDamageDot] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.junkerFeatureCritDamageDot || [false]
  );
  const [junkerTechniqueAoEDots, setJunkerTechniqueAoEDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.junkerTechniqueAoEDots || [false, false]
  );
  const [junkerTechniqueSpikeDots, setJunkerTechniqueSpikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.junkerTechniqueSpikeDots || [false, false, false]
  );
  const [junkerTechniqueCooldownDots, setJunkerTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.junkerTechniqueCooldownDots || [false, false]
  );
  const [junkerPrimaryAttackDieSizeDots, setJunkerPrimaryAttackDieSizeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackDieSizeDots || [false, false, false]
  );
  const [junkerPrimaryAttackRepeatDots, setJunkerPrimaryAttackRepeatDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackRepeatDots || [false, false, false]
  );
  const [junkerPrimaryAttackSpeedDots, setJunkerPrimaryAttackSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackSpeedDots || [false, false, false]
  );
  const [junkerPrimaryAttackCritDots, setJunkerPrimaryAttackCritDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackCritDots || [false, false, false]
  );
  const [junkerPrimaryAttackHitPointsDots, setJunkerPrimaryAttackHitPointsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.junkerPrimaryAttackHitPointsDots || [false, false, false]
  );
  const [junkerPerksSkillsDots, setJunkerPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.junkerPerksSkillsDots || [false]
  );

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

  // Helper function to handle SP dots
  const handleSpDotClick = (
    currentArray: boolean[], 
    setArray: React.Dispatch<React.SetStateAction<boolean[]>>, 
    index: number, 
    spCosts: number[],
    dotType?: string
  ) => {
    const newArray = [...currentArray];
    const rightmostChecked = currentArray.lastIndexOf(true);
    const canCheck = index === 0 || currentArray.slice(0, index).every(Boolean);
    const canUncheck = currentArray[index] && index === rightmostChecked;
    
    let spDelta = 0;
    
    if (!currentArray[index] && canCheck) {
      // Checking dots - fill from start to current index
      for (let j = 0; j <= index; j++) {
        if (!currentArray[j]) {
          newArray[j] = true;
          spDelta += spCosts[j] || 0;
        }
      }
    } else if (currentArray[index] && canUncheck) {
      // Unchecking dots - clear from current index to end
      for (let j = index; j < currentArray.length; j++) {
        if (currentArray[j]) {
          newArray[j] = false;
          spDelta -= spCosts[j] || 0;
        }
      }
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

  // Create temp sheet for preview
  const tempSheet: CharacterSheet | null = sheet ? {
    ...sheet,
    subclassProgressionDots: {
      ...sheet.subclassProgressionDots,
      hackerTechniqueHitPointsDots,
      hackerTechniqueSpikeDots,
      hackerTechniqueCooldownDots,
      hackerPrimaryAttackDieSizeDots,
      hackerPrimaryAttackSpeedDots,
      hackerPrimaryAttackCritDots,
      hackerPrimaryAttackHitPointsDots,
      hackerStrikeForcedTeleportationDots,
      hackerPerksSkillsDots
    }
  } : null;

  return (
    <div>
      {subclass === 'Hacker' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateMobileGateJSX(tempSheet)}
              </span>
            </span>
          </div>

          <hr style={{ margin: '16px 0', border: 0, borderTop: '1px solid #ddd' }} />

          {/* Technique header */}
          <div style={{ color: '#bf9000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generatePortalSwapJSX(tempSheet)}
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
            {/* Row 1: XP header */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>14xp</span>
            
            {/* Row 2: Both gain +1d6 Hit Points */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Both gain +1d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(hackerTechniqueHitPointsDots, setHackerTechniqueHitPointsDots, idx, [5, 9, 14], 'hackerTechniqueHitPointsDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: hackerTechniqueHitPointsDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || hackerTechniqueHitPointsDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 3: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>16xp</span>
            
            {/* Row 4: +1 Spike (Electric) */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> to all creatures 1hx from both locations</span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(hackerTechniqueSpikeDots, setHackerTechniqueSpikeDots, idx, [5, 10, 16], 'hackerTechniqueSpikeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: hackerTechniqueSpikeDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || hackerTechniqueSpikeDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 5: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span></span>
            
            {/* Row 6: -1 Cooldown */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
            {[0, 1].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(hackerTechniqueCooldownDots, setHackerTechniqueCooldownDots, idx, [4, 8], 'hackerTechniqueCooldownDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: hackerTechniqueCooldownDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || hackerTechniqueCooldownDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>
          </div>

          <hr style={{ margin: '16px 0', border: 0, borderTop: '1px solid #ddd' }} />

          {/* Attack header */}
          <div style={{ color: '#990000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
            
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <div style={{ marginBottom: '8px' }}>
                <b><i>Primary</i> <i style={{ color: '#990000' }}>Attack.</i></b>
              </div>
              
              {/* Stealth Drones dropdown */}
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
                defaultValue="Stealth Drones"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value !== "Stealth Drones") {
                    setPendingStealthDrone(value);
                    e.target.value = "Stealth Drones"; // Reset dropdown
                  }
                }}
              >
                <option disabled style={{ fontWeight: 'bold' }}>Stealth Drones</option>
                <option style={{ fontWeight: 'bold' }}>Blind Silence</option>
                <option style={{ fontWeight: 'bold' }}>Will-o'-the-Wisp</option>
              </select>

              {/* Buy/Add dialog for Stealth Drone selection */}
              {pendingStealthDrone && (
                <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontWeight: 'bold' }}>
                    {pendingStealthDrone}
                    <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                      {getStealthDroneCost(pendingStealthDrone)}c
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        const cost = getStealthDroneCost(pendingStealthDrone);
                        const currentCredits = credits || sheet?.credits || 0;
                        if (currentCredits < cost) {
                          setNotice('Not enough credits!');
                          return;
                        }
                        const newStealthDrones = [...selectedStealthDrones, pendingStealthDrone];
                        const newCredits = currentCredits - cost;
                        setSelectedStealthDrones(newStealthDrones);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            stealthDrones: newStealthDrones,
                            credits: newCredits
                          });
                        }
                        
                        setPendingStealthDrone("");
                      }}
                    >Buy</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        const newStealthDrones = [...selectedStealthDrones, pendingStealthDrone];
                        setSelectedStealthDrones(newStealthDrones);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            stealthDrones: newStealthDrones,
                            credits: credits || sheet?.credits || 0
                          });
                        }
                        
                        setPendingStealthDrone("");
                      }}
                    >Add</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => setPendingStealthDrone("")}
                    >Cancel</button>
                  </div>
                </div>
              )}

              {/* List of selected Stealth Drones */}
              <div style={{ marginTop: '2px' }}>
                {selectedStealthDrones.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                    {selectedStealthDrones.map((drone, idx) => (
                      <span key={drone + idx} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                        {drone}
                        <button
                          style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                          title={`Remove ${drone}`}
                          onClick={() => {
                            const newStealthDrones = selectedStealthDrones.filter((_, i) => i !== idx);
                            setSelectedStealthDrones(newStealthDrones);
                            
                            if (sheet && onAutoSave) {
                              onAutoSave({
                                stealthDrones: newStealthDrones
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
              {generateStealthDroneJSX(tempSheet)}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
            {/* Row 2: Increase Die Size */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Increase Die Size</span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(hackerPrimaryAttackDieSizeDots, setHackerPrimaryAttackDieSizeDots, idx, [5, 8, 12], 'hackerPrimaryAttackDieSizeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: hackerPrimaryAttackDieSizeDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || hackerPrimaryAttackDieSizeDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 3: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
            {/* Row 4: +2 Speed */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2 <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(hackerPrimaryAttackSpeedDots, setHackerPrimaryAttackSpeedDots, idx, [4, 7, 11], 'hackerPrimaryAttackSpeedDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: hackerPrimaryAttackSpeedDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || hackerPrimaryAttackSpeedDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 5: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            {/* Row 6: +1 Crit */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit</span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(hackerPrimaryAttackCritDots, setHackerPrimaryAttackCritDots, idx, [3, 5, 8], 'hackerPrimaryAttackCritDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: hackerPrimaryAttackCritDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || hackerPrimaryAttackCritDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 7: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            {/* Row 8: +5 Hit Points */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(hackerPrimaryAttackHitPointsDots, setHackerPrimaryAttackHitPointsDots, idx, [4, 6, 8], 'hackerPrimaryAttackHitPointsDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: hackerPrimaryAttackHitPointsDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || hackerPrimaryAttackHitPointsDots[idx - 1]) ? 'pointer' : 'not-allowed',
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
                {generateForcedTeleportationJSX(tempSheet)}
              </span>
            </span>
          </div>

          {/* Strike XP progression table */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>16xp</span>
            <span></span>
            <span></span>
            {/* Row 2: Forced Teleportation */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Forced <b><i style={{ color: '#38761d' }}>Teleportation</i></b> to hx adjacent to <i>Drone</i> against 3hx or smaller enemy</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(hackerStrikeForcedTeleportationDots, setHackerStrikeForcedTeleportationDots, 0, [16], 'hackerStrikeForcedTeleportationDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: hackerStrikeForcedTeleportationDots[0] ? '#000' : '#fff',
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
            <i><b>Skills.</b> Computers</i> +2
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
            {/* Row 1: Empty cells and 12sp header */}
            <span></span>
            <span></span>
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12sp</span>
            {/* Row 2: Cyberpunk text and dot */}
            <div style={{ 
              fontSize: '1em', 
              fontFamily: 'Arial, Helvetica, sans-serif', 
              textAlign: 'left',
              paddingRight: '8px',
              lineHeight: '1.2',
              gridColumn: '1 / 4'
            }}>
              <b><i style={{ color: '#5c57b8', fontSize: '1em' }}>Cyberpunk.</i></b> You're a savant when it comes to working with computer interfaces and communications devices of all kinds. Gain an advantage on related skills when operating any type of screen or user interface.
            </div>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <span
                onClick={() => handleSpDotClick(hackerPerksSkillsDots, setHackerPerksSkillsDots, 0, [12], 'hackerPerksSkillsDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: hackerPerksSkillsDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>
        </div>
      )}

      {subclass === 'Junker' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateSalvageJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table */}
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
            {/* Row 1: XP header */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
            
            {/* Row 2: +1hx Range */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(junkerFeatureRangeDots, setJunkerFeatureRangeDots, idx, [4, 7, 10], 'junkerFeatureRangeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: junkerFeatureRangeDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || junkerFeatureRangeDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 3: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>16xp</span>
            
            {/* Row 4: +1 ally */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 ally</span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(junkerFeatureAllyDots, setJunkerFeatureAllyDots, idx, [7, 11, 16], 'junkerFeatureAllyDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: junkerFeatureAllyDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || junkerFeatureAllyDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 5: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>20xp</span>
            <span></span>
            <span></span>
            
            {/* Row 6: Crit Damage */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Gain Crit Damage</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(junkerFeatureCritDamageDot, setJunkerFeatureCritDamageDot, 0, [20], 'junkerFeatureCritDamageDot')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: junkerFeatureCritDamageDot[0] ? '#000' : '#fff',
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
                {generateDetonateJSX(sheet)}
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
            {/* Row 1: XP header */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>13xp</span>
            <span></span>
            
            {/* Row 2: +1hx-Radius AoE */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx-Radius <i>AoE</i></span>
            {[0, 1].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(junkerTechniqueAoEDots, setJunkerTechniqueAoEDots, idx, [8, 13], 'junkerTechniqueAoEDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: junkerTechniqueAoEDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || junkerTechniqueAoEDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>
            <span></span>

            {/* Row 3: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>13xp</span>
            
            {/* Row 4: +1 Spike (Slashing) */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#666', display: 'inline-flex', alignItems: 'center' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(junkerTechniqueSpikeDots, setJunkerTechniqueSpikeDots, idx, [4, 7, 13], 'junkerTechniqueSpikeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: junkerTechniqueSpikeDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || junkerTechniqueSpikeDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 5: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
            <span></span>
            
            {/* Row 6: -1 Cooldown */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
            {[0, 1].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(junkerTechniqueCooldownDots, setJunkerTechniqueCooldownDots, idx, [5, 9], 'junkerTechniqueCooldownDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: junkerTechniqueCooldownDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || junkerTechniqueCooldownDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>
            <span></span>
          </div>

          <hr style={{ margin: '16px 0', border: 0, borderTop: '1px solid #ddd' }} />

          <hr style={{ margin: '16px 0', border: 0, borderTop: '1px solid #ddd' }} />

          {/* Attack header */}
          <div style={{ color: '#990000', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
            
            <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
              <div style={{ marginBottom: '8px' }}>
                <b><i>Primary</i> <i style={{ color: '#990000' }}>Attack.</i></b>
              </div>
              
              {/* Junker Drones dropdown */}
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
                defaultValue="Junker Drones"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value !== "Junker Drones") {
                    setPendingJunkerDrone(value);
                    e.target.value = "Junker Drones"; // Reset dropdown
                  }
                }}
              >
                <option disabled style={{ fontWeight: 'bold' }}>Junker Drones</option>
                <option style={{ fontWeight: 'bold' }}>Big Hugs Gas Can</option>
                <option style={{ fontWeight: 'bold' }}>Shrapnel-Matic 500</option>
                <option style={{ fontWeight: 'bold' }}>Smash Hands XBot</option>
              </select>

              {/* Buy/Add dialog for Junker Drone selection */}
              {pendingJunkerDrone && (
                <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontWeight: 'bold' }}>
                    {pendingJunkerDrone}
                    <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                      {getJunkerDroneCost(pendingJunkerDrone)}c
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        const cost = getJunkerDroneCost(pendingJunkerDrone);
                        const currentCredits = credits || sheet?.credits || 0;
                        if (currentCredits < cost) {
                          setNotice('Not enough credits!');
                          return;
                        }
                        const newJunkerDrones = [...selectedJunkerDrones, pendingJunkerDrone];
                        const newCredits = currentCredits - cost;
                        setSelectedJunkerDrones(newJunkerDrones);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            junkerDrones: newJunkerDrones,
                            credits: newCredits
                          });
                        }
                        
                        setPendingJunkerDrone("");
                      }}
                    >Buy</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => {
                        const newJunkerDrones = [...selectedJunkerDrones, pendingJunkerDrone];
                        setSelectedJunkerDrones(newJunkerDrones);
                        
                        if (sheet && onAutoSave) {
                          onAutoSave({
                            junkerDrones: newJunkerDrones,
                            credits: credits || sheet?.credits || 0
                          });
                        }
                        
                        setPendingJunkerDrone("");
                      }}
                    >Add</button>
                    <button
                      style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                      onClick={() => setPendingJunkerDrone("")}
                    >Cancel</button>
                  </div>
                </div>
              )}

              {/* List of selected Junker Drones */}
              <div style={{ marginTop: '2px' }}>
                {selectedJunkerDrones.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '8px' }}>
                    {selectedJunkerDrones.map((drone, idx) => (
                      <span key={drone + idx} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                        {drone}
                        <button
                          style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                          title={`Remove ${drone}`}
                          onClick={() => {
                            const newJunkerDrones = selectedJunkerDrones.filter((_, i) => i !== idx);
                            setSelectedJunkerDrones(newJunkerDrones);
                            
                            if (sheet && onAutoSave) {
                              onAutoSave({
                                junkerDrones: newJunkerDrones
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
              {generateJunkerDroneJSX(sheet)}
            </div>
          </div>

          {/* Attack XP progression table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px 24px 24px',
            gridTemplateRows: 'repeat(5, auto)',
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
            {/* Row 2: Increase Die Size */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Increase Die Size</span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(junkerPrimaryAttackDieSizeDots, setJunkerPrimaryAttackDieSizeDots, idx, [5, 8, 12], 'junkerPrimaryAttackDieSizeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: junkerPrimaryAttackDieSizeDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || junkerPrimaryAttackDieSizeDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 3: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>15xp</span>
            {/* Row 4: Repeat +1 */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Repeat +1</span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(junkerPrimaryAttackRepeatDots, setJunkerPrimaryAttackRepeatDots, idx, [5, 8, 15], 'junkerPrimaryAttackRepeatDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: junkerPrimaryAttackRepeatDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || junkerPrimaryAttackRepeatDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 5: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
            {/* Row 6: +2 Speed */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2 <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(junkerPrimaryAttackSpeedDots, setJunkerPrimaryAttackSpeedDots, idx, [4, 7, 11], 'junkerPrimaryAttackSpeedDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: junkerPrimaryAttackSpeedDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || junkerPrimaryAttackSpeedDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 7: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>2xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
            {/* Row 8: +1 Crit */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit</span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(junkerPrimaryAttackCritDots, setJunkerPrimaryAttackCritDots, idx, [2, 4, 6], 'junkerPrimaryAttackCritDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: junkerPrimaryAttackCritDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || junkerPrimaryAttackCritDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
            <span></span>

            {/* Row 9: XP header */}
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            {/* Row 10: Summon +5 Hit Points */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><i><b>Summon</b></i> +5 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(junkerPrimaryAttackHitPointsDots, setJunkerPrimaryAttackHitPointsDots, idx, [4, 6, 8], 'junkerPrimaryAttackHitPointsDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: junkerPrimaryAttackHitPointsDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || junkerPrimaryAttackHitPointsDots[idx - 1]) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          <hr style={{ margin: '12px', border: 0, borderTop: '1px solid #ddd' }} />

          {/* Perks header */}
          <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <i><b>Skills.</b> Thievery</i> +2
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
            {/* Row 1: Empty cells and 10sp header */}
            <span></span>
            <span></span>
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10sp</span>
            {/* Row 2: Scavenger text and dot */}
            <div style={{ 
              fontSize: '1em', 
              fontFamily: 'Arial, Helvetica, sans-serif', 
              textAlign: 'left',
              paddingRight: '8px',
              lineHeight: '1.2',
              gridColumn: '1 / 4'
            }}>
              <b><i style={{ color: '#6db857', fontSize: '1em' }}>Scavenger.</i></b> You have a knack for always being able to find, steal, or make the part you need to make something mechanical work. Gain an advantage on related skill rolls.
            </div>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <span
                onClick={() => handleSpDotClick(junkerPerksSkillsDots, setJunkerPerksSkillsDots, 0, [10], 'junkerPerksSkillsDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: junkerPerksSkillsDots[0] ? '#000' : '#fff',
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

export default LevelUpSubclassesTechnician;
