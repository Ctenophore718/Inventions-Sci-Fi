// Commander Technique utilities (Combat Delegation)

/**
 * Generate dynamic JSX for the Commander Technique: Combat Delegation.
 * Mirrors logic used on the Level Up page so the Cards page stays in sync.
 *
 * Dots Layout (classCardDots indices):
 * 3: +1hx (up to 3) -> increases range from base 5 to 5 + number of dots
 * 4: +1 ally (up to 3) -> increases allies from base 1 to 1 + number of dots
 * 5: -1 Cooldown (up to 2) -> decreases cooldown from base 4, minimum 1
 */
export function generateCombatDelegationJSX(classCardDots?: boolean[][]) {
  const hxDots = classCardDots?.[3] || [];
  const allyDots = classCardDots?.[4] || [];
  const cooldownDots = classCardDots?.[5] || [];
  
  const bonusHx = hxDots.filter(Boolean).length;
  const bonusAllies = allyDots.filter(Boolean).length;
  const cooldownReduction = cooldownDots.filter(Boolean).length;
  
  const range = 5 + bonusHx;
  const allies = 1 + bonusAllies;
  const cooldown = Math.max(1, 4 - cooldownReduction);

  return (
    <>
      <b><i style={{ color: '#717211', fontSize: '1em' }}>Combat Delegation</i></b> <span style={{ color: '#717211', fontSize: '1em' }}><i>(Cooldown <b style={{ color: '#000', fontStyle: 'normal' }}>[{cooldown}]</b>).</i></span> <b>[{allies}]</b> ally(s) within <b>[{range}]</b>hx that can see and/or hear you gains an extra <i>Action</i>.
    </>
  );
}

/**
 * Generate JSX for Combat Delegation card (without cooldown info)
 */
export function generateCombatDelegationCardJSX(classCardDots?: boolean[][]) {
  const hxDots = classCardDots?.[3] || [];
  const allyDots = classCardDots?.[4] || [];
  
  const bonusHx = hxDots.filter(Boolean).length;
  const bonusAllies = allyDots.filter(Boolean).length;
  
  const range = 5 + bonusHx;
  const allies = 1 + bonusAllies;

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b>[{allies}]</b> ally(s) within <b>[{range}]</b>hx that can see and/or hear you gains an extra{' '}
      <i>Action</i>.
    </span>
  );
}

export type CombatDelegationData = {
  range: number;
  allies: number;
  cooldown: number;
};

/** Helper for any non-JSX consumers (tests, cards, etc.) */
export function calculateCombatDelegationData(classCardDots?: boolean[][]): CombatDelegationData {
  const hxDots = classCardDots?.[3] || [];
  const allyDots = classCardDots?.[4] || [];
  const cooldownDots = classCardDots?.[5] || [];
  
  const bonusHx = hxDots.filter(Boolean).length;
  const bonusAllies = allyDots.filter(Boolean).length;
  const cooldownReduction = cooldownDots.filter(Boolean).length;
  
  return {
    range: 5 + bonusHx,
    allies: 1 + bonusAllies,
    cooldown: Math.max(1, 4 - cooldownReduction)
  };
}