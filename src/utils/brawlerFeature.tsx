import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateFightinDirtyJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const brawlerFeatureConditionDots = (sheet?.subclassProgressionDots as any)?.brawlerFeatureConditionDots || [false];
  const brawlerFeatureCounterDots = (sheet?.subclassProgressionDots as any)?.brawlerFeatureCounterDots || [false];
  
  // Calculate dynamic values
  const hasExtraCondition = brawlerFeatureConditionDots[0];
  const hasCounter = brawlerFeatureCounterDots[0];
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#d8a53d' }}>Fightin' Dirty.</i></b> When you <b><i style={{ color: '#351c75' }}>Strike</i></b> an enemy or when an enemy <b>[{hasCounter ? <i style={{ color: '#351c75' }}>Strikes</i> : ' - '}]</b> you, you inflict <b>[{hasExtraCondition ? '2' : '1'}]</b> of the following conditions: <b><i>Blind</i></b>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#915927', display: 'inline-flex', alignItems: 'center' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b>, or <b><i>Restrain</i></b>.
    </span>
  );
};
