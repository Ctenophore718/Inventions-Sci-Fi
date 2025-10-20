import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export interface ContemplativeSecondaryAttackData {
  dieSizeDots: number;
  damageDieDots: number;
  critDots: number;
  cooldownDots: number;
  dieSize: number;
  damageDice: number;
  critValue: number;
  cooldownValue: number;
}

/**
 * Calculate Contemplative secondary attack values based on class card dots
 */
export function calculateContemplativeSecondaryAttackData(classCardDots?: boolean[][]): ContemplativeSecondaryAttackData {
  // Get die size increase dots (array index 8)
  const dieSizeDots = classCardDots?.[8]?.filter(Boolean).length || 0;
  // Get damage die dots (array index 9)
  const damageDieDots = classCardDots?.[9]?.filter(Boolean).length || 0;
  // Get crit dots (array index 10)
  const critDots = classCardDots?.[10]?.filter(Boolean).length || 0;
  // Get cooldown dots (array index 11)
  const cooldownDots = classCardDots?.[11]?.filter(Boolean).length || 0;
  
  // Calculate values
  const dieSize = 8 + (dieSizeDots * 2); // Base 8 + 2 per dot
  const damageDice = 2 + damageDieDots; // Base 2 + 1 per dot
  const critValue = 18 - critDots; // Base 18 - 1 per dot
  const cooldownValue = 4 - cooldownDots; // Base 4 - 1 per dot
  
  return { dieSizeDots, damageDieDots, critDots, cooldownDots, dieSize, damageDice, critValue, cooldownValue };
}

/**
 * Generate the secondary attack stats for Contemplative Discipline cards
 */
export function generateContemplativeSecondaryAttackStatsJSX(
  classCardDots?: boolean[][],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _cost?: number,
  disciplineName?: string,
  sheet?: CharacterSheet | null
): React.ReactElement {
  const { damageDice, dieSize, critValue } = calculateContemplativeSecondaryAttackData(classCardDots);
  
  // Calculate Vectorial Unreasonable Accuracy range bonus for Vectorial Disciplines only
  const subclass = sheet?.subclass || '';
  const isVectorialDiscipline = disciplineName === 'Bane Prana' || disciplineName === 'Night Prana';
  const isVectorial = subclass === 'Vectorial';
  const shouldApplyBonus = isVectorial && isVectorialDiscipline;
  const vectorialFeatureRangeDots = (sheet?.subclassProgressionDots as any)?.vectorialFeatureRangeDots || [false, false, false];
  const rangeBonus = shouldApplyBonus ? 6 + vectorialFeatureRangeDots.filter(Boolean).length : 0;
  const baseRange = 1;
  const totalRange = baseRange + rangeBonus;
  
  // Calculate Vectorial Crit bonus (applies to all attacks when Vectorial)
  const vectorialFeatureCritDots = (sheet?.subclassProgressionDots as any)?.vectorialFeatureCritDots || [false, false, false];
  const vectorialCritBonus = isVectorial ? vectorialFeatureCritDots.filter(Boolean).length : 0;
  const totalCritValue = critValue - vectorialCritBonus;
  
  // Calculate Cover treatment text (applies to all attacks when Vectorial)
  const vectorialFeatureIgnoreCoverDots = (sheet?.subclassProgressionDots as any)?.vectorialFeatureIgnoreCoverDots || [false];
  const ignoreAllCover = vectorialFeatureIgnoreCoverDots[0];
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> {shouldApplyBonus ? <><b>[{totalRange}]</b>hx</> : `${baseRange}hx`}</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{totalCritValue}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> Single
        {isVectorial && (
          <>
            , treat {ignoreAllCover ? <><b>[all]</b></> : <><b>[100%]</b></>} Cover as 
            <br />
            <span style={{ display: 'block', textAlign: 'right' }}>
              {ignoreAllCover ? <><b>[no]</b> Cover</> : <><b>[50%]</b> Cover</>}
            </span>
          </>
        )}
        {!isVectorial && <br />}
        {disciplineName === 'Empty Mudra' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Slam</i></b> 3hx<br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Drain</i></b>
          </>
        ) : disciplineName === 'Mudra of Brilliance' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Slam</i></b> 3hx<br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Blind</i></b>
          </>
        ) : disciplineName === 'Way of Quicksilver' ? (
          <><div style={{ fontSize: '0.95em' }}>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 13.3, height: 13.3, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 13.3, height: 13.3, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 13.3, height: 13.3, marginLeft: 2, verticalAlign: 'middle' }} /></u></b></span>
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 13.3, height: 13.3, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 13.3, height: 13.3, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 13.3, height: 13.3, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <br />
            immediately make one more <br />
            <b><i>Secondary</i> <i style={{ color: '#990000', display: 'inline-flex', alignItems: 'center' }}>Attack</i></b> that can't Crit</span>
          </div></>
        ) : disciplineName === 'Way of Sublimation' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Sleep</i></b></span>
          </>
        ) : disciplineName === 'Asana of Heaviness' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Restrain</i></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Sleep</i></b>
          </>
        ) : disciplineName === 'Passive Asana' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u>, </b><b><i>Blind</i></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Sleep</i></b>
          </>
        ) : disciplineName === 'Bane Prana' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Demoralize</i></b></span>
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Drain</i></b><br />
          </>
        ) : disciplineName === 'Night Prana' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Blind</i></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Mesmerize</i></b><br />
          </>
        ) : (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b> <br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d<b>[{dieSize}]</b>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Get the discipline cost
 */
export function getDisciplineCost(disciplineName: string): number {
  switch (disciplineName) {
    case 'Empty Mudra': return 150;
    case 'Mudra of Brilliance': return 150;
    case 'Way of Quicksilver': return 150;
    case 'Way of Sublimation': return 150;
    case 'Asana of Heaviness': return 150;
    case 'Passive Asana': return 150;
    case 'Bane Prana': return 150;
    case 'Night Prana': return 150;
    default: return 0;
  }
}
