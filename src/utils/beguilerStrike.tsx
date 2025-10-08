import React from 'react';

export interface BeguilerStrikeData {
  strikeBonus: number;
  hasMesmerize: boolean;
}

/**
 * Calculate Beguiler strike values based on progression dots
 */
export function calculateBeguilerStrikeData(
  strikeStrikeDots?: boolean[],
  strikeMesmerizeDots?: boolean[]
): BeguilerStrikeData {
  // Strike bonus: +0 or +1 based on dots
  const strikeBonus = 0 + (strikeStrikeDots?.filter(Boolean).length || 0);
  // Mesmerize: true if dot is selected
  const hasMesmerize = strikeMesmerizeDots?.[0] || false;
  
  return { strikeBonus, hasMesmerize };
}

/**
 * Generate the Beguiler Strike JSX with dynamic values
 */
export function generateBeguilerStrikeJSX(
  strikeStrikeDots?: boolean[],
  strikeMesmerizeDots?: boolean[]
): React.ReactElement {
  const { strikeBonus, hasMesmerize } = calculateBeguilerStrikeData(strikeStrikeDots, strikeMesmerizeDots);

  return (
    <div style={{ fontSize: '1em', color: '#000', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <b><i>Enhanced <span style={{ color: '#351c75' }}>Strike</span> Effects.</i></b> Damage type <b><u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
        Neural<img src="/Neural.png" alt="Neural" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b>.{strikeBonus > 0 && (
        <> +<b>[{strikeBonus}]</b> <b><i style={{ color: '#351c75' }}>Strike</i></b>.</>
      )}{hasMesmerize && (
        <> Inflict <b><i>Mesmerize</i></b>.</>
      )}
    </div>
  );
}
