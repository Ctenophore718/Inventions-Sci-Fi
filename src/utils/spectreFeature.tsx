import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateHoloFieldJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Spectre') return null;

  const extraCoverDieDots = (sheet.subclassProgressionDots as any)?.spectreFeatureExtraCoverDieDots || [];
  const hasExtraCoverDie = extraCoverDieDots[0] === true;

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#6a3dd8' }}>Holo-Field.</i></b> You roll {hasExtraCoverDie ? <><b>[2]</b></> : <><b>[1]</b></>} additional Cover dice when a creature <span style={{ color: '#990000' }}><b><i>Attacks</i></b></span> you, and discard the lowest {hasExtraCoverDie ? <><b>[2]</b></> : <><b>[1]</b></>} roll(s). Additionally, you can use the <i>Stealth</i> skill once per turn without using an <i>Action</i>.
    </span>
  );
};
