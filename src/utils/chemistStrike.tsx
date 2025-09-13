import React from "react";

export function calculateChemistStrikeDamage(classCardDots?: boolean[][]): number {
  // Chemist strike damage dots are at index 8
  return 1 + (classCardDots?.[8]?.filter(Boolean).length || 0);
}

export function generateChemistStrikeJSX(classCardDots?: boolean[][], context: 'levelup' | 'charactersheet' = 'charactersheet'): React.ReactElement {
  const damage = calculateChemistStrikeDamage(classCardDots);
  const imageSize = context === 'levelup' ? 14 : 16;
  
  return (
    <>
      <span style={{ fontWeight: 'bold' }}>[{damage}]</span><span style={{ fontWeight: 'normal' }}>d6</span>&nbsp;
      <span style={{ fontWeight: 'bold', textDecoration: 'underline', color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
        Chemical
        <img src="/Chemical.png" alt="Chemical" style={{ width: imageSize, height: imageSize, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </>
  );
}
