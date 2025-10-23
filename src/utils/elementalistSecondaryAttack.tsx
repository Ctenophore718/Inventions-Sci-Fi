import React from 'react';

export interface ElementalistSecondaryAttackData {
  range: number;
  repeatValue: number;
  speed: number;
  critThreshold: number;
  summonHitPoints: number;
  cooldown: number;
}

/**
 * Calculate Elementalist secondary attack values based on class card dots
 */
export function calculateElementalistSecondaryAttackData(classCardDots?: boolean[][]): ElementalistSecondaryAttackData {
  // Get +1hx Range dots (array index 7)
  const rangeDots = classCardDots?.[7]?.filter(Boolean).length || 0;
  const range = rangeDots; // Base 0, +1 per dot (uses (x) notation)
  
  // Get Repeat +1 dots (array index 8)
  const repeatDots = classCardDots?.[8]?.filter(Boolean).length || 0;
  const repeatValue = repeatDots; // Base 0, +1 per dot (uses (x) notation)
  
  // Get +2hx Speed dots (array index 9)
  const speedDots = classCardDots?.[9]?.filter(Boolean).length || 0;
  const speed = speedDots * 2; // Base 0, +2 per dot (uses (x) notation)
  
  // Get +1 Crit dots (array index 10)
  const critDots = classCardDots?.[10]?.filter(Boolean).length || 0;
  const critThreshold = 18 - critDots; // Base 18, -1 per dot
  
  // Get Summon +5 Hit Points dots (array index 11)
  const summonHpDots = classCardDots?.[11]?.filter(Boolean).length || 0;
  const summonHitPoints = summonHpDots * 5; // Base 0, +5 per dot
  
  // Get -1 Cooldown dots (array index 12)
  const cooldownDots = classCardDots?.[12]?.filter(Boolean).length || 0;
  const cooldown = Math.max(2, 4 - cooldownDots); // Base 4, -1 per dot, minimum 2
  
  return { range, repeatValue, speed, critThreshold, summonHitPoints, cooldown };
}

/**
 * Generate the secondary attack stats for Elementalist cards
 */
export function generateElementalistSecondaryAttackStatsJSX(
  classCardDots?: boolean[][],
  subclass?: string
): React.ReactElement {
  const { range, repeatValue, speed, critThreshold, summonHitPoints } = calculateElementalistSecondaryAttackData(classCardDots);
  
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
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> <b>[{range > 0 ? range : 'x'}]</b>hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> Single Target<br />
        <b><u>Repeat</u></b> <b>[{repeatValue > 0 ? repeatValue : 'x'}]</b><br />
        {damageType ? (
          <>
            <b><u>Damage</u></b> <b>[{range > 0 ? range : 'x'}]</b>d6 <b><u style={{ color: damageColor, display: 'inline-flex', alignItems: 'center' }}>
            {damageType}<img src={damageIcon} alt={damageType} style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
          </>
        ) : (
          <>
            <b><u>Damage</u></b> <b>[{range > 0 ? range : 'x'}]</b>d6
          </>
        )}
        <br />
        <b><i>Summon</i></b> Stats:<br />
        <span style={{ paddingLeft: '8px' }}>
          <b><u>Hit Points</u></b> <b>[{summonHitPoints > 0 ? summonHitPoints : 'x'}]</b><br />
          <b><u>Speed</u></b> <b>[{speed > 0 ? speed : 'x'}]</b>hx<br />
          <b><u>Armor</u></b> 0
        </span>
      </div>
    </div>
  );
}

/**
 * Generate the full secondary attack description for level up/character sheet
 */
export function generateElementalistSecondaryAttackDescriptionJSX(
  classCardDots?: boolean[][],
  subclass?: string
): React.ReactElement {
  const { range, repeatValue, speed, critThreshold, summonHitPoints, cooldown } = calculateElementalistSecondaryAttackData(classCardDots);
  
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
  
  const displayRange = range > 0 ? range.toString() : 'x';
  const displayRepeat = repeatValue > 0 ? repeatValue.toString() : 'x';
  const displaySpeed = speed > 0 ? speed.toString() : 'x';
  const displayHp = summonHitPoints > 0 ? summonHitPoints.toString() : 'x';
  
  return (
    <span style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <i>Elementals</i> (Cooldown <b>[{cooldown}]</b>). <b><i>Summon</i></b>, (<b>{displayRange}</b>) Range, Single Target, Repeat (<b>{displayRepeat}</b>), <b>[{critThreshold}]</b>+ Crit, (<b>{displayRange}</b>) Damage{damageType && (
        <>
          {' '}<b><u style={{ color: damageColor, display: 'inline-flex', alignItems: 'center' }}>
            {damageType}<img src={damageIcon} alt={damageType} style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
          </u></b>
        </>
      )}. <b><i>Summon</i></b> has (<b>{displayHp}</b>) <b><i><span style={{ color: '#990000' }}>Hit Points</span></i></b>, (<b>{displaySpeed}</b>)hx <b><i><span style={{ color: '#38761d' }}>Speed</span></i></b>, and 0 <b><i><span style={{ color: '#134f5c' }}>Armor</span></i></b>.
    </span>
  );
}
