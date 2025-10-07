import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateTechnologistStrikeJSX = (_sheet: CharacterSheet | null): React.JSX.Element => {
  // Always 1d6 Electric for Technologist
  return (
    <span style={{ fontWeight: 'normal', fontFamily: 'inherit', color: '#000', marginLeft: 4, display: 'flex', alignItems: 'center' }}>
      1d6&nbsp;
      <span style={{ color: '#d5d52a', textDecoration: 'underline', fontWeight: 'bold', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
        Electric
        <img src="/Electric.png" alt="Electric" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
      </span>
    </span>
  );
};