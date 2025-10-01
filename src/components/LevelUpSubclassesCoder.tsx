import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateFieldOfCoercionJSX } from "../utils/coerciveFeature";
import { generateEnemiesOnAllSidesJSX } from "../utils/coerciveTechnique";

type LevelUpSubclassesCoderProps = {
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

const LevelUpSubclassesCoder: React.FC<LevelUpSubclassesCoderProps> = ({ 
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
  
  // Independent state for Coercive dots
  const [coerciveFeatureDots, setCoerciveFeatureDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.coerciveFeatureDots || [false, false, false]
  );
  const [coerciveFeatureAllyAttackDots, setCoerciveFeatureAllyAttackDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.coerciveFeatureAllyAttackDots || [false]
  );
  const [coerciveTechniqueDots, setCoerciveTechniqueDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.coerciveTechniqueDots || [false, false, false]
  );
  const [coerciveTechniqueCreatureDots, setCoerciveTechniqueCreatureDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.coerciveTechniqueCreatureDots || [false, false]
  );
  const [coerciveTechniqueCooldownDots, setCoerciveTechniqueCooldownDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.coerciveTechniqueCooldownDots || [false, false]
  );
  const [coerciveStrikeMesmerizeDots, setCoerciveStrikeMesmerizeDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.coerciveStrikeMesmerizeDots || [false]
  );
  const [coercivePerksSkillsDots, setCoercivePerksSkillsDots] = useState<boolean[]>(
    sheet?.subclassProgressionDots?.coercivePerksSkillsDots || [false]
  );
  
  // Independent state for Divinist dots
  const [divinistFeatureDots, setDivinistFeatureDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.divinistFeatureDots || [false, false, false]
  );
  const [divinistFeatureCritDots, setDivinistFeatureCritDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.divinistFeatureCritDots || [false, false, false]
  );
  const [divinistFeatureRangeDots, setDivinistFeatureRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.divinistFeatureRangeDots || [false, false, false]
  );
  const [divinistTechniqueDots, setDivinistTechniqueDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.divinistTechniqueDots || [false, false, false]
  );
  const [divinistTechniqueCoverDots, setDivinistTechniqueCoverDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.divinistTechniqueCoverDots || [false]
  );
  const [divinistTechniqueCooldownDots, setDivinistTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.divinistTechniqueCooldownDots || [false, false]
  );
  const [divinistStrikeCritDots, setDivinistStrikeCritDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.divinistStrikeCritDots || [false]
  );
  const [divinistPerksSkillsDots, setDivinistPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.divinistPerksSkillsDots || [false]
  );

  // Helper function to handle XP dot clicking with sequential requirement
  const handleDotClick = (
    currentArray: boolean[], 
    setArray: React.Dispatch<React.SetStateAction<boolean[]>>, 
    index: number, 
    xpCosts: number[],
    fieldName: string
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
      
      setArray(newArray);
      setXpSpent(Math.max(0, newXpSpent));
      
      // Auto-save the updated progression dots
      if (sheet && onAutoSave) {
        const updatedSubclassProgressionDots = {
          ...sheet.subclassProgressionDots,
          [fieldName]: newArray
        };
        const fieldUpdates = {
          subclassProgressionDots: updatedSubclassProgressionDots,
          xpSpent: Math.max(0, newXpSpent)
        };
        onAutoSave(fieldUpdates);
      }
    }
  };

  // Helper function to handle SP dots
  const handleSpDotClick = (
    currentArray: boolean[], 
    setArray: React.Dispatch<React.SetStateAction<boolean[]>>, 
    index: number, 
    spCosts: number[],
    fieldName: string
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
    
    // Enforce SP cannot exceed total
    const newSpSpent = spSpent + spDelta;
    if (newSpSpent > spTotal) {
      setNotice("Not enough sp!");
      return;
    }
    
    setArray(newArray);
    setSpSpent(Math.max(0, newSpSpent));
    
    // Auto-save the updated progression dots
    if (sheet && onAutoSave) {
      const updatedSubclassProgressionDots = {
        ...sheet.subclassProgressionDots,
        [fieldName]: newArray
      };
      const fieldUpdates = {
        subclassProgressionDots: updatedSubclassProgressionDots,
        spSpent: Math.max(0, newSpSpent)
      };
      onAutoSave(fieldUpdates);
    }
  };

  
  return (
    <div style={{ width: '100%', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      
      {subclass === 'Coercive' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateFieldOfCoercionJSX(sheet)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table */}
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
            {/* Row 2: +1hx dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(coerciveFeatureDots, setCoerciveFeatureDots, idx, [5, 8, 12], 'coerciveFeatureDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: coerciveFeatureDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || coerciveFeatureDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}

            {/* Row 3: XP header (20xp) */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>20xp</span>
            <span></span>
            <span></span>
            {/* Row 4: Allies' Attacks inflict Mesmerize */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Allies' <b><i style={{ color: '#990000', fontSize: '1em' }}>Attacks</i></b> inflict <b><i>Mesmerize</i></b></span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span
                onClick={() => handleDotClick(coerciveFeatureAllyAttackDots, setCoerciveFeatureAllyAttackDots, 0, [20], 'coerciveFeatureAllyAttackDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: coerciveFeatureAllyAttackDots[0] ? '#000' : '#fff',
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
              {generateEnemiesOnAllSidesJSX(sheet)}
            </div>

            {/* Technique XP progression table */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              {/* Row 2: +1hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(coerciveTechniqueDots, setCoerciveTechniqueDots, idx, [4, 7, 10], 'coerciveTechniqueDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: coerciveTechniqueDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || coerciveTechniqueDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}

              {/* Row 3: XP header (10xp, 15xp) */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>15xp</span>
              <span></span>
              {/* Row 4: +1 creature dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 creature</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(coerciveTechniqueCreatureDots, setCoerciveTechniqueCreatureDots, idx, [10, 15], 'coerciveTechniqueCreatureDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: coerciveTechniqueCreatureDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || coerciveTechniqueCreatureDots[0]) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>

              {/* Row 5: XP header (3xp, 5xp) */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span></span>
              {/* Row 6: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(coerciveTechniqueCooldownDots, setCoerciveTechniqueCooldownDots, idx, [3, 5], 'coerciveTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: coerciveTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || coerciveTechniqueCooldownDots[0]) ? 'pointer' : 'not-allowed',
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
              <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike Damage.</i></b> 1d6 <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
              Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
              </u></b>{coerciveStrikeMesmerizeDots[0] ? <>, <b><i>Mesmerize</i></b></> : ''}.
            </div>
            
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
              {/* Row 2: Mesmerize dot */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}><i><b>Mesmerize</b></i></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(coerciveStrikeMesmerizeDots, setCoerciveStrikeMesmerizeDots, 0, [6], 'coerciveStrikeMesmerizeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: coerciveStrikeMesmerizeDots[0] ? '#000' : '#fff',
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
              <i><b>Skills.</b> Deception</i> +2
            </div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
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
                {/* Row 1: Empty cells and 11sp header */}
                <span></span>
                <span></span>
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11sp</span>
                {/* Row 2: Mind Reader text and dot */}
                <div style={{ 
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left',
                  paddingRight: '8px',
                  lineHeight: '1.2',
                  gridColumn: '1 / 4'
                }}>
                  <b><i style={{ color: '#43c9ff', fontSize: '1em' }}>Mind Reader.</i></b> You are capable of reaching into the minds of other creatures and gleaning information around their thoughts, drives and premeditated actions. Gain an advantage on skill rolls when attempting to read minds. The DM determines how much info is divulged.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(coercivePerksSkillsDots, setCoercivePerksSkillsDots, 0, [11], 'coercivePerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: coercivePerksSkillsDots[0] ? '#000' : '#fff',
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

      {subclass === 'Divinist' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                <b><i style={{ color: '#43c9ff', fontSize: '1em' }}>Aura of Luck.</i></b> You and allies within <u><b>3</b></u>hx of you can roll an additional <span style={{ color: '#990000', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>Crit<img src="/Crit.png" alt="Crit" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></span> die and drop the lowest roll when making <span style={{ color: '#990000' }}><b><i>Attacks</i></b></span>.
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
            marginBottom: '8px',
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
                  onClick={() => handleDotClick(divinistFeatureDots, setDivinistFeatureDots, idx, [5, 8, 12], 'divinistFeatureDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: divinistFeatureDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || divinistFeatureDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
            marginBottom: '8px',
            width: '100%',
            paddingLeft: '4px'
          }}>
            {/* Row 1: XP header */}
            <span></span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
            {/* Row 2: +1 Crit die dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <span style={{ color: '#990000', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>Crit<img src="/Crit.png" alt="Crit" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></span> die</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(divinistFeatureCritDots, setDivinistFeatureCritDots, idx, [5, 8, 12], 'divinistFeatureCritDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: divinistFeatureCritDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || divinistFeatureCritDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
          </div>

          {/* Feature XP progression table - Third row */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
            {/* Row 2: +1hx Attack Range dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> Range</span>
            {[0,1,2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(divinistFeatureRangeDots, setDivinistFeatureRangeDots, idx, [4, 6, 8], 'divinistFeatureRangeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: divinistFeatureRangeDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || divinistFeatureRangeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              <b><i style={{ color: '#bf9000', fontSize: '1em' }}>Fate Reader</i></b> (Cooldown <u><b>4</b></u>). Until the start of the next round, whenever a creature within <u><b>5</b></u>hx of you rolls a <span style={{ color: '#7030a0', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>Cover<img src="/Cover.png" alt="Cover" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></span> die, they roll an additional die and you choose which one to drop.
            </div>

            {/* Technique XP progression table - First row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '8px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              {/* Row 2: +1hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0,1,2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(divinistTechniqueDots, setDivinistTechniqueDots, idx, [4, 7, 10], 'divinistTechniqueDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: divinistTechniqueDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || divinistTechniqueDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              marginBottom: '8px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              <span></span>
              <span></span>
              {/* Row 2: +1 Cover die, drop another */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <span style={{ color: '#7030a0', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>Cover<img src="/Cover.png" alt="Cover" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></span> die, drop another</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(divinistTechniqueCoverDots, setDivinistTechniqueCoverDots, 0, [7], 'divinistTechniqueCoverDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: divinistTechniqueCoverDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
            </div>

            {/* Technique XP progression table - Third row */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span></span>
              {/* Row 2: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0,1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(divinistTechniqueCooldownDots, setDivinistTechniqueCooldownDots, idx, [3, 5], 'divinistTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: divinistTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || divinistTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><u>Strike Damage</u></b>. 1d6 <span style={{ color: '#a929ff', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>Neural<img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></span>.
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span></span>
              <span></span>
              {/* Row 2: +2 Crit on next Attack */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2 <span style={{ color: '#990000', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>Crit<img src="/Crit.png" alt="Crit" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></span> on next <span style={{ color: '#990000' }}><b><i>Attack</i></b></span></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(divinistStrikeCritDots, setDivinistStrikeCritDots, 0, [4], 'divinistStrikeCritDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: divinistStrikeCritDots[0] ? '#000' : '#fff',
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
              <i><b>Skills.</b> Investigation</i> +2
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
                {/* Row 2: Sooth Seer */}
                <div style={{
                  fontSize: '1em', 
                  fontFamily: 'Arial, Helvetica, sans-serif', 
                  textAlign: 'left', 
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#43c9ff', fontSize: '1em' }}>Sooth Seer.</i></b> You have the uncanny ability to read someone's intentions despite their words and predict someone's next move outside of combat. Gain an advantage on any related skill roll.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(divinistPerksSkillsDots, setDivinistPerksSkillsDots, 0, [11], 'divinistPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: divinistPerksSkillsDots[0] ? '#000' : '#fff',
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

export default LevelUpSubclassesCoder;
