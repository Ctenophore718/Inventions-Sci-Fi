import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateDoubleTapJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.charClass !== 'Gunslinger') return null;

  return (
    <>
      <b><i style={{ color: '#4e7211', fontSize: '1em' }}>Double Tap</i></b> <i style={{ color: '#4e7211', fontSize: '1em' }}>(Cooldown 4).</i> Instead of a standard <b><i>Secondary</i></b> <span style={{ color: '#990000' }}><b><i>Attack</i></b></span>, you fire your <b><i>Primary</i></b> <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> weapon two times in a row against the same or different target(s).
    </>
  );
};

// Version for Cards page (without "Double Tap (Cooldown 4)" text)
export const generateDoubleTapCardJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.charClass !== 'Gunslinger') return null;

  return (
    <>
      Instead of a standard <b><i>Secondary</i></b> <span style={{ color: '#990000' }}><b><i>Attack</i></b></span>, you fire your <b><i>Primary</i></b> <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> weapon two times in a row against the same or different target(s).
    </>
  );
};
