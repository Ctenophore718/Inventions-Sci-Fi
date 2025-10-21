import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { saveCharacterSheet } from "../utils/storage";
import { generateTelekineticShieldJSX } from "../utils/inertialFeature";
import { generateGravityWellJSX } from "../utils/inertialTechnique";
import { generateInertialStrikeJSX } from "../utils/inertialStrike";
import { generateFinalFistsJSX } from "../utils/kineticFeature";
import { generateGrandSlamJSX } from "../utils/kineticTechnique";
import { generateKineticStrikeJSX } from "../utils/kineticStrike";
import { generateBladeshieldJSX } from "../utils/mercurialFeature";
import { generateHasteJSX } from "../utils/mercurialTechnique";
import { generateMercurialStrikeJSX } from "../utils/mercurialStrike";
import { generateUnreasonableAccuracyJSX } from "../utils/vectorialFeature";
import { generateVectorCloneJSX } from "../utils/vectorialTechnique";
import { generateVectorialStrikeJSX } from "../utils/vectorialStrike";

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

  // Independent state for Kinetic dots
  const [kineticFeatureStrikeDamageDots, setKineticFeatureStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.kineticFeatureStrikeDamageDots || [false, false, false]
  );
  const [kineticFeatureMoveHxDots, setKineticFeatureMoveHxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.kineticFeatureMoveHxDots || [false, false, false]
  );
  const [kineticTechniqueBounceHxDots, setKineticTechniqueBounceHxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.kineticTechniqueBounceHxDots || [false, false, false]
  );
  const [kineticTechniqueDamageDots, setKineticTechniqueDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.kineticTechniqueDamageDots || [false, false, false]
  );
  const [kineticTechniqueCooldownDots, setKineticTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.kineticTechniqueCooldownDots || [false, false]
  );
  const [kineticMovementSpeedDots, setKineticMovementSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.kineticMovementSpeedDots || [false, false]
  );
  const [kineticMovementCreatureJumpDots, setKineticMovementCreatureJumpDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.kineticMovementCreatureJumpDots || [false]
  );
  const [kineticStrikeDamageDots, setKineticStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.kineticStrikeDamageDots || [false, false, false]
  );
  const [kineticStrikeRangeDots, setKineticStrikeRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.kineticStrikeRangeDots || [false, false, false]
  );
  const [kineticStrikeSlamHxDots, setKineticStrikeSlamHxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.kineticStrikeSlamHxDots || [false, false, false]
  );
  const [kineticStrikeMultiStrikeDots, setKineticStrikeMultiStrikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.kineticStrikeMultiStrikeDots || [false]
  );
  const [kineticPerksSkillsDots, setKineticPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.kineticPerksSkillsDots || [false]
  );

  // Independent state for Mercurial dots
  const [mercurialTechniqueSpeedDots, setMercurialTechniqueSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.mercurialTechniqueSpeedDots || [false, false, false]
  );
  const [mercurialTechniqueStrikeDots, setMercurialTechniqueStrikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.mercurialTechniqueStrikeDots || [false, false, false]
  );
  const [mercurialTechniqueCooldownDots, setMercurialTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.mercurialTechniqueCooldownDots || [false, false]
  );
  const [mercurialMovementSpeedDots, setMercurialMovementSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.mercurialMovementSpeedDots || [false, false, false]
  );
  const [mercurialMovementCreatureJumpDots, setMercurialMovementCreatureJumpDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.mercurialMovementCreatureJumpDots || [false]
  );
  const [mercurialMovementCreatureDots, setMercurialMovementCreatureDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.mercurialMovementCreatureDots || [false]
  );
  const [mercurialMovementJumpSpeedDots, setMercurialMovementJumpSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.mercurialMovementJumpSpeedDots || [false, false]
  );
  const [mercurialStrikeDamageDots, setMercurialStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.mercurialStrikeDamageDots || [false, false, false]
  );
  const [mercurialStrikeMoveHxDots, setMercurialStrikeMoveHxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.mercurialStrikeMoveHxDots || [false, false]
  );
  const [mercurialStrikeMultiStrikeDots, setMercurialStrikeMultiStrikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.mercurialStrikeMultiStrikeDots || [false]
  );
  const [mercurialPerksSkillsDots, setMercurialPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.mercurialPerksSkillsDots || [false]
  );

  // Independent state for Vectorial dots
  const [vectorialFeatureIgnoreCoverDots, setVectorialFeatureIgnoreCoverDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.vectorialFeatureIgnoreCoverDots || [false]
  );
  const [vectorialFeatureCritDots, setVectorialFeatureCritDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.vectorialFeatureCritDots || [false, false, false]
  );
  const [vectorialFeatureRangeDots, setVectorialFeatureRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.vectorialFeatureRangeDots || [false, false, false]
  );
  const [vectorialTechniqueCloneDots, setVectorialTechniqueCloneDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.vectorialTechniqueCloneDots || [false, false]
  );
  const [vectorialTechniqueAttackDots, setVectorialTechniqueAttackDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.vectorialTechniqueAttackDots || [false]
  );
  const [vectorialTechniqueCooldownDots, setVectorialTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.vectorialTechniqueCooldownDots || [false, false]
  );
  const [vectorialStrikeDamageDots, setVectorialStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.vectorialStrikeDamageDots || [false, false, false]
  );
  const [vectorialStrikeRangeDots, setVectorialStrikeRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.vectorialStrikeRangeDots || [false, false, false]
  );
  const [vectorialStrikeMultiStrikeDots, setVectorialStrikeMultiStrikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.vectorialStrikeMultiStrikeDots || [false]
  );
  const [vectorialPerksSkillsDots, setVectorialPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.vectorialPerksSkillsDots || [false]
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
        spSpent: Math.max(0, newSpSpent),
        spRemaining: spTotal - Math.max(0, newSpSpent)
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
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2 Damage dice</span>
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

      {subclass === 'Kinetic' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateFinalFistsJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table - First row */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            {/* Row 2: +1d6 Strike Damage dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d6 <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(kineticFeatureStrikeDamageDots, setKineticFeatureStrikeDamageDots, idx, [3, 6, 8], 'kineticFeatureStrikeDamageDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: kineticFeatureStrikeDamageDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || kineticFeatureStrikeDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Feature XP progression table - Second row */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            {/* Row 2: Move +1hx dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i style={{ color: '#38761d' }}>Move</i></b> +1hx</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(kineticFeatureMoveHxDots, setKineticFeatureMoveHxDots, idx, [3, 6, 8], 'kineticFeatureMoveHxDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: kineticFeatureMoveHxDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || kineticFeatureMoveHxDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Technique Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ color: '#000', fontWeight: 400, fontSize: '1em', marginBottom: '8px' }}>
              {generateGrandSlamJSX(sheet)}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              {/* Row 2: Bounce +3hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Bounce</i></b> +3hx</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(kineticTechniqueBounceHxDots, setKineticTechniqueBounceHxDots, idx, [5, 7, 10], 'kineticTechniqueBounceHxDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: kineticTechniqueBounceHxDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || kineticTechniqueBounceHxDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              {/* Row 2: +2d6 Force dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b></span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(kineticTechniqueDamageDots, setKineticTechniqueDamageDots, idx, [5, 7, 10], 'kineticTechniqueDamageDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: kineticTechniqueDamageDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || kineticTechniqueDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Technique XP progression table - Third row */}
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
                    onClick={() => handleDotClick(kineticTechniqueCooldownDots, setKineticTechniqueCooldownDots, idx, [4, 7], 'kineticTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: kineticTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || kineticTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>
          </div>

          {/* Movement Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i>Enhanced</i> <i style={{ color: '#38761d' }}>Movement</i> <i>Effects.</i></b>
              {kineticMovementSpeedDots.filter(Boolean).length > 0 && (
                <span style={{ marginLeft: 8 }}>
                  +<b>[{kineticMovementSpeedDots.filter(Boolean).length}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b>
                </span>
              )}
              {kineticMovementCreatureJumpDots[0] && (
                <span style={{ marginLeft: 8 }}>
                  <b><i style={{ color: '#38761d' }}>Jump</i></b> 3hx
                </span>
              )}
            </div>

            {/* Movement XP progression table - First row */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span></span>
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(kineticMovementSpeedDots, setKineticMovementSpeedDots, idx, [4, 8], 'kineticMovementSpeedDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: kineticMovementSpeedDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || kineticMovementSpeedDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>

            {/* Movement XP progression table - Second row */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Creature Jump 3hx dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Creature <b><i style={{ color: '#38761d' }}>Jump</i></b> 3hx</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(kineticMovementCreatureJumpDots, setKineticMovementCreatureJumpDots, 0, [5], 'kineticMovementCreatureJumpDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: kineticMovementCreatureJumpDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Strike Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateKineticStrikeJSX(sheet)}
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
              {/* Row 2: +1 Damage die dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Damage die</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(kineticStrikeDamageDots, setKineticStrikeDamageDots, idx, [6, 10, 18], 'kineticStrikeDamageDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: kineticStrikeDamageDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || kineticStrikeDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>20xp</span>
              {/* Row 2: +1hx Strike Range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#351c75' }}>Strike</i></b> Range</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(kineticStrikeRangeDots, setKineticStrikeRangeDots, idx, [7, 12, 20], 'kineticStrikeRangeDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: kineticStrikeRangeDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || kineticStrikeRangeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              {/* Row 2: Slam +1hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Slam</i></b> +1hx</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(kineticStrikeSlamHxDots, setKineticStrikeSlamHxDots, idx, [3, 6, 8], 'kineticStrikeSlamHxDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: kineticStrikeSlamHxDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || kineticStrikeSlamHxDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Strike XP progression table - Fourth row */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
              <span></span>
              <span></span>
              {/* Row 2: +1 Strike dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#351c75' }}>Strike</i></b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(kineticStrikeMultiStrikeDots, setKineticStrikeMultiStrikeDots, 0, [12], 'kineticStrikeMultiStrikeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: kineticStrikeMultiStrikeDots[0] ? '#000' : '#fff',
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
              <i><b>Skills.</b> Athletics</i> +2
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
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8sp</span>
                {/* Row 2: Martial Artist */}
                <div style={{
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left', 
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#7b941c', fontSize: '1em' }}>Martial Artist.</i></b> Years of disciplined practice have made you into a talented martial artist. Gain an advantage on related skill rolls when performing difficult maneuvers.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(kineticPerksSkillsDots, setKineticPerksSkillsDots, 0, [8], 'kineticPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: kineticPerksSkillsDots[0] ? '#000' : '#fff',
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

      {subclass === 'Mercurial' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateBladeshieldJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Technique Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ color: '#000', fontWeight: 400, fontSize: '1em', marginBottom: '8px' }}>
              {generateHasteJSX(sheet)}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(mercurialTechniqueSpeedDots, setMercurialTechniqueSpeedDots, idx, [3, 6, 9], 'mercurialTechniqueSpeedDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: mercurialTechniqueSpeedDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || mercurialTechniqueSpeedDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>15xp</span>
              {/* Row 2: +1 Strike dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#351c75' }}>Strike</i></b></span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(mercurialTechniqueStrikeDots, setMercurialTechniqueStrikeDots, idx, [5, 8, 15], 'mercurialTechniqueStrikeDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: mercurialTechniqueStrikeDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || mercurialTechniqueStrikeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Technique XP progression table - Third row */}
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
                    onClick={() => handleDotClick(mercurialTechniqueCooldownDots, setMercurialTechniqueCooldownDots, idx, [4, 7], 'mercurialTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: mercurialTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || mercurialTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>
          </div>

          {/* Movement Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i>Enhanced</i> <i style={{ color: '#38761d' }}>Movement</i> <i>Effects.</i></b>
              {mercurialMovementSpeedDots.filter(Boolean).length > 0 && (
                <span style={{ marginLeft: 8 }}>
                  +<b>[{mercurialMovementSpeedDots.filter(Boolean).length}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b>.
                </span>
              )}
              {mercurialMovementCreatureJumpDots[0] && (
                <span style={{ marginLeft: 8 }}>
                  <b><i style={{ color: '#38761d' }}>Jump</i></b> <b>[{3 + mercurialMovementJumpSpeedDots.filter(Boolean).length}]</b>hx.
                </span>
              )}
              {mercurialMovementCreatureDots[0] && (
                <span style={{ marginLeft: 8 }}>
                  +<b>[1]</b> creature.
                </span>
              )}
            </div>

            {/* Movement XP progression table - First row */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(mercurialMovementSpeedDots, setMercurialMovementSpeedDots, idx, [3, 6, 12], 'mercurialMovementSpeedDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: mercurialMovementSpeedDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || mercurialMovementSpeedDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Movement XP progression table - Second row */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Creature Jump 3hx dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Creature <b><i style={{ color: '#38761d' }}>Jump</i></b> 3hx</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(mercurialMovementCreatureJumpDots, setMercurialMovementCreatureJumpDots, 0, [5], 'mercurialMovementCreatureJumpDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: mercurialMovementCreatureJumpDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
            </div>

            {/* Movement XP progression table - Third row */}
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
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span></span>

              {/* Row 2: +1 creature dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 creature</span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => mercurialMovementCreatureJumpDots[0] && handleDotClick(mercurialMovementCreatureDots, setMercurialMovementCreatureDots, 0, [8], 'mercurialMovementCreatureDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: mercurialMovementCreatureDots[0] ? '#000' : '#fff',
                    cursor: mercurialMovementCreatureJumpDots[0] ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
            </div>

            {/* Movement XP progression table - Fourth row */}
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
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>        
              {/* Row 2: +1 Jump Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#38761d' }}>Jump</i></b> Speed</span>
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => {
                      if (idx === 0 && !mercurialMovementCreatureJumpDots[0]) return;
                      if (idx === 0 || mercurialMovementJumpSpeedDots.slice(0, idx).every(Boolean)) {
                        handleDotClick(mercurialMovementJumpSpeedDots, setMercurialMovementJumpSpeedDots, idx, [4, 6], 'mercurialMovementJumpSpeedDots');
                      }
                    }}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: mercurialMovementJumpSpeedDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 && !mercurialMovementCreatureJumpDots[0]) ? 'not-allowed' : ((idx === 0 || mercurialMovementJumpSpeedDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed'),
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>
          </div>

          {/* Strike Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateMercurialStrikeJSX(sheet)}
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
              {/* Row 2: +1 Damage die dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Damage die</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(mercurialStrikeDamageDots, setMercurialStrikeDamageDots, idx, [6, 10, 18], 'mercurialStrikeDamageDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: mercurialStrikeDamageDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || mercurialStrikeDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              <span></span>
              {/* Row 2: Move +1hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i style={{ color: '#38761d' }}>Move</i></b> +1hx</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(mercurialStrikeMoveHxDots, setMercurialStrikeMoveHxDots, idx, [5, 7], 'mercurialStrikeMoveHxDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: mercurialStrikeMoveHxDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || mercurialStrikeMoveHxDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
              <span></span>
              <span></span>
              {/* Row 2: +1 Strike dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#351c75' }}>Strike</i></b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(mercurialStrikeMultiStrikeDots, setMercurialStrikeMultiStrikeDots, 0, [12], 'mercurialStrikeMultiStrikeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: mercurialStrikeMultiStrikeDots[0] ? '#000' : '#fff',
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
              <i><b>Skills.</b> Acrobatics</i> +2
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
                {/* Row 2: Quicksilver Implement */}
                <div style={{
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left', 
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#941c6c', fontSize: '1em' }}>Quicksilver Implement.</i></b> Your mastery of the <i>Mercury Blade</i> extends beyond the battlefield, and you can manipulate the blade into various small tools that you can levitate and utilize up to 3hx away from you.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(mercurialPerksSkillsDots, setMercurialPerksSkillsDots, 0, [9], 'mercurialPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: mercurialPerksSkillsDots[0] ? '#000' : '#fff',
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

      {subclass === 'Vectorial' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature Section */}
          <div style={{ fontWeight: 'bold', color: '#116372', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
          <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            {generateUnreasonableAccuracyJSX(sheet)}
          </div>

          {/* Feature XP progression table - First row: Ignore all Cover */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
            <span></span>
            <span></span>
            {/* Row 2: Ignore all Cover dot */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Ignore all Cover</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(vectorialFeatureIgnoreCoverDots, setVectorialFeatureIgnoreCoverDots, 0, [12], 'vectorialFeatureIgnoreCoverDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: vectorialFeatureIgnoreCoverDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            <span></span>
          </div>

          {/* Feature XP progression table - Second row: +1 Crit */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            {/* Row 2: +1 Crit dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(vectorialFeatureCritDots, setVectorialFeatureCritDots, idx, [3, 5, 8], 'vectorialFeatureCritDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: vectorialFeatureCritDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || vectorialFeatureCritDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Feature XP progression table - Third row: +1hx Range */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            {/* Row 2: +1hx Range dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx Range</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(vectorialFeatureRangeDots, setVectorialFeatureRangeDots, idx, [3, 5, 8], 'vectorialFeatureRangeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: vectorialFeatureRangeDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || vectorialFeatureRangeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Technique Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateVectorCloneJSX(sheet)}
            </div>

            {/* Technique XP progression table - First row: +1 clone */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>16xp</span>
              <span></span>
              {/* Row 2: +1 clone dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 clone</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(vectorialTechniqueCloneDots, setVectorialTechniqueCloneDots, idx, [9, 16], 'vectorialTechniqueCloneDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: vectorialTechniqueCloneDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || vectorialTechniqueCloneDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>

            {/* Technique XP progression table - Second row: +1 Attack */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
              <span></span>
              <span></span>
              {/* Row 2: +1 Attack dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#990000' }}>Attack</i></b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(vectorialTechniqueAttackDots, setVectorialTechniqueAttackDots, 0, [9], 'vectorialTechniqueAttackDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: vectorialTechniqueAttackDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
            </div>

            {/* Technique XP progression table - Third row: -1 Cooldown */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span></span>
              {/* Row 2: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(vectorialTechniqueCooldownDots, setVectorialTechniqueCooldownDots, idx, [5, 8], 'vectorialTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: vectorialTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || vectorialTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              {generateVectorialStrikeJSX(sheet)}
            </div>

            {/* Strike XP progression table - First row: +1 Damage die */}
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
              {/* Row 2: +1 Damage die dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Damage die</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(vectorialStrikeDamageDots, setVectorialStrikeDamageDots, idx, [6, 10, 18], 'vectorialStrikeDamageDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: vectorialStrikeDamageDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || vectorialStrikeDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Strike XP progression table - Second row: +2hx Strike Range */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>20xp</span>
              {/* Row 2: +2hx Strike Range dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2hx <b><i style={{ color: '#351c75' }}>Strike</i></b> Range</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(vectorialStrikeRangeDots, setVectorialStrikeRangeDots, idx, [7, 12, 20], 'vectorialStrikeRangeDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: vectorialStrikeRangeDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || vectorialStrikeRangeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Strike XP progression table - Third row: +1 Strike */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
              <span></span>
              <span></span>
              {/* Row 2: +1 Strike dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#351c75' }}>Strike</i></b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(vectorialStrikeMultiStrikeDots, setVectorialStrikeMultiStrikeDots, 0, [12], 'vectorialStrikeMultiStrikeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: vectorialStrikeMultiStrikeDots[0] ? '#000' : '#fff',
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
              <i><b>Skills.</b> Piloting</i> +2
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
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12sp</span>
                {/* Row 2: Throw Image */}
                <div style={{
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left', 
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#531c94', fontSize: '1em' }}>Throw Image.</i></b> You can briefly Oikomagically clone yourself and exist in two places at once outside of combat. You summon the clone adjacent to you and it lasts for 10 seconds. Otherwise, it functions exactly as you can.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(vectorialPerksSkillsDots, setVectorialPerksSkillsDots, 0, [12], 'vectorialPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: vectorialPerksSkillsDots[0] ? '#000' : '#fff',
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
