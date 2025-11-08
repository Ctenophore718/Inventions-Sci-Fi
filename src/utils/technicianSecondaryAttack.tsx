import React from 'react';

export interface TechnicianSecondaryAttackData {
  range: number;
  targetAoE: number;
  critThreshold: number;
  cooldown: number;
}

/**
 * Calculate Technician secondary attack values based on class card dots
 */
export function calculateTechnicianSecondaryAttackData(classCardDots?: boolean[][]): TechnicianSecondaryAttackData {
  // Get Range dots (array index 6)
  const rangeDots = classCardDots?.[6]?.filter(Boolean).length || 0;
  // Get AoE dots (array index 7)
  const aoeDots = classCardDots?.[7]?.filter(Boolean).length || 0;
  // Get crit dots (array index 9)
  const critDots = classCardDots?.[9]?.filter(Boolean).length || 0;
  // Get cooldown dots (array index 10)
  const cooldownDots = classCardDots?.[10]?.filter(Boolean).length || 0;
  
  // Calculate values
  const range = 3 + rangeDots; // Base 3 + 1 per dot
  const targetAoE = 5 + aoeDots; // Base 5 + 1 per dot
  const critThreshold = 18 - critDots; // Base 18 - 1 per dot
  const cooldown = Math.max(1, 4 - cooldownDots); // Base 4 - 1 per dot, minimum 1
  
  return { range, targetAoE, critThreshold, cooldown };
}

/**
 * Generate the secondary attack stats for Tech Pulse cards
 */
export function generateTechnicianSecondaryAttackStatsJSX(
  classCardDots?: boolean[][],
  _subclass?: string,
  techPulseName?: string
): React.ReactElement {
  const { targetAoE, critThreshold } = calculateTechnicianSecondaryAttackData(classCardDots);
  
  // Get Drone Self dot (array index 8)
  const droneSelfDot = classCardDots?.[8]?.[0] || false;
  const rangeDisplay = droneSelfDot ? 'Drone Self' : ' - ';
  
  return (
    <div style={{ fontSize: '0.85em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      {techPulseName === 'Cloaker Bubble' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span><b><u>Range</u></b> Self or <b>[{rangeDisplay}]</b></span>
            <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
          </div>
          <div>
            <b><u>Target</u></b> <i>AoE</i> <b>[{targetAoE}]</b>hx-Radius
          </div>
          <div>
            <b><u>Effect</u></b> Invisibility field
          </div>
          <div>
            <b><u>Crit Effect</u></b> Extended invisibility
          </div>
        </>
      ) : techPulseName === 'Shrap Happy' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span><b><u>Range</u></b> Self or <b>[{rangeDisplay}]</b></span>
            <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
          </div>
          <div>
            <b><u>Target</u></b> <i>AoE</i> <b>[{targetAoE}]</b>hx-Radius
          </div>
          <div>
            <b><u>Damage</u></b> <b>[2]</b>d8 <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>
          </div>
          <div>
            <b><u>Crit Effect</u></b> <b>[2]</b>d8 <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Bleed</i></b></span>
          </div>
        </>
      ) : techPulseName === 'Swarm Surge' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span><b><u>Range</u></b> Self or <b>[{rangeDisplay}]</b></span>
            <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
          </div>
          <div>
            <b><u>Target</u></b> <i>AoE</i> <b>[{targetAoE}]</b>hx-Radius
          </div>
          <div>
            <b><u>Damage</u></b> <b>[1]</b>d10 <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b></span>
          </div>
          <div>
            <b><u>Crit Effect</u></b> <b>[1]</b>d10 <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Restrain</i></b></span>
          </div>
        </>
      ) : techPulseName === 'Rubblemaker' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span><b><u>Range</u></b> Self or <b>[{rangeDisplay}]</b></span>
            <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
          </div>
          <div>
            <b><u>Target</u></b> <i>AoE</i> <b>[{targetAoE}]</b>hx-Radius
          </div>
          <div>
            <b><u>Damage</u></b> <b>[2]</b>d10 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Slam</i></b> 3hx</span>
          </div>
          <div>
            <b><u>Crit Effect</u></b> <b>[2]</b>d10 <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
            Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>,
            <span style={{ display: 'block', textAlign: 'right' }}><b><i>Demoralize</i></b></span>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span><b><u>Range</u></b> Self or <b>[{rangeDisplay}]</b></span>
            <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
          </div>
          <div>
            <b><u>Target</u></b> <i>AoE</i> <b>[{targetAoE}]</b>hx-Radius
          </div>
          <div>
            <b><u>Damage</u></b> <b>[1]</b>d8
          </div>
          <div>
            <b><u>Crit Effect</u></b> <b>[1]</b>d8
          </div>
        </>
      )}
    </div>
  );
}
