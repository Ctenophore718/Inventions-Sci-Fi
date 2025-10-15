import React from 'react';

export interface TyrantSecondaryAttackData {
  damageBonus: number;
  critThreshold: number;
  cooldown: number;
}

/**
 * Calculate Tyrant Secondary Attack values based on progression dots
 */
export function calculateTyrantSecondaryAttackData(
  damageDots?: boolean[],
  critDots?: boolean[],
  cooldownDots?: boolean[]
): TyrantSecondaryAttackData {
  // Base damage is 1d6, can add up to 3 more dice
  const damageBonus = 1 + (damageDots?.filter(Boolean).length || 0);
  
  // Base crit is 18, can reduce by up to 3
  const critThreshold = 18 - (critDots?.filter(Boolean).length || 0);
  
  // Base cooldown is 4, can reduce by 2
  const cooldown = 4 - (cooldownDots?.filter(Boolean).length || 0);
  
  return { damageBonus, critThreshold, cooldown };
}

/**
 * Generate the Tyrant Secondary Attack (Blasters) JSX with dynamic values
 */
export function generateTyrantSecondaryAttackJSX(
  damageDots?: boolean[],
  critDots?: boolean[],
  cooldownDots?: boolean[]
): React.ReactElement {
  const { damageBonus, critThreshold } = calculateTyrantSecondaryAttackData(damageDots, critDots, cooldownDots);

  return (
    <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      Blasters
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span>
          <b><u>Range</u></b> 1hx
        </span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}>
          <b><u>Crit</u></b> <b>[{critThreshold}]</b>+
        </span>
      </div>
      <b><u>Target</u></b> <i>AoE</i> <b>[4]</b>hx-Cone <br />
      <b><u>Damage</u></b> <b>[{damageBonus}]</b>d6, status effect <br />
      <b><u>Crit Effect</u></b> <b>[{damageBonus}]</b>d6
    </div>
  );
}

/**
 * Generate stats JSX for Tyrant Secondary Attack (for card display)
 */
export function generateTyrantSecondaryAttackStatsJSX(
  damageDots?: boolean[],
  critDots?: boolean[],
  cooldownDots?: boolean[],
  blasterName?: string
): React.ReactElement {
  const { damageBonus, critThreshold } = calculateTyrantSecondaryAttackData(damageDots, critDots, cooldownDots);

  // You can add specific blaster effects here if needed
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 1hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> <i>AoE</i> <b>[4]</b>hx-Cone <br />
        <b><u>Damage</u></b> <b>[{damageBonus}]</b>d6, status effect <br />
        <b><u>Crit Effect</u></b> <b>[{damageBonus}]</b>d6
      </div>
    </div>
  );
}
