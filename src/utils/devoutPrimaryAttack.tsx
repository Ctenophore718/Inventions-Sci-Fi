import React from 'react';

export interface DevoutPrimaryAttackData {
  dieSizeDots: number;
  critDots: number;
  dieSize: number;
  critThreshold: number;
}

/**
 * Calculate Devout primary attack values based on class card dots
 */
export function calculateDevoutPrimaryAttackData(classCardDots?: boolean[][]): DevoutPrimaryAttackData {
  // Get die size dots (array index 4 - "Increase die size")
  const dieSizeDots = classCardDots?.[4]?.filter(Boolean).length || 0;
  // Get crit dots in Primary Attack section (array index 5 - "+1 Crit")
  const critDots = classCardDots?.[5]?.filter(Boolean).length || 0;
  
  // Calculate die size: base 6, +2 per dot
  const dieSize = 6 + dieSizeDots * 2;
  // Calculate crit threshold: 18 minus crit dots
  const critThreshold = 18 - critDots;
  
  return { dieSizeDots, critDots, dieSize, critThreshold };
}

/**
 * Generate the primary attack stats for Devout Incantation cards
 */
export function generateDevoutPrimaryAttackStatsJSX(
  classCardDots?: boolean[][],
  cost?: number,
  incantationName?: string
): React.ReactElement {
  const { dieSize, critThreshold } = calculateDevoutPrimaryAttackData(classCardDots);
  
  // Determine damage type and icon based on incantation name
  let damageType = '';
  let damageIcon = '';
  let damageColor = '';
  
  if (incantationName === 'Astral Bolt') {
    damageType = 'Force';
    damageIcon = '/Force.png';
    damageColor = '#516fff';
  } else if (incantationName === 'Chaos Vortex') {
    damageType = 'Neural';
    damageIcon = '/Neural.png';
    damageColor = '#a929ff';
  } else if (incantationName === 'Order Strike') {
    damageType = 'Electric';
    damageIcon = '/Electric.png';
    damageColor = '#ffe700';
  } else if (incantationName === 'Void Beam') {
    damageType = 'Cold';
    damageIcon = '/Cold.png';
    damageColor = '#3ebbff';
  }
  
  return (
    <div style={{ fontSize: '1em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 10hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> Single, Arcing<br />
        <b><u>Damage</u></b> 1d<b>[{dieSize}]</b> <b><u style={{ color: damageColor, display: 'inline-flex', alignItems: 'center' }}>
          {damageType}<img src={damageIcon} alt={damageType} style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
        </u></b>
        {cost !== undefined && (
          <span style={{ float: 'right', color: '#bf9000', fontWeight: 'bold' }}>{cost}c</span>
        )}
      </div>
    </div>
  );
}

/**
 * Generate the primary attack description for Devout cards
 */
export function generateDevoutPrimaryAttackDescriptionJSX(incantationName?: string): React.ReactElement {
  if (incantationName === 'Astral Bolt') {
    return (
      <div style={{ fontSize: '0.75em', fontStyle: 'italic', marginTop: '4px' }}>
        You channel astral energy to launch a bolt of pure force at your enemy, dealing unrelenting damage.
      </div>
    );
  } else if (incantationName === 'Chaos Vortex') {
    return (
      <div style={{ fontSize: '0.75em', fontStyle: 'italic', marginTop: '4px' }}>
        You summon a chaotic vortex that disrupts the target's mind, dealing neural damage and sowing confusion.
      </div>
    );
  } else if (incantationName === 'Order Strike') {
    return (
      <div style={{ fontSize: '0.75em', fontStyle: 'italic', marginTop: '4px' }}>
        You invoke the power of order, channeling precise electric energy to strike your foe with divine judgment.
      </div>
    );
  } else if (incantationName === 'Void Beam') {
    return (
      <div style={{ fontSize: '0.75em', fontStyle: 'italic', marginTop: '4px' }}>
        You draw upon the void's frigid emptiness, firing a beam of absolute cold that freezes your enemy.
      </div>
    );
  }
  
  return <></>;
}
