import React, { useState, useEffect, useCallback, useRef } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateAirArmorJSX } from "../utils/airFeature";
import { generateWingsOfAirJSX } from "../utils/airTechnique";
import { generateAirStrikeJSX } from "../utils/airStrike";
import { generateEarthArmorJSX } from "../utils/earthFeature";
import { generateEarthenWallJSX } from "../utils/earthTechnique";
import { generateEarthStrikeJSX } from "../utils/earthStrike";
import { generateFireArmorJSX } from "../utils/fireFeature";
import { generateFirestormJSX } from "../utils/fireTechnique";
import { generateFireStrikeJSX } from "../utils/fireStrike";
import { generateWaterArmorJSX } from "../utils/waterFeature";
import { generateCleansingWatersJSX } from "../utils/waterTechnique";
import { generateWaterStrikeJSX } from "../utils/waterStrike";

type LevelUpSubclassesElementalistProps = {
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

const LevelUpSubclassesElementalist: React.FC<LevelUpSubclassesElementalistProps> = ({ 
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
  
  // Independent state for Air dots
  const [airFeatureForceImmunityDots, setAirFeatureForceImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airFeatureForceImmunityDots || [false]
  );
  const [airFeatureForceAbsorptionDots, setAirFeatureForceAbsorptionDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airFeatureForceAbsorptionDots || [false]
  );
  const [airFeatureElectricResistanceDots, setAirFeatureElectricResistanceDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airFeatureElectricResistanceDots || [false]
  );
  const [airFeatureElectricImmunityDots, setAirFeatureElectricImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airFeatureElectricImmunityDots || [false]
  );
  const [airFeatureRestrainImmunityDots, setAirFeatureRestrainImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airFeatureRestrainImmunityDots || [false]
  );
  const [airTechniqueRangeDots, setAirTechniqueRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airTechniqueRangeDots || [false, false, false]
  );
  const [airTechniqueSpeedDots, setAirTechniqueSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airTechniqueSpeedDots || [false, false, false]
  );
  const [airTechniqueCooldownDots, setAirTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airTechniqueCooldownDots || [false, false]
  );
  const [airMovementSpeedDots, setAirMovementSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airMovementSpeedDots || [false, false, false]
  );
  const [airMovementFlySpeedDots, setAirMovementFlySpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airMovementFlySpeedDots || [false]
  );
  const [airStrikeDamageDots, setAirStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airStrikeDamageDots || [false]
  );
  const [airStrikeMultiStrikeDots, setAirStrikeMultiStrikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airStrikeMultiStrikeDots || [false, false]
  );
  const [airStrikeInflictSlamDots, setAirStrikeInflictSlamDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airStrikeInflictSlamDots || [false]
  );
  const [airPerksSkillsDots, setAirPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.airPerksSkillsDots || [false]
  );

  // Independent state for Earth dots
  const [earthFeatureBludgeoningImmunityDots, setEarthFeatureBludgeoningImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.earthFeatureBludgeoningImmunityDots || [false]
  );
  const [earthFeatureBludgeoningAbsorptionDots, setEarthFeatureBludgeoningAbsorptionDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.earthFeatureBludgeoningAbsorptionDots || [false]
  );
  const [earthFeatureSlashingResistanceDots, setEarthFeatureSlashingResistanceDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.earthFeatureSlashingResistanceDots || [false]
  );
  const [earthFeatureSlashingImmunityDots, setEarthFeatureSlashingImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.earthFeatureSlashingImmunityDots || [false]
  );
  const [earthFeatureSlamImmunityDots, setEarthFeatureSlamImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.earthFeatureSlamImmunityDots || [false]
  );
  const [earthTechniqueAoEDots, setEarthTechniqueAoEDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.earthTechniqueAoEDots || [false, false, false]
  );
  const [earthTechniqueBounceDots, setEarthTechniqueBounceDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.earthTechniqueBounceDots || [false]
  );
  const [earthTechniqueCooldownDots, setEarthTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.earthTechniqueCooldownDots || [false, false]
  );
  const [earthStrikeDamageDots, setEarthStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.earthStrikeDamageDots || [false, false, false]
  );
  const [earthStrikeInflictRestrainDots, setEarthStrikeInflictRestrainDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.earthStrikeInflictRestrainDots || [false]
  );
  const [earthPerksSkillsDots, setEarthPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.earthPerksSkillsDots || [false]
  );

  // Independent state for Fire dots
  const [fireFeatureFireImmunityDots, setFireFeatureFireImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.fireFeatureFireImmunityDots || [false]
  );
  const [fireFeatureFireAbsorptionDots, setFireFeatureFireAbsorptionDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.fireFeatureFireAbsorptionDots || [false]
  );
  const [fireFeatureChemicalResistanceDots, setFireFeatureChemicalResistanceDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.fireFeatureChemicalResistanceDots || [false]
  );
  const [fireFeatureChemicalImmunityDots, setFireFeatureChemicalImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.fireFeatureChemicalImmunityDots || [false]
  );
  const [fireFeatureDemoralizeImmunityDots, setFireFeatureDemoralizeImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.fireFeatureDemoralizeImmunityDots || [false]
  );
  const [fireTechniqueHxDots, setFireTechniqueHxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.fireTechniqueHxDots || [false, false, false]
  );
  const [fireTechniqueSpikeDots, setFireTechniqueSpikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.fireTechniqueSpikeDots || [false, false, false]
  );
  const [fireTechniqueCooldownDots, setFireTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.fireTechniqueCooldownDots || [false, false]
  );
  const [fireMovementSpeedDots, setFireMovementSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.fireMovementSpeedDots || [false, false]
  );
  const [fireStrikeDamageDots, setFireStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.fireStrikeDamageDots || [false, false]
  );
  const [fireStrikeExtraStrikeDots, setFireStrikeExtraStrikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.fireStrikeExtraStrikeDots || [false]
  );
  const [fireStrikeInflictSpikeDots, setFireStrikeInflictSpikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.fireStrikeInflictSpikeDots || [false]
  );
  const [firePerksSkillsDots, setFirePerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.firePerksSkillsDots || [false]
  );

  // Independent state for Water dots
  const [waterFeatureColdImmunityDots, setWaterFeatureColdImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.waterFeatureColdImmunityDots || [false]
  );
  const [waterFeatureColdAbsorptionDots, setWaterFeatureColdAbsorptionDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.waterFeatureColdAbsorptionDots || [false]
  );
  const [waterFeatureToxicResistanceDots, setWaterFeatureToxicResistanceDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.waterFeatureToxicResistanceDots || [false]
  );
  const [waterFeatureToxicImmunityDots, setWaterFeatureToxicImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.waterFeatureToxicImmunityDots || [false]
  );
  const [waterFeatureSpikeImmunityDots, setWaterFeatureSpikeImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.waterFeatureSpikeImmunityDots || [false]
  );
  const [waterTechniqueHxDots, setWaterTechniqueHxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.waterTechniqueHxDots || [false, false, false]
  );
  const [waterTechniqueHpDots, setWaterTechniqueHpDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.waterTechniqueHpDots || [false, false, false]
  );
  const [waterTechniqueCooldownDots, setWaterTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.waterTechniqueCooldownDots || [false, false]
  );
  const [waterMovementSpeedDots, setWaterMovementSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.waterMovementSpeedDots || [false, false]
  );
  const [waterMovementSwimSpeedDots, setWaterMovementSwimSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.waterMovementSwimSpeedDots || [false]
  );
  const [waterStrikeDamageDots, setWaterStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.waterStrikeDamageDots || [false]
  );
  const [waterStrikeInflictDemoralizeDots, setWaterStrikeInflictDemoralizeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.waterStrikeInflictDemoralizeDots || [false]
  );
  const [waterPerksSkillsDots, setWaterPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.waterPerksSkillsDots || [false]
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
      
      {subclass === 'Air' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateAirArmorJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table - Force Immunity */}
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
            <span></span>
            <span></span>
            {/* Row 2: Force Immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Immunity</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(airFeatureForceImmunityDots, setAirFeatureForceImmunityDots, 0, [5], 'airFeatureForceImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: airFeatureForceImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Force Absorption (prerequisite: Force Immunity) */}
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
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span></span>
            {/* Row 2: Force Absorption */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Absorption</i></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => {
                  if (!airFeatureForceImmunityDots[0]) {
                    setNotice("Must purchase Force Immunity first!");
                    return;
                  }
                  handleDotClick(airFeatureForceAbsorptionDots, setAirFeatureForceAbsorptionDots, 0, [8], 'airFeatureForceAbsorptionDots');
                }}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: airFeatureForceAbsorptionDots[0] ? '#000' : '#fff',
                  cursor: airFeatureForceImmunityDots[0] ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Electric Resistance */}
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
            <span></span>
            <span></span>
            {/* Row 2: Electric Resistance */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Resistance</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(airFeatureElectricResistanceDots, setAirFeatureElectricResistanceDots, 0, [3], 'airFeatureElectricResistanceDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: airFeatureElectricResistanceDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Electric Immunity (prerequisite: Electric Resistance) */}
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
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span></span>
            {/* Row 2: Electric Immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Immunity</i></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => {
                  if (!airFeatureElectricResistanceDots[0]) {
                    setNotice("Must purchase Electric Resistance first!");
                    return;
                  }
                  handleDotClick(airFeatureElectricImmunityDots, setAirFeatureElectricImmunityDots, 0, [5], 'airFeatureElectricImmunityDots');
                }}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: airFeatureElectricImmunityDots[0] ? '#000' : '#fff',
                  cursor: airFeatureElectricResistanceDots[0] ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Restrain Immunity */}
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
            <span></span>
            <span></span>
            {/* Row 2: Restrain Immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Restrain</i></b> <i>Immunity</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(airFeatureRestrainImmunityDots, setAirFeatureRestrainImmunityDots, 0, [5], 'airFeatureRestrainImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: airFeatureRestrainImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ color: '#000', fontWeight: 400, fontSize: '1em', marginBottom: '8px' }}>
              {generateWingsOfAirJSX(sheet)}
            </div>

            {/* Technique XP progression table - +1hx away */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
              {/* Row 2: +1hx away dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx away</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(airTechniqueRangeDots, setAirTechniqueRangeDots, idx, [4, 8, 11], 'airTechniqueRangeDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: airTechniqueRangeDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || airTechniqueRangeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Technique XP progression table - +1hx Speed */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
              {/* Row 2: +1hx Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(airTechniqueSpeedDots, setAirTechniqueSpeedDots, idx, [4, 8, 11], 'airTechniqueSpeedDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: airTechniqueSpeedDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || airTechniqueSpeedDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Technique XP progression table - -1 Cooldown */}
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
                    onClick={() => handleDotClick(airTechniqueCooldownDots, setAirTechniqueCooldownDots, idx, [4, 7], 'airTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: airTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || airTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
          </div>

          {/* Movement Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i>Enhanced <i style={{ color: '#38761d' }}>Movement</i> Effects.</i></b> +<b>[{airMovementSpeedDots.filter(Boolean).length}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b>{airMovementFlySpeedDots[0] ? <>. <b><i style={{ color: '#38761d' }}>Fly Speed</i></b></> : null}.
            </div>

            {/* Movement XP progression table - +1 Speed */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(airMovementSpeedDots, setAirMovementSpeedDots, idx, [4, 8, 12], 'airMovementSpeedDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: airMovementSpeedDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || airMovementSpeedDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Movement XP progression table - Gain a Fly Speed */}
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
              {/* Row 2: Gain a Fly Speed */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Gain a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(airMovementFlySpeedDots, setAirMovementFlySpeedDots, 0, [9], 'airMovementFlySpeedDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: airMovementFlySpeedDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            </div>
          </div>

          {/* Strike Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateAirStrikeJSX(sheet)}
            </div>

            {/* Strike XP progression table - +1 Damage die */}
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
              <span></span>
              <span></span>
              {/* Row 2: +1 Damage die */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Damage die</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(airStrikeDamageDots, setAirStrikeDamageDots, 0, [6], 'airStrikeDamageDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: airStrikeDamageDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            </div>

            {/* Strike XP progression table - +1 Strike */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>15xp</span>
              <span></span>
              {/* Row 2: +1 Strike dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#351c75' }}>Strike</i></b></span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(airStrikeMultiStrikeDots, setAirStrikeMultiStrikeDots, idx, [12, 15], 'airStrikeMultiStrikeDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: airStrikeMultiStrikeDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || airStrikeMultiStrikeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Strike XP progression table - Inflict Slam */}
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
              {/* Row 2: Inflict Slam */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Slam</i></b> 3hx</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(airStrikeInflictSlamDots, setAirStrikeInflictSlamDots, 0, [6], 'airStrikeInflictSlamDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: airStrikeInflictSlamDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
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
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11sp</span>
                {/* Row 2: Airbender */}
                <div style={{
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left', 
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#0ee2df', fontSize: '1em' }}>Airbender.</i></b> Your elemental companion enables you to manipulate the air itself, allowing you to push, pull and/or lift and levitate objects up to 20hx away and weighing up to 50lbs.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(airPerksSkillsDots, setAirPerksSkillsDots, 0, [11], 'airPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: airPerksSkillsDots[0] ? '#000' : '#fff',
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

      {/* Earth Subclass Card */}
      {subclass === 'Earth' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateEarthArmorJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table - Bludgeoning Immunity */}
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
            <span></span>
            <span></span>
            {/* Row 2: Bludgeoning Immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#8B4513', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Immunity</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(earthFeatureBludgeoningImmunityDots, setEarthFeatureBludgeoningImmunityDots, 0, [5], 'earthFeatureBludgeoningImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: earthFeatureBludgeoningImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Bludgeoning Absorption */}
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
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span></span>
            {/* Row 2: Bludgeoning Absorption */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#8B4513', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Absorption</i></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => {
                  if (!earthFeatureBludgeoningImmunityDots[0]) {
                    setNotice("Must purchase Bludgeoning Immunity first!");
                    return;
                  }
                  handleDotClick(earthFeatureBludgeoningAbsorptionDots, setEarthFeatureBludgeoningAbsorptionDots, 0, [8], 'earthFeatureBludgeoningAbsorptionDots');
                }}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: earthFeatureBludgeoningAbsorptionDots[0] ? '#000' : '#fff',
                  cursor: earthFeatureBludgeoningImmunityDots[0] ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Slashing Resistance */}
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
            <span></span>
            <span></span>
            {/* Row 2: Slashing Resistance */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Resistance</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(earthFeatureSlashingResistanceDots, setEarthFeatureSlashingResistanceDots, 0, [3], 'earthFeatureSlashingResistanceDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: earthFeatureSlashingResistanceDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Slashing Immunity */}
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
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span></span>
            {/* Row 2: Slashing Immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Immunity</i></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => {
                  if (!earthFeatureSlashingResistanceDots[0]) {
                    setNotice("Must purchase Slashing Resistance first!");
                    return;
                  }
                  handleDotClick(earthFeatureSlashingImmunityDots, setEarthFeatureSlashingImmunityDots, 0, [5], 'earthFeatureSlashingImmunityDots');
                }}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: earthFeatureSlashingImmunityDots[0] ? '#000' : '#fff',
                  cursor: earthFeatureSlashingResistanceDots[0] ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Slam Immunity */}
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
            <span></span>
            <span></span>
            {/* Row 2: Slam Immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Slam</i></b> <i>Immunity</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(earthFeatureSlamImmunityDots, setEarthFeatureSlamImmunityDots, 0, [5], 'earthFeatureSlamImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: earthFeatureSlamImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ color: '#000', fontWeight: 400, fontSize: '1em', marginBottom: '8px' }}>
              {generateEarthenWallJSX(sheet)}
            </div>

            {/* Technique XP progression table - +3hx-chain AoE */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
              {/* Row 2: +3hx-chain AoE dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+3hx-Chain <i>AoE</i></span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(earthTechniqueAoEDots, setEarthTechniqueAoEDots, idx, [4, 8, 11], 'earthTechniqueAoEDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: earthTechniqueAoEDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || earthTechniqueAoEDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Technique XP progression table - Inflict Bounce */}
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
              <span></span>
              <span></span>
              {/* Row 2: Inflict Bounce */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Bounce</i></b> 3hx in <i>AoE</i></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(earthTechniqueBounceDots, setEarthTechniqueBounceDots, 0, [7], 'earthTechniqueBounceDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: earthTechniqueBounceDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            </div>

            {/* Technique XP progression table - -1 Cooldown */}
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
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 <i>Cooldown</i></span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(earthTechniqueCooldownDots, setEarthTechniqueCooldownDots, idx, [4, 7], 'earthTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: earthTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || earthTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              {generateEarthStrikeJSX(sheet)}
            </div>

            {/* Strike XP progression table - +2 Damage dice */}
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
              {/* Row 2: +2 Damage dice dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2 Damage dice</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(earthStrikeDamageDots, setEarthStrikeDamageDots, idx, [6, 10, 18], 'earthStrikeDamageDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: earthStrikeDamageDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || earthStrikeDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Strike XP progression table - Inflict Restrain */}
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
              {/* Row 2: Inflict Restrain */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Restrain</i></b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(earthStrikeInflictRestrainDots, setEarthStrikeInflictRestrainDots, 0, [6], 'earthStrikeInflictRestrainDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: earthStrikeInflictRestrainDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            </div>
          </div>

          {/* Perks Section */}
          <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <i><b>Skills.</b> Survival</i> +2
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
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10sp</span>
                {/* Row 2: Earthmolder */}
                <div style={{
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left', 
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#e2b90e', fontSize: '1em' }}>Earthmolder.</i></b> Your elemental companion enables you to mold earth, clay and stone to your will, allowing you to create buildings, raise and lower the ground, and otherwise manipulate the earth within a 10hx radius in minutes.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(earthPerksSkillsDots, setEarthPerksSkillsDots, 0, [10], 'earthPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: earthPerksSkillsDots[0] ? '#000' : '#fff',
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

      {subclass === 'Fire' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateFireArmorJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table - Fire Immunity */}
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
            <span></span>
            <span></span>
            {/* Row 2: Fire Immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#e20e0e', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Immunity</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(fireFeatureFireImmunityDots, setFireFeatureFireImmunityDots, 0, [5], 'fireFeatureFireImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: fireFeatureFireImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Fire Absorption (prerequisite: Fire Immunity) */}
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
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span></span>
            {/* Row 2: Fire Absorption */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#e20e0e', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Absorption</i></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => {
                  if (!fireFeatureFireImmunityDots[0]) {
                    setNotice("Must purchase Fire Immunity first!");
                    return;
                  }
                  handleDotClick(fireFeatureFireAbsorptionDots, setFireFeatureFireAbsorptionDots, 0, [8], 'fireFeatureFireAbsorptionDots');
                }}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: fireFeatureFireAbsorptionDots[0] ? '#000' : '#fff',
                  cursor: fireFeatureFireImmunityDots[0] ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Chemical Resistance */}
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
            <span></span>
            <span></span>
            {/* Row 2: Chemical Resistance */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Resistance</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(fireFeatureChemicalResistanceDots, setFireFeatureChemicalResistanceDots, 0, [3], 'fireFeatureChemicalResistanceDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: fireFeatureChemicalResistanceDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Chemical Immunity (prerequisite: Chemical Resistance) */}
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
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span></span>
            {/* Row 2: Chemical Immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Immunity</i></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => {
                  if (!fireFeatureChemicalResistanceDots[0]) {
                    setNotice("Must purchase Chemical Resistance first!");
                    return;
                  }
                  handleDotClick(fireFeatureChemicalImmunityDots, setFireFeatureChemicalImmunityDots, 0, [5], 'fireFeatureChemicalImmunityDots');
                }}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: fireFeatureChemicalImmunityDots[0] ? '#000' : '#fff',
                  cursor: fireFeatureChemicalResistanceDots[0] ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Demoralize Immunity */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px 24px 24px',
            gridTemplateRows: 'repeat(2, auto)',
            columnGap: '6px',
            rowGap: '2px',
            alignItems: 'start',
            marginBottom: '12px',
            width: '100%',
            paddingLeft: '4px'
          }}>
            {/* Row 1: XP header */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span></span>
            <span></span>
            {/* Row 2: Demoralize Immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Demoralize</i></b> <i>Immunity</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(fireFeatureDemoralizeImmunityDots, setFireFeatureDemoralizeImmunityDots, 0, [5], 'fireFeatureDemoralizeImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: fireFeatureDemoralizeImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique Section */}
          <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateFirestormJSX(sheet)}
            </div>

            {/* Technique XP progression table - +1hx */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
              {/* Row 2: +1hx */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0, 1, 2].map(index => (
                <span key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(fireTechniqueHxDots, setFireTechniqueHxDots, index, [4, 8, 11], 'fireTechniqueHxDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: fireTechniqueHxDots[index] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Technique XP progression table - +1 instance of Spike (Fire) */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>15xp</span>
              {/* Row 2: +1 instance of Spike (Fire) */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 instance of <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#e20e0e', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b><b>)</b></span>
              {[0, 1, 2].map(index => (
                <span key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(fireTechniqueSpikeDots, setFireTechniqueSpikeDots, index, [5, 10, 15], 'fireTechniqueSpikeDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: fireTechniqueSpikeDots[index] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Technique XP progression table - -1 Cooldown */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '12px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span></span>
              {/* Row 2: -1 Cooldown */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0, 1].map(index => (
                <span key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(fireTechniqueCooldownDots, setFireTechniqueCooldownDots, index, [5, 8], 'fireTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: fireTechniqueCooldownDots[index] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
          </div>

          {/* Movement Section */}
          <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i>Enhanced <i style={{ color: '#38761d' }}>Movement</i> Effects.</i></b> +<b>[{fireMovementSpeedDots.filter(Boolean).length}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b>{airMovementFlySpeedDots[0] ? <>. <b><i style={{ color: '#38761d' }}>Fly Speed</i></b></> : null}.
            </div>

            {/* Movement XP progression table - +1 Speed */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '12px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              <span></span>
              {/* Row 2: +1 Speed */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0, 1].map(index => (
                <span key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(fireMovementSpeedDots, setFireMovementSpeedDots, index, [5, 10], 'fireMovementSpeedDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: fireMovementSpeedDots[index] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
          </div>

          {/* Strike Section */}
          <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateFireStrikeJSX(sheet)}
            </div>

            {/* Strike XP progression table - +1 Damage die */}
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
              <span></span>
              {/* Row 2: +1 Damage die */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Damage die</span>
              {[0, 1].map(index => (
                <span key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(fireStrikeDamageDots, setFireStrikeDamageDots, index, [6, 10], 'fireStrikeDamageDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: fireStrikeDamageDots[index] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Strike XP progression table - +1 Strike */}
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
              {/* Row 2: +1 Strike */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#351c75' }}>Strike</i></b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(fireStrikeExtraStrikeDots, setFireStrikeExtraStrikeDots, 0, [12], 'fireStrikeExtraStrikeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: fireStrikeExtraStrikeDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            </div>

            {/* Strike XP progression table - Inflict Spike (Fire) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '12px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Inflict Spike (Fire) */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#e20e0e', display: 'inline-flex', alignItems: 'center' }}>
      Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b><b>)</b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(fireStrikeInflictSpikeDots, setFireStrikeInflictSpikeDots, 0, [6], 'fireStrikeInflictSpikeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: fireStrikeInflictSpikeDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            </div>
          </div>

          {/* Perks Section */}
          <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <i><b>Skills.</b> Intimidation</i> +2
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
                {/* Row 2: Firestarter */}
                <div style={{
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left', 
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#e20e0e', fontSize: '1em' }}>Firestarter.</i></b> Your elemental companion allows you to start fires on even the most fire resistant materials and objects up to 20hx away.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(firePerksSkillsDots, setFirePerksSkillsDots, 0, [9], 'firePerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: firePerksSkillsDots[0] ? '#000' : '#fff',
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

      {subclass === 'Water' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateWaterArmorJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table - Cold Immunity */}
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
            <span></span>
            <span></span>
            {/* Row 2: Cold Immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Immunity</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(waterFeatureColdImmunityDots, setWaterFeatureColdImmunityDots, 0, [5], 'waterFeatureColdImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: waterFeatureColdImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Cold Absorption (prerequisite: Cold Immunity) */}
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
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span></span>
            {/* Row 2: Cold Absorption */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Absorption</i></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => {
                  if (!waterFeatureColdImmunityDots[0]) {
                    setNotice("Must purchase Cold Immunity first!");
                    return;
                  }
                  handleDotClick(waterFeatureColdAbsorptionDots, setWaterFeatureColdAbsorptionDots, 0, [8], 'waterFeatureColdAbsorptionDots');
                }}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: waterFeatureColdAbsorptionDots[0] ? '#000' : '#fff',
                  cursor: waterFeatureColdImmunityDots[0] ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Toxic Resistance */}
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
            <span></span>
            <span></span>
            {/* Row 2: Toxic Resistance */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Resistance</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(waterFeatureToxicResistanceDots, setWaterFeatureToxicResistanceDots, 0, [3], 'waterFeatureToxicResistanceDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: waterFeatureToxicResistanceDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Toxic Immunity (prerequisite: Toxic Resistance) */}
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
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span></span>
            {/* Row 2: Toxic Immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
            </u></b> <i>Immunity</i></span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => {
                  if (!waterFeatureToxicResistanceDots[0]) {
                    setNotice("Must purchase Toxic Resistance first!");
                    return;
                  }
                  handleDotClick(waterFeatureToxicImmunityDots, setWaterFeatureToxicImmunityDots, 0, [5], 'waterFeatureToxicImmunityDots');
                }}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: waterFeatureToxicImmunityDots[0] ? '#000' : '#fff',
                  cursor: waterFeatureToxicResistanceDots[0] ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Spike Immunity */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px 24px 24px',
            gridTemplateRows: 'repeat(2, auto)',
            columnGap: '6px',
            rowGap: '2px',
            alignItems: 'start',
            marginBottom: '12px',
            width: '100%',
            paddingLeft: '4px'
          }}>
            {/* Row 1: XP header */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span></span>
            <span></span>
            {/* Row 2: Spike Immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Spike</i></b> <i>Immunity</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(waterFeatureSpikeImmunityDots, setWaterFeatureSpikeImmunityDots, 0, [5], 'waterFeatureSpikeImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: waterFeatureSpikeImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique Section */}
          <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateCleansingWatersJSX(sheet)}
            </div>

            {/* Technique XP progression table - +1hx */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
              {/* Row 2: +1hx */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0, 1, 2].map(index => (
                <span key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(waterTechniqueHxDots, setWaterTechniqueHxDots, index, [4, 8, 11], 'waterTechniqueHxDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: waterTechniqueHxDots[index] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Technique XP progression table - +1d6 Hit Points */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
              {/* Row 2: +1d6 Hit Points */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0, 1, 2].map(index => (
                <span key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(waterTechniqueHpDots, setWaterTechniqueHpDots, index, [3, 7, 11], 'waterTechniqueHpDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: waterTechniqueHpDots[index] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Technique XP progression table - -1 Cooldown */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '12px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              <span></span>
              {/* Row 2: -1 Cooldown */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0, 1].map(index => (
                <span key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(waterTechniqueCooldownDots, setWaterTechniqueCooldownDots, index, [4, 7], 'waterTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: waterTechniqueCooldownDots[index] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
          </div>

          {/* Movement Section */}
          <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#38761d', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Movement</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i>Enhanced <i style={{ color: '#38761d' }}>Movement</i> Effects.</i></b> +<b>[{waterMovementSpeedDots.filter(Boolean).length}]</b>hx <b><i style={{ color: '#38761d' }}>Speed</i></b>{waterMovementSwimSpeedDots[0] ? <>. <b><i style={{ color: '#38761d' }}>Swim Speed</i></b></> : null}.
            </div>

            {/* Movement XP progression table - +1 Speed */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              <span></span>
              {/* Row 2: +1 Speed */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0, 1].map(index => (
                <span key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(waterMovementSpeedDots, setWaterMovementSpeedDots, index, [5, 10], 'waterMovementSpeedDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: waterMovementSpeedDots[index] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Movement XP progression table - Gain a Swim Speed */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginTop: '2px',
              marginBottom: '12px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Gain a Swim Speed */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Gain a <b><i style={{ color: '#38761d' }}>Swim Speed</i></b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(waterMovementSwimSpeedDots, setWaterMovementSwimSpeedDots, 0, [5], 'waterMovementSwimSpeedDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: waterMovementSwimSpeedDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            </div>
          </div>

          {/* Strike Section */}
          <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateWaterStrikeJSX(sheet)}
            </div>

            {/* Strike XP progression table - +1 Damage die */}
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
              <span></span>
              <span></span>
              {/* Row 2: +1 Damage die */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Damage die</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(waterStrikeDamageDots, setWaterStrikeDamageDots, 0, [6], 'waterStrikeDamageDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: waterStrikeDamageDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            </div>

            {/* Strike XP progression table - Inflict Demoralize */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '12px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Inflict Demoralize */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Demoralize</i></b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(waterStrikeInflictDemoralizeDots, setWaterStrikeInflictDemoralizeDots, 0, [6], 'waterStrikeInflictDemoralizeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: waterStrikeInflictDemoralizeDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            </div>
          </div>

          {/* Perks Section */}
          <div style={{ marginTop: '12px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <i><b>Skills.</b> Medicine</i> +2
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
                {/* Row 2: Waterweaver */}
                <div style={{
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left', 
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#0e42e2', fontSize: '1em' }}>Waterweaver.</i></b> Your elemental companion allows you to pull water out of all sources of moisture within 20hx and change them into any form that water can take (water, ice, steam).
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(waterPerksSkillsDots, setWaterPerksSkillsDots, 0, [9], 'waterPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: waterPerksSkillsDots[0] ? '#000' : '#fff',
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

export default LevelUpSubclassesElementalist;
