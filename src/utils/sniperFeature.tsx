import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateTargeteerJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Sniper') return null;

  // Get progression dots
  const conditionDots = (sheet?.subclassProgressionDots as any)?.sniperFeatureConditionDots?.filter(Boolean).length || 0;
  const numConditions = 1 + conditionDots;

  return (
    <>
      <b><i style={{ color: '#0a6f91' }}>Targeteer.</i></b> When you Crit, in addition to rolling extra Damage dice and dealing an effect, you can choose to inflict <b>[{numConditions}]</b> of the following conditions: <b><i>Blind</i></b>, <b><i>Demoralized</i></b>, <b><i>Spike</i></b> (weapon Damage type), or <b><i>Restrained</i></b>.
    </>
  );
};

// Version for Character Sheet
export const generateTargeteerCharacterSheetJSX = (sheet: CharacterSheet | null) => {
  if (!sheet || sheet.subclass !== 'Sniper') return null;

  // Get progression dots
  const conditionDots = (sheet?.subclassProgressionDots as any)?.sniperFeatureConditionDots?.filter(Boolean).length || 0;
  const numConditions = 1 + conditionDots;

  return (
    <>
      <b><i style={{ color: '#0a6f91' }}>Targeteer.</i></b> When you <i>Crit</i>, in addition to rolling extra Damage dice and dealing an effect, you can choose to inflict <b>[{numConditions}]</b> of the following conditions: <b><i>Blind</i></b>, <b><i>Demoralized</i></b>, <b><i>Spike</i></b> (weapon Damage type), or <b><i>Restrained</i></b>.
    </>
  );
};
