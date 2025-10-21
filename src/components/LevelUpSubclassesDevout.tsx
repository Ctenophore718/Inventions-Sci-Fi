import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateMartyrJSX } from "../utils/astralFeature";
import { generateBenefactionJSX } from "../utils/astralTechnique";
import { generateAstralStrikeJSX } from "../utils/astralStrike";
import { generateAggressionJSX } from "../utils/chaosFeature";
import { generateSavageryJSX } from "../utils/chaosTechnique";
import { generateChaosStrikeJSX } from "../utils/chaosStrike";
import { generateArmoredGuardJSX } from "../utils/orderFeature";
import { generateBulwarkJSX } from "../utils/orderTechnique";
import { generateOrderStrikeJSX } from "../utils/orderStrike";
import { generateFatigueJSX } from "../utils/voidFeature";
import { generateWeakenJSX } from "../utils/voidTechnique";
import { generateVoidStrikeJSX } from "../utils/voidStrike";

type LevelUpSubclassesDevoutProps = {
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

const LevelUpSubclassesDevout: React.FC<LevelUpSubclassesDevoutProps> = ({ 
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
  
  // Independent state for Astral dots
  const [astralFeatureRangeDots, setAstralFeatureRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.astralFeatureRangeDots || [false, false, false]
  );
  const [astralFeatureAllyDots, setAstralFeatureAllyDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.astralFeatureAllyDots || [false, false, false]
  );
  const [astralFeatureHitPointsDots, setAstralFeatureHitPointsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.astralFeatureHitPointsDots || [false, false, false]
  );
  const [astralTechniqueRangeDots, setAstralTechniqueRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.astralTechniqueRangeDots || [false, false, false]
  );
  const [astralTechniqueHitPointsDots, setAstralTechniqueHitPointsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.astralTechniqueHitPointsDots || [false, false, false]
  );
  const [astralTechniqueExceedMaxDots, setAstralTechniqueExceedMaxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.astralTechniqueExceedMaxDots || [false]
  );
  const [astralTechniqueRemoveConditionsDots, setAstralTechniqueRemoveConditionsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.astralTechniqueRemoveConditionsDots || [false]
  );
  const [astralTechniqueSpeedDots, setAstralTechniqueSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.astralTechniqueSpeedDots || [false, false]
  );
  const [astralTechniqueCooldownDots, setAstralTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.astralTechniqueCooldownDots || [false, false]
  );
  const [astralHitPointsDots, setAstralHitPointsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.astralHitPointsDots || [false, false, false]
  );
  const [astralStrikeDamageDots, setAstralStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.astralStrikeDamageDots || [false, false, false]
  );
  const [astralPerksSkillsDots, setAstralPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.astralPerksSkillsDots || [false]
  );

  // Independent state for Chaos dots
  const [chaosFeatureMoveDots, setChaosFeatureMoveDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.chaosFeatureMoveDots || [false, false, false]
  );
  const [chaosTechniqueInflictSpikeDots, setChaosTechniqueInflictSpikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.chaosTechniqueInflictSpikeDots || [false]
  );
  const [chaosTechniqueInflictDemorizeDots, setChaosTechniqueInflictDemorizeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.chaosTechniqueInflictDemorizeDots || [false]
  );
  const [chaosTechniqueTripleDamageDots, setChaosTechniqueTripleDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.chaosTechniqueTripleDamageDots || [false]
  );
  const [chaosTechniqueCooldownDots, setChaosTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.chaosTechniqueCooldownDots || [false, false]
  );
  const [chaosHitPointsDots, setChaosHitPointsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.chaosHitPointsDots || [false, false]
  );
  const [chaosStrikeDamageDots, setChaosStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.chaosStrikeDamageDots || [false, false, false]
  );
  const [chaosStrikeMultiStrikeDots, setChaosStrikeMultiStrikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.chaosStrikeMultiStrikeDots || [false]
  );
  const [chaosPerksSkillsDots, setChaosPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.chaosPerksSkillsDots || [false]
  );

  // Independent state for Order dots
  const [orderFeatureRangeDots, setOrderFeatureRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.orderFeatureRangeDots || [false, false, false]
  );
  const [orderFeatureResistDots, setOrderFeatureResistDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.orderFeatureResistDots || [false]
  );
  const [orderFeatureReflectDots, setOrderFeatureReflectDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.orderFeatureReflectDots || [false]
  );
  const [orderTechniqueRangeDots, setOrderTechniqueRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.orderTechniqueRangeDots || [false, false, false]
  );
  const [orderTechniqueSlamImmunityDots, setOrderTechniqueSlamImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.orderTechniqueSlamImmunityDots || [false]
  );
  const [orderTechniqueBounceImmunityDots, setOrderTechniqueBounceImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.orderTechniqueBounceImmunityDots || [false]
  );
  const [orderTechnique100CoverDots, setOrderTechnique100CoverDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.orderTechnique100CoverDots || [false]
  );
  const [orderTechniqueCooldownDots, setOrderTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.orderTechniqueCooldownDots || [false, false]
  );
  const [orderHitPointsDots, setOrderHitPointsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.orderHitPointsDots || [false, false, false]
  );
  const [orderStrikeDamageDots, setOrderStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.orderStrikeDamageDots || [false, false, false]
  );
  const [orderPerksSkillsDots, setOrderPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.orderPerksSkillsDots || [false]
  );

  // Independent state for Void dots
  const [voidFeatureRangeDots, setVoidFeatureRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.voidFeatureRangeDots || [false, false, false]
  );
  const [voidTechniqueRangeDots, setVoidTechniqueRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.voidTechniqueRangeDots || [false, false, false]
  );
  const [voidTechniqueHalveSpeedDots, setVoidTechniqueHalveSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.voidTechniqueHalveSpeedDots || [false]
  );
  const [voidTechniqueInflictDrainDots, setVoidTechniqueInflictDrainDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.voidTechniqueInflictDrainDots || [false]
  );
  const [voidTechniqueCooldownDots, setVoidTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.voidTechniqueCooldownDots || [false, false]
  );
  const [voidHitPointsDots, setVoidHitPointsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.voidHitPointsDots || [false, false]
  );
  const [voidStrikeDamageDots, setVoidStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.voidStrikeDamageDots || [false, false, false]
  );
  const [voidStrikeInflictDrainDots, setVoidStrikeInflictDrainDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.voidStrikeInflictDrainDots || [false]
  );
  const [voidPerksSkillsDots, setVoidPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.voidPerksSkillsDots || [false]
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
        
        if (dotType === 'astralHitPointsDots' || dotType === 'chaosHitPointsDots' || dotType === 'orderHitPointsDots' || dotType === 'voidHitPointsDots') {
          const hpBonus = newArray.filter(Boolean).length * 10;
          const currentMaxHP = sheet?.maxHitPoints || 0;
          const oldHpBonus = currentArray.filter(Boolean).length * 10;
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
      
      {subclass === 'Astral' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateMartyrJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table - First row: +1hx */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
            {/* Row 2: +1hx dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(astralFeatureRangeDots, setAstralFeatureRangeDots, idx, [5, 8, 12], 'astralFeatureRangeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: astralFeatureRangeDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || astralFeatureRangeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Feature XP progression table - Second row: +1 ally */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>20xp</span>
            {/* Row 2: +1 ally dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 ally</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(astralFeatureAllyDots, setAstralFeatureAllyDots, idx, [12, 15, 20], 'astralFeatureAllyDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: astralFeatureAllyDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || astralFeatureAllyDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Feature XP progression table - Third row: +1d6 Hit Points */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
            {/* Row 2: +1d6 Hit Points dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(astralFeatureHitPointsDots, setAstralFeatureHitPointsDots, idx, [5, 8, 12], 'astralFeatureHitPointsDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: astralFeatureHitPointsDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || astralFeatureHitPointsDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              {generateBenefactionJSX(sheet)}
            </div>

            {/* Technique XP progression table - First row: +1hx */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
              {/* Row 2: +1hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(astralTechniqueRangeDots, setAstralTechniqueRangeDots, idx, [5, 8, 12], 'astralTechniqueRangeDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: astralTechniqueRangeDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || astralTechniqueRangeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Technique XP progression table - Second row: +2d6 Hit Points */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>15xp</span>
              {/* Row 2: +2d6 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(astralTechniqueHitPointsDots, setAstralTechniqueHitPointsDots, idx, [5, 10, 15], 'astralTechniqueHitPointsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: astralTechniqueHitPointsDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || astralTechniqueHitPointsDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Technique XP progression table - Third row: Can exceed Hit Point max */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Can exceed Hit Point max dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Can exceed <b><i style={{ color: '#990000' }}>Hit Point</i></b> max</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(astralTechniqueExceedMaxDots, setAstralTechniqueExceedMaxDots, 0, [10], 'astralTechniqueExceedMaxDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: astralTechniqueExceedMaxDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
            </div>

            {/* Technique XP progression table - Fourth row: Remove all conditions */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Remove all conditions dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Remove all conditions</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(astralTechniqueRemoveConditionsDots, setAstralTechniqueRemoveConditionsDots, 0, [10], 'astralTechniqueRemoveConditionsDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: astralTechniqueRemoveConditionsDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
            </div>

            {/* Technique XP progression table - Fifth row: +1 Speed */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
              <span></span>
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#38761d' }}>Speed</i></b></span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(astralTechniqueSpeedDots, setAstralTechniqueSpeedDots, idx, [8, 11], 'astralTechniqueSpeedDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: astralTechniqueSpeedDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || astralTechniqueSpeedDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>

            {/* Technique XP progression table - Sixth row: -1 Cooldown */}
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
                    onClick={() => handleDotClick(astralTechniqueCooldownDots, setAstralTechniqueCooldownDots, idx, [4, 7], 'astralTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: astralTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || astralTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              <b><i>Extra</i> <i style={{ color: '#990000' }}>Hit Points.</i></b> +<b>[{astralHitPointsDots.filter(Boolean).length * 10}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>22xp</span>
              {/* Row 2: +10 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(astralHitPointsDots, setAstralHitPointsDots, idx, [7, 12, 22], 'astralHitPointsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: astralHitPointsDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || astralHitPointsDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              {generateAstralStrikeJSX(sheet)}
            </div>

            {/* Strike XP progression table */}
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
                    onClick={() => handleDotClick(astralStrikeDamageDots, setAstralStrikeDamageDots, idx, [6, 10, 18], 'astralStrikeDamageDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: astralStrikeDamageDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || astralStrikeDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
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
                {/* Row 2: Uplifting Presence */}
                <div style={{
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left', 
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#5bb1af', fontSize: '1em' }}>Uplifting Presence.</i></b> Your connection to a divine benevolence practically makes you glow with an otherworldly charisma. Gain an advantage on social-based skill rolls when speaking kindly, honorably, or otherwise in sincere goodness.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(astralPerksSkillsDots, setAstralPerksSkillsDots, 0, [9], 'astralPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: astralPerksSkillsDots[0] ? '#000' : '#fff',
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

      {subclass === 'Chaos' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateAggressionJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table - +1hx Move */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
            {/* Row 2: +1hx dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(chaosFeatureMoveDots, setChaosFeatureMoveDots, idx, [5, 8, 12], 'chaosFeatureMoveDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: chaosFeatureMoveDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || chaosFeatureMoveDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Technique Section */}
          <div style={{ fontWeight: 'bold', color: '#bf9000', marginTop: '16px', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <u>Technique</u>
          </div>
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            {generateSavageryJSX(sheet)}
          </div>

          {/* Technique XP progression table - Inflict Spike */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
            {/* Row 2: Inflict Spike */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Spike</i></b> <b>(</b><span style={{ color: '#808080', textDecoration: 'underline', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></span><b>)</b></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(chaosTechniqueInflictSpikeDots, setChaosTechniqueInflictSpikeDots, 0, [10], 'chaosTechniqueInflictSpikeDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: chaosTechniqueInflictSpikeDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique XP progression table - Inflict Demoralize */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            {/* Row 2: Inflict Demoralize */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Demoralize</i></b></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(chaosTechniqueInflictDemorizeDots, setChaosTechniqueInflictDemorizeDots, 0, [8], 'chaosTechniqueInflictDemorizeDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: chaosTechniqueInflictDemorizeDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique XP progression table - Triple Strike Damage */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>17xp</span>
            {/* Row 2: Triple Strike Damage */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Triple <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(chaosTechniqueTripleDamageDots, setChaosTechniqueTripleDamageDots, 0, [17], 'chaosTechniqueTripleDamageDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: chaosTechniqueTripleDamageDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique XP progression table - Cooldown */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px 24px',
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            {/* Row 2: -1 Cooldown dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
            {[0,1].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(chaosTechniqueCooldownDots, setChaosTechniqueCooldownDots, idx, [5, 8], 'chaosTechniqueCooldownDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: chaosTechniqueCooldownDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || chaosTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Hit Points Section */}
          <div style={{ fontWeight: 'bold', color: '#990000', marginTop: '16px', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <u>Hit Points</u>
          </div>
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
          <b><i>Extra</i> <i style={{ color: '#990000' }}>Hit Points.</i></b> +<b>[{chaosHitPointsDots.filter(Boolean).length * 10}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b>.

          </div>

          {/* Hit Points XP progression table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px 24px',
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
            {/* Row 2: +10 Hit Points dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
            {[0,1].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(chaosHitPointsDots, setChaosHitPointsDots, idx, [7, 9], 'chaosHitPointsDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: chaosHitPointsDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || chaosHitPointsDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Strike Section */}
          <div style={{ fontWeight: 'bold', color: '#351c75', marginTop: '16px', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <u>Strike</u>
          </div>
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i> <i>Damage</i>.</b> {generateChaosStrikeJSX(sheet)}
          </div>

          {/* Strike XP progression table - Damage dice */}
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
                  onClick={() => handleDotClick(chaosStrikeDamageDots, setChaosStrikeDamageDots, idx, [6, 10, 18], 'chaosStrikeDamageDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: chaosStrikeDamageDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || chaosStrikeDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Strike XP progression table - Multi Strike */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
            {/* Row 2: +1 Strike */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#351c75' }}>Strike</i></b></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(chaosStrikeMultiStrikeDots, setChaosStrikeMultiStrikeDots, 0, [12], 'chaosStrikeMultiStrikeDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: chaosStrikeMultiStrikeDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Perks Section */}
          <div style={{ fontWeight: 'bold', color: '#000', marginTop: '16px', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <u>Perks</u>
          </div>
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <b><i>Skills.</i></b> <i>Intimidation</i> +2
          </div>

          {/* Perks SP progression table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px',
            gridTemplateRows: 'repeat(2, auto)',
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
            {/* Row 2: Impulsive Intuition */}
            <div style={{
              fontSize: '1em', 
              fontFamily: 'Arial, Helvetica, sans-serif', 
              textAlign: 'left', 
              paddingRight: '8px',
              maxWidth: '500px',
              overflowWrap: 'break-word',
              wordWrap: 'break-word'
            }}>
              <b><i style={{ color: '#b15b6c', fontSize: '1em' }}>Impulsive Intuition.</i></b> You are adept at leaping before looking when the stakes are high, and you tend to do well in chaotic situations both physical and social. Gain an advantage on any related skill roll.
            </div>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleSpDotClick(chaosPerksSkillsDots, setChaosPerksSkillsDots, 0, [9], 'chaosPerksSkillsDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: chaosPerksSkillsDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>
        </div>
      )}

      {subclass === 'Order' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateArmoredGuardJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table - +1hx range */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
            {/* Row 2: +1hx dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(orderFeatureRangeDots, setOrderFeatureRangeDots, idx, [4, 7, 11], 'orderFeatureRangeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: orderFeatureRangeDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || orderFeatureRangeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Feature XP progression table - Resist all Damage */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>22xp</span>
            <span></span>
            <span></span>
            {/* Row 2: Resist all Damage */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><i>Resist</i> all Damage</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(orderFeatureResistDots, setOrderFeatureResistDots, 0, [22], 'orderFeatureResistDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: orderFeatureResistDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Feature XP progression table - Reflect half Damage (prerequisite: Resist) */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>40xp</span>
            <span></span>
            {/* Row 2: Reflect half Damage */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Reflect half Damage</span>
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>⤷</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => {
                  if (!orderFeatureResistDots[0]) {
                    setNotice("Must purchase Resist all Damage first!");
                    return;
                  }
                  handleDotClick(orderFeatureReflectDots, setOrderFeatureReflectDots, 0, [40], 'orderFeatureReflectDots');
                }}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: orderFeatureReflectDots[0] ? '#000' : '#fff',
                  cursor: orderFeatureResistDots[0] ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique Section */}
          <div style={{ fontWeight: 'bold', color: '#bf9000', marginTop: '16px', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <u>Technique</u>
          </div>
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            {generateBulwarkJSX(sheet)}
          </div>

          {/* Technique XP progression table - +1hx range */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
            {/* Row 2: +1hx dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(orderTechniqueRangeDots, setOrderTechniqueRangeDots, idx, [5, 8, 12], 'orderTechniqueRangeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: orderTechniqueRangeDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || orderTechniqueRangeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Technique XP progression table - Slam immunity */}
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
            {/* Row 2: Slam immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Slam</i></b> <i>Immunity</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(orderTechniqueSlamImmunityDots, setOrderTechniqueSlamImmunityDots, 0, [5], 'orderTechniqueSlamImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: orderTechniqueSlamImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique XP progression table - Bounce immunity */}
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
            {/* Row 2: Bounce immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><b><i>Bounce</i></b> <i>Immunity</i></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(orderTechniqueBounceImmunityDots, setOrderTechniqueBounceImmunityDots, 0, [5], 'orderTechniqueBounceImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: orderTechniqueBounceImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique XP progression table - 100% Cover */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>17xp</span>
            <span></span>
            <span></span>
            {/* Row 2: 100% Cover */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>100% Cover</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(orderTechnique100CoverDots, setOrderTechnique100CoverDots, 0, [17], 'orderTechnique100CoverDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: orderTechnique100CoverDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique XP progression table - Cooldown */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
            <span></span>
            {/* Row 2: -1 Cooldown dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
            {[0,1].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(orderTechniqueCooldownDots, setOrderTechniqueCooldownDots, idx, [4, 7], 'orderTechniqueCooldownDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: orderTechniqueCooldownDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || orderTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Hit Points Section */}
          <div style={{ fontWeight: 'bold', color: '#990000', marginTop: '16px', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <u>Hit Points</u>
          </div>
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <b><i>Extra</i> <i style={{ color: '#990000' }}>Hit Points.</i></b> +<b>[{orderHitPointsDots.filter(Boolean).length * 10}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>20xp</span>
            {/* Row 2: +10 Hit Points dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(orderHitPointsDots, setOrderHitPointsDots, idx, [6, 11, 20], 'orderHitPointsDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: orderHitPointsDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || orderHitPointsDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Strike Section */}
          <div style={{ fontWeight: 'bold', color: '#351c75', marginTop: '16px', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <u>Strike</u>
          </div>
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i></b> Damage. {generateOrderStrikeJSX(sheet)}
          </div>

          {/* Strike XP progression table - Damage dice */}
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
                  onClick={() => handleDotClick(orderStrikeDamageDots, setOrderStrikeDamageDots, idx, [6, 10, 18], 'orderStrikeDamageDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: orderStrikeDamageDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || orderStrikeDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Perks Section */}
          <div style={{ fontWeight: 'bold', color: '#000', marginTop: '16px', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <u>Perks</u>
          </div>
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <i><b>Skills.</b> Culture</i> +2
          </div>

          {/* Perks SP progression table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px',
            gridTemplateRows: 'repeat(2, auto)',
            columnGap: '6px',
            rowGap: '2px',
            alignItems: 'start',
            marginTop: '-12px',
            width: '100%',
            paddingLeft: '4px'
          }}>
            {/* Row 1: SP header */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7sp</span>
            {/* Row 2: Law of the Land */}
            <div style={{
              fontSize: '1em', 
              fontFamily: 'Arial, Helvetica, sans-serif', 
              textAlign: 'left', 
              paddingRight: '8px',
              maxWidth: '500px',
              overflowWrap: 'break-word',
              wordWrap: 'break-word'
            }}>
              <b><i style={{ color: '#aeb15b', fontSize: '1em' }}>Law of the Land.</i></b> You have a preternatural sense of law and order within any community you encounter and intuitively know the societal rules that govern them. Gain an advantage on any related skill roll.
            </div>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleSpDotClick(orderPerksSkillsDots, setOrderPerksSkillsDots, 0, [7], 'orderPerksSkillsDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: orderPerksSkillsDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>
        </div>
      )}

      {subclass === 'Void' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateFatigueJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table - +2hx range */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
            {/* Row 2: +2hx dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2hx</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(voidFeatureRangeDots, setVoidFeatureRangeDots, idx, [5, 8, 12], 'voidFeatureRangeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: voidFeatureRangeDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || voidFeatureRangeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Technique Section */}
          <div style={{ fontWeight: 'bold', color: '#bf9000', marginTop: '16px', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <u>Technique</u>
          </div>
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            {generateWeakenJSX(sheet)}
          </div>

          {/* Technique XP progression table - +1hx range */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
            {/* Row 2: +1hx dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(voidTechniqueRangeDots, setVoidTechniqueRangeDots, idx, [5, 8, 12], 'voidTechniqueRangeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: voidTechniqueRangeDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || voidTechniqueRangeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Technique XP progression table - Halve enemy Speed */}
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
            {/* Row 2: Halve enemy Speed */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Halve enemy <b><i style={{ color: '#38761d', fontSize: '1em' }}>Speed</i></b></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(voidTechniqueHalveSpeedDots, setVoidTechniqueHalveSpeedDots, 0, [5], 'voidTechniqueHalveSpeedDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: voidTechniqueHalveSpeedDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique XP progression table - Inflict Drain */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
            <span></span>
            <span></span>
            {/* Row 2: Inflict Drain */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Drain</i></b></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(voidTechniqueInflictDrainDots, setVoidTechniqueInflictDrainDots, 0, [10], 'voidTechniqueInflictDrainDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: voidTechniqueInflictDrainDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Technique XP progression table - Cooldown */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
            <span></span>
            {/* Row 2: -1 Cooldown dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
            {[0,1].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(voidTechniqueCooldownDots, setVoidTechniqueCooldownDots, idx, [4, 7], 'voidTechniqueCooldownDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: voidTechniqueCooldownDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || voidTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Hit Points Section */}
          <div style={{ fontWeight: 'bold', color: '#990000', marginTop: '16px', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <u>Hit Points</u>
          </div>
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <b><i>Extra</i> <i style={{ color: '#990000' }}>Hit Points.</i></b> +<b>[{voidHitPointsDots.filter(Boolean).length * 10}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b>.
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
            <span></span>
            {/* Row 2: +10 Hit Points dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+10 <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
            {[0,1].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(voidHitPointsDots, setVoidHitPointsDots, idx, [7, 12], 'voidHitPointsDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: voidHitPointsDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || voidHitPointsDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Strike Section */}
          <div style={{ fontWeight: 'bold', color: '#351c75', marginTop: '16px', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <u>Strike</u>
          </div>
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i></b> Damage. {generateVoidStrikeJSX(sheet)}
          </div>

          {/* Strike XP progression table - Damage dice */}
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
                  onClick={() => handleDotClick(voidStrikeDamageDots, setVoidStrikeDamageDots, idx, [6, 10, 18], 'voidStrikeDamageDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: voidStrikeDamageDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || voidStrikeDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Strike XP progression table - Inflict Drain */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
            <span></span>
            <span></span>
            {/* Row 2: Inflict Drain */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Drain</i></b></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(voidStrikeInflictDrainDots, setVoidStrikeInflictDrainDots, 0, [10], 'voidStrikeInflictDrainDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: voidStrikeInflictDrainDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
          </div>

          {/* Perks Section */}
          <div style={{ fontWeight: 'bold', color: '#0b5394', marginTop: '16px', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <u>Perks</u>
          </div>
          <div style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <i><b>Skills.</b> Stealth</i> +2
          </div>

          {/* Perks SP progression table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24px',
            gridTemplateRows: 'repeat(2, auto)',
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
            {/* Row 2: Spine-Chiller */}
            <div style={{
              fontSize: '1em', 
              fontFamily: 'Arial, Helvetica, sans-serif', 
              textAlign: 'left', 
              paddingRight: '8px',
              maxWidth: '500px',
              overflowWrap: 'break-word',
              wordWrap: 'break-word'
            }}>
              <b><i style={{ color: '#5b73b1', fontSize: '1em' }}>Spine-Chiller.</i></b> Your vibe is just downright creepy, and your connection to the Void realm influences others in an imperceptible and emotional way. Gain an advantage on social-based skill rolls when scaring, intimidating or otherwise unnerving others.
            </div>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleSpDotClick(voidPerksSkillsDots, setVoidPerksSkillsDots, 0, [9], 'voidPerksSkillsDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: voidPerksSkillsDots[0] ? '#000' : '#fff',
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

export default LevelUpSubclassesDevout;
