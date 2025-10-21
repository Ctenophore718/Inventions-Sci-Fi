import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateArmoredGuardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const orderFeatureRangeDots = (sheet?.subclassProgressionDots as any)?.orderFeatureRangeDots || [false, false, false];
  const orderFeatureResistDots = (sheet?.subclassProgressionDots as any)?.orderFeatureResistDots || [false];
  const orderFeatureReflectDots = (sheet?.subclassProgressionDots as any)?.orderFeatureReflectDots || [false];
  
  // Calculate dynamic values
  const range = 3 + orderFeatureRangeDots.filter(Boolean).length;
  const hasResist = orderFeatureResistDots[0];
  const hasReflect = orderFeatureReflectDots[0];
  
  return (
    <>
      <b><i style={{ color: '#aeb15b', fontSize: '1em' }}>Armored Guard.</i></b> Whenever an ally within <b>[{range}]</b>hx of you takes Damage, you can immediately <b><i style={{ color: '#38761d' }}>Move</i></b> to a hx adjacent to the ally and take the Damage instead, which you <b>[</b>{hasResist ? <i>Resist</i> : <b> - </b>}<b>]</b> and can <b>[</b>{hasReflect ? <i>Reflect</i> : <b> - </b>}<b>]</b> half of it back to its source.
    </>
  );
};
