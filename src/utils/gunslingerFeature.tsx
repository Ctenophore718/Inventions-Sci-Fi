import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

// Version for Level Up page (with dynamic values)
export const generateSharpshooterJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.charClass !== 'Gunslinger') return null;

  const critBonus = 2 + (sheet?.classCardDots?.[0] ? sheet.classCardDots[0].filter(Boolean).length : 0);
  const rangeBonus = 0 + (sheet?.classCardDots?.[1] ? sheet.classCardDots[1].filter(Boolean).length : 0);

  return (
    <>
      <b><i style={{ color: '#4e7211', fontSize: '1em' }}>Sharpshooter.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>You gain a +<b>[{critBonus}]</b> to Crit rolls and a +<b>[{rangeBonus}]</b>hx Range on all <span style={{ color: '#990000' }}><b><i>Attacks</i></b></span>.</span>
    </>
  );
};

// Version for Character Sheet page (with dynamic values)
export const generateSharpshooterCharacterSheetJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.charClass !== 'Gunslinger') return null;

  const critBonus = 2 + (sheet?.classCardDots?.[0] ? sheet.classCardDots[0].filter(Boolean).length : 0);
  const rangeBonus = 0 + (sheet?.classCardDots?.[1] ? sheet.classCardDots[1].filter(Boolean).length : 0);

  return (
    <>
      <b><i style={{ color: '#4e7211' }}>Sharpshooter.</i></b> You gain a +<b>[{critBonus}]</b> to Crit rolls and a +<b>[{rangeBonus}]</b>hx Range on all <b><i><span style={{ color: '#990000' }}>Attacks</span></i></b>.
    </>
  );
};
