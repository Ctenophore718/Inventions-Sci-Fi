import React from 'react';

export interface ExospecialistSecondaryAttackData {
  damageDieSize: number;
  repeatValue: number;
  range: number;
  critThreshold: number;
  cooldown: number;
}

/**
 * Calculate Exospecialist secondary attack values based on class card dots
 */
export function calculateExospecialistSecondaryAttackData(classCardDots?: boolean[][]): ExospecialistSecondaryAttackData {
  // Get '+1hx Damage die' dots (array index 6)
  const damageDieDots = classCardDots?.[6]?.filter(Boolean).length || 0;
  const damageDieSize = 4 + damageDieDots; // Base d4, +1 per dot (d4 -> d5 -> d6 -> d7)
  
  // Get 'Repeat +1' dots (array index 7)
  const repeatDots = classCardDots?.[7]?.filter(Boolean).length || 0;
  const repeatValue = 1 + repeatDots; // Base 1, +1 per dot
  
  // Get '+3hx Range' dots (array index 8)
  const rangeDots = classCardDots?.[8]?.filter(Boolean).length || 0;
  const range = 12 + (rangeDots * 3); // Base 12, +3 per dot
  
  // Get '+1 Crit' dots (array index 9)
  const critDots = classCardDots?.[9]?.filter(Boolean).length || 0;
  const critThreshold = 18 - critDots; // Base 18, -1 per dot
  
  // Get '-1 Cooldown' dots (array index 10)
  const cooldownDots = classCardDots?.[10]?.filter(Boolean).length || 0;
  const cooldown = Math.max(2, 4 - cooldownDots); // Base 4, -1 per dot, minimum 2
  
  return { damageDieSize, repeatValue, range, critThreshold, cooldown };
}

/**
 * Generate the secondary attack JSX (for use in Level Up page)
 */
export function generateExospecialistSecondaryAttackJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { damageDieSize, repeatValue, range, critThreshold, cooldown } = calculateExospecialistSecondaryAttackData(classCardDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      <i><b>Secondary <span style={{ color: '#990000' }}>Attack</span></b> (Cooldown <b>[{cooldown}]</b>).</i><br />
      <i>Smart Missiles.</i> <b>[{range}]</b>hx Range, Single Target, Arcing, Repeat <b>[{repeatValue}]</b>, <b>[{critThreshold}]</b>+ Crit, 1d{damageDieSize} Damage.
    </span>
  );
}

/**
 * Generate the secondary attack stats for Exospecialist Smart Missiles cards
 */
export function generateExospecialistSecondaryAttackStatsJSX(
  classCardDots?: boolean[][],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _subclass?: string,
  missileName?: string
): React.ReactElement {
  const { damageDieSize, repeatValue, range, critThreshold } = calculateExospecialistSecondaryAttackData(classCardDots);
  
  return (
    <div style={{ fontSize: '0.85em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> <b>[{range}]</b>hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        {missileName === 'Neutron Torpedo' ? (
          <>
            <b><u>Target</u></b> Single, <i>Arcing</i>, <i>Repeat</i> <b>[{repeatValue}]</b><br />
            <b><u>Damage</u></b> <b>[1]</b>d{damageDieSize} <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Blind</i></b></span>
            <b><u>Crit Effect</u></b> <b>[1]</b>d{damageDieSize} <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
          </>
        ) : missileName === 'Pulsar Cannon' ? (
          <>
            <b><u>Target</u></b> Single, <i>Arcing</i>, <i>Repeat</i> <b>[{repeatValue}]</b><br />
            <b><u>Damage</u></b> <b>[1]</b>d{damageDieSize} <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Confuse</i></b><br />
            <b><u>Crit Effect</u></b> <b>[1]</b>d{damageDieSize} <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Bounce</i></b> 5hx</span>
          </>
        ) : missileName === 'Razor Rain' ? (
          <>
            <b><u>Target</u></b> Single, <i>Arcing</i>, <i>Repeat</i> <b>[{repeatValue}]</b><br />
            <b><u>Damage</u></b> <b>[1]</b>d{damageDieSize} <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#575757', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Bleed</i></b></span>
            <b><u>Crit Effect</u></b> <b>[1]</b>d{damageDieSize} <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> or <b><u style={{ color: '#575757', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} /></u></b>, <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Bleed</i></b></span>
          </>
        ) : (
          <>
            <b><u>Target</u></b> Single, <i>Arcing</i>, <i>Repeat</i> <b>[{repeatValue}]</b><br />
            <b><u>Damage</u></b> <b>[1]</b>d{damageDieSize}<br />
            <b><u>Crit Effect</u></b> <b>[1]</b>d{damageDieSize}, status effect
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Get the Smart Missile cost
 */
export function getSmartMissileCost(missileName: string): number {
  switch (missileName) {
    case 'Neutron Torpedo': return 215;
    case 'Pulsar Cannon': return 225;
    case 'Razor Rain': return 250;
    default: return 0;
  }
}
