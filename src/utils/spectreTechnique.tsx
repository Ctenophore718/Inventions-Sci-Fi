import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateStealthModeJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Spectre') return null;

  const teleportDots = (sheet.subclassProgressionDots as any)?.spectreTechniqueTeleportDots || [];
  const cannotBeTargetedDots = (sheet.subclassProgressionDots as any)?.spectreTechniqueCannotBeTargetedDots || [];
  const cooldownDots = (sheet.subclassProgressionDots as any)?.spectreTechniqueCooldownDots || [];

  const teleportDistance = 4 + teleportDots.filter(Boolean).length;
  const cannotBeTargeted = cannotBeTargetedDots[0] === true;
  const cooldownReduction = cooldownDots.filter(Boolean).length;
  const cooldown = 3 - cooldownReduction;

  return (
    <>
      <b><i style={{ color: '#6a3dd8' }}>Stealth Mode</i></b> <i style={{ color: '#6a3dd8', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You gain 50% Cover at all times until the beginning of the next round and you <span style={{ color: '#38761d' }}><b><i>Teleport</i></b></span> up to <b>[{teleportDistance}]</b>hx. In addition, you <b>[{cannotBeTargeted ? 'cannot' : 'can'}]</b> be targeted.
    </>
  );
};

export const generateStealthModeCardJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Spectre') return null;

  const teleportDots = (sheet.subclassProgressionDots as any)?.spectreTechniqueTeleportDots || [];
  const cannotBeTargetedDots = (sheet.subclassProgressionDots as any)?.spectreTechniqueCannotBeTargetedDots || [];

  const teleportDistance = 4 + teleportDots.filter(Boolean).length;
  const cannotBeTargeted = cannotBeTargetedDots[0] === true;

  return (
    <>
      You gain 50% Cover at all times until the beginning of the next round and you <span style={{ color: '#38761d' }}><b><i>Teleport</i></b></span> up to <b>[{teleportDistance}]</b>hx. In addition, you <b>[{cannotBeTargeted ? 'cannot' : 'can'}]</b> be targeted.
    </>
  );
};
