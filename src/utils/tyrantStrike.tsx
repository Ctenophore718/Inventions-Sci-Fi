import React from 'react';

export interface TyrantStrikeData {
  damageBonus: number;
  hasDemoralize: boolean;
  totalDamage: number;
}

/**
 * Calculate Tyrant strike values based on progression dots
 */
export function calculateTyrantStrikeData(
  strikeDamageDots?: boolean[],
  strikeDemoralizeDots?: boolean[],
  classCardDots?: boolean[][],
  galvanicStrikeDamageDots?: boolean[]
): TyrantStrikeData {
  // Damage bonus from Tyrant dots: +0, +1, or +2
  const damageBonus = strikeDamageDots?.filter(Boolean).length || 0;
  
  // Demoralize: true if dot is selected
  const hasDemoralize = strikeDemoralizeDots?.[0] || false;
  
  // Total damage includes Commander base dots (at index 8), Galvanic dots, and Tyrant dots
  const commanderDots = classCardDots?.[8]?.filter(Boolean).length || 0;
  const galvanicDots = galvanicStrikeDamageDots?.filter(Boolean).length || 0;
  const totalDamage = 1 + commanderDots + galvanicDots + damageBonus;
  
  return { damageBonus, hasDemoralize, totalDamage };
}

/**
 * Generate the Tyrant Strike JSX with dynamic values
 */
export function generateTyrantStrikeJSX(
  strikeDamageDots?: boolean[],
  strikeDemoralizeDots?: boolean[],
  classCardDots?: boolean[][],
  galvanicStrikeDamageDots?: boolean[]
): React.ReactElement {
  const { damageBonus, hasDemoralize } = calculateTyrantStrikeData(
    strikeDamageDots, 
    strikeDemoralizeDots,
    classCardDots,
    galvanicStrikeDamageDots
  );

  return (
    <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <b><i>Enhanced <span style={{ color: '#351c75' }}>Strike</span> Effects.</i></b> Damage type <b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>
        Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b>.{damageBonus > 0 && (
        <> +<b>[{damageBonus}]</b> Damage dice.</>
      )}{hasDemoralize && (
        <> Inflict <b><i>Demoralize</i></b>.</>
      )}
    </div>
  );
}
