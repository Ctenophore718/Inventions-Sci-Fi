import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateVectorCloneJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const vectorialTechniqueCloneDots = (sheet?.subclassProgressionDots as any)?.vectorialTechniqueCloneDots || [false, false];
  const vectorialTechniqueAttackDots = (sheet?.subclassProgressionDots as any)?.vectorialTechniqueAttackDots || [false];
  const vectorialTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.vectorialTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const clones = 1 + vectorialTechniqueCloneDots.filter(Boolean).length;
  const attacks = 1 + (vectorialTechniqueAttackDots[0] ? 1 : 0);
  const cooldown = 4 - vectorialTechniqueCooldownDots.filter(Boolean).length;
  
  return (
    <>
      <b><i style={{ color: '#531c94', fontSize: '1em' }}>Vector Clone</i></b> <i style={{ color: '#531c94', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> You summon <b>[{clones}]</b> clone(s) of yourself in an adjacent hx. {clones > 1 ? 'They' : 'It'} can <b><i style={{ color: '#38761d', fontSize: '1em' }}>Move</i></b>, <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i></b> and make <b>[{attacks}]</b> <b><i>Primary</i></b> <b><i style={{ color: '#990000', fontSize: '1em' }}>Attack(s)</i></b>, all of which use your stats and doesn't cost any <i>Actions</i>. The clone(s) dissipate at the end of your turn or if they take Damage for any reason.
    </>
  );
};

export const generateVectorCloneCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const vectorialTechniqueCloneDots = (sheet?.subclassProgressionDots as any)?.vectorialTechniqueCloneDots || [false, false];
  const vectorialTechniqueAttackDots = (sheet?.subclassProgressionDots as any)?.vectorialTechniqueAttackDots || [false];
  
  // Calculate dynamic values
  const clones = 1 + vectorialTechniqueCloneDots.filter(Boolean).length;
  const attacks = 1 + (vectorialTechniqueAttackDots[0] ? 1 : 0);
  
  return (
    <>
      You summon <b>[{clones}]</b> clone(s) of yourself in an adjacent hx. {clones > 1 ? 'They' : 'It'} can <b><i style={{ color: '#38761d' }}>Move</i></b>, <b><i style={{ color: '#351c75' }}>Strike</i></b> and make <b>[{attacks}]</b> <b><i>Primary</i></b> <b><i style={{ color: '#990000' }}>Attack(s)</i></b>, all of which use your stats and doesn't cost any <i>Actions</i>. The clone(s) dissipate at the end of your turn or if they take Damage for any reason.
    </>
  );
};
