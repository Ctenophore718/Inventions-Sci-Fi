import React from "react";

export function calculateCommanderStrikeDamage(
  classCardDots?: boolean[][], 
  galvanicStrikeDamageDots?: boolean[]
): number {
  // Commander strike damage dots are at index 8
  const commanderDots = classCardDots?.[8]?.filter(Boolean).length || 0;
  // Galvanic subclass can add additional damage dice
  const galvanicDots = galvanicStrikeDamageDots?.filter(Boolean).length || 0;
  return 1 + commanderDots + galvanicDots;
}

export function generateCommanderStrikeJSX(
  classCardDots?: boolean[][], 
  context: 'levelup' | 'charactersheet' = 'charactersheet',
  galvanicStrikeDamageDots?: boolean[]
): React.ReactElement {
  const damage = calculateCommanderStrikeDamage(classCardDots, galvanicStrikeDamageDots);
  
  return (
    <>
      <span style={{ fontWeight: 'bold' }}>[{damage}]</span><span style={{ fontWeight: 'normal' }}>d6</span>
    </>
  );
}
