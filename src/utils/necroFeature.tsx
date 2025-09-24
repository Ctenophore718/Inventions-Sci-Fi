import React from 'react';

export interface NecroFeatureData {
  range: number;
  damageReductionType: string;
}

/**
 * Calculate Necro subclass feature values based on progression dots
 */
export function calculateNecroFeatureData(
  necroFeatureDots?: boolean[],
  necroIgnoreDamageDots?: boolean[]
): NecroFeatureData {
  // Base range is 5hx, +1hx for each feature dot selected
  const range = 5 + (necroFeatureDots?.filter(Boolean).length || 0);
  
  // Damage reduction type changes based on ignore damage dot
  const damageReductionType = necroIgnoreDamageDots?.[0] ? 'ignore' : 'halve';
  
  return {
    range,
    damageReductionType
  };
}

/**
 * Generate the Bodysnatcher feature JSX with dynamic values
 */
export function generateBodySnatcherJSX(
  necroFeatureDots?: boolean[],
  necroIgnoreDamageDots?: boolean[]
): React.ReactElement {
  const { range, damageReductionType } = calculateNecroFeatureData(necroFeatureDots, necroIgnoreDamageDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '1em' }}>
      <b><i style={{ color: '#0033cf', fontSize: '1em' }}>Bodysnatcher.</i></b> <span style={{ fontSize: '1em', fontWeight: 400 }}>
        Whenever a creature dies within <b>[{range}]</b>hx of you, you gain a <i>Chem Token</i>. Additionally, when you take Damage, you can spend a <i>Chem Token</i> to <b>[{damageReductionType}]</b> that Damage.
      </span>
    </span>
  );
}