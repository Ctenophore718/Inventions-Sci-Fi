import React from 'react';

interface OakenshieldParams {
  aoeRange?: number;
  cooldown?: number;
  resistAll?: boolean;
  immuneToBPS?: boolean;
}

export const calculateOakenshieldData = (subspeciesCardDots?: boolean[][]): { aoeRange: number; cooldown: number; resistAll: boolean; immuneToBPS: boolean } => {
  if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots)) {
    return { aoeRange: 3, cooldown: 4, resistAll: false, immuneToBPS: false };
  }

  // Index 1: +1hx Range (2 dots)
  const rangeDots = subspeciesCardDots[1] || [];
  const aoeRange = 3 + rangeDots.filter(Boolean).length;

  // Index 3: -1 Cooldown (2 dots)
  const cooldownDots = subspeciesCardDots[3] || [];
  const cooldown = 4 - cooldownDots.filter(Boolean).length;

  // Index 5: Resist all damage (1 dot)
  const resistAll = subspeciesCardDots[5]?.[0] || false;

  // Index 6: Bludgeoning, Piercing and Slashing immunity (1 dot)
  const immuneToBPS = subspeciesCardDots[6]?.[0] || false;

  return { aoeRange, cooldown, resistAll, immuneToBPS };
};

export const generateOakenshieldJSX = (params?: OakenshieldParams) => {
  const aoeRange = params?.aoeRange ?? 3;
  const cooldown = params?.cooldown ?? 4;
  const resistAll = params?.resistAll ?? false;
  const immuneToBPS = params?.immuneToBPS ?? false;
  
  return (
    <>
      <b><i style={{ color: '#5f2d2b' }}>Oakenshield</i></b> <span style={{ color: '#5f2d2b', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You and allies within <b>[{aoeRange}]</b>hx {resistAll ? 'resist all damage' : 'resist <b><u style={{ color: \'#915927\', display: \'inline-flex\', alignItems: \'center\' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: \'middle\' }} /></u></b>, <b><u style={{ color: \'#a6965f\', display: \'inline-flex\', alignItems: \'center\' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: \'middle\' }} /></u></b> and <b><u style={{ color: \'#a66b5f\', display: \'inline-flex\', alignItems: \'center\' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: \'middle\' }} /></u></b> damage'} {immuneToBPS && 'and are <i>Immune</i> to <b><u style={{ color: \'#915927\', display: \'inline-flex\', alignItems: \'center\' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: \'middle\' }} /></u></b>, <b><u style={{ color: \'#a6965f\', display: \'inline-flex\', alignItems: \'center\' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: \'middle\' }} /></u></b> and <b><u style={{ color: \'#a66b5f\', display: \'inline-flex\', alignItems: \'center\' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: \'middle\' }} /></u></b> damage'} until the start of the next round.
    </>
  );
};

export const generateOakenshieldCardJSX = (params?: OakenshieldParams) => {
  const aoeRange = params?.aoeRange ?? 3;
  const resistAll = params?.resistAll ?? false;
  const immuneToBPS = params?.immuneToBPS ?? false;
  
  return (
    <>
      You and allies within <b>[{aoeRange}]</b>hx {resistAll ? 'resist all damage' : 'resist <b><u style={{ color: \'#915927\', display: \'inline-flex\', alignItems: \'center\' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: \'middle\' }} /></u></b>, <b><u style={{ color: \'#a6965f\', display: \'inline-flex\', alignItems: \'center\' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: \'middle\' }} /></u></b> and <b><u style={{ color: \'#a66b5f\', display: \'inline-flex\', alignItems: \'center\' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: \'middle\' }} /></u></b> damage'} {immuneToBPS && 'and are <i>Immune</i> to <b><u style={{ color: \'#915927\', display: \'inline-flex\', alignItems: \'center\' }}>Bludgeoning<img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: \'middle\' }} /></u></b>, <b><u style={{ color: \'#a6965f\', display: \'inline-flex\', alignItems: \'center\' }}>Piercing<img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: \'middle\' }} /></u></b> and <b><u style={{ color: \'#a66b5f\', display: \'inline-flex\', alignItems: \'center\' }}>Slashing<img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, marginLeft: 2, verticalAlign: \'middle\' }} /></u></b> damage'} until the start of the next round.
    </>
  );
};
