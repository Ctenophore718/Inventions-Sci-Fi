// Commander Feature utilities (Stay Sharp)

/**
 * Generate dynamic JSX for the Commander Feature: Stay Sharp.
 * Mirrors logic used on the Level Up page so the Character Sheet stays in sync.
 *
 * Dots Layout (classCardDots indices):
 * 0: +1hx (up to 3) -> increases range from base 3 to 3 + number of dots
 * 1: Includes Attacks (single dot) -> replaces [ - ] with [Attacks]
 */
export function generateStaySharpJSX(classCardDots?: boolean[][]) {
  const hxDots = classCardDots?.[0] || [];
  const includesAttacks = !!classCardDots?.[1]?.[0];
  const bonusHx = hxDots.filter(Boolean).length;
  const range = 3 + bonusHx;

  return (
    <span style={{ color: '#000', fontWeight: 400 }}>
      <b><i style={{ color: '#717211' }}>Stay Sharp.</i></b> At the beginning of the round, you and allies within <b>[{range}]</b>hx of you can remove an additional <i>Cooldown Token</i> from one <i>inactive</i> <b><i style={{ color: '#bf9000' }}>Technique</i></b> or <b>[{includesAttacks ? <i style={{ color: '#990000' }}>Attack</i> : ' - '}]</b> of their choice.
    </span>
  );
}

export type CommanderFeatureData = {
  range: number;
  includesAttacks: boolean;
};

/** Helper for any non-JSX consumers (tests, cards, etc.) */
export function calculateCommanderFeatureData(classCardDots?: boolean[][]): CommanderFeatureData {
  const hxDots = classCardDots?.[0] || [];
  const includesAttacks = !!classCardDots?.[1]?.[0];
  const bonusHx = hxDots.filter(Boolean).length;
  return {
    range: 3 + bonusHx,
    includesAttacks
  };
}
