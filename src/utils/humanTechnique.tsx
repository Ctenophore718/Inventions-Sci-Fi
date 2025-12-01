import React from 'react';

export const generateActionSurgeJSX = (cooldown: number, range: number) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#2b315f' }}>Action Surge</i></b> <span style={{ color: '#2b315f', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Until the start of the next round, you and allies within <b>[{range}]</b>hx gain 1 extra <i>Action</i>.
    </span>
  );
};

export const generateActionSurgeCardJSX = (range: number) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Until the start of the next round, you and allies within <b>[{range}]</b>hx gain 1 extra <i>Action</i>.
    </span>
  );
};
