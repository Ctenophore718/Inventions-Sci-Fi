import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateSalvageJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const junkerFeatureRangeDots = (sheet?.subclassProgressionDots as any)?.junkerFeatureRangeDots || [false, false, false];
  const junkerFeatureAllyDots = (sheet?.subclassProgressionDots as any)?.junkerFeatureAllyDots || [false, false, false];
  const junkerFeatureCritDamageDot = (sheet?.subclassProgressionDots as any)?.junkerFeatureCritDamageDot || [false];
  
  const rangeBonus = junkerFeatureRangeDots.filter(Boolean).length;
  const allyBonus = junkerFeatureAllyDots.filter(Boolean).length;
  const hasCritDamage = junkerFeatureCritDamageDot[0];
  
  const totalRange = 3 + rangeBonus;
  const totalAllies = 1 + allyBonus;
  
  return (
    <>
      <b><i style={{ color: '#6db857', fontSize: '1em' }}>Salvage.</i></b> Your <i>Drone</i> gains the Crit effect and <b>[{hasCritDamage ? 'Crit Damage' : ' - '}]</b> of <b>[{totalAllies}]</b> ally's <b><i>Primary</i></b> <b><i style={{ color: '#990000' }}>Attack</i></b> within <b>[{totalRange}]</b>hx of it.
    </>
  );
};
