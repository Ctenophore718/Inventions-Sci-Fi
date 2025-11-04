import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateDoubleTapJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.charClass !== 'Gunslinger') return null;

  // Get "Fire three times" dot from classCardDots[5]
  let fireThreeTimes = false;
  if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && Array.isArray(sheet.classCardDots[5])) {
    fireThreeTimes = sheet.classCardDots[5][0] === true;
  }
  const fireCount = fireThreeTimes ? 'three' : 'two';

  // Get cooldown dots from classCardDots[6]
  let cooldownDots = 0;
  if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && Array.isArray(sheet.classCardDots[6])) {
    cooldownDots = sheet.classCardDots[6].filter(Boolean).length;
  }
  const cooldown = 4 - cooldownDots;

  return (
    <>
      <b><i style={{ color: '#4e7211', fontSize: '1em' }}>Double-Tap</i></b> <i style={{ color: '#4e7211', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Instead of a standard <b><i>Secondary</i></b> <span style={{ color: '#990000' }}><b><i>Attack</i></b></span>, you fire your <b><i>Primary</i></b> <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> weapon <b>[{fireCount}]</b> times in a row against the same or different target(s).
    </>
  );
};

// Version for Cards page (with dynamic fire count)
export const generateDoubleTapCardJSX = (classCardDots: boolean[][] | undefined) => {
  // Get "Fire three times" dot from classCardDots[5]
  let fireThreeTimes = false;
  if (classCardDots && Array.isArray(classCardDots) && Array.isArray(classCardDots[5])) {
    fireThreeTimes = classCardDots[5][0] === true;
  }
  const fireCount = fireThreeTimes ? 'three' : 'two';

  return (
    <>
      Instead of a standard <b><i>Secondary</i></b> <span style={{ color: '#990000' }}><b><i>Attack</i></b></span>, you fire your <b><i>Primary</i></b> <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> weapon <b>[{fireCount}]</b> times in a row against the same or different target(s).
    </>
  );
};
