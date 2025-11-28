import React from 'react';

export const generateBlazingLeapJSX = (cooldown: number, rangeBonus: number, damageBonus: number, repeatCount: number) => {
  const repeatText = repeatCount > 0 ? ` Repeat this <b><u style={{ color: '#d63300', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <i>Teleport</i> <b>[${repeatCount}]</b> more time${repeatCount > 1 ? 's' : ''}.` : '';
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#b31111' }}>Blazing Leap</i></b> <span style={{ color: '#b31111', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Enemies within <b>[{rangeBonus}]</b>hx of you take <b>[{damageBonus}]</b>d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>. You then <b><i style={{ color: '#38761d' }}>Teleport</i></b> up to 4hx. You can repeat this Damage-and-<b><i style={{ color: '#38761d' }}>Teleportation</i></b> an additional <b>[{repeatCount}]</b> time(s).
    </span>
  );
};

export const generateBlazingLeapCardJSX = (cooldown: number, rangeBonus: number, damageBonus: number, repeatCount: number) => {
  const repeatText = repeatCount > 0 ? ` Repeat this <b><u style={{ color: '#d63300', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b> and <i>Teleport</i> <b>[${repeatCount}]</b> more time${repeatCount > 1 ? 's' : ''}.` : '';
  
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Enemies within <b>[{rangeBonus}]</b>hx of you take <b>[{damageBonus}]</b>d6 <b><u style={{ color: '#f90102', display: 'inline-flex', alignItems: 'center' }}>Fire<img src="/Fire.png" alt="Fire" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: 'middle' }} /></u></b>. You then <b><i style={{ color: '#38761d' }}>Teleport</i></b> up to 4hx. You can repeat this Damage-and-<b><i style={{ color: '#38761d' }}>Teleportation</i></b> an additional <b>[{repeatCount}]</b> time(s).
    </span>
  );
};
