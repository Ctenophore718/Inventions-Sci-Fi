import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateFireArmorJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const fireFeatureFireImmunityDots = (sheet?.subclassProgressionDots as any)?.fireFeatureFireImmunityDots || [false];
  const fireFeatureFireAbsorptionDots = (sheet?.subclassProgressionDots as any)?.fireFeatureFireAbsorptionDots || [false];
  const fireFeatureChemicalResistanceDots = (sheet?.subclassProgressionDots as any)?.fireFeatureChemicalResistanceDots || [false];
  const fireFeatureChemicalImmunityDots = (sheet?.subclassProgressionDots as any)?.fireFeatureChemicalImmunityDots || [false];
  const fireFeatureDemoralizeImmunityDots = (sheet?.subclassProgressionDots as any)?.fireFeatureDemoralizeImmunityDots || [false];
  
  // Determine protection levels
  const hasFireImmunity = fireFeatureFireImmunityDots[0];
  const hasFireAbsorption = fireFeatureFireAbsorptionDots[0];
  const hasChemicalResistance = fireFeatureChemicalResistanceDots[0];
  const hasChemicalImmunity = fireFeatureChemicalImmunityDots[0];
  const hasDemoralizeImmunity = fireFeatureDemoralizeImmunityDots[0];
  
  let fireProtection = 'Resist';
  if (hasFireAbsorption) {
    fireProtection = 'Absorb';
  } else if (hasFireImmunity) {
    fireProtection = 'are Immune to';
  }
  
  let chemicalProtection = ' - ';
  if (hasChemicalImmunity) {
    chemicalProtection = 'are Immune to';
  } else if (hasChemicalResistance) {
    chemicalProtection = 'Resist';
  }
  
  return (
    <>
      <b><i style={{ color: '#e20e0e', fontSize: '1em' }}>Fire Armor.</i></b> You <b>[</b><i>{fireProtection}</i><b>]</b> <b><u style={{ color: '#e20e0e', display: 'inline-flex', alignItems: 'center' }}>
      Fire<img src="/Fire.png" alt="Fire" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
      </u></b> Damage{chemicalProtection && <>, and you <b>[</b><i>{chemicalProtection}</i><b>]</b> <b><u style={{ color: '#de7204', display: 'inline-flex', alignItems: 'center' }}>
      Chemical<img src="/Chemical.png" alt="Chemical" style={{ width: 14, height: 14, verticalAlign: 'middle', marginLeft: 2 }} />
  </u></b></>}, and are <i>Immune</i> to <b>[</b><b><i>{hasDemoralizeImmunity ? 'Demoralize' : ' - '}</i></b><b>]</b>.
    </>
  );
};
