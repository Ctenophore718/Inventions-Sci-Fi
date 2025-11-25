import React from 'react';

export const generateLeafOnTheWindJSX = (moveDistance?: number) => {
  const distance = moveDistance || 1;
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#5f8a5f' }}>Leaf on the Wind.</i></b> You have a <b><i style={{ color: '#38761d' }}>Fly Speed</i></b>. Additionally, you can <b><i style={{ color: '#38761d' }}>Move</i></b> <b>[{distance}]</b>hx after you take any Damage.
    </span>
  );
};
