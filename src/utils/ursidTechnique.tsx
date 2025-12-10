import React from "react";

export const generateProtectiveInstinctsJSX = (cooldown: number, damageResist: number = 0, damageResistCount: number = 0) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#4a5568' }}>Protective Instincts</i></b> <i style={{ color: '#4a5568', fontSize: '1em' }}>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i> Allies within <b>3hx</b> take <b>half <i style={{ color: '#990000' }}>Damage</i></b> (rounded down), and you take the remaining <b><i style={{ color: '#990000' }}>Damage</i></b> dealt{damageResist > 0 ? `, reducing it by [${damageResist}]` : ''}{damageResistCount > 0 ? `, and you <b><i style={{ color: '#1a56db' }}>Resist</i></b> all <b><i style={{ color: '#990000' }}>Damage</i></b> [${damageResistCount}]` : ''}.
    </span>
  );
};

export const generateProtectiveInstinctsCardJSX = (damageResist: number = 0, damageResistCount: number = 0) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Allies within <b>3hx</b> take <b>half <i style={{ color: '#990000' }}>Damage</i></b> (rounded down), and you take the remaining <b><i style={{ color: '#990000' }}>Damage</i></b> dealt{damageResist > 0 ? `, reducing it by [${damageResist}]` : ''}{damageResistCount > 0 ? `, and you <b><i style={{ color: '#1a56db' }}>Resist</i></b> all <b><i style={{ color: '#990000' }}>Damage</i></b> [${damageResistCount}]` : ''}.
    </span>
  );
};
