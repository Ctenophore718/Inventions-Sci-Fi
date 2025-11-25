import React from 'react';

interface PoisonousBarbsData {
  cooldown: number;
  piercingDamage: number;
  includesAttacks: boolean;
}

export const calculatePoisonousBarbsData = (subspeciesCardDots: boolean[][]): PoisonousBarbsData => {
  const cooldownDots = subspeciesCardDots[4] || [];
  const piercingDots = subspeciesCardDots[1] || [];
  const includesAttacks = subspeciesCardDots[2]?.[0] || false;
  
  const cooldownReduction = cooldownDots.filter(Boolean).length;
  const piercingDamage = piercingDots.filter(Boolean).length;
  
  return {
    cooldown: 3 - cooldownReduction,
    piercingDamage,
    includesAttacks
  };
};

export const generatePoisonousBarbsJSX = (
  cooldown: number,
  piercingDamage: number,
  includesAttacks: boolean,
  inflictSpikeToxic?: boolean
) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
    <b><i style={{ color: '#2b2d5f' }}>Poisonous Barbs</i></b> <span style={{ color: '#2b2d5f', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> Until the start of the next round, if you take Damage from a <b><i style={{ color: '#351c75' }}>Strike</i></b> or <b>[{includesAttacks ? <i style={{ color: '#990000' }}>Attack</i> : ' - '}]</b>, the creature who inflicted the Damage suffers the <b><i>Drain</i></b> condition and takes +<b>[{piercingDamage}]</b>d6 <b><u style={{ color: '#a6965f' }}>Piercing</u></b> <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, verticalAlign: 'middle' }} />.</span>
  );
};

export const generatePoisonousBarbsCardJSX = (
  piercingDamage: number,
  includesAttacks: boolean
) => {
  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      Until the start of the next round, if you take Damage from a <b><i style={{ color: '#351c75' }}>Strike</i></b> or <b>[{includesAttacks ? <i style={{ color: '#990000' }}>Attack</i> : ' - '}]</b>, the creature who inflicted the Damage suffers the <b><i>Drain</i></b> condition and takes +<b>[{piercingDamage}]</b>d6 <b><u style={{ color: '#a6965f' }}>Piercing</u></b> <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, verticalAlign: 'middle' }} />.</span>
  );
};
