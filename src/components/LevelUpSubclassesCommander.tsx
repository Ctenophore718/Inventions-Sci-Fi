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
import { generateTacticalOffensiveJSX } from "../utils/tacticianFeature";
import { generateStratigeryJSX } from "../utils/tacticianTechnique";
import { generateTacticianSecondaryAttackJSX } from "../utils/tacticianSecondaryAttack";
import { generateTacticianStrikeJSX } from "../utils/tacticianStrike";
import { generateFearlessJSX } from "../utils/tyrantFeature";
import { generateTyrannizeJSX } from "../utils/tyrantTechnique";
import { generateTyrantSecondaryAttackJSX } from "../utils/tyrantSecondaryAttack";
import { generateTyrantStrikeJSX } from "../utils/tyrantStrike";

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

  // State for pending flare selection
  const [pendingFlare, setPendingFlare] = useState<string>("");

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

  // Independent state for Tactician dots
  const [tacticianFeatureRangeHxDots, setTacticianFeatureRangeHxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tacticianFeatureRangeHxDots || [false, false, false]
  );
  const [tacticianFeatureCritDots, setTacticianFeatureCritDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tacticianFeatureCritDots || [false, false]
  );
  const [tacticianFeatureSpeedDots, setTacticianFeatureSpeedDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tacticianFeatureSpeedDots || [false, false]
  );
  const [tacticianTechniqueRangeHxDots, setTacticianTechniqueRangeHxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tacticianTechniqueRangeHxDots || [false, false, false]
  );
  const [tacticianTechniqueDamageDiceDots, setTacticianTechniqueDamageDiceDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tacticianTechniqueDamageDiceDots || [false, false, false]
  );
  const [tacticianTechniqueCooldownDots, setTacticianTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tacticianTechniqueCooldownDots || [false, false]
  );
  const [tacticianAttackAoEDots, setTacticianAttackAoEDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tacticianAttackAoEDots || [false, false]
  );
  const [tacticianAttackCritDots, setTacticianAttackCritDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tacticianAttackCritDots || [false, false, false]
  );
  const [tacticianAttackCooldownDots, setTacticianAttackCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tacticianAttackCooldownDots || [false, false]
  );
  const [tacticianStrikeStrikeDots, setTacticianStrikeStrikeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tacticianStrikeStrikeDots || [false]
  );
  const [tacticianPerksSkillsDots, setTacticianPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tacticianPerksSkillsDots || [false]
  );

  // Independent state for Tyrant dots
  const [tyrantFeatureHxDots, setTyrantFeatureHxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tyrantFeatureHxDots || [false, false, false]
  );
  const [tyrantFeatureConfuseImmunityDots, setTyrantFeatureConfuseImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tyrantFeatureConfuseImmunityDots || [false]
  );
  const [tyrantFeatureMesmerizeImmunityDots, setTyrantFeatureMesmerizeImmunityDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tyrantFeatureMesmerizeImmunityDots || [false]
  );
  const [tyrantTechniqueHxDots, setTyrantTechniqueHxDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tyrantTechniqueHxDots || [false, false, false]
  );
  const [tyrantTechniqueMoveDots, setTyrantTechniqueMoveDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tyrantTechniqueMoveDots || [false, false, false]
  );
  const [tyrantTechniqueCooldownDots, setTyrantTechniqueCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tyrantTechniqueCooldownDots || [false, false]
  );
  const [tyrantAttackDamageDots, setTyrantAttackDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tyrantAttackDamageDots || [false, false, false]
  );
  const [tyrantAttackCritDots, setTyrantAttackCritDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tyrantAttackCritDots || [false, false, false]
  );
  const [tyrantAttackCooldownDots, setTyrantAttackCooldownDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tyrantAttackCooldownDots || [false, false]
  );
  const [tyrantStrikeDamageDots, setTyrantStrikeDamageDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tyrantStrikeDamageDots || [false, false]
  );
  const [tyrantStrikeDemorizeDots, setTyrantStrikeDemorizeDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tyrantStrikeDemorizeDots || [false]
  );
  const [tyrantPerksSkillsDots, setTyrantPerksSkillsDots] = useState<boolean[]>(
    (sheet?.subclassProgressionDots as any)?.tyrantPerksSkillsDots || [false]
  );

  // State for pending blaster selection
  const [pendingBlaster, setPendingBlaster] = useState<string>("");

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
        spSpent: Math.max(0, newSpSpent),
        spRemaining: spTotal - Math.max(0, newSpSpent)
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

  // Handler for purchasing flares with credits
  const handleFlarePurchase = (flareName: string, cost: number) => {
    if (sheet && onAutoSave) {
      const currentCredits = sheet.credits || 0;
      if (currentCredits < cost) {
        setNotice("Not enough credits!");
        return;
      }
      const newFlares = [...(sheet.flares || []), flareName];
      onAutoSave({
        flares: newFlares,
        credits: currentCredits - cost
      });
      setPendingFlare(""); // Clear dropdown after purchase
    }
  };

  // Handler for adding flares without cost
  const handleFlareAdd = (flareName: string) => {
    if (sheet && onAutoSave) {
      const newFlares = [...(sheet.flares || []), flareName];
      onAutoSave({
        flares: newFlares
      });
      setPendingFlare(""); // Clear dropdown after adding
    }
  };

  // Handler for purchasing blasters with credits
  const handleBlasterPurchase = (blasterName: string, cost: number) => {
    if (sheet && onAutoSave) {
      const currentCredits = sheet.credits || 0;
      if (currentCredits < cost) {
        setNotice("Not enough credits!");
        return;
      }
      const newBlasters = [...(sheet.blasters || []), blasterName];
      onAutoSave({
        blasters: newBlasters,
        credits: currentCredits - cost
      });
      setPendingBlaster(""); // Clear dropdown after purchase
    }
  };

  // Handler for adding blasters without cost
  const handleBlasterAdd = (blasterName: string) => {
    if (sheet && onAutoSave) {
      const newBlasters = [...(sheet.blasters || []), blasterName];
      onAutoSave({
        blasters: newBlasters
      });
      setPendingBlaster(""); // Clear dropdown after adding
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

      {/* Tactician Subclass */}
      {subclass === 'Tactician' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateTacticalOffensiveJSX(tacticianFeatureRangeHxDots, tacticianFeatureCritDots, tacticianFeatureSpeedDots)}
              </span>
            </span>
          </div>

          {/* Feature XP progression table */}
          <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
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
              {/* Row 1: XP headers */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>14xp</span>

              {/* Row 2: +1hx dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx</span>
              {[0, 1, 2].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => handleDotClick(tacticianFeatureRangeHxDots, setTacticianFeatureRangeHxDots, idx, [5, 9, 14], 'tacticianFeatureRangeHxDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: tacticianFeatureRangeHxDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || tacticianFeatureRangeHxDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP headers */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span></span>
              {/* Row 2: +1 Crit dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
              {[0, 1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => handleDotClick(tacticianFeatureCritDots, setTacticianFeatureCritDots, idx, [3, 6], 'tacticianFeatureCritDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: tacticianFeatureCritDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || tacticianFeatureCritDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 24px 24px 24px',
              gridTemplateRows: 'repeat(3, auto)',
              columnGap: '6px',
              rowGap: '2px',
              alignItems: 'start',
              marginBottom: '2px',
              width: '100%',
              paddingLeft: '4px'
            }}>
              {/* Row 1: XP headers */}
              <span></span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
              <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
              <span></span>
              {/* Row 2: +1 Speed dots */}
              <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 <b><i style={{ color: '#38761d', fontSize: '1em' }}>Speed</i></b></span>
              {[0, 1].map(idx => (
                <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => handleDotClick(tacticianFeatureSpeedDots, setTacticianFeatureSpeedDots, idx, [6, 10], 'tacticianFeatureSpeedDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: tacticianFeatureSpeedDots[idx] ? '#000' : '#fff',
                      cursor: (idx === 0 || tacticianFeatureSpeedDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              ))}
            </div>
          </div>

          {/* Technique Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateStratigeryJSX(tacticianTechniqueRangeHxDots, tacticianTechniqueDamageDiceDots, tacticianTechniqueCooldownDots)}
            </div>

            {/* Technique XP progression table */}
            <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>

                {/* Row 2: +1hx dots */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx</span>
                {[0, 1, 2].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleDotClick(tacticianTechniqueRangeHxDots, setTacticianTechniqueRangeHxDots, idx, [3, 6, 9], 'tacticianTechniqueRangeHxDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: tacticianTechniqueRangeHxDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || tacticianTechniqueRangeHxDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>

                {/* Row 2: +1 Damage die dots */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Damage die</span>
                {[0, 1, 2].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleDotClick(tacticianTechniqueDamageDiceDots, setTacticianTechniqueDamageDiceDots, idx, [5, 8, 11], 'tacticianTechniqueDamageDiceDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: tacticianTechniqueDamageDiceDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || tacticianTechniqueDamageDiceDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                <span></span>
                {/* Row 2: -1 Cooldown dots */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>-1 Cooldown</span>
                {[0, 1].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleDotClick(tacticianTechniqueCooldownDots, setTacticianTechniqueCooldownDots, idx, [5, 8], 'tacticianTechniqueCooldownDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: tacticianTechniqueCooldownDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || tacticianTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Attack Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '4px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i>Secondary <span style={{ color: '#990000' }}>Attack</span></i></b> <i>(Cooldown</i> <b>[{4 - ((tacticianAttackCooldownDots?.filter(Boolean).length) || 0)}]</b><i>)</i><br />
            </div>

            {/* Flares dropdown section */}
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
                  value={pendingFlare || 'Flares'}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== 'Flares') {
                      setPendingFlare(value);
                    }
                  }}
                >
                  <option disabled style={{ fontWeight: 'bold' }}>Flares</option>
                  <option style={{ fontWeight: 'bold' }}>Fire Flare</option>
                  <option style={{ fontWeight: 'bold' }}>Flash Freeze</option>
                </select>
                
                {pendingFlare && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {pendingFlare}
                      <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                        185c
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => handleFlarePurchase(pendingFlare, 185)}
                      >
                        Buy
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => handleFlareAdd(pendingFlare)}
                      >
                        Add
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => setPendingFlare("")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Display added flares */}
                <div style={{ marginTop: '4px' }}>
                  {(sheet?.flares && sheet.flares.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {sheet?.flares?.map((flare, idx) => (
                        <span key={flare + idx + 'flare'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {flare}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${flare}`}
                            onClick={() => {
                              if (sheet && onAutoSave) {
                                const newFlares = sheet.flares?.filter((_, i) => i !== idx) || [];
                                onAutoSave({
                                  flares: newFlares
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

            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateTacticianSecondaryAttackJSX(tacticianAttackAoEDots, tacticianAttackCritDots, tacticianAttackCooldownDots, tacticianFeatureCritDots)}
            </div>

            {/* Attack XP progression table */}
            <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>14xp</span>
                <span></span>
                {/* Row 2: +1hx-radius AoE dots */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx-Radius <i>AoE</i></span>
                {[0, 1].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleDotClick(tacticianAttackAoEDots, setTacticianAttackAoEDots, idx, [9, 14], 'tacticianAttackAoEDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: tacticianAttackAoEDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || tacticianAttackAoEDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>

                {/* Row 2: +1 Crit dots */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
                {[0, 1, 2].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleDotClick(tacticianAttackCritDots, setTacticianAttackCritDots, idx, [3, 5, 8], 'tacticianAttackCritDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: tacticianAttackCritDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || tacticianAttackCritDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                <span></span>
                {/* Row 2: -1 Cooldown dots */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>-1 Cooldown</span>
                {[0, 1].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleDotClick(tacticianAttackCooldownDots, setTacticianAttackCooldownDots, idx, [5, 6], 'tacticianAttackCooldownDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: tacticianAttackCooldownDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || tacticianAttackCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Strike Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            {generateTacticianStrikeJSX(tacticianStrikeStrikeDots)}

            {/* Strike XP progression table */}
            <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>12xp</span>
                <span></span>
                <span></span>
                {/* Row 2: +1 Strike dot */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 <b><i style={{ color: '#351c75' }}>Strike</i></b></span>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => handleDotClick(tacticianStrikeStrikeDots, setTacticianStrikeStrikeDots, 0, [12], 'tacticianStrikeStrikeDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: tacticianStrikeStrikeDots[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
              </div>
            </div>
          </div>

          {/* Perks Section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <i><b>Skills.</b> Awareness</i> +2
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
                {/* Row 2: Three Moves Ahead */}
                <div style={{
                  fontSize: '1em',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  textAlign: 'left',
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#cec31f', fontSize: '1em' }}>Three Moves Ahead.</i></b> You are always thinking ahead and analyzing several possible outcomes based on the actions you and your allies make. Gain an advantage on skills related to creating or enacting a plan.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(tacticianPerksSkillsDots, setTacticianPerksSkillsDots, 0, [9], 'tacticianPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: tacticianPerksSkillsDots[0] ? '#000' : '#fff',
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

      {subclass === 'Tyrant' && (
        <div style={{ width: '100%', marginTop: '1rem', textAlign: 'left', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
          {/* Feature header */}
          <div style={{ color: '#0b5394', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em', marginBottom: '8px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle', minHeight: 32, fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ fontWeight: 'bold', color: '#0b5394', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Feature</u></div>
              <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
                {generateFearlessJSX(tyrantFeatureHxDots, tyrantFeatureConfuseImmunityDots, tyrantFeatureMesmerizeImmunityDots)}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>14xp</span>
            {/* Row 2: +1hx dots (interactive) */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx</span>
            {[0, 1, 2].map(idx => (
              <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                <span
                  onClick={() => handleDotClick(tyrantFeatureHxDots, setTyrantFeatureHxDots, idx, [5, 9, 14], 'tyrantFeatureHxDots')}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    display: 'block',
                    background: tyrantFeatureHxDots[idx] ? '#000' : '#fff',
                    cursor: (idx === 0 || tyrantFeatureHxDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s'
                  }}
                ></span>
              </span>
            ))}
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
            <span></span>
            <span></span>
            {/* Row 2: Confuse immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}><b><i>Confuse</i></b> immunity</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
              <span
                onClick={() => handleDotClick(tyrantFeatureConfuseImmunityDots, setTyrantFeatureConfuseImmunityDots, 0, [10], 'tyrantFeatureConfuseImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: tyrantFeatureConfuseImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            <span></span>
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
            <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
            <span></span>
            <span></span>
            {/* Row 2: Mesmerize immunity */}
            <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}><b><i>Mesmerize</i></b> immunity</span>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
              <span
                onClick={() => handleDotClick(tyrantFeatureMesmerizeImmunityDots, setTyrantFeatureMesmerizeImmunityDots, 0, [10], 'tyrantFeatureMesmerizeImmunityDots')}
                style={{
                  width: '15px',
                  height: '15px',
                  border: '2px solid #000',
                  borderRadius: '50%',
                  display: 'block',
                  background: tyrantFeatureMesmerizeImmunityDots[0] ? '#000' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              ></span>
            </span>
            <span></span>
            <span></span>
          </div>

          {/* Technique section */}
          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontWeight: 'bold', color: '#bf9000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Technique</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateTyrannizeJSX(tyrantTechniqueHxDots, tyrantTechniqueMoveDots, tyrantTechniqueCooldownDots)}
            </div>

            {/* Technique XP progression table */}
            <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
                {/* Row 2: +1hx dots */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx</span>
                {[0, 1, 2].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleDotClick(tyrantTechniqueHxDots, setTyrantTechniqueHxDots, idx, [3, 6, 9], 'tyrantTechniqueHxDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: tyrantTechniqueHxDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || tyrantTechniqueHxDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>11xp</span>
                {/* Row 2: +1hx Move away dots */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1hx <b><i style={{ color: '#38761d' }}>Move</i></b> away</span>
                {[0, 1, 2].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleDotClick(tyrantTechniqueMoveDots, setTyrantTechniqueMoveDots, idx, [5, 8, 11], 'tyrantTechniqueMoveDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: tyrantTechniqueMoveDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || tyrantTechniqueMoveDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>4xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>7xp</span>
                <span></span>
                {/* Row 2: -1 Cooldown dots */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>-1 Cooldown</span>
                {[0, 1].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleDotClick(tyrantTechniqueCooldownDots, setTyrantTechniqueCooldownDots, idx, [4, 7], 'tyrantTechniqueCooldownDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: tyrantTechniqueCooldownDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || tyrantTechniqueCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
                <span></span>
              </div>
            </div>
          </div>

          {/* Attack section */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #ddd', paddingTop: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
            <div style={{ fontWeight: 'bold', color: '#990000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Attack</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '4px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b><i>Secondary <span style={{ color: '#990000' }}>Attack</span></i></b> <i>(Cooldown</i> <b>[{4 - ((tyrantAttackCooldownDots?.filter(Boolean).length) || 0)}]</b><i>)</i><br />
            </div>

            {/* Blasters dropdown section */}
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
                  value={pendingBlaster || 'Blasters'}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value !== 'Blasters') {
                      setPendingBlaster(value);
                    }
                  }}
                >
                  <option disabled style={{ fontWeight: 'bold' }}>Blasters</option>
                  <option style={{ fontWeight: 'bold' }}>Blizzard Blast</option>
                  <option style={{ fontWeight: 'bold' }}>Shock Gun</option>
                </select>

                {pendingBlaster && (
                  <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {pendingBlaster}
                      <span style={{ color: '#bf9000', fontWeight: 'bold', marginLeft: '8px' }}>
                        {pendingBlaster === 'Blizzard Blast' ? '215c' : pendingBlaster === 'Shock Gun' ? '195c' : ''}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #1976d2', background: '#1976d2', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => {
                          const cost = pendingBlaster === 'Blizzard Blast' ? 215 : pendingBlaster === 'Shock Gun' ? 195 : 0;
                          handleBlasterPurchase(pendingBlaster, cost);
                        }}
                      >
                        Buy
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #28a745', background: '#28a745', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => handleBlasterAdd(pendingBlaster)}
                      >
                        Add
                      </button>
                      <button
                        style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #aaa', background: '#eee', color: '#333', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => setPendingBlaster("")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Display added blasters */}
                <div style={{ marginTop: '4px' }}>
                  {(sheet?.blasters && sheet.blasters.length > 0) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {sheet?.blasters?.map((blaster, idx) => (
                        <span key={blaster + idx + 'blaster'} style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '2px 8px' }}>
                          {blaster}
                          <button
                            style={{ marginLeft: '6px', padding: '0 6px', borderRadius: '50%', border: 'none', background: '#d32f2f', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9em' }}
                            title={`Remove ${blaster}`}
                            onClick={() => {
                              if (sheet && onAutoSave) {
                                const newBlasters = sheet.blasters?.filter((_, i) => i !== idx) || [];
                                onAutoSave({
                                  blasters: newBlasters
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
            
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateTyrantSecondaryAttackJSX(tyrantAttackDamageDots, tyrantAttackCritDots, tyrantAttackCooldownDots)}
            </div>

            {/* Attack XP progression table */}
            <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>15xp</span>
                {/* Row 2: +1 Damage die dots */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Damage die</span>
                {[0, 1, 2].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleDotClick(tyrantAttackDamageDots, setTyrantAttackDamageDots, idx, [5, 8, 15], 'tyrantAttackDamageDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: tyrantAttackDamageDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || tyrantAttackDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>3xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>8xp</span>
                {/* Row 2: +1 Crit dots */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Crit</span>
                {[0, 1, 2].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleDotClick(tyrantAttackCritDots, setTyrantAttackCritDots, idx, [3, 5, 8], 'tyrantAttackCritDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: tyrantAttackCritDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || tyrantAttackCritDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>5xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                <span></span>
                {/* Row 2: -1 Cooldown dots */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>-1 Cooldown</span>
                {[0, 1].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleDotClick(tyrantAttackCooldownDots, setTyrantAttackCooldownDots, idx, [5, 6], 'tyrantAttackCooldownDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: tyrantAttackCooldownDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || tyrantAttackCooldownDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
                <span></span>
              </div>
            </div>
          </div>

          {/* Strike section */}
          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontWeight: 'bold', color: '#351c75', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Strike</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {generateTyrantStrikeJSX(tyrantStrikeDamageDots, tyrantStrikeDemorizeDots, sheet?.classCardDots)}
            </div>

            {/* Strike XP progression table */}
            <div style={{ fontSize: '0.95em', fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '12px' }}>
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
                {/* Row 1: XP headers */}
                <span></span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>6xp</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>10xp</span>
                <span></span>
                {/* Row 2: +1 Damage dice dots */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>+1 Damage die</span>
                {[0, 1].map(idx => (
                  <span key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                    <span
                      onClick={() => handleDotClick(tyrantStrikeDamageDots, setTyrantStrikeDamageDots, idx, [6, 10], 'tyrantStrikeDamageDots')}
                      style={{
                        width: '15px',
                        height: '15px',
                        border: '2px solid #000',
                        borderRadius: '50%',
                        display: 'block',
                        background: tyrantStrikeDamageDots[idx] ? '#000' : '#fff',
                        cursor: (idx === 0 || tyrantStrikeDamageDots.slice(0, idx).every(Boolean)) ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                    ></span>
                  </span>
                ))}
                <span></span>
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
                <span style={{ fontWeight: 'bold', fontSize: '0.7em', color: '#222', textAlign: 'center', width: '100%' }}>9xp</span>
                <span></span>
                <span></span>
                {/* Row 2: Inflict Demoralize */}
                <span style={{ fontSize: '1em', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'right', paddingRight: '8px', wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>Inflict <b><i>Demoralize</i></b></span>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <span
                    onClick={() => handleDotClick(tyrantStrikeDemorizeDots, setTyrantStrikeDemorizeDots, 0, [9], 'tyrantStrikeDemorizeDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: tyrantStrikeDemorizeDots[0] ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  ></span>
                </span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          {/* Perks section */}
          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontWeight: 'bold', color: '#000', marginBottom: '6px', fontSize: '1.08em', fontFamily: 'Arial, Helvetica, sans-serif' }}><u>Perks</u></div>
            <div style={{ fontSize: '1em', color: '#000', marginBottom: '8px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <b>Skills.</b> <i>Intimidation</i> +2
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
                {/* Row 2: Fearmonger */}
                <div style={{
                  fontSize: '1em',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  textAlign: 'left',
                  paddingRight: '8px',
                  maxWidth: '500px',
                  overflowWrap: 'break-word',
                  wordWrap: 'break-word'
                }}>
                  <b><i style={{ color: '#ce1f1f', fontSize: '1em' }}>Fearmonger.</i></b> Your presence automatically sets others on alert, and those weaker of heart are downright fearful of you. Gain an advantage on skill rolls related to any social interactions involving the use of fear.
                </div>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <span
                    onClick={() => handleSpDotClick(tyrantPerksSkillsDots, setTyrantPerksSkillsDots, 0, [10], 'tyrantPerksSkillsDots')}
                    style={{
                      width: '15px',
                      height: '15px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'block',
                      background: tyrantPerksSkillsDots[0] ? '#000' : '#fff',
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
