import React from 'react';

export interface AnatomistFeatureData {
  range: number;
  conditionType: string;
}

/**
 * Calculate Anatomist subclass feature values based on progression dots
 */
export function calculateAnatomistFeatureData(
  anatomistFeatureDots?: boolean[],
  anatomistPrecisionHxDots?: boolean[]
): AnatomistFeatureData {
  // Base range is 3hx
  let range = 3;
  
  // Add 1hx for each Precision +1hx dot selected
  if (anatomistPrecisionHxDots) {
    range += anatomistPrecisionHxDots.filter(Boolean).length;
  }
  
  // Condition type changes based on feature dot
  const conditionType = anatomistFeatureDots?.[0] ? 'condition' : '-';
  
  return {
    range,
    conditionType
  };
}

/**
 * Generate the Anatomical Precision feature JSX with dynamic values
 */
export function generateAnatomicalPrecisionJSX(
  anatomistFeatureDots?: boolean[],
  anatomistPrecisionHxDots?: boolean[]
): React.ReactElement {
  const { range, conditionType } = calculateAnatomistFeatureData(anatomistFeatureDots, anatomistPrecisionHxDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#66cf00' }}>Anatomical Precision.</i></b> You and all allies within <b>[{range}]</b>hx of you ignore any Damage and <b>[{conditionType}]</b> <i>Resistances</i> and/or <i>Immunities</i>.
    </span>
  );
}
