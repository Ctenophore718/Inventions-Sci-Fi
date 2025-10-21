import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateBenefactionJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const astralTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.astralTechniqueRangeDots || [false, false, false];
  const astralTechniqueHitPointsDots = (sheet?.subclassProgressionDots as any)?.astralTechniqueHitPointsDots || [false, false, false];
  const astralTechniqueExceedMaxDots = (sheet?.subclassProgressionDots as any)?.astralTechniqueExceedMaxDots || [false];
  const astralTechniqueRemoveConditionsDots = (sheet?.subclassProgressionDots as any)?.astralTechniqueRemoveConditionsDots || [false];
  const astralTechniqueSpeedDots = (sheet?.subclassProgressionDots as any)?.astralTechniqueSpeedDots || [false, false];
  const astralTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.astralTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const range = 5 + astralTechniqueRangeDots.filter(Boolean).length;
  const hitPointsDice = 2 + astralTechniqueHitPointsDots.filter(Boolean).length * 2;
  const speed = astralTechniqueSpeedDots.filter(Boolean).length;
  const cooldown = 4 - astralTechniqueCooldownDots.filter(Boolean).length;
  const canExceedMax = astralTechniqueExceedMaxDots[0];
  const removesConditions = astralTechniqueRemoveConditionsDots[0];
  
  return (
    <>
      <b><i style={{ color: '#5bb1af', fontSize: '1em' }}>Benefaction</i></b> <i style={{ color: '#5bb1af', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You and allies within <b>[{range}]</b>hx gain +<b>[{speed}]</b> <b><i style={{ color: '#38761d' }}>Speed</i></b>, <b>[{hitPointsDice}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b> (which <b>[{canExceedMax ? 'can' : 'cannot'}]</b> exceed the <b><i style={{ color: '#990000' }}>Hit Point</i></b> max), and you remove <b>[{removesConditions ? 'all' : 'no'}]</b> conditions from yourself and all affected allies. In addition, each enemy in the same area suffers the <b><i>Blind</i></b> condition.
    </>
  );
};

export const generateBenefactionCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const astralTechniqueRangeDots = (sheet?.subclassProgressionDots as any)?.astralTechniqueRangeDots || [false, false, false];
  const astralTechniqueHitPointsDots = (sheet?.subclassProgressionDots as any)?.astralTechniqueHitPointsDots || [false, false, false];
  const astralTechniqueExceedMaxDots = (sheet?.subclassProgressionDots as any)?.astralTechniqueExceedMaxDots || [false];
  const astralTechniqueRemoveConditionsDots = (sheet?.subclassProgressionDots as any)?.astralTechniqueRemoveConditionsDots || [false];
  const astralTechniqueSpeedDots = (sheet?.subclassProgressionDots as any)?.astralTechniqueSpeedDots || [false, false];
  
  // Calculate dynamic values
  const range = 5 + astralTechniqueRangeDots.filter(Boolean).length;
  const hitPointsDice = 2 + astralTechniqueHitPointsDots.filter(Boolean).length * 2;
  const speed = astralTechniqueSpeedDots.filter(Boolean).length;
  const canExceedMax = astralTechniqueExceedMaxDots[0];
  const removesConditions = astralTechniqueRemoveConditionsDots[0];
  
  return (
    <>
      You and allies within <b>[{range}]</b>hx gain +<b>[{speed}]</b> <b><i style={{ color: '#38761d' }}>Speed</i></b>, <b>[{hitPointsDice}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b> (which <b>[{canExceedMax ? 'can' : 'cannot'}]</b> exceed the <b><i style={{ color: '#990000' }}>Hit Point</i></b> max), and you remove <b>[{removesConditions ? 'all' : 'no'}]</b> conditions from yourself and all affected allies. In addition, each enemy in the same area suffers the <b><i>Blind</i></b> condition.
    </>
  );
};
