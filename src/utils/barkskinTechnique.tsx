import React from 'react';

interface OakenshieldParams {
  aoeRange?: number;
  cooldown?: number;
  resistAll?: boolean;
  immuneToBPS?: boolean;
  bounceImmunity?: boolean;
  slamImmunity?: boolean;
}

export const calculateOakenshieldData = (subspeciesCardDots?: boolean[][]): { aoeRange: number; cooldown: number; resistAll: boolean; immuneToBPS: boolean; bounceImmunity: boolean; slamImmunity: boolean } => {
  if (!subspeciesCardDots || !Array.isArray(subspeciesCardDots)) {
    return { aoeRange: 3, cooldown: 4, resistAll: false, immuneToBPS: false, bounceImmunity: false, slamImmunity: false };
  }

  // Index 1: +1hx Range (2 dots)
  const rangeDots = subspeciesCardDots[1] || [];
  const aoeRange = 3 + rangeDots.filter(Boolean).length;

  // Index 3: -1 Cooldown (2 dots)
  const cooldownDots = subspeciesCardDots[3] || [];
  const cooldown = 4 - cooldownDots.filter(Boolean).length;

  // Index 2: Bounce immunity (1 dot)
  const bounceImmunity = subspeciesCardDots[2]?.[0] || false;

  // Index 4: Slam immunity (1 dot)
  const slamImmunity = subspeciesCardDots[4]?.[0] || false;

  // Index 5: Resist all damage (1 dot)
  const resistAll = subspeciesCardDots[5]?.[0] || false;

  // Index 6: Bludgeoning, Piercing and Slashing immunity (1 dot)
  const immuneToBPS = subspeciesCardDots[6]?.[0] || false;

  return { aoeRange, cooldown, resistAll, immuneToBPS, bounceImmunity, slamImmunity };
};

export const generateOakenshieldJSX = (params?: OakenshieldParams) => {
  const aoeRange = params?.aoeRange ?? 3;
  const cooldown = params?.cooldown ?? 4;
  const resistAll = params?.resistAll ?? false;
  const immuneToBPS = params?.immuneToBPS ?? false;
  const bounceImmunity = params?.bounceImmunity ?? false;
  const slamImmunity = params?.slamImmunity ?? false;
  
  return (
    <>
      <b><i style={{ color: '#5f2d2b' }}>Oakenshield</i></b> <span style={{ color: '#5f2d2b', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> You and allies within <b>[{aoeRange}]</b>hx gain <b>[</b>{immuneToBPS ? <i>Immunity</i> : <i>Resistance</i>}<b>]</b> <b><u style={{ color: '#915927' }}>Bludgeoning</u></b> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, verticalAlign: 'middle' }} />, <b><u style={{ color: '#a6965f' }}>Piercing</u></b> <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, verticalAlign: 'middle' }} /> and <b><u style={{ color: '#808080' }}>Slashing</u></b> <img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, verticalAlign: 'middle' }} /> Damage and <b>[</b>{resistAll ? <i>Resist</i> : ' - '}<b>]</b> all other Damage and the <b>[<i>{bounceImmunity ? 'Bounce' : ' - '}</i>]</b> and <b>[<i>{slamImmunity ? 'Slam' : ' - '}</i>]</b> condition(s) until the start of the next round. 
    </>
  );
};

export const generateOakenshieldCardJSX = (params?: OakenshieldParams) => {
  const aoeRange = params?.aoeRange ?? 3;
  const resistAll = params?.resistAll ?? false;
  const immuneToBPS = params?.immuneToBPS ?? false;
  const bounceImmunity = params?.bounceImmunity ?? false;
  const slamImmunity = params?.slamImmunity ?? false;
  
  return (
    <>
      You and allies within <b>[{aoeRange}]</b>hx gain <b>[</b>{immuneToBPS ? <i>Immunity</i> : <i>Resistance</i>}<b>]</b> <b><u style={{ color: '#915927' }}>Bludgeoning</u></b> <img src="/Bludgeoning.png" alt="Bludgeoning" style={{ width: 16, height: 16, verticalAlign: 'middle' }} />, <b><u style={{ color: '#a6965f' }}>Piercing</u></b> <img src="/Piercing.png" alt="Piercing" style={{ width: 16, height: 16, verticalAlign: 'middle' }} /> and <b><u style={{ color: '#808080' }}>Slashing</u></b> <img src="/Slashing.png" alt="Slashing" style={{ width: 16, height: 16, verticalAlign: 'middle' }} /> Damage and <b>[</b>{resistAll ? <i>Resist</i> : ' - '}<b>]</b> all other Damage and the <b>[<i>{bounceImmunity ? 'Bounce' : ' - '}</i>]</b> and <b>[<i>{slamImmunity ? 'Slam' : ' - '}</i>]</b> condition(s) until the start of the next round. 
    </>
  );
};
