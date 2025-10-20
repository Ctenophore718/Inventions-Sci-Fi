import React from 'react';

/**
 * Generate Blood Trade feature JSX with dynamic damage dice based on progression dots
 */
export function generateBloodTradeJSX(classCardDots?: boolean[][]): React.ReactElement {
  // Get +1d6 Damage dots (array index 0)
  const damageDots = classCardDots?.[0]?.filter(Boolean).length || 0;
  const totalDice = 1 + damageDots;

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#6b1172' }}>Blood Trade.</i></b> Whenever you take Damage, you gain +<b>[{totalDice}]</b>d6 Damage on your next <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b> or <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>. The Damage type matches your next <b><i><span style={{ color: '#351c75' }}>Strike</span></i></b> or <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> and doesn't stack if you are Damaged multiple times.   
    </span>
  );
}
