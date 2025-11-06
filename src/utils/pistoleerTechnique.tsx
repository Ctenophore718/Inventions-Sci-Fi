import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateBleedinBulletsJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Pistoleer') return null;

  // Get progression dots
  const cooldownDots = (sheet?.subclassProgressionDots as any)?.pistoleerTechniqueCooldownDots?.filter(Boolean).length || 0;
  const cooldown = 4 - cooldownDots;
  const spikeRerollDots = (sheet?.subclassProgressionDots as any)?.pistoleerTechniqueSpikeRerollDots?.filter(Boolean).length || 0;
  const ignoreSpikeImmunityDots = (sheet?.subclassProgressionDots as any)?.pistoleerTechniqueIgnoreSpikeImmunityDots?.filter(Boolean).length || 0;
  
  // Spike reroll changes from [6] to [5] when dot is selected
  const spikeRerollValue = spikeRerollDots > 0 ? 5 : 6;
  
  // Ignore immunity changes from [ - ] to [ignores] when dot is selected
  const ignoreImmunityText = ignoreSpikeImmunityDots > 0 ? 'ignores' : ' - ';

  return (
    <>
      <b><i style={{ color: '#5a910a' }}>Bleedin' Bullets</i></b> <i style={{ color: '#5a910a', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Until the start of the next round, every d6 of Damage you deal on an <b><i style={{ color: '#990000' }}>Attack</i></b> becomes <b><i>Spike</i></b> with the same Damage type as your <b><i style={{ color: '#990000' }}>Attack</i></b>. This <b><i>Spike</i></b> rerolls at <b>[{spikeRerollValue}]</b> and <b>[{ignoreImmunityText}]</b> <b><i>Spike</i></b> <i>Immunity</i>. 
    </>
  );
};

// Version for Cards page (without the label)
export const generateBleedinBulletsCardJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Pistoleer') return null;

  // Get progression dots
  const cooldownDots = (sheet?.subclassProgressionDots as any)?.pistoleerTechniqueCooldownDots?.filter(Boolean).length || 0;
  const cooldown = 4 - cooldownDots;
  const spikeRerollDots = (sheet?.subclassProgressionDots as any)?.pistoleerTechniqueSpikeRerollDots?.filter(Boolean).length || 0;
  const ignoreSpikeImmunityDots = (sheet?.subclassProgressionDots as any)?.pistoleerTechniqueIgnoreSpikeImmunityDots?.filter(Boolean).length || 0;
  
  // Spike reroll changes from [6] to [5] when dot is selected
  const spikeRerollValue = spikeRerollDots > 0 ? 5 : 6;
  
  // Ignore immunity changes from [ - ] to [ignores] when dot is selected
  const ignoreImmunityText = ignoreSpikeImmunityDots > 0 ? 'ignores' : ' - ';

  return (
    <>
      Until the start of the next round, every d6 of Damage you deal on an <b><i style={{ color: '#990000' }}>Attack</i></b> becomes <b><i>Spike</i></b> with the same Damage type as your <b><i style={{ color: '#990000' }}>Attack</i></b>. This <b><i>Spike</i></b> rerolls at <b>[{spikeRerollValue}]</b> and <b>[{ignoreImmunityText}]</b> <b><i>Spike</i></b> <i>Immunity</i>.
    </>
  );
};
