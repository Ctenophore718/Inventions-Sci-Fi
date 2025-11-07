import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateLayLowJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Sniper') return null;

  // Get progression dots
  const cooldownDots = (sheet?.subclassProgressionDots as any)?.sniperTechniqueCooldownDots?.filter(Boolean).length || 0;
  const cooldown = 3 - cooldownDots;
  const includesStrikesDots = (sheet?.subclassProgressionDots as any)?.sniperTechniqueIncludesStrikesDots?.filter(Boolean).length || 0;
  const autoCritDots = (sheet?.subclassProgressionDots as any)?.sniperTechniqueAutoCritDots?.filter(Boolean).length || 0;

  return (
    <>
      <b><i style={{ color: '#0a6f91' }}>Lay Low</i></b> <i style={{ color: '#0a6f91', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You gain <i>Immunity</i> to Damage from <i>AoE</i> <b><i style={{ color: '#990000' }}>Attacks</i></b>{includesStrikesDots > 0 && <> and <b><i style={{ color: '#351c75' }}>Strikes</i></b></>} and cannot be the target of <b><i style={{ color: '#990000' }}>Attacks</i></b> or <b>[{includesStrikesDots > 0 ? <><i style={{ color: '#351c75' }}>Strikes</i></> : ' - '}]</b> until the beginning of the next round. Additionally, you <b>[{autoCritDots > 0 ? 'auto-Crit' : ' - '}]</b> on all <b><i style={{ color: '#990000' }}>Attacks</i></b> until the beginning of the next round.
    </>
  );
};

// Version for Cards page (without the label and cooldown)
export const generateLayLowCardJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Sniper') return null;

  // Get progression dots
  const includesStrikesDots = (sheet?.subclassProgressionDots as any)?.sniperTechniqueIncludesStrikesDots?.filter(Boolean).length || 0;
  const autoCritDots = (sheet?.subclassProgressionDots as any)?.sniperTechniqueAutoCritDots?.filter(Boolean).length || 0;

  return (
    <>
      You gain <i>Immunity</i> to Damage from <i>AoE</i> <b><i style={{ color: '#990000' }}>Attacks</i></b>{includesStrikesDots > 0 && <> and <b><i style={{ color: '#351c75' }}>Strikes</i></b></>} and cannot be the target of <b><i style={{ color: '#990000' }}>Attacks</i></b> or <b>[{includesStrikesDots > 0 ? <><i style={{ color: '#351c75' }}>Strikes</i></> : ' - '}]</b> until the beginning of the next round. Additionally, you <b>[{autoCritDots > 0 ? 'auto-Crit' : ' - '}]</b> on all <b><i style={{ color: '#990000' }}>Attacks</i></b> until the beginning of the next round.
    </>
  );
};
