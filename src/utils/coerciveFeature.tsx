import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateFieldOfCoercionJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const coerciveFeatureDots = sheet?.subclassProgressionDots?.coerciveFeatureDots || [false, false, false];
  const coerciveFeatureAllyAttackDots = sheet?.subclassProgressionDots?.coerciveFeatureAllyAttackDots || [false];
  
  // Calculate dynamic values
  const range = 5 + coerciveFeatureDots.filter(Boolean).length;
  const hasAllyAttack = coerciveFeatureAllyAttackDots[0];
  
  return (
    <>
      <b><i style={{ color: '#43c9ff', fontSize: '1em' }}>Field of Coercion.</i></b> You and allies within <b>[{range}]</b>hx are <i>Immune</i> to <b><i>Confuse</i></b> and <b><i>Mesmerize</i></b>, and your allies' <b><i style={{ color: '#990000', fontSize: '1em' }}>Attacks</i></b> inflict the {hasAllyAttack ? <><b>[</b><b><i>Mesmerize</i></b><b>]</b></> : <b>[ - ]</b>} condition. Additionally, enemies within <b>[{range}]</b>hx cannot benefit from <b><i>Confuse</i></b> or <b><i>Mesmerize</i></b> <i>Immunity</i>.
    </>
  );
};