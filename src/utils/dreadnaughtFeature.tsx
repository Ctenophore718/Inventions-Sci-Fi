import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateToweringDefenseJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const dreadnaughtFeatureBounceImmunityDots = (sheet?.subclassProgressionDots as any)?.dreadnaughtFeatureBounceImmunityDots || [false];
  const dreadnaughtFeatureMesmerizeImmunityDots = (sheet?.subclassProgressionDots as any)?.dreadnaughtFeatureMesmerizeImmunityDots || [false];
  const dreadnaughtFeatureRestrainImmunityDots = (sheet?.subclassProgressionDots as any)?.dreadnaughtFeatureRestrainImmunityDots || [false];
  const dreadnaughtFeatureSlamImmunityDots = (sheet?.subclassProgressionDots as any)?.dreadnaughtFeatureSlamImmunityDots || [false];
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#d83da0' }}>Towering Defense.</i></b> When resolving <b><i style={{ color: '#990000' }}>Attacks</i></b>, other creatures treat you as 100% <i>Cover</i>. Additionally, while wearing your <i>Exosuit</i>, your size is 3hx. You also are <i>Immune</i> to <b>[{dreadnaughtFeatureBounceImmunityDots[0] ? <i>Bounce</i> : ' - '}]</b>, <b>[{dreadnaughtFeatureMesmerizeImmunityDots[0] ? <i>Mesmerize</i> : ' - '}]</b>, <b>[{dreadnaughtFeatureRestrainImmunityDots[0] ? <i>Restrain</i> : ' - '}]</b> and <b>[{dreadnaughtFeatureSlamImmunityDots[0] ? <i>Slam</i> : ' - '}]</b>.
    </span>
  );
};
