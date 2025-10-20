import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export interface ContemplativePrimaryAttackData {
  repeatDots: number;
  dieSizeDots: number;
  critDots: number;
  repeatCount: number;
  dieSize: number;
  critThreshold: number;
}

/**
 * Calculate Contemplative primary attack values based on class card dots
 */
export function calculateContemplativePrimaryAttackData(classCardDots?: boolean[][]): ContemplativePrimaryAttackData {
  // Get repeat dots (array index 5)
  const repeatDots = classCardDots?.[5]?.filter(Boolean).length || 0;
  // Get die size dots (array index 6)
  const dieSizeDots = classCardDots?.[6]?.filter(Boolean).length || 0;
  // Get crit dots in Primary Attack section (array index 7)
  const critDots = classCardDots?.[7]?.filter(Boolean).length || 0;
  // Calculate repeat count: just the number of repeat dots (matching Level Up page)
  const repeatCount = repeatDots;
  // Calculate die size: base 6, +2 per dot
  const dieSize = 6 + dieSizeDots * 2;
  // Calculate crit threshold: 18 minus crit dots
  const critThreshold = 18 - critDots;
  return { repeatDots, dieSizeDots, critDots, repeatCount, dieSize, critThreshold };
}

/**
 * Generate the primary attack stats for Contemplative Focus cards
 */
export function generateContemplativePrimaryAttackStatsJSX(
  classCardDots?: boolean[][],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _cost?: number,
  focusName?: string,
  sheet?: CharacterSheet | null
): React.ReactElement {
  const { repeatCount, dieSize, critThreshold } = calculateContemplativePrimaryAttackData(classCardDots);
  
  // Calculate Vectorial Unreasonable Accuracy range bonus
  const subclass = sheet?.subclass || '';
  const isVectorial = subclass === 'Vectorial';
  const vectorialFeatureRangeDots = (sheet?.subclassProgressionDots as any)?.vectorialFeatureRangeDots || [false, false, false];
  const rangeBonus = isVectorial ? 6 + vectorialFeatureRangeDots.filter(Boolean).length : 0;
  const baseRange = 10;
  const totalRange = baseRange + rangeBonus;
  
  // Calculate Vectorial Crit bonus
  const vectorialFeatureCritDots = (sheet?.subclassProgressionDots as any)?.vectorialFeatureCritDots || [false, false, false];
  const vectorialCritBonus = isVectorial ? vectorialFeatureCritDots.filter(Boolean).length : 0;
  const totalCritThreshold = critThreshold - vectorialCritBonus;
  
  // Calculate Cover treatment text
  const vectorialFeatureIgnoreCoverDots = (sheet?.subclassProgressionDots as any)?.vectorialFeatureIgnoreCoverDots || [false];
  const ignoreAllCover = vectorialFeatureIgnoreCoverDots[0];
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> {isVectorial ? <><b>[{totalRange}]</b>hx</> : `${baseRange}hx`}</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{totalCritThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> Single, Repeat <b>[{repeatCount}]</b>
        {isVectorial && (
          <>
            , treat {ignoreAllCover ? <><b>[all]</b> </> : <><b>[100%]</b></>} <br />



                        <span style={{ display: 'block', textAlign: 'right' }}>
              Cover as {ignoreAllCover ? <><b>[no]</b> </> : <><b>[50%]</b> </>} Cover</span>
            
            
              
            
          </>
        )}
        {!isVectorial && <br />}
        {focusName === 'Ensnaring Hand Wraps' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, pull the 
            <span style={{ display: 'block', textAlign: 'right' }}>target up to 5hx toward you<br /></span>

          </>
        ) : focusName === 'Mala of Mind Darts' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Blind</i></b>
          </>
        ) : focusName === 'Singing Bowl' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Sleep</i></b>
          </>
        ) : focusName === 'Telekinetic Knuckles' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Bounce</i></b> 3hx
          </>
        ) : focusName === 'Viperfang Ring' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Spike</i></b> 
            <span style={{ display: 'block', textAlign: 'right' }}><b>(<u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u>)</b><br /></span>
          </>
        ) : (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Get the focus cost
 */
export function getFocusCost(focusName: string): number {
  switch (focusName) {
    case 'Ensnaring Hand Wraps': return 150;
    case 'Mala of Mind Darts': return 150;
    case 'Singing Bowl': return 150;
    case 'Telekinetic Knuckles': return 150;
    case 'Viperfang Ring': return 150;
    default: return 0;
  }
}

