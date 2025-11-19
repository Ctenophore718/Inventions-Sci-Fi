import React from 'react';

export interface CerebronychFeatureData {
  hasMesmerizeImmunity: boolean;
  hasToxicImmunity: boolean;
  hasChemicalImmunity: boolean;
}

/**
 * Calculate Cerebronych feature values based on species card dots
 */
export function calculateCerebronychFeatureData(speciesCardDots?: boolean[][]): CerebronychFeatureData {
  // Get Parasitic Composure dots
  const mesmerizeImmunityDots = speciesCardDots?.[0] || [];
  const toxicImmunityDots = speciesCardDots?.[1] || [];
  const chemicalImmunityDots = speciesCardDots?.[2] || [];
  
  return {
    hasMesmerizeImmunity: mesmerizeImmunityDots[0] === true,
    hasToxicImmunity: toxicImmunityDots[0] === true,
    hasChemicalImmunity: chemicalImmunityDots[0] === true
  };
}

/**
 * Generate the Parasitic Composure feature JSX with dynamic values
 */
export function generateParasiticComposureJSX(speciesCardDots?: boolean[][]): React.ReactElement {
  const { hasMesmerizeImmunity, hasToxicImmunity, hasChemicalImmunity } = calculateCerebronychFeatureData(speciesCardDots);
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f5e2b' }}>Parasitic Composure.</i></b> You are <i>Immune</i> to the <b><i>Confuse</i></b> and <b>[{hasMesmerizeImmunity ? <i>Mesmerize</i> : ' - '}]</b> condition(s) and have <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
        Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b> <b>[</b><i>{hasChemicalImmunity ? 'Immunity' : 'Resistance'}</i><b>]</b> and <b><u style={{ color: '#02b900', display: 'inline-flex', alignItems: 'center' }}>
        Toxic<img src="/Toxic.png" alt="Toxic" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} />
      </u></b> <b>[</b><i>{hasToxicImmunity ? 'Immunity' : 'Resistance'}</i><b>]</b>.
    </span>
  );
}
