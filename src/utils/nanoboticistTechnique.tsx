import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateVersatileSwarmJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const nanoboticistTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.nanoboticistTechniqueRangeDots || [false, false, false];
  const nanoboticistTechniqueConditionDots = (sheet?.subclassProgressionDots as any)?.nanoboticistTechniqueConditionDots || [false, false];
  const nanoboticistTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.nanoboticistTechniqueCooldownDots || [false, false];
  const nanoboticistTechniqueFromDroneDot = (sheet?.subclassProgressionDots as any)?.nanoboticistTechniqueFromDroneDot || [false];
  
  // Calculate dynamic values
  const rangeBonus = nanoboticistTechniqueRangeDots.filter(Boolean).length;
  const totalRange = 3 + rangeBonus;
  const conditionBonus = nanoboticistTechniqueConditionDots.filter(Boolean).length;
  const totalConditions = 1 + conditionBonus;
  const cooldownReduction = nanoboticistTechniqueCooldownDots.filter(Boolean).length;
  const cooldown = 4 - cooldownReduction;
  const fromDrone = nanoboticistTechniqueFromDroneDot[0];
  
  return (
    <>
      <b><i style={{ color: '#57b8b0', fontSize: '1em' }}>Versatile Swarm</i></b> <i style={{ color: '#57b8b0', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Enemies within <b>[{totalRange}]</b>hx of you or <b>[{fromDrone ? 'your Drone(s)' : ' - '}]</b> are subjected to your choice of <b>[{totalConditions}]</b> of the following conditions: <b><i>Blind</i></b>, <b><i>Spike</i></b> <b>(</b><b><u style={{ color: '#666', display: 'inline-flex', alignItems: 'center' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b>, <b><i>Restrain</i></b>, or <b><i>Slam</i></b> 3hx.
    </>
  );
};

export const generateVersatileSwarmCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const nanoboticistTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.nanoboticistTechniqueRangeDots || [false, false, false];
  const nanoboticistTechniqueConditionDots = (sheet?.subclassProgressionDots as any)?.nanoboticistTechniqueConditionDots || [false, false];
  const nanoboticistTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.nanoboticistTechniqueCooldownDots || [false, false];
  const nanoboticistTechniqueFromDroneDot = (sheet?.subclassProgressionDots as any)?.nanoboticistTechniqueFromDroneDot || [false];
  
  // Calculate dynamic values
  const rangeBonus = nanoboticistTechniqueRangeDots.filter(Boolean).length;
  const totalRange = 3 + rangeBonus;
  const conditionBonus = nanoboticistTechniqueConditionDots.filter(Boolean).length;
  const totalConditions = 1 + conditionBonus;
  const cooldownReduction = nanoboticistTechniqueCooldownDots.filter(Boolean).length;
  const cooldown = 4 - cooldownReduction;
  const fromDrone = nanoboticistTechniqueFromDroneDot[0];
  
  return (
    <>
    Enemies within <b>[{totalRange}]</b>hx of you or <b>[{fromDrone ? 'your Drone(s)' : ' - '}]</b> are subjected to your choice of <b>[{totalConditions}]</b> of the following conditions: <b><i>Blind</i></b>, <b><i>Spike</i></b> <br />
    <b>(</b><b><u style={{ color: '#666', display: 'inline-flex', alignItems: 'center' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 14, height: 14, marginLeft: 2, verticalAlign: 'middle' }} /></u></b><b>)</b>, <b><i>Restrain</i></b>, or <b><i>Slam</i></b> 3hx.
    </>
  );
};
