import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateAirArmorJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const airFeatureForceImmunityDots = (sheet?.subclassProgressionDots as any)?.airFeatureForceImmunityDots || [false];
  const airFeatureForceAbsorptionDots = (sheet?.subclassProgressionDots as any)?.airFeatureForceAbsorptionDots || [false];
  const airFeatureElectricResistanceDots = (sheet?.subclassProgressionDots as any)?.airFeatureElectricResistanceDots || [false];
  const airFeatureElectricImmunityDots = (sheet?.subclassProgressionDots as any)?.airFeatureElectricImmunityDots || [false];
  const airFeatureRestrainImmunityDots = (sheet?.subclassProgressionDots as any)?.airFeatureRestrainImmunityDots || [false];
  
  // Determine protection levels
  const hasForceImmunity = airFeatureForceImmunityDots[0];
  const hasForceAbsorption = airFeatureForceAbsorptionDots[0];
  const hasElectricResistance = airFeatureElectricResistanceDots[0];
  const hasElectricImmunity = airFeatureElectricImmunityDots[0];
  const hasRestrainImmunity = airFeatureRestrainImmunityDots[0];
  
  let forceProtection = 'Resist';
  if (hasForceAbsorption) {
    forceProtection = 'Absorb';
  } else if (hasForceImmunity) {
    forceProtection = 'are Immune to';
  }
  
  let electricProtection = ' - ';
  if (hasElectricImmunity) {
    electricProtection = 'are Immune to';
  } else if (hasElectricResistance) {
    electricProtection = 'Resist';
  }
  
  return (
    <>
      <b><i style={{ color: '#0ee2df', fontSize: '1em' }}>Air Armor.</i></b> You <b>[</b><i>{forceProtection}</i><b>]</b> <b><u style={{ color: '#516fff', display: 'inline-flex', alignItems: 'center' }}>
      Force<img src="/Force.png" alt="Force" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b> Damage{electricProtection && <>, and you <b>[</b><i>{electricProtection}</i><b>]</b> <b><u style={{ color: '#d5d52a', display: 'inline-flex', alignItems: 'center' }}>
      Electric<img src="/Electric.png" alt="Electric" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
  </u></b> and are <i>Immune</i> to <b>[</b><b><i>{hasRestrainImmunity ? 'Restrain' : ' - '}</i></b><b>]</b></>}.
    </>
  );
};
