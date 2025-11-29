import React from 'react';

export const generateIronCarapaceJSX = (cooldown: number, healingBonus: number, hasRemoveConditions: boolean) => {
  const conditionsText = hasRemoveConditions ? 'remove' : ' - ';
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f422b' }}>Iron Carapace</i></b> <span style={{ color: '#5f422b', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You immediately heal <b>[{healingBonus}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b> and <i>Resist</i> all <i>Damage</i> until the start of the next round. Additionally, you <b>[{conditionsText}]</b> all conditions you currently have.
    </span>
  );
};

export const generateIronCarapaceCardJSX = (cooldown: number, healingBonus: number, hasRemoveConditions: boolean) => {
  const conditionsText = hasRemoveConditions ? 'remove' : ' - ';
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      You immediately heal <b>[{healingBonus}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b> and <i>Resist</i> all <i>Damage</i> until the start of the next round. Additionally, you <b>[{conditionsText}]</b> all conditions you currently have.
    </span>
  );
};
