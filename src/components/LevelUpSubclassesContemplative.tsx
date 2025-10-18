import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { saveCharacterSheet } from "../utils/storage";
import { generateTelekineticShieldJSX } from "../utils/inertialFeature";
import { generateGravityWellJSX } from "../utils/inertialTechnique";
import { generateInertialStrikeJSX } from "../utils/inertialStrike";

type LevelUpSubclassesContemplativeProps = {
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

const LevelUpSubclassesContemplative: React.FC<LevelUpSubclassesContemplativeProps> = ({ 
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
  
  // Independent state for Inertial dots
  const [inertialFeatureReflectDots, setInertialFeatureReflectDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.inertialFeatureReflectDots || [false]
  );
  const [inertialTechniqueRangeDots, setInertialTechniqueRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.inertialTechniqueRangeDots || [false, false, false]
  );
  const [inertialTechniqueCooldownDots, setInertialTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.inertialTechniqueCooldownDots || [false, false]
  );
  const [inertialHitPointsDots, setInertialHitPointsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.inertialHitPointsDots || [false, false, false]
  );
  const [inertialStrikeDamageDots, setInertialStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.inertialStrikeDamageDots || [false, false, false]
  );
  const [inertialStrikeRestrainDots, setInertialStrikeRestrainDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.inertialStrikeRestrainDots || [false]
  );
  const [inertialStrikeSleepDots, setInertialStrikeSleepDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.inertialStrikeSleepDots || [false]
  );
  const [inertialPerksSkillsDots, setInertialPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.inertialPerksSkillsDots || [false]
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
        
        // If this is Hit Points dots, also update maxHitPoints
        let updates: Partial<CharacterSheet> = {
          subclassProgressionDots: progressionDots,
          xpSpent: Math.max(0, newXpSpent)
        };
        
        if (dotType === 'inertialHitPointsDots') {
          const hpBonus = newArray.filter(Boolean).length * 5;
          const currentMaxHP = sheet?.maxHitPoints || 0;
          const oldHpBonus = currentArray.filter(Boolean).length * 5;
          const newMaxHP = currentMaxHP - oldHpBonus + hpBonus;
          updates.maxHitPoints = newMaxHP;
        }
        
        onAutoSave(updates);
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
    let spDelta = 0;
    
    if (!currentArray[index]) {
      newArray[index] = true;
      spDelta += spCosts[index] || 0;
    } else {
      newArray[index] = false;
      spDelta -= spCosts[index] || 0;
    }
    
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
  };

  
  return (
    <div style={{ width: '100%', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      
      {subclass === 'Inertial' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateTelekineticShieldJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px',
            gridTemplateRows: 'repeat(2, auto)',
            columnGap: '6px',
            rowGap: '2px',
            alignItems: 'start',
            marginBottom: '2px',
            width: '100%',
            paddingLeft: '4px'
          }}>
            {/* Row 1: XP header */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>16xp</span>
            <span></span>
            <span></span>
            {/* Row 2: Reflect dot */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Reflect +1d6 same Damage type back</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(inertialFeatureReflectDots, setInertialFeatureReflectDots, 0, [16], 'inertialFeatureReflectDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: inertialFeatureReflectDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            <span></span>
          </div>

          {/* Technique Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ color: '#000', fontWeight: 400, fontSize: '1em', marginBottom: '8px' }}>
              {generateGravityWellJSX(sheet)}
            </div>

            {/* Technique XP progression table - First row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
              {/* Row 2: +1hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(inertialTechniqueRangeDots, setInertialTechniqueRangeDots, idx, [6, 9, 12], 'inertialTechniqueRangeDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: inertialTechniqueRangeDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || inertialTechniqueRangeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Technique XP progression table - Second row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginTop: '2px',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              <span></span>
              {/* Row 2: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(inertialTechniqueCooldownDots, setInertialTechniqueCooldownDots, idx, [4, 7], 'inertialTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: inertialTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || inertialTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>
          </div>

          {/* Hit Points Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Hit Points</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i>Extra</i> <i style={{ color: '#990000' }}>Hit Points.</i></b> +<b>[{inertialHitPointsDots.filter(Boolean).length * 5}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
            </div>

            {/* Hit Points XP progression table */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>16xp</span>
              {/* Row 2: +5 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+5 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(inertialHitPointsDots, setInertialHitPointsDots, idx, [5, 9, 16], 'inertialHitPointsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: inertialHitPointsDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || inertialHitPointsDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
          </div>

          {/* Strike Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateInertialStrikeJSX(sheet)}
            </div>

            {/* Strike XP progression table - First row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>18xp</span>
              {/* Row 2: +2 Damage die dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2 Damage die</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(inertialStrikeDamageDots, setInertialStrikeDamageDots, idx, [6, 10, 18], 'inertialStrikeDamageDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: inertialStrikeDamageDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || inertialStrikeDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Strike XP progression table - Second row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginTop: '2px',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Inflict Restrain dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Restrain</i></b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(inertialStrikeRestrainDots, setInertialStrikeRestrainDots, 0, [6], 'inertialStrikeRestrainDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: inertialStrikeRestrainDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
            </div>

            {/* Strike XP progression table - Third row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginTop: '2px',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Inflict Sleep dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Sleep</i></b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(inertialStrikeSleepDots, setInertialStrikeSleepDots, 0, [8], 'inertialStrikeSleepDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: inertialStrikeSleepDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Perks Section */}
          <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <i><b>Skills.</b> Diplomacy</i> +2
            </div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 24px',
                gridTemplateRows: 'auto auto',
                columnGap: '6px',
                rowGap: '2px',
                alignItems: 'start',
                marginTop: '-12px',
                width: '100%',
                paddingLeft: '4px'
              }}>
                {/* Row 1: SP header */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9sp</span>
                {/* Row 2: De-escalator */}
                <div style={{
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left', 
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#1c945e', fontSize: '1em' }}>De-escalator.</i></b> Your discipline extends beyond the battlefield and into the social realm. You can shut down conversations, rampant emotions or other problematic situations before they get a chance to explode into violence. Gain an advantage on related skills.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(inertialPerksSkillsDots, setInertialPerksSkillsDots, 0, [9], 'inertialPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: inertialPerksSkillsDots[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelUpSubclassesContemplative;
