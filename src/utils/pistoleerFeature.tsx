import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateHarryJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Pistoleer') return null;

  // Get progression dots for Move bonus
  const moveDots = (sheet?.subclassProgressionDots as any)?.pistoleerFeatureMoveDots?.filter(Boolean).length || 0;
  const totalMove = 1 + moveDots;

  return (
    <>
      <b><i style={{ color: '#5a910a' }}>Harry.</i></b> When you deal Damage to an enemy, you can immediately <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{totalMove}]</b>hx.
    </>
  );
};

// Version for Character Sheet
export const generateHarryCharacterSheetJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Pistoleer') return null;

  // Get progression dots for Move bonus
  const moveDots = (sheet?.subclassProgressionDots as any)?.pistoleerFeatureMoveDots?.filter(Boolean).length || 0;
  const totalMove = 1 + moveDots;

  return (
    <>
      <b><i style={{ color: '#5a910a' }}>Harry.</i></b> When you deal Damage to an enemy, you can immediately <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{totalMove}]</b>hx.
    </>
  );
};
