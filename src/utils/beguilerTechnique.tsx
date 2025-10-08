import React from 'react';

export interface BeguilerTechniqueData {
  hxRange: number;
  moveCloserBonus: number;
  cooldown: number;
}

/**
 * Calculate Beguiler technique values based on subclass progression dots
 */
export function calculateBeguilerTechniqueData(subclassProgressionDots?: any): BeguilerTechniqueData {
  // Get the number of '+2hx' range dots selected
  const hxRangeDots = subclassProgressionDots?.beguilerTechniqueRangeDots?.filter(Boolean).length || 0;
  const hxRange = 5 + (hxRangeDots * 2);

  // Get the number of '+1hx Move closer' dots selected
  const moveCloserBonus = 0 + (subclassProgressionDots?.beguilerTechniqueMoveDots?.filter(Boolean).length || 0);

  // Get the number of '-1 Cooldown' dots selected
  const cooldownDots = subclassProgressionDots?.beguilerTechniqueCooldownDots?.filter(Boolean).length || 0;
  const cooldown = Math.max(1, 4 - cooldownDots); // Minimum cooldown is 1

  return { hxRange, moveCloserBonus, cooldown };
}

/**
 * Generate the Seduce technique JSX with dynamic values
 */
export function generateSeduceJSX(subclassProgressionDots?: any): React.ReactElement {
  const { hxRange, moveCloserBonus, cooldown } = calculateBeguilerTechniqueData(subclassProgressionDots);

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#ff43da', fontSize: '1em' }}>Seduce</i></b> <span style={{ color: '#ff43da', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> All enemies within <b>[{hxRange}]</b>hx <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{3 + moveCloserBonus}]</b>hx closer to you and suffer <i>Vulnerability</i> to all Damage against the next <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> or <b><i style={{ color: '#351c75' }}>Strike</i></b> made against them until the beginning of the next round. This overrides any existing <i>Resistance</i> and/or <i>Immunity</i>.
    </span>
  );
}

/**
 * Generate only the technique description for the Cards page (without title and cooldown)
 */
export function generateSeduceDescriptionJSX(subclassProgressionDots?: any): React.ReactElement {
  const { hxRange, moveCloserBonus } = calculateBeguilerTechniqueData(subclassProgressionDots);

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      All enemies within <b>[{hxRange}]</b>hx <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{3 + moveCloserBonus}]</b>hx closer to you and suffer <i>Vulnerability</i> to all Damage against the next <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> or <b><i style={{ color: '#351c75' }}>Strike</i></b> made against them until the beginning of the next round. This overrides any existing <i>Resistance</i> and/or <i>Immunity</i>.
    </span>
  );
}
