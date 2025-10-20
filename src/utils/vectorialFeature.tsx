import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateUnreasonableAccuracyJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const vectorialFeatureIgnoreCoverDots = (sheet?.subclassProgressionDots as any)?.vectorialFeatureIgnoreCoverDots || [false];
  const vectorialFeatureCritDots = (sheet?.subclassProgressionDots as any)?.vectorialFeatureCritDots || [false, false, false];
  const vectorialFeatureRangeDots = (sheet?.subclassProgressionDots as any)?.vectorialFeatureRangeDots || [false, false, false];
  
  // Calculate dynamic values
  const ignoreAllCover = vectorialFeatureIgnoreCoverDots[0];
  const critBonus = vectorialFeatureCritDots.filter(Boolean).length;
  const rangeBonus = 6 + vectorialFeatureRangeDots.filter(Boolean).length;
  
  // Dynamic text based on Ignore all Cover dot
  const coverText100 = ignoreAllCover ? 'all' : '100%';
  const coverText50 = ignoreAllCover ? 'no' : '50%';
  
  return (
    <>
      <b><i style={{ color: '#531c94', fontSize: '1em' }}>Unreasonable Accuracy.</i></b> You treat <b>[{coverText100}]</b> Cover as <b>[{coverText50}]</b> Cover when making <b><i style={{ color: '#990000', fontSize: '1em' }}>Attacks</i></b>. Additionally, all your <b><i style={{ color: '#990000', fontSize: '1em' }}>Attacks</i></b> have a +<b>[{rangeBonus}]</b>hx Range and a +<b>[{critBonus}]</b> to Crit.
    </>
  );
};
