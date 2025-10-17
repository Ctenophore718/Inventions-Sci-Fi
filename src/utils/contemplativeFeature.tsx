import React from 'react';

export interface ContemplativeFeatureData {
  neuralResistance: string;
  extraStrikes: number;
  canStrikeMultipleTimes: string;
}

/**
 * Calculate Contemplative feature values based on class card dots
 */
export function calculateContemplativeFeatureData(classCardDots?: boolean[][]): ContemplativeFeatureData {
  // Get the Neural Immunity dot (array index 0)
  const neuralImmunityDots = classCardDots?.[0] || [];
  const neuralResistance = neuralImmunityDots[0] ? 'Immune' : 'Resistant';
  
  // Get the +1 Strike dot (array index 1)
  const extraStrikeDots = classCardDots?.[1] || [];
  const extraStrikes = 1 + (extraStrikeDots[0] ? 1 : 0);
  
  // Get the Strike single target multiple times dot (array index 2)
  const multipleStrikesDots = classCardDots?.[2] || [];
  const canStrikeMultipleTimes = multipleStrikesDots[0] ? 'multiple' : ' - ';
  
  return { neuralResistance, extraStrikes, canStrikeMultipleTimes };
}

/**
 * Generate the Psychosomatic Harmony feature JSX with dynamic values
 */
export function generatePsychosomaticHarmonyJSX(classCardDots?: boolean[][]): React.ReactElement {
  const { neuralResistance, extraStrikes, canStrikeMultipleTimes } = calculateContemplativeFeatureData(classCardDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#116372', fontSize: '1em' }}>Psychosomatic Harmony.</i></b>{' '}
      <span style={{ fontSize: '1em', fontWeight: 400 }}>
        You are <b>[</b><i>{neuralResistance}</i><b>]</b> to{' '}
        <b>
          <u style={{ color: '#a929ff', display: 'inline-flex', alignItems: 'center' }}>
            Neural
            <img src="/Neural.png" alt="Neural" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} />
          </u>
        </b>{' '}
        and can <b><i style={{ color: '#351c75' }}>Strike</i></b> <b>[{extraStrikes}]</b> extra time(s) per turn. Additionally, you can{' '}
        <b><i style={{ color: '#351c75' }}>Strike</i></b> a single target <b>[{canStrikeMultipleTimes}]</b> times.
      </span>
    </span>
  );
}
