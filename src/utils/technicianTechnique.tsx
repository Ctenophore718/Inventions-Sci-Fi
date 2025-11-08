import React from 'react';

export interface TechnicianTechniqueData {
  aoeChain: number;
  effectCount: number;
  includesSleep: boolean;
  affectsFly: boolean;
  cooldown: number;
}

/**
 * Calculate Technician technique values based on class card dots
 */
export function calculateTechnicianTechniqueData(classCardDots?: boolean[][]): TechnicianTechniqueData {
  // Get the number of '+2hx-chain AoE' dots selected (array index 2)
  const aoeDots = classCardDots?.[2]?.filter(Boolean).length || 0;
  const aoeChain = 3 + (aoeDots * 2);

  // Check if 'Includes Sleep' dot is selected (array index 3, first dot)
  const includesSleep = classCardDots?.[3]?.[0] || false;

  // Check if 'Affects Fly' dot is selected (array index 4, first dot)
  const affectsFly = classCardDots?.[4]?.[0] || false;

  // Check if '+1 effect' dot is selected (array index 5, first dot)
  const extraEffect = classCardDots?.[5]?.[0] || false;
  const effectCount = extraEffect ? 2 : 1;

  // Calculate cooldown: 4 minus number of -1 Cooldown dots (array index 6)
  const cooldownDots = classCardDots?.[6]?.filter(Boolean).length || 0;
  const cooldown = Math.max(1, 4 - cooldownDots);

  return { aoeChain, effectCount, includesSleep, affectsFly, cooldown };
}

/**
 * Generate the Trapmaker technique JSX with dynamic values for Level Up page
 */
export function generateTrapmakerJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { aoeChain, effectCount, includesSleep, affectsFly, cooldown } = calculateTechnicianTechniqueData(classCardDots);

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#724811', fontSize: '1em' }}>Trapmaker</i></b> <i style={{ color: '#724811', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You create <i>Dangerous Terrain</i> in an <i>AoE</i> <b>[{aoeChain}]</b>hx-chain originating from a point up to 3hx away from you. <b>[{effectCount}]</b> effect(s) of the <i>Terrain</i> can be chosen from the following: <b><i>Blind</i></b>, <b><i>Confuse</i></b>, <b><i>Demoralize</i></b>, <b><i>Drain</i></b>, <b><i>Restrain</i></b>, <b><i>Spike</i></b> (any Damage type){includesSleep && <>, or <b><i>Sleep</i></b></>}. This <i>Terrain</i> {affectsFly && <>affects <b><i><span style={{ color: '#38761d' }}>Fly</span></i></b> and </>}lasts until the end of battle or is dismantled.
    </span>
  );
}

/**
 * Generate the Trapmaker card JSX for Cards page
 */
export function generateTrapmakerCardJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { aoeChain, effectCount, includesSleep, affectsFly } = calculateTechnicianTechniqueData(classCardDots);

  return (
    <div style={{ fontSize: '0.95em' }}>
      You create <i>Dangerous Terrain</i> in an <i>AoE</i> <b>[{aoeChain}]</b>hx-chain originating from a point up to 3hx away from you. <b>[{effectCount}]</b> effect(s) of the <i>Terrain</i> can be chosen from the following: <b><i>Blind</i></b>, <b><i>Confuse</i></b>, <b><i>Demoralize</i></b>, <b><i>Drain</i></b>, <b><i>Restrain</i></b>, <b><i>Spike</i></b> (any Damage type), or <br /><b>[{includesSleep ? <i>Sleep</i> : ' - '}]</b>. This <i>Terrain</i> affects <b>[{affectsFly ? <i><span style={{ color: '#38761d' }}>Fly</span></i> : ' - '}]</b> and lasts until the end of battle or is dismantled.
    </div>
  );
}
