import React from 'react';

export const generateTenacityJSX = (cooldown: number, rangeBonus: number, hpBonus: number, critBonus: number, strikeBonus: number, attackBonus: number) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#6d7156' }}>Tenacity</i></b> <span style={{ color: '#6d7156', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You and each ally within <b>[{3 + rangeBonus}]</b>hx of you gain +1hx <b><i style={{ color: '#38761d' }}>Speed</i></b>, +<b>[{hpBonus}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>, +<b>[{critBonus}]</b> Crit, +<b>[{strikeBonus}]</b>d6 <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage and/or +<b>[{attackBonus}]</b>d6 <b><i style={{ color: '#990000' }}>Attack</i></b> Damage until the start of the next round.
    </span>
  );
};

export const generateTenacityCardJSX = (cooldown: number, rangeBonus: number, hpBonus: number, critBonus: number, strikeBonus: number, attackBonus: number) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      You and each ally within <b>[{3 + rangeBonus}]</b>hx of you gain +1hx <b><i style={{ color: '#38761d' }}>Speed</i></b>, +<b>[{hpBonus}]</b>d6 <b><i style={{ color: '#990000' }}>Hit Points</i></b>, +<b>[{critBonus}]</b> Crit, +<b>[{strikeBonus}]</b>d6 <b><i style={{ color: '#351c75' }}>Strike</i></b> Damage and/or +<b>[{attackBonus}]</b>d6 <b><i style={{ color: '#990000' }}>Attack</i></b> Damage until the start of the next round.
    </span>
  );
};
