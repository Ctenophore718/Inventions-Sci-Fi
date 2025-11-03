import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateSharpshooterJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.charClass !== 'Gunslinger') return null;

  return (
    <>
      <b><i style={{ color: '#4e7211', fontSize: '1em' }}>Sharpshooter.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>You gain a +2 to Crit rolls on all <span style={{ color: '#990000' }}><b><i>Attacks</i></b></span>.</span>
    </>
  );
};
