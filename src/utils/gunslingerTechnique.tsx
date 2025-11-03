import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateQuickShotJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.charClass !== 'Gunslinger') return null;

  return (
    <>
      <b><i style={{ color: '#4e7211', fontSize: '1em' }}>Quick Shot</i></b> <i style={{ color: '#4e7211', fontSize: '1em' }}>(Cooldown 4).</i> Until the start of the next round, when an enemy <span style={{ color: '#38761d' }}><b><i>Moves</i></b></span> in your <i>Line-of-Sight</i> and is in Range, you can make a <b><i>Primary</i></b> <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> against them as long as the <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> is <i>Active</i>. After you make this <span style={{ color: '#990000' }}><b><i>Attack</i></b></span>, <span style={{ color: '#4e7211' }}><i>Quick Shot</i></span> expires.
    </>
  );
};

// Version for Cards page (without "Quick Shot (Cooldown 4)" text)
export const generateQuickShotCardJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.charClass !== 'Gunslinger') return null;

  return (
    <>
      Until the start of the next round, when an enemy <span style={{ color: '#38761d' }}><b><i>Moves</i></b></span> in your <i>Line-of-Sight</i> and is in Range, you can make a <b><i>Primary</i></b> <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> against them as long as the <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> is <i>Active</i>. After you make this <span style={{ color: '#990000' }}><b><i>Attack</i></b></span>, <span style={{ color: '#4e7211' }}><i>Quick Shot</i></span> expires.
    </>
  );
};
