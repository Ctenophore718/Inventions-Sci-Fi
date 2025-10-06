import React from 'react';

export interface CoderPrimaryAttackData {
  dieSizeDots: number;
  critDots: number;
  dieSize: number;
  critThreshold: number;
}

/**
 * Calculate Coder primary attack values based on class card dots
 */
export function calculateCoderPrimaryAttackData(classCardDots?: boolean[][]): CoderPrimaryAttackData {
  // Get die size dots (array index 6)
  const dieSizeDots = classCardDots?.[6]?.filter(Boolean).length || 0;
  // Get crit dots in Primary Attack section (index 7)
  const critDotsPrimary = classCardDots?.[7]?.filter(Boolean).length || 0;
  // Get crit dots in Subtle Magic feature section (index 1)
  const critDotsFeature = classCardDots?.[1]?.filter(Boolean).length || 0;
  // Calculate die size: base 6, +2 per dot
  const dieSize = 6 + dieSizeDots * 2;
  // Calculate crit threshold: 18 minus both crit dot counts
  const critThreshold = 18 - critDotsPrimary - critDotsFeature;
  return { dieSizeDots, critDots: critDotsPrimary, dieSize, critThreshold };
}

/**
 * Generate the primary attack stats for Coder cards
 */
export function generateCoderPrimaryAttackStatsJSX(
  classCardDots?: boolean[][],
  cost?: number,
  lensName?: string,
  hasIgnore100Cover?: boolean,
  subclass?: string,
  subclassProgressionDots?: any
): React.ReactElement {
  const { dieSize, critThreshold } = calculateCoderPrimaryAttackData(classCardDots);
  
  // Determine cover percentage based on hasIgnore100Cover
  const coverPercentage = hasIgnore100Cover ? '100%' : '50%';
  
  // Calculate range bonus from Divinist subclass
  const rangeBonus = subclass === 'Divinist' 
    ? (subclassProgressionDots?.divinistFeatureRangeDots?.filter(Boolean).length || 0)
    : 0;
  const totalRange = 10 + rangeBonus;
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> {subclass === 'Divinist' ? <b>[{totalRange}]</b> : totalRange}hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> Single, ignore <b>[{coverPercentage}]</b> Cover <br />
        {lensName === 'Hodge Podge' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Blind</i></b><br />
          </>
        ) : lensName === 'Time Stutter' ? (
          <>
            <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Restrain</i></b>
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
 * Get the lens cost
 */
export function getLensCost(lensName: string): number {
  switch (lensName) {
    case 'Hodge Podge': return 150;
    case 'Time Stutter': return 150;
    default: return 0;
  }
}