import React from 'react';

export interface TacticianSecondaryAttackData {
  aoe: number;
  crit: number;
  cooldown: number;
}

/**
 * Calculate Tactician Secondary Attack values based on progression dots
 */
export function calculateTacticianSecondaryAttackData(
  aoeDots?: boolean[],
  critDots?: boolean[],
  cooldownDots?: boolean[],
  tacticalOffensiveCritDots?: boolean[]
): TacticianSecondaryAttackData {
  // Base AoE is 2hx-radius
  const aoe = 2 + (aoeDots?.filter(Boolean).length || 0);
  
  // Base crit is 18, can reduce by up to 3 from attack dots, plus Tactical Offensive bonus (base +1, plus +1 per dot)
  const attackCritBonus = critDots?.filter(Boolean).length || 0;
  const featureCritBonus = 1 + (tacticalOffensiveCritDots?.filter(Boolean).length || 0);
  const crit = 18 - attackCritBonus - featureCritBonus;
  
  // Base cooldown is 4, can reduce by 2
  const cooldown = 4 - (cooldownDots?.filter(Boolean).length || 0);
  
  return { aoe, crit, cooldown };
}

/**
 * Generate the Tactician Secondary Attack JSX with dynamic values
 */
export function generateTacticianSecondaryAttackJSX(
  aoeDots?: boolean[],
  critDots?: boolean[],
  cooldownDots?: boolean[],
  tacticalOffensiveCritDots?: boolean[]
): React.ReactElement {
  const { aoe, crit, cooldown } = calculateTacticianSecondaryAttackData(aoeDots, critDots, cooldownDots, tacticalOffensiveCritDots);

  return (
    <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      Flares
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span>
          <b><u>Range</u></b> 8hx
        </span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}>
          <b><u>Crit</u></b> <b>[{crit}]</b>+
        </span>
      </div>
      <b><u>Target</u></b> <i>AoE</i> <b>[{aoe}]</b>hx-Radius <br />
      <b><u>Damage</u></b> 1d4, status effect.
    </div>
  );
}

/**
 * Generate stats JSX for Tactician Secondary Attack (for card display)
 */
export function generateTacticianSecondaryAttackStatsJSX(
  aoeDots?: boolean[],
  critDots?: boolean[],
  cooldownDots?: boolean[],
  flareName?: string,
  tacticalOffensiveCritDots?: boolean[]
): React.ReactElement {
  const { aoe, crit, cooldown } = calculateTacticianSecondaryAttackData(aoeDots, critDots, cooldownDots, tacticalOffensiveCritDots);

  if (flareName === "Fire Flare") {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Range</u></b> 8hx</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{crit}]</b>+</span>
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> <b>[{aoe}]</b>hx-Radius <br />
          <b><u>Damage</u></b> 1d4  <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Spike</i></b> <b>(<u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u>)</b> <br />
          <b><u>Crit Effect</u></b> 1d4 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Spike</i></b> <b>(<u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>
            Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u>)</b> 
        </div>
      </div>
    );
  }

  if (flareName === "Flash Freeze") {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Range</u></b> 8hx</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{crit}]</b>+</span>
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> <b>[{aoe}]</b>hx-Radius <br />
          <b><u>Damage</u></b> 1d4  <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Restrain</i></b> <br />
          <b><u>Crit Effect</u></b> 1d4 <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
            Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Slam</i></b> 5hx
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> Self</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[1]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> <i>AoE</i> <b>[1]</b>hx-Radius <br />
        <b><u>Damage</u></b> <b>[1]</b>d4, <i>Dangerous Terrain</i> <i>(affects <b><span style={{ color: '#38761d' }}>Fly</span></b>)</i> <br />
        <b><u>Crit Effect</u></b> <b>[1]</b>d4
      </div>
    </div>
  );
}
