import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateNaturalistStrikeJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Always 1d6 Toxic for Naturalist
  return (
    <span style={{ fontWeight: 'normal', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
      1d6&nbsp;
      <span style={{ color: '#02b900', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
        Toxic
        <img src="/Toxic.png" alt="Toxic" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </span>
  );
};
