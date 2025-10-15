import React from 'react';

export interface TyrantStrikeData {
  damageBonus: number;
  hasDemoralize: boolean;
}

/**
 * Calculate Tyrant strike values based on progression dots
 */
export function calculateTyrantStrikeData(
  strikeDamageDots?: boolean[],
  strikeDemorizeDots?: boolean[]
): TyrantStrikeData {
  // Damage bonus: +0, +1, or +2 based on dots
  const damageBonus = strikeDamageDots?.filter(Boolean).length || 0;
  
  // Demoralize: true if dot is selected
  const hasDemoralize = strikeDemorizeDots?.[0] || false;
  
  return { damageBonus, hasDemoralize };
}

/**
 * Generate the Tyrant Strike JSX with dynamic values
 */
export function generateTyrantStrikeJSX(
  strikeDamageDots?: boolean[],
  strikeDemorizeDots?: boolean[]
): React.ReactElement {
  const { damageBonus, hasDemoralize } = calculateTyrantStrikeData(strikeDamageDots, strikeDemorizeDots);

  return (
    <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <b><i>Enhanced <span style={{ color: '#351c75' }}>Strike</span> Effects.</i></b> Damage type <b><u style={{ color: '#a6965f', display: 'inline-flex', alignItems: 'center' }}>
        Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b>.{damageBonus > 0 && (
        <> +<b>[{damageBonus}]</b> Damage dice.</>
      )}{hasDemoralize && (
        <> Inflict <b><i>Demoralize</i></b>.</>
      )}
    </div>
  );
}
