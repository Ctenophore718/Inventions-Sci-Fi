import React from 'react';

export interface BeguilerSecondaryAttackData {
  chainAoE: number;
  critThreshold: number;
  cooldown: number;
}

/**
 * Calculate Beguiler secondary attack values based on subclass dots
 */
export function calculateBeguilerSecondaryAttackData(
  attackAoEDots?: boolean[],
  attackCritDots?: boolean[],
  attackCooldownDots?: boolean[]
): BeguilerSecondaryAttackData {
  // Chain AoE: 5 + dots
  const chainAoE = 5 + (attackAoEDots?.filter(Boolean).length || 0);
  // Crit threshold: 18 - crit dots
  const critThreshold = 18 - (attackCritDots?.filter(Boolean).length || 0);
  // cooldown: 4 - cooldown dots
  const cooldown = 4 - (attackCooldownDots?.filter(Boolean).length || 0);
  return { chainAoE, critThreshold, cooldown };
}

/**
 * Generate the secondary attack text for Beguiler (Whips)
 */
export function generateBeguilerSecondaryAttackJSX(
  attackAoEDots?: boolean[],
  attackCritDots?: boolean[],
  attackCooldownDots?: boolean[]
): React.ReactElement {
  const { chainAoE, critThreshold, cooldown } = calculateBeguilerSecondaryAttackData(
    attackAoEDots,
    attackCritDots,
    attackCooldownDots
  );

  return (
    <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div style={{ marginBottom: '4px' }}>
        <b><i><span style={{ color: '#000' }}>Secondary</span> <span style={{ color: '#990000' }}>Attack</span></i></b> <i>(Cooldown</i> <b>[{cooldown}]</b><i>).</i>
      </div>
      
      
      
      
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span>
          <b><u>Range</u></b> 1hx
        </span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}>
          <b><u>Crit</u></b> <b>[{critThreshold}]</b>+
        </span>
      </div>
      <b><u>Target</u></b> <i>AoE</i> <b>[{chainAoE}]</b>hx-Chain <br />
      <b><u>Damage</u></b> 1d4, status effect <br />
      <b><u>Crit Effect</u></b> 1d4 
    </div>
  );
}

/**
 * Generate the secondary attack stats for Beguiler Whips Cards
 */
export function generateBeguilerSecondaryAttackStatsJSX(
  attackAoEDots?: boolean[],
  attackCritDots?: boolean[],
  attackCooldownDots?: boolean[],
  whipName?: string,
  _cost?: number
): React.ReactElement {
  const { chainAoE, critThreshold, cooldown: _cooldown } = calculateBeguilerSecondaryAttackData(
    attackAoEDots,
    attackCritDots,
    attackCooldownDots
  );

  if (whipName === "Heartstrings") {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Range</u></b> 1hx</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> <b>[{chainAoE}]</b>hx-Chain <br />
          <b><u>Damage</u></b> 1d4 <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
            Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Mesmerize</i></b> <br />
          <b><u>Crit Effect</u></b> 1d4 <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Drain</i></b>
        </div>
      </div>
    );
  }

  if (whipName === "The Crackler") {
    return (
      <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><b><u>Range</u></b> 1hx</span>
          <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
        </div>
        <div>
          <b><u>Target</u></b> <i>AoE</i> <b>[{chainAoE}]</b>hx-Chain <br />
          <b><u>Damage</u></b> 1d4 <b><u style={{ color: '#808080', display: 'inline-flex', alignItems: 'center' }}>
            Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Restrain</i></b> <br />
          <b><u>Crit Effect</u></b> 1d4 <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
            Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>, <b><i>Blind</i></b>
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div style={{ fontSize: '0.875em', width: '100%', height: 'fit-content', maxHeight: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><b><u>Range</u></b> 1hx</span>
        <span style={{ textAlign: 'right', minWidth: '80px' }}><b><u>Crit</u></b> <b>[{critThreshold}]</b>+</span>
      </div>
      <div>
        <b><u>Target</u></b> <i>AoE</i> <b>[{chainAoE}]</b>hx-Chain <br />
        <b><u>Damage</u></b> 1d4, status effect <br />
        <b><u>Crit Effect</u></b> 1d4
      </div>
    </div>
  );
}
