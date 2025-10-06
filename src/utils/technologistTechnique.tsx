import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateForceFieldJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const technologistTechniqueDots = (sheet?.subclassProgressionDots as any)?.technologistTechniqueDots || [false, false, false];
  const technologistTechniqueTargetDots = (sheet?.subclassProgressionDots as any)?.technologistTechniqueTargetDots || [false, false, false];
  const technologistTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.technologistTechniqueCooldownDots || [false, false];
  const technologistTechniqueReflectHalfDots = (sheet?.subclassProgressionDots as any)?.technologistTechniqueReflectHalfDots || [false];
  const technologistTechniqueReflectFullDots = (sheet?.subclassProgressionDots as any)?.technologistTechniqueReflectFullDots || [false];
  
  // Calculate dynamic values
  const range = 3 + technologistTechniqueDots.filter(Boolean).length;
  const cooldown = 3 - technologistTechniqueCooldownDots.filter(Boolean).length;
  const targets = 1 + technologistTechniqueTargetDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#8c43ff', fontSize: '1em' }}>Force Field</i></b> <i style={{ color: '#8c43ff', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Choose yourself or an ally within <b>[{range}]</b>hx. The next <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> made against you or that ally automatically deals no Damage, conditions or other effects, and it reflects <b>[{technologistTechniqueReflectHalfDots[0] && !technologistTechniqueReflectFullDots[0] ? <>half</> : technologistTechniqueReflectFullDots[0] ? <>full</> : ' - '}]</b> Damage dealt against <b>[{targets}]</b> target(s) within the Range of the original <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>.
    </>
  );
};

export const generateForceFieldCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const technologistTechniqueDots = (sheet?.subclassProgressionDots as any)?.technologistTechniqueDots || [false, false, false];
  const technologistTechniqueTargetDots = (sheet?.subclassProgressionDots as any)?.technologistTechniqueTargetDots || [false, false, false];
  const technologistTechniqueReflectHalfDots = (sheet?.subclassProgressionDots as any)?.technologistTechniqueReflectHalfDots || [false];
  const technologistTechniqueReflectFullDots = (sheet?.subclassProgressionDots as any)?.technologistTechniqueReflectFullDots || [false];
  
  // Calculate dynamic values
  const range = 3 + technologistTechniqueDots.filter(Boolean).length;
  const targets = 1 + technologistTechniqueTargetDots.filter(Boolean).length;
  
  return (
    <>
      Choose yourself or an ally within <b>[{range}]</b>hx. The next <b><i><span style={{ color: '#990000' }}>Attack</span></i></b> made against you or that ally automatically deals no Damage, conditions or other effects, and it reflects <b>[{technologistTechniqueReflectHalfDots[0] && !technologistTechniqueReflectFullDots[0] ? <>half</> : technologistTechniqueReflectFullDots[0] ? <>full</> : ' - '}]</b> Damage dealt against <b>[{targets}]</b> target(s) within the Range of the original <b><i><span style={{ color: '#990000' }}>Attack</span></i></b>.
    </>
  );
};