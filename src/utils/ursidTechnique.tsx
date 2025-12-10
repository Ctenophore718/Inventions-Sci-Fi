import React from "react";

export const generateProtectiveInstinctsJSX = (cooldown: number, rangeBonus: number = 0, damageResist: boolean = false) => {
  const range = 3 + rangeBonus;
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#9026b1' }}>Protective Instincts</i></b> <i style={{ color: '#9026b1', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Until the beginning of the next round, allies within <b>[{range}]</b>hx of you take half Damage (rounded down), and you take the remaining Damage dealt, which you <b>[</b>{damageResist ? <><i>Resist</i></> : ' - '}<b>]</b>.
    </span>
  );
};

export const generateProtectiveInstinctsCardJSX = (rangeBonus: number = 0, damageResist: boolean = false) => {
  const range = 3 + rangeBonus;
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Until the beginning of the next round, allies within <b>[{range}]</b>hx of you take half Damage (rounded down), and you take the remaining Damage dealt, which you <b>[</b>{damageResist ? <><i>Resist</i></> : ' - '}<b>]</b>.
    </span>
  );
};
