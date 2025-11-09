import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateProtectiveSwarmJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const nanoboticistFeatureRangeDots = (sheet?.subclassProgressionDots as any)?.nanoboticistFeatureRangeDots || [false, false, false];
  const nanoboticistFeatureIncludesAlliesDot = (sheet?.subclassProgressionDots as any)?.nanoboticistFeatureIncludesAlliesDot || [false];
  
  // Calculate dynamic values
  const rangeBonus = nanoboticistFeatureRangeDots.filter(Boolean).length;
  const totalRange = 1 + rangeBonus;
  const includesAllies = nanoboticistFeatureIncludesAlliesDot[0];
  
  return (
    <>
      <b><i style={{ color: '#57b8b0', fontSize: '1em' }}>Protective Swarm.</i></b> While your <i>Drone</i> is <b>[{totalRange}]</b>hx away from you or <b>[{includesAllies ? 'your allies' : ' - '}]</b>, any <b><i style={{ color: '#990000' }}>Attack</i></b> that targets you or <b>[{includesAllies ? 'your allies' : ' - '}]</b> automatically targets your <i>Drone</i> instead.
    </>
  );
};
