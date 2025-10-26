import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateWaterArmorJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const waterFeatureColdImmunityDots = (sheet?.subclassProgressionDots as any)?.waterFeatureColdImmunityDots || [false];
  const waterFeatureColdAbsorptionDots = (sheet?.subclassProgressionDots as any)?.waterFeatureColdAbsorptionDots || [false];
  const waterFeatureToxicResistanceDots = (sheet?.subclassProgressionDots as any)?.waterFeatureToxicResistanceDots || [false];
  const waterFeatureToxicImmunityDots = (sheet?.subclassProgressionDots as any)?.waterFeatureToxicImmunityDots || [false];
  const waterFeatureSpikeImmunityDots = (sheet?.subclassProgressionDots as any)?.waterFeatureSpikeImmunityDots || [false];
  
  // Determine protection levels
  const hasColdImmunity = waterFeatureColdImmunityDots[0];
  const hasColdAbsorption = waterFeatureColdAbsorptionDots[0];
  const hasToxicResistance = waterFeatureToxicResistanceDots[0];
  const hasToxicImmunity = waterFeatureToxicImmunityDots[0];
  const hasSpikeImmunity = waterFeatureSpikeImmunityDots[0];
  
  let coldProtection = 'Resist';
  if (hasColdAbsorption) {
    coldProtection = 'Absorb';
  } else if (hasColdImmunity) {
    coldProtection = 'are Immune to';
  }
  
  let toxicProtection = ' - ';
  if (hasToxicImmunity) {
    toxicProtection = 'are Immune to';
  } else if (hasToxicResistance) {
    toxicProtection = 'Resist';
  }
  
  return (
    <>
      <b><i style={{ color: '#0e42e2', fontSize: '1em' }}>Water Armor.</i></b> You <b>[</b><i>{coldProtection}</i><b>]</b> <b><u style={{ color: '#3ebbff', display: 'inline-flex', alignItems: 'center' }}>
      Cold<img src="/Cold.png" alt="Cold" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b> Damage{toxicProtection && <>, and you <b>[</b><i>{toxicProtection}</i><b>]</b> <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
      Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
  </u></b> and are <i>Immune</i> to <b>[</b><b><i>{hasSpikeImmunity ? 'Spike' : ' - '}</i></b><b>]</b></>}.
    </>
  );
};
