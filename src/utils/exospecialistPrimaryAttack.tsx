import React from 'react';

export interface ExospecialistPrimaryAttackData {
  damageDice: number;
  range: number;
  critThreshold: number;
}

/**
 * Calculate Exospecialist primary attack values based on class card dots
 */
export function calculateExospecialistPrimaryAttackData(classCardDots?: boolean[][]): ExospecialistPrimaryAttackData {
  // Get '+2 Damage dice' dots (array index 4)
  const damageDiceDots = classCardDots?.[4]?.filter(Boolean).length || 0;
  const damageDice = 2 + (damageDiceDots * 2); // Base 2, +2 per dot
  
  // Get +2hx Range dots (array index 5)
  const rangeDots = classCardDots?.[5]?.filter(Boolean).length || 0;
  const range = 6 + (rangeDots * 2); // Base 6, +2 per dot
  
  // Get '+1 Crit' dots (array index 5) - PRIMARY ATTACK CRIT
  const critDots = classCardDots?.[5]?.filter(Boolean).length || 0;
  const critThreshold = 18 - critDots; // Base 18, -1 per dot
  
  return { damageDice, range, critThreshold };
}

/**
 * Generate the primary attack JSX (for use in Level Up page)
 */
export function generateExospecialistPrimaryAttackJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { damageDice, range, critThreshold } = calculateExospecialistPrimaryAttackData(classCardDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      <i><b>Primary <span style={{ color: '#990000' }}>Attack.</span></b></i><br />
      <i>Integrated Blasters.</i> <b>[1]</b>hx Range, <i>AoE</i> 4hx-Cone, <b>[{critThreshold}]</b>+ Crit, <b>[{damageDice}]</b>d6 Damage.
    </span>
  );
}

/**
 * Generate the primary attack stats for Exospecialist Integrated Blaster cards
 */
export function generateExospecialistPrimaryAttackStatsJSX(
  classCardDots?: boolean[][],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _subclass?: string,
  blasterName?: string
): React.ReactElement {
  const { damageDice, range, critThreshold } = calculateExospecialistPrimaryAttackData(classCardDots);
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 1hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> <i>AoE</i> 4hx-Cone<br />
        {blasterName === 'Boomstick' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Slam</i></b> 3hx
          </>
        ) : blasterName === 'Firestarter' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b>
          </>
        ) : blasterName === 'Sleepytime' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> <br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Sleep</i></b>
          </>
        ) : (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6, status effect
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Get the Integrated Blaster cost
 */
export function getIntegratedBlasterCost(blasterName: string): number {
  switch (blasterName) {
    case 'Boomstick': return 170;
    case 'Firestarter': return 160;
    case 'Sleepytime': return 170;
    default: return 0;
  }
}
