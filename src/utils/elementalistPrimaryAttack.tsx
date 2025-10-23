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
 * Generate the primary attack stats for Elementalist cards
 */
export function generateElementalistPrimaryAttackStatsJSX(
  classCardDots?: boolean[][],
  subclass?: string,
  shardName?: string
): React.ReactElement {
  const { damageDice, range, critThreshold } = calculateElementalistPrimaryAttackData(classCardDots);
  
  // Determine damage type and icon based on shard
  let damageType = '';
  let damageColor = '';
  let damageIcon = '';
  let critEffect = '';
  
  switch (shardName) {
    case 'Bluster':
      damageType = 'Force';
      damageColor = '#516fff';
      damageIcon = '/Force.png';
      critEffect = 'Slam 3hx';
      break;
    case 'Bolt':
      damageType = 'Force';
      damageColor = '#516fff';
      damageIcon = '/Force.png';
      critEffect = 'Shock';
      break;
    case 'Meteor':
      damageType = 'Bludgeoning';
      damageColor = '#915927';
      damageIcon = '/Bludgeoning.png';
      critEffect = 'Slam 4hx';
      break;
    case 'Tremor':
      damageType = 'Bludgeoning';
      damageColor = '#915927';
      damageIcon = '/Bludgeoning.png';
      critEffect = 'Restrain';
      break;
    case 'Fireball':
      damageType = 'Fire';
      damageColor = '#f90102';
      damageIcon = '/Fire.png';
      critEffect = 'Ignite';
      break;
    case 'Lava Well':
      damageType = 'Fire';
      damageColor = '#f90102';
      damageIcon = '/Fire.png';
      critEffect = 'Dangerous Terrain (1d6 Fire)';
      break;
    case 'Frostbite':
      damageType = 'Cold';
      damageColor = '#3ebbff';
      damageIcon = '/Cold.png';
      critEffect = 'Freeze';
      break;
    case 'Vortex':
      damageType = 'Cold';
      damageColor = '#3ebbff';
      damageIcon = '/Cold.png';
      critEffect = 'Pull 3hx';
      break;
    default:
      // Generic display
      damageType = subclass === 'Air' ? 'Force' : subclass === 'Earth' ? 'Bludgeoning' : subclass === 'Fire' ? 'Fire' : subclass === 'Water' ? 'Cold' : '';
      damageColor = subclass === 'Air' ? '#516fff' : subclass === 'Earth' ? '#915927' : subclass === 'Fire' ? '#f90102' : subclass === 'Water' ? '#3ebbff' : '#000';
      damageIcon = subclass === 'Air' ? '/Force.png' : subclass === 'Earth' ? '/Bludgeoning.png' : subclass === 'Fire' ? '/Fire.png' : subclass === 'Water' ? '/Cold.png' : '';
      critEffect = '';
  }
  
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> <b>[{range}]</b>hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> <i>AoE</i> 1hx-radius<br />
        {damageType ? (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: damageColor, display: 'inline-flex', alignItems: 'center' }}>
            {damageType}<img src={damageIcon} alt={damageType} style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
            {critEffect && (
              <>
                <br />
                <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6 <b><u style={{ color: damageColor, display: 'inline-flex', alignItems: 'center' }}>
                {damageType}<img src={damageIcon} alt={damageType} style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,<br />
                <span style={{ textAlign: 'right', width: '100%', display: 'block' }}><b><i>{critEffect}</i></b></span>
              </>
            )}
          </>
        ) : (
          <>
            <b><u>Damage</u></b> <b>[{damageDice}]</b>d6
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

/**
 * Generate the full primary attack description for level up/character sheet
 */
export function generateElementalistPrimaryAttackDescriptionJSX(
  classCardDots?: boolean[][],
  subclass?: string
): React.ReactElement {
  const { damageDice, range, critThreshold } = calculateElementalistPrimaryAttackData(classCardDots);
  
  // Determine damage type and icon based on subclass
  let damageType = '';
  let damageColor = '';
  let damageIcon = '';
  
  switch (subclass) {
    case 'Air':
      damageType = 'Force';
      damageColor = '#516fff';
      damageIcon = '/Force.png';
      break;
    case 'Earth':
      damageType = 'Bludgeoning';
      damageColor = '#915927';
      damageIcon = '/Bludgeoning.png';
      break;
    case 'Fire':
      damageType = 'Fire';
      damageColor = '#f90102';
      damageIcon = '/Fire.png';
      break;
    case 'Water':
      damageType = 'Cold';
      damageColor = '#3ebbff';
      damageIcon = '/Cold.png';
      break;
    default:
      damageType = '';
      damageColor = '#000';
      damageIcon = '';
  }
  
  return (
    <span style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <i>Shards.</i> <b>[{range}]</b>hx Range, <i>AoE</i> 1hx-radius, <b>[{critThreshold}]</b>+ Crit, <b>[{damageDice}]</b>d6 Damage{damageType && (
        <>
          {' '}<b><u style={{ color: damageColor, display: 'inline-flex', alignItems: 'center' }}>
            {damageType}<img src={damageIcon} alt={damageType} style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
          </u></b>
        </>
      )}.
    </span>
  );
}
