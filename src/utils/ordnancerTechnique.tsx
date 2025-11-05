import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateArtilleryStrikeJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Ordnancer') return null;

  // Get progression dots
  const spikeDots = (sheet?.subclassProgressionDots as any)?.ordnancerTechniqueSpikeDots?.filter(Boolean).length || 0;
  const damageDots = (sheet?.subclassProgressionDots as any)?.ordnancerTechniqueDamageDots?.filter(Boolean).length || 0;
  const cooldownDots = (sheet?.subclassProgressionDots as any)?.ordnancerTechniqueCooldownDots?.filter(Boolean).length || 0;
  
  const spikeInstances = 1 + spikeDots;
  const bonusDamageDice = damageDots;
  const cooldown = 4 - cooldownDots;

  return (
    <>
      <b><i style={{ color: '#910a0a' }}>Artillery Strike</i></b> <i style={{ color: '#910a0a' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Until the start of the next round, you deal +<b>[{bonusDamageDice}]</b>d6 Damage on all <b><i style={{ color: '#990000' }}>Attacks</i></b> which also gain the <i>Arcing</i> keyword and deal <b>[{spikeInstances}]</b> instance{spikeInstances !== 1 ? 's' : ''} of <i>Spike</i> (weapon Damage type).
    </>
  );
};

// Version for Cards page (without "Artillery Strike (Cooldown [#])" text)
export const generateArtilleryStrikeCardJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Ordnancer') return null;

  // Get progression dots
  const spikeDots = (sheet?.subclassProgressionDots as any)?.ordnancerTechniqueSpikeDots?.filter(Boolean).length || 0;
  const damageDots = (sheet?.subclassProgressionDots as any)?.ordnancerTechniqueDamageDots?.filter(Boolean).length || 0;
  
  const spikeInstances = 1 + spikeDots;
  const bonusDamageDice = damageDots;

  return (
    <>
      Until the start of the next round, you deal +<b>[{bonusDamageDice}]</b>d6 Damage on all <b><i style={{ color: '#990000' }}>Attacks</i></b> which also gain the <i>Arcing</i> keyword and deal <b>[{spikeInstances}]</b> instance{spikeInstances !== 1 ? 's' : ''} of <i>Spike</i> (weapon Damage type).
    </>
  );
};
