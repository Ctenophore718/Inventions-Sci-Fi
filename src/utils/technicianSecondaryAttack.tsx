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
            <b><u>Effect</u></b> Allies gain 50% Cover until <br />
            <span style={{ display: 'block', textAlign: 'right' }}>the beginning of the next turn</span>
          </div>
          <div>
            <b><u>Crit Effect</u></b> Allies cannot be targeted until <br />
            <span style={{ display: 'block', textAlign: 'right' }}>the beginning of the next turn</span>
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
            <b><u>Effect</u></b> Enemies suffer <i><b>Spike</b></i> <br />
            <span style={{ display: 'block', textAlign: 'right' }}><b>(</b><b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> </span>
          </div>
          <div>
            <b><u>Crit Effect</u></b> Enemies suffer two more <br />
            <span style={{ display: 'block', textAlign: 'right' }}>instances of <i><b>Spike</b></i> <b>(</b><b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> </span>
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
            <b><u>Effect</u></b> Push or Pull all creatures up to <i>AoE</i> <br />
            <span style={{ display: 'block', textAlign: 'right' }}>Radius hx (counts as <b><i>Slam</i></b>)</span>
          </div>
          <div>
            <b><u>Crit Effect</u></b> Counts as <b><i>Bounce</i></b> and <br />
            <span style={{ display: 'block', textAlign: 'right' }}>ignores <b><i>Slam</i></b> and <b><i>Bounce</i></b> <i>Immunity</i></span>
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
            <b><u>Effect</u></b> <i>AoE</i> becomes <i>Rough Terrain</i> for <br />
            <span style={{ display: 'block', textAlign: 'right' }}>your enemies until the end of the battle</span>
          </div>
          <div>
            <b><u>Crit Effect</u></b> <i>AoE</i> becomes <i>Dangerous</i> <br />
            <span style={{ display: 'block', textAlign: 'right' }}><i>Terrain</i> <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
            Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b> for enemies</span>
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
