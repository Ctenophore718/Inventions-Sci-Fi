import React from 'react';

export interface CoderSecondaryAttackData {
  aoeSize: number;
  damageDice: number;
  critValue: number;
  cooldownValue: number;
}

/**
 * Calculate Coder secondary attack values based on class card dots
 */
export function calculateCoderSecondaryAttackData(classCardDots?: boolean[][]): CoderSecondaryAttackData {
  // Get AoE dots (array index 8)
  const aoeDots = classCardDots?.[8]?.filter(Boolean).length || 0;
  // Get damage die dots (array index 9)
  const damageDieDots = classCardDots?.[9]?.filter(Boolean).length || 0;
  // Get crit dots in Secondary Attack section (array index 10)
  const critDotsSecondary = classCardDots?.[10]?.filter(Boolean).length || 0;
  // Get crit dots in Subtle Magic feature section (array index 1)
  const critDotsFeature = classCardDots?.[1]?.filter(Boolean).length || 0;
  // Get cooldown dots (array index 11)
  const cooldownDots = classCardDots?.[11]?.filter(Boolean).length || 0;
  
  // Calculate values
  const aoeSize = 6 + (aoeDots * 3); // Base 6 + 3 per dot
  const damageDice = 1 + damageDieDots; // Base 1 + 1 per dot
  const critValue = 18 - critDotsSecondary - critDotsFeature; // Base 18 - crit dots from both sections
  const cooldownValue = 4 - cooldownDots; // Base 4 - 1 per dot
  
  return { aoeSize, damageDice, critValue, cooldownValue };
}

/**
 * Generate the secondary attack stats for Coder cards
 */
export function generateCoderSecondaryAttackStatsJSX(
  classCardDots?: boolean[][],
  _cost?: number,
  algorithmName?: string,
  subclass?: string,
  subclassProgressionDots?: any
): React.ReactElement {
  const { aoeSize, damageDice, critValue } = calculateCoderSecondaryAttackData(classCardDots);
  
  // Check if Ignore 100% Cover dot is selected (first dot in classCardDots[0])
  const hasIgnore100Cover = classCardDots?.[0]?.[0] || false;
  const coverPercentage = hasIgnore100Cover ? '100%' : '50%';
  
  // Calculate range bonus from Divinist subclass
  const rangeBonus = subclass === 'Divinist' 
    ? (subclassProgressionDots?.divinistFeatureRangeDots?.filter(Boolean).length || 0)
    : 0;
  const totalRange = 6 + rangeBonus;
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> {subclass === 'Divinist' ? <b>[{totalRange}]</b> : totalRange}hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critValue}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> <i>AoE</i> <b>[{aoeSize}]</b>hx-chain, <br />
       <span style={{ display: 'block', textAlign: 'right' }}>ignore <b>[{coverPercentage}]</b> Cover</span> 
        {algorithmName === 'Digital Wave' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, leaves <br />
            <span style={{ display: 'block', textAlign: 'right' }}><i>Dangerous Terrain</i> <i>(</i>1d6 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><i>)</i> for 1 round</span>
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Slam</i></b> 5hx
          </>
        ) : algorithmName === 'Soul Tracer' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, leaves <br />
            <span style={{ display: 'block', textAlign: 'right' }}><i>Dangerous Terrain</i> <i>(</i>auto-Crit, affects <i><b><span style={{ color: '#38761d' }}>Fly</span></b></i><i>)</i> for 1 round</span>
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
          </>
        ) : (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6, <i>Dangerous Terrain</i> <br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Get the algorithm cost
 */
export function getAlgorithmCost(algorithmName: string): number {
  switch (algorithmName) {
    case 'Digital Wave': return 205;
    case 'Soul Tracer': return 240;
    default: return 0;
  }
}