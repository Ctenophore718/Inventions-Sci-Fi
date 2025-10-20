import React from 'react';
import type { CharacterSheet } from '../types/CharacterSheet';

export const generateFinalFistsJSX = (sheet: CharacterSheet | null): React.JSX.Element => {
  const strikeDamageDots = (sheet?.subclassProgressionDots as any)?.kineticFeatureStrikeDamageDots || [false, false, false];
  const moveHxDots = (sheet?.subclassProgressionDots as any)?.kineticFeatureMoveHxDots || [false, false, false];
  const extraStrikeD6 = strikeDamageDots.filter(Boolean).length;
  const extraMoveHx = moveHxDots.filter(Boolean).length;
  return (
    <>
      <b><i style={{ color: '#7b941c', fontSize: '1em' }}>Final Fists.</i></b> Whenever you reach 0 <b><i style={{ color: '#990000', fontSize: '1em' }}>Hit Points</i></b> in a battle, you can immediately <b><i style={{ color: '#38761d', fontSize: '1em' }}>Move</i></b> up to your <b><i style={{ color: '#38761d', fontSize: '1em' }}>Speed</i></b> +<b>[{extraMoveHx}]</b>hx and <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i></b> up to your <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i></b> amount with an extra +<b>[{extraStrikeD6}]</b>d6 <b><i style={{ color: '#351c75', fontSize: '1em' }}>Strike</i></b> Damage before falling unconscious.
    </>
  );
};
