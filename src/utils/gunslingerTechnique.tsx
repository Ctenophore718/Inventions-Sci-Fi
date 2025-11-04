import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateQuickShotJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.charClass !== 'Gunslinger') return null;

  // Get number of '+1 creature' dots from classCardDots[3]
  let creatureDots = 0;
  if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && Array.isArray(sheet.classCardDots[3])) {
    creatureDots = sheet.classCardDots[3].filter(Boolean).length;
  }
  // Get number of '+1 Attack' dots from classCardDots[2]
  let attackDots = 0;
  if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && Array.isArray(sheet.classCardDots[2])) {
    attackDots = sheet.classCardDots[2].filter(Boolean).length;
  }
  const enemyCount = 1 + creatureDots;
  const attackCount = 1 + attackDots;

  // Get cooldown dots from classCardDots[4]
  let cooldownDots = 0;
  if (sheet?.classCardDots && Array.isArray(sheet.classCardDots) && Array.isArray(sheet.classCardDots[4])) {
    cooldownDots = sheet.classCardDots[4].filter(Boolean).length;
  }
  const cooldown = 4 - cooldownDots;

  return (
    <>
      <b><i style={{ color: '#4e7211', fontSize: '1em' }}>Quick Shot</i></b> <i style={{ color: '#4e7211', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Until the start of the next round, when <b>[{enemyCount}]</b> enemy(s) <span style={{ color: '#38761d' }}><b><i>Moves</i></b></span> in your <i>Line-of-Sight</i> and is in Range, you can make <b>[{attackCount}]</b> <b><i>Primary</i></b> <span style={{ color: '#990000' }}><b><i>Attack(s)</i></b></span> against them as long as the <span style={{ color: '#990000' }}><b><i>Attack</i></b></span> is <i>Active</i>. After you make the <span style={{ color: '#990000' }}><b><i>Attack(s)</i></b></span>, <span style={{ color: '#4e7211' }}><i>Quick Shot</i></span> expires.
    </>
  );
};

// Version for Cards page (with dynamic creature and attack counts)
export const generateQuickShotCardJSX = (classCardDots: boolean[][] | undefined) => {
  // Get number of '+1 creature' dots from classCardDots[3]
  let creatureDots = 0;
  if (classCardDots && Array.isArray(classCardDots) && Array.isArray(classCardDots[3])) {
    creatureDots = classCardDots[3].filter(Boolean).length;
  }
  // Get number of '+1 Attack' dots from classCardDots[2]
  let attackDots = 0;
  if (classCardDots && Array.isArray(classCardDots) && Array.isArray(classCardDots[2])) {
    attackDots = classCardDots[2].filter(Boolean).length;
  }
  const enemyCount = 1 + creatureDots;
  const attackCount = 1 + attackDots;

  return (
    <>
      Until the start of the next round, when <b>[{enemyCount}]</b> enemy(s) <b><i><span style={{ color: '#38761d' }}>Moves</span></i></b> in your <i>Line-of-Sight</i> and is in Range, you can make <b>[{attackCount}]</b> <b><i>Primary</i></b> <b><i><span style={{ color: '#990000' }}>Attack(s)</span></i></b> against them as long as the <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> is <i>Active</i>. After you make the <b><i><span style={{ color: '#990000' }}>Attack(s)</span></i></b>, <i><span style={{ color: '#4e7211' }}>Quick Shot</span></i> expires.
    </>
  );
};
