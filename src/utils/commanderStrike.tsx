import React from "react";

export function calculateCommanderStrikeDamage(
  classCardDots?: boolean[][], 
  galvanicStrikeDamageDots?: boolean[],
  tyrantStrikeDamageDots?: boolean[]
): number {
  // Commander strike damage dots are at index 8
  const commanderDots = classCardDots?.[8]?.filter(Boolean).length || 0;
  // Galvanic subclass can add additional damage dice
  const galvanicDots = galvanicStrikeDamageDots?.filter(Boolean).length || 0;
  // Tyrant subclass can add additional damage dice
  const tyrantDots = tyrantStrikeDamageDots?.filter(Boolean).length || 0;
  return 1 + commanderDots + galvanicDots + tyrantDots;
}

export function generateCommanderStrikeJSX(
  classCardDots?: boolean[][], 
  context: 'levelup' | 'charactersheet' = 'charactersheet',
  galvanicStrikeDamageDots?: boolean[],
  tyrantStrikeDamageDots?: boolean[]
): React.ReactElement {
  const damage = calculateCommanderStrikeDamage(classCardDots, galvanicStrikeDamageDots, tyrantStrikeDamageDots);
  
  return (
    <>
      <span style={{ fontWeight: 'bold' }}>[{damage}]</span><span style={{ fontWeight: 'normal' }}>d6</span>
    </>
  );
}
