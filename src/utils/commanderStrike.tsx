import React from "react";

export function calculateCommanderStrikeDamage(classCardDots?: boolean[][]): number {
  // Commander strike damage dots are at index 8
  return 1 + (classCardDots?.[8]?.filter(Boolean).length || 0);
}

export function generateCommanderStrikeJSX(classCardDots?: boolean[][], context: 'levelup' | 'charactersheet' = 'charactersheet'): React.ReactElement {
  const damage = calculateCommanderStrikeDamage(classCardDots);
  
  return (
    <>
      <span style={{ fontWeight: 'bold' }}>[{damage}]</span><span style={{ fontWeight: 'normal' }}>d6</span>
    </>
  );
}
