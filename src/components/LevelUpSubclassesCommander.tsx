import React, { useState } from "react";
import type { CharacterSheet } from "../types/CharacterSheet";
import { generateLoyalServantsJSX } from "../utils/beguilerFeature";
import { generateSeduceJSX } from "../utils/beguilerTechnique";
import { generateBeguilerSecondaryAttackJSX } from "../utils/beguilerSecondaryAttack";
import { generateBeguilerStrikeJSX } from "../utils/beguilerStrike";
import { generateInspiringPresenceJSX } from "../utils/galvanicFeature";
import { generateBolsteringOratoryJSX } from "../utils/galvanicTechnique";
import { generateGalvanicSecondaryAttackJSX } from "../utils/galvanicSecondaryAttack";
import { generateGalvanicStrikeJSX } from "../utils/galvanicStrike";

type LevelUpSubclassesCommanderProps = {
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

const LevelUpSubclassesCommander: React.FC<LevelUpSubclassesCommanderProps> = ({
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

  // Independent state for Beguiler dots
  const [beguilerFeatureHxDots, setBeguilerFeatureHxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.beguilerFeatureHxDots || [false, false, false]
  );
  const [beguilerTechniqueRangeDots, setBeguilerTechniqueRangeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.beguilerTechniqueRangeDots || [false, false, false]
  );
  const [beguilerTechniqueMoveDots, setBeguilerTechniqueMoveDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.beguilerTechniqueMoveDots || [false, false]
  );
  const [beguilerTechniqueCooldownDots, setBeguilerTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.beguilerTechniqueCooldownDots || [false, false]
  );
  const [beguilerAttackAoEDots, setBeguilerAttackAoEDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.beguilerAttackAoEDots || [false, false, false]
  );
  const [beguilerAttackCritDots, setBeguilerAttackCritDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.beguilerAttackCritDots || [false, false, false]
  );
  const [beguilerAttackCooldownDots, setBeguilerAttackCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.beguilerAttackCooldownDots || [false, false]
  );
  const [beguilerStrikeStrikeDots, setBeguilerStrikeStrikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.beguilerStrikeStrikeDots || [false]
  );
  const [beguilerStrikeMesmerizeDots, setBeguilerStrikeMesmerizeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.beguilerStrikeMesmerizeDots || [false]
  );
  const [beguilerPerksSkillsDots, setBeguilerPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.beguilerPerksSkillsDots || [false]
  );

  // State for pending whip selection
  const [pendingWhip, setPendingWhip] = useState<string>("");

  // State for pending sabre selection
  const [pendingSabre, setPendingSabre] = useState<string>("");

  // Independent state for Galvanic dots
  const [galvanicFeatureHxDots, setGalvanicFeatureHxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicFeatureHxDots || [false, false, false]
  );
  const [galvanicFeatureHpDots, setGalvanicFeatureHpDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicFeatureHpDots || [false, false]
  );
  const [galvanicTechniqueHxDots, setGalvanicTechniqueHxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicTechniqueHxDots || [false, false, false]
  );
  const [galvanicTechniqueCritDots, setGalvanicTechniqueCritDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicTechniqueCritDots || [false, false, false]
  );
  const [galvanicTechniqueHpDots, setGalvanicTechniqueHpDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicTechniqueHpDots || [false, false]
  );
  const [galvanicTechniqueCooldownDots, setGalvanicTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicTechniqueCooldownDots || [false, false]
  );
  const [galvanicAttackAoEDots, setGalvanicAttackAoEDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicAttackAoEDots || [false, false]
  );
  const [galvanicAttackDamageDots, setGalvanicAttackDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicAttackDamageDots || [false, false, false]
  );
  const [galvanicAttackCritDots, setGalvanicAttackCritDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicAttackCritDots || [false, false, false]
  );
  const [galvanicAttackCooldownDots, setGalvanicAttackCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicAttackCooldownDots || [false, false]
  );
  const [galvanicStrikeDamageDots, setGalvanicStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicStrikeDamageDots || [false]
  );
  const [galvanicStrikeStrikeDots, setGalvanicStrikeStrikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicStrikeStrikeDots || [false]
  );
  const [galvanicStrikeAoEDots, setGalvanicStrikeAoEDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicStrikeAoEDots || [false, false]
  );
  const [galvanicPerksSkillsDots, setGalvanicPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.galvanicPerksSkillsDots || [false]
  );

  // Helper function to handle XP dot clicking with sequential requirement
  const handleDotClick = (
    currentArray: boolean[],
    setArray: React.Dispatch<React.SetStateAction<boolean[]>>,
    index: number,
    xpCosts: number[],
    dotType?: string
  ) => {
    // Use the most up-to-date data from sheet to avoid XP drift
    const actualCurrentArray = dotType && sheet?.subclassProgressionDots
      ? ((sheet.subclassProgressionDots as any)[dotType] as boolean[] || currentArray)
      : currentArray;
    
    const newArray = [...actualCurrentArray];
    const rightmostChecked = actualCurrentArray.lastIndexOf(true);
    const canCheck = index === 0 || actualCurrentArray.slice(0, index).every(Boolean);
    const canUncheck = actualCurrentArray[index] && index === rightmostChecked;

    let xpDelta = 0;

    if (!actualCurrentArray[index] && canCheck) {
      // Checking dots - fill from start to current index
      for (let j = 0; j <= index; j++) {
        if (!actualCurrentArray[j]) {
          newArray[j] = true;
          xpDelta += xpCosts[j] || 0;
        }
      }
    } else if (actualCurrentArray[index] && canUncheck) {
      // Unchecking dots - clear from current index to end
      for (let j = index; j < actualCurrentArray.length; j++) {
        if (actualCurrentArray[j]) {
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

      // Update local array state
      setArray(newArray);

      // Immediately update parent state to prevent race conditions on rapid clicks
      setXpSpent(Math.max(0, newXpSpent));

      // Save to parent - parent will persist the changes
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
    // Use the most up-to-date data from sheet to avoid SP drift
    const actualCurrentArray = dotType && sheet?.subclassProgressionDots
      ? ((sheet.subclassProgressionDots as any)[dotType] as boolean[] || currentArray)
      : currentArray;
    
    const newArray = [...actualCurrentArray];
    let spDelta = 0;

    if (!actualCurrentArray[index]) {
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

    // Update local array state
    setArray(newArray);

    // Immediately update parent state to prevent race conditions on rapid clicks
    setSpSpent(Math.max(0, newSpSpent));

    // Save to parent - parent will persist the changes
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

  // Handler for purchasing whips with credits
  const handleWhipPurchase = (whipName: string, cost: number) => {
    const currentCredits = sheet?.credits || 0;
    if (currentCredits < cost) {
      setNotice("Not enough credits!");
      return;
    }

    if (sheet && onAutoSave) {
      const newWhips = [...(sheet.whips || []), whipName];
      onAutoSave({
        whips: newWhips,
        credits: currentCredits - cost
      });
      setPendingWhip(""); // Clear dropdown after purchase
    }
  };

  // Handler for adding whips without cost
  const handleWhipAdd = (whipName: string) => {
    if (sheet && onAutoSave) {
      const newWhips = [...(sheet.whips || []), whipName];
      onAutoSave({
        whips: newWhips
      });
      setPendingWhip(""); // Clear dropdown after adding
    }
  };

  // Handler for purchasing sabres with credits
  const handleSabrePurchase = (sabreName: string, cost: number) => {
    const currentCredits = sheet?.credits || 0;
    if (currentCredits < cost) {
      setNotice("Not enough credits!");
      return;
    }

    if (sheet && onAutoSave) {
      const newSabres = [...(sheet.sabres || []), sabreName];
      onAutoSave({
        sabres: newSabres,
        credits: currentCredits - cost
      });
      setPendingSabre(""); // Clear dropdown after purchase
    }
  };

  // Handler for adding sabres without cost
  const handleSabreAdd = (sabreName: string) => {
    if (sheet && onAutoSave) {
      const newSabres = [...(sheet.sabres || []), sabreName];
      onAutoSave({
        sabres: newSabres
      });
      setPendingSabre(""); // Clear dropdown after adding
    }
  };

  return (
    <div style={{ width: '100%', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      
      {subclass === 'Beguiler' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateLoyalServantsJSX(beguilerFeatureHxDots)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table */}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>17xp</span>
            {/* Row 2: +1hx dots */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(beguilerFeatureHxDots, setBeguilerFeatureHxDots, idx, [6, 11, 17], 'beguilerFeatureHxDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: beguilerFeatureHxDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || beguilerFeatureHxDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              {generateSeduceJSX(sheet?.subclassProgressionDots)}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
              {/* Row 2: +2hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2hx</span>
              {[0, 1, 2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(beguilerTechniqueRangeDots, setBeguilerTechniqueRangeDots, idx, [5, 8, 12], 'beguilerTechniqueRangeDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: beguilerTechniqueRangeDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || beguilerTechniqueRangeDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span></span>
              {/* Row 2: +1hx Move closer */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx <b><i style={{ color: '#38761d' }}>Move</i></b> closer</span>
              {[0, 1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(beguilerTechniqueMoveDots, setBeguilerTechniqueMoveDots, idx, [5, 8], 'beguilerTechniqueMoveDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: beguilerTechniqueMoveDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || beguilerTechniqueMoveDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
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
              marginTop: '-6px',
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
              {[0, 1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(beguilerTechniqueCooldownDots, setBeguilerTechniqueCooldownDots, idx, [5, 8], 'beguilerTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: beguilerTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || beguilerTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>
          </div>

          {/* Attack Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
            <div style={{ marginBottom: '4px' }}>
              <b><i><span style={{ color: '#000' }}>Secondary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> <i>(Cooldown</i> <b>[{4 - (beguilerAttackCooldownDots?.filter(Boolean).length || 0)}]</b><i>).</i>
            </div>

            {/* Whips dropdown section */}
            <div style={{ marginTop: '8px', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ marginBottom: '4px' }}>
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
                  value={pendingWhip || 'Whips'}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== 'Whips') {
                      setPendingWhip(value);
                    }
                  }}
                >
                  <option disabled style={{ fontWeight: 'bold' }}>Whips</option>
                  <option style={{ fontWeight: 'bold' }}>Heartstrings</option>
                  <option style={{ fontWeight: 'bold' }}>The Crackler</option>
                </select>
                
                {pendingWhip && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {pendingWhip}
                      <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                        {pendingWhip === 'Heartstrings' ? '190c' : pendingWhip === 'The Crackler' ? '200c' : ''}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => {
                          const cost = pendingWhip === 'Heartstrings' ? 190 : pendingWhip === 'The Crackler' ? 200 : 0;
                          handleWhipPurchase(pendingWhip, cost);
                        }}
                      >
                        Buy
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => handleWhipAdd(pendingWhip)}
                      >
                        Add
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => setPendingWhip("")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Display added whips */}
                <div style={{ marginTop: '4px' }}>
                  {(sheet?.whips && sheet.whips.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {sheet?.whips?.map((whip, idx) => (
                        <span key={whip + idx + 'whip'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {whip}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${whip}`}
                            onClick={() => {
                              if (sheet && onAutoSave) {
                                const newWhips = sheet.whips?.filter((_, i) => i !== idx) || [];
                                onAutoSave({
                                  whips: newWhips
                                });
                              }
                            }}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Rest of Secondary Attack details from generateBeguilerSecondaryAttackJSX */}
            {(() => {
              const { chainAoE, critThreshold } = {
                chainAoE: 5 + (beguilerAttackAoEDots?.filter(Boolean).length || 0),
                critThreshold: 18 - (beguilerAttackCritDots?.filter(Boolean).length || 0)
              };
              return (
                <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span>
                      <b><u>Range</u></b> 1hx
                    </span>
                    <span style={{ textAlign: 'right', minWidth: '80px' }}>
                      <b><u>Crit</u></b> <b>[{critThreshold}]</b>+
                    </span>
                  </div>
                  <div style={{ marginTop: '4px' }}>
                    <b><u>Target</u></b> <i>AoE</i> <b>[{chainAoE}]</b>hx-Chain <br />
                    <b><u>Damage</u></b> 1d4, status effect <br />
                    <b><u>Crit Effect</u></b> 1d4
                  </div>
                </div>
              );
            })()}

            {/* Attack XP progression table - First row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginTop: '8px',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>7xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>11xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>16xp</span>
              {/* Row 2: +1hx-Chain AoE */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx-Chain <i>AoE</i></span>
              {[0, 1, 2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(beguilerAttackAoEDots, setBeguilerAttackAoEDots, idx, [7, 11, 16], 'beguilerAttackAoEDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: beguilerAttackAoEDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || beguilerAttackAoEDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Attack XP progression table - Second row */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              {/* Row 2: +1 Crit */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit</span>
              {[0, 1, 2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(beguilerAttackCritDots, setBeguilerAttackCritDots, idx, [3, 5, 8], 'beguilerAttackCritDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: beguilerAttackCritDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || beguilerAttackCritDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Attack XP progression table - Third row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginTop: '-6px',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span></span>
              {/* Row 2: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0, 1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(beguilerAttackCooldownDots, setBeguilerAttackCooldownDots, idx, [5, 6], 'beguilerAttackCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: beguilerAttackCooldownDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || beguilerAttackCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
            {generateBeguilerStrikeJSX(beguilerStrikeStrikeDots, beguilerStrikeMesmerizeDots)}

            {/* Strike XP progression table - First row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginTop: '8px',
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
                  onClick={() => handleDotClick(beguilerStrikeStrikeDots, setBeguilerStrikeStrikeDots, 0, [12], 'beguilerStrikeStrikeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: beguilerStrikeStrikeDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>8xp</span>
              <span></span>
              <span></span>
              {/* Row 2: Inflict Mesmerize */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>Inflict <b><i>Mesmerize</i></b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(beguilerStrikeMesmerizeDots, setBeguilerStrikeMesmerizeDots, 0, [8], 'beguilerStrikeMesmerizeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: beguilerStrikeMesmerizeDots[0] ? '#000' : '#fff',
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
                {/* Row 2: Object of Fascination */}
                <div style={{
                  fontSize: '1em',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  textAlign: 'left',
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#1f21ce', fontSize: '1em' }}>Object of Fascination.</i></b> Your seductive qualities are undeniable and you are capable of convincing nearly anyone to assist in almost any way. Gain an advantage on skill rolls related to coaxing others who are not outright hostile towards you to help you.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(beguilerPerksSkillsDots, setBeguilerPerksSkillsDots, 0, [11], 'beguilerPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: beguilerPerksSkillsDots[0] ? '#000' : '#fff',
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

      {/* Galvanic Subclass */}
      {subclass === 'Galvanic' && (
        <div style={{ marginTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
          {/* Feature Section */}
          <div style={{ marginTop: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
            {generateInspiringPresenceJSX(galvanicFeatureHxDots, galvanicFeatureHpDots)}

            {/* Feature XP progression table - First row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginTop: '8px',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>14xp</span>
              {/* Row 2: +1hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0, 1, 2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(galvanicFeatureHxDots, setGalvanicFeatureHxDots, idx, [5, 9, 14], 'galvanicFeatureHxDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: galvanicFeatureHxDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || galvanicFeatureHxDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>18xp</span>
              <span></span>
              {/* Row 2: +1d6 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d6 <span style={{ color: '#990000' }}><b><i>Hit Points</i></b></span></span>
              {[0, 1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(galvanicFeatureHpDots, setGalvanicFeatureHpDots, idx, [10, 18], 'galvanicFeatureHpDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: galvanicFeatureHpDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || galvanicFeatureHpDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>
          </div>

          {/* Technique Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            {generateBolsteringOratoryJSX(galvanicTechniqueHxDots, galvanicTechniqueCritDots, galvanicTechniqueHpDots, galvanicTechniqueCooldownDots)}

            {/* Technique XP progression table - First row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginTop: '8px',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
              {/* Row 2: +1hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx</span>
              {[0, 1, 2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(galvanicTechniqueHxDots, setGalvanicTechniqueHxDots, idx, [3, 6, 9], 'galvanicTechniqueHxDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: galvanicTechniqueHxDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || galvanicTechniqueHxDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>2xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              {/* Row 2: +2 Crit dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+2 Crit</span>
              {[0, 1, 2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(galvanicTechniqueCritDots, setGalvanicTechniqueCritDots, idx, [2, 4, 6], 'galvanicTechniqueCritDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: galvanicTechniqueCritDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || galvanicTechniqueCritDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              <span></span>
              {/* Row 2: +1d6 Hit Points dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1d6 <span style={{ color: '#990000' }}><b><i>Hit Points</i></b></span></span>
              {[0, 1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(galvanicTechniqueHpDots, setGalvanicTechniqueHpDots, idx, [6, 10], 'galvanicTechniqueHpDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: galvanicTechniqueHpDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || galvanicTechniqueHpDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>

            {/* Technique XP progression table - Fourth row */}
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
              {[0, 1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(galvanicTechniqueCooldownDots, setGalvanicTechniqueCooldownDots, idx, [5, 8], 'galvanicTechniqueCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: galvanicTechniqueCooldownDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || galvanicTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>
          </div>

          {/* Attack Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i>Secondary <span style={{ color: '#990000' }}>Attack</span></i></b> <i>(Cooldown</i> <b>[{4 - galvanicAttackCooldownDots.filter(Boolean).length}]</b><i>)</i><br />
            </div>

            {/* Sabres dropdown section */}
            <div style={{ marginTop: '8px', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ marginBottom: '4px' }}>
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
                  value={pendingSabre || 'Sabres'}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== 'Sabres') {
                      setPendingSabre(value);
                    }
                  }}
                >
                  <option disabled style={{ fontWeight: 'bold' }}>Sabres</option>
                  <option style={{ fontWeight: 'bold' }}>Phase Sword</option>
                  <option style={{ fontWeight: 'bold' }}>Truthsinger</option>
                </select>
                
                {pendingSabre && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {pendingSabre}
                      <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>185c</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => handleSabrePurchase(pendingSabre, 185)}
                      >
                        Buy
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => handleSabreAdd(pendingSabre)}
                      >
                        Add
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => setPendingSabre("")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Display added sabres */}
                <div style={{ marginTop: '4px' }}>
                  {(sheet?.sabres && sheet.sabres.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {sheet?.sabres?.map((sabre, idx) => (
                        <span key={sabre + idx + 'sabre'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {sabre}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${sabre}`}
                            onClick={() => {
                              if (sheet && onAutoSave) {
                                const newSabres = sheet.sabres?.filter((_, i) => i !== idx) || [];
                                onAutoSave({
                                  sabres: newSabres
                                });
                              }
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {generateGalvanicSecondaryAttackJSX(galvanicAttackAoEDots, galvanicAttackDamageDots, galvanicAttackCritDots, galvanicAttackCooldownDots)}

            {/* Attack XP progression table - First row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginTop: '8px',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>14xp</span>
              <span></span>
              {/* Row 2: +1hx-radius AoE dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx-radius AoE</span>
              {[0, 1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(galvanicAttackAoEDots, setGalvanicAttackAoEDots, idx, [9, 14], 'galvanicAttackAoEDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: galvanicAttackAoEDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || galvanicAttackAoEDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
              <span></span>
            </div>

            {/* Attack XP progression table - Second row */}
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
              {/* Row 2: +1 Damage die dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Damage die</span>
              {[0, 1, 2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(galvanicAttackDamageDots, setGalvanicAttackDamageDots, idx, [5, 8, 15], 'galvanicAttackDamageDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: galvanicAttackDamageDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || galvanicAttackDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Attack XP progression table - Third row */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>2xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>4xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              {/* Row 2: +1 Crit dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Crit</span>
              {[0, 1, 2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(galvanicAttackCritDots, setGalvanicAttackCritDots, idx, [2, 4, 6], 'galvanicAttackCritDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: galvanicAttackCritDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || galvanicAttackCritDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            {/* Attack XP progression table - Fourth row */}
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>6xp</span>
              <span></span>
              {/* Row 2: -1 Cooldown dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>-1 Cooldown</span>
              {[0, 1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(galvanicAttackCooldownDots, setGalvanicAttackCooldownDots, idx, [5, 6], 'galvanicAttackCooldownDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: galvanicAttackCooldownDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || galvanicAttackCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
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
            {generateGalvanicStrikeJSX(galvanicStrikeDamageDots, galvanicStrikeStrikeDots, galvanicStrikeAoEDots)}

            {/* Strike XP progression table - First row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(2, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginTop: '8px',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP header */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>18xp</span>
              <span></span>
              <span></span>
              {/* Row 2: +1 Damage die */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 Damage die</span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(galvanicStrikeDamageDots, setGalvanicStrikeDamageDots, 0, [18], 'galvanicStrikeDamageDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: galvanicStrikeDamageDots[0] ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
              <span></span>
              <span></span>
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12xp</span>
              <span></span>
              <span></span>
              {/* Row 2: +1 Strike */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1 <b><i style={{ color: '#351c75' }}>Strike</i></b></span>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span
                  onClick={() => handleDotClick(galvanicStrikeStrikeDots, setGalvanicStrikeStrikeDots, 0, [12], 'galvanicStrikeStrikeDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: galvanicStrikeStrikeDots[0] ? '#000' : '#fff',
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
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>10xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>14xp</span>
              <span></span>
              {/* Row 2: +1hx-radius AoE dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px' }}>+1hx-Radius <i>AoE</i></span>
              {[0, 1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span
                    onClick={() => handleDotClick(galvanicStrikeAoEDots, setGalvanicStrikeAoEDots, idx, [10, 14], 'galvanicStrikeAoEDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: galvanicStrikeAoEDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || galvanicStrikeAoEDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
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
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center' }}>12sp</span>
                {/* Row 2: Moral Support */}
                <div style={{
                  fontSize: '1em',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  textAlign: 'left',
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#6fce1f', fontSize: '1em' }}>Moral Support.</i></b> Your inspiring leadership is capable of pulling your comrades from the brink of death. Allies on the battlefield gain a +1 to <b><i>Death Die</i></b> rolls.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(galvanicPerksSkillsDots, setGalvanicPerksSkillsDots, 0, [12], 'galvanicPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: galvanicPerksSkillsDots[0] ? '#000' : '#fff',
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

export default LevelUpSubclassesCommander;
