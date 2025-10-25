import React from 'react';

export interface ElementalistSecondaryAttackData {
  range: number;
  repeatValue: number;
  speed: number;
  critThreshold: number;
  summonHitPoints: number;
  cooldown: number;
}

export interface ElementalBaseStats {
  hitPoints: number;
  speed: number;
  range: number;
  repeat: number;
}

/**
 * Get base stats for each elemental
 */
export function getElementalBaseStats(elementalName: string): ElementalBaseStats {
  switch (elementalName) {
    case 'Cloud Elemental': return { hitPoints: 15, speed: 6, range: 5, repeat: 0 };
    case 'Thunderbird': return { hitPoints: 10, speed: 7, range: 6, repeat: 1 };
    case 'Sandstorm': return { hitPoints: 10, speed: 7, range: 6, repeat: 1 };
    case 'Stone Golem': return { hitPoints: 20, speed: 4, range: 4, repeat: 0 };
    case 'Magmoid': return { hitPoints: 15, speed: 6, range: 6, repeat: 1 };
    case 'Sludge Brute': return { hitPoints: 15, speed: 6, range: 5, repeat: 0 };
    case 'Fire Dragon': return { hitPoints: 20, speed: 6, range: 6, repeat: 0 };
    case 'Firefox': return { hitPoints: 15, speed: 7, range: 6, repeat: 0 };
    case 'Phoenix': return { hitPoints: 15, speed: 5, range: 6, repeat: 1 };
    case 'Salamander': return { hitPoints: 20, speed: 4, range: 5, repeat: 0 };
    case 'Ice Golem': return { hitPoints: 20, speed: 4, range: 4, repeat: 0 };
    case 'Water Horse': return { hitPoints: 15, speed: 8, range: 5, repeat: 0 };
    case 'Water Panda': return { hitPoints: 20, speed: 5, range: 5, repeat: 0 };
    case 'Wave Elemental': return { hitPoints: 15, speed: 6, range: 7, repeat: 0 };
    default: return { hitPoints: 15, speed: 6, range: 5, repeat: 0 };
  }
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
 * Generate the secondary attack stats for Elementalist Elemental cards
 */
export function generateElementalistSecondaryAttackStatsJSX(
  classCardDots?: boolean[][],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _subclass?: string,
  elementalName?: string
): React.ReactElement {
  const { range, repeatValue, speed, critThreshold, summonHitPoints } = calculateElementalistSecondaryAttackData(classCardDots);
  
  // Get base stats for this elemental
  const baseStats = getElementalBaseStats(elementalName || '');
  
  // Calculate final stats
  const finalHitPoints = baseStats.hitPoints + summonHitPoints;
  const finalSpeed = baseStats.speed + speed;
  const finalRange = baseStats.range + range;
  const finalRepeat = baseStats.repeat + repeatValue;
  
  // Helper function to get speed type for each elemental
  const getSpeedType = (name: string): string => {
    switch (name) {
      case 'Cloud Elemental':
      case 'Thunderbird':
      case 'Sandstorm':
      case 'Fire Dragon':
      case 'Phoenix':
        return 'Fly';
      case 'Magmoid':
      case 'Firefox':
        return 'Lavawalk';
      case 'Salamander':
        return 'Swim, Lavawalk';
      case 'Sludge Brute':
      case 'Ice Golem':
      case 'Water Horse':
      case 'Water Panda':
      case 'Wave Elemental':
        return 'Swim';
      default:
        return '';
    }
  };

  const speedType = getSpeedType(elementalName || '');
  
  return (
    <div style={{ fontSize: '0.85em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Summon</u></b> <b>[{finalHitPoints}]</b> <b><i style={{ color: '#990000' }}>Hit Points</i></b></span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <u><b><i><span style={{ color: '#38761d' }}>Speed</span></i></b></u> <b>[{finalSpeed}]</b>hx{speedType && <>, <b><i style={{ color: '#38761d' }}>{speedType}</i></b></>}<br />
        {elementalName === 'Cloud Elemental' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d10 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Mesmerize</i></b></span>
            <b><u>Crit Effect</u></b> 2d10 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Confuse</i></b>
          </>
        ) : elementalName === 'Fire Dragon' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d12 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Mesmerize</i></b><br />
            <b><u>Crit Effect</u></b> 2d12 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b>
          </>
        ) : elementalName === 'Firefox' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d10 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, 
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
            <b><u>Crit Effect</u></b> 2d10 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b> or <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
          </>
        ) : elementalName === 'Ice Golem' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d10 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or 
            <span style={{ display: 'block', textAlign: 'right' }}><b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
            <b><u>Crit Effect</u></b> 2d10 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or 
            <span style={{ display: 'block', textAlign: 'right' }}><b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Slam</i></b> 3hx</span>
          </>
        ) : elementalName === 'Magmoid' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d8 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b> or <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, 
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
            <b><u>Crit Effect</u></b> 2d8 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b> or
            <span style={{ display: 'block', textAlign: 'right' }}><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
          </>
        ) : elementalName === 'Sandstorm' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d8 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or
            <span style={{ display: 'block', textAlign: 'right' }}><b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Bounce</i></b> 5hx</span>
            <b><u>Crit Effect</u></b> 2d8 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or
            <span style={{ display: 'block', textAlign: 'right' }}><b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Blind</i></b></span>
          </>
        ) : elementalName === 'Phoenix' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d8 <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, 
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Mesmerize</i></b></span>
            <b><u>Crit Effect</u></b> 2d8 <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>,
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Confuse</i></b></span>
          </>
        ) : elementalName === 'Salamander' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d12 <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Restrain</i></b></span>
            <b><u>Crit Effect</u></b> 2d12 <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
            Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>,
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
          </>
        ) : elementalName === 'Stone Golem' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d12 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Slam</i></b> 3hx<br />
            <b><u>Crit Effect</u></b> 2d12 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, 
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Slam</i></b> 3hx</span>
          </>
        ) : elementalName === 'Sludge Brute' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d10 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or
            <span style={{ display: 'block', textAlign: 'right' }}><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Demoralize</i></b></span>
            <b><u>Crit Effect</u></b> 2d10 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or
            <span style={{ display: 'block', textAlign: 'right' }}><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
          </>
        ) : elementalName === 'Thunderbird' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d8 <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Blind</i></b></span>
            <b><u>Crit Effect</u></b> 2d8 <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
          </>
        ) : elementalName === 'Water Horse' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d10 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Blind</i></b><br />
            <b><u>Crit Effect</u></b> 2d10 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <b><i>Restrain</i></b>
          </>
        ) : elementalName === 'Water Panda' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d12 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or 
            <span style={{ display: 'block', textAlign: 'right' }}><b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Restrain</i></b></span>
            <b><u>Crit Effect</u></b> 2d12 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or 
            <span style={{ display: 'block', textAlign: 'right' }}><b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Bounce</i></b> 3hx</span>
          </>
        ) : elementalName === 'Wave Elemental' ? (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> 2d10 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Bounce</i></b> 3hx</span>
            <b><u>Crit Effect</u></b> 2d10 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Mesmerize</i></b>
          </>
        ) : (
          <>
            <b><u>Range</u></b> <b>[{finalRange}]</b>hx<br />
            <b><u>Target</u></b> Single, Repeat <b>[{finalRepeat}]</b><br />
            <b><u>Damage</u></b> (<b>[{range > 0 ? range : 'x'}]</b>) + 1d6<br />
            <b><u>Crit Effect</u></b> (<b>[{range > 0 ? range : 'x'}]</b>) + 1d6
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Get the elemental cost
 */
export function getElementalCost(elementalName: string): number {
  switch (elementalName) {
    case 'Cloud Elemental': return 300;
    case 'Fire Dragon': return 310;
    case 'Firefox': return 300;
    case 'Ice Golem': return 300;
    case 'Magmoid': return 300;
    case 'Sandstorm': return 300;
    case 'Phoenix': return 325;
    case 'Salamander': return 300;
    case 'Stone Golem': return 300;
    case 'Sludge Brute': return 300;
    case 'Thunderbird': return 325;
    case 'Water Horse': return 295;
    case 'Water Panda': return 295;
    case 'Wave Elemental': return 300;
    default: return 0;
  }
}
