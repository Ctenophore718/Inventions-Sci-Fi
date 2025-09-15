import React from 'react';

export interface AnatomistTechniqueData {
  hxRange: number;
  strikeDamageBonus: number;
  strikeBonus: number;
  cooldown: number;
}

/**
 * Calculate Anatomist technique values based on subclass progression dots
 */
export function calculateAnatomistTechniqueData(subclassProgressionDots?: any): AnatomistTechniqueData {
  // Get the number of '+1hx' range dots selected
  const hxRangeDots = subclassProgressionDots?.anatomistTechniqueRangeDots?.filter(Boolean).length || 0;
  const hxRange = 1 + hxRangeDots;

  // Get the number of '+1d6 Strike Damage per token' dots selected
  const strikeDamageBonus = 1 + (subclassProgressionDots?.anatomistTechniqueStrikeDamageDots?.filter(Boolean).length || 0);

  // Get the number of '+Strike per token' dots selected
  const strikeBonus = 0 + (subclassProgressionDots?.anatomistTechniqueStrikeDots?.filter(Boolean).length || 0);

  // Get the number of '-1 Cooldown' dots selected
  const cooldownDots = subclassProgressionDots?.anatomistTechniqueCooldownDots?.filter(Boolean).length || 0;
  const cooldown = Math.max(1, 4 - cooldownDots); // Minimum cooldown is 1

  return { hxRange, strikeDamageBonus, strikeBonus, cooldown };
}

/**
 * Generate the Good Stuff technique JSX with dynamic values
 */
export function generateTheGoodStuffJSX(subclassProgressionDots?: any): React.ReactElement {
  const { hxRange, strikeDamageBonus, strikeBonus, cooldown } = calculateAnatomistTechniqueData(subclassProgressionDots);

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#66cf00', fontSize: '1em' }}>The "Good Stuff"</i></b> <span style={{ color: '#66cf00', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You spend any number of <i>Chem Tokens</i>. After doing so, you and allies within <b>[{hxRange}]</b>hx of you gain +<b>[{strikeDamageBonus}]</b>d6 <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage, +<b>[{strikeBonus}]</b> <b><i style={{ color: '#351c75' }}>Strikes</i></b> and can <b><i style={{ color: '#38761d' }}>Move</i></b> +2hx for each <i>Chem Token</i> spent until the start of the next round.
    </span>
  );
}

/**
 * Generate only the technique description for the Cards page (without title and cooldown)
 */
export function generateTheGoodStuffDescriptionJSX(subclassProgressionDots?: any): React.ReactElement {
  const { hxRange, strikeDamageBonus, strikeBonus } = calculateAnatomistTechniqueData(subclassProgressionDots);

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      You spend any number of <i>Chem Tokens</i>. After doing so, you and allies within <b>[{hxRange}]</b>hx of you gain +<b>[{strikeDamageBonus}]</b>d6 <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage, +<b>[{strikeBonus}]</b> <b><i style={{ color: '#351c75' }}>Strikes</i></b> and can <b><i style={{ color: '#38761d' }}>Move</i></b> +2hx for each <i>Chem Token</i> spent until the start of the next round.
    </span>
  );
}
