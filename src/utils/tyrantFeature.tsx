import React from 'react';

export interface TyrantFeatureData {
  range: number;
  hasConfuseImmunity: boolean;
  hasMesmerizeImmunity: boolean;
}

/**
 * Calculate Tyrant feature values based on progression dots
 */
export function calculateTyrantFeatureData(
  featureHxDots?: boolean[],
  confuseImmunityDots?: boolean[],
  mesmerizeImmunityDots?: boolean[]
): TyrantFeatureData {
  // Base range is 3hx
  const range = 3 + (featureHxDots?.filter(Boolean).length || 0);
  
  // Confuse immunity: true if dot is selected
  const hasConfuseImmunity = confuseImmunityDots?.[0] || false;
  
  // Mesmerize immunity: true if dot is selected
  const hasMesmerizeImmunity = mesmerizeImmunityDots?.[0] || false;
  
  return { range, hasConfuseImmunity, hasMesmerizeImmunity };
}

/**
 * Generate the Fearless feature JSX with dynamic values
 */
export function generateFearlessJSX(
  featureHxDots?: boolean[],
  confuseImmunityDots?: boolean[],
  mesmerizeImmunityDots?: boolean[]
): React.ReactElement {
  const { range, hasConfuseImmunity, hasMesmerizeImmunity } = calculateTyrantFeatureData(
    featureHxDots,
    confuseImmunityDots,
    mesmerizeImmunityDots
  );
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
        <b><i style={{ color: '#ce1f1f' }}>Fearless.</i></b> You are <i>Immune</i> to the <b><i>Demoralize</i></b>, {hasConfuseImmunity ? <b>[<i>Confuse</i>]</b> : <b>[ - ]</b>} and {hasMesmerizeImmunity ? <b>[<i>Mesmerize</i>]</b> : <b>[ - ]</b>} condition(s), and so are any allies while they are within <b>[{range}]</b>hx of you.
    </span>
  );
}
