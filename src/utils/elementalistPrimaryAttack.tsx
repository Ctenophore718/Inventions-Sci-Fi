import React from 'react';

export interface ElementalistPrimaryAttackData {
  damageDice: number;
  range: number;
  critThreshold: number;
}

/**
 * Calculate Elementalist primary attack values based on class card dots
 */
export function calculateElementalistPrimaryAttackData(classCardDots?: boolean[][]): ElementalistPrimaryAttackData {
  // Get +2 Damage dice dots (array index 4)
  const damageDiceDots = classCardDots?.[4]?.filter(Boolean).length || 0;
  const damageDice = 2 + (damageDiceDots * 2); // Base 2, +2 per dot
  
  // Get +2hx Range dots (array index 5)
  const rangeDots = classCardDots?.[5]?.filter(Boolean).length || 0;
  const range = 6 + (rangeDots * 2); // Base 6, +2 per dot
  
  // Get +1 Crit dots (array index 6)
  const critDots = classCardDots?.[6]?.filter(Boolean).length || 0;
  const critThreshold = 18 - critDots; // Base 18, -1 per dot
  
  return { damageDice, range, critThreshold };
}

/**
 * Generate the primary attack stats for Elementalist Shard cards
 */
export function generateElementalistPrimaryAttackStatsJSX(
  classCardDots?: boolean[][],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _subclass?: string,
  shardName?: string
): React.ReactElement {
  const { damageDice, range, critThreshold } = calculateElementalistPrimaryAttackData(classCardDots);
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> <b>[{range}]</b>hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> <i>AoE</i> 1hx-radius<br />
        {shardName === 'Bluster' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Bounce</i></b> 3hx<br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Bounce</i></b> 3hx
          </>
        ) : shardName === 'Bolt' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Restrain</i></b>
          </>
        ) : shardName === 'Meteor' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><b>)</b>
          </>
        ) : shardName === 'Tremor' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Bounce</i></b> 3hx</span>
          </>
        ) : shardName === 'Fireball' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><b>)</b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Bounce</i></b> 3hx
          </>
        ) : shardName === 'Lava Well' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b><b>)</b>
          </>
        ) : shardName === 'Frostbite' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Restrain</i></b>
          </>
        ) : shardName === 'Vortex' ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><br />
            <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Bounce</i></b> 3hx
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
 * Get the shard cost
 */
export function getShardCost(shardName: string): number {
  switch (shardName) {
    case 'Bluster': return 175;
    case 'Bolt': return 190;
    case 'Meteor': return 175;
    case 'Tremor': return 175;
    case 'Fireball': return 215;
    case 'Lava Well': return 175;
    case 'Frostbite': return 185;
    case 'Vortex': return 175;
    default: return 0;
  }
}
