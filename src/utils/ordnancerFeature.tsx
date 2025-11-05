import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateExcessiveDisplayJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Ordnancer') return null;

  // Get progression dots
  const rangeDots = (sheet?.subclassProgressionDots as any)?.ordnancerFeatureRangeDots?.filter(Boolean).length || 0;
  const range = 3 + rangeDots;

  return (
    <>
      <b><i style={{ color: '#910a0a' }}>Excessive Display.</i></b> You and all allies within <b>[{range}]</b>hx deal +1d6 Damage to all <b><i style={{ color: '#990000' }}>Attacks</i></b>. The Damage type is the same as the <b><i style={{ color: '#990000' }}>Attack</i></b> used.
    </>
  );
};
