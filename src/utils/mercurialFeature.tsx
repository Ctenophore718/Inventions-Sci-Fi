import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateBladeshieldJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  return (
    <>
      <b><i style={{ color: '#941c6c', fontSize: '1em' }}>Bladeshield.</i></b> You gain 50% Cover against all <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strikes</i></b>.
    </>
  );
};
