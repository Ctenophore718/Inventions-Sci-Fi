import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateSavageryJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const chaosTechniqueInflictSpikeDots = (sheet?.subclassProgressionDots as any)?.chaosTechniqueInflictSpikeDots || [false];
  const chaosTechniqueInflictDemorizeDots = (sheet?.subclassProgressionDots as any)?.chaosTechniqueInflictDemorizeDots || [false];
  const chaosTechniqueTripleDamageDots = (sheet?.subclassProgressionDots as any)?.chaosTechniqueTripleDamageDots || [false];
  const chaosTechniqueCooldownDots = (sheet?.subclassProgressionDots as any)?.chaosTechniqueCooldownDots || [false, false];
  
  // Calculate dynamic values
  const cooldown = 4 - chaosTechniqueCooldownDots.filter(Boolean).length;
  const hasInflictSpike = chaosTechniqueInflictSpikeDots[0];
  const hasInflictDemoralize = chaosTechniqueInflictDemorizeDots[0];
  const damageMultiplier = chaosTechniqueTripleDamageDots[0] ? 'Triple' : 'Double';
  
  return (
    <>
      <b><i style={{ color: '#b15b6c', fontSize: '1em' }}>Savagery</i></b> <i style={{ color: '#b15b6c', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> <b>[{damageMultiplier}]</b> your <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage dice and inflict <b>[</b>
      {hasInflictSpike ? (
        <>
          <b><i>Spike</i></b> <b>(</b><span style={{ color: '#808080', textDecoration: 'underline', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></span><b>)</b>
        </>
      ) : (
        ' - '
      )}
      <b>]</b> and <b>[</b>
      {hasInflictDemoralize ? (
        <b><i>Demoralize</i></b>
      ) : (
        ' - '
      )}
      <b>]</b> on your <b><i style={{ color: '#351c75' }}>Strikes</i></b> until the start of the next round.
    </>
  );
};

export const generateSavageryCardJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  // Get progression dots from sheet
  const chaosTechniqueInflictSpikeDots = (sheet?.subclassProgressionDots as any)?.chaosTechniqueInflictSpikeDots || [false];
  const chaosTechniqueInflictDemorizeDots = (sheet?.subclassProgressionDots as any)?.chaosTechniqueInflictDemorizeDots || [false];
  const chaosTechniqueTripleDamageDots = (sheet?.subclassProgressionDots as any)?.chaosTechniqueTripleDamageDots || [false];
  
  // Calculate dynamic values
  const hasInflictSpike = chaosTechniqueInflictSpikeDots[0];
  const hasInflictDemoralize = chaosTechniqueInflictDemorizeDots[0];
  const damageMultiplier = chaosTechniqueTripleDamageDots[0] ? 'Triple' : 'Double';
  
  return (
    <>
      <b>[{damageMultiplier}]</b> your <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage dice and inflict <b>[</b>
      {hasInflictSpike ? (
        <>
          <b><i>Spike</i></b> <b>(</b><span style={{ color: '#808080', textDecoration: 'underline', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></span><b>)</b>
        </>
      ) : (
        ' - '
      )}
      <b>]</b> and <b>[</b>
      {hasInflictDemoralize ? (
        <b><i>Demoralize</i></b>
      ) : (
        ' - '
      )}
      <b>]</b> on your <b><i style={{ color: '#351c75' }}>Strikes</i></b> until the start of the next round.
    </>
  );
};
