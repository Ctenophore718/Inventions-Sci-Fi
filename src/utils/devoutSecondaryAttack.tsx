import React from 'react';

export interface DevoutSecondaryAttackData {
  damageDiceDots: number;
  aoeDots: number;
  critDots: number;
  cooldownDots: number;
  damageDice: number;
  aoeRadius: number;
  critThreshold: number;
  cooldown: number;
}

/**
 * Calculate Devout secondary attack values based on class card dots
 */
export function calculateDevoutSecondaryAttackData(classCardDots?: boolean[][]): DevoutSecondaryAttackData {
  // Get +1 Damage die dots (array index 6)
  const damageDiceDots = classCardDots?.[6]?.filter(Boolean).length || 0;
  // Get +1hx-Cone AoE dots (array index 7)
  const aoeDots = classCardDots?.[7]?.filter(Boolean).length || 0;
  // Get +1 Crit dots (array index 8)
  const critDots = classCardDots?.[8]?.filter(Boolean).length || 0;
  // Get -1 Cooldown dots (array index 9)
  const cooldownDots = classCardDots?.[9]?.filter(Boolean).length || 0;
  
  // Calculate damage dice: base 1, +1 per dot
  const damageDice = 1 + damageDiceDots;
  // Calculate AoE radius: base 3, +1 per dot
  const aoeRadius = 3 + aoeDots;
  // Calculate crit threshold: 18 minus crit dots
  const critThreshold = 18 - critDots;
  // Calculate cooldown: base 4, minus cooldown dots
  const cooldown = 4 - cooldownDots;
  
  return { damageDiceDots, aoeDots, critDots, cooldownDots, damageDice, aoeRadius, critThreshold, cooldown };
}

/**
 * Generate the secondary attack stats for Devout Relic cards
 */
export function generateDevoutSecondaryAttackStatsJSX(
  classCardDots?: boolean[][],
  cost?: number,
  relicName?: string
): React.ReactElement {
  const { damageDice, aoeRadius, critThreshold, cooldown } = calculateDevoutSecondaryAttackData(classCardDots);
  
  // Determine damage type and icon based on relic name
  let damageType = '';
  let damageIcon = '';
  let damageColor = '';
  
  if (relicName === 'Astral Prism') {
    damageType = 'Force';
    damageIcon = '/Force.png';
    damageColor = '#516fff';
  } else if (relicName === 'Chaos Orb') {
    damageType = 'Neural';
    damageIcon = '/Neural.png';
    damageColor = '#a929ff';
  } else if (relicName === 'Order Seal') {
    damageType = 'Electric';
    damageIcon = '/Electric.png';
    damageColor = '#ffe700';
  } else if (relicName === 'Void Crystal') {
    damageType = 'Cold';
    damageIcon = '/Cold.png';
    damageColor = '#3ebbff';
  }
  
  return (
    <div style={{ fontSize: '1em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 1hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}>Crit <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> <i>AoE</i> <b>[{aoeRadius}]</b>hx-Cone
      </div>
      <div>
        <b><u>Damage</u></b> <b>[{damageDice}]</b>d6, status effect
      </div>
      <div>
        <b><u>Crit Effect</u></b> <b>[{damageDice}]</b>d6, status effect
      </div>
    </div>
  );
}

/**
 * Generate the secondary attack description for Devout cards
 */
export function generateDevoutSecondaryAttackDescriptionJSX(relicName?: string): React.ReactElement {
  if (relicName === 'Astral Prism') {
    return (
      <div style={{ fontSize: '0.75em', fontStyle: 'italic', marginTop: '4px' }}>
        You unleash a prism of astral light that explodes in a cone, battering all enemies with force damage.
      </div>
    );
  } else if (relicName === 'Chaos Orb') {
    return (
      <div style={{ fontSize: '0.75em', fontStyle: 'italic', marginTop: '4px' }}>
        You hurl an orb of pure chaos that detonates, overwhelming the minds of all in its path with neural energy.
      </div>
    );
  } else if (relicName === 'Order Seal') {
    return (
      <div style={{ fontSize: '0.75em', fontStyle: 'italic', marginTop: '4px' }}>
        You invoke a seal of divine order, releasing a wave of electric judgment across your enemies.
      </div>
    );
  } else if (relicName === 'Void Crystal') {
    return (
      <div style={{ fontSize: '0.75em', fontStyle: 'italic', marginTop: '4px' }}>
        You activate a void crystal, unleashing a cone of absolute cold that freezes all caught within.
      </div>
    );
  }
  
  return <></>;
}
