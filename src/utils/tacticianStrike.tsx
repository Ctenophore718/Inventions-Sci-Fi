import React from 'react';

export interface TacticianStrikeData {
  strikeBonus: number;
}

/**
 * Calculate Tactician strike values based on progression dots
 */
export function calculateTacticianStrikeData(
  strikeStrikeDots?: boolean[]
): TacticianStrikeData {
  // Strike bonus: +0 or +1 based on dots
  const strikeBonus = 0 + (strikeStrikeDots?.filter(Boolean).length || 0);
  
  return { strikeBonus };
}

/**
 * Generate the Tactician Strike JSX with dynamic values
 */
export function generateTacticianStrikeJSX(
  strikeStrikeDots?: boolean[]
): React.ReactElement {
  const { strikeBonus } = calculateTacticianStrikeData(strikeStrikeDots);

  return (
    <div style={{ fontSize: '1em', color: '#000', marginBottom: '6px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <b><i>Enhanced <span style={{ color: '#351c75' }}>Strike</span> Effects.</i></b> Damage type <span style={{ color: '#a6965f', textDecoration: 'underline', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
        Piercing
        <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>.{strikeBonus > 0 && (
        <> +<b>[{strikeBonus}]</b> <span style={{ color: '#351c75' }}><b><i>Strike</i></b></span>.</>
      )}
    </div>
  );
}
