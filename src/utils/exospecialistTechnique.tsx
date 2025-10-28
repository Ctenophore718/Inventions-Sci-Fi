import React from 'react';

export interface ExospecialistTechniqueData {
  range: number;
  critBonus: number;
  cooldown: number;
  coverPercent: number;
}

/**
 * Calculate Exospecialist technique values based on class card dots
 */
export function calculateExospecialistTechniqueData(classCardDots?: boolean[][]): ExospecialistTechniqueData {
  // Get the number of '+1hx' dots selected (array index 0)
  const rangeDots = classCardDots?.[0]?.filter(Boolean).length || 0;
  const range = 3 + rangeDots; // Base 3, +1 per dot
  
  // Get the number of '+2 Crit' dots selected (array index 1)
  const critDots = classCardDots?.[1]?.filter(Boolean).length || 0;
  const critBonus = 2 + (critDots * 2); // Base 2, +2 per dot
  
  // Check if 'Ignore 100% Cover' dot is selected (array index 2)
  const ignore100Cover = classCardDots?.[2]?.[0] || false;
  const coverPercent = ignore100Cover ? 100 : 50; // 100% if selected, 50% otherwise
  
  // Get the number of '-1 Cooldown' dots selected (array index 3)
  const cooldownDots = classCardDots?.[3]?.filter(Boolean).length || 0;
  const cooldown = Math.max(1, 3 - cooldownDots); // Base 3, -1 per dot, minimum 1
  
  return { range, critBonus, cooldown, coverPercent };
}

/**
 * Generate the Target Lock technique JSX with dynamic values
 */
export function generateTargetLockJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { range, critBonus, cooldown, coverPercent } = calculateExospecialistTechniqueData(classCardDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      <i><span style={{ color: '#117233' }}><b>Target Lock</b> (Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</span></i> You and allies within <b>[{range}]</b>hx gain a +<b>[{critBonus}]</b> to Crit rolls on <i><span style={{ color: '#990000' }}><b>Attacks</b></span></i> and ignore <b>[{coverPercent}%]</b> Cover until the start of the next round.
    </span>
  );
}

/**
 * Generate only the technique description for the Cards page (without title and cooldown)
 */
export function generateTargetLockDescriptionJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { range, critBonus, coverPercent } = calculateExospecialistTechniqueData(classCardDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      You and allies within <b>[{range}]</b>hx gain a +<b>[{critBonus}]</b> to Crit rolls on <i><span style={{ color: '#990000' }}><b>Attacks</b></span></i> and ignore <b>[{coverPercent}%]</b> Cover until the start of the next round.
    </span>
  );
}
