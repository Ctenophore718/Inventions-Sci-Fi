import React from 'react';

export interface ContemplativePrimaryAttackData {
  repeatCount: number;
  dieSizeDots: number;
  critDots: number;
  dieSize: number;
  critThreshold: number;
}

/**
 * Calculate Contemplative primary attack values based on class card dots
 */
export function calculateContemplativePrimaryAttackData(classCardDots?: boolean[][]): ContemplativePrimaryAttackData {
  // Get repeat dots (array index 5)
  const repeatDots = classCardDots?.[5]?.filter(Boolean).length || 0;
  const repeatCount = 1 + repeatDots; // Base 1 + repeat dots
  
  // Get die size dots (array index 6)
  const dieSizeDots = classCardDots?.[6]?.filter(Boolean).length || 0;
  
  // Get crit dots in Primary Attack section (array index 7)
  const critDots = classCardDots?.[7]?.filter(Boolean).length || 0;
  
  // Calculate die size: base 6, +2 per dot
  const dieSize = 6 + dieSizeDots * 2;
  
  // Calculate crit threshold: 18 minus crit dots
  const critThreshold = 18 - critDots;
  
  return { repeatCount, dieSizeDots, critDots, dieSize, critThreshold };
}

/**
 * Generate the primary attack stats for Contemplative Focus cards
 */
export function generateContemplativePrimaryAttackStatsJSX(
  classCardDots?: boolean[][],
  focusName?: string
): React.ReactElement {
  const { repeatCount, dieSize, critThreshold } = calculateContemplativePrimaryAttackData(classCardDots);
  
  // Determine damage type, color, icon, and crit effect based on focus
  let damageType = '';
  let damageColor = '#000';
  let damageIcon = '';
  let critEffect = '';
  
  if (focusName === 'Ensnaring Hand Wraps') {
    damageType = 'Bludgeoning';
    damageColor = '#915927';
    damageIcon = '/Bludgeoning.png';
    critEffect = ', pull the target up to 5hx toward you';
  } else if (focusName === 'Mala of Mind Darts') {
    damageType = 'Neural';
    damageColor = '#a929ff';
    damageIcon = '/Neural.png';
    critEffect = ', Blind';
  } else if (focusName === 'Singing Bowl') {
    damageType = 'Neural';
    damageColor = '#a929ff';
    damageIcon = '/Neural.png';
    critEffect = ', Sleep';
  } else if (focusName === 'Telekinetic Knuckles') {
    damageType = 'Force';
    damageColor = '#516fff';
    damageIcon = '/Force.png';
    critEffect = ', Bounce 3hx';
  } else if (focusName === 'Viperfang Ring') {
    damageType = 'Toxic';
    damageColor = '#02b900';
    damageIcon = '/Toxic.png';
    critEffect = ', Spike (Toxic ●)';
  }
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 10hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> Single, Repeat <b>[{repeatCount}]</b><br />
        <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> {damageType && (
          <b style={{ color: damageColor }}>
            <u style={{ display: 'inline-flex', alignItems: 'center' }}>
              {damageType}
              <img src={damageIcon} alt={damageType} style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
            </u>
          </b>
        )}<br />
        <b><u>Crit Effect</u></b> 1d<b>[{dieSize}]</b> {damageType && (
          <b style={{ color: damageColor }}>
            <u style={{ display: 'inline-flex', alignItems: 'center' }}>
              {damageType}
              <img src={damageIcon} alt={damageType} style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
            </u>
          </b>
        )}{critEffect}
      </div>
    </div>
  );
}
