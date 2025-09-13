import React from 'react';

export interface ChemistTechniqueData {
  hxDots: number;
  chemBonus: number;
  hxRangeBonus: number;
  cooldown: number;
}

/**
 * Calculate Chemist technique values based on class card dots
 */
export function calculateChemistTechniqueData(classCardDots?: boolean[][]): ChemistTechniqueData {
  // Get the number of '+1hx' dots selected (array index 2)
  const hxDotsArray = classCardDots?.[2] || [];
  const hxDots = 3 + hxDotsArray.filter(Boolean).length;

  // Get the number of '+1d6 Chemical per Token' dots selected (array index 3)
  const chemBonus = (classCardDots?.[3]?.filter(Boolean).length || 0);

  // Get the number of '+1hx Range per Token' dots selected (array index 4)
  const hxRangeBonus = (classCardDots?.[4]?.filter(Boolean).length || 0);

  // Get the number of '-1 Cooldown' dots selected (array index 5)
  const cooldownDots = (classCardDots?.[5]?.filter(Boolean).length || 0);
  const cooldown = Math.max(1, 4 - cooldownDots); // Minimum cooldown is 1

  return { hxDots, chemBonus, hxRangeBonus, cooldown };
}

/**
 * Generate the Volatile Experiments technique JSX with dynamic values
 */
export function generateVolatileExperimentsJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { hxDots, chemBonus, hxRangeBonus, cooldown } = calculateChemistTechniqueData(classCardDots);

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#721131', fontSize: '1em' }}>Volatile Experiments</i></b> <span style={{ color: '#721131', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</span> You spend any number of <i>Chem Tokens</i>. After doing so, you and allies within <b>[{hxDots}]</b>hx of you gain +2 to Crit rolls, +<b>[{chemBonus}]</b>d6 <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
                            Chemical
                            <img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
                          </u></b> and/or +<b>[{hxRangeBonus}]</b>hx Range to <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> for each Token spent until the start of the next round.
    </span>
  );
}

/**
 * Generate only the technique description for the Cards page (without title and cooldown)
 */
export function generateVolatileExperimentsDescriptionJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { hxDots, chemBonus, hxRangeBonus } = calculateChemistTechniqueData(classCardDots);

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      You spend any number of <i>Chem Tokens</i>. After doing so, you and allies within <b>[{hxDots}]</b>hx of you gain +2 to Crit rolls, +<b>[{chemBonus}]</b>d6 <b><u style={{ color: '#de7204' }}>Chemical</u></b> and/or +<b>[{hxRangeBonus}]</b>hx Range to <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b> for each <i>Token</i> spent until the start of the next round.
    </span>
  );
}
