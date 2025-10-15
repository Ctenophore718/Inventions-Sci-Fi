import React from 'react';

export interface TyrantTechniqueData {
  hxRange: number;
  moveAwayBonus: number;
  cooldown: number;
}

/**
 * Calculate Tyrant technique values based on progression dots
 */
export function calculateTyrantTechniqueData(
  techniqueHxDots?: boolean[],
  techniqueMoveDots?: boolean[],
  techniqueCooldownDots?: boolean[]
): TyrantTechniqueData {
  // Base range is 3hx
  const hxRange = 3 + (techniqueHxDots?.filter(Boolean).length || 0);
  
  // Base Move away is 3hx
  const moveAwayBonus = techniqueMoveDots?.filter(Boolean).length || 0;
  
  // Base cooldown is 4
  const cooldown = 4 - (techniqueCooldownDots?.filter(Boolean).length || 0);
  
  return { hxRange, moveAwayBonus, cooldown };
}

/**
 * Generate the Tyrannize technique JSX with dynamic values
 */
export function generateTyrannizeJSX(
  techniqueHxDots?: boolean[],
  techniqueMoveDots?: boolean[],
  techniqueCooldownDots?: boolean[]
): React.ReactElement {
  const { hxRange, moveAwayBonus, cooldown } = calculateTyrantTechniqueData(
    techniqueHxDots,
    techniqueMoveDots,
    techniqueCooldownDots
  );
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#ce1f1f', fontSize: '1em' }}>Tyrannize</i></b> <span style={{ color: '#ce1f1f', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Enemies within <b>[{hxRange}]</b>hx of you <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{3 + moveAwayBonus}]</b>hx away from you and deal half Damage (rounded down) on their next <b><i style={{ color: '#351c75' }}>Strike</i></b> or <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> until the beginning of the next round.
    </span>
  );
}

/**
 * Generate only the technique description for the Cards page (without title and cooldown)
 */
export function generateTyrannizeDescriptionJSX(
  techniqueHxDots?: boolean[],
  techniqueMoveDots?: boolean[]
): React.ReactElement {
  const { hxRange, moveAwayBonus } = calculateTyrantTechniqueData(
    techniqueHxDots,
    techniqueMoveDots,
    undefined
  );
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Enemies within <b>[{hxRange}]</b>hx of you <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{3 + moveAwayBonus}]</b>hx away from you and deal half Damage (rounded down) on their next <b><i style={{ color: '#351c75' }}>Strike</i></b> or <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> until the beginning of the next round.
    </span>
  );
}
