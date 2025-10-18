import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateTelekineticShieldJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const inertialFeatureReflectDots = (sheet?.subclassProgressionDots as any)?.inertialFeatureReflectDots || [false];
  
  // Calculate dynamic values
  const hasReflect = inertialFeatureReflectDots[0];
  
  return (
    <>
      <b><i style={{ color: '#1c945e', fontSize: '1em' }}>Telekinetic Shield.</i></b> You <i>Resist</i> all Damage while you are not suffering the <b><i>Sleep</i></b> condition and can reflect +<b>[{hasReflect ? <>1</> : '0'}]</b>d6 of the same Damage type back to the source of the Damage.
    </>
  );
};
